const express = require("express");
const router = express.Router();
const User = require("../model/expensemodel");
const User2 = require("../model/user");
const sequelize = require("../config/database");



const userAuthentication = require("../midleware/auth");

router.post("/", userAuthentication.authenticate, async (req, res, next) => {
  try {
    const result = await User.create({
      date: req.body.date,
      amount: req.body.amount,
      description: req.body.description,
      category: req.body.category,
      income: req.body.category == "SALARY" ? req.body.amount : 0,
      expense: req.body.category !== "SALARY" ? req.body.amount : 0,
      userInfoId: req.user.id,
    });

    const totalexpense =
      parseInt(User2.rawAttributes.totalexpense.defaultValue) +
      parseInt(result.expense);
    User2.rawAttributes.totalexpense.defaultValue = totalexpense;

    User2.update(
      {
        totalexpense: totalexpense,
      },
      {
        where: { id: req.user.id },
      }
    );

    res.json({
      date: result.date,
      amount: result.amount,
      description: result.description,
      category: result.category,
      income: result.income,
      expense: result.expense,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

router.get("/", userAuthentication.authenticate, (req, res, next) => {
  //console.log(req.user);

  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const offset = (page - 1) * limit;

  User.findAll({ where: { userInfoId: req.user.id } })
    .then((result) => {
      result = result.reverse();
      const start = (page - 1) * limit;
      const end = page * limit;

      const data = {};

      if (start > 0) {
        data.previous = page - 1;
      }

      if (end < result.length) {
        data.next = page + 1;
      }
      data.current = page;
      data.count = result.length;
      data.result = result.slice(start, end);
      res.json(data);

      // console.log("rrrreeesssuulllttt", result);
      // res.status(200).json(result);
    })
    .catch((error) => {
      console.log(error);
    });
});

router.delete("/:id", userAuthentication.authenticate, (req, res, next) => {
  const prodid = req.params.id;
  User.findByPk(prodid)
    .then((product) => {
      // console.log("PRODUCT====>>>>>", product);
      //console.log("DELETED AMOUNT======>>>>>",product.amount)
      const response = User2.findByPk(product.id);
      if (response) {
        User2.update(
          {
            totalexpense:
              parseInt(User2.rawAttributes.totalexpense.defaultValue) -
              parseInt(product.amount),
          },
          {
            where: { id: req.user.id },
          }
        );
      }

      return product
        .destroy()
        .then((result) => {
          console.log("Product destroyed");
          res.send(result);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch();
});



module.exports = router;

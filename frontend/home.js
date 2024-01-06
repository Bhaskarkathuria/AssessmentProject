import React from "react";

function Home() {
  return (
    <div className="container" id="maindiv">
      <form className="form" id="form">
        <label htmlFor="expense" className="form-label" id="label1">
          Expense Amount:
        </label>
        <input type="number" id="expense" required />
        <label htmlFor="description" id="label2">
          Choose Description:
        </label>
        <select id="description">
          <option>Petrol</option>
          <option>Diesel</option>
          <option>Movie</option>
          <option>Restaurant</option>
          <option>Electricity Bill</option>
          <option>Water Bill</option>
          <option>WiFi Bill</option>
          <option>Alcohol</option>
          <option>Electronics</option>
        </select>
        <label htmlFor="category" id="label3">
          Choose a category:
        </label>
        <select id="category">
          <option>Fuel</option>
          <option>Food</option>
          <option>Utility</option>
          <option>Outing</option>
          <option>Other</option>
          <option>Entertainment</option>
          <option>SALARY</option>
        </select>
        <input type="submit" value="Add Expense" id="submit" />
        <ul className="list" id="list"></ul>
      </form>
      <table border="1" id="expensetable" className="centered-table">
        <caption>Expense Table</caption>
        <tr>
          <th>Date</th>
          <th>Discription</th>
          <th>Category</th>
          <th>Income</th>
          <th>Expense</th>
        </tr>
      </table>
      <br />
      <div id="paginationContainer"></div>
      <br />
      <ul id="list2"></ul>
      <div
        id="paginationContainer"
        className="position-absolute bottom-50 end-50"
      >
        <label id="label3">
          No of records per page
          <select id="records">
            <option>5</option>
            <option>10</option>
            <option>20</option>
            <option>50</option>
          </select>
        </label>
      </div>
      <br />

 
      <ul></ul>
    </div>
  );
}

export default Home;


// This page is not fully functional as of now. 
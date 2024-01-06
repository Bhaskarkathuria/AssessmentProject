import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "./loginvalidation";
import axios from "axios"

function Signup (){
      const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
      });
      const navigate = useNavigate()
      const [error, setError] = useState({});
      const handleInput = (event) => {
        setValues((prev) => ({
          ...prev,
          [event.target.name]: [event.target.value],
        }));
      };
const handleSubmit = async (event) => {
  event.preventDefault();

  // Use try-catch block to handle async errors
  try {
    // Validate the form fields
    setError(Validation(values));

    // Check if there are no validation errors
    if (!error.name && !error.email && !error.password) {
      // Make the POST request using axios
      const response = await axios.post("http://localhost:5000/signup", values);

      // Log the response and navigate on success
      console.log(response);
      navigate("/");
    }
  } catch (err) {
    // Handle any errors that occur during the POST request
    console.error("Error during signup:", err);
  }
};

    return (
      <>
        <div className="login-container">
          <form action="" onSubmit={handleSubmit}>
            <div className="form-group">
              <h1>Signup</h1>
              <label htmlFor="Name">Name</label>
              <input
                type="name"
                placeholder="Enter Name"
                name="name"
                onChange={handleInput}
              />
              {error.name && (
                <span className="text-danger">{error.name}</span>
              )}
              <br />
            </div>
            <div className="form-group">
              <label htmlFor="Email">Email</label>
              <input
                type="email"
                placeholder="Enter Email"
                name="email"
                onChange={handleInput}
              />
              {error.email && (
                <span className="text-danger">{error.email}</span>
              )}
              <br />
            </div>
            <div className="form-group">
              <label htmlFor="Password">Password</label>
              <input
                type="password"
                placeholder="Enter Password"
                name="password"
                onChange={handleInput}
              />
              {error.password && (
                <span className="text-danger">{error.password}</span>
              )}
              <br />
            </div>
            <button type="submit">Signup</button>
            <p>Already have an Account?</p>
            <Link to="/" className="create-account-btn">
              Login
            </Link>
          </form>
        </div>
      </>
    );
}

export default Signup;
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "./loginvalidation"
import axios from "axios"
import Home from "./home"


function Login() {
    const [values, setValues] = useState({
        email:'',
        password: ''
    })
    const navigate = useNavigate()
    const [error, setError]= useState({})
    
    const handleInput = (event)=>{
        setValues(prev=>({...prev,[event.target.name]:[event.target.value]}))
    }
const handleSubmit = async (event) => {
  event.preventDefault();

  // Use try-catch block to handle async errors
  try {
    // Validate the form fields
    setError(Validation(values));

    // Check if there are no validation errors
    if (!error.name && !error.email && !error.password) {
      // Make the POST request using axios
      const response = await axios.post("http://localhost:5000/login", values);
    
      console.log("resssssssss",response)
      // We got token from backend. Store it in localstorage.
      localStorage.setItem("token",response.data.token)

      if(response.data.message ="Logged in successfully"){
        navigate('/home')
      }else{
        alert('Invalid Credentials! Please Try Again');
      }

      
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
            <h1>Login</h1>
            <label htmlFor="Email">Email</label>
            <input type="email" placeholder="Enter Email" name="email" onChange={handleInput}/>
            {error.email &&<span className="text-danger">{error.email}</span>}
            <br />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" placeholder="Enter Password" name="password" onChange={handleInput}/>
            {error.password &&<span className="text-danger">{error.password}</span>}
            <br />
          </div>
          <button type="submit">Login</button>
          <p>If New User! Create Account</p>
          <Link to="/signup" className="create-account-btn">
            Create Account
          </Link>
        </form>
      </div>
    </>
  );
}

export default Login;

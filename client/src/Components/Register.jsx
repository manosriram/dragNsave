import React, { Fragment, useState } from "react";
import { InputBoxTwo, ButtonD } from "../Styles/StyledOne";

const Register = () => {
  const [state, setState] = useState({
    name: null,
    email: null,
    password: null
  });
  const [status, setStatus] = useState("login");

  const handleSubmit = async e => {
    e.preventDefault();
    if (status === "register") {
      // Register.
      const resp = await fetch("/auth/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ data: state })
      });
      const data = await resp.json();
      console.log(data);
    } else {
      // Login.
      const resp = await fetch("/auth/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ data: state })
      });
      const data = await resp.json();
      console.log(data);
    }
  };

  const handleChange = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSignIn = e => {
    e.preventDefault();
    setStatus("login");
    const elemOne = document.getElementsByClassName("login-form");
    const elemTwo = document.getElementsByClassName("register-form");
    elemOne[0].style.display = "block";
    elemTwo[0].style.display = "none";
  };

  const handleSignUp = e => {
    e.preventDefault();
    setStatus("register");
    const elemOne = document.getElementsByClassName("register-form");
    const elemTwo = document.getElementsByClassName("login-form");
    elemOne[0].style.display = "block";
    elemTwo[0].style.display = "none";
  };

  return (
    <Fragment>
      <div className="login-page">
        <div className="form">
          <form className="register-form" onChange={handleChange}>
            <input type="text" placeholder="name" name="name" />
            <input type="password" placeholder="password" name="password" />
            <input type="text" placeholder="email address" name="email" />
            <button onClick={handleSubmit}>create</button>
            <p className="message">
              Already registered?{" "}
              <a href="#" onClick={handleSignIn}>
                Sign In
              </a>
            </p>
          </form>
          <form className="login-form">
            <input
              type="email"
              placeholder="email address"
              name="email"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="password"
              name="password"
              onChange={handleChange}
            />
            <button onClick={handleSubmit}>login</button>
            <p className="message">
              Not registered?{" "}
              <a href="#" onClick={handleSignUp}>
                Create an account
              </a>
            </p>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Register;

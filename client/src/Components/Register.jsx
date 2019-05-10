import React, { Fragment, useState, useEffect } from "react";
import { InputBoxTwo, ButtonD } from "../Styles/StyledOne";
import "../Styles/App.css";

const Register = () => {
  const [state, setState] = useState({
    name: null,
    email: null,
    password: null
  });
  const [status, setStatus] = useState("login");
  const [spinner, setSpinner] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    setSpinner(true);
    if (
      (!state.name || !state.password || !state.email) &&
      status === "register"
    ) {
      setMessage("Error. Fill all the Details.");
      return;
    } else if ((!state.password || !state.email) && status === "login") {
      setMessage("Error. Fill all the Details.");
      return;
    }
    try {
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
        window.location = "/";
      }
    } catch (er) {
      console.log(er);
    }
  };

  if (spinner === true) {
    if (status === "register") {
      let d = document.getElementsByClassName("register-form");
      d[0].style.display = "none";
    } else {
      let d = document.getElementsByClassName("login-form");
      d[0].style.display = "none";
    }
    return (
      <div class="spinner-border text-dark" role="status" id="spinner">
        <span class="sr-only">Loading...</span>
      </div>
    );
  }

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
          <h5>{message}</h5>
          <form className="register-form" onChange={handleChange}>
            <input type="text" placeholder="name" name="name" />
            <input type="password" placeholder="password" name="password" />
            <input type="email" placeholder="email address" name="email" />
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

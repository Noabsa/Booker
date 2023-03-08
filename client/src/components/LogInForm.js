import "../styles/AccountForms.css";
import React, { useState, useContext } from "react";
import axios from "axios";
import { URL } from "../localhost";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../contexts/UserContext";

function LogInForm() {
  let { loginState } = useContext(UserContext);
  let navigate = useNavigate();

  const [input, setValues] = useState({ email: "", password: "" });
  const [msg, setMessage] = useState({
    ok: false,
    message: "",
    mark: {},
  });

  const handleChange = (event) => {
    setValues({ ...input, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${URL}/user/login`, {
        email: input.email.toLowerCase(),
        password: input.password,
      });
      setMessage({
        ok: response.data.ok,
        message: response.data.message,
        mark: response.data.mark,
      });

      if (response.data.ok) {
        setTimeout(() => {
          loginState(response.data.token, response.data.user);
        }, 2000);
      }
    } catch (error) {}
  };

  return (
    <div className="account-form">
      <h2>Log in</h2>
      <p>Welcome to Booker, please, enter your login data to access</p>
      <div className="hide">
        <button>Log in with Google</button>
        <p>or</p>
      </div>

      <form onSubmit={handleSubmit} onChange={handleChange}>
        <span>E-mail</span>
        <input
          placeholder="e-mail"
          name="email"
          className={`${msg.mark.email}`}
        ></input>

        <span>Password</span>
        <input
          placeholder="password"
          name="password"
          className={`${msg.mark.password}`}
          type="password"
        ></input>

        <a onClick={() => navigate("/RecoverPassword")}>
          Forgot your password?
        </a>
        <button>Log in</button>
        <p>
          Don't have an account?
          <a onClick={() => navigate("/SignUpForm")}>Sign up</a>
        </p>
        <p className={`message ${msg.ok}`}>{msg.message}</p>
      </form>
    </div>
  );
}
export default LogInForm;

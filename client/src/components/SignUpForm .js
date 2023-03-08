import "../styles/AccountForms.css";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import { URL } from "../localhost";

function SignUpForm() {
  let navigate = useNavigate();

  const [input, setValues] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    password2: "",
  });
  const [msg, setMessage] = useState({ ok: false, message: "", mark: {} });

  const handleChange = (event) => {
    setValues({ ...input, [event.target.name]: event.target.value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${URL}/user/register`, {
        name: input.name,
        surname: input.surname,
        email: input.email,
        password: input.password,
        password2: input.password2,
      });
      setMessage({
        ok: response.data.ok,
        message: response.data.message,
        mark: response.data.mark,
      });
      if (response.data.ok) {
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="account-form fill">
      <h2>Create your account for free</h2>
      <p>Sign up with your email</p>
      <div className="hide">
        <button>Log in with Google</button>
        <p>or</p>
      </div>
      <form onSubmit={handleSubmit} onChange={handleChange}>
        <span>First name</span>
        <input
          placeholder="name"
          name="name"
          className={`${msg.mark?.name}`}
        ></input>
        <span>Last name</span>
        <input
          placeholder="surname"
          name="surname"
          className={`${msg.mark?.surname}`}
        ></input>
        <span>E-mail</span>
        <input
          placeholder="e-mail"
          name="email"
          className={`${msg.mark?.email}`}
        ></input>
        <span>Password</span>
        <input
          placeholder="password"
          name="password"
          className={`${msg.mark?.password}`}
          type="password"
        ></input>
        <span>Confirm Password</span>
        <input
          placeholder="confirm"
          name="password2"
          className={`${msg.mark?.password2}`}
          type="password"
        ></input>
        <button>Create my account</button>
        <p>
          Already have an account?<a onClick={() => navigate("/")}>Sign in</a>
        </p>
        <p className={`message ${msg.ok}`}>{msg.message}</p>
      </form>
    </div>
  );
}
export default SignUpForm;

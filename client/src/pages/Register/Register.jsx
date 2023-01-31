// import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.scss";

const Register = () => {
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  // console.log(username);
  // console.log(password);

  return (
    <div className="register">
      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <h1>Create Account</h1>
        <div className="inputs">
          <label>First Name</label>
          <input className="input" type="text" autoComplete="off" />
          <label>Last Name</label>
          <input className="input" type="text" autoComplete="off" />
          <label>Username</label>
          <input className="input" type="text" autoComplete="off" />
          <label>Email</label>
          <input className="input" type="email" autoComplete="off" />
          <label>Password</label>
          <input className="input" type="password" autoComplete="off" />
        </div>
        <input className="button" type="submit" value="CREATE" />
      </form>
    </div>
  );
};

export default Register;

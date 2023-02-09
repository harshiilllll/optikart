// import React, { useState } from "react";
import { useState } from "react";
import axios from "axios";
import "./Register.scss";

const Register = () => {
  const [inputs, setInputs] = useState({});

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  console.log(inputs);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/auth/register", inputs);
  };

  return (
    <div className="register">
      <form className="form" onSubmit={handleSubmit}>
        <h1>Create Account</h1>
        <div className="inputs">
          <label>First Name</label>
          <input
            name="firstname"
            className="input"
            type="text"
            autoComplete="off"
            onChange={handleChange}
          />
          <label>Last Name</label>
          <input
            name="lastname"
            className="input"
            type="text"
            autoComplete="off"
            onChange={handleChange}
          />
          <label>Username</label>
          <input
            name="username"
            className="input"
            type="text"
            autoComplete="off"
            onChange={handleChange}
          />
          <label>Email</label>
          <input
            name="email"
            className="input"
            type="email"
            autoComplete="off"
            onChange={handleChange}
          />
          <label>Password</label>
          <input
            name="password"
            className="input"
            type="password"
            autoComplete="off"
            onChange={handleChange}
          />
        </div>
        <input className="button" type="submit" value="CREATE" />
      </form>
    </div>
  );
};

export default Register;

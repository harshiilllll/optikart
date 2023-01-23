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
        <h1>Register</h1>
        <div className="inputs">
          <input
            className="input"
            type="text"
            placeholder="First Name"
            autoComplete="off"
          />
          <input
            className="input"
            type="text"
            placeholder="Last Name"
            autoComplete="off"
          />
        </div>
        <div className="inputs">
          <input
            className="input"
            type="text"
            placeholder="Username"
            autoComplete="off"
          />
          <input
            className="input"
            type="email"
            placeholder="Email"
            autoComplete="off"
          />
        </div>
        <div className="inputs">
          <input
            className="input"
            type="password"
            placeholder="Password"
            autoComplete="off"
          />
          <input
            className="input"
            type="password"
            placeholder="Confirm Password"
            autoComplete="off"
          />
        </div>
        <input className="button" type="submit" value="Register" />
        <Link className="link" to="/login">Alredy registered?</Link>
      </form>
    </div>
  );
};

export default Register;

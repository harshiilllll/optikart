import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.scss";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  console.log(username);
  console.log(password);

  return (
    <div className="login">
      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <h1>Login</h1>
        <div className="inputs">
          <input
            className="input"
            type="text"
            placeholder="Email or Username"
            autoComplete="off"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <input
            className="input"
            type="password"
            placeholder="Password"
            autoComplete="off"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <input className="button" type="submit" value="Login" />
        <div>
          Not registered?
          <Link className="link" to="/register">
            Create account
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;

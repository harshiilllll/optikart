import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../../redux/apiCalls";
import "./Login.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log(email);
  console.log(password);

  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);

  const handleLogin = (e) => {
    e.preventDefault();
    login(dispatch, { email, password });
  };

  return (
    <div className="login">
      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <h1>Login</h1>
        <div className="inputs">
          <input
            className="input"
            type="email"
            placeholder="Email"
            autoComplete="off"
            onChange={(e) => {
              setEmail(e.target.value);
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
        <input
          className="button"
          type="submit"
          value="Login"
          onClick={handleLogin}
          disabled={isFetching}
        />
        {error && <span style={{ color: "red" }}>Something went wrong</span>}
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

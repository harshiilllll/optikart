import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../../redux/apiCalls";
import "./Login.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        {error && <span className="error">Incorrect email or password</span>}
        <div className="inputs">
          <label>Email</label>
          <input
            className="input"
            type="email"
            autoComplete="off"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            style={{ marginBottom: "20px" }}
          />
          <label>Password</label>
          <input
            className="input"
            type="password"
            autoComplete="off"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <input
          className="button"
          type="submit"
          value="SIGN IN"
          onClick={handleLogin}
          disabled={isFetching}
        />
        <Link className="link" to="/register">
          Create account
        </Link>
      </form>
    </div>
  );
};

export default Login;

import React, { useState } from "react";
import PageTemplate from "../PageTemplate/PageTemplate";
import Login from "src/icons/login.svg";
import "./style.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { SIGN_IN } from "src/actions/actions";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch<ThunkDispatch<any, {}, AnyAction>>();
  const navigate = useNavigate();
  return (
    <PageTemplate>
      <img src={Login} alt="login" className="login-img" />
      <form className="signin-form">
        <label htmlFor="login">логин:</label>
        <input
          type="text"
          className="form-input"
          id="login"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <label htmlFor="pass">пароль:</label>
        <input
          type="password"
          className="form-input"
          id="pass"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        <button
          className="form-button"
          onClick={() => dispatch(SIGN_IN(email, password, navigate))}
        >
          войти
        </button>
        <p>
          нет аккаунта? <Link to="/signup">зарегистрироваться</Link>
        </p>
      </form>
    </PageTemplate>
  );
};

export default SignIn;

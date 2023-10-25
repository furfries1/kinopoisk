import React, { useState } from "react";
import PageTemplate from "../PageTemplate/PageTemplate";
import SignUpImg from "src/icons/signup.svg";
import "./style.scss";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { CREATE_USER } from "src/actions/actions";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const dispatch = useDispatch<ThunkDispatch<any, {}, AnyAction>>();
  return (
    <PageTemplate>
      <img src={SignUpImg} alt="signup" className="signup-img" />
      <form className="signup-form">
        <label htmlFor="name">имя:</label>
        <input
          type="text"
          className="form-input"
          id="name"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
        />
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
        <label htmlFor="confirm-pass">повторите пароль:</label>
        <input
          type="password"
          className="form-input"
          id="confirm-pass"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.currentTarget.value)}
        />
        <button
          className="form-button"
          onClick={() =>
            dispatch(CREATE_USER({ username: name, email, password }))
          }
        >
          регистрация
        </button>
      </form>
    </PageTemplate>
  );
};

export default SignUp;

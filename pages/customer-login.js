import React, { useState } from "react";
import Styles from "../styles/Auth/Auth.module.css";
import LoginForm from "../Components/CustomerLogin/LoginForm";
import SignupForm from "../Components/CustomerLogin/SignupForm";
import ForgetPassword from "../Components/CustomerLogin/ForgetPassword";

const CustomerRegister = () => {
  const [changeState, setChangeState] = useState("LoginForm");
  return (
    <div className={Styles.auth_container}>
      {changeState === "CreateAnAccount" ? (
        <SignupForm setChangeState={setChangeState}></SignupForm>
      ) : changeState === "LoginForm" ? (
        <LoginForm setChangeState={setChangeState}></LoginForm>
      ) : changeState === "ForgetPassword" ? (
        <ForgetPassword setChangeState={setChangeState}></ForgetPassword>
      ) : (
        <></>
      )}
    </div>
  );
};

export default CustomerRegister;

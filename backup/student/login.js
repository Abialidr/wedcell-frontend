// import React from 'react'
// import AuthForm from '../../Components/Auth/AuthForm'
// import Styles from '../../styles/Auth/Auth.module.css'
// function login() {
//   return (
//     <div className={Styles.auth_container}>
//       <AuthForm form='studentLogin' loginPagename= 'student' />
//     </div>
//   )
// }
// export default login
// import React from 'react'

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Styles from "../../styles/Auth/Auth.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import { selectLoginRoute, user } from "../../redux/reducer/appEssentials";
import { Box } from "@mui/material";
import {
  useCreateOtpMutation,
  useCreateStudentAccountMutation,
  useStudentLoginMutation,
} from "redux/Api/signInAndLogin.api";
import parsePhoneNumberFromString from "libphonenumber-js";
import { MuiTelInput } from "mui-tel-input";

const login = ({ role }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [active, setActive] = useState("register");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpScreen, setOtpScreen] = useState(false);
  const [name, setName] = useState("");
  const [confirmOTP, setConfirmOTP] = useState("");
  const loginRouteData = useSelector(selectLoginRoute);

  const [studentLogin] = useStudentLoginMutation();
  const [createOtp] = useCreateOtpMutation();
  const [createStudentAccount] = useCreateStudentAccountMutation();

  const handleLogIn = async () => {
    if (!mobile || !password) {
      alert("Invalid mobile or password");
      return;
    }

    try {
      let res = await studentLogin({
        mobile,
        password,
      });
      res = JSON.parse(JSON.stringify(res));
      if (res?.data?.success) {
        const responseData = res?.data;
        const token = res?.data?.token;

        responseData.data.token = token;

        // Store the modified response data in localStorage
        dispatch(user(responseData));
        localStorage.setItem("wedfield", JSON.stringify(responseData));
        localStorage.setItem("role", JSON.stringify({ role: "Students" }));

        if (loginRouteData) {
          router.push(loginRouteData);
        } else {
          router.push("/student/profile");
        }
      } else {
        alert("Login failed");
      }
    } catch (error) {
      // alert(error?.response?.data.error.message);
    }
  };

  const SendOTp = async () => {
    // if (mobile.length < 10 || mobile.length > 10) {
    //   alert("Please enter a valid mobile number");
    //   return;
    // }
    if (!isValid) {
      return alert(`Please Enter Proper Number`, {
        position: "top-right",
        autoClose: 2000,
      });
    } else {
      setLoading(true);
      const res = await createOtp({
        mobile,
      });
      if (res?.data?.success) {
        setOtpScreen(true);
        setLoading(false);
      } else {
        setLoading(false);
        alert("Someting Went Wrong", e);
      }
    }
  };

  const VerifyOTP = async () => {
    try {
      const res = await createStudentAccount({
        mobile,
        otp,
        name,
        password,
      });
      if (res?.data?.success) {
        alert("Registration success");
        setActive("login");
      } else {
        alert(res?.error?.data?.error?.message);
      }
    } catch (error) {
      alert(error?.response?.data?.error?.message);
    }
  };

  useEffect(() => {
    const auth = localStorage.getItem("wedfield");
    const role = localStorage.getItem("role");

    if (auth) {
      if (!role) {
        router.push("/user-dashboard");
      } else {
        router.push("/student/profile");
      }
    }
  }, []);
  const [isValid, setIsValid] = useState(false);
  const [value, setValue] = useState("");

  const handleChange = (newValue, info) => {
    const parsedPhoneNumber = parsePhoneNumberFromString(
      newValue,
      info.countryCode
    );
    const isValidPhoneNumber = parsedPhoneNumber
      ? parsedPhoneNumber.isValid()
      : false;
    setIsValid(isValidPhoneNumber);
    setValue(newValue);
    setMobile(newValue.replace(/[^\d]/g, ""));
  };

  return loading ? (
    <Box
      sx={{
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
      }}
    >
      <Spinner />
    </Box>
  ) : (
    <div className={Styles.auth_container}>
      <div className={Styles.form_container}>
        <div
          className="tab-container d-flex align-items-center"
          style={{ marginTop: 100 }}
        >
          <span
            className={
              active === "register"
                ? "cursor-pointer primary-text  fs-5 w-50 text-center py-3"
                : "cursor-pointer fs-5 w-50 text-center py-3"
            }
            style={{
              backgroundColor:
                active == "register" ? "transparent" : "rgba(0,0,0,0.10)",
            }}
            onClick={() => setActive("register")}
          >
            Register
          </span>
          <span
            className={
              active === "login"
                ? "cursor-pointer primary-text  fs-5 w-50 text-center py-3"
                : "cursor-pointer fs-5 w-50 text-center py-3"
            }
            onClick={() => setActive("login")}
            style={{
              backgroundColor:
                active == "login" ? "transparent" : "rgba(0,0,0,0.10)",
            }}
          >
            Login
          </span>
        </div>
        {active === "register" && (
          <div className="register-form-container mt-4 px-4">
            <div className="form-title">
              <h5>Students Register</h5>
            </div>
            <div className="input-field mb-3">
              <label className="form-label text-gray">
                Join wedfield to get your vendor for your wedding
              </label>
              <MuiTelInput
                value={value}
                id="outlined-basic"
                label="Mobile No"
                variant="outlined"
                fullWidth
                defaultCountry={"IN"}
                onChange={handleChange}
                onlyCountries={[
                  "AE",
                  "IN",
                  "TH",
                  "LK",
                  "ID",
                  "CA",
                  "MV",
                  "VN",
                  "KH",
                  "PH",
                  "MY",
                ]}
              />
              {/* <input
                type="text"
                placeholder="Mobile"
                className="form-control py-3"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              /> */}
              {otpScreen && (
                <>
                  <input
                    type="text"
                    placeholder="OTP"
                    className="form-control py-3"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Name"
                    className="form-control py-3"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Password"
                    className="form-control py-3"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </>
              )}
            </div>
            <button
              className="primary-btn"
              onClick={!otpScreen ? SendOTp : VerifyOTP}
            >
              {!otpScreen ? "Sign Up" : "Submit"}
            </button>
            <div className="form-footer mt-4 d-flex align-item-center justify-content-between">
              <span className="text-gray">
                Have you subscribed?
                <span
                  className="primary-text ms-2 cursor-pointer"
                  onClick={() => setActive("login")}
                >
                  Login
                </span>
              </span>
              <span
                className="text-gray cursor-pointer"
                onClick={() => router.push("/forgotPassword")}
              >
                Forgot password?
              </span>
            </div>
          </div>
        )}

        {active === "login" && (
          <div className="register-form-container mt-4 px-4">
            <div className="form-title">
              <h5>Welcom Back Student</h5>
            </div>
            <div className="input-field mb-3">
              <label className="form-label text-gray">
                Join wedfield to get your vendor for your wedding
              </label>
              <MuiTelInput
                value={value}
                id="outlined-basic"
                label="Mobile No"
                variant="outlined"
                fullWidth
                defaultCountry={"IN"}
                onChange={handleChange}
                onlyCountries={[
                  "AE",
                  "IN",
                  "TH",
                  "LK",
                  "ID",
                  "CA",
                  "MV",
                  "VN",
                  "KH",
                  "PH",
                  "MY",
                ]}
              />
            </div>
            <div className="input-field mb-3">
              <input
                type="password"
                placeholder="Enter Password"
                className="form-control py-3"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="primary-btn" onClick={handleLogIn}>
              Submit
            </button>
            <div className="form-footer mt-4 d-flex align-item-center justify-content-between flex-wrap">
              <span className="text-gray">
                Are you new couple?
                <span
                  className="primary-text ms-2 cursor-pointer"
                  onClick={() => {
                    setActive("register");
                  }}
                >
                  Create a New Account
                </span>
              </span>
              <span
                className="text-gray cursor-pointer"
                onClick={() => router.push("/forgotPassword")}
              >
                Forgot password?
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default login;

import React from "react";
import styles from "../../styles/LoginAndSignup/LoginForm.module.scss";
import MuiPhoneNumber from "material-ui-phone-number";
import { Box, Modal, TextField } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import {
  useCreateOtpMutation,
  useLoginMutation,
} from "redux/Api/signInAndLogin.api";
import { ToastContainer, toast } from "react-toastify";
import {
  customerFPval1,
  customerLoginval,
} from "yupValidation/customerValidation";
import { Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { user } from "redux/reducer/appEssentials";

const LoginModal = ({ open, setOpen }) => {
  const [isLoading, setIsloading] = useState(false);
  const [login] = useLoginMutation();
  const [currState, setcurrState] = useState(0);
  const [createOtp] = useCreateOtpMutation();
  const handlefirstNext = async () => {
    try {
      await customerFPval1.validate({
        mobile: emailPhone,
      });
      const res = await createOtp({
        mobile: emailPhone,
      });
      if (res?.data?.success) {
        startTimer();
        setcurrState(currState + 1);
      } else {
        toast.error(`${e}`, {
          position: "top-right",
          autoClose: 2000,
        });
      }
    } catch (e) {
      toast.error(`${e}`, {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  const [otpSent, setOtpSent] = useState(false);
  const handleResendOtp = async () => {
    const res = await createOtp({
      mobile: emailPhone,
    });
    if (res?.data?.success) {
      setOtpSent(true);
    }
  };

  const [timer, setTimer] = useState(30); // Initial timer value in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const startTimer = () => {
    setIsTimerRunning(true);
    setTimer(30);
  };

  useEffect(() => {
    let interval;

    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsTimerRunning(false);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isTimerRunning, timer]);

  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      setIsloading(true);
      await customerLoginval.validate({
        mobile: emailPhone,
        otp: password,
      });
      const res = await login({
        mobile: emailPhone,
        otp: password,
      });
      if (res?.data?.success) {
        localStorage.setItem("wedfield", JSON.stringify(res.data));
        dispatch(user(res.data));
        document.cookie =
          `id=${res?.data?.data?.id}; path=/; expires=` +
          new Date(
            new Date().getTime() + 7 * 24 * 60 * 60 * 1000
          ).toUTCString();
        localStorage.setItem("wedfieldIsLoged", "true");
        localStorage.setItem("role", JSON.stringify({ role: "User" }));
        setOpen(false);
        setIsloading(false);
      } else {
        toast.error(`${res?.error?.data?.message}`, {
          position: "top-right",
          autoClose: 2000,
        });
        setIsloading(false);
      }
      // alert(e?.response?.data?.message);
    } catch (e) {
      toast.error(`${e}`, {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };
  const [value, setValue] = useState("");
  const handleChange = (newValue, country) => {
    setValue(newValue);
    setcurrState(0);
    setEmailPhone(newValue.replace(/[^\d]/g, ""));
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "350px",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: "10px",
    height: "fit-content",
    overflow: "scroll",
    // zIndex: "-1",
    maxHeight: "460px",
  };
  const [password, setPassword] = useState("");
  const [emailPhone, setEmailPhone] = useState("");
  return (
    <>
      <ToastContainer />
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className={styles.loginFormdiv}>
            <div className={styles.upperDiv}>
              <span className={styles.WelcomeBackspan}>Login</span>
            </div>
            <div className={styles.Mainform}>
              <article>
                {currState === 0 ? (
                  <MuiPhoneNumber
                    value={value}
                    id="outlined-basic"
                    label="Mobile No"
                    variant="outlined"
                    fullWidth
                    defaultCountry={"in"}
                    onChange={handleChange}
                    onlyCountries={[
                      "ae",
                      "in",
                      "th",
                      "lk",
                      "id",
                      "ca",
                      "mv",
                      "vn",
                      "kh",
                      "ph",
                      "my",
                    ]}
                  />
                ) : (
                  <span className="w-100" style={{ fontSize: "14px" }}>
                    A Message with Otp is sent to <b>+{emailPhone}</b> -{" "}
                    <b
                      style={{ cursor: "pointer" }}
                      onClick={() => setcurrState(0)}
                    >
                      Edit
                    </b>
                  </span>
                )}
              </article>
              {currState === 0 ? (
                <></>
              ) : (
                <article>
                  <TextField
                    fullWidth
                    value={password}
                    type="number"
                    id="outlined-basic"
                    label="OTP"
                    variant="outlined"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </article>
              )}
              <button
                style={{
                  display: "flex",
                  width: "100%",
                  fontSize: "15px",
                  justifyContent: "end",
                  background: "none",
                  border: "none",
                }}
                onClick={handleResendOtp}
              >
                {currState === 0
                  ? ""
                  : isTimerRunning
                  ? `Resend in ${timer} seconds`
                  : otpSent
                  ? "Otp Resend Successfully"
                  : "Resend Otp"}
              </button>
            </div>
            <button
              className={styles.loginBtn}
              onClick={currState === 0 ? handlefirstNext : handleLogin}
              style={{ marginTop: "10px" }}
            >
              {isLoading ? (
                <Spinner />
              ) : currState === 0 ? (
                "Send Otp"
              ) : (
                "Verify Otp"
              )}
            </button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default LoginModal;

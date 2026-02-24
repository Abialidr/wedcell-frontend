import { Step, StepLabel, Stepper, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import styles from "../../styles/LoginAndSignup/Signup.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  customerFPval1,
  customerFPval2,
} from "../../yupValidation/customerValidation";
import {
  useCreateOtpMutation,
  useForgetPasswordMutation,
} from "redux/Api/signInAndLogin.api";
import { MuiTelInput } from "mui-tel-input";
import { S3PROXY } from "../../config";
const ForgetPassword = ({ setChangeState }) => {
  const [otp, setOtp] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [currState, setcurrState] = useState(0);
  const steps1 = ["Enter Mobile No", "Change Passworde"];
  const [createOtp] = useCreateOtpMutation();
  const handlefirstNext = async () => {
    try {
      await customerFPval1.validate({
        mobile: mobile,
      });
      const res = await createOtp({
        mobile: mobile,
      });
      if (res?.data?.success) {
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
  const [enterOtp, setEnterOtp] = useState(false);
  const [forgetPassword] = useForgetPasswordMutation();
  const handleSecondNext = async () => {
    try {
      await customerFPval2.validate({
        otp,
        password,
      });

      const res = await forgetPassword({
        mobile,
        password,
        otp,
      });
      if (res?.data?.success) {
        setChangeState("LoginForm");
      } else {
        setEnterOtp(true);
        // alert(e?.response?.data?.error?.message);
        toast.error(`${res?.error?.data?.error?.message}`, {
          position: "top-right",
          autoClose: 2000,
        });
        setTimeout(() => {
          setEnterOtp(false);
        }, 5000);
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
      mobile: mobile,
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
  const [value, setValue] = useState("");
  const handleChange = (newValue, info) => {
    setValue(newValue);
    setMobile(newValue.replace(/[^\d]/g, ""));
  };
  return (
    <div
      className={styles.OneAboveAll}
      style={{ display: "flex", justifyContent: "center" }}
    >
      <ToastContainer />
      <div className={styles.mainDiv}>
        <div className={styles.imgDiv}>
          <img
            className={styles.loginImg}
            src={`${S3PROXY}/public/images/webp/loginim.webp`}
            alt=""
          />
        </div>
        <div className={styles.loginFormmaindiv}>
          <div className={styles.loginFormdiv}>
            <div className={styles.upperDiv}>
              <span className={styles.WelcomeBackspan}>
                {currState === 0
                  ? "Forget Password"
                  : currState === 1
                    ? "Forget Password"
                    : ""}
              </span>
            </div>
            <Stepper
              activeStep={currState}
              alternativeLabel
              style={{ width: "100%", fontSize: "18px", marginBottom: "30px" }}
            >
              {steps1?.map((label) => (
                <Step key={label}>
                  <StepLabel>
                    {" "}
                    <span
                      style={{
                        fontSize: "13px",
                        fontFamily: "Ledger",
                      }}
                    >
                      {label}
                    </span>{" "}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
            <div className={styles.Mainform}>
              {currState === 0 ? (
                <>
                  <article style={{ marginBottom: "20px" }}>
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
                    {/* <TextField
                      fullWidth
                      value={mobile}
                      id="outlined-basic"
                      label="Mobile"
                      variant="outlined"
                      onChange={(e) => setMobile(e.target.value)}
                    /> */}
                  </article>
                </>
              ) : currState === 1 ? (
                <div
                  style={{
                    marginBottom: "20px",
                    display: "flex",
                    gap: "20px",
                    flexDirection: "column",
                  }}
                >
                  <article>
                    <TextField
                      fullWidth
                      value={otp}
                      id="outlined-basic"
                      label="Otp"
                      variant="outlined"
                      onChange={(e) => setOtp(e.target.value)}
                    />
                  </article>
                  {enterOtp ? (
                    <span
                      style={{
                        fontSize: "15px",
                        color: "red",
                        marginTop: "10px",
                      }}
                    >
                      Enter Proper OTP!
                    </span>
                  ) : (
                    <></>
                  )}
                  <article>
                    <TextField
                      fullWidth
                      value={password}
                      id="outlined-basic"
                      label="New Password"
                      variant="outlined"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </article>
                </div>
              ) : (
                <></>
              )}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              {currState === 1 ? (
                <>
                  <button
                    className={styles.loginBtn1}
                    disabled={isTimerRunning}
                    onClick={() => handleResendOtp()}
                    style={{ width: "100%" }}
                  >
                    {isTimerRunning
                      ? `Resend in ${timer} seconds`
                      : otpSent
                        ? "Otp Resend Successfully"
                        : "Resend OTP"}
                  </button>
                </>
              ) : (
                <></>
              )}
            </div>
            <div
              style={{
                display: "flex",
                width: "100%",
                gap: "20px",
                justifyContent: "center",
              }}
            >
              {currState !== 0 ? (
                <button
                  className={styles.loginBtn1}
                  onClick={() => setcurrState(currState - 1)}
                >
                  Previous
                </button>
              ) : (
                <></>
              )}
              {currState === 0 ? (
                <button
                  className={styles.loginBtn}
                  onClick={() => {
                    handlefirstNext();
                    startTimer();
                  }}
                >
                  Send Otp
                </button>
              ) : currState === 1 ? (
                <>
                  <button
                    className={styles.loginBtn}
                    onClick={() => handleSecondNext()}
                  >
                    Change Password
                  </button>
                </>
              ) : (
                <></>
              )}
            </div>
            {/* {currState === 0 ? (
              <>
                <div className={styles.Ordiv}>
                  <div
                    style={{
                      border: '1px solid #66666641',
                      height: '1px',
                      width: '40%',
                    }}
                  ></div>
                  <div style={{ width: '20%', color: '#666666' }}>OR</div>
                  <div
                    style={{
                      border: '1px solid #66666641',
                      height: '1px',
                      width: '40%',
                    }}
                  ></div>
                </div>
                <div className={styles.GoogleAndAppleBtndiv}>
                  <button className={styles.Googlebtn}>
                    {' '}
                    <
                      src={`${S3PROXY}/public/images/Social media webp/logo.webp`}
                      alt=''
                    />{' '}
                    Continue with Google
                  </button>
                  <button className={styles.Applebtn}>
                    {' '}
                    <
                      src={`${S3PROXY}/public/images/webp/Social media logo2 (2).webp`}
                      alt=''
                    />{' '}
                    Continue with Apple
                  </button>
                </div>
              </>
            ) : (
              <></>
            )} */}
          </div>
          <span
            className={styles.CreateAnAccount}
            onClick={() => setChangeState("LoginForm")}
          >
            Already Have An Account?
          </span>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;

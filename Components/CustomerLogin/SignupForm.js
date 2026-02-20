import { Step, StepLabel, Stepper, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import styles from "../../styles/LoginAndSignup/Signup.module.css";
import { selectLoginRoute } from "../../redux/reducer/appEssentials";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Spinner } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import {
  DatePicker,
  LocalizationProvider,
  MobileTimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ImgCrop from "antd-img-crop";
import { Upload } from "antd";
import dayjs from "dayjs";
import {
  customerCAval1,
  customerCAval2,
  customerCAval3,
} from "../../yupValidation/customerValidation";
import {
  useCreateOtpMutation,
  useCreateUserAccountMutation,
  useVerifyOtpMutation,
} from "redux/Api/signInAndLogin.api";
import MuiPhoneNumber from "material-ui-phone-number";
import compressAndAppendFiles from "Components/compressAndAppendFiles";
import { S3PROXY } from "../../config";
const SignupForm = ({ setChangeState }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [emailPhone, setEmailPhone] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const loginRouteData = useSelector(selectLoginRoute);
  const [signUpForm, setSignupForm] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    groomName: "",
    brideName: "",
    groomImage: [],
    brideImage: [],
    eventDate: {},
    starttime: {},
    endtime: {},
  });

  const [otp, setOtp] = useState("");

  const [iam, setiam] = useState("groom");
  const [pam, setpam] = useState("bride");
  const [currState, setcurrState] = useState(0);
  let [fileListmain, setFileListmain] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  let [fileListmain1, setFileListmain1] = useState([]);
  const handleChange2 = ({ fileList: newFileList }) => {
    setFileListmain(newFileList);
    if (iam === "groom") {
      setSignupForm({ ...signUpForm, groomImage: newFileList });
    } else {
      setSignupForm({ ...signUpForm, brideImage: newFileList });
    }
  };
  const handleChange3 = ({ fileList: newFileList }) => {
    setFileListmain1(newFileList);
    if (pam === "groom") {
      setSignupForm({ ...signUpForm, groomImage: newFileList });
    } else {
      setSignupForm({ ...signUpForm, brideImage: newFileList });
    }
  };
  const steps1 = ["Login Details", "Wedding Details", "Otp Verification"];
  const handlefirstNext = async () => {
    if (!checked || !isValid) {
      // alert('Please Agree Terms And Conditions');

      toast.error(
        `Please ${
          !checked ? "Agree Terms And Conditions" : "Enter Proper Number"
        } `,
        {
          position: "top-right",
          autoClose: 2000,
        }
      );
    } else {
      try {
        await customerCAval1.validate(signUpForm);
        setcurrState(currState + 1);
      } catch (e) {
        toast.error(`${e}`, {
          position: "top-right",
          autoClose: 2000,
        });
      }
    }
  };
  const [createOtp] = useCreateOtpMutation();
  const handleSecondNext = async () => {
    try {
      await customerCAval2.validate(signUpForm);
      setIsloading(true);
      const res = await createOtp({
        mobile: signUpForm.mobile,
      });
      if (res?.data?.success) {
        setcurrState(currState + 1);
        setIsloading(false);
      } else {
        setIsloading(false);
      }
    } catch (e) {
      toast.error(`${e}`, {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };
  const [verifyOtp] = useVerifyOtpMutation();
  const [createUserAccount] = useCreateUserAccountMutation();
  const [enterOtp, setEnterOtp] = useState(false);
  const handleCreateAccount = async () => {
    const formData = new FormData();
    signUpForm.name && formData.append("name", signUpForm.name);
    signUpForm.password && formData.append("password", signUpForm.password);
    signUpForm.mobile && formData.append("mobile", signUpForm.mobile);
    signUpForm.email && formData.append("email", signUpForm.email);
    signUpForm.groomName && formData.append("groomName", signUpForm.groomName);
    signUpForm.brideName && formData.append("brideName", signUpForm.brideName);
    signUpForm.groomImage &&
      (await compressAndAppendFiles(
        signUpForm.groomImage,
        formData,
        `groomImage`
      ));
    // signUpForm.groomImage?.forEach((data, key) => {
    //   formData.append(`groomImage`, data.originFileObj);
    // });
    signUpForm.brideImage &&
      (await compressAndAppendFiles(
        signUpForm.brideImage,
        formData,
        `brideImage`
      ));
    // signUpForm.brideImage.forEach((data, key) => {
    //   formData.append(`brideImage`, data.originFileObj);
    // });
    signUpForm.eventDate &&
      formData.append("eventDate", JSON.stringify(signUpForm.eventDate.$d));
    signUpForm.starttime &&
      formData.append("startTime", JSON.stringify(signUpForm.starttime.$d));
    signUpForm.endtime &&
      formData.append("endTime", JSON.stringify(signUpForm.endtime.$d));
    try {
      await customerCAval3.validate({ otp });
      setIsloading(true);
      const res = await verifyOtp({
        mobile: signUpForm.mobile,
        otp,
      });
      if (res?.data?.success) {
        const res = await createUserAccount(formData);
        if (res?.data?.success) {
          setSignupForm({
            name: "",
            email: "",
            mobile: "",
            password: "",
            groomName: "",
            brideName: "",
            groomImage: "",
            brideImage: "",
            eventDate: "",
            starttime: "",
            endtime: "",
          });
          setChangeState("LoginForm");
          setIsloading(false);
        } else {
          toast.error(`${res?.error?.data?.message}`, {
            position: "top-right",
            autoClose: 2000,
          });
          setIsloading(false);
        }
      } else {
        setEnterOtp(true);
        setIsloading(false);
      }
    } catch (e) {
      toast.error(`${e}`, {
        position: "top-right",
        autoClose: 2000,
      });
    }
    setTimeout(() => {
      setEnterOtp(false);
    }, 5000);
  };
  const [otpSent, setOtpSent] = useState(false);
  const handleResendOtp = () => {
    createOtp({
      mobile: signUpForm.mobile,
    }).then((res) => {
      if (res.data.success) {
        setOtpSent(true);
      }
    });
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

  const [isValid, setIsValid] = useState(false);
  const [value, setValue] = useState("");
  const handleChange = (newValue, country) => {
    const parsedPhoneNumber = parsePhoneNumberFromString(
      newValue,
      country.Name
    );
    const isValidPhoneNumber = parsedPhoneNumber
      ? parsedPhoneNumber.isValid()
      : false;
    setIsValid(isValidPhoneNumber);
    setValue(newValue);
    setSignupForm({ ...signUpForm, mobile: newValue.replace(/[^\d]/g, "") });
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
                  ? "Create An Account"
                  : currState === 1
                  ? "Wedding Details"
                  : currState === 2
                  ? "Otp Verification"
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
                  <article>
                    <TextField
                      fullWidth
                      value={signUpForm.name}
                      id="outlined-basic"
                      label="Name"
                      variant="outlined"
                      onChange={(e) =>
                        setSignupForm({ ...signUpForm, name: e.target.value })
                      }
                    />
                  </article>
                  <article>
                    <TextField
                      value={signUpForm.email}
                      id="outlined-basic"
                      label="Email"
                      variant="outlined"
                      fullWidth
                      onChange={(e) =>
                        setSignupForm({ ...signUpForm, email: e.target.value })
                      }
                    />
                  </article>
                  <article>
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
                    {!isValid && (
                      <p style={{ color: "red" }}>Invalid phone number</p>
                    )}
                    {/* <TextField
                      value={signUpForm.mobile}
                      type="number"
                      id="outlined-basic"
                      label="Mobile No"
                      variant="outlined"
                      fullWidth
                      onChange={(e) =>
                        setSignupForm({ ...signUpForm, mobile: e.target.value })
                      }
                    /> */}
                  </article>

                  <article>
                    <TextField
                      value={signUpForm.password}
                      type="password"
                      id="outlined-basic"
                      label="Password"
                      variant="outlined"
                      fullWidth
                      onChange={(e) =>
                        setSignupForm({
                          ...signUpForm,
                          password: e.target.value,
                        })
                      }
                    />
                  </article>
                </>
              ) : currState === 1 ? (
                <div className={styles.IamAndPartners}>
                  <div className={styles.mysideImage}>
                    <div className={styles.imgcircle}>
                      <ImgCrop rotationSlider aspect={1 / 1}>
                        <Upload
                          response={false}
                          sx={{ height: "150px", width: "150px" }}
                          // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                          listType="picture-circle"
                          fileList={fileListmain}
                          maxCount={1}
                          onChange={handleChange2}
                          // onPreview={onPreview}
                        >
                          {fileListmain?.length < 1 && (
                            <div
                              style={{
                                height: "100%",
                                width: "100%",
                                backgroundColor: "#ff000030",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: "50px",
                              }}
                            >
                              Upload +
                            </div>
                          )}
                        </Upload>
                      </ImgCrop>
                    </div>
                    <img
                      className={styles.ringImg}
                      style={{ height: "60px", width: "60px" }}
                      src={`${S3PROXY}/public/images/webp/image 17.webp`}
                      alt=""
                    />
                    <div className={styles.imgcircle}>
                      <ImgCrop
                        rotationSlider
                        aspect={1 / 1}
                        modalClassName="sdfgsdkhfsdf"
                      >
                        <Upload
                          style={{ height: "100%", width: "100%" }}
                          // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                          listType="picture-circle"
                          fileList={fileListmain1}
                          maxCount={1}
                          onChange={handleChange3}
                          // onPreview={onPreview}
                        >
                          {fileListmain1?.length < 1 && (
                            <div
                              style={{
                                height: "100px",
                                width: "100px",
                                backgroundColor: "#ff000030",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: "50px",
                              }}
                            >
                              Upload +
                            </div>
                          )}
                        </Upload>
                      </ImgCrop>
                    </div>
                  </div>
                  <div className={styles.sidebyside}>
                    <article>
                      <span>I Am</span>
                      <TextField
                        fullWidth
                        value={
                          iam === "groom"
                            ? signUpForm.groomName
                            : signUpForm.brideName
                        }
                        type="text"
                        id="outlined-basic"
                        label="Name"
                        variant="outlined"
                        onChange={(e) => {
                          if (iam === "groom") {
                            setSignupForm({
                              ...signUpForm,
                              groomName: e.target.value,
                            });
                          } else {
                            setSignupForm({
                              ...signUpForm,
                              brideName: e.target.value,
                            });
                          }
                        }}
                      />
                    </article>
                    <article>
                      <span>My Partner</span>
                      <TextField
                        fullWidth
                        value={
                          pam === "groom"
                            ? signUpForm.groomName
                            : signUpForm.brideName
                        }
                        type="text"
                        id="outlined-basic"
                        label="Name"
                        variant="outlined"
                        onChange={(e) => {
                          if (pam === "groom") {
                            setSignupForm({
                              ...signUpForm,
                              groomName: e.target.value,
                            });
                          } else {
                            setSignupForm({
                              ...signUpForm,
                              brideName: e.target.value,
                            });
                          }
                        }}
                      />
                    </article>
                  </div>
                  <div className={styles.sidebyside}>
                    <article>
                      <span>I Am</span>
                      <div className={styles.brideGroom}>
                        <span
                          style={{
                            borderRadius: "50px 0px 0px 50px",
                            backgroundColor: iam === "groom" && "#ff000030",
                          }}
                          onClick={() => {
                            setiam("groom");
                            setpam("bride");
                            const data = signUpForm;
                            setSignupForm({
                              ...signUpForm,
                              groomName: data.brideName,
                              brideName: data.groomName,
                              groomImage: data.brideImage,
                              brideImage: data.groomImage,
                            });
                          }}
                        >
                          Groom
                        </span>
                        <span
                          style={{
                            borderRadius: "0px 50px 50px 0px",
                            backgroundColor: iam === "bride" && "#ff000030",
                          }}
                          onClick={() => {
                            setiam("bride");
                            setpam("groom");
                            const data = signUpForm;
                            setSignupForm({
                              ...signUpForm,
                              groomName: data.brideName,
                              brideName: data.groomName,
                              groomImage: data.brideImage,
                              brideImage: data.groomImage,
                            });
                          }}
                        >
                          Bride
                        </span>
                      </div>
                    </article>
                    <article>
                      <span>My Partner</span>
                      <div className={styles.brideGroom}>
                        <span
                          style={{
                            borderRadius: "50px 0px 0px 50px",
                            backgroundColor: pam === "groom" && "#ff000030",
                          }}
                          onClick={() => {
                            setiam("bride");
                            setpam("groom");
                            const data = signUpForm;
                            setSignupForm({
                              ...signUpForm,
                              groomName: data.brideName,
                              brideName: data.groomName,
                              groomImage: data.brideImage,
                              brideImage: data.groomImage,
                            });
                          }}
                        >
                          Groom
                        </span>
                        <span
                          style={{
                            borderRadius: "0px 50px 50px 0px",
                            backgroundColor: pam === "bride" && "#ff000030",
                          }}
                          onClick={() => {
                            setiam("groom");
                            setpam("bride");
                            const data = signUpForm;
                            setSignupForm({
                              ...signUpForm,
                              groomName: data.brideName,
                              brideName: data.groomName,
                              groomImage: data.brideImage,
                              brideImage: data.groomImage,
                            });
                          }}
                        >
                          Bride
                        </span>
                      </div>
                    </article>
                  </div>
                  <article>
                    <span>Event Date</span>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        defaultValue={dayjs(signUpForm.eventDate)}
                        onChange={(e) =>
                          setSignupForm({
                            ...signUpForm,
                            eventDate: e,
                          })
                        }
                        // defaultValue={}
                      />
                    </LocalizationProvider>
                  </article>
                  <div className={styles.sidebyside}>
                    <article>
                      <span>Start Time</span>
                      <div className={styles.allTime}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <MobileTimePicker
                            ampm={false}
                            defaultValue={dayjs(signUpForm.starttime)}
                            onChange={(e) => {
                              setSignupForm({
                                ...signUpForm,
                                starttime: e,
                              });
                            }}
                          />
                        </LocalizationProvider>
                      </div>
                    </article>
                    <article>
                      <span>End Time</span>
                      <div className={styles.allTime}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <MobileTimePicker
                            ampm={false}
                            defaultValue={dayjs(signUpForm.endtime)}
                            onChange={(e) =>
                              setSignupForm({
                                ...signUpForm,
                                endtime: e,
                              })
                            }
                          />
                        </LocalizationProvider>
                      </div>
                    </article>
                  </div>
                </div>
              ) : (
                <div style={{ marginBottom: "20px" }}>
                  <article style={{ marginBottom: "10px" }}>
                    <TextField
                      fullWidth
                      type="number"
                      id="outlined-basic"
                      label="OTP"
                      variant="outlined"
                      onChange={(e) => setOtp(e.target.value)}
                    />
                  </article>
                  {enterOtp ? (
                    <span style={{ fontSize: "15px", color: "red" }}>
                      Enter Proper OTP!
                    </span>
                  ) : (
                    <></>
                  )}
                </div>
              )}
              {currState === 0 ? (
                <article className={styles.checkBoxdiv}>
                  <input
                    checked={checked}
                    type="checkbox"
                    onChange={() => setChecked(!checked)}
                    name=""
                    id=""
                  />
                  <span>
                    By creating an account, I agree to our Terms of use and
                    Privacy Policy
                  </span>
                </article>
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
              {currState === 2 ? (
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
                  }}
                >
                  Next
                </button>
              ) : currState === 1 ? (
                <button
                  className={styles.loginBtn}
                  onClick={() => {
                    handleSecondNext();
                    startTimer();
                  }}
                >
                  {isLoading ? <Spinner /> : "Send Otp"}
                </button>
              ) : currState === 2 ? (
                <>
                  <button
                    className={styles.loginBtn}
                    onClick={() => handleCreateAccount()}
                  >
                    {isLoading ? <Spinner /> : "Create Account"}
                  </button>{" "}
                </>
              ) : (
                <></>
              )}
            </div>
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

export default SignupForm;

import { PlusOutlined } from "@ant-design/icons";
import { Modal as AntdModal, Upload } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Styles from "../../styles/Dashboard/Dashboard.module.scss";
import { useEffect, useState } from "react";
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
// import Input from "../../Components/Input";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Modal,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import AlertDialog from "../../Components/common/AlertDialogue";
import { useRouter } from "next/router";
import Colors from "../../constants/colors";
import { selectUser } from "../../redux/reducer/appEssentials";
import Layout from "../../Components/Dashboard/layout";
import {
  useCreateOtpMutation,
  useUpdatePasswordWithOldPasswordforStudentMutation,
  useUpdateStudentProfileMutation,
  useVerifyOtpMutation,
  useVerifyStudentMutation,
} from "redux/Api/signInAndLogin.api";
import MuiPhoneNumber from "material-ui-phone-number";
import parsePhoneNumberFromString from "libphonenumber-js";
import compressAndAppendFiles from "Components/compressAndAppendFiles";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ProfileScreenTemplate = () => {
  //for sidebars
  const router = useRouter();

  const [role, setRole] = useState(null);
  const globleuser = useSelector(selectUser);
  useEffect(() => {
    globleuser && !globleuser.success && router.push("/");
  }, []);
  // useEffect(() => {
  //   setRole(localStorage.getItem('role'))

  // }, [])

  // useEffect(() => {
  //   if (!JSON.parse(localStorage.getItem("wedfield"))) {
  //     router.push("/");
  //   }
  //   setRole(JSON.parse(localStorage.getItem("wedfield")));
  // }, [router]);
  const dispatch = useDispatch();

  //body
  const [headerHeight, setHeaderHeight] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [Alert, SetAlert] = useState({
    visible: false,
    title: "",
    message: "",
  });
  const [profilePic, setProfilePic] = useState([]);
  const [coverPic, setCoverPic] = useState([]);
  const [profilePicLink, setProfilePicLink] = useState("");
  const [coverPicLink, setCoverPicLink] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState(null);
  const [ProfilePicture, setProfilePicture] = useState("");
  const [Phone, setPhone] = useState("");
  const [Address, setAddress] = useState("");
  const [currentPass, setCurrentPass] = useState("");
  const [Password, setPassword] = useState("");
  const [Password2, setPassword2] = useState("");
  const [User, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [NotificationStatus, setNotificationStatus] = useState(true);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isMobileVerified, setIsMobileVerified] = useState(false);
  const [errorMessege, seterrorMessege] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [verifyFor, setVerifyFor] = useState("mobile");
  const [otp, setOtp] = useState("");
  const [otpScreen, setOtpScreen] = useState(false);
  ``;
  const [confirmOTP, setConfirmOTP] = useState("");
  const [value, setValue] = useState("");
  const [commonAlert, setCommonAlert] = useState({ open: false, msg: "" });

  const [studentData, setStudenData] = useState({
    address1: "",
    address2: "",
    city: "",
    country: "",
    landmark: "",
    pincode: "",
    state: "",
    email: "",
    mobile: "",
    name: "",
    currentlyEmployed: false,
    diplomaStatus: false,
    eventsAttended: "",
    height: "",
    internshipStatus: false,
    language: "",
    skincolour: "",
  });
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const setDefaultImages = (url, uid) => {
    return {
      uid,
      status: "done",
      url,
    };
  };
  const setDefaultImages1 = (data) => data?.map((data) => data.url);
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const [isMobileOtpSent, setIsMobileOtpSent] = useState({
    status: false,
    timeOut: null,
  });
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  useEffect(() => {
    setStudenData({
      ...studentData,
      name: globleuser?.data?.name,
      mobile: globleuser?.data?.mobile,
      email: globleuser?.data?.email,
      height: parseInt(globleuser?.data?.personaldetails?.height),
      eventsAttended: parseInt(
        globleuser?.data?.personaldetails?.eventsAttended
      ),
      skincolour: globleuser?.data?.personaldetails?.skincolour,
      internshipStatus: globleuser?.data?.personaldetails?.internshipStatus,
      diplomaStatus: globleuser?.data?.personaldetails?.diplomaStatus,
      currentlyEmployed: globleuser?.data?.personaldetails?.currentlyEmployed,
      language: globleuser?.data?.personaldetails?.language,
      pincode: `${globleuser?.data?.addressDetails?.pincode}`,
      city: globleuser?.data?.addressDetails?.city,
      state: globleuser?.data?.addressDetails?.state,
      country: globleuser?.data?.addressDetails?.country,
      address1: globleuser?.data?.addressDetails?.address1,
      address2: globleuser?.data?.addressDetails?.address2,
      landmark: globleuser?.data?.addressDetails?.landmark,
    });
    setValue(`${globleuser?.data?.mobile}`);
    if (globleuser?.data?.profile_pic) {
      const data = setDefaultImages(globleuser?.data?.profile_pic, 1);

      setProfilePic([data]);
      setProfilePicLink(data.url);
    }

    if (globleuser?.data?.cover_pic?.length) {
      const data = globleuser?.data?.cover_pic?.map((url, uid) => {
        return setDefaultImages(url, uid);
      });
      setCoverPic(data);
      setCoverPicLink(setDefaultImages1(data));
    }
  }, [globleuser]);

  //Header

  const handleCommonAlertClose = (e) => {
    e.preventDefault();
    setCommonAlert({ open: false, msg: "" });
  };
  const [updatePasswordWithOldPasswordforStudent] =
    useUpdatePasswordWithOldPasswordforStudentMutation();
  const updatePassword = async () => {
    if (!currentPass) {
      alert("please enter current Password");
      return;
    }
    if (!Password) {
      alert("please enter new Password");
      return;
    }
    if (!Password2) {
      alert("please re-enter new Password");
      return;
    }
    if (Password !== Password2) {
      alert("new passwords are not same");
      return;
    }
    if (Password === currentPass) {
      alert("new passwords should be different from old Password");
      return;
    }
    try {
      const data = await updatePasswordWithOldPasswordforStudent({
        currentPassword: currentPass,
        newPassword: Password,
      });
      if (data?.data?.success) {
        alert("password changed successfully");
      }
    } catch (error) {
      console.error(
        `🚀 ~ file: profile.jsx:268 ~ updatePassword ~ error:`,
        error
      );
      if (error?.response?.data?.error?.message) {
        alert(error?.response?.data?.error?.message);
        return;
      } else {
        alert("Something went wrong");
      }
    }
  };
  const [updateStudentProfile] = useUpdateStudentProfileMutation();
  const updateProfile = async () => {
    setLoading(true);
    if (!profilePic.length && !profilePicLink.length) {
      alert("please add a profile pic");
      return;
    }
    if (!isValid) {
      alert("Please Enter Proper Number");
      return;
    }
    if (!coverPic.length && !coverPicLink.length) {
      alert("please add a Cover pic");
      return;
    }
    try {
      const form = new FormData();
      const data = {
        name: studentData.name,
        email: studentData.email,
        mobile: `${studentData.mobile}`,
        personaldetails: {
          height: parseInt(studentData.height),
          eventsAttended: parseInt(studentData.eventsAttended),
          skincolour: studentData.skincolour,
          internshipStatus: studentData.internshipStatus,
          diplomaStatus: studentData.diplomaStatus,
          currentlyEmployed: studentData.currentlyEmployed,
          language: studentData.language,
        },
        addressDetails: {
          pincode: `${studentData.pincode}`,
          city: studentData.city,
          state: studentData.state,
          country: studentData.country,
          address1: studentData.address1,
          address2: studentData.address2,
          landmark: studentData.landmark,
        },
      };
      // coverPic &&
      //   coverPic.forEach((item, key) => {
      //     form.append("cover", item.originFileObj);
      //   });
      // profilePic &&
      //   profilePic.forEach((item, key) => {
      //     form.append("profile", item.originFileObj);
      //   });

      await compressAndAppendFiles(coverPic, form, "cover");
      await compressAndAppendFiles(profilePic, form, "profile");

      form.append("data", JSON.stringify(data));
      form.append("profilelink", profilePicLink);
      form.append("coverlink", JSON.stringify(coverPicLink));
      let res = await updateStudentProfile(form);
      res = JSON.parse(JSON.stringify(res));
      if (res?.data) {
        const responseData = res.data;
        responseData.data.token = globleuser.data.token;
        localStorage.setItem("wedfield", JSON.stringify(responseData));
        setLoading(false);
        alert("updated Succesfully");
        location.reload(true);
      }
    } catch (error) {
      setLoading(false);
      console.error("rr", error);
      alert(error?.response?.data?.error?.message);
    }
  };

  function ValidateEmail(mail) {
    if (
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
        myForm.emailAddr.value
      )
    ) {
      return true;
    }
    alert("You have entered an invalid email address!");
    return false;
  }
  const [createOtp] = useCreateOtpMutation();
  const SendMobileOTP = async (type) => {
    if (type === "sent") {
      if (!isMobileOtpSent.status) {
        const persisOtpData = {};
        try {
          const data = await createOtp({
            mobile: studentData.mobile,
          });
          if (data) {
            persisOtpData.status = true;
            const timeout = setTimeout(() => {
              setIsMobileOtpSent({
                ...isMobileOtpSent,
                status: false,
              });
            }, 300000);
            persisOtpData.timeOut = timeout;
            setIsMobileOtpSent(persisOtpData);
            alert("otp Sent Successfuly");
          }
        } catch (error) {
          console.error(
            `🚀 ~ file: profile.jsx:352 ~ SendMobileOTP ~ error:`,
            error
          );
          alert("error occured while sending otp");
        }
      }
    } else {
      try {
        const data = await createOtp({
          mobile: studentData.mobile,
        });
        if (data) {
          clearTimeout(isMobileOtpSent.timeOut);
          const timeout = setTimeout(() => {
            setIsMobileOtpSent({
              ...isMobileOtpSent,
              status: false,
            });
          }, 300000);
          setIsMobileOtpSent({
            ...isMobileOtpSent,
            timeOut: timeout,
          });
          alert("otp re-Sent Successfuly");
        }
      } catch (error) {
        console.error(
          `🚀 ~ file: profile.jsx:352 ~ SendMobileOTP ~ error:`,
          error
        );
        alert("error occured while sending otp");
      }
    }
    setModalVisible(true);
  };
  const [verifyOtp] = useVerifyOtpMutation();
  const [verifyStudent] = useVerifyStudentMutation();
  const VerifyOTP = async (type) => {
    if (!otp.length) {
      alert("please neter otp");
      return;
    }
    if (type === "mobile") {
      const response = await verifyOtp({
        mobile: studentData.mobile,
        otp,
      });

      if (response?.data?.success) {
        const responce = await verifyStudent({ mobile: studentData.mobile });
        role.student.is_mobile_verified = true;
        role.student.is_approved = true;
        role.student.mobile = studentData.mobile;
        setRole(role);
        localStorage.setItem(
          "wedfield",
          JSON.stringify({
            student: role.student,
            token: globleuser?.data?.token,
          })
        );
        alert("mobile verify succesfully");
        location.reload(true);
      }
    }

    setModalVisible(false);
  };
  const errorr = () =>
    toast.error("image cant be uploaded with size bigger then 500kb", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const uploadErrorr = () =>
    toast.error("Somethimg went wrong please try again", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const uploadSucsess = () =>
    toast.success("Uploading done Successfully", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const editSucsess = () =>
    toast.success("Edit done Successfully", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const VerifyEmailOTP = async () => {};

  const handleChangeCover = ({ fileList: newFileList, file }) => {
    if (file.status !== "removed") {
      if (file.size / 1028 <= 500) {
        setCoverPic(newFileList);
      } else {
        errorr();
      }
    } else {
      const data = newFileList
        .filter((data) => data.url)
        .map((data) => data.url);
      setCoverPicLink(data);
      setCoverPic(newFileList);
    }
  };

  const handleChangeProfile = ({ fileList: newFileList, file }) => {
    if (file.status !== "removed") {
      if (file.size / 1028 <= 500) {
        setProfilePic(newFileList);
      } else {
        errorr();
      }
    } else {
      setProfilePic(newFileList);
      setProfilePicLink("");
    }
  };
  const [isValid, setIsValid] = useState(true);
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
    setStudenData({
      ...studentData,
      mobile: newValue.replace(/[^\d]/g, ""),
    });
    if (isMobileOtpSent) {
      clearTimeout(isMobileOtpSent.timeOut);
      setIsMobileOtpSent({
        status: false,
        timeOut: null,
      });
    }
  };
  return (
    <Layout>
      <div className={` bg-grey`} style={{ width: "95%", alignSelf: "center" }}>
        <div className="main_dashboard position-relative">
          <div className={`${Styles.main_content} ms-auto`}>
            <Modal
              open={modalVisible}
              onClose={() => setModalVisible(false)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Box sx={styles.centeredBox}>
                  <Box sx={styles.modalBox}>
                    <Typography sx={styles.modalText}>
                      Type OTP received
                    </Typography>
                    <TextField
                      floatingPlaceholder
                      floatOnFocus
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="OTP"
                      type="number"
                      style={{
                        marginBottom: "10px",
                      }}
                    />
                    <Box onClick={() => SendMobileOTP("re-sent")}>
                      <Typography
                        sx={{ color: Colors.primary, fontWeight: "bold" }}
                      >
                        Resend OTP
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: "15px",
                      }}
                    >
                      <Button
                        variant="text"
                        onClick={() => VerifyOTP("mobile")}
                      >
                        Confirm
                      </Button>
                      <Button
                        variant="text"
                        onClick={() => setModalVisible(false)}
                      >
                        Cancel
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Modal>

            <div className="form-container">
              <h4 className="mb-4">Student Info</h4>
              {/* <Box
              sx={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box sx={{ flex: 1, paddingHorizontal: 5 }}>
                <Button
                  title="Orders"
                  onClick={() => navigation.navigate("Orders")}
                />
              </Box>
              <Box sx={{ flex: 1, paddingHorizontal: 5 }}>
                <Button
                  title="Cart"
                  onClick={() => navigation.navigate("CartList")}
                />
              </Box>
            </Box> */}
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                required
                id="name"
                textNumSpace
                minLength={1}
                label="Name"
                value={studentData?.name}
                onChange={(text) => {
                  setStudenData({
                    ...studentData,
                    name: text.target.value,
                  });
                }}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                required
                id="email"
                textNumSpace
                minLength={1}
                label="Email"
                value={studentData?.email}
                onChange={(text) => {
                  setStudenData({
                    ...studentData,
                    email: text.target.value,
                  });
                }}
              />
              {role?.student?.is_email_verified ? (
                <Typography sx={{ color: "green", marginBottom: 1 }}>
                  Verified
                </Typography>
              ) : (
                <Box onClick={() => {}}>
                  <Typography
                    sx={{
                      color: Colors.primary,
                      fontWeight: "bold",
                      marginBottom: 1,
                    }}
                  >
                    Send OTP
                  </Typography>
                </Box>
              )}
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
              {/* <TextField
                type="number"
                variant="outlined"
                margin="normal"
                fullWidth
                required
                id="phone"
                textNumSpace
                minLength={1}
                label="Phone"
                value={studentData?.mobile}
                onChange={(text) => {
                  setStudenData({
                    ...studentData,
                    mobile: text.target.value,
                  });
                  if (isMobileOtpSent) {
                    clearTimeout(isMobileOtpSent.timeOut);
                    setIsMobileOtpSent({
                      status: false,
                      timeOut: null,
                    });
                  }
                }}
              /> */}
              {role?.student?.is_mobile_verified ? (
                <Typography sx={{ color: "green", marginBottom: 1 }}>
                  Verified
                </Typography>
              ) : (
                <Box onClick={() => SendMobileOTP("sent")}>
                  <Typography
                    sx={{
                      color: Colors.primary,
                      fontWeight: "bold",
                      marginBottom: 1,
                    }}
                  >
                    Send OTP
                  </Typography>
                </Box>
              )}
              <h4 className="mb-4" style={{ marginTop: "15px" }}>
                Student Personal Info
              </h4>
              <Grid
                container
                direction={"row"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Grid item xs={3}>
                  <FormLabel id="currentlyEmployed">Profile Images</FormLabel>
                  <br />
                  <br />
                  <Upload
                    listType="picture-card"
                    fileList={profilePic}
                    onPreview={handlePreview}
                    onChange={handleChangeProfile}
                  >
                    {profilePic.length >= 1 ? null : uploadButton}
                  </Upload>
                </Grid>
                <Grid item xs={9}>
                  <FormLabel id="currentlyEmployed">Cover Images</FormLabel>
                  <br />
                  <br />
                  <Upload
                    listType="picture-card"
                    fileList={coverPic}
                    onPreview={handlePreview}
                    onChange={handleChangeCover}
                  >
                    {coverPic.length >= 5 ? null : uploadButton}
                  </Upload>
                </Grid>
              </Grid>
              <br />
              <Grid
                container
                direction={"row"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Grid item xs={4}>
                  <FormControl style={{}}>
                    <FormLabel id="currentlyEmployed">
                      Currently Employed
                    </FormLabel>
                    <RadioGroup
                      value={`${studentData.currentlyEmployed}`}
                      name="radio-buttons-group"
                      onChange={(e) => {
                        setStudenData({
                          ...studentData,
                          currentlyEmployed: "true" === e.target.value,
                        });
                      }}
                    >
                      <FormControlLabel
                        value="true"
                        control={<Radio />}
                        label="True"
                      />
                      <FormControlLabel
                        value="false"
                        control={<Radio />}
                        label="False"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl>
                    <FormLabel id="currentlyEmployed">Diploma Status</FormLabel>
                    <RadioGroup
                      value={`${studentData.diplomaStatus}`}
                      name="radio-buttons-group"
                      onChange={(e) => {
                        setStudenData({
                          ...studentData,
                          diplomaStatus: "true" === e.target.value,
                        });
                      }}
                    >
                      <FormControlLabel
                        value="true"
                        control={<Radio />}
                        label="True"
                      />
                      <FormControlLabel
                        value="false"
                        control={<Radio />}
                        label="False"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl>
                    <FormLabel id="currentlyEmployed">
                      Internship Status
                    </FormLabel>
                    <RadioGroup
                      value={`${studentData.internshipStatus}`}
                      name="radio-buttons-group"
                      onChange={(e) => {
                        setStudenData({
                          ...studentData,
                          internshipStatus: "true" === e.target.value,
                        });
                      }}
                    >
                      <FormControlLabel
                        value="true"
                        control={<Radio />}
                        label="True"
                      />
                      <FormControlLabel
                        value="false"
                        control={<Radio />}
                        label="False"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Grid>
              <TextField
                type="number"
                variant="outlined"
                margin="normal"
                fullWidth
                required
                id="eventsAttended"
                textNumSpace
                minLength={1}
                label="Events Attended"
                value={studentData.eventsAttended}
                onChange={(text) => {
                  setStudenData({
                    ...studentData,
                    eventsAttended: text.target.value,
                  });
                }}
              />
              <TextField
                type="number"
                variant="outlined"
                margin="normal"
                fullWidth
                required
                id="height"
                textNumSpace
                minLength={1}
                label="Height"
                value={studentData.height}
                onChange={(text) => {
                  setStudenData({
                    ...studentData,
                    height: text.target.value,
                  });
                }}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                required
                id="language"
                textNumSpace
                minLength={1}
                label="Language"
                value={studentData.language}
                onChange={(text) => {
                  setStudenData({
                    ...studentData,
                    language: text.target.value,
                  });
                }}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                required
                id="skincolour"
                textNumSpace
                minLength={1}
                label="Skin Colour"
                value={studentData.skincolour}
                onChange={(text) => {
                  setStudenData({
                    ...studentData,
                    skincolour: text.target.value,
                  });
                }}
              />
              <h4 className="mb-4" style={{ marginTop: "15px" }}>
                Student Address Info
              </h4>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                required
                id="address1"
                textNumSpace
                minLength={1}
                label="Address 1"
                value={studentData.address1}
                onChange={(text) => {
                  setStudenData({
                    ...studentData,
                    address1: text.target.value,
                  });
                }}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                required
                id="address2"
                textNumSpace
                minLength={1}
                label="Address 2"
                value={studentData.address2}
                onChange={(text) => {
                  setStudenData({
                    ...studentData,
                    address2: text.target.value,
                  });
                }}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                required
                id="city"
                textNumSpace
                minLength={1}
                label="City"
                value={studentData.city}
                onChange={(text) => {
                  setStudenData({
                    ...studentData,
                    city: text.target.value,
                  });
                }}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                required
                id="state"
                textNumSpace
                minLength={1}
                label="State"
                value={studentData.state}
                onChange={(text) => {
                  setStudenData({
                    ...studentData,
                    state: text.target.value,
                  });
                }}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                required
                id="country"
                textNumSpace
                minLength={1}
                label="Country"
                value={studentData.country}
                onChange={(text) => {
                  setStudenData({
                    ...studentData,
                    country: text.target.value,
                  });
                }}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                required
                id="landmark"
                textNumSpace
                minLength={1}
                label="landmark"
                value={studentData.landmark}
                onChange={(text) => {
                  setStudenData({
                    ...studentData,
                    landmark: text.target.value,
                  });
                }}
              />
              <TextField
                type="number"
                variant="outlined"
                margin="normal"
                fullWidth
                required
                id="pincode"
                textNumSpace
                minLength={1}
                label="Pincode"
                value={studentData.pincode}
                onChange={(text) => {
                  setStudenData({
                    ...studentData,
                    pincode: text.target.value,
                  });
                }}
              />
              <Button fullWidth onClick={updateProfile}>
                Update Profile
              </Button>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                required
                id="currentPassword"
                textNumSpace
                minLength={1}
                label="Current Password"
                value={currentPass}
                onChange={(text) => {
                  setCurrentPass(text.target.value);
                }}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                required
                id="newPassword"
                textNumSpace
                minLength={1}
                label="New Password"
                value={Password}
                onChange={(text) => {
                  setPassword(text.target.value);
                }}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                required
                id="newPasswordTwo"
                textNumSpace
                minLength={1}
                label="Re-Type New Password"
                value={Password2}
                onChange={(text) => {
                  setPassword2(text.target.value);
                }}
              />
              <Button fullWidth onClick={updatePassword}>
                Update Password
              </Button>
              {/* <Input
              variant="outlined"
              margin="normal"
              fullWidth
              required
              id="productTitle"
              textNumSpace
              minLength={1}
              label="Product Title"
              name="productTitle"
              autoComplete="productTitle"
              errorText="Please enter a valid title!"
              //   keyboardType="default"
              //   autoCapitalize="sentences"
              //   autoCorrect
              returnKeyType="next"
              onInputChange={(text) => {
              }}
              initialValue={"Value"}
              initiallyValid={true}
            /> */}
              {/* <div className="row">
              <div className="col-md-8">
                <div className="mb-3">
                  <input
                    type="text"
                    placeholder="Enter Old Password"
                    className="form-control py-2"
                  />
                </div>
              </div>
              <div className="col-md-8">
                <div className="mb-3">
                  <input
                    type="text"
                    placeholder="Enter New Password"
                    className="form-control py-2"
                  />
                </div>
              </div>
            </div> */}
              {/* <button className="primary-sm-btn">Submit</button> */}
            </div>
            <AlertDialog
              open={commonAlert.open}
              onClose={handleCommonAlertClose}
            >
              {commonAlert.msg}
            </AlertDialog>
          </div>
        </div>
        <AntdModal
          open={previewOpen}
          title={previewTitle}
          footer={null}
          onCancel={handleCancel}
        >
          <img
            alt="example"
            style={{
              width: "100%",
            }}
            src={`${S3PROXY}${previewImage}`}
          />
        </AntdModal>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </Layout>
  );
};

export default ProfileScreenTemplate;

const styles = {
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width: "80%",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    // alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: "20px",
    fontSize: "24px",
    textAlign: "start",
  },
};

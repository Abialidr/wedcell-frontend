import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import AlertDialog from "../common/AlertDialogue";
import { useRouter } from "next/router";
import Colors from "../../constants/colors";
import { loginRoute, selectUser } from "../../redux/reducer/appEssentials";
import { user as user1 } from "../../redux/reducer/appEssentials";
import { RiDeleteBin6Line } from "react-icons/ri";
import Layout from "../Dashboard/layout";
import useWindowSize from "@rooks/use-window-size";
import {
  useUpdateCustomerProfileMutation,
  useUpdatePasswordWithOldPasswordMutation,
  useVerifyOtpinprofileMutation,
} from "redux/Api/signInAndLogin.api";
import { MuiTelInput } from "mui-tel-input";
import parsePhoneNumberFromString from "libphonenumber-js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaTrash } from "react-icons/fa";
import { useDeleteMeMutation } from "redux/Api/others.api";

const ProfileScreenTemplate = () => {
  const globleuser = useSelector(selectUser);
  const [deleteMe] = useDeleteMeMutation();
  const [shippingAddress, setShippingAddress] = useState([
    {
      name: "",
      address1: "",
      address2: "",
      landmark: "",
      state: "",
      country: "",
      city: "",
      pincode: "",
      number: "",
      email: "",
    },
  ]);
  const [Alert, SetAlert] = useState({
    visible: false,
    title: "",
    message: "",
  });
  const [name, setName] = useState("");
  const [deleteAlert, setDeleteAlaert] = useState(false);
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
  const [isEmailVerified, setIsEmailVerified] = useState(true);
  const [isMobileVerified, setIsMobileVerified] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [verifyFor, setVerifyFor] = useState("mobile");
  const [otp, setOtp] = useState("");
  const [otpScreen, setOtpScreen] = useState(false);
  const [confirmOTP, setConfirmOTP] = useState("");
  const router = useRouter();
  const [commonAlert, setCommonAlert] = useState({ open: false, msg: "" });
  const dispatch = useDispatch();
  dispatch(loginRoute(""));
  let user = true;

  useEffect(() => {
    user = globleuser;
    if (!user) {
      router.back();
      dispatch(
        loginRoute({
          pathname: router.pathname,
          query: router.query,
        })
      );
    } else {
      if (typeof user !== "boolean") {
        setName(user?.data?.name);
        setEmail(user?.data?.email);
        setPhone(user?.data?.mobile);
        setValue(user?.data?.mobile);
        setAddress(user?.data?.address);
        setShippingAddress(
          user?.data?.shipping_address
            ? JSON.parse(JSON.stringify(user?.data?.shipping_address))
            : [
              {
                address1: "",
                address2: "",
                landmark: "",
                state: "",
                country: "",
                city: "",
                pincode: "",
                name: "",
                email: "",
                number: "",
              },
            ]
        );
        setIsEmailVerified(true);
        setIsMobileVerified(true);
      }
    }
  }, [router]);

  const handleCommonAlertClose = (e) => {
    e.preventDefault();
    setCommonAlert({ open: false, msg: "" });
  };
  const [updatePasswordWithOldPassword] =
    useUpdatePasswordWithOldPasswordMutation();
  const [updateCustomerProfile] = useUpdateCustomerProfileMutation();
  const updatePassword = async () => {
    setLoading(true);
    setModalVisible(false);
    const res = await updatePasswordWithOldPassword({
      currentPassword: currentPass,
      password: Password,
    });
    if (res?.data?.success) {
      SetAlert({
        visible: true,
        title: "Success",
        message: `${res.data}`,
      });
      setLoading(false);
    } else {
      setLoading(false);
      SetAlert({
        visible: true,
        title: "Error",
        message: "Error in updating your profile,  Kindly try again",
      });
    }
  };

  const updateProfile = async () => {
    setLoading(true);
    setModalVisible(false);
    const config = {
      headers: {
        authorization: globleuser?.data?.token,
      },
    };
    if (!isValid) {
      alert("Please Enter Proper Number");
      return;
    }
    try {
      let res = await updateCustomerProfile({
        _id: globleuser?.data?._id,
        shipping_address: shippingAddress,
        mobile: Phone,
        name,
        email,
        profile_pic: [],
      });
      res = JSON.parse(JSON.stringify(res));
      const user = res?.data?.data;
      setUser(user);
      setPhoto(null);
      setProfilePicture("");
      setLoading(false);
      res.data.data.token = globleuser?.data?.token;
      dispatch(user1(res.data));
      localStorage.setItem("wedfield", JSON.stringify(res.data));
    } catch (e) {
      console.error(`🚀 ~ file: profile.js:250 ~ updateProfile ~ e:`, e);
      setLoading(false);
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
  const [verifyOtpinprofile] = useVerifyOtpinprofileMutation();
  const SendMobileOTP = async () => {
    if (Phone.length < 10 || Phone.length > 10) {
      setLoading(false);
      alert("Please enter a valid Phone number");
      return;
    }
    setLoading(true);
    verifyOtpinprofile({
      mobile: Phone,
    });
    if (res?.data?.success) {
      setLoading(false);
      setOtpScreen(true);
      setConfirmOTP(res.data.otp);
      setVerifyFor("mobile");
      setModalVisible(true);
      alert("OTP sent");
    } else {
      setLoading(false);
      alert("OTP not sent:", e.message);
    }
  };

  const VerifyOTP = async () => {
    if (!otp.length) {
      return;
    }
    let verify = false;
    setLoading(true);

    if (otp === confirmOTP) {
      setLoading(true);
      if (verifyFor === "mobile") {
        setIsMobileVerified(true);
      } else if (verifyFor === "email") {
        setIsEmailVerified(true);
      }
      setLoading(false);
    } else {
      alert("OTP is not correct");
      setLoading(false);
    }

    setModalVisible(false);
  };

  const { innerWidth: windowWidth } = useWindowSize();

  const [isValid, setIsValid] = useState(true);
  const [value, setValue] = useState();
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
    setPhone(newValue.replace(/[^\d]/g, ""));
  };
  return (
    <Layout>
      <div
        style={{
          width: "95%",
          marginTop: "20px",
        }}
      >
        <Modal
          visible={modalVisible}
          onRequestClose={() => {
            alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <Box sx={styles.centeredBox}>
            <Box sx={styles.modalBox}>
              <Typography sx={styles.modalText}>Type OTP received</Typography>
              <TextField
                floatingPlaceholder
                floatOnFocus
                text75
                value={otp}
                onChangeText={(text) => setOtp(text)}
                placeholder="OTP"
                floatingPlaceholderColor={{
                  default: "grey",
                  error: "red",
                  focus: "grey",
                  disabled: "grey",
                }}
                underlineColor={{
                  default: "grey",
                  error: "red",
                  focus: "grey",
                  disabled: "grey",
                }}
              />
              <Box onClick={SendMobileOTP}>
                <Typography sx={{ color: Colors.primary, fontWeight: "bold" }}>
                  Resend OTP
                </Typography>
              </Box>
              <Box
                sx={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 10,
                }}
              >
                <Button title="Confirm" onClick={VerifyOTP} />
                <Button
                  title="Cancel"
                  onClick={() => setModalVisible(!modalVisible)}
                />
              </Box>
            </Box>
          </Box>
        </Modal>
        <div className="form-container">
          <h4 className="">User Info</h4>

          {/* <Box
            sx={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box sx={{ flex: 1, paddingHorizontal: 5 }}>
              <Button
                title='Orders'
                onClick={() => navigation.navigate('Orders')}
              />
            </Box>
            <Box sx={{ flex: 1, paddingHorizontal: 5 }}>
              <Button
                title='Cart'
                onClick={() => navigation.navigate('CartList')}
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
            value={name}
            onChange={(text) => {
              setName(text.target.value);
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
            value={email}
            onChange={(text) => {
              setEmail(text.target.value);
              if (text.target.value === user.email) {
                setIsEmailVerified(true);
              } else {
                setIsEmailVerified(false);
              }
            }}
          />
          {isEmailVerified ? (
            <Typography sx={{ color: "green", marginBottom: 1 }}>
              Verified
            </Typography>
          ) : (
            <Box onClick={SendMobileOTP}>
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
            variant="outlined"
            margin="normal"
            fullWidth
            required
            id="phone"
            textNumSpace
            minLength={1}
            label="Phone"
            value={Phone}
            onChange={(text) => {
              setPhone(text.target.value);
              if (text.target.value === user.mobile) {
                setIsMobileVerified(true);
              } else {
                setIsMobileVerified(false);
              }
            }}
          /> */}
          {isMobileVerified ? (
            <Typography sx={{ color: "green", marginBottom: 1 }}>
              Verified
            </Typography>
          ) : (
            <Box onClick={SendMobileOTP}>
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

          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <span style={{ fontSize: "20px" }}>Address</span>
            <span
              style={{ fontSize: "20px", marginLeft: "10px" }}
              onClick={() => {
                const newadd = {
                  name: "",
                  number: "",
                  email: "",
                  address1: "",
                  address2: "",
                  landmark: "",
                  state: "",
                  country: "",
                  city: "",
                  pincode: "",
                };
                setShippingAddress((old) => [...old, newadd]);
              }}
            >
              +
            </span>
          </div>
          {shippingAddress?.map((data, key) => {
            return (
              <div>
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    required
                    id="shipppingAddress"
                    textNumSpace
                    minLength={1}
                    label="Address 1"
                    value={data?.address1}
                    onChange={(e) => {
                      const newarr = [...shippingAddress];
                      newarr[key].address1 = e.target.value;
                      setShippingAddress(newarr);
                    }}
                  />
                </div>
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    required
                    id="shipppingAddress"
                    textNumSpace
                    minLength={1}
                    label="Address 2"
                    value={data?.address2}
                    onChange={(e) => {
                      const newarr = [...shippingAddress];
                      newarr[key].address2 = e.target.value;
                      setShippingAddress(newarr);
                    }}
                  />
                </div>
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    required
                    id="shipppingAddress"
                    textNumSpace
                    minLength={1}
                    label="Land Mark"
                    value={data?.landmark}
                    onChange={(e) => {
                      const newarr = [...shippingAddress];
                      newarr[key].landmark = e.target.value;
                      setShippingAddress(newarr);
                    }}
                  />
                </div>
                <div className="row">
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                    <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      required
                      id="shipppingAddress"
                      textNumSpace
                      minLength={1}
                      label="State"
                      value={data?.state}
                      onChange={(e) => {
                        const newarr = [...shippingAddress];
                        newarr[key].state = e.target.value;
                        setShippingAddress(newarr);
                      }}
                    />
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                    <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      required
                      id="shipppingAddress"
                      textNumSpace
                      minLength={1}
                      label="Country"
                      value={data?.country}
                      onChange={(e) => {
                        const newarr = [...shippingAddress];
                        newarr[key].country = e.target.value;
                        setShippingAddress(newarr);
                      }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                    <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      required
                      id="shipppingAddress"
                      textNumSpace
                      minLength={1}
                      label="City"
                      value={data?.city}
                      onChange={(e) => {
                        const newarr = [...shippingAddress];
                        newarr[key].city = e.target.value;
                        setShippingAddress(newarr);
                      }}
                    />
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                    <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      required
                      id="shipppingAddress"
                      textNumSpace
                      minLength={1}
                      label="Pincode"
                      value={data?.pincode}
                      onChange={(e) => {
                        const newarr = [...shippingAddress];
                        newarr[key].pincode = e.target.value;
                        setShippingAddress(newarr);
                      }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                    <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      required
                      id="shipppingAddress"
                      textNumSpace
                      minLength={1}
                      label="Shipping Name"
                      value={data?.name}
                      onChange={(e) => {
                        const newarr = [...shippingAddress];
                        newarr[key].name = e.target.value;
                        setShippingAddress(newarr);
                      }}
                    />
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                    <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      required
                      id="shipppingAddress"
                      textNumSpace
                      minLength={1}
                      label="Number"
                      value={data?.number}
                      onChange={(e) => {
                        const newarr = [...shippingAddress];
                        newarr[key].number = e.target.value;
                        setShippingAddress(newarr);
                      }}
                    />
                  </div>
                </div>
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    required
                    id="shipppingAddress"
                    textNumSpace
                    minLength={1}
                    label="Email"
                    value={data?.email}
                    onChange={(e) => {
                      const newarr = [...shippingAddress];
                      newarr[key].email = e.target.value;
                      setShippingAddress(newarr);
                    }}
                  />
                </div>
                {shippingAddress.length !== 1 ? (
                  <div className="col-md-4" style={{ marginTop: 30 }}>
                    <span
                      onClick={() => {
                        const newarr = [...shippingAddress];
                        newarr.splice(key, 1);
                        setShippingAddress(newarr);
                      }}
                      className="fs-5 cursor-pointer"
                    >
                      <RiDeleteBin6Line />
                    </span>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            );
          })}
          <Button fullWidth onClick={updateProfile}>
            Update Profile
          </Button>

          {/* <TextField
            variant='outlined'
            margin='normal'
            fullWidth
            required
            id='currentPassword'
            textNumSpace
            minLength={1}
            label='Current Password'
            value={currentPass}
            onChange={(text) => {
              setCurrentPass(text.target.value);
            }}
          />
          <TextField
            variant='outlined'
            margin='normal'
            fullWidth
            required
            id='newPassword'
            textNumSpace
            minLength={1}
            label='New Password'
            value={Password}
            onChange={(text) => {
              setPassword(text.target.value);
            }}
          />
          <TextField
            variant='outlined'
            margin='normal'
            fullWidth
            required
            id='newPasswordTwo'
            textNumSpace
            minLength={1}
            label='Re-Type New Password'
            value={Password2}
            onChange={(text) => {
              setPassword2(text.target.value);
            }}
          />

          <Button
            fullWidth
            onClick={updatePassword}
          >
            Update Password
          </Button> */}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "start",
            gap: "12px",
            width: "100%",
            padding: "20px 0px",
          }}
          onClick={() => {
            setDeleteAlaert(true);
          }}
        >
          <FontAwesomeIcon
            style={{
              height: "24px",
            }}
            icon={["fa", "fa-trash"]}
            color="#BB2131"
          ></FontAwesomeIcon>
          <h1
            style={{
              fontFamily: "Poppins",
              fontSize: "16px",
              fontWeight: "400",
              lineHeight: "20px",
              textAlign: "left",
              color: "#BB2131",
              padding: "0px",
              margin: "0px",
            }}
          >
            delete Account
          </h1>
        </div>
        <AlertDialog open={commonAlert.open} onClose={handleCommonAlertClose}>
          {commonAlert.msg}
        </AlertDialog>

        <Dialog
          open={deleteAlert}
          onClose={() => {
            setDeleteAlaert(false);
          }}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle
            id="alert-dialog-title"
            style={{
              background: " #B6255A",
              color: "white",
              textAlign: "center",
            }}
          >
            <span
              style={{
                fontFamily: "Poppins",
                fontSize: "18px",
                fontWeight: "400",
                lineHeight: "20px",
                textAlign: "center",
                color: "#ffffff",
                padding: "0px",
                margin: "0px",
              }}
            >
              Delete Account
            </span>
          </DialogTitle>
          <DialogContent
            style={{
              textAlign: "center",
              marginTop: "10px",
            }}
          >
            <DialogContentText id="alert-dialog-description">
              <span
                style={{
                  fontFamily: "Poppins",
                  fontSize: "16px",
                  fontWeight: "600",
                  lineHeight: "20px",
                  textAlign: "center",
                  color: "#000000",
                  padding: "0px",
                  margin: "0px",
                }}
              >
                Are you sure ?
              </span>
              <br></br>
              <span
                style={{
                  fontFamily: "Poppins",
                  fontSize: "16px",
                  fontWeight: "400",
                  lineHeight: "20px",
                  textAlign: "center",
                  color: "#000000",
                  padding: "0px",
                  margin: "0px",
                }}
              >
                Once you confirm, all of your account data will be permanently
                deleted.
              </span>
            </DialogContentText>
          </DialogContent>
          <DialogActions
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              style={{
                background: " #B6255A",
                color: "white",
                textAlign: "center",
              }}
              onClick={() => {
                setDeleteAlaert(false);
              }}
              color="primary"
            >
              cancel
            </Button>
            <Button
              style={{
                background: " #B6255A",
                color: "white",
                textAlign: "center",
              }}
              onClick={async () => {
                const res = await deleteMe();
                if (res.data.success) {
                  alert("we are sad to let you go\nuser deleted successfully");
                  localStorage.removeItem("wedfield");
                  localStorage.setItem("wedfieldIsLoged", "");
                  localStorage.removeItem("role");
                  dispatch(user1(undefined));
                  router.push("/");
                }
              }}
              color="primary"
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
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
    marginBottom: 15,
    textAlign: "center",
  },
};

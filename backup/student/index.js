import React, { useState } from "react";
import StudentCard from "../../Components/Student/StudentCard";
import { PROXY, S3PROXY } from "../../config";
import {
  Box,
  Dialog,
  InputBase,
  Paper,
  Select,
  Stack,
  Typography,
  styled,
  Button,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@mui/material";
// import { useRouter } from 'next/navigation';
import { useRouter } from "next/router";
import { useEffect } from "react";
import useWindowSize from "@rooks/use-window-size";
import Styles from "./Student.module.css";
import { selectLocation } from "../../redux/reducer/appEssentials";
import { useSelector } from "react-redux";
import {
  useGetAllStudentsByCityQuery,
  useGetAllStudentsQuery,
} from "redux/Api/common.api";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { useCheckOutKeyQuery, useCheckOutMutation } from "redux/Api/others.api";

const Circle1 = styled(Box)(({ theme }) => ({
  height: "42px",
  width: "42px",
  border: "4.2px solid #FFFFFF",
  borderRadius: "50%",
  position: "absolute",
  top: "130px",
  right: "345px",
}));
const Circle2 = styled(Box)(({ theme }) => ({
  height: "15px",
  width: "15px",
  border: "1.5px solid #FFFFFF",
  borderRadius: "50%",
  position: "absolute",
  top: "280px",
  right: "445px",
}));

const Circle4 = styled(Box)(({ theme }) => ({}));

const Circle3 = styled(Box)(({ theme }) => ({
  height: "736px",
  width: "736px",
  // border: "1.5px solid #FFFFFF",
  backgroundColor: "#FFFFFF",
  borderRadius: "50%",
  position: "absolute",
  top: "150px",
  right: "-285px",
}));

const Typo1 = styled(Typography)(({ theme }) => ({
  fontFamily: "Poppins",
}));

const Typo2 = styled(Typography)(({ theme }) => ({
  fontFamily: "Poppins",
}));

const Typo3 = styled(Typography)(({ theme }) => ({
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: "600",
  fontSize: "34px",
  lineHeight: "50px",
  color: "#000000",
  margin: "65px 0px 40px",
}));

const Typo4 = styled(Typography)(({ theme }) => ({
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: "500",
  fontSize: "30px",
  lineHeight: "46px",
  color: "#000000",
}));
const Typo5 = styled(Typography)(({ theme }) => ({
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: "400",
  fontSize: "20px",
  lineHeight: "46px",
  color: "#000000",
}));

const Select1 = styled(Select)(({ theme }) => ({
  color: "black",
  background: "white",
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "18px",
  lineFeight: "42px",
}));

const Input1 = styled(InputBase)(({ theme }) => ({
  color: "black",
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "18px",
  lineFeight: "42px",
}));

function index({ origin }) {
  const { innerWidth, innerHeight, outerHeight, outerWidth } = useWindowSize();
  const [searchText, setsearchText] = useState("");
  const [allData, setAllData] = useState([]);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const router = useRouter();
  const [studentsData, setStudentsData] = useState([]);
  // const [location, setlocation] = useState();
  const location = useSelector(selectLocation);
  useEffect(() => {}, [studentsData]);

  // useEffect(() => {
  //   window.addEventListener("location", () => {
  //     // When local storage changes, dump the list to
  //     // the console.
  //     setlocation(
  //       localStorage.getItem("location")
  //         ? localStorage.getItem("location")
  //         : null
  //     );
  //   });
  // }, []);
  const [loca, setLoca] = useState();
  const { data: allStudents } = useGetAllStudentsQuery();
  const {
    data: allStudentbyCity,
    refetch: cityRefetch,
    error,
  } = useGetAllStudentsByCityQuery(location ? location : null);
  useEffect(() => {
    const loca = location ? location : null;
    if (!loca) {
      if (allStudents) {
        let filteredData = allStudents;
        if (searchText) {
          filteredData = filteredData.filter((data) =>
            data.name.toLowerCase().includes(searchText.toLowerCase())
          );
        }
        setStudentsData(filteredData);
        setAllData(allStudents);
      }
    } else {
      const responce = { data: allStudentbyCity };
      if (responce) {
        let filteredData = responce?.data;
        if (searchText) {
          filteredData = filteredData?.filter((data) =>
            data.name.toLowerCase().includes(searchText.toLowerCase())
          );
        }
        setStudentsData(filteredData);
        setAllData(responce.data);
      } else if (error) {
        setStudentsData([]);
      }
    }
  }, [location, allStudents, allStudentbyCity]);
  const [currentId, setCurrentId] = useState("");
  const handleClickOpen = (data, setCurrentId) => {
    setCurrentId(data);
    setOpen(true);
  };
  let states = [
    "Select",
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttarakhand",
    "Uttar Pradesh",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli",
    "Daman and Diu",
    "Delhi",
    "Lakshadweep",
    "Puducherry",
  ];
  const [checkOut] = useCheckOutMutation();
  const { data: checkOutKey } = useCheckOutKeyQuery();
  const getPayment = async () => {
    const { data: amountData } = await checkOut({
      price: 50,
    });
    const { data: keyData } = { data: checkOutKey };
    const options = {
      key: keyData?.key,
      amount: amountData?.amount,
      currency: "INR",
      name: "WedField",
      description: "Test Transaction",
      image: "/assests/webp/logo.webp",
      order_id: amountData?.id,
      callback_url: `student/${currentId}`,
      // prefill: {
      //   name: inputValues.name,
      //   email: inputValues.email,
      //   contact: inputValues.number,
      // },
      notes: {
        address: "Delhi",
      },
      theme: {
        color: "#3399cc",
      },
    };

    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  };
  return (
    <Box
      sx={{
        paddingTop: {
          xs: "64px",
          md: "99px",
        },
      }}
    >
      <Box className={Styles.black_box}>
        {/* {innerWidth > 1250 && <Circle2 />} */}
        {innerWidth > 1250 && <Circle3 />}
        {innerWidth > 1250 && (
          <img
            src={`${S3PROXY}/public/logo/webp/chin-man.webp`}
            height={450}
            width={548}
            style={{
              position: "absolute",
              bottom: "-48px",
              right: "0px",
            }}
          />
        )}

        <Stack className={Styles.after_black_box}>
          <Stack>
            <Typo1 className={Styles.typo1}>Find and Hire Freelancers</Typo1>
          </Stack>
          <Stack>
            <Typo2 className={Styles.typo2}>
              Get quality freelancers at an affordable price
            </Typo2>
          </Stack>
          <Stack direction={"row"} spacing={5}>
            <Paper component="form" className={Styles.search_bar}>
              <Input1
                placeholder="Search"
                value={searchText}
                onChange={(e) => {
                  setsearchText(e.target.value);
                  let filteredData = allData.filter((data) =>
                    data.name
                      .toLowerCase()
                      .includes(e.target.value.toLowerCase())
                  );
                  setStudentsData(filteredData);
                }}
                // inputProps={{ "aria-label": "search" }}
              />

              {/* <Select1
                label=""
                defaultValue="Select"
                sx={{
                  boxShadow: "none",
                  border: "none !important",
                  ".MuiOutlinedInput-notchedOutline": { border: 0 },
                  "&.Mui-focused": { border: "none !important" },
                }}
                className="Select12152154"
                startAdornment={
                  <InputAdornment position="start">
                    <>
                      <Divider
                        orientation="vertical"
                        variant="middle"
                        sx={{
                          height: "55px !important",
                          width: "2px",
                        }}
                      />

                      <
                        src={`${S3PROXY}/public/icons/webp/State.webp`}
                        style={{
                          height: "36px",
                          width: "36px",
                        }}
                      />
                    </>
                  </InputAdornment>
                }
              >
                {states.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select1> */}
            </Paper>
            {/* <Circle4 className={Styles.search_icon}>
              < className={Styles.search_logo} src={`${S3PROXY}/public/icons/webp/Search.webp`} />
            </Circle4> */}
            {/* <TextField
              sx={{
                borderRadius: "37.5px",
                background: "white",
                width: "620px",
                height: "75px",
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <>
                      <Divider />
                      
                    </>
                  </InputAdornment>
                ),
              }}
            ></TextField> */}
          </Stack>
        </Stack>
      </Box>
      {/* <div className="container py-4">
        <Typo3>Results for “Event planning”</Typo3>
      </div> */}
      <div className={Styles.student_card_wrapper}>
        {studentsData?.length ? (
          studentsData?.map((data, i) => (
            <StudentCard
              handleClickOpen={handleClickOpen}
              studData={data}
              setCurrentId={setCurrentId}
              key={data._id}
            ></StudentCard>
          ))
        ) : (
          <div className="container py-4">
            <Typo5>No data found</Typo5>
          </div>
        )}
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        // PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <Box
          sx={{
            width: "636px",
            height: "747px",
            backgroundColor: "#FFFFFF",
            boxShadow: "0px 63.7349px 33.5807px rgba(0, 0, 0, 0.15)",
            borderRadius: "74px",
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            color: "black",
            padding: "45px",
          }}
        >
          <Stack alignItems={"center"} justifyContent={"center"} spacing={4}>
            <Typo4>Payment Method</Typo4>
            <Stack>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value="female"
                  control={
                    <Radio
                      sx={{
                        color: "green",
                        "&.Mui-checked": {
                          color: "green",
                        },
                      }}
                    />
                  }
                  label={
                    <img
                      style={{
                        width: "259px",
                        height: "155px",
                        borderRadius: "35px",
                        // boxShadow: "0px 0px 14px rgba(0, 0, 0, 0.15)"
                      }}
                      src={`${S3PROXY}/public/logo/webp/RazorPay.webp`}
                    />
                  }
                />
                <FormControlLabel
                  value="male"
                  control={
                    <Radio
                      disabled
                      sx={{
                        color: "green",
                        "&.Mui-checked": {
                          color: "green",
                          // background:
                          //   'linear-gradient(92.19deg, #9FF897 1.3%, #C9FF56 98.71%), #D9D9D9',
                          // '-webkit-text-fill-color': 'transparent',
                          // '-webkit-background-clip': 'text',
                        },
                      }}
                    />
                  }
                  label={
                    <img
                      style={{
                        width: "259px",
                        height: "155px",
                        borderRadius: "35px",
                        // boxShadow: "0px 0px 14px rgba(0, 0, 0, 0.15)"
                      }}
                      src={`${S3PROXY}/public/logo/webp/UPI.webp`}
                    />
                  }
                />
              </RadioGroup>
            </Stack>
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"start"}
              gap={2}
              sx={{
                marginRight: "135px !important",
              }}
            >
              <img src={`${S3PROXY}/public/icons/webp/money.webp`} />
              <h3>Total</h3>
              <Box
                sx={{
                  width: "282.35px",
                  height: "52.77px",
                  background: " #FFFFFF",
                  boxShadow: "0px 0px 9.5945px rgba(0, 0, 0, 0.25)",
                  borderRadius: "61.6789px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "Poppins",
                  fontStyle: "normal",
                  fontWeight: "700",
                  fontSize: "22px",
                  lineHeight: "34px",
                }}
              >
                Rs 50
              </Box>
            </Stack>
            <Button
              sx={{
                width: "300px",
                height: "83px",
                background:
                  "linear-gradient(92.19deg, #9FF897 1.3%, #C9FF56 98.71%), #D9D9D9",
                borderRadius: "63px",
                fontFamily: "Poppins",
                fontStyle: "normal",
                fontWeight: "500",
                fontSize: "37px",
                lineHeight: "54px",
                color: "black",
                textTransform: "none",
              }}
              onClick={() => getPayment()}
            >
              Next
            </Button>
          </Stack>
        </Box>
      </Dialog>
    </Box>
  );
}

export default index;
// router.push(``)

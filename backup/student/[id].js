import React from "react";
import { Box, Typography } from "@mui/material";
import Styles from "../../styles/student.module.css";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import Slider from "react-slick";
import { useGetoneStudentQuery } from "redux/Api/others.api";
import { S3PROXY } from "../../config";
function index({ id }) {
  const router = useRouter();
  const [stud, setStud] = useState();
  const { data: onestudent } = useGetoneStudentQuery(router?.query?.id);
  useEffect(() => {
    const data = { data: onestudent };
    if (data) {
      setStud(data?.data);
    } else {
      console.error("error");
    }
  }, [router, onestudent]);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Box
      className={Styles.student_main}
      sx={{
        paddingTop: {
          xs: "64px",
          md: "99px",
        },
        width: 1,
      }}
    >
      <Slider {...settings}>
        {stud?.cover_pic?.map((data) => {
          return (
            <img
              src={`${S3PROXY}${data}`}
              alt="main"
              className={Styles.image}
            />
          );
        })}
      </Slider>
      <div className={Styles.student_main1}>
        {/* <Box className={Styles.girl_img}>
          < src={`${S3PROXY}${stud?.profile_pic}`} alt="girl"  />
        </Box> */}
        <Box className={Styles.main_box}>
          <Box className={Styles.contact_box}>
            <Box className={Styles.under_contact_box}>
              <Box className={Styles.details}>
                <img
                  src={`${S3PROXY}/public/assets/images/webp/user.webp`}
                  alt="user"
                  className={Styles.logo}
                />
                <Typography className={Styles.TypoStyle1}>
                  {stud?.name}
                </Typography>
              </Box>
              <Box className={Styles.details}>
                <img
                  src={`${S3PROXY}/public/assets/images/webp/mail.webp`}
                  alt="mail"
                  className={Styles.logo}
                />
                <Typography className={Styles.TypoStyle1}>
                  {stud?.email}
                </Typography>
              </Box>
              <Box className={Styles.details}>
                <img
                  src={`${S3PROXY}/public/assets/images/webp/town.webp`}
                  alt="town"
                  className={Styles.logo}
                />
                <Typography className={Styles.TypoStyle1}>
                  {stud?.addressDetails?.address1}
                </Typography>
              </Box>
            </Box>
            <Box className={Styles.under_contact_box}>
              <a href={`tel:${stud?.mobile}`}>
                <Box className={Styles.details}>
                  <img
                    src={`${S3PROXY}/public/assets/images/webp/call.webp`}
                    alt="call"
                    className={Styles.logo}
                  />
                  <Typography className={Styles.TypoStyle1}>
                    +91 {stud?.mobile}
                  </Typography>
                </Box>
              </a>
              <Box className={Styles.details}>
                <img
                  src={`${S3PROXY}/public/assets/images/webp/location.webp`}
                  alt="location"
                  className={Styles.logo}
                />
                <Typography className={Styles.TypoStyle1}>
                  {stud?.addressDetails?.city}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box className={Styles.data_box}>
            <Box className={Styles.column_data}>
              <Box className={Styles.height}>
                <Box className={Styles.data}>
                  <img
                    src={`${S3PROXY}/public/assets/images/webp/icon1.webp`}
                    alt="icon1"
                    className={Styles.logo}
                  />
                  <Typography>{stud?.personaldetails?.height}</Typography>
                </Box>
                <button className="button">5.2ft</button>
              </Box>
              <Box className={Styles.height}>
                <Box className={Styles.data}>
                  <img
                    src={`${S3PROXY}/public/assets/images/webp/icon2.webp`}
                    alt="icon2"
                    className={Styles.logo}
                  />
                  <Typography>Skin Color</Typography>
                </Box>
                <button className="button">
                  {stud?.personaldetails?.skincolour}
                </button>
              </Box>
              <Box className={Styles.height}>
                <Box className={Styles.data}>
                  <img
                    src={`${S3PROXY}/public/assets/images/webp/icon3.webp`}
                    alt="icon3"
                    className={Styles.logo}
                  />
                  <Typography>Diploma Status</Typography>
                </Box>
                <button className="button complate">
                  {stud?.personaldetails?.diplomaStatus
                    ? "Completed"
                    : "Not Completed"}
                </button>
              </Box>
              <Box className={Styles.height}>
                <Box className={Styles.data}>
                  <img
                    src={`${S3PROXY}/public/assets/images/webp/icon4.webp`}
                    alt="icon4"
                    className={Styles.logo}
                  />
                  <Typography>Lanuage</Typography>
                </Box>
                <button className="button">
                  {stud?.personaldetails?.language}
                </button>
              </Box>
            </Box>
            <Box className={Styles.column_data}>
              <Box className={Styles.height}>
                <Box className={Styles.data}>
                  <img
                    src={`${S3PROXY}/public/assets/images/webp/icon5.webp`}
                    alt="icon5"
                    className={Styles.logo}
                  />
                  <Typography>Events Attend</Typography>
                </Box>
                <button className="button">
                  {stud?.personaldetails?.eventsAttended}
                </button>
              </Box>
              <Box className={Styles.height}>
                <Box className={Styles.data}>
                  <img
                    src={`${S3PROXY}/public/assets/images/webp/icon6.webp`}
                    alt="icon6"
                    className={Styles.logo}
                  />
                  <Typography>Intership Status</Typography>
                </Box>
                <button className="button complate">
                  {stud?.personaldetails?.internshipStatus
                    ? "Completed"
                    : "Not Completed"}
                </button>
              </Box>
              <Box className={Styles.height}>
                <Box className={Styles.data}>
                  <img
                    src={`${S3PROXY}/public/assets/images/webp/icon7.webp`}
                    alt="icon7"
                    className={Styles.logo}
                  />
                  <Typography>Currently Employed</Typography>
                </Box>
                <button className="button complate">
                  {stud?.personaldetails?.currentlyEmployed ? "Yes" : "No"}
                </button>
              </Box>
            </Box>
          </Box>
        </Box>
      </div>
    </Box>
  );
}

export default index;

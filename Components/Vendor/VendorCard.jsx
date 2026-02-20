import { Button, Grid, Paper, Stack, Typography, styled } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import Styles from "./vendor.module.css";

const Typo = styled(Typography)(({ theme }) => ({
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontSize: "16px",
  lineHeight: "24px",
  color: "black",
  textTransform: "none",
  fontWeight: "400",
  textAlign: "start",
}));

function FormRow({ src, setCurrentImage }) {
  return (
    <>
      <Grid
        item
        xs={4}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {src[0] && (
          <span
            style={{
              boxShadow: "0px 0px 14px #00000029",
              borderRadius: "10px",
            }}
          >
            <Image
              src={`${S3PROXY}${src[0]}`}
              height={100}
              width={100}
              style={{
                borderRadius: "10px",
              }}
              onClick={(e) => {
                setCurrentImage(e.target["data-loaded-src"]);
              }}
            />
          </span>
        )}
      </Grid>
      <Grid
        item
        xs={4}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {src[1] && (
          <span
            style={{
              boxShadow: "0px 0px 14px #00000029",
              borderRadius: "10px",
            }}
          >
            <Image
              src={`${S3PROXY}${src[1]}`}
              height={100}
              width={100}
              style={{
                borderRadius: "10px",
                boxShadow: "0px 3px 5px #00029",
                border: "1px solid grey",
              }}
              onClick={(e) => {
                setCurrentImage(e.target["data-loaded-src"]);
              }}
            />
          </span>
        )}
      </Grid>
      <Grid
        item
        xs={4}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {src[2] && (
          // <span
          //   style={{
          //     boxShadow: "0px 0px 14px #00000029",
          //     borderRadius: "10px",
          //   }}
          // >
          <Image
            src={`${S3PROXY}${src[2]}`}
            height={100}
            width={100}
            style={{
              borderRadius: "10px",
              boxShadow: "0px 3px 5px #00000029",
            }}
            onClick={(e) => {
              setCurrentImage(e.target["data-loaded-src"]);
            }}
          />
        )}
      </Grid>
    </>
  );
}

import { useRouter } from "next/router";
import moment from "moment/moment";
import { S3PROXY } from "../../config";

function VendorCard({ handleClickOpen, studData, setCurrentId }) {
  const router = useRouter();
  const [currentImage, setCurrentImage] = useState(
    studData?.user?.mainImage
      ? studData?.user?.mainImage
      : "/icons/webp/no-profile-picture-icon.webp"
  );
  return (
    <Paper className={Styles.body_main}>
      <Stack className={Styles.profile_details}>
        <Stack spacing={2} justifyContent="center" alignItems="center">
          <Image
            src={`${S3PROXY}${currentImage}`}
            height={300}
            width={300}
            style={{ borderRadius: "10px" }}
          />

          <Grid container spacing={1}>
            <Grid container item spacing={2}>
              <FormRow
                src={[
                  studData?.user?.mainImage,
                  studData?.user?.images[0] ? studData?.user?.images[0] : null,
                  studData?.user?.images[1] ? studData?.user?.images[1] : null,
                ]}
                setCurrentImage={setCurrentImage}
              />
            </Grid>
            <Grid container item spacing={2}>
              <FormRow
                src={[
                  studData?.user?.images[2] ? studData?.user?.images[2] : null,
                  studData?.user?.images[3] ? studData?.user?.images[3] : null,
                  studData?.user?.images[4] ? studData?.user?.images[4] : null,
                ]}
                setCurrentImage={setCurrentImage}
              />
            </Grid>
          </Grid>
        </Stack>
        <Stack className={Styles.profile_details_content}>
          <Grid container className={Styles.profile_details_content_div_1}>
            <Grid
              container
              item
              className={Styles.profile_details_content_div_child}
            >
              <Grid
                item
                className={Styles.profile_details_content_div_sub_child}
              >
                <img
                  src={`${S3PROXY}/public/icons/webp/job-search-icon.webp`}
                  height={40}
                  width={45}
                  className={Styles.logo}
                ></img>
                <Typo>{studData?.events?.required_member_type}</Typo>
              </Grid>
              <Grid
                item
                className={Styles.profile_details_content_div_sub_child}
              >
                <img
                  src={`${S3PROXY}/public/icons/webp/money-note-icon.webp`}
                  height={40}
                  width={45}
                  className={Styles.logo}
                ></img>
                <Typo>{studData?.events?.sallery}</Typo>
              </Grid>
            </Grid>
            <Grid
              container
              item
              className={Styles.profile_details_content_div_child}
            >
              <Grid
                item
                className={Styles.profile_details_content_div_sub_child}
              >
                <img
                  src={`${S3PROXY}/public/icons/webp/State.webp`}
                  height={40}
                  width={45}
                  className={Styles.logo}
                ></img>
                <Typo>{studData?.user?.city}</Typo>
              </Grid>
              <Grid
                item
                className={Styles.profile_details_content_div_sub_child}
              >
                <img
                  src={`${S3PROXY}/public/icons/webp/company-address-location.webp`}
                  height={40}
                  width={45}
                  className={Styles.logo}
                ></img>
                <Typo sx={{}}>{studData?.events?.venue}</Typo>
              </Grid>
            </Grid>
          </Grid>

          <Button
            className={Styles.see_profile_button}
            style={{
              background:
                "linear-gradient(180deg, #C53244 0%, #B4245D 100%) !important",
            }}
            onClick={() => router.push(`/vendor/${studData.events._id}`)}
          >
            See Profile
          </Button>

          <div className={Styles.date_time}>
            <div className={Styles.date_time_main}>
              <div className={Styles.date}>
                <img
                  src={`${S3PROXY}/public/icons/webp/checkmark-date-calendar-icon.webp`}
                  className={Styles.logo1}
                />
                <p className={Styles.card_text}>Start Date</p>
                <p className={`${Styles.card_text} ${Styles.btn}`}>
                  {moment(studData.events.start_date).format("DD MMM YY")}
                </p>
              </div>

              <div className={Styles.date}>
                <img
                  src={`${S3PROXY}/public/icons/webp/checkmark-date-calendar-icon.webp`}
                  className={Styles.logo1}
                />
                <p className={Styles.card_text}>End Date</p>
                <p className={`${Styles.card_text} ${Styles.btn}`}>
                  {moment(studData.events.end_date).format("DD MMM YY")}
                </p>
              </div>

              <div className={Styles.time}>
                <img
                  src={`${S3PROXY}/public/icons/webp/Clock1.webp`}
                  className={Styles.logo1}
                />
                <p className={Styles.card_text}>Start Time</p>
                <p className={`${Styles.card_text} ${Styles.btn}`}>
                  {moment(studData.events.start_time).format("hh:mm A")}
                </p>
              </div>
              <div className={Styles.time}>
                <img
                  src={`${S3PROXY}/public/icons/webp/Clock1.webp`}
                  className={Styles.logo1}
                />
                <p className={Styles.card_text}>End time</p>
                <p className={`${Styles.card_text} ${Styles.btn}`}>
                  {moment(studData.events.end_time).format("hh:mm A")}
                </p>
              </div>
            </div>
          </div>
        </Stack>
      </Stack>
    </Paper>
  );
}

export default VendorCard;

import { Button, Grid, Paper, Stack, Typography, styled } from "@mui/material";
import Image from "next/image";
import Styles from "./student.module.css";
import React, { useState } from "react";
import { S3PROXY } from "../../config";

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
          <span
            style={{
              boxShadow: "0px 0px 14px #00000029",
              borderRadius: "10px",
            }}
          >
            <Image
              src={`${S3PROXY}${src[2]}`}
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
    </>
  );
}
function StudentCard({ handleClickOpen, studData, setCurrentId }) {
  const [currentImage, setCurrentImage] = useState(
    studData?.profile_pic
      ? studData?.profile_pic
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
                  studData.profile_pic,
                  studData.cover_pic[0],
                  studData.cover_pic[1],
                ]}
                setCurrentImage={setCurrentImage}
              />
            </Grid>
            <Grid container item spacing={2}>
              <FormRow
                src={[
                  studData.cover_pic[2],
                  studData.cover_pic[3],
                  studData.cover_pic[4],
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
                  src={`${S3PROXY}/public/icons/webp/name.webp`}
                  height={40}
                  width={45}
                  className={Styles.logo}
                ></img>
                <Typo>{studData.name}</Typo>
              </Grid>
              <Grid
                item
                className={Styles.profile_details_content_div_sub_child}
              >
                <img
                  src={`${S3PROXY}/public/icons/webp/Degtype.webp`}
                  className={Styles.logo}
                  height={40}
                  width={45}
                ></img>
                <Typo>Event manager</Typo>
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
                  className={Styles.logo}
                  height={40}
                  width={45}
                ></img>
                <Typo>{studData.addressDetails.state}</Typo>
              </Grid>
              <Grid
                item
                className={Styles.profile_details_content_div_sub_child}
              >
                <img
                  src={`${S3PROXY}/public/icons/webp/city.webp`}
                  className={Styles.logo}
                  height={40}
                  width={45}
                ></img>
                <Typo>{studData.addressDetails.city}</Typo>
              </Grid>
            </Grid>
          </Grid>
          <Button
            className={Styles.see_profile_button}
            onClick={() => handleClickOpen(studData.id, setCurrentId)}
          >
            See Profile
          </Button>
          <Stack className={Styles.status}>
            <div
              className={Styles.status_button}
              style={{ background: "white !important" }}
            >
              <img
                src={`${S3PROXY}/public/icons/webp/Skills.webp`}
                className={Styles.logo}
              ></img>
              Status
            </div>
            <Stack>
              <Grid className={Styles.status_list}>
                <Grid item xs={4}>
                  <Stack direction="row" alignItems="center" gap={1}>
                    <img
                      src={
                        studData.personaldetails.diplomaStatus
                          ? "/icons/webp/GrnTick1.webp"
                          : "/icons/webp/remove.webp"
                      }
                      height={20}
                      className={Styles.logo1}
                      width={20}
                    ></img>
                    <Typo>Internship</Typo>
                  </Stack>
                </Grid>
                <Grid item xs={4}>
                  <Stack direction="row" alignItems="center" gap={1}>
                    <img
                      src={
                        studData.personaldetails.internshipStatus
                          ? "/icons/webp/GrnTick1.webp"
                          : "/icons/webp/remove.webp"
                      }
                      className={Styles.logo1}
                      height={20}
                      width={20}
                    ></img>
                    <Typo>Diploma</Typo>
                  </Stack>
                </Grid>
                <Grid item xs={4}>
                  <Stack direction="row" alignItems="center" gap={1}>
                    <img
                      className={Styles.logo1}
                      src={
                        studData.personaldetails.currentlyEmployed
                          ? "/icons/webp/GrnTick1.webp"
                          : "/icons/webp/remove.webp"
                      }
                      height={20}
                      width={20}
                    ></img>
                    <Typo>Employed</Typo>
                  </Stack>
                </Grid>
              </Grid>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
}

export default StudentCard;

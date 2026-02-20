import React from "react";
import styles from "../../styles/planning.module.scss";
import Slider from "react-slick";
import moment from "moment";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/reducer/appEssentials";
import { S3PROXY } from "../../config";

const InviteCard2 = ({
  invitesdata,
  setOpen,
  setModalData,
  invitecardis,
  divRef,
}) => {
  const router = useRouter();
  const globleuser = useSelector(selectUser);
  const settings1 = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
  };
  return (
    <div
      style={{
        backgroundColor: invitesdata?.bgColor,
        width: "100%",
      }}
    >
      <div
        className={styles.invitesBody}
        style={{ padding: "0px", marginTop: invitecardis ? "0px" : "" }}
      >
        <div className={styles.imgAnddetailinvites}>
          {/* {divRef ? (
              <div
                style={{
                  backgroundImage: `url(${img1})`,
                  backgroundSize: '100% 100%',
                  backgroundRepeat: 'no-repeat',
                }}
              ></div>
            ) : ( */}
          <Slider {...settings1}>
            {invitesdata?.coverPic?.map((item, index) => {
              return (
                <div key={index}>
                  <img
                    style={{
                      width: "100%",
                      objectFit: "fill",
                    }}
                    src={`${S3PROXY}${item}`}
                    alt=""
                  />
                </div>
              );
            })}
          </Slider>
          {/* )} */}
          <div className={styles.inviteDetail}>
            <article className={styles.nameanddate1}>
              <span className={styles.invitesname1}>
                {invitesdata?.groomName} <br /> & <br />{" "}
                {invitesdata?.brideName}
              </span>
              <span className={styles.invitesDate}>
                {moment(invitesdata?.weddingDate).format("dddd")}{" "}
                {moment(invitesdata?.weddingDate).format("LL")}
              </span>
              <span className={styles.invitesDate}>
                {invitesdata?.weddingLoc}
              </span>
            </article>
          </div>
        </div>
        <div ref={divRef}>
          <div
            className={styles.storydiv}
            style={{ padding: "0px 5%", color: invitesdata?.mainFontcolor }}
          >
            <div className={styles.storyFirstDiv}>
              <span className={styles.storyFirstDivhead}>Our Story</span>
              <span className={styles.storyFirstDivbody}>
                {invitesdata?.ourStory}
              </span>
            </div>
            <div className={styles.storySecDiv}>
              <article>
                <span className={styles.storySecDivhead}>
                  {invitesdata?.brideName}{" "}
                </span>
                <span className={styles.storySecDivbody}>
                  {invitesdata?.brideStory}
                </span>
              </article>
              <div className={styles.storyImgDiv}>
                <img
                  src={
                    invitesdata?.storyImg?.length
                      ? invitesdata?.storyImg[0]
                      : `${S3PROXY}/public/images/webp/Ellipse 1171.webp`
                  }
                  alt=""
                />
              </div>
              <article>
                <span className={styles.storySecDivhead}>
                  {invitesdata?.groomName}
                </span>
                <span className={styles.storySecDivbody}>
                  {invitesdata?.groomStory}
                </span>
              </article>
            </div>
          </div>
          <div
            className={styles.eventList}
            style={{
              backgroundImage: `url(${
                invitesdata?.eventListBackgrnd?.length
                  ? invitesdata?.eventListBackgrnd[0]
                  : `${S3PROXY}/public/images/webp/image 648.webp`
              })`,
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat",
              color: invitesdata?.eventFontcolor,
            }}
          >
            <div className={styles.storyFirstDiv}>
              <span className={styles.storyFirstDivhead}>Event List</span>
              <span className={styles.storyFirstDivbody}>
                {invitesdata?.eventListDesc}
              </span>
            </div>
            <div className={styles.inviteListCarddiv}>
              {invitesdata?.EventList?.map((data, key) => {
                return (
                  <div className={styles.inviteListcard} key={key}>
                    <div className={styles.inviteListcardimg}>
                      <img
                        src={`${S3PROXY}/public/public/images/webp/Wedding Rings.webp`}
                        alt=""
                      />
                    </div>
                    <span className={styles.inviteListcardtitle}>
                      {data?.name}
                    </span>
                    <span className={styles.invitecardDate}>
                      {moment(data?.date).format("dddd")},{" "}
                      {moment(data?.date).format("MMM DD, YYYY")} <br />
                      {moment(data?.time).format("HH:MM A")} onwards
                    </span>
                    <span
                      className={styles.invitecardSeemore}
                      onClick={() => {
                        setOpen(true);
                        setModalData(data);
                      }}
                    >
                      See More
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InviteCard2;

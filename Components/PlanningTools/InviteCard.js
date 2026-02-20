import React, { useEffect, useState } from "react";
import styles from "../../styles/planning.module.scss";
import Slider from "react-slick";
import moment from "moment";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/reducer/appEssentials";
import { S3PROXY } from "../../config";

const InviteCard = ({
  invitesdata,
  setOpen,
  setModalData,
  invitecardis,
  divRef,
  inviteformdata,
  bgcolor,
  mainFontcol,
  eventfontcol,
  coverPic,
  eventListpic,
  circlepic,
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
  };
  const [Images, setImages] = useState([]);
  const [Images1, setImages1] = useState();
  const [Images2, setImages2] = useState();
  let newArr = [];
  useEffect(() => {
    let imageUrl;
    coverPic?.map((item) => {
      if (item?.name) {
        imageUrl = window.URL.createObjectURL(item.originFileObj);
        newArr.push(imageUrl);
        setImages(newArr);
      }
    });
  }, [coverPic]);
  useEffect(() => {
    let imageUrl;
    let newArr;
    eventListpic?.map((item) => {
      if (item?.name) {
        imageUrl = window.URL.createObjectURL(item.originFileObj);
        setImages1(imageUrl);
      }
    });
  }, [eventListpic]);
  useEffect(() => {
    let imageUrl;
    circlepic?.map((item) => {
      if (item?.name) {
        imageUrl = window.URL.createObjectURL(item.originFileObj);
        setImages2(imageUrl);
      }
    });
  }, [circlepic]);

  return (
    <div style={{ backgroundColor: bgcolor, width: "100%" }}>
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
            {coverPic?.map((item, index) => {
              return (
                item?.url && (
                  <div>
                    <img
                      style={{
                        width: "100%",
                        objectFit: "fill",
                      }}
                      src={item?.url ? item?.url : ""}
                      alt=""
                    />
                  </div>
                )
              );
            })}

            {Images.map((i) => {
              return (
                <div>
                  <img
                    style={{
                      width: "100%",
                      objectFit: "fill",
                    }}
                    src={`${S3PROXY}${i}`}
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
                {inviteformdata?.groomName} & {inviteformdata?.brideName}
              </span>
              <span className={styles.invitesDate}>
                {moment(inviteformdata?.weddingDate).format("dddd")}{" "}
                {moment(inviteformdata?.weddingDate).format("LL")}
              </span>
              <span className={styles.invitesDate}>
                {inviteformdata?.weddingLoc}
              </span>
            </article>
          </div>
        </div>
        <div ref={divRef}>
          <div
            className={styles.storydiv}
            style={{ padding: "0px 5%", color: mainFontcol }}
          >
            <div className={styles.storyFirstDiv}>
              <span className={styles.storyFirstDivhead}>Our Story</span>
              <span className={styles.storyFirstDivbody}>
                {inviteformdata?.ourStory}
              </span>
            </div>
            <div className={styles.storySecDiv}>
              <article>
                <span className={styles.storySecDivhead}>
                  {inviteformdata?.brideName}{" "}
                </span>
                <span className={styles.storySecDivbody}>
                  {inviteformdata?.brideStory}
                </span>
              </article>
              <div className={styles.storyImgDiv}>
                <img
                  src={`${S3PROXY}${
                    circlepic[0]?.url ? circlepic[0]?.url : Images2
                  }`}
                  alt=""
                />
              </div>
              <article>
                <span className={styles.storySecDivhead}>
                  {inviteformdata?.groomName}
                </span>
                <span className={styles.storySecDivbody}>
                  {inviteformdata?.groomStory}
                </span>
              </article>
            </div>
          </div>
          <div
            className={styles.eventList}
            style={{
              backgroundImage: `url(${
                eventListpic[0]?.url ? eventListpic[0]?.url : Images1
              })`,
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat",
              color: eventfontcol,
            }}
          >
            <div className={styles.storyFirstDiv}>
              <span className={styles.storyFirstDivhead}>Event List</span>
              <span className={styles.storyFirstDivbody}>
                {inviteformdata?.eventListDesc}
              </span>
            </div>
            <div className={styles.inviteListCarddiv}>
              {inviteformdata?.EventList?.map((data, key) => {
                return (
                  <div className={styles.inviteListcard}>
                    <div className={styles.inviteListcardimg}>
                      <img
                        src={`${S3PROXY}/public/images/webp/Wedding Rings.webp`}
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

export default InviteCard;

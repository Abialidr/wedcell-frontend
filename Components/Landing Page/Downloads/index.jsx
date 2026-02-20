import React from "react";
import styles from "./index.module.scss";
import { useRouter } from "next/router";
import { S3PROXY } from "../../../config";

const Downloads = () => {
  const router = useRouter();
  return (
    <div
      style={{
        display: process.env.NEXT_PUBLIC_ENVR == "mobile" ? "none" : "flex",
      }}
      className={styles.Downloads}
    >
      <div className={styles.left}>
        <hgroup>Download Wedfield App</hgroup>
        <span>Download app to plan your wedding online.</span>
        <article>
          <div>
            <a
              target="_blank"
              href="https://play.google.com/store/apps/details?id=com.wedding.wedfield&pcampaignid=web_share"
            >
              <img src={`${S3PROXY}/public/LandingPage/dwngoogle.png`} alt="" />
              <img
                src={`${S3PROXY}/public/LandingPage/dwngoogle1.png`}
                alt=""
              />
            </a>
          </div>
          <div>
            <a
              target="_blank"
              href="https://apps.apple.com/in/app/wedfield-wedding-marketplace/id6736426335"
            >
              <img src={`${S3PROXY}/public/LandingPage/dwnapple.png`} alt="" />
              <img src={`${S3PROXY}/public/LandingPage/dwnapple1.png`} alt="" />
            </a>
          </div>
        </article>
      </div>
      <div className={styles.right}>
        <img src={`${S3PROXY}/public/LandingPage/iPhone 12 Pro.png`} alt="" />
        <img src={`${S3PROXY}/public/LandingPage/iPhone 12 Pro-1.png`} alt="" />
        <img src={`${S3PROXY}/public/LandingPage/iPhone 12 Pro-4.png`} alt="" />
        <img src={`${S3PROXY}/public/LandingPage/iPhone 12 Pro-3.png`} alt="" />
        <img src={`${S3PROXY}/public/LandingPage/iPhone 12 Pro-2.png`} alt="" />
        <img
          className={styles.mobilemobile}
          src={`${S3PROXY}/public/LandingPage/mobile.png`}
          alt=""
        />
      </div>
    </div>
  );
};

export default Downloads;

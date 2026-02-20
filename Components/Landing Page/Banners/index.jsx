import React, { useState, useEffect } from "react";
import styles from "./index.module.scss";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectUser } from "redux/reducer/appEssentials";
import { S3PROXY } from "../../../config";

const Banner = ({
  img,
  head,
  desc,
  button,
  btnClick,
  calculateTimeRemaining,
}) => {
  const globleuser = useSelector(selectUser);
  const router = useRouter();
  return (
    <div className={styles.carousel}>
      <div className={`${styles.carousel_item}  ${styles[img]}`}>
        <div className={styles.absolute}>
          <hgroup>{head}</hgroup>
          <p>{desc}</p>
          {button && img != "startTimer" ? (
            <button onClick={btnClick}>{button}</button>
          ) : img == "startTimer" && globleuser ? (
            <div className={styles.Absolute}>
              <div className={styles.totaldate}>
                <article>
                  <span className={styles.numbers}>
                    {calculateTimeRemaining()?.days}
                  </span>
                  <span className={styles.values}>days</span>
                </article>
                <article>
                  <span className={styles.numbers}>
                    {calculateTimeRemaining()?.hours}
                  </span>
                  <span className={styles.values}>hours</span>
                </article>{" "}
                <article>
                  <span className={styles.numbers}>
                    {calculateTimeRemaining()?.minutes}
                  </span>
                  <span className={styles.values}>mins</span>
                </article>{" "}
                <article>
                  <span className={styles.numbers}>
                    {calculateTimeRemaining()?.seconds}
                  </span>
                  <span className={styles.values}>sec</span>
                </article>
              </div>
            </div>
          ) : img == "startTimer" && !globleuser ? (
            <button onClick={btnClick}>{button}</button>
          ) : (
            <></>
          )}
        </div>
        {img !== "startTimer" ? (
          <img
            style={{ height: "422px" }}
            src={
              img === "venue"
                ? `${S3PROXY}/648d3c8efb95751e4d881bee_desktop0_1710998121949_b7bb77fe2c150eed75fb6a28ed36a33d.jpg`
                : img === "vendor"
                ? `${S3PROXY}/648d3c8efb95751e4d881bee_desktop1_1710998121976_c4e327d3d88416a946fd7eafc6f945b9.jpg`
                : img === "product"
                ? `${S3PROXY}/648d3c8efb95751e4d881bee_desktop2_1710998121955_21d355e8f6adad7a1f271d99f114deb1.jpg`
                : `${S3PROXY}/public/background/op-background.png`
            }
            alt={`Slide`}
            width={"100%"}
            height={"350px"}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Banner;

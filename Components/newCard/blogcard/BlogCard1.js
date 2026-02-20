import React from "react";
// import exclusive from "./img/webp/Rectangle 13.webp";
// import star from "./img/webp/Rectangle 12 (1).webp";
import styles from "./card.module.css";
import { useRouter } from "next/router";
import Image from "next/image";
import { S3PROXY } from "config";
// import { Text } from "react-native";
const BlogCard1 = ({ data, readTime }) => {
  // const exclusive = data.popular;
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push(`/blog/${data._id}`);
      }}
      className={styles.Card}
    >
      {/* {datas.map((data) => { */}
      {/* return ( */}
      <div className={styles["cardcontainer"]}>
        {/* {exclusive && ( */}
        {/* <div className={styles.exclusive}>
          < src={`${S3PROXY}/public/img/webp/Rectangle 13.webp`} alt="" />
          < className={styles.star2} src={`${S3PROXY}/public/img/webp/Star 2.webp`} alt="" />
          <span className={styles.excluivespan}>Exclusive</span>
        </div> */}
        {/* )} */}
        <div className={styles["img-container"]}>
          {/* <div className={styles.info}>
            <Tooltip title={data.descrition}>
              <IconButton style={{ color: `white` }}>
                <InfoOutlinedIcon />
              </IconButton>
            </Tooltip>
          </div> */}
          <img height={0} width={0} src={`${data?.mainImage}`} alt="Hello" />
        </div>
        <div className={styles["details-container"]}>
          <div className={styles["name-det"]}>
            <div
              className={styles.nameLoc}
              style={{
                display: "flex",
                justifyContent: "start",
                paddingLeft: "10px",
                height: "100%",
              }}
            >
              {/* <h2>adhs asdjhasjd dhfgsdh</h2> */}
              <h2
                style={{
                  width: "100%",
                  height: "100%",
                  fontSize: "10px !important",
                  textOverflow: "ellipsis",
                }}
              >
                {data?.title.substring(0, 30)}
                {data.title.length > 30 && "..."}
              </h2>
              {/* <Text numberOfLines={1} style={{ width: 100 }}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to mak
              </Text> */}
              {/* <h2 style={{ textAlign: "right" }}>{data.groomName}</h2> */}
              {/* <div className={styles.review}>
                < src={`${S3PROXY}/public/img/webp/Star 1.webp`} alt="" />
                <span className={styles.rateNo}>4.1</span>
                <span className={styles.outof}>(5 review)</span>
              </div> */}
            </div>
          </div>
          <div className={styles["name-det"]}>
            <div
              className={styles.nameLoc}
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "-8px",
              }}
            >
              {/* <h2>adhs asdjhasjd dhfgsdh</h2> */}

              {/* <h2 style={{ textAlign: "right" }}>{data.groomName}</h2> */}
              {/* <div className={styles.review}>
                < src={`${S3PROXY}/public/img/webp/Star 1.webp`} alt="" />
                <span className={styles.rateNo}>4.1</span>
                <span className={styles.outof}>(5 review)</span>
              </div> */}
            </div>
          </div>
          <div className={styles["name-det"]}>
            <div
              className={styles.nameLoc}
              style={{
                display: "flex",
                justifyContent: "end",
                marginTop: "-8px",
              }}
            >
              {/* <h2>adhs asdjhasjd dhfgsdh</h2> */}
              {/* <h2 style={{ width: "50%", textAlign: "end" }}>
                {data?.groomName}
              </h2> */}

              {/* <h2 style={{ textAlign: "right" }}>{data.groomName}</h2> */}
              {/* <div className={styles.review}>
                < src={`${S3PROXY}/public/img/webp/Star 1.webp`} alt="" />
                <span className={styles.rateNo}>4.1</span>
                <span className={styles.outof}>(5 review)</span>
              </div> */}
            </div>
          </div>
          <div
            className={styles["review-det"]}
            style={{ justifyContent: "space-between" }}
          >
            <div className={styles["mainfeat-container"]}>
              <span style={{ display: "flex", alignItems: "left" }}>
                {readTime} min read
              </span>

              {/* <span className={styles.mainfeat}>
                {/* <div className={styles.review}>
                  < src={`${S3PROXY}/public/img/webp/Star 1.webp`} alt="" />
                  <span className={styles.rateNo}>4.1</span>
                  <span className={styles.outof}>(5 review)</span>
                </div> 
              </span> */}
            </div>
            <button
              onClick={() => {
                router.push(`/blog/${data._id}`);
              }}
            >
              Read More
            </button>
          </div>
        </div>

        {/* <div className={styles.facility}>
          {data.size.map((items, index) => {
            return <span key={index}>{items}</span>;
          })}
        </div> */}
        {/* <div className={styles.buttons}>
          <button
            onClick={() => {
              router.push("/customer-login");
            }}
          >
            Shop Now
          </button>
          <button
            onClick={() => {
              router.push("/customer-login");
            }}
          >
            Add to Cart
          </button>
        </div> */}
      </div>
      {/* );
      })} */}
    </div>
  );
};

export default BlogCard1;

// <div className={styles.footer1}>
//   <div className={styles.totalprice}>
//     {/* <span className={styles.rupeessym}>₹</span> */}
//     <div
//       className={styles.totprice}
//       style={{
//         backgroundColor: `#ffdcd3`,
//       }}
//     >
//       <span className={styles.tprice}>
//         {moment(data?.eventDate).format("MMM DD YYYY")}
//       </span>
//       {/* <span className={styles.pernight}></span> */}
//     </div>
//   </div>
// </div>

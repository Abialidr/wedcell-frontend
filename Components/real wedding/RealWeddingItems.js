import React from "react";

import Styles from "../styles/RealWeddingHome.module.css";

import { MdOutlineLocationOn } from "react-icons/md";
import Link from "next/link";

import { GetReadWedding } from "../redux/actions/HomeActions";
import { useDispatch, useSelector } from "react-redux";
import { selectLocation } from "../redux/reducer/appEssentials";

function RealWeddingItems() {
  // const [location,setLocation] = useState()
  const dispatch = useDispatch();
  const location = useSelector(selectLocation);
  // useEffect(() => {
  //   const listenStorageChange = () => {
  //     if (localStorage.getItem("location") === null) {
  //       setLocation("");
  //     } else {
  //       setLocation(localStorage.getItem("location"));
  //     }
  //   };
  //   window.addEventListener("location", listenStorageChange);
  // }, []);

  React.useEffect(() => {
    const loca = localStorage.getItem("location");
    dispatch(GetReadWedding(loca ? loca : "all"));
  }, [location]);

  const { realWedding } = useSelector((state) => state.homeReducer);

  const src =
    "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg";

  //   const data = [
  //     {
  //       one: one,
  //       two: two,
  //       three: three,
  //       name: "Sherin and Jolsaana",
  //       city: "Bangolore",
  //     },
  //     {
  //       one: one,
  //       two: two,
  //       three: three,
  //       name: "Sherin and Jolsaana",
  //       city: "Bangolore",
  //     },
  //     {
  //       one: one,
  //       two: two,
  //       three: three,
  //       name: "Sherin and Jolsaana",
  //       city: "Bangolore",
  //     },
  //     {
  //       one: one,
  //       two: two,
  //       three: three,
  //       name: "Sherin and Jolsaana",
  //       city: "Bangolore",
  //     },
  //     {
  //       one: one,
  //       two: two,
  //       three: three,
  //       name: "Sherin and Jolsaana",
  //       city: "Bangolore",
  //     },
  //   ];

  const upperCase = (value) => {
    if (value) {
      const arr = value.split(" ");
      for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
      }
      const str2 = arr.join(" ");
      return str2;
    }
  };

  return (
    <div className={Styles.cardContainer}>
      {realWedding?.map((item, key) => (
        <Link href={`/WeddingProfile?id=${item._id}`} key={key}>
          <div className={Styles.mycard}>
            <div className={Styles.container}>
              <div className={Styles.one}>
                <img
                  className={Styles.img}
                  src={`${S3PROXY}${item?.galaryImage[0]}`}
                />
              </div>

              <div
                style={{
                  width: "50%",
                  height: "90%",
                }}
              >
                <div className={Styles.two}>
                  <img
                    className={Styles.img}
                    src={`${S3PROXY}${item?.uploadAlbum[0].albumFile[0]}`}
                  />
                </div>

                <div className={Styles.three}>
                  <img
                    className={Styles.img}
                    src={`${S3PROXY}${item?.uplodBanner[0]}`}
                  />
                </div>
              </div>
            </div>

            <div className={Styles.mobilecontainer}>
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  marginBottom: "5px",
                }}
              >
                <div className={Styles.two}>
                  <img
                    className={Styles.img}
                    src={`${S3PROXY}${item?.galaryImage[0]}`}
                  />
                </div>

                <div className={Styles.three}>
                  <img
                    className={Styles.img}
                    src={`${S3PROXY}${item?.uploadAlbum[0].albumFile[0]}`}
                  />
                </div>
              </div>

              <div className={Styles.mobileone}>
                <img
                  className={Styles.img}
                  src={`${S3PROXY}${item?.uplodBanner[0]}`}
                />
              </div>
            </div>

            <div className={Styles.content}>
              <div>
                {upperCase(item?.brideName)} {upperCase(item?.groomName)}
              </div>
              <div
                style={{
                  display: "flex",
                  alignContent: "baseline",
                  justifyContent: "center",
                  padding: "5px 0",
                }}
              >
                <MdOutlineLocationOn size={16} />
                {item.cityName}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default RealWeddingItems;

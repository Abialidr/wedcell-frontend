import { useMemo, useState } from "react";
import styles from "./index.module.scss";
import { Modal, Button } from "@mui/material";
import ReactPlayer from "react-player";
import { useGetForAllInhouseQuery } from "../../redux/Api/intheHouse.api";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { YouTube } from "@mui/icons-material";
import { extractYouTubeId } from "../../helper";
import CancelIcon from "@mui/icons-material/Cancel";
import Slider from "react-slick";
import Image from "next/image";
import { S3PROXY } from "config";

function ImgCard({ val, keyy, isVideo = false, setImg, setOpenImage }) {
  const [url, setUrl] = useState("");
  useMemo(() => {
    const id = extractYouTubeId(`${val.url}`);
    setUrl(`http://img.youtube.com/vi/${id}/hqdefault.jpg`);
  }, []);
  if (isVideo) {
    return (
      <div
        className={styles.cardContainer}
        onClick={() => {
          setOpenImage(true);
          setImg(val.url);
        }}
      >
        <article>
          <img src={`${url}`} alt="img" />
          <div className={styles.youtube}>
            <YouTube
              height={"150px"}
              width={"150px"}
              color="red"
              style={{
                height: "50px",
                width: "50px",
                color: "red",
              }}
            />
          </div>
          <span>{val.description}</span>
        </article>
      </div>
    );
  }
  return (
    <div
      className={styles.cardContainer}
      onClick={() => {
        setOpenImage(true);
        setImg(keyy);
      }}
    >
      <article>
        <img src={`${S3PROXY}${val.image}`} alt="img" />
        <span>{val.description}</span>
      </article>
    </div>
  );
}

function AllOtherServiceImages() {
  const [openImage, setOpenImage] = useState(false);
  const [image, setImg] = useState("");
  const router = useRouter();
  const { id } = router.query;
  const { data: inhousedata } = useGetForAllInhouseQuery(id);
  return (
    <>
      <div className={styles["main-under"]}>
        <div className={styles["imgCard"]}>
          <div className={styles["imgCard-text-container"]}>
            <hgroup>
              Our Images ({inhousedata?.data?.data[0]?.Images?.length})
            </hgroup>
          </div>
          <div className={styles["imgContainer-gallery"]}>
            {inhousedata?.data?.data[0]?.Images?.map((val, key) => {
              return (
                <ImgCard
                  val={val}
                  key={key}
                  keyy={key}
                  setOpenImage={setOpenImage}
                  setImg={setImg}
                />
              );
            })}
          </div>
        </div>
      </div>

      <Modal
        style={{
          zIndex: "1402",
        }}
        open={openImage}
        onClose={() => {
          setOpenImage(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
          <Button
            type="button"
            onClick={() => {
              setOpenImage(false);
            }}
            sx={{
              position: "absolute",
              top: "10px",
              right: "10px",
              color: "black",
              fontSize: "20px",
            }}
          >
            <CancelIcon fontSize="large" />
          </Button>
          <div
            style={{
              maxHeight: "80vh",
              maxWidth: "100vw",
              overflow: "hidden",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
            className=" albumBigSlider1234567890 albumBigSlider12345678902"
          >
            <Slider
              {...{
                infinite: true,
                speed: 500,
                slidesToShow: 1,
                slidesToScroll: 1,
              }}
              initialSlide={image}
            >
              {inhousedata?.data?.data[0]?.Images?.map((data) => {
                return (
                  <div className={styles.albumImgConntainer}>
                    <Image
                      height={0}
                      width={0}
                      // layout='responsive'
                      src={`${S3PROXY}${data.image}`}
                      alt=""
                      // className={styles.bigSliderImage}
                    />
                  </div>
                );
              })}
            </Slider>
          </div>
        </>
      </Modal>
    </>
  );
}

export default AllOtherServiceImages;

// {
//   "payment": {
//       "entity": {
//           "id": "pay_ORhTeJ8GmNDarw",
//           "entity": "payment",
//           "amount": 5700000,
//           "currency": "INR",
//           "status": "captured",
//           "order_id": "order_ORhTZV3ZUU4Mc9",
//           "invoice_id": null,
//           "international": false,
//           "method": "wallet",
//           "amount_refunded": 0,
//           "refund_status": null,
//           "captured": true,
//           "description": "Test Transaction",
//           "card_id": null,
//           "bank": null,
//           "wallet": "phonepe",
//           "vpa": null,
//           "email": "void@razorpay.com",
//           "contact": "+918200995014",
//           "notes": {
//               "_id": "667d12800a6ba64a5c475a9a",
//               "type": "inhouse Others",
//               "address": "asa"
//           },
//           "fee": 134520,
//           "tax": 20520,
//           "error_code": null,
//           "error_description": null,
//           "error_source": null,
//           "error_step": null,
//           "error_reason": null,
//           "acquirer_data": {
//               "transaction_id": null
//           },
//           "created_at": 1719472773,
//           "reward": null,
//           "base_amount": 5700000
//       }
//   }
// }

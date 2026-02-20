import React, { useState } from "react";
import Styles from "../../styles/reviews.module.scss";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import StarRatings from "react-star-ratings";
import moment from "moment";
import { useRef } from "react";
import Reply from "./Reply";
import {
  useDeleteRepliesMutation,
  useGetAllRepliesMutation,
} from "redux/Api/reviews.api";
import { S3PROXY } from "../../config";
const Reviews = ({ item, handleButtonClick }) => {
  const [page, setPage] = useState(1);
  const [viewReview, setViewReview] = useState(false);
  const [isReply, setisReply] = useState(true);
  const [allReplies, setAllReplies] = useState([]);
  const [totalReplies, setTotalReplies] = useState();
  const handleViewMore = () => {};
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const [getAllReplies] = useGetAllRepliesMutation();
  const handleViewReply = async (id) => {
    const res = await getAllReplies({
      page: page,
      reviewid: id,
    });
    setAllReplies([...allReplies, ...res?.data?.data]);
    setTotalReplies(res?.data);
    setPage(page + 1);

    // setSubRev(Math.random);
    setViewReview(true);
  };
  const [deleteReplies] = useDeleteRepliesMutation();
  const handleDeleteReply = async (id) => {
    const res = await deleteReplies(id);
    if (res.data.success) {
      window.location.reload();
    }
  };
  return (
    <>
      <div className={Styles.ReviewContainer1}>
        <AccountCircleIcon fontSize="large"></AccountCircleIcon>
        <div>
          <div className={Styles.ReviewUser}>
            <article>
              <hgroup>{item?.name}</hgroup>
              <span className={Styles.ReviewCountryDate}>
                Reviewed on {moment(item?.createdAt).format("MMM DD YYYY")}
              </span>
            </article>
            <div className={Styles.ReviewStar}>
              <StarRatings
                rating={item?.rating}
                starRatedColor="gold"
                numberOfStars={5}
                name="rating"
                starDimension="17px"
                starSpacing="2px"
              />
            </div>
          </div>

          <div className={Styles.ReviewSpan}>
            <span style={{ fontSize: "15px" }}>{item?.reviewTitle}</span>
            <span>{item?.reviewBody}</span>
          </div>
          <div
            className={Styles.qualitycontainer}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(138px, 1fr))",
            }}
          >
            {item?.valueForMoney ? (
              <div className={Styles.exclusivecontainer}>
                <div className={Styles.exclusive}>
                  <img
                    className={Styles.rectangle}
                    src={`${S3PROXY}/public/img/webp/Rectangle 13.webp`}
                    alt=""
                  />
                  <img
                    className={Styles.star2}
                    src={`${S3PROXY}/public/img/webp/profit.webp`}
                    alt=""
                  />
                  <span className={Styles.excluivespan}>Value For Money</span>
                </div>
              </div>
            ) : (
              <></>
            )}
            {item?.fabricQuality ? (
              <div className={Styles.exclusivecontainer}>
                <div className={Styles.exclusive}>
                  <img
                    className={Styles.rectangle}
                    src={`${S3PROXY}/public/img/webp/Rectangle 13.webp`}
                    alt=""
                  />
                  <img
                    className={Styles.star2}
                    src={`${S3PROXY}/public/img/webp/fabric-pattern.webp`}
                    alt=""
                  />
                  <span className={Styles.excluivespan}>Fabric Quality</span>
                </div>
              </div>
            ) : (
              <></>
            )}
            {item?.colors ? (
              <div className={Styles.exclusivecontainer}>
                <div className={Styles.exclusive}>
                  <img
                    className={Styles.rectangle}
                    src={`${S3PROXY}/public/img/webp/Rectangle 13.webp`}
                    alt=""
                  />
                  <img
                    className={Styles.star2}
                    src={`${S3PROXY}/public/img/webp/colour.webp`}
                    alt=""
                  />
                  <span className={Styles.excluivespan}>Colors</span>
                </div>
              </div>
            ) : (
              <></>
            )}
            {item?.clothStyle ? (
              <div className={Styles.exclusivecontainer}>
                <div className={Styles.exclusive}>
                  <img
                    className={Styles.rectangle}
                    src={`${S3PROXY}/public/img/webp/Rectangle 13.webp`}
                    alt=""
                  />
                  <img
                    className={Styles.star2}
                    src={`${S3PROXY}/public/img/webp/tuxedo.webp`}
                    alt=""
                  />
                  <span className={Styles.excluivespan}>Style</span>
                </div>
              </div>
            ) : (
              <></>
            )}
            {item?.comfort ? (
              <div className={Styles.exclusivecontainer}>
                <div className={Styles.exclusive}>
                  <img
                    className={Styles.rectangle}
                    src={`${S3PROXY}/public/img/webp/Rectangle 13.webp`}
                    alt=""
                  />
                  <img
                    className={Styles.star2}
                    src={`${S3PROXY}/public/img/webp/comfort-zone.webp`}
                    alt=""
                  />
                  <span className={Styles.excluivespan}>Comfort</span>
                </div>
              </div>
            ) : (
              <></>
            )}
            {item?.food ? (
              <div className={Styles.exclusivecontainer}>
                <div className={Styles.exclusive}>
                  <img
                    className={Styles.rectangle}
                    src={`${S3PROXY}/public/img/webp/Rectangle 13.webp`}
                    alt=""
                  />
                  <img
                    className={Styles.star2}
                    src={`${S3PROXY}/public/img/webp/dish.webp`}
                    alt=""
                  />
                  <span className={Styles.excluivespan}>Food</span>
                </div>
              </div>
            ) : (
              <></>
            )}{" "}
            {item?.banquet ? (
              <div className={Styles.exclusivecontainer}>
                <div className={Styles.exclusive}>
                  <img
                    className={Styles.rectangle}
                    src={`${S3PROXY}/public/img/webp/Rectangle 13.webp`}
                    alt=""
                  />
                  <img
                    className={Styles.star2}
                    src={`${S3PROXY}/public/img/webp/wedding.webp`}
                    alt=""
                  />
                  <span className={Styles.excluivespan}>Beautiful Banquet</span>
                </div>
              </div>
            ) : (
              <></>
            )}{" "}
            {item?.hospitality ? (
              <div className={Styles.exclusivecontainer}>
                <div className={Styles.exclusive}>
                  <img
                    className={Styles.rectangle}
                    src={`${S3PROXY}/public/img/webp/Rectangle 13.webp`}
                    alt=""
                  />
                  <img
                    className={Styles.star2}
                    src={`${S3PROXY}/public/img/webp/hospitality.webp`}
                    alt=""
                  />
                  <span className={Styles.excluivespan}>Good Hospitality</span>
                </div>
              </div>
            ) : (
              <></>
            )}{" "}
            {item?.staff ? (
              <div className={Styles.exclusivecontainer}>
                <div className={Styles.exclusive}>
                  <img
                    className={Styles.rectangle}
                    src={`${S3PROXY}/public/img/webp/Rectangle 13.webp`}
                    alt=""
                  />
                  <img
                    className={Styles.star2}
                    src={`${S3PROXY}/public/img/webp/teamwork.webp`}
                    alt=""
                  />
                  <span className={Styles.excluivespan}>Great Staff</span>
                </div>
              </div>
            ) : (
              <></>
            )}
            {item?.qualitywork ? (
              <div className={Styles.exclusivecontainer}>
                <div className={Styles.exclusive}>
                  <img
                    className={Styles.rectangle}
                    src={`${S3PROXY}/public/img/webp/Rectangle 13.webp`}
                    alt=""
                  />
                  <img
                    className={Styles.star2}
                    src={`${S3PROXY}/public/img/quality-webp/service.webp`}
                    alt=""
                  />
                  <span className={Styles.excluivespan}>Quality Work</span>
                </div>
              </div>
            ) : (
              <></>
            )}
            {item?.professionalism ? (
              <div className={Styles.exclusivecontainer}>
                <div className={Styles.exclusive}>
                  <img
                    className={Styles.rectangle}
                    src={`${S3PROXY}/public/img/webp/Rectangle 13.webp`}
                    alt=""
                  />
                  <img
                    className={Styles.star2}
                    src={`${S3PROXY}/public/img/webp/professional.webp`}
                    alt=""
                  />
                  <span className={Styles.excluivespan}>Professionalism</span>
                </div>
              </div>
            ) : (
              <></>
            )}
            {item?.onTime ? (
              <div className={Styles.exclusivecontainer}>
                <div className={Styles.exclusive}>
                  <img
                    className={Styles.rectangle}
                    src={`${S3PROXY}/public/img/webp/Rectangle 13.webp`}
                    alt=""
                  />
                  <img
                    className={Styles.star2}
                    src={`${S3PROXY}/public/img/webp/working-time.webp`}
                    alt=""
                  />
                  <span className={Styles.excluivespan}>On Time</span>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
          <div
            className={Styles.ReplyContainer}
            style={{
              display: viewReview ? "flex" : "none",
              flexDirection: "column",
            }}
          >
            {allReplies?.map((items, index) => {
              return (
                <Reply
                  items={items}
                  item={item}
                  handleButtonClick={handleButtonClick}
                  handleDeleteReply={handleDeleteReply}
                />
              );
            })}
          </div>
          <div style={{ display: "flex" }}>
            <span
              className={Styles.Viewbtn}
              style={{
                display: isReply ? "flex" : "none",
                paddingLeft: viewReview ? "50px" : "",
                // width: "80px",
                marginRight: "10px",
              }}
              onClick={async (e) => {
                e.stopPropagation();
                if (!viewReview && page === 1) {
                  setViewReview(true);
                  handleViewReply(item?._id);
                } else {
                  setViewReview(!viewReview);
                }
              }}
            >
              {viewReview ? "Hide Reply" : "View Reply"}
            </span>
            <span
              onClick={(e) => {
                handleViewReply(item?._id);
              }}
              className={Styles.Viewbtn}
              style={{
                display: "flex",
                paddingLeft: "0px",
              }}
            >
              {totalReplies?.remainingReplies && viewReview
                ? `${totalReplies?.remainingReplies} Remaning `
                : ""}
            </span>
          </div>
        </div>

        {/* {allReplies?.map((item) => {
              <div
                className={Styles.ReplyContainer}
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div className={Styles.ReviewUser}>
                  <AccountCircleIcon fontSize="medium"></AccountCircleIcon>
                  <h6>{item?.name}</h6>
                </div>
                <span className={Styles.ReviewCountryDate}>
                  Reply on {moment(item?.createdAt).format("MMM DD YYYY")}
                </span>
                <div className={Styles.ReviewSpan}>
                  <span>{item?.replyBody}</span>
                </div>
              </div>;
            })} */}
      </div>
    </>
  );
};

export default Reviews;

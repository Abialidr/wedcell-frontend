import styles from "../../styles/planning.module.scss";
import React, { useEffect, useState } from "react";
import Test2 from "../../Components/Test";
import useWindowSize from "@rooks/use-window-size";
import { RWebShare } from "react-web-share";
import { useRouter } from "next/router";
import {
  useGetInviteTemplatesQuery,
  useGetInvitesDataQuery,
} from "redux/Api/invites.api";
import { S3PROXY } from "../../config";

const GuestInvites = () => {
  const [templates, setTemplates] = useState();
  const router = useRouter();
  const pages = router.query.page;
  const [page, setPage] = useState(pages ? pages : 1);
  const { data: gettemplates, refetch } = useGetInviteTemplatesQuery(page);
  const [pageCount, setPageCount] = useState("");
  const [totalres, settotalres] = useState();
  useEffect(() => {
    setTemplates(gettemplates?.data);
    setPageCount(gettemplates?.totalPage);
    settotalres(gettemplates?.total);
  }, [gettemplates, page]);
  const handlePageChange = (newPage) => {
    setPage(newPage);
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("page", newPage.toString());
    const newUrl = window.location.pathname + "?" + urlParams.toString();
    window.history.pushState("", "", newUrl);
  };
  const [id, setId] = useState();
  const { data: invitesData } = useGetInvitesDataQuery();
  useEffect(() => {
    const getData = async () => {
      const res = { data: invitesData };

      setId(res?.data?.data?._id);
    };
    getData();
  }, [invitesData]);
  const [showCard, setShowcard] = useState(true);
  const { innerWidth: windowWidth } = useWindowSize();

  return (
    <>
      <div
        style={{ width: "95%", alignSelf: "center" }}
        className={styles.BudplanHead}
      >
        <div className={styles.VendorWishlistHead}>
          {/* <button className={styles.VendorManagerseeAll}>See All</button> */}
          <div className={styles.tab}>
            <span
              style={
                showCard
                  ? {
                      cursor: "pointer",
                      color: "#b6255a",
                      background: "white",
                    }
                  : {}
              }
              onClick={() => setShowcard(false)}
            >
              Templates
            </span>
            <span
              style={
                !showCard
                  ? {
                      cursor: "pointer",
                      color: "#b6255a",
                      background: "white",
                    }
                  : {}
              }
              onClick={() => setShowcard(true)}
            >
              My Card
            </span>
          </div>
        </div>
      </div>
      {showCard ? (
        <div
          style={{ cursor: "pointer" }}
          onClick={() => router.push("/canva")}
        >
          <div
            className={styles.BudPlanhead1}
            style={{
              display: "flex",
              justifyContent: "end",
              padding: "0px 50px",
              flexDirection: windowWidth > 900 ? "row" : "column",
              alignItems: "center",
              // padding: '5px',
              fontSize: "15px",
              gap: "5px",
              width: "100%",
            }}
          >
            {/* <span className={styles.VendorManagerspan1}>
            Send Your Invitation Online
          </span> */}
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <RWebShare
                data={{
                  text: "Share Invites",
                  url: `https://wedfield.com/InvitationCard?id=${id}`,
                  title: "Share Invites",
                }}
              >
                <button className={styles.DownloadAndPrint}>
                  <img
                    src={`${S3PROXY}/public/images/webp/forward.webp`}
                    alt=""
                  />{" "}
                  Share
                </button>
              </RWebShare>
            </div>
          </div>
          <Test2 id={id}></Test2>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <div className={styles.templateGrids}>
            {templates?.map((val, key) => {
              return (
                <article>
                  <div>
                    <img
                      style={{ cursor: "pointer" }}
                      key={key}
                      src={`${S3PROXY}${val.Images}`}
                      alt=""
                    />
                  </div>
                  <span
                    onClick={() => router.push(`canva?templateID=${val._id}`)}
                  >
                    <img src={`${S3PROXY}/public/images/penhere.png`} alt="" />
                  </span>
                </article>
              );
            })}
          </div>
          <div className={styles.pagination21}>
            <span>
              Showing {8 * (page - 1) + 1}-
              {8 * page > totalres ? totalres : 8 * page} of {totalres} results
            </span>
            <article>
              {page === 1 ? (
                <span></span>
              ) : (
                <>
                  <img
                    onClick={() => handlePageChange(page - 1)}
                    src={`${S3PROXY}/public/LandingPage/→.png`}
                    alt=""
                  ></img>
                  <span
                    onClick={() => handlePageChange(1)}
                    style={{ marginLeft: "6px" }}
                  >
                    1{" "}
                  </span>
                  ...
                </>
              )}
              <hgroup>{page}</hgroup>
              of{" "}
              <span onClick={() => handlePageChange(pageCount)}>
                {pageCount}
              </span>
              {page === pageCount ? (
                <span></span>
              ) : (
                <img
                  onClick={() => handlePageChange(page + 1)}
                  src={`${S3PROXY}/public/LandingPage/→.png`}
                  alt=""
                ></img>
              )}
            </article>
          </div>
        </div>
        // <Test
        //   propertyName={propertyName}
        //   setPropertyName={setPropertyName}
        // />
      )}
    </>
  );
  // return <>hello world</>;
};

export default GuestInvites;

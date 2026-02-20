import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { useGetInviteTemplatesQuery } from "redux/Api/invites.api";
import { selectUser } from "redux/reducer/appEssentials";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { S3PROXY } from "../../config";
import { MetaTags } from "Components/common/DetailPageCommonComp";

const Einvites = () => {
  const metaTags = {
    eInvite: {
      description:
        "Create your own E-invite wedding card online for free. 1000s of e-invite templates to choose from. Start creating your E-invites wedding now.",
      title: "Wedding E-Invite – Create Digital E-invites For Wedding",
      url: "https://wedfield.com/e-invite",
    },
    // Add other meta tags here if needed
  };
  const meta = metaTags["eInvite"];
  const [templates, setTemplates] = useState();
  const router = useRouter();
  const pages = router.query.page;
  const [page, setPage] = useState(pages ? pages : 1);
  const { data: gettemplates, refetch } = useGetInviteTemplatesQuery(page);
  const [pageCount, setPageCount] = useState("");
  const [totalres, settotalres] = useState();
  useEffect(() => {
    refetch();
    setTemplates(gettemplates?.data);
    setPageCount(gettemplates?.totalPage);
    settotalres(gettemplates?.total);
  }, [gettemplates, page]);
  const globleuser = useSelector(selectUser);
  useEffect(() => {
    const handlePopstate = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const pageParam = parseInt(urlParams.get("page"));
      if (!isNaN(pageParam)) {
        setPage(pageParam);
      } else {
        setPage(1);
      }
    };

    window.addEventListener("popstate", handlePopstate);

    return () => {
      window.removeEventListener("popstate", handlePopstate);
    };
  }, []);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("page", newPage.toString());
    const newUrl = window.location.pathname + "?" + urlParams.toString();
    window.history.pushState("", "", newUrl);
  };
  return (
    <>
      <MetaTags meta={meta} />
      <div className={styles.main}>
        <article style={{ cursor: "pointer" }}>
          <h1>
            Wedding Cards <span>{templates?.length} Items</span>
          </h1>
          <div className={styles.container}>
            {templates?.map((val) => {
              return (
                <div
                  onClick={() => {
                    if (globleuser) {
                      router.push(`/canva?templateID=${val?._id}`);
                    } else {
                      router.push("/customer-login");
                    }
                  }}
                >
                  <img src={`${S3PROXY}${val.Images}`} alt="" />
                </div>
              );
            })}
          </div>
        </article>
        <div className={styles.pagination}>
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
            <span onClick={() => handlePageChange(pageCount)}>{pageCount}</span>
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
    </>
  );
};

export default Einvites;

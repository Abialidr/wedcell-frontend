import { useEffect, useRef, useState } from "react";
import Styles from "../../styles/Vendors.module.scss";
import { Box, Modal } from "@mui/material";
import { useRouter } from "next/router";
// import ShopNowCard from "../../Components/newCard/ShopNowCard/ShopNowCard";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import { MetaTags } from "Components/common/DetailPageCommonComp";

import {
  loginRoute,
  selectLocation,
  selectUser,
} from "../../redux/reducer/appEssentials";
import useWindowSize from "@rooks/use-window-size";
import {
  useFulltextSearchOtherproductQuery,
  useLazyGetAllOtherProductQuery,
} from "redux/Api/common.api";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import OtherProductCards from "Components/Cards/OtherProductCard";
import Downloads from "Components/Landing Page/Downloads";
import { Icon } from "@iconify/react";
import Head from "next/head";
import { S3PROXY } from "../../config";

const c = {
  Cake: "cake",
  Invites: "invitation-card",
  Gifts: "invitation-gift",
};

function OtherProductDashboard({ product, category, page }) {
  const metaTags = {
    Invites: {
      description:
        "Celebrate tradition with WedField's elegant Hindu wedding cards. Our beautifully designed wedding invitation cards capture the essence of traditional weddings with style and personalization. Discover our range of custom, traditional wedding cards to make your special day unforgettable.",
      title: "Invitation Cards | Wedding Cards – WedField Cards",
      url: "https://wedfield.com/invitation-card/wedding/1",
    },
    Gifts: {
      description:
        "Explore WedField's exclusive collection of wedding invitation gifts, perfect for making a lasting impression. Find unique, personalized gifts for weddings, haldi, mehendi, and more.",
      title: "Invitation Gift | Wedding Gifts – WedField Gifts",
      url: "https://wedfield.com/invitation-gift/wedding/1",
    },
    Cake: {
      title: "Best Cake Makers Collections – Wedfield",
      description:
        "Best Cake Makers Collections. Get Price, Contact Number, Review and Rating and Many More on WedField.",
      url: "https://wedfield.com/cake/wedding/1",
    },
  };
  const meta = metaTags[category] || metaTags["invitationCard"];
  const hasMounted = useRef(false);

  const globleuser = useSelector(selectUser);

  const router = useRouter();

  const [viewType, setViewType] = useState({ grid: true });

  function changeViewType() {
    setViewType({
      grid: !viewType.grid,
    });
  }
  const [firstPrice, setFirstPrice] = useState("");

  const [data, setData] = useState(JSON.parse(product).data);
  const [totalres, settotalres] = useState(JSON.parse(product).total);
  const [totalpagesize, settotalpagesize] = useState(
    JSON.parse(product).pageSize
  );
  const [pageCount, setPageCount] = useState(JSON.parse(product).totalPage);

  const [price, setPrice] = useState("");
  const searchText = router.query.search;

  const [catagory, setCategory] = useState(category);
  const {
    innerWidth: windowWidth,
    innerHeight,
    outerHeight,
    outerWidth,
  } = useWindowSize();

  const dispatch = useDispatch();
  dispatch(loginRoute(""));

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100px",
    bgcolor: "background.paper",
    // border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    borderRadius: "10px",
    height: "100px",
    overflow: "scroll",
    // paddingTop: "270px",
    zIndex: "-1",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  const [openloading, setOpenloading] = useState(false);
  const [con, setCon] = useState();
  const [fetchData, { refetch, isFetching, isLoading }] =
    useLazyGetAllOtherProductQuery();

  const { data: textSearch } = useFulltextSearchOtherproductQuery(skipToken);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
    } else {
      if (!searchText) {
        (async () => {
          setOpenloading(true);
          const condition = {
            page,
            ...(price
              ? { productPrice: parseInt(price) }
              : { productPrice: "" }),
            category: catagory,
            ...(globleuser?.data?._id ? { isUser: globleuser?.data?._id } : {}),
          };

          try {
            const res = await fetchData(condition);
            if (!isLoading) {
              let filteredData = res.data.data;

              filteredData = await Promise.all(filteredData);

              setData(filteredData);
              settotalres(res?.data?.total);
              setPageCount(res?.data?.totalPage);
              settotalpagesize(res?.data?.pageSize);
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            } else {
            }
          } catch (error) {
            console.error("Error", error);
          } finally {
            setOpenloading(false);
          }
        })();
      }
      //  else {
      //   (async (page) => {
      //     setOpenloading(true);
      //     let price1 = parseInt(price);
      //     setCond({
      //       searchText,
      //       page,
      //       catagory: catagory ? catagory : "",
      //       price: price ? parseInt(price) : "",
      //     });
      //     const res = { data: textSearch };

      //     let filteredData = res?.data?.data;

      //     setData(filteredData);
      //     settotalres(res?.data?.total);
      //     settotalpagesize(res?.data?.pageSize);
      //     setPageCount(res?.data?.totalPage);
      //     setOpenloading(false);

      //     setPage(1);
      //     window.scrollTo({
      //       top: 0,
      //       behavior: "smooth",
      //     });
      //   })(page);
      // }
    }
  }, [price]);

  const handlePageChange = (newPage) => {
    router.push(`/${c[catagory]}/wedding/${parseInt(newPage)}`);
  };

  const [filterOPen, setFilterOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <MetaTags meta={meta} />

      <Box sx={{ mt: 0, display: "flex", justifyContent: "center" }}>
        <Modal
          open={openloading}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Spinner></Spinner>
          </Box>
        </Modal>

        <div className={Styles.header}>
          <article>
            <Icon
              onClick={() => router.back()}
              icon={"icon-park-outline:back"}
            />
            Products
          </article>
        </div>
        <div
          className="container py-4 px-xl-5"
          style={{
            maxWidth: windowWidth > 1440 ? "1600px" : "90%",
            width: "100%",
            position: "relative",
          }}
        >
          {searchText ? (
            <div
              style={{
                maxWidth: "calc(100vw + 60px)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginBottom: "20px",
                overflow: "hidden",
                // marginBottom: '20px',
              }}
            >
              <span
                style={{
                  fontSize: windowWidth > 500 ? "26px" : "18px",
                  textAlign: "right",
                  // color: "gray",
                  display: "flex",
                  justifyContent: "center",
                  gap: "10px",
                  alignItems: "end",
                  whiteSpace: "nowrap",
                }}
              >
                <span
                  style={{
                    fontWeight: "600",
                    textTransform: "capitalize",
                    width: "100%",
                    maxWidth: "140px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {searchText}
                </span>
                found in <span style={{ color: "#db3672" }}>Products</span>
              </span>
              <span
                style={{
                  display: "flex",
                  fontSize: windowWidth > 500 ? "17px" : "14PX",
                  display: "flex",
                  justifyContent: "center",
                  gap: "5px",
                  alignItems: "end",
                  whiteSpace: "nowrap",

                  // position: 'fixed',
                }}
              >
                You can search{" "}
                <span
                  style={{
                    textTransform: "capitalize",
                    fontSize: windowWidth > 500 ? "19px" : "16PX",
                    maxWidth: "80px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {searchText}
                </span>
                in
                <span
                  style={{ color: "#db3672", cursor: "pointer" }}
                  onClick={() => {
                    router.push({
                      pathname: "venue",
                      query: { search: searchText },
                    });
                  }}
                >
                  Venue
                </span>{" "}
                &{" "}
                <span
                  style={{ color: "#db3672", cursor: "pointer" }}
                  onClick={() => {
                    router.push({
                      pathname: "vendors",
                      query: { search: searchText },
                    });
                  }}
                >
                  Vendors
                </span>
              </span>
            </div>
          ) : (
            <></>
          )}
          {/* <Banner
            img={"other-product"}
            head={"A well-chosen gift hamper is a delightful surprise"}
            desc={
              "Fashion is a language that creates itself in clothes to interpret reality."
            }
          ></Banner> */}
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",

              // marginBottom: '20px',
            }}
          >
            <div
              className={Styles.filterFat1}
              style={{
                margin: "30px 0px",
                padding: "5px 20px",
                width: "100%",
                display: "flex",
                justifyContent: "space-between",

                border: "1px solid #00000029",
                boxShadow: "0px 8px 16px 0px #00000014",
                borderRadius: "8px",

                // marginBottom: '20px',
              }}
            >
              <span
                style={{
                  textAlign: "right",
                  color: "gray",
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                  fontSize: "18px",
                  fontWeight: "500",
                  lineHeight: "18px",
                  letterSpacing: "-0.14000000059604645px",
                  textAlign: "left",
                  color: "#db3672",
                }}
                onClick={() => setFilterOpen(!filterOPen)}
              >
                Filter
                {/* <span
                style={{
                  fontSize: '18px',
                  textAlign: 'right',
                  color: '#db3672',
                  gap: '10px',
                  fontWeight: '600',
                }}
              >
                {totalres}
              </span>{' '} */}
                <span
                  style={{ transform: filterOPen ? "rotate(180deg)" : "" }}
                  onClick={() => setFilterOpen(!filterOPen)}
                >
                  &#x25BC;
                </span>
              </span>
              <span
                style={
                  filterOPen
                    ? {
                        height: "auto",
                        marginTop: "0px",
                      }
                    : {}
                }
                className={Styles.filter}
              >
                <div className={Styles.input}>
                  <input
                    type="number"
                    className="form-control"
                    id="customRange1"
                    min={0}
                    max={1000000}
                    value={firstPrice}
                    onChange={async (e) => {
                      // e.preventDefault();
                      setFirstPrice(e.target.value);

                      if (!e.target.value) {
                        setPrice("");
                      }
                    }}
                    placeholder="Filter price"
                  />
                  <button onClick={() => setPrice(firstPrice)}>
                    <Icon icon={"iconoir:search"} />
                  </button>
                </div>
              </span>
            </div>
          </div>
          <div className="row mb-4 mt-lg-3">
            <div className="">
              <div className="d-flex flex-column h-100">
                <div className="row mb-3">
                  <div className="col-lg-3 d-none d-lg-block"></div>
                  <div className="col-lg-9 col-xl-5 offset-xl-4 d-flex flex-row">
                    {/* <div className='input-group'>
                    <input
                      className='form-control'
                      type='text'
                      placeholder='Search products...'
                      aria-label='search input'
                      value={searchText}
                      onChange={(e) => {
                        setsearchText(e.target.value);
                        if (!searchText) {
                          getData('');
                        }
                        // if (!searchText) {
                        //   getData();
                        // }
                      }}
                    />
                    <button
                      onClick={() => handleSearch(1)}
                      className='btn btn-outline-dark'
                    >
                      <FontAwesomeIcon icon={['fas', 'search']} />
                    </button>
                  </div> */}
                    {/* <button
                    className="btn btn-outline-dark ms-2 d-none d-lg-inline"
                    onClick={changeViewType}
                  >
                    <FontAwesomeIcon
                      icon={["fas", viewType.grid ? "th-list" : "th-large"]}
                    />
                  </button> */}
                  </div>
                </div>
                <div
                  style={{
                    width: "100%",
                    display: " grid",
                    rowGap: "25px",
                    columnGap: "10px",
                    placeItems: "center",
                    justifyContent: "center",
                    gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
                    // windowWidth > 900
                    //   ?
                    //   : "repeat(auto-fit, minmax(280px, 1fr))",
                  }}
                  // className={
                  //   'row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 g-3 mb-4 flex-shrink-0 row-cols-xl-4'
                  // }
                >
                  {data?.length ? (
                    data.map((item, i) => (
                      <div>
                        <OtherProductCards
                          data={item}
                          defaultWishlist={null}
                          key={item._id}
                          page={page}
                          link={c[catagory]}
                        ></OtherProductCards>
                      </div>
                    ))
                  ) : (
                    <h4
                      className="vendor_name fw-bold"
                      style={{ color: "#B4245D" }}
                    >
                      No data found
                    </h4>
                  )}
                </div>

                <div className={Styles.pagination}>
                  <span>
                    Showing {40 * (page - 1) + 1}-
                    {40 * page - 40 + totalpagesize} of {totalres} results
                  </span>
                  <article>
                    {parseInt(page) === 1 ? (
                      <span></span>
                    ) : (
                      <>
                        <img
                          onClick={() => handlePageChange(parseInt(page) - 1)}
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
                    {parseInt(page) === pageCount ? (
                      <span></span>
                    ) : (
                      <img
                        onClick={() => handlePageChange(parseInt(page) + 1)}
                        src={`${S3PROXY}/public/LandingPage/→.png`}
                        alt=""
                      ></img>
                    )}
                  </article>
                </div>

                <Downloads></Downloads>
              </div>
            </div>
          </div>
        </div>
      </Box>
    </>
  );
}

export default OtherProductDashboard;

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Styles from "../../../styles/Vendors.module.scss";
import { AiTwotoneHeart } from "react-icons/ai";
import { useRouter } from "next/router";
import { Box, Modal } from "@mui/material";
import { Spinner } from "react-bootstrap";
import { loginRoute, selectUser } from "../../../redux/reducer/appEssentials";
import { useSelector, useDispatch } from "react-redux";
import useWindowSize from "@rooks/use-window-size";
import {
  useLazyFulltextSearchVendorQuery,
  useLazyGetAllVendorQuery,
} from "redux/Api/common.api";
import AllVendorCards from "Components/Cards/AllVendorCards";
import Downloads from "Components/Landing Page/Downloads";
import { Icon } from "@iconify/react";
import Head from "next/head";
import { S3PROXY } from "../../../config";
import mongoose from "mongoose";
import VendorUserModels from "../../../models/VendorUserModels";
import WishlistModels from "../../../models/WishlistModel";
import { wrapper } from "redux/store";
const subCategories = [
  "Chaat Counter",
  "Fruit Counter",
  "Catering services",
  "Pan Counter",
  "Bar Tenders",
];
const CatObj = {
  "chaat-counter": "Chaat Counter",
  "fruit-counter": "Fruit Counter",
  "catering-services": "Catering services",
  "pan-counter": "Pan Counter",
  "bar-tenders": "Bar Tenders",
};
const Vendors = (props) => {
  const { allvenue, page, subCategory, searchText, location } = props;

  const globleuser = useSelector(selectUser);
  const dispatch = useDispatch();
  dispatch(loginRoute(""));
  const router = useRouter();

  const category = "Food";
  const [data, setData] = useState(JSON.parse(allvenue).data);
  const [pageCount, setPageCount] = useState(JSON.parse(allvenue).totalPage);
  const [totalres, settotalres] = useState(JSON.parse(allvenue).total);
  const [totalpagesize, settotalpagesize] = useState(
    JSON.parse(allvenue).pageSize
  );

  const [firstPrice, setFirstPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState("");
  // const [searchText, setsearchText] = useState('');
  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const handleClose1 = () => {
    setAnchorEl1(null);
  };
  const open1 = Boolean(anchorEl1);
  const id = open1 ? "simple-popover" : undefined;
  const { innerWidth: windowWidth } = useWindowSize();
  const [filterOPen, setFilterOpen] = useState(false);
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
  const [openloading, setOpenloading] = React.useState(false);
  const [fetchData] = useLazyGetAllVendorQuery();
  const [serchVendor] = useLazyFulltextSearchVendorQuery();

  const handleSearch = async () => {
    setOpenloading(true);
    try {
      let res;
      if (searchText) {
        res = await serchVendor({
          category: "Food",
          ...(price ? { price: price } : { price: "" }),
          ...(subCategory ? { subCategory } : { subCategory: "" }),
          city: location !== "all" ? location : "",
          page,
          isUser: globleuser?.data?._id,
          searchText,
        });
      } else {
        res = await fetchData({
          category: "Food",
          ...(price ? { price: price } : { price: "" }),
          ...(subCategory ? { subCategory } : { subCategory: "" }),
          city: location !== "all" ? location : "",
          page,
          isUser: globleuser?.data?._id,
        });
      }
      if (res?.data?.success) {
        let filteredData = res.data.data;
        setData(filteredData);
        setPageCount(res?.data?.totalPage);
        settotalres(res?.data?.total);
        settotalpagesize(res?.data?.pageSize);

        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      } else {
        console.error("No data found");
      }
    } catch (error) {
    } finally {
      setOpenloading(false);
    }
  };
  const hasMounted = useRef(false);
  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
    } else {
      handleSearch();
    }
  }, [price]);
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
  // Function to handle page change
  const handlePageChange = (newPage) => {
    router.push({
      pathname: `/vendors/wedding/${newPage}/${location}/${
        router.query.slug[2] ? router.query.slug[2] : ""
      }`,
      query: { ...(searchText ? { search: searchText } : {}) },
    });
  };
  const contains = ({ name }, query) => {
    if (name.toLowerCase().includes(query)) {
      return true;
    }
    return false;
  };
  const renderItemList = (item) => {
    return (
      <div
        className={`${Styles.v_card} box-shadow mb-4 bg-white`}
        onClick={() => router.push(`/vendors/${item.name}/${item._id}`)}
        style={{ cursor: "pointer", scrollBehavior: "smooth" }}
      >
        <div className="row">
          <div className="col-md-4">
            <div
              className={`${Styles.card_img_wrapper} position-relative overflow-hidden`}
            >
              <Image
                src={`${S3PROXY}${item.mainImage}`}
                layout="fill"
                objectFit="cover"
                alt={item.name}
              />
              <div className={Styles.icon_wrapper}>
                <AiTwotoneHeart />
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className="card-info p-3 d-flex flex-column h-100 justify-content-center">
              <h4 className="vendor_name primary-text fw-bold">{item.name}</h4>
              <p className="text-gray">{item.city}</p>
              <div className="price-container d-flex align-items-center">
                <span className="fw-semi">Starting price</span>
                <span className="fw-semi"> ₹ {item.price}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const renderItemColumn = (ph, key) => {
    const longText = `${ph.description}`;
    return (
      <div
      //  onClick={() => router.push(`/vendors/${ph._id}`)}
      >
        <AllVendorCards data={ph} key={ph._id} page={page} />
      </div>
    );
  };
  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner />
      </div>
    );
  }
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const meta = [
    {
      name: "Photographers",
      title: "Best Photographers – WedField",
      des: "Book Best Photographers For Wedding and Events. Get Price, Plans and Packages, Contact Number, Review and Rating and Much More on WedField.",
      can: "https://wedfield.com/vendors?category=Photographers",
    },
    {
      name: "Album",
      title: "Albums Makers - WedField",
      des: "Design Your Album Designed by Professional Designer. Get Price, Plans, Review and rating and much more on WedField",
      can: "http://wedfield.com/vendors?category=Photographers&subCategory=Album",
    },
    {
      name: "Cinema/Video",
      title: "Top Cinema/Video Shooter - WedField",
      des: "Get your Cinema/Video shoot done by professional videographers. get plans pricing, review and rating and much more on wedField",
      can: "http://wedfield.com/vendors?category=Photographers&subCategory=Cinema%2FVideo",
    },
    {
      name: "Collage Maker",
      title: "Best Wedding Collage Makers - WedField",
      des: "200+ Wedding Collage Maker Designer. Get Price, Plans and Packages, Review and Rating, Brochure and Much more on WedField.",
      can: "http://wedfield.com/vendors?category=Photographers&subCategory=Collage+Maker",
    },
    {
      name: "Drone",
      title: "Book Drone Video Shooters – WedField",
      des: "100+ Drone Video shooter For Wedding, Pre Wedding and Events. Get Price, Plans and Packages, Review and Rating and Much More on WedField.",
      can: "http://wedfield.com/vendors?category=Photographers&subCategory=Drone",
    },
    {
      name: "Pre Wedding Shoot",
      title: "Best Prewedding Shooters – WedField",
      des: "Best Prewedding Shooters . Get Price, Contact Number, Plans and Packages, Review and Rating and much more on WedField.",
      can: "http://wedfield.com/vendors?category=Photographers&subCategory=Pre+Wedding+Shoot",
    },
    {
      name: "Food",
      title: "Best Food Catering Service Provider - WedField",
      des: "Best Food Catering Service Providers. Get Phone Number, Price, Plans and Packages, Review and Rating and Many More on WedField",
      can: "https://wedfield.com/vendors?category=Food",
    },
    {
      name: "Chaat Counter",
      title: "Best chaat and fruit Counter Providers - Wedfield",
      des: "Best & Top Chaat & Food Counter. Get Phone Number, Price, Plans and Packages, Review and Rating And Many More on WedField.",
      can: "https://wedfield.com/vendors?category=Food&subCategory=Chaat+Counter",
    },
    {
      name: "Fruit Counter",
      title: "Top fruit and chaat catering Providers – WedField",
      des: "Top Fruit and Chaat Catering Providers. Get Price, Plans and Packages, Review and Rating and Many More on WedField.",
      can: "https://wedfield.com/vendors?category=Food&subCategory=Fruit+Counter",
    },
    {
      name: "Catering services",
      title: "Best Catering Service providers – WedField",
      des: "Best Catering Service Providers. Get Price, Plans and Packages, Review and Rating and Many More on WedField.",
      can: "https://wedfield.com/vendors?category=Food&subCategory=Catering+services",
    },
    {
      name: "Pan Counter",
      title: "Top pan Counter Service Provider - WedField",
      des: "Top paan Counter Service Providers. Get Price, Contact Number, Review and Rating and Many More on WedField.",
      can: "https://wedfield.com/vendors?category=Food&subCategory=Pan+Counter",
    },
    {
      name: "Cake",
      title: "Best Cake Makers Collections – Wedfield",
      des: "Best Cake Makers Collections. Get Price, Contact Number, Review and Rating and Many More on WedField.",
      can: "https://wedfield.com/vendors?category=Food&subCategory=Cake",
    },
    {
      name: "Bar Tenders",
      title: "Best Bar Service Providers - WedField",
      des: "Top Bar Service Providers. Get Price, Contact Number, Plan and Packages, Review and Rating and Many More on WedField.",
      can: "https://wedfield.com/vendors?category=Food&subCategory=Bar+Tenders",
    },
    {
      name: "Planning & Decor",
      title: "Top Planning & Décor Services Provider - Wedfield",
      des: "Top Planning & Décor Services Provider. Get Phone Number, Location, Price, Plan and Packages, Review and Rating and Many More on WedField.",
      can: "https://wedfield.com/vendors?category=Planning+%26+Decor",
    },
    {
      name: "Wedding Decor",
      title: "Find Best Wedding Decorators India - Wedfield",
      des: "Top decorators with prices, contacts, portfolios, reviews, and choose the best within your budget from a list of 500+ vendors on Wedfield.",
      can: "https://wedfield.com/vendors?category=Planning+%26+Decor&subCategory=Wedding+Decor",
    },
    {
      name: "Celebrities Management",
      title: "Celebrity Management – WedField",
      des: "WedField provides list Of Celebrity Wedding Management You Need To Follow If You Are Making Marriage Plans. Check out our list of celebrity wedding.",
      can: "https://wedfield.com/vendors?category=Planning+%26+Decor&subCategory=Celebrities+Management",
    },
    {
      name: "Mehndi",
      title: "Best Designers for Mehndi - WedField",
      des: "WedField offers a list of the best suppliers with unique mehndi gift ideas. Check out our offerings, pricing, testimonials and contact them directly.",
      can: "https://wedfield.com/vendors?category=Mehndi",
    },
    {
      name: "Bride Mehndi",
      title: "Top Mehndi Designs for a Bride- WedField",
      des: "WedField provide unique mehndi favours for your brides. Check out our services, costs, reviews, and contact them directly.",
      can: "https://wedfield.com/vendors?category=Mehndi&subCategory=Bride+Mehndi",
    },
    {
      name: "Family Member Mehndi",
      title: "Mehndi Designs for Families- WedField",
      des: "WedField provide unique mehndi favours for your Family members with unique mehndi gift ideas. Check out our pricing, reviews and contact them directly.",
      can: "https://wedfield.com/vendors?category=Mehndi&subCategory=Family+Member+Mehndi",
    },
    {
      name: "Music & Dance",
      title: "Best Dancers & Singers - WedField",
      des: "Best Dancers & Singers. Get Price, Plan and Packages, Contact Number, Review and Rating and Many More on WedField.",
      can: "https://wedfield.com/vendors?category=Music+%26+Dance",
    },
    {
      name: "Anchor",
      title: "Best Anchors for weddings and Events - WedField",
      des: "Best Anchors For wedding, Party and events. Get Phone number, Plan and Packages, Review and Rating and Many More on WedField.",
      can: "https://wedfield.com/vendors?category=Music+%26+Dance&subCategory=Anchor",
    },
    {
      name: "Choreographer",
      title: "Best Professional Choreographers - WedField",
      des: "Top and Best Professional Choreographers. Get Phone number, Plan And Packages, Review and Rating and Many More on WedField.",
      can: "https://wedfield.com/vendors?category=Music+%26+Dance&subCategory=Choreographer",
    },
    {
      name: "DJ",
      title: "Find Best DJ - WedField",
      des: "Best DJ For wedding, Party and events. Get Phone number, Plan and Packages, Review and Rating and Many More on WedField.",
      can: "https://wedfield.com/vendors?category=Music+%26+Dance&subCategory=DJ",
    },
    {
      name: "Ghodi & Baggi",
      title: "Find Best Ghodi & Baggi provider – WedField",
      des: "Find Best Ghodi & Baggi Providers. Get Contact Number, Plan and Packages, Review and Rating and Many More on WedField.",
      can: "https://wedfield.com/vendors?category=Music+%26+Dance&subCategory=Ghodi+%26+Baggi",
    },
    {
      name: "Dhol",
      title: "Best Dhol Provider – WedField",
      des: "Best Dhol Providers. Get Contact Number, Plan and Packages, Review and Rating and Many More on WedField.",
      can: "https://wedfield.com/vendors?category=Music+%26+Dance&subCategory=Dhol",
    },
  ];
  return (
    <Box sx={{ mt: 0, display: "flex", justifyContent: "center" }}>
      <Head>
        <title>
          {category && !subCategory
            ? meta?.find((val) => val.name === category)?.title
            : subCategory
            ? meta?.find((val) => val.name === subCategory)?.title
            : "Best Vendors - Wedfield"}
        </title>
        <meta
          name="description"
          content={
            category && !subCategory
              ? meta?.find((val) => val.name === category)?.des
              : subCategory
              ? meta?.find((val) => val.name === subCategory)?.des
              : "Best Vendors - Wedfield"
          }
        />
        <link
          name="canonical"
          href={
            category && !subCategory
              ? meta?.find((val) => val.name === category)?.can
              : subCategory
              ? meta?.find((val) => val.name === subCategory)?.can
              : "Best Vendors - Wedfield"
          }
        />
      </Head>
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
          <Icon onClick={() => router.back()} icon={"icon-park-outline:back"} />
          Vendors
        </article>
      </div>
      <div
        className="mt-15 py-4 px-xl-5"
        style={{
          maxWidth: windowWidth > 1440 ? "1600px" : "90%",
          width: "100%",
        }}
      >
        {/* {searchText ? (
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
              found in <span style={{ color: "#db3672" }}>Vendors</span>
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
                    pathname: "products",
                    query: { search: searchText },
                  });
                }}
              >
                ShopNow
              </span>{" "}
              &{" "}
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
              </span>
            </span>
          </div>
        ) : (
          <></>
        )} */}
        {/* <Banner
          img={"vendor"}
          head={"Photography Store Upgrade your Style"}
          desc={
            "Fashion is a language that creates itself in clothes to interpret reality."
          }
        ></Banner> */}
        <div
          className={Styles.filterFat}
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
            Vendors
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
            <select
              onChange={(e) => {
                if (e.target.value === "") {
                  router.push({
                    pathname: `/vendors/wedding/1/${location}`,
                    query: { ...(searchText ? { search: searchText } : {}) },
                  });
                } else
                  router.push({
                    pathname: `/vendors/wedding/1/${location}/${e.target.value
                      .toLowerCase()
                      .replace(/\s+/g, "-")
                      .replace(/&/g, "and")}`,
                    query: { ...(searchText ? { search: searchText } : {}) },
                  });
              }}
            >
              <option value={""} selected={"" === subCategory}>
                <div className="btn btn-sm btn-outline-dark rounded-pill me-2 mb-2">
                  {"All"}
                </div>
              </option>
              {subCategories?.map((v, i) => {
                return (
                  <option value={v} key={i} selected={v === subCategory}>
                    <div className="btn btn-sm btn-outline-dark rounded-pill me-2 mb-2">
                      {v}
                    </div>
                  </option>
                );
              })}
            </select>
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
        <div className="row mb-4 mt-lg-3">
          <div className="d-none d-lg-block col-lg-3"></div>
          <div className="">
            <div className="d-flex flex-column h-100">
              <div className="row mb-3">
                <div className="col-lg-3 d-none d-lg-block"></div>
              </div>
              <div
                style={{
                  width: "100%",
                  display: " grid",
                  rowGap: "25px",
                  columnGap: "10px",
                  justifyContent: "center",
                  placeItems: "center",
                  gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
                }}
              >
                {data?.length === 0 ? (
                  <div className="card-info p-3 d-flex flex-column h-100 justify-content-center vendor-list-container bg-grey py-60">
                    <h4
                      className="vendor_name  fw-bold"
                      style={{ color: "#B4245D" }}
                    >
                      No data found
                    </h4>
                  </div>
                ) : (
                  data?.map((item, key) => {
                    return false
                      ? renderItemList(item)
                      : renderItemColumn(item, key);
                  })
                )}
              </div>
              <div className={Styles.pagination}>
                <span>
                  Showing {40 * (page - 1) + 1}-{40 * page - 40 + totalpagesize}{" "}
                  of {totalres} results
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
              {/* <div
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'end',
                  paddingTop: '15px',
                }}
              >
                <Pagination
                  count={pageCount}
                  size='large'
                  shape='rounded'
                  page={page}
                  onChange={handleChange}
                />
              </div> */}
              <Downloads></Downloads>
              {/* <Pagination count={10} variant="outlined" shape="rounded" /> */}
            </div>
          </div>
        </div>
      </div>
      {/* <BottomNav /> */}
    </Box>
  );
};
export default Vendors;
export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params, req, query }) => {
      const cookies = req.headers.cookie;
      let globleuser =
        cookies &&
        cookies
          .split("; ")
          .find((row) => row.startsWith("id="))
          ?.split("=")[1];
      globleuser =
        globleuser == "undefined" || !globleuser ? undefined : globleuser;
      mongoose.connect(
        process.env.PROXY,
        { useNewUrlParser: true, useUnifiedTopology: true },
        () => {
          console.log("Connected to MongoDB");
        }
      );
      const { slug } = params;
      const { search } = query;
      let condition = {
        category: "Food",
        ...(slug[2] && slug[2].length ? { subCategory: CatObj[slug[2]] } : {}),
        ...(slug[1] && slug[1] !== "all" ? { city: slug[1] } : {}),
      };
      const sort = {};

      let category = CatObj[slug[2]];

      if (search) {
        condition["$text"] = { $search: search };
        sort.score = { $meta: "textScore" };
      } else {
        sort.priority = 1;
      }
      const page = parseInt(slug[0]);
      const skip = 40;
      const result = await VendorUserModels.find(condition)
        .sort(sort)
        .skip((page - 1) * skip)
        .limit(skip);
      const total = await VendorUserModels.countDocuments(condition);
      let res1;
      if (globleuser) {
        res1 = result.map(async (value) => {
          const value1 = JSON.parse(JSON.stringify(value));
          let condition = {
            is_delete: false,
            userId: globleuser,
            "product.productId": value1._id,
          };

          const result = await WishlistModels.find(condition);
          if (result.length) {
            value1.wishlist = true;
            value1.wishlistID = result[0]._id;
            return value1;
          } else {
            value1.wishlist = false;
            return value1;
          }
        });
      }
      res1 = globleuser ? await Promise.all(res1) : res1;

      const product = {
        success: true,
        message: "Items Gets Successfully",
        total,
        totalPage: Math.ceil(total / skip),
        page: slug[0],
        pageSize: result.length,
        data: res1 ? res1 : result,
      };
      mongoose.connection.close();
      return {
        props: {
          allvenue: JSON.stringify(product),
          searchText: search ? search : "",
          subCategory: category ? category : "",
          page: parseInt(slug[0]),
          location: slug[1],
        },
      };
    }
);

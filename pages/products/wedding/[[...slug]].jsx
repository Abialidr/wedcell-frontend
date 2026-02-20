import ProductH from "../../../Components/Shop/products/ProductH";
import { useEffect, useMemo, useState } from "react";
import Styles from "../../../styles/Vendors.module.scss";
import { Box, Modal } from "@mui/material";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import { MetaTags } from "Components/common/DetailPageCommonComp";

import {
  loginRoute,
  selectLocation,
  selectUser,
} from "../../../redux/reducer/appEssentials";
import useWindowSize from "@rooks/use-window-size";
import {
  useFulltextSearchproductQuery,
  useGetAllProductQuery,
} from "redux/Api/common.api";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import ShopNowCards from "Components/Cards/ShopNowCards";
import Downloads from "Components/Landing Page/Downloads";
import { Icon } from "@iconify/react";
import Head from "next/head";
import { S3PROXY } from "../../../config";
const colors = [
  "Red",
  "Yellow",
  "Green",
  "Blue",
  "Black",
  "White",
  "Brown",
  "Orange",
  "Pink",
  "Grey",
  "Violet",
  "Purple",
  "Cyan",
  "Gold",
  "all",
];
const links = {
  lehenga: { type: "category", cat: "Lehenga" },
  "bridal-lehenga": { type: "category", cat: "Bridal Lehenga" },
  gowns: { type: "category", cat: "Gowns" },
  sharara: { type: "category", cat: "Sharara" },
  anarkali: { type: "category", cat: "Anarkali" },
  "indo-western": { type: "category", cat: "Indo Western" },
  kurta: { type: "category", cat: "Kurta" },
  sherwani: { type: "category", cat: "Sherwani" },
  all: { type: "occ", cat: "All" },
  engagement: { type: "occ", cat: "Engagement" },
  haldi: { type: "occ", cat: "Haldi" },
  mehendi: { type: "occ", cat: "Mehendi" },
  cocktail: { type: "occ", cat: "Cocktail" },
  wedding: { type: "occ", cat: "Wedding" },
  reception: { type: "occ", cat: "Reception" },
  sangeet: { type: "occ", cat: "Sangeet" },
};
const byOccasion = [
  {
    venue: "All",
    id: "",
  },
  {
    venue: "Engagement",
    id: "Engagement",
  },
  {
    venue: "Haldi",
    id: "Haldi",
  },
  {
    venue: "Mehendi",
    id: "Mehendi",
  },
  {
    venue: "Cocktail",
    id: "Cocktail",
  },
  {
    venue: "Wedding",
    id: "Wedding",
  },
  {
    venue: "Reception",
    id: "Reception",
  },
  {
    venue: "Sangeet",
    id: "Sangeet",
  },
];
const categories = ["All", "Bridal Wear", "Groom Wear"];
const sizes = [
  { name: "S", value: "Small" },
  { name: "M", value: "Medium" },
  { name: "L", value: "Large" },
  { name: "XL", value: "Extra Large" },
  { name: "XXL", value: "XXL" },
  { name: "XXXL", value: "XXXL" },
  { name: "all", value: "" },
];
const allSub = [
  "Lehenga",
  "Bridal Lehenga",
  "Gowns",
  "Sharara",
  "Anarkali",
  "Indo Western",
  "Kurta",
  "Sherwani",
  "Indo Western",
];
const bridalSub = [
  "Lehenga",
  "Bridal Lehenga",
  "Gowns",
  "Sharara",
  "Anarkali",
  "Indo Western",
  "Kurta",
];
const groomSub = ["Sherwani", "Indo Western"];
function ProductList({}) {
  const metaTags = {
    lehenga: {
      description:
        "WedField collection of wedding lehengas. From traditional to modern designs, find the perfect bridal lehenga that reflects your style and makes you shine on your big day.",
      title: "Wedding Lehengas | Designer Bridal Lehengas by WedField",
      url: "https://wedfield.com/products/wedding/1/lehenga",
    },
    bridalLehenga: {
      description:
        "WedField's exclusive bridal lehenga collection, crafted for elegance and style. Find designer Bridal lehengas that blend tradition with modern flair, perfect for your Special day.",
      title: "Bridal Lehengas | Designer Wedding Lehengas by WedField",
      url: "https://wedfield.com/products/wedding/1/bridal-lehenga",
    },
    gowns: {
      description:
        "WedField’s collection of stunning wedding gowns, featuring elegant designs for every bride. Find the perfect bridal gown that style for you for your special day.",
      title: "Wedding Gowns | Designer Bridal Gowns by WedField",
      url: "https://wedfield.com/products/wedding/1/gowns",
    },
    sharara: {
      description:
        "WedField's exclusive collection of bridal shararas. From traditional to contemporary styles, find the perfect wedding sharara that combines elegance and grace for your big day.",
      title:
        "Beautiful Bridal Shararas | Designer Wedding Shararas by WedField",
      url: "https://wedfield.com/products/wedding/1/sharara",
    },
    anarkali: {
      description:
        "WedField's exclusive collection of bridal Anarkalis, perfect for weddings and special occasions. Find designer Anarkalis that blend traditional charm with modern Look.",
      title: "Bridal Anarkalis | Designer Wedding Anarkalis by WedField",
      url: "https://wedfield.com/products/wedding/1/anarkali",
    },
    indoWestern: {
      description:
        "WedField's unique collection of Indo-Western outfits for weddings. Find designer fusion wear that combines traditional elegance with modern style, perfect for the contemporary bride and groom",
      title:
        "Indo-Western Outfits for Weddings | Designer Fusion Wear by WedField",
      url: "https://wedfield.com/products/wedding/1/indo-western",
    },
    kurta: {
      description:
        "Explore WedField’s exclusive collection of wedding kurtas for men. From classic to contemporary designs, find the perfect kurta that combines comfort and style for your special day.",
      title: "Wedding Kurtas for Men | Designer Kurta Collection by WedField",
      url: "https://wedfield.com/products/wedding/1/kurta",
    },
    sherwani: {
      description:
        "WedField's collection of stunning wedding sherwanis for men. From traditional to modern styles, find the perfect designer sherwani that ensures you look regal on your special day.",
      title: "Wedding Sherwanis for Men | Designer Sherwanis by WedField",
      url: "https://wedfield.com/products/wedding/1/sherwani",
    },
    engagement: {
      description:
        "Explore WedField’s exquisite collection of engagement Dress. Find the perfect piece for your special moment, from classic to contemporary designs, ensuring your engagement is unforgettable.",
      title: "Engagement Dress| Bridal Engagement Collection by WedField",
      url: "https://wedfield.com/products/wedding/1/engagement",
    },
    haldi: {
      description:
        "WedField’s exclusive collection of Haldi ceremony. Find unique Outfits to celebrate your Haldi in style and tradition.",
      title: "Haldi Ceremony | Bridal Haldi Dress by WedField",
      url: "https://wedfield.com/products/wedding/1/haldi",
    },
    mehendi: {
      description:
        "WedField's collection of beautiful Mehendi dresses for brides. Find vibrant and stylish outfits that capture the spirit of your Mehendi ceremony, perfect for celebrating in color and tradition.",
      title: "Mehendi Dresses for Brides | Bridal Mehendi Outfits by WedField",
      url: "https://wedfield.com/products/wedding/1/mehendi",
    },
    cocktail: {
      description:
        "WedField’s exclusive collection of cocktail dresses for weddings. Find chic and stylish dresses perfect for your pre-wedding celebrations, designed to make you shine on your special day.",
      title:
        "Cocktail Dresses for Weddings | Bridal Cocktail Dresses by WedField",
      url: "https://wedfield.com/products/wedding/1/cocktail",
    },
    wedding: {
      description:
        "WedField’s collection of wedding dresses. From timeless classics to modern designs, find the perfect bridal gown that reflects your unique style and makes your wedding day unforgettable.",
      title: "Wedding Collection | Bridal Dresses by WedField",
      url: "https://wedfield.com/products/wedding/1/wedding",
    },
    reception: {
      description:
        "WedField’s collection of beautiful reception dresses for brides. Find the perfect gown for your reception, combining elegance and style to make a lasting impression on your special day.",
      title:
        "Reception Dresses for Brides | Designer Bridal Reception Gowns by WedField",
      url: "https://wedfield.com/products/wedding/1/reception",
    },
    sangeet: {
      description:
        "WedField’s exclusive collection of Sangeet dresses for brides. Find vibrant, stylish outfits perfect for dancing and celebrating at your Sangeet ceremony, designed to make you shine on your special day.",
      title: "Sangeet Dresses for Brides | Bridal Sangeet Outfits by WedField",
      url: "https://wedfield.com/products/wedding/1/sangeet",
    },
  };
  const [color, setColor] = useState("");
  const globleuser = useSelector(selectUser);
  const router = useRouter();
  const meta = router?.query?.slug
    ? metaTags[router?.query?.slug[1]]
    : metaTags["sangeet"];
  const [firstPrice, setFirstPrice] = useState("");
  const [data, setData] = useState([]);
  const [page, setPage] = useState(
    router.query.slug ? router.query.slug[0] : 1
  );
  const [pageCount, setPageCount] = useState("");
  const [price, setPrice] = useState("");
  const searchText = router.query.search;
  const [size, setSize] = useState("");
  const { innerWidth: windowWidth } = useWindowSize();
  const type = router.query.category;
  const [subCatagory, setSubCategory] = useState(null);
  const [occasion, setOccasion] = useState(null);
  useMemo(() => {
    if (router.query.slug) {
      if (links[router.query.slug[1]]?.type === "occ") {
        setOccasion(links[router.query.slug[1]]?.cat);
      } else {
        setSubCategory(links[router.query.slug[1]]?.cat);
      }
    }
  }, [router.query.slug]);
  const [totalres, settotalres] = useState();
  const [totalpagesize, settotalpagesize] = useState();
  const [openloading, setOpenloading] = useState(false);
  const [cond, setCond] = useState(skipToken);
  const {
    data: allProducts,
    refetch,
    isFetching,
    isLoading,
  } = useGetAllProductQuery(
    !searchText
      ? {
          page,
          productPrice: parseInt(price),
          color,
          occation: occasion,
          size,
          subCategory: subCatagory,
          isUser: globleuser?.data?._id,
        }
      : skipToken
  );
  const { data: textSearch } = useFulltextSearchproductQuery(
    searchText
      ? {
          searchText,
          page,
          price: parseInt(price),
          color: color ? color : "",
          occation: occasion,
          size: size,
          subCatagory: subCatagory ? subCatagory : "",
          isUser: globleuser?.data?._id,
        }
      : skipToken
  );
  console.log(
    "🚀 ~ file: [[...slug]].jsx:249 ~ ProductList ~ allProducts:",
    allProducts
  );
  useEffect(() => {
    (async () => {
      setOpenloading(true);
      try {
        let res;
        if (!searchText) res = { data: allProducts };
        else res = { data: textSearch };
        if (!isLoading) {
          setData(res.data.data);
          settotalres(res?.data?.total);
          setPageCount(res?.data?.totalPage);
          settotalpagesize(res?.data?.pageSize);
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }
      } catch (error) {
        console.error("Error", error);
      } finally {
        setOpenloading(false);
      }
    })();
  }, [
    type,
    page,
    subCatagory,
    price,
    color,
    occasion,
    size,
    allProducts,
    textSearch,
  ]);
  const handlePageChange = (newPage) => {
    if (router.query.slug[1]) {
      router.push({
        pathname: `/products/wedding/${newPage}/${router.query.slug[1]}`,
        query: { ...(searchText ? { search: searchText } : {}) },
      });
    } else {
      router.push({
        pathname: `/products/wedding/${newPage}`,
        query: { ...(searchText ? { search: searchText } : {}) },
      });
    }
  };
  const [filterOPen, setFilterOpen] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [anchorEl1, setAnchorEl1] = useState(null);
  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };
  const handleClose1 = () => {
    setAnchorEl1(null);
  };
  const open1 = Boolean(anchorEl1);
  const id = open1 ? "simple-popover" : undefined;
  return (
    <>
      <MetaTags meta={meta} />
      <Box sx={{ mt: 0, display: "flex", justifyContent: "center" }}>
        <Modal
          open={openloading}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "100px",
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: "10px",
              height: "100px",
              overflow: "scroll",
              zIndex: "-1",
              display: "flex",
              justifyContent: "center",
              alignIte̥ms: "center",
            }}
          >
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
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
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
                Shop Now
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
                    console.log(
                      "🚀 ~ file: [[...slug]].jsx:629 ~ ProductList ~ e.target.value:",
                      e.target.value
                    );
                    if (e.target.value !== "All Category") {
                      router.push({
                        pathname: `/products/wedding/1/${e.target.value
                          .toLowerCase()
                          .replace(/\s+/g, "-")
                          .replace(/&/g, "and")}`,
                        query: {
                          ...(searchText ? { search: searchText } : {}),
                        },
                      });
                    } else {
                      router.push({
                        pathname: `/products/wedding/1`,
                        query: {
                          ...(searchText ? { search: searchText } : {}),
                        },
                      });
                      setSubCategory(null);
                    }
                  }}
                >
                  {allSub?.map((v, i) => {
                    return (
                      <option
                        value={v}
                        style={{
                          width: "fit-content",
                        }}
                        selected={v === subCatagory}
                      >
                        {v}
                      </option>
                    );
                  })}
                </select>
                <select
                  style={{ width: "100px" }}
                  onChange={(e) => {
                    setPage(1);
                    setSize(e.target.value);
                  }}
                >
                  <option selected disabled>
                    Sizes
                  </option>
                  {sizes?.map((v, i) => {
                    return <option value={v.value}>{v.name}</option>;
                  })}
                </select>
                <select
                  style={{ width: "100px" }}
                  onChange={(e) => {
                    setPage(1);
                    setColor(e.target.value);
                  }}
                >
                  <option selected disabled>
                    Colors
                  </option>
                  {colors?.map((v, i) => {
                    return (
                      <>
                        {v !== "all" ? (
                          <option
                            value={v}
                            style={{
                              filter: "brightness(10%)",
                              color: v,
                              height: "23px",
                              width: "23px",
                              borderRadius: "50%",
                            }}
                            onClick={(e) => {
                              setColor(v);
                              setPage(1);
                            }}
                          >
                            {v}
                          </option>
                        ) : (
                          <option
                            value={""}
                            onClick={() => {
                              setPage(1);
                              setColor("");
                            }}
                          >
                            All Colors
                          </option>
                        )}
                      </>
                    );
                  })}
                </select>
                <select
                  style={{ width: "130px" }}
                  onChange={(e) => {
                    if (e.target.value === "All") {
                      setPage(1);
                      setOccasion("");
                    } else {
                      setPage(1);
                      setOccasion(e.target.value);
                    }
                  }}
                >
                  {byOccasion?.map((v, i) => {
                    return (
                      <option value={v.venue} selected={occasion === "All"}>
                        {v.venue === "All" ? "All Occasions" : v.venue}
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
                      setFirstPrice(e.target.value);
                      if (!e.target.value) {
                        setPrice("");
                      }
                    }}
                    placeholder="Filter price"
                  />
                  <button
                    onClick={() => {
                      setPrice(firstPrice);
                      setPage(1);
                    }}
                  >
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
                  <div className="col-lg-9 col-xl-5 offset-xl-4 d-flex flex-row"></div>
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
                  }}
                >
                  {data?.length ? (
                    data.map((item, i) => (
                      <div>
                        <ShopNowCards
                          data={item}
                          defaultWishlist={null}
                          key={item._id}
                          page={page}
                        ></ShopNowCards>
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
                    <span onClick={() => handlePageChange(parseInt(pageCount))}>
                      {pageCount}
                    </span>
                    {parseInt(page) === parseInt(pageCount) ? (
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
export default ProductList;

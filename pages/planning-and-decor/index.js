import ProductH from "../../Components/Shop/products/ProductH";
import { useEffect, useState } from "react";
import Styles from "../../styles/Vendors.module.scss";
import { Box, Modal, Pagination, Popover } from "@mui/material";
import { useRouter } from "next/router";
// import ShopNowCard from "../../Components/newCard/ShopNowCard/ShopNowCard";
import { useDispatch, useSelector } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import { Spinner } from "react-bootstrap";
import FilterListIcon from "@mui/icons-material/FilterList";
import { MetaTags } from "Components/common/DetailPageCommonComp";

import {
  loginRoute,
  selectLocation,
  selectUser,
} from "../../redux/reducer/appEssentials";
import useWindowSize from "@rooks/use-window-size";
import {
  useFulltextSearchproductQuery,
  useGetAllDecoreQuery,
  useGetAllProductQuery,
} from "redux/Api/common.api";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import DecoreCard from "Components/Cards/DecoreCard";
import Banner from "Components/Landing Page/Banners";
import Downloads from "Components/Landing Page/Downloads";
import { Icon } from "@iconify/react";
import Head from "next/head";
import { S3PROXY } from "../../config";
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
const byOccasion = [
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
  {
    venue: "All",
    id: "",
  },
];
const categories = ["Bridal Wear", "Groom Wear", "all"];
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
  // "Bridal Collection Lehenga",
  // "Gowns",
  "Lehenga",
  "Bridal Lehenga",
  "Gowns",
  "Sharara",
  "Anarkali",
  "Indo Western",
  "Kurta",
  // "Saree",
  // "Skirt Top",
  // "Stitched Suit",
  // "Blazer for Men",
  // "Formal",
  // "Indo Western",
  // "Kids Kurt",
  // "Kids Kurta Jacket",
  // "Kurta Dhoti Collection",
  // "Kurta Jacket Se",
  // "Kurta Pajama",
  // "Lower",
  // "Men Blazers Suit",
  // "Only Jacket",
  // "Only Kurta",
  "Sherwani",
  "Indo Western",
  // "Stitched Suit",
  // "Twamev Kurta Set",
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
const groomSub = [
  // "Blazer for Men",
  // "Formal",
  // "Indo Western",
  // "Kids Kurt",
  // "Kids Kurta Jacket",
  // "Kurta Dhoti Collection",
  // "Kurta Jacket Se",
  // "Kurta Pajama",
  // "Lower",
  // "Men Blazers Suit",
  // "Only Jacket",
  // "Only Kurta",
  "Sherwani",
  "Indo Western",
  // "Stitched Suit",
  // "Twamev Kurta Set",
];

function ProductList({}) {
  const metaTags = {
    planningAndDecor: {
      description:
        "Transform your wedding with WedField's expert planning and decor services. From stunning venue setups to personalized decor, we create beautiful, memorable weddings tailored to your vision and style.",
      title:
        "Wedding Planning & Decor Services | Expert Wedding Decor by WedField",
      url: "https://wedfield.com/planning-and-decor",
    },
  };
  const meta = metaTags["planningAndDecor"];
  const [color, setColor] = useState("");
  const [occasion, setOccasion] = useState(null);
  const globleuser = useSelector(selectUser);

  const router = useRouter();
  const [viewType, setViewType] = useState({ grid: true });
  const [user, setUser] = useState(null);

  function changeViewType() {
    setViewType({
      grid: !viewType.grid,
    });
  }
  const [firstPrice, setFirstPrice] = useState("");

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState(data);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState("");
  const [allData, setAllData] = useState([]);
  const [price, setPrice] = useState("");
  const searchText = router.query.search;
  // const [searchText, setsearchText] = useState("");
  const [size, setSize] = useState("");
  const [cat1, setCat1] = useState();
  const [subCat, setSubCat] = useState();
  const [catagory, setCategory] = useState();
  const [subCatagory, setSubCategory] = useState(undefined);
  const {
    innerWidth: windowWidth,
    innerHeight,
    outerHeight,
    outerWidth,
  } = useWindowSize();
  const type = router.query.category;
  const occ = router.query.occ;
  // const [location, setlocation] = useState();
  const location = useSelector(selectLocation);
  // useEffect(() => {
  //   window.addEventListener("location", () => {
  //     setlocation(
  //       localStorage.getItem("location")
  //         ? localStorage.getItem("location")
  //         : null
  //     );
  //   });
  // }, []);
  const dispatch = useDispatch();
  dispatch(loginRoute(""));
  const handleChange = (event, value) => {
    setPage(value);
  };
  const [isWLUpdate, setIsWLUpdate] = useState(false);
  const [totalres, settotalres] = useState();
  const [totalpagesize, settotalpagesize] = useState();

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
  // const {
  //   data: allProducts,
  //   refetch,
  //   isFetching,
  //   isLoading,
  // } = useGetAllProductQuery(con ? con : skipToken);

  const {
    data: allProducts,
    refetch,
    isFetching,
    isLoading,
  } = useGetAllDecoreQuery({
    ...(price ? { price: price } : { price: "" }),
    city: location,
    page,
    isUser: globleuser?.data?._id,
    // popular: true,
  });
  const getData = async () => {
    setOpenloading(true);
    const condition = {
      // city: loca,
      page,
      ...(price ? { productPrice: parseInt(price) } : { productPrice: "" }),
      color: color,
      occation: occasion || occasion === "" ? occasion : occ,
      size: size,
    };

    if (catagory === "" || catagory || subCatagory === "" || subCatagory) {
      if (catagory) {
        condition.category = catagory;
      }
      if (subCatagory || type) {
        condition.subCategory = subCatagory;
      }
      // if (price) {
      //   condition.productPrice = price;
      // }
    } else {
      condition.subCategory = type;
    }
    if (globleuser?.data?._id) {
      condition.isUser = globleuser?.data?._id;
    }
    setCon(condition);
    // if (condition) {
    //   await refetch();
    // }
    try {
      const res = { data: allProducts };
      if (!isLoading) {
        let filteredData = res.data.data;

        filteredData = await Promise.all(filteredData);

        setData(filteredData);
        settotalres(res?.data?.total);
        setPageCount(res?.data?.totalPage);
        setIsWLUpdate(!isWLUpdate);
        settotalpagesize(res?.data?.pageSize);

        setAllData(res.data.data);
        setOpenloading(false);
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      } else {
      }
    } catch (error) {
      console.error("Error", error);
      setOpenloading(false);
    }
  };
  const [cond, setCond] = useState(skipToken);
  const { data: textSearch } = useFulltextSearchproductQuery(cond);
  const handleSearch = async (page) => {
    setOpenloading(true);
    let price1 = parseInt(price);
    setCond({
      searchText,
      page,
      catagory: catagory ? catagory : "",
      subCatagory: subCatagory ? subCatagory : "",
      price: price ? parseInt(price) : "",
      color: color ? color : "",
      size: size ? size : "",
    });
    const res = { data: textSearch };

    let filteredData = res?.data?.data;

    setData(filteredData);
    settotalres(res?.data?.total);
    settotalpagesize(res?.data?.pageSize);

    setPageCount(res?.data?.totalPage);
    setAllData(res?.data?.data);
    setOpenloading(false);

    setPage(1);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    if (!searchText) {
      getData();
    } else {
      handleSearch(page);
    }
  }, [
    type,
    page,
    catagory,
    subCatagory,
    price,
    color,
    occasion,
    size,
    allProducts,
    textSearch,
  ]);
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
    setPage(newPage);
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("page", newPage.toString());
    const newUrl = window.location.pathname + "?" + urlParams.toString();
    window.history.pushState("", "", newUrl);
  };
  useEffect(() => {
    let storedData = globleuser;
    setFilteredData(data);
    setUser(storedData?.data?.id);
  }, [data]);
  const [filterOPen, setFilterOpen] = useState(false);
  function FilterMenuLeft() {
    return (
      <ul className="list-group list-group-flush rounded">
        <li className="list-group-item  d-lg-block">
          <h5 className="mt-1 mb-2">Categories</h5>
          <div className="d-flex flex-wrap my-2">
            {categories?.map((v, i) => {
              return (
                <div
                  className="btn btn-sm btn-outline-dark rounded-pill me-2 mb-2"
                  onClick={() => {
                    if (v === "all") {
                      setCategory("");
                      setSubCategory(undefined);
                    } else {
                      setCategory(v);
                      setSubCategory(undefined);
                    }
                  }}
                >
                  {v}
                </div>
              );
            })}
          </div>
        </li>
        <li className="list-group-item">
          <h5 className="mt-1 mb-1">Sub Categories</h5>
          <div className="d-flex flex-wrap my-2">
            {catagory === "Groom Wear"
              ? groomSub?.map((v, i) => {
                  return (
                    <div
                      className="btn btn-sm btn-outline-dark rounded-pill me-2 mb-2"
                      style={{
                        width: "fit-content",
                      }}
                      onClick={() => {
                        setSubCategory(v);
                      }}
                    >
                      {v}
                    </div>
                  );
                })
              : catagory === "Bridal Wear"
              ? bridalSub?.map((v, i) => {
                  return (
                    <div
                      className="btn btn-sm btn-outline-dark rounded-pill me-2 mb-2"
                      style={{
                        width: "fit-content",
                      }}
                      onClick={() => {
                        setSubCategory(v);
                      }}
                    >
                      {v}
                    </div>
                  );
                })
              : allSub?.map((v, i) => {
                  return (
                    <div
                      className="btn btn-sm btn-outline-dark rounded-pill me-2 mb-2"
                      style={{
                        width: "fit-content",
                      }}
                      onClick={() => {
                        setSubCategory(v);
                      }}
                    >
                      {v}
                    </div>
                  );
                })}
          </div>
        </li>

        <li className="list-group-item">
          <h5 className="mt-1 mb-2">Price Range {`( ${price} )`}</h5>
          <input
            type="number"
            className="form-range"
            id="customRange1"
            min={0}
            max={1000000}
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
              let filteredData = allData.filter((data) => {
                return parseInt(data.productPrice) <= e.target.value;
              });
              if (searchText) {
                filteredData = filteredData.filter((data) =>
                  data.productName
                    .toLowerCase()
                    .includes(searchText.toLowerCase())
                );
              }
              if (size) {
                filteredData = filteredData.filter((data) =>
                  data.size.includes(size)
                );
              }
              setData(filteredData);
            }}
          />
        </li>
        <li className="list-group-item">
          <h5 className="mt-1 mb-2">Size</h5>
          {sizes?.map((v, i) => {
            return (
              <div
                className="btn btn-sm btn-outline-dark rounded-pill me-2 mb-2"
                onClick={(e) => {
                  setSize(v.value);
                }}
              >
                {v.name}
              </div>
            );
          })}
        </li>
      </ul>
    );
  }
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
          {/* <nav aria-label="breadcrumb" className="bg-custom-light rounded">
          <ol className="breadcrumb p-3 mb-0">
            <li className="breadcrumb-item">
              <Link
                href={"/products"}
                className="text-decoration-none link-secondary"
                to="/products"
                replace
              >
                All Products
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {type}
            </li>
          </ol>
        </nav> */}

          {/* <div className='row my-3 d-block d-lg-none'>
          <div className='col-12'>
            <div
              id='accordionFilter'
              className='accordion shadow-sm'
            >
              <div className='accordion-item'>
                <h2
                  className='accordion-header'
                  id='headingOne'
                >
                  <button
                    className='accordion-button fw-bold collapsed'
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target='#collapseFilter'
                    aria-expanded='false'
                    aria-controls='collapseFilter'
                  >
                    Filter Products
                  </button>
                </h2>
              </div>
              <div
                id='collapseFilter'
                className='accordion-collapse collapse'
                data-bs-parent='#accordionFilter'
              >
                <div className='accordion-body p-0'>
                  <ul className='list-group list-group-flush rounded'>
                    <li className='list-group-item  d-lg-block'>
                      <h5 className='mt-1 mb-2'>Categories</h5>
                      <div className='d-flex flex-wrap my-2'>
                        {categories?.map((v, i) => {
                          return (
                            <div
                              className='btn btn-sm btn-outline-dark rounded-pill me-2 mb-2'
                              onClick={() => {
                                if (v === 'all') {
                                  setCategory('');
                                  setSubCategory(undefined);
                                } else {
                                  setCategory(v);
                                  setSubCategory(undefined);
                                }
                              }}
                            >
                              {v}
                            </div>
                          );
                        })}
                      </div>
                    </li>

                    <li className='list-group-item'>
                      <h5 className='mt-1 mb-1'>Sub Categories</h5>
                      <div className='d-flex flex-wrap my-2'>
                        {catagory === 'Groom Wear'
                          ? groomSub?.map((v, i) => {
                              return (
                                <div
                                  className='btn btn-sm btn-outline-dark rounded-pill me-2 mb-2'
                                  style={{
                                    width: 'fit-content',
                                  }}
                                  onClick={() => {
                                    setSubCategory(v);
                                  }}
                                >
                                  {v}
                                </div>
                              );
                            })
                          : catagory === 'Bridal Wear'
                          ? bridalSub?.map((v, i) => {
                              return (
                                <div
                                  className='btn btn-sm btn-outline-dark rounded-pill me-2 mb-2'
                                  style={{
                                    width: 'fit-content',
                                  }}
                                  onClick={() => {
                                    setSubCategory(v);
                                  }}
                                >
                                  {v}
                                </div>
                              );
                            })
                          : allSub?.map((v, i) => {
                              return (
                                <div
                                  className='btn btn-sm btn-outline-dark rounded-pill me-2 mb-2'
                                  style={{
                                    width: 'fit-content',
                                  }}
                                  onClick={() => {
                                    setSubCategory(v);
                                  }}
                                >
                                  {v}
                                </div>
                              );
                            })}
                      </div>
                    </li>                 
                    <li className='list-group-item'>
                      <h5 className='mt-1 mb-2'>Price Range</h5>
                      <div className='input-group'>
                        <input
                          type='number'
                          className='form-control'
                          id='customRange1'
                          min={0}
                          max={1000000}
                          value={firstPrice}
                          onChange={async (e) => {
                            // e.preventDefault();
                            setFirstPrice(e.target.value);

                            if (!e.target.value) {
                              setPrice('');
                            }
                          }}
                          placeholder='Filter price'
                        />
                        <button
                          className='btn btn-outline-dark'
                          onClick={() => setPrice(firstPrice)}
                        >
                          <SearchIcon />
                        </button>
                      </div>
                    </li>
                    <li className='list-group-item'>
                      <h5 className='mt-1 mb-2'>Size</h5>
                      {sizes?.map((v, i) => {
                        return (
                          <div
                            className='btn btn-sm btn-outline-dark rounded-pill me-2 mb-2'
                            onClick={(e) => {
                              setSize(v.value);
                            }}
                          >
                            {v.name}
                          </div>
                        );
                      })}
                    </li>
                    <li className='list-group-item'>
                      <h5 className='mt-1 mb-2'>Colors</h5>
                      {colors?.map((v, i) => {
                        return (
                          <>
                            {v !== 'all' ? (
                              <div
                                className='btn btn-sm btn-outline-dark me-2 mb-2'
                                style={{
                                  backgroundColor: v,
                                  height: '23px',
                                  width: '23px',
                                  borderRadius: '50%',
                                }}
                                onClick={(e) => {
                                  setColor(v);
                                }}
                              ></div>
                            ) : (
                              <div
                                className='btn btn-sm btn-outline-dark rounded-pill me-2 mb-2'
                                onClick={() => {
                                  setColor('');
                                }}
                              >
                                {v}
                              </div>
                            )}
                          </>
                        );
                      })}
                    </li>
                    <li className='list-group-item'>
                      <h5 className='mt-1 mb-2'>Occasions</h5>
                      {byOccasion?.map((v, i) => {
                        return (
                          <div
                            className='btn btn-sm btn-outline-dark rounded-pill me-2 mb-2'
                            onClick={() => {
                              if (v.venue === 'All') {
                                setOccasion('');
                              } else {
                                setOccasion(v.venue);
                              }
                            }}
                          >
                            {v.venue}
                          </div>
                        );
                      })}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div> */}
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
            img={"product"}
            head={"Elevate Your Style! Shop Now for Exquisite Lehengas"}
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
                  padding: "10px",
                }}
                onClick={() => setFilterOpen(!filterOPen)}
              >
                Planning and Decor
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
              </span>
            </div>
          </div>
          <Popover
            style={{ marginTop: "7px" }}
            id={id}
            open={open1}
            onClose={handleClose1}
            anchorEl={anchorEl1}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <div className="border rounded shadow-sm">
              <ul className="list-group list-group-flush rounded">
                <li className="list-group-item  d-lg-block">
                  <h6
                    onClick={() => {
                      setCategory("");
                      setSubCategory("");
                      setPrice("");
                      setColor("");
                      setOccasion("");
                    }}
                    style={{ textAlign: "end", cursor: "pointer" }}
                    className="mt-1 mb-2"
                  >
                    Reset Filter
                  </h6>
                  <h5 className="mt-1 mb-2">Categories</h5>
                  <div className="d-flex flex-wrap my-2">
                    {categories?.map((v, i) => {
                      return (
                        <div
                          className="btn btn-sm btn-outline-dark rounded-pill me-2 mb-2"
                          onClick={() => {
                            if (v === "all") {
                              setCategory("");
                              setSubCategory(undefined);
                            } else {
                              setCategory(v);
                              setSubCategory(undefined);
                            }
                          }}
                        >
                          {v}
                        </div>
                      );
                    })}
                  </div>
                </li>
                <li className="list-group-item">
                  <h5 className="mt-1 mb-1">Sub Categories</h5>
                  <div className="d-flex flex-wrap my-2">
                    {catagory === "Groom Wear"
                      ? groomSub?.map((v, i) => {
                          return (
                            <div
                              className="btn btn-sm btn-outline-dark rounded-pill me-2 mb-2"
                              style={{
                                width: "fit-content",
                              }}
                              onClick={() => {
                                setSubCategory(v);
                              }}
                            >
                              {v}
                            </div>
                          );
                        })
                      : catagory === "Bridal Wear"
                      ? bridalSub?.map((v, i) => {
                          return (
                            <div
                              className="btn btn-sm btn-outline-dark rounded-pill me-2 mb-2"
                              style={{
                                width: "fit-content",
                              }}
                              onClick={() => {
                                setSubCategory(v);
                              }}
                            >
                              {v}
                            </div>
                          );
                        })
                      : allSub?.map((v, i) => {
                          return (
                            <div
                              className="btn btn-sm btn-outline-dark rounded-pill me-2 mb-2"
                              style={{
                                width: "fit-content",
                              }}
                              onClick={() => {
                                setSubCategory(v);
                              }}
                            >
                              {v}
                            </div>
                          );
                        })}
                  </div>
                </li>

                <li className="list-group-item">
                  <h5 className="mt-1 mb-2">Price Range</h5>
                  <div className="input-group">
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
                    <button
                      className="btn btn-outline-dark"
                      onClick={() => setPrice(firstPrice)}
                    >
                      <SearchIcon />
                    </button>
                  </div>
                </li>
                <li className="list-group-item">
                  <h5 className="mt-1 mb-2">Size</h5>
                  {sizes?.map((v, i) => {
                    return (
                      <div
                        className="btn btn-sm btn-outline-dark rounded-pill me-2 mb-2"
                        onClick={(e) => {
                          setSize(v.value);
                        }}
                      >
                        {v.name}
                      </div>
                    );
                  })}
                </li>
                <li className="list-group-item">
                  <h5 className="mt-1 mb-2">Color</h5>
                  {colors?.map((v, i) => {
                    return (
                      <>
                        {v !== "all" ? (
                          <div
                            className="btn btn-sm btn-outline-dark me-2 mb-2"
                            style={{
                              backgroundColor: v,
                              height: "23px",
                              width: "23px",
                              borderRadius: "50%",
                            }}
                            onClick={(e) => {
                              setColor(v);
                            }}
                          ></div>
                        ) : (
                          <div
                            className="btn btn-sm btn-outline-dark rounded-pill me-2 mb-2"
                            onClick={() => {
                              setColor("");
                            }}
                          >
                            {v}
                          </div>
                        )}
                      </>
                    );
                  })}
                </li>
                <li className="list-group-item  d-lg-block">
                  <h5 className="mt-1 mb-2">By Occasion</h5>
                  <div className="d-flex flex-wrap my-2">
                    {byOccasion?.map((v, i) => {
                      return (
                        <div
                          className="btn btn-sm btn-outline-dark rounded-pill me-2 mb-2"
                          onClick={() => {
                            if (v.venue === "All") {
                              setOccasion("");
                            } else {
                              setOccasion(v.venue);
                            }
                          }}
                        >
                          {v.venue}
                        </div>
                      );
                    })}
                  </div>
                </li>
              </ul>
            </div>
          </Popover>
          {/* <span
          style={{
            marginTop: windowWidth > 900 ? '30px' : '0px',
            fontSize: '15px',
            textAlign: 'right',
            color: 'gray',
            display: 'flex',
            gap: '10px',
            alignItems: 'end',
          }}
        >
          Showing{' '}
          <span
            style={{
              fontSize: '18px',
              textAlign: 'right',
              color: '#db3672',
              gap: '10px',
              fontWeight: '600',
            }}
          >
            {totalres}
          </span>{' '}
        </span> */}
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
                        <DecoreCard
                          data={item}
                          defaultWishlist={null}
                          key={item._id}
                          page={page}
                        ></DecoreCard>
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

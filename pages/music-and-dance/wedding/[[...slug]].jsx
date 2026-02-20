import { useEffect, useRef, useState } from "react";
import { wrapper } from "redux/store";
import mongoose from "mongoose";
import VendorUserModels from "models/VendorUserModels";
import WishlistModels from "models/WishlistModel";
import Styles from "../../../styles/Vendors.module.scss";
import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  Select,
} from "@mui/material";
import { useRouter } from "next/router";
import { MetaTags } from "Components/common/DetailPageCommonComp";
// import ShopNowCard from "../../Components/newCard/ShopNowCard/ShopNowCard";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";

import { loginRoute, selectUser } from "../../../redux/reducer/appEssentials";
import useWindowSize from "@rooks/use-window-size";
import { useLazyGetAllVendorQuery } from "redux/Api/common.api";
import MusicianCard from "Components/Cards/MusicianCard";
import Downloads from "Components/Landing Page/Downloads";
import { Icon } from "@iconify/react";
import Head from "next/head";
import { S3PROXY } from "../../../config";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const musicCat = {
  Anchor: ["Male Emcee", "Female Emcee"],
  Choreographer: [],
  DJ: ["Male dj", "Female dj", "Celebrity dj"],
  "Live band": [
    "Classical band",
    "Fusion band",
    "Indo- fusion band",
    "sufi/ Qawwali band",
    "Bollywood Rock band",
  ],
  "DJ based Band": [],
  "Male & Female Singer": [
    "Bollywood singer",
    "Punjabi singer",
    "solo singer",
    "Duo singer",
  ],
};
const categories = [
  "All",
  "Anchor",
  "Choreographer",
  "DJ",
  "Live band",
  "DJ based Band",
  "Male & Female Singer",
];
const CatObj = {
  anchor: "Anchor",
  choreographer: "Choreographer",
  dj: "DJ",
  "live-band": "Live band",
  "dj-based-band": "DJ based Band",
  "male-and-female-singer": "Male & Female Singer",
};
const metaTags = {
  anchor: {
    description:
      "Book top wedding anchors and corporate anchors with WedField's professional anchor services. From weddings to corporate events, our skilled anchors bring the perfect blend of charm and expertise to make your event unforgettable.",
    title: "Best Wedding Anchor & Corporate Anchor Services | WedField Anchors",
    url: "https://wedfield.com/music-and-dance/wedding/1/anchor",
  },
  choreographer: {
    description:
      "Bring your wedding to life with WedField's top wedding choreographers. Our experienced team specializes in creating stunning, personalized dance routines for weddings, sangeet, and other events. Book the best wedding choreographer for an unforgettable performance.",
    title: "WedField Choreographers - Best Wedding & Event Choreography",
    url: "https://wedfield.com/music-and-dance/wedding/1/choreographer",
  },
  dj: {
    description:
      "Get the best DJ services for weddings, parties, and events with WedField! Our talented DJs bring the perfect mix of music to every celebration, from weddings to sangeet nights. Book WedField DJs for a memorable event experience.",
    title: "WedField DJ Services - Best DJs for Weddings & Events",
    url: "https://wedfield.com/music-and-dance/wedding/1/dj",
  },
  liveBand: {
    description:
      "Enhance your event with WedField's top live bands, featuring Bollywood rock, classical, fusion, Indo-fusion, and Sufi/Qawwali performances. Serving Delhi, Jaipur, Udaipur, and many more, our talented bands bring unforgettable energy and style to weddings, receptions, and celebrations. Book the best live band with WedField.",
    title:
      "Best Live Bands | Bollywood, Classical, Fusion & Sufi Bands by WedField",
    url: "https://wedfield.com/music-and-dance/wedding/1/live-band",
  },
  djBasedBand: {
    description:
      "Turn up the energy at your wedding or event with WedField's top DJ services. Featuring the best DJs in Delhi, Jaipur, Udaipur, and more—including celebrity DJs—we create unforgettable musical experiences tailored to your celebration. Book WedField for the ultimate DJ experience.",
    title: "WedField DJ-Based Band - Best DJ Bands for Weddings & Events",
    url: "https://wedfield.com/music-and-dance/wedding/1/dj-based-band",
  },
  maleAndFemaleSinger: {
    description:
      "Make your wedding or event memorable with WedField’s Singers. From soulful melodies to energetic performances, our professional singers create the perfect ambiance for weddings, receptions, and special occasions. Book the best singers with WedField.",
    title: "WedField Singers – Collection of Best Wedding & Event Singers",
    url: "https://wedfield.com/music-and-dance/wedding/1/male-and-female-singer",
  },
};
function ProductList({ allvenue, category, page }) {
  const hasMounted = useRef(false);
  const globleuser = useSelector(selectUser);
  const router = useRouter();
  const meta = metaTags[router.query.slug[1]] || metaTags["anchor"];
  const [firstPrice, setFirstPrice] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);

  const [data, setData] = useState(JSON.parse(allvenue).data);
  const [pageCount, setPageCount] = useState(JSON.parse(allvenue).totalPage);
  const [totalres, settotalres] = useState(JSON.parse(allvenue).total);
  const [totalpagesize, settotalpagesize] = useState(
    JSON.parse(allvenue).pageSize
  );

  const [price, setPrice] = useState("");
  const [subSubCategory, setSubSubCategory] = useState([]);

  const {
    innerWidth: windowWidth,
    innerHeight,
    outerHeight,
    outerWidth,
  } = useWindowSize();
  const type = router.query.category;
  const occ = router.query.occ;
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
  // const {
  //   data: allProducts,
  //   refetch,
  //   isFetching,
  //   isLoading,
  // } = useGetAllOtherProductQuery(con ? con : skipToken);
  const [fetchData, { isLoading }] = useLazyGetAllVendorQuery();

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
    } else {
      (async () => {
        setOpenloading(true);
        const condition = {
          page,
          ...(price ? { price: parseInt(price) } : { price: "" }),
          category: "Music & Dance",

          subCategory: category,
          ...(globleuser?.data?._id ? { isUser: globleuser?.data?._id } : {}),
          subSubCategory: JSON.stringify(subSubCategory),
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
  }, [subSubCategory, price]);
  // Function to handle page change
  const handlePageChange = (newPage) => {
    router.push(
      `/music-and-dance/wedding/${newPage}/${
        router?.query?.slug ? `/${router?.query?.slug[1]}` : ""
      }`
    );
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
                <Select
                  style={{
                    background: "#ededed",
                    width: `${windowWidth > 900 ? "200px" : "100%"}`,
                    border: "0px",
                  }}
                  fullWidth
                  value={category ? category : "All"}
                  MenuProps={MenuProps}
                  onChange={(e) => {
                    router.push(
                      `/music-and-dance/wedding/1/${e.target.value
                        .toLowerCase()
                        .replace(/\s+/g, "-") // Replace spaces with hyphens
                        .replace(/&/g, "and")}`
                    );
                  }}
                >
                  {categories?.map((v, i) => {
                    return (
                      <MenuItem key={v} value={v}>
                        {v}
                      </MenuItem>
                    );
                  })}
                </Select>
                {musicCat[category]?.length ? (
                  <FormControl>
                    <InputLabel id="demo-multiple-chip-label">
                      Select
                    </InputLabel>
                    <Select
                      labelId="demo-multiple-name-label"
                      style={{
                        background: "#ededed",
                        width: `${windowWidth > 900 ? "200px" : "100%"}`,
                        border: "0px",
                      }}
                      fullWidth
                      multiple
                      input={<OutlinedInput label="Tag" />}
                      renderValue={(selected) => (
                        <Box
                          sx={{ display: "flex", flexWrap: "nowrap", gap: 0.5 }}
                        >
                          {selected.map((value) => (
                            <Chip key={value} label={value} />
                          ))}
                        </Box>
                      )}
                      label="hello world"
                      MenuProps={MenuProps}
                      onChange={(e) => {
                        setSubSubCategory(e.target.value);
                      }}
                      value={subSubCategory}
                    >
                      {musicCat[category]?.map((list) => (
                        <MenuItem key={list} value={list}>
                          {list}
                        </MenuItem>
                      ))}
                    </Select>{" "}
                  </FormControl>
                ) : (
                  <></>
                )}
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
                    gridTemplateColumns:
                      // windowWidth > 900
                      // ?
                      "repeat(auto-fit, minmax(350px, 1fr))",
                    // : "repeat(auto-fit, minmax(280px, 1fr))",
                  }}
                  // className={
                  //   'row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 g-3 mb-4 flex-shrink-0 row-cols-xl-4'
                  // }
                >
                  {data?.length ? (
                    data.map((item, i) => (
                      <div>
                        <MusicianCard
                          data={item}
                          defaultWishlist={null}
                          // key={item._id}
                          page={page}
                          isPlaying={isPlaying}
                          setIsPlaying={setIsPlaying}
                        ></MusicianCard>
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

export default ProductList;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params, req }) => {
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
      const category = slug && slug[1] ? CatObj[slug[1]] : "";
      let condition = { category: "Music & Dance", subCategory: category };
      const sort = {};

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
          category,
          page: parseInt(slug[0]),
        },
      };
    }
);

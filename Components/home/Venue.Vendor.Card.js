/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";

import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import AllVendorsCard from "../newCard/AllVendorsCard/AllVendorsCard";
import VenuesCard from "../newCard/VenuesCard/VenuesCard";
import ShopNowCard from "../newCard/ShopNowCard/ShopNowCard";
import { useSelector } from "react-redux";
import { selectLocation, selectUser } from "../../redux/reducer/appEssentials";
import {
  useGetAllProductQuery,
  useGetAllVendorQuery,
  useGetAllVenueQuery,
  useGetAllOtherProductQuery,
} from "redux/Api/common.api";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import AllVendorCards from "Components/Cards/AllVendorCards";
import VenueCard from "Components/Cards/VenueCard";
import Carousal from "Components/Landing Page/Carousel/Index";
import MusicianCard from "Components/Cards/MusicianCard";
import OtherProductCards from "Components/Cards/OtherProductCard";

const VenueVendorCards = ({ popularList, setIsAvailable, setLoadingState }) => {
  const globleuser = useSelector(selectUser);
  const [data, setData] = useState([]);
  const [isCalled, setIsCalled] = useState(false);
  const [limit, setLimit] = useState();
  const [page, setPage] = useState(0);
  const location = useSelector(selectLocation);
  const { data: productData, refetch: productRefetch } = useGetAllProductQuery(
    popularList?.type == "product"
      ? {
          category: popularList?.category ? popularList?.category : null,
          popular: true,
          page: page + 1,
          isUser: globleuser ? globleuser?.data?._id : null,
        }
      : skipToken
  );
  const { data: vendorData, refetch: vendorRefetch } = useGetAllVendorQuery(
    popularList?.type == "Vendor"
      ? {
          city: location,
          category: popularList?.category ? popularList?.category : null,
          subCategory: popularList?.subCategory
            ? popularList?.subCategory
            : null,
          popular: true,
          page: page + 1,
          isUser: globleuser ? globleuser?.data?._id : null,
        }
      : skipToken
  );
  const { data: otherProductData } = useGetAllOtherProductQuery(
    popularList?.type == "Other-Products"
      ? {
          category: popularList?.category ? popularList?.category : null,
          popular: true,
          page: page + 1,
          isUser: globleuser ? globleuser?.data?._id : null,
        }
      : skipToken
  );
  const { data: venueData, refetch: venueRefetch } = useGetAllVenueQuery(
    popularList?.type == "Venue"
      ? {
          city: location,
          category: popularList?.category ? popularList?.category : null,
          popular: true,
          page: page + 1,
          isUser: globleuser ? globleuser?.data?._id : null,
        }
      : skipToken
  );
  useEffect(() => {
    if (
      popularList?.type == "Vendor" &&
      popularList.category !== "Music & Dance"
    ) {
      vendorRefetch();
      setPage(0);
      setData([]);
    }
    if (popularList?.type == "Venue") {
      setData([]);
      setPage(0);
      venueRefetch();
    }
  }, [location]);

  useEffect(() => {
    if (venueData || vendorData || productData || otherProductData) {
      let subData = venueData || vendorData || productData || otherProductData;
      setData(data?.concat(subData.data));
      setLimit(subData.total);
      setIsCalled(true);
    }
  }, [globleuser, venueData, vendorData, productData, otherProductData]);

  useEffect(() => {
    // if (popularList?.type == "product" && page > 0) productRefetch();

    if (popularList?.type == "Vendor" && page > 0) vendorRefetch();

    if (popularList?.type == "Venue" && page > 0) venueRefetch();
  }, [page, location]);

  useEffect(() => {
    if (isCalled) {
      setLoadingState((oldData) => {
        return { ...oldData, [popularList.header]: true };
      });
      !data?.length && setIsAvailable(false);
    }
  }, [isCalled]);
  return (
    // <ScrollMenu
    //   LeftArrow={LeftArrow}
    //   RightArrow={
    //     <RightArrow
    //       setPage={setPage}
    //       limit={limit}
    //       pushData={() => {
    //         setPage(page + 1);
    //       }}
    //       page={page}
    //     />
    //   }>
    <Carousal
      slides={data}
      pushData={() => {
        setPage(page + 1);
      }}
    >
      <>
        {data?.map((ph, key) => {
          if (popularList?.type == "product") {
            return (
              <div
                className="cards1234"
                key={key}
                style={{ margin: "20px", width: "340px", height: "92%" }}
              >
                <ShopNowCard data={ph} />
              </div>
            );
          } else if (popularList?.type == "Venue") {
            return (
              <div
                className="cards1234"
                key={key}
                style={{ margin: "20px", width: "340px", height: "92%" }}
              >
                <VenueCard data={ph} />
              </div>
            );
          } else if (
            popularList?.type == "Vendor" &&
            popularList?.category == "Music & Dance"
          ) {
            return (
              <div key={key} style={{ width: "360px", height: "92%" }}>
                <MusicianCard data={ph} />
              </div>
            );
          } else if (popularList?.type == "Vendor") {
            return (
              <div
                className="cards1234"
                key={key}
                style={{ margin: "20px", width: "340px", height: "92%" }}
              >
                <AllVendorCards data={ph} />
              </div>
            );
          } else if (popularList?.type == "Other-Products") {
            return (
              <div
                className="cards1234"
                key={key}
                style={{ margin: "20px", width: "340px", height: "92%" }}
              >
                <OtherProductCards data={ph} link={"invitation-gift"} />
              </div>
            );
          }
        })}
      </>
    </Carousal>
  );
};

function LeftArrow() {
  const { isFirstItemVisible, scrollPrev } =
    React.useContext(VisibilityContext);

  return (
    <Button
      disabled={isFirstItemVisible}
      onClick={() => scrollPrev()}
      sx={{ display: { md: "flex", xs: "none" } }}
    >
      {/* <ArrowBackIosIcon /> */}
      <img src="wedfield.s3.ap-south-1.amazonaws.com/public./left-arrow.png"></img>
    </Button>
  );
}

function RightArrow({ pushData, limit }) {
  const { isLastItemVisible, scrollNext, items, visibleElements } =
    React.useContext(VisibilityContext);
  const [disabled, setDisabled] = React.useState(
    !visibleElements.length && isLastItemVisible
  );
  useEffect(() => {
    if (items.toItemsWithoutSeparators().length >= limit) {
      setDisabled(isLastItemVisible);
    }
    if (isLastItemVisible) {
      pushData();
    }
  }, [items, limit, isLastItemVisible]);
  return (
    <Button
      disabled={disabled}
      onClick={() => scrollNext()}
      sx={{ display: { md: "flex", xs: "none" } }}
    >
      {/* <ArrowForwardIosIcon /> */}
      <img src="wedfield.s3.ap-south-1.amazonaws.com/public./right-arrow.png"></img>
    </Button>
  );
}

export default VenueVendorCards;

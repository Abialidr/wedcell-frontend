import { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import { PROXY, S3PROXY } from "../../../config";
import { useDispatch, useSelector } from "react-redux";
import { loginRoute, selectUser } from "../../../redux/reducer/appEssentials";
import { useGetAllVendorQuery } from "redux/Api/common.api";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import VendorDetails1 from "Components/DetailPages/vendor/VendorDetails";
// import VendorDetails1 from 'Components/newDetailsPage/vendor/VendorDetails';
const VendorDetails = () => {
  const globleuser = useSelector(selectUser);

  const dispatch = useDispatch();
  dispatch(loginRoute(""));
  // const [vendor, setVendor] = useState();

  const router = useRouter();

  const { id } = router.query;
  const { data: vendorDetail } = useGetAllVendorQuery(
    id
      ? {
          isUser: globleuser ? globleuser?.data?._id : undefined,
          _id: id,
        }
      : skipToken
  );
  const vendor = vendorDetail?.data?.length ? vendorDetail?.data[0] : {};

  return (
    <>
      <VendorDetails1 data={vendor}></VendorDetails1>
    </>
  );
};

export default VendorDetails;

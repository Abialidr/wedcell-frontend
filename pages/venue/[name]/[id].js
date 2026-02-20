import React from "react";
import VenueDetails1 from "Components/DetailPages/venue/VenueDetail1";
import { wrapper } from "../../../redux/store";
import VenueUserModels from "../../../models/VenueUserModels";
import WishlistModels from "../../../models/WishlistModel";
import mongoose from "mongoose";

const VenueDetails = (props) => {
  const data = JSON.parse(props.stringedData);
  return (
    <>
      <VenueDetails1 {...props} data={data} />
    </>
  );
};

export default VenueDetails;

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
      console.log("🚀 ~ file: [id].js:30 ~ globleuser:", globleuser);
      mongoose.connect(
        process.env.PROXY,
        { useNewUrlParser: true, useUnifiedTopology: true },
        () => {
          console.log("Connected to MongoDB");
        }
      );
      const { id } = params;

      let result_single = await VenueUserModels.findById(id);
      result_single = JSON.parse(JSON.stringify(result_single));
      let wishlist_condition = {
        is_delete: false,
        userId: globleuser,
        "product.productId": result_single._id,
      };
      const wishlist = await WishlistModels.find(wishlist_condition);
      if (wishlist.length) {
        result_single.wishlist = true;
        result_single.wishlistID = wishlist[0]._id;
      } else {
        result_single.wishlist = false;
      }
      const condition_many = {
        city: result_single.city,
        category: result_single?.category,
        subCategory: result_single?.subCategory,
      };
      const page = 0;
      const skip = 40;
      let result_many = await VenueUserModels.find(condition_many)
        .sort({ priority: 1 })
        .skip(page * skip)
        .limit(skip);
      const total = await VenueUserModels.countDocuments(condition_many);
      let res1;

      if (globleuser) {
        res1 = result_many.map(async (value) => {
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
      result_many = globleuser ? await Promise.all(res1) : result_many;

      const products = {
        success: true,
        message: "Items Gets Successfully",
        total,
        totalPage: Math.ceil(total / skip),
        page: 1,
        pageSize: result_many.length,
        data: result_many,
      };
      mongoose.connection.close();
      return {
        props: {
          SimilarProd: JSON.stringify(products),
          location: result_single.city,
          category: result_single?.category,
          page: 1,
          stringedData: JSON.stringify(result_single),
        },
      };
    }
);

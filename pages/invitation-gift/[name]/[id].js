import OtherProductsDetail from "Components/DetailPages/OtherProductsDetail/OtherProductsDetail";
import { useRouter } from "next/router";
// import ProductDetail1 from '../../Components/newDetailsPage/shopnow/ProductDetail1';
import { Spinner } from "react-bootstrap";
import OtherProductModels from "../../../models/otherProductModel";
import { wrapper } from "redux/store";
import WishlistModels from "models/WishlistModel";
import mongoose from "mongoose";

function Details({ stringedData, ...props }) {
  const data = JSON.parse(stringedData);
  return data ? (
    <OtherProductsDetail
      alldata={data}
      {...props}
      link={"invitation-card"}
    ></OtherProductsDetail>
  ) : (
    <div
      style={{
        height: "90vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Spinner></Spinner>
    </div>
  );
}

export default Details;
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
      const { id } = params;

      let result_single = await OtherProductModels.findById(id);
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
        category: result_single?.category,
      };
      const page = 0;
      const skip = 40;
      let result_many = await OtherProductModels.find(condition_many)
        .sort({ priority: 1 })
        .skip(page * skip)
        .limit(skip);
      const total = await OtherProductModels.countDocuments(condition_many);
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
          stringedData: JSON.stringify(result_single),
        },
      };
    }
);

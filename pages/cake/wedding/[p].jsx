import OtherProductDashboard from "Components/Dashboard/OtherProductDashboard";
import OtherProductModels from "../../../models/otherProductModel";
import { wrapper } from "redux/store";
import WishlistModels from "models/WishlistModel";
import mongoose from "mongoose";

const categories = [
  { name: "All", value: "" },
  { name: "Cake", value: "Cake" },
  { name: "Invitation Card", value: "Invites" },
  { name: "Invitation Gift", value: "Gifts" },
];

function ProductList(props) {
  return <OtherProductDashboard {...props}></OtherProductDashboard>;
}

export default ProductList;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params, req, res }) => {
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

      const { p } = params;
      const condition = {
        category: "Cake",
      };
      const page = parseInt(p);
      const skip = 40;
      const result = await OtherProductModels.find(condition)
        .sort({ priority: 1 })
        .skip((page - 1) * skip)
        .limit(skip);
      const total = await OtherProductModels.countDocuments(condition);
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
        page,
        pageSize: result.length,
        data: res1 ? res1 : result,
      };
      const props = {
        product: JSON.stringify(product),
        category: "Invites",
        page,
      };
      mongoose.connection.close();
      res.setHeader(
        "Cache-Control",
        "public, s-maxage=60, stale-while-revalidate=59"
      );
      return {
        props,
      };
    }
);

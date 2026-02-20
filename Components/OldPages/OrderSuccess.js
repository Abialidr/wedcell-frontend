import React, { useEffect } from "react";
import styles from "./../styles/order.module.css";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/reducer/appEssentials";
import { useState } from "react";
import { useOrderSingleMutation } from "redux/Api/orders.api";
import { useGetAllProductQuery } from "redux/Api/common.api";
import { useGetAllCartsQuery } from "redux/Api/chw.api";
const moment = require("moment");

// Get the current date
const OrderSuccess = (address) => {
  const today = moment();
  const globleuser = useSelector(selectUser);
  const router = useRouter();
  const { da } = router.query;
  const { cart } = router.query;
  const { item } = router.query;
  const { order } = router.query;
  const { size } = router.query;
  const [allData, setAllData] = useState();
  const [orderData, setOrderData] = useState();
  const [itemData, setItemdata] = useState();
  const { data: prodData } = useGetAllProductQuery({});
  useEffect(() => {
    const getProduct = async () => {
      const res = prodData;
      if (item) {
        setAllData(res?.data);
      }
    };
    getProduct();
  }, [prodData]);
  const [orderSingle] = useOrderSingleMutation();
  useEffect(() => {
    const getOrder = async () => {
      const res = await orderSingle({
        id: order,
      });
      // if (item) {
      setOrderData(res?.data?.data[0]);
      // }
    };
    order && getOrder();
  }, [order]);
  useEffect(() => {
    if (item && allData) {
      const itemData = allData?.find((itemtemp) => itemtemp?._id === item);
      setItemdata(itemData);
    }
  }, [allData]);
  const { data: cartData } = useGetAllCartsQuery();
  useEffect(() => {
    const getCartProduct = async () => {
      const res = { data: cartData };
      if (!item) {
        setAllData(res?.data?.data);
      }
    };
    getCartProduct();
  }, [cartData]);
  return (
    <div
      style={{
        // height: "700px",
        paddingTop: "120px",
        paddingBottom: "50px",
        paddingLeft: "20px",
        paddingRight: "20px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        // alignItems: "center",
        justifyContent: "center",
        fontSize: "18px",
      }}
    >
      <div className={styles.orderSuccessBox}>
        <div className={styles.ordersuccessspan}>
          <img
            src="wedfield.s3.ap-south-1.amazonaws.com/publicwedcell.s3.ap-south-1.amazonaws.com/publicimg/webp/yes.webp"
            alt=""
          />
          <h2>Order Successful</h2>
        </div>
        <span>Confirmation will be sent to Message Center</span>
        <div className={styles.OrdersuccessShippingadd}>
          <span>
            <span style={{ fontWeight: "500" }}>
              Shipping To : {orderData?.shippingAddress?.name},
            </span>
            <span>
              {orderData?.shippingAddress?.address1},
              {orderData?.shippingAddress?.address2},
              {orderData?.shippingAddress?.landmark},
              {orderData?.shippingAddress?.city},
              {orderData?.shippingAddress?.state} -
              {orderData?.shippingAddress?.pincode}
            </span>
          </span>
          <span>
            <span style={{ fontWeight: "500" }}>Phone Number -</span>
            <span>{orderData?.shippingAddress?.number}</span>
          </span>
        </div>
        {item ? (
          <div className={styles.orderSuccessProd}>
            <span>Estimated Delivery Date : </span>
            <span>{today.clone().add(5, "days").format("DD MMM, YYYY")}</span>
            <div style={{ marginTop: "20px" }}>
              <img
                style={{ marginRight: "20px", border: "1px solid gray" }}
                src={`${S3PROXY}${itemData?.mainImages}`}
                alt="hello"
              />
              <span>Name : {itemData?.name}</span>
            </div>
          </div>
        ) : (
          allData?.map((data, key) => {
            return (
              <div className={styles.orderSuccessProd}>
                <span>Delivery Date : </span>
                <span>
                  {today.clone().add(5, "days").format("DD MMM, YYYY")}
                </span>
                <div style={{ marginTop: "20px" }}>
                  <img
                    style={{ marginRight: "20px", border: "1px solid gray" }}
                    src={`${S3PROXY}${data?.bannerImage}`}
                    alt="hello"
                  />
                  <span>Name : {data?.name}</span>
                </div>
              </div>
            );
          })
        )}
        <span
          onClick={() => router.push("/user-dashboard/orders")}
          style={{
            marginTop: "30px",
            // padding: "20px",
            fontSize: "19px",
            fontWeight: "600",
            color: "#70d27f",
          }}
        >
          Go To Order
        </span>
      </div>
    </div>
  );
};

export default OrderSuccess;

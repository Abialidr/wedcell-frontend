import React from "react";
import Styles from "../../styles/Dashboard/Dashboard.module.scss";
import { useState } from "react";

import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import useWindowSize from "@rooks/use-window-size";
import { selectUser } from "../../redux/reducer/appEssentials";
import moment from "moment";
import { useCancelOrderMutation } from "redux/Api/orders.api";
import Image from "next/image";
import { S3PROXY } from "../../config";
const CancelOrder = ({ order, setCancelOrder, setTrackPackage }) => {
  // const [orderStatus, setOrderStatus] = useState("ReturnOrder");
  const [openCancleorder, setopencancelOrder] = useState(false);
  // useEffect(() => {
  //   !globleuser.success && router.push("/");
  // }, []);
  const {
    innerWidth: windowWidth,
    innerHeight,
    outerHeight,
    outerWidth,
  } = useWindowSize();
  const [headerHeight, setHeaderHeight] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(false);
  const [orders, setOrders] = useState([]);
  const [refundOrder, setrefundOrder] = useState(false);
  const [returnOrder, setReturnOrder] = useState(false);
  const [cancelOrder] = useCancelOrderMutation();
  const cancel_order = async (id, mode, paymentId, amount) => {
    const res = await cancelOrder({
      id: id,
      mode: mode,
      paymentId: paymentId,
      amount: amount,
    });
    setopencancelOrder(true);
    // setCancelOrder(true)
  };
  // useEffect(() => {
  //   getOrders();
  // }, [globleuser]);

  function step2Validator() {
    // return a boolean
  }

  function step3Validator() {
    // return a boolean
  }
  const oc = "26 jan, 2023";
  const sc = "28 jan, 2023";
  const od = "28 jan, 2023";
  const de = "29 jan, 2023";
  const steps = [
    ["Order Confirmed", <br />, oc],
    ["Shipped", , <br />, sc],
    ["Out For Delivery", , <br />, od],
    ["Delivered", , <br />, de],
  ];
  const steps1 = [
    ["Order Cancelled", <br />, oc],
    ["Refund Initialized", , <br />, sc],
    ["Refund Completed", , <br />, od],
  ];
  const steps3 = [
    ["Return Initiated", <br />, oc],
    ["Recieved by Vendor", , <br />, sc],
    ["Shipped by Vendor", , <br />, sc],
    ["Out For Delivery", , <br />, od],
    ["Delivered", , <br />, de],
  ];
  return (
    <>
      {windowWidth >= 560 ? (
        <>
          <div
            style={{
              paddingBottom: "10px",
              fontFamily: "Ledger",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <h2>Cancel Order</h2>
            <div className={Styles.myOrderSpan}>
              <button
                style={{ color: "white" }}
                className={Styles.TrackOrder}
                onClick={() => {
                  setTrackPackage(false), setCancelOrder(false);
                }}
              >
                Go back
              </button>
            </div>
          </div>
          <div className={Styles.orderbtndates}>
            <span className={Styles.orddrDetSpan}>Order Detail</span>
            <div className={Styles.Dates}>
              <span className={Styles.OrderDate}>
                Order on{" "}
                <span className={Styles.ActualDate}>
                  {moment(order?.createdAt).format("MMM DD YYYY")}
                </span>
              </span>
              <span>Order ID : {order._id}</span>
            </div>
          </div>
          <div className={Styles.knowingDets}>
            <article>
              <hgroup>Shipping Address</hgroup>
              <span className={Styles.body}>
                {order.shippingAddress.name}
                <br />
                {order.shippingAddress.address1 +
                  ", " +
                  order.shippingAddress.address2 +
                  ", " +
                  order.shippingAddress.city +
                  " PIN-" +
                  order.shippingAddress.pincode +
                  ", " +
                  order.shippingAddress.state +
                  ", " +
                  order.shippingAddress.country}
              </span>
            </article>
            <article>
              <hgroup>Payment Methods</hgroup>
              <span className={Styles.body}>
                {order.paymentMode}
                <br />
              </span>
            </article>
            <article>
              <hgroup>Order Summary</hgroup>
              <span className={Styles.body}>
                <span>Item price: </span>
                <span>₹ {(order.amount * order.quantity) / 100}</span>
                <br />
              </span>
              <span className={Styles.body}>
                <span>Tax: </span>
                <span>₹ {order.tax / 100}</span>
                <br />
              </span>
              <span className={Styles.body}>
                <span>Shipping: </span>
                <span>₹ {order.shipping / 100}</span>
                <br />
              </span>
              <span className={Styles.body}>
                <span>Grand Total: </span>
                <span>
                  ₹{" "}
                  {(order.amount * order.quantity) / 100 +
                    order.tax / 100 +
                    order.shipping / 100}
                </span>
                <br />
              </span>
            </article>
          </div>
          <div
            style={{ background: "#FFDBE8", border: "none", gap: "10px" }}
            className={Styles.middleDiv}
          >
            <span
              style={{
                fontFamily: "Poppins",
                fontWeight: "700",
                fontSize: "16px",
                color: "#0F1111",
              }}
            >
              Cancelled Order
            </span>
            <p></p>
            <div className={Styles.OrderDetaildiv}>
              <div className={Styles.BasicDetails}>
                <Image
                  height={0}
                  width={0}
                  src={`${S3PROXY}${order.image}`}
                  alt=""
                />
                <div className={Styles.basicWriteen}>
                  <span className={Styles.Ordername}>{order.productName}</span>
                  <span className={Styles.Ordername}>
                    Sold by: <span>{order.companyName}</span>
                  </span>
                  <span className={Styles.basicCat}>{order.size}</span>
                </div>
              </div>
              <div className={Styles.ammountAndqty}>
                <span className={Styles.Amount}>
                  ₹{(order.amount + order.shipping) / 100}
                </span>
                <span className={Styles.qty}>Qty : {order.quantity}</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <span className={Styles.absosulteFixed}>
            <button
              style={{ background: "none", border: "none" }}
              onClick={() => {
                setCancelOrder(false);
              }}
            >
              <img src={`${S3PROXY}/public/images/backArrow.png`} alt="" />
            </button>{" "}
            Cancelled Order
          </span>
          <div className={Styles.orderbtndates}>
            <div className={Styles.Dates}>
              <span className={Styles.OrderDate}>
                Order Date{" "}
                <span className={Styles.ActualDate}>
                  {moment(order?.createdAt).format("MMM DD YYYY")}
                </span>
              </span>
              <span>
                Order # <span>{order._id}</span>
              </span>
              <span>
                Order Total{" "}
                <span>
                  ₹
                  {(order.amount * order.quantity) / 100 +
                    order.tax / 100 +
                    order.shipping / 100}
                </span>
              </span>
            </div>
          </div>
          <span
            style={{
              fontFamily: "Poppins",
              fontSize: "18px",
              fontWeight: "400",
              display: "flex",
              marginBottom: "10px",
            }}
          >
            Product Detail
          </span>
          <div
            style={{ background: "#FFDBE8", border: "none", gap: "10px" }}
            className={Styles.middleDiv}
          >
            <span
              style={{
                fontFamily: "Poppins",
                fontWeight: "700",
                fontSize: "16px",
                color: "#0F1111",
              }}
            >
              Cancelled Order
            </span>
            <div className={Styles.OrderDetaildiv}>
              <div className={Styles.BasicDetails}>
                <Image
                  height={0}
                  width={0}
                  src={`${S3PROXY}${order.image}`}
                  alt=""
                />
                <div className={Styles.basicWriteen}>
                  <span className={Styles.Ordername}>{order.productName}</span>
                  <span className={Styles.Ordername}>
                    Sold by: <span>{order.companyName}</span>
                  </span>
                  <span className={Styles.basicCat}>{order.size}</span>
                  <div className={Styles.ammountAndqty}>
                    <span className={Styles.Amount}>
                      ₹{(order.amount + order.shipping) / 100}
                    </span>
                    <span className={Styles.qty}>Qty : {order.quantity}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={Styles.knowingDets}>
            <article>
              <hgroup>Shipping Address</hgroup>
              <section>
                <span className={Styles.body}>
                  {order.shippingAddress.name}
                  <br />
                  {order.shippingAddress.address1 +
                    ", " +
                    order.shippingAddress.address2 +
                    ", " +
                    order.shippingAddress.city +
                    " PIN-" +
                    order.shippingAddress.pincode +
                    ", " +
                    order.shippingAddress.state +
                    ", " +
                    order.shippingAddress.country}
                </span>
              </section>
            </article>
            <article>
              <hgroup>Payment Methods</hgroup>
              <section>
                <span className={Styles.body}>{order.paymentMode}</span>
              </section>
            </article>
            <article>
              <hgroup>Order Summary</hgroup>
              <section>
                <span className={Styles.body}>
                  <span>Item price: </span>
                  <span>₹ {(order.amount * order.quantity) / 100}</span>
                  <br />
                </span>
                <span className={Styles.body}>
                  <span>Tax: </span>
                  <span>₹ {order.tax / 100}</span>
                  <br />
                </span>
                <span className={Styles.body}>
                  <span>Shipping: </span>
                  <span>₹ {order.shipping / 100}</span>
                  <br />
                </span>
                <span style={{ fontWeight: "700" }} className={Styles.body}>
                  <span>Grand Total: </span>
                  <span>
                    ₹{" "}
                    {(order.amount * order.quantity) / 100 +
                      order.tax / 100 +
                      order.shipping / 100}
                  </span>
                  <br />
                </span>
              </section>
            </article>
          </div>
        </>
      )}
    </>
  );
};

export default CancelOrder;

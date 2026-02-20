import Styles from "../../styles/Dashboard/Dashboard.module.scss";
import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { selectUser } from "../../redux/reducer/appEssentials";
import { useRouter } from "next/router";
// import { ProgressBar, Step } from "react-step-progress-bar";
import Layout from "../Dashboard/layout";
import useWindowSize from "@rooks/use-window-size";
import {
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import CancelOrder from "../orderPages/CancelOrder";
import RefundOrder from "../orderPages/RefundOrder";
import ReturnOrder from "../orderPages/ReturnOrder";
import TrackPackage from "../orderPages/TrackPackage";
import moment from "moment";
import OrderDetails from "../orderPages/OrderDetails";
import {
  useCancelOrderMutation,
  useOrderInvoiceMutation,
  useUserOrderGetQuery,
} from "redux/Api/orders.api";
import { S3PROXY } from "../../config";

const Orders = () => {
  const globleuser = useSelector(selectUser);
  const router = useRouter();
  const ostat = [
    "All",
    "Processing",
    "Order Completed",
    "Order Cancelled",
    "Refunded",
    "Returned",
  ];
  const [orderStatus, setOrderStatus] = useState("Processing");
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
  const [allOrders, setAllOrders] = useState([]);
  const [orders, setOrders] = useState([]);
  const [trackPackage, setTrackPackage] = useState(false);
  const [orderDetails, setOrderDetails] = useState(false);
  const [currentOrder, setCurrentOrder] = useState();
  const [cancelOrder, setCancelOrder] = useState(false);
  const [refundOrder, setrefundOrder] = useState(false);
  const [returnOrder, setReturnOrder] = useState(false);
  const [cancelItem, setCancelItem] = useState([]);
  const { data: userOrderGet } = useUserOrderGetQuery();
  const getOrders = async () => {
    const res = { data: userOrderGet };

    setAllOrders(res?.data);
    setOrders(res?.data?.filter((e) => e.orderStatus == "Processing"));
  };
  const [orderInvoice] = useOrderInvoiceMutation();
  const generateInvoice = async (data) => {
    try {
      let res = await orderInvoice(data);
      res = JSON.parse(JSON.stringify(res));
      const pdfBase64 = res?.data?.pdfBase64;
      const pdfBlob = new Blob([Buffer.from(pdfBase64, "base64")], {
        type: "application/pdf",
      });

      const url = URL.createObjectURL(pdfBlob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "invoice.pdf";

      document.body.appendChild(a);
      a.click();

      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
    }
  };
  const [cancelOrder1] = useCancelOrderMutation();
  const cancel_order = async (id, mode, paymentId, amount) => {
    // e.preventDefault()
    const res = cancelOrder1({
      id: id,
      mode: mode,
      paymentId: paymentId,
      amount: amount,
    });
    // setopencancelOrder(true);
    // setCancelOrder(true)
  };
  useEffect(() => {
    getOrders();
  }, [globleuser, cancelOrder, userOrderGet]);

  const handleCancel = async (e) => {
    e.preventDefault();
    setopencancelOrder(false);
    await cancel_order(...cancelItem);
    await getOrders();
    setCancelOrder(true);
  };

  useEffect(() => {
    let stat;
    orderStatus == "Processing"
      ? (stat = "Processing")
      : orderStatus == "Order Completed"
      ? (stat = "Completed")
      : orderStatus == "Order Cancelled"
      ? (stat = "Cancelled")
      : orderStatus == "Refunded"
      ? (stat = "Refunded")
      : orderStatus == "Returned"
      ? (stat = "Returned")
      : null;
    if (stat != undefined) {
      let arr = allOrders.filter((e) => e.orderStatus == stat);
      setOrders(arr);
    } else {
      setOrders(allOrders);
    }
  }, [orderStatus]);

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
  const [filter, setFilter] = useState(false);
  return (
    <Layout>
      <div
        style={{
          width: "100%",
          // backgroundColor: "blue",
          padding: "20px",
          marginTop: windowWidth > 900 ? "" : "",
        }}
      >
        <span
          style={{ justifyContent: "space-between" }}
          className={Styles.absosulteFixed}
        >
          <article>
            <button
              style={{ background: "none", border: "none" }}
              onClick={() => {
                router.back();
              }}
            >
              <img src={`${S3PROXY}/public/images/backArrow.png`} alt="" />
            </button>{" "}
            My Order
          </article>
          <section>
            <img
              src={`${S3PROXY}/public/images/filter.png`}
              alt=""
              onClick={() => setFilter(!filter)}
            />
            <div
              style={
                filter
                  ? {}
                  : {
                      width: "0px",
                      height: "0px",
                    }
              }
              className={Styles.btnTabs}
              variant="contained"
              aria-label="primary"
            >
              {ostat?.map((btn) => {
                return (
                  <span
                    onClick={() => {
                      setOrderStatus(btn), setFilter(false);
                    }}
                  >
                    {btn}
                  </span>
                );
              })}
            </div>
          </section>
        </span>
        <Dialog
          open={openCancleorder}
          onClose={() => setopencancelOrder(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are you Sure You Want to Cancel Your Order?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              By Pressing Agree you will confirm that your Order is Cancelled
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setopencancelOrder(false);
              }}
            >
              Disagree
            </Button>
            <Button
              onClick={(e) => {
                handleCancel(e);
                // setopencancelOrder(false)
              }}
              autoFocus
            >
              Agree
            </Button>
          </DialogActions>
        </Dialog>
        {cancelOrder ? (
          <CancelOrder
            order={currentOrder}
            setOrderStatus={setOrderStatus}
            setCancelOrder={setCancelOrder}
            setTrackPackage={setTrackPackage}
          ></CancelOrder>
        ) : refundOrder ? (
          <RefundOrder
            order={currentOrder}
            setOrderStatus={setOrderStatus}
            setrefundOrder={setrefundOrder}
            setTrackPackage={setTrackPackage}
          ></RefundOrder>
        ) : returnOrder ? (
          <ReturnOrder
            order={currentOrder}
            setOrderStatus={setOrderStatus}
            setReturnOrder={setReturnOrder}
            setTrackPackage={setTrackPackage}
          ></ReturnOrder>
        ) : (
          <>
            <div
              style={{ display: windowWidth <= 900 ? "none" : "" }}
              className={Styles.myOrderSpan}
            >
              <h2>My Orders</h2>
              <div
                style={{
                  display: trackPackage || orderDetails ? "flex" : "none",
                }}
                className={Styles.btndivorderTrack}
              >
                <button
                  className={Styles.cancelOrder}
                  onClick={(e) =>
                    cancelOrder(
                      currentOrder._id,
                      currentOrder.paymentMode,
                      currentOrder.paymentId,
                      currentOrder.amount
                    )
                  }
                >
                  Cancel Order
                </button>
                <button
                  style={{ color: "white" }}
                  className={Styles.TrackOrder}
                  onClick={() => {
                    setTrackPackage(false), setOrderDetails(false);
                  }}
                >
                  Go back
                </button>
              </div>
            </div>
            {trackPackage ? (
              <TrackPackage
                order={currentOrder}
                setOrderStatus={setOrderStatus}
                cancel_order={cancel_order}
                setTrackPackage={setTrackPackage}
              ></TrackPackage>
            ) : orderDetails ? (
              <OrderDetails
                order={currentOrder}
                setOrderStatus={setOrderStatus}
                setCancelOrder={setCancelOrder}
                setOrderDetails={setOrderDetails}
              ></OrderDetails>
            ) : (
              <>
                <div style={{ display: windowWidth > 900 ? "" : "none" }}>
                  <div
                    className={Styles.btnTabs}
                    variant="contained"
                    aria-label="primary"
                  >
                    {ostat?.map((btn) => {
                      return (
                        <button
                          style={
                            btn == orderStatus
                              ? {
                                  borderBottom: "1.6px solid #b6255a",
                                  fontWeight: "700",
                                  color: "#B6255A",
                                }
                              : {}
                          }
                          className={Styles.ordersTabButton}
                          onClick={() => setOrderStatus(btn)}
                        >
                          {btn}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <p
                  style={{
                    display: windowWidth <= 900 ? "" : "none",
                    fontFamily: "Poppins",
                    fontSize: "20px",
                    fontWeight: "700",
                    margin: "0px",
                  }}
                >
                  {orderStatus}
                </p>
                <span className={Styles.Order}>
                  <span>{allOrders?.length} Orders</span> Placed
                </span>
                {orders && orders.length > 0 ? (
                  orders?.map((e) => (
                    <div
                      style={{
                        width: "100%",
                        border: "1px solid #D5D9D9",
                        marginTop: "20px",
                        borderRadius: "8px 8px 0px 0px",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{ display: windowWidth > 900 ? "" : "none" }}
                        className={Styles.orderHeader}
                      >
                        <div className={Styles.orderHeaderleft}>
                          <article>
                            <span>Order Placed</span>
                            <span style={{ fontSize: "14px" }}>
                              {moment(e.createdAt).format("MMM DD YYYY")}
                            </span>
                          </article>
                          <article>
                            <span>Total</span>
                            <span style={{ fontSize: "14px" }}>
                              ₹{(e.amount * e.quantity + e.shipping) / 100}
                            </span>
                          </article>
                          <article>
                            <span>Ship To</span>
                            <span
                              style={{ color: "#b6255a", fontSize: "14px" }}
                            >
                              {e.shippingAddress.name}
                            </span>
                          </article>
                        </div>
                        <div className={Styles.orderHeaderright}>
                          <span>ORDER # {e._id}</span>
                          <article>
                            <span
                              onClick={() => {
                                setOrderDetails(true);
                                setCurrentOrder(e);
                              }}
                            >
                              Order Detail
                            </span>
                            <span
                              onClick={() => {
                                generateInvoice(e);
                              }}
                            >
                              Invoice
                            </span>
                          </article>
                        </div>
                      </div>
                      <div
                        style={{
                          display: orderStatus === "All" ? "flex" : "block",
                          justifyContent: "space-between",
                        }}
                      >
                        <div className={Styles.orderBody}>
                          <div className={Styles.orderDetail}>
                            {orderStatus == "Processing" && (
                              <h4
                                style={{
                                  fontFamily: "Poppins",
                                  fontWeight: "700",
                                  marginBottom: "0px",
                                  fontSize: "16px",
                                }}
                              >
                                Arriving on{" "}
                                {moment(e.createdAt)
                                  .add(5, "days")
                                  .format("DD MMM")}
                              </h4>
                            )}
                            <span
                              style={{
                                fontFamily: "Poppins",
                                fontWeight: "400",
                                fontSize: "14px",
                                marginBottom: "10px",
                                color: "#0F1111",
                              }}
                            >
                              Not yet dispatched
                            </span>
                            <div className={Styles.mainDetail}>
                              <img src={`${S3PROXY}${e.image}`} alt="" />
                              <div className={Styles.DetailWritter}>
                                <span className={Styles.pname}>
                                  {e.productName}
                                </span>
                                <span>
                                  Sold By :{" "}
                                  <span style={{ fontWeight: "700" }}>
                                    {e.shopkeeperId.name}
                                  </span>
                                </span>
                                <span style={{ color: "#b6255a" }}>
                                  ₹{(e.amount * e.quantity + e.shipping) / 100}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div
                            style={{
                              alignItems: windowWidth > 900 ? "" : "center",
                            }}
                            className={Styles.orderBtn}
                          >
                            {orderStatus === "Processing" ? (
                              <>
                                <button
                                  className={Styles.trackpac}
                                  onClick={() => {
                                    setTrackPackage(true);
                                    setCurrentOrder(e);
                                  }}
                                >
                                  Track Package
                                </button>
                                <button
                                  className={Styles.cancelitem}
                                  onClick={() => {
                                    setopencancelOrder(true);
                                    setCurrentOrder(e);
                                    setCancelItem([
                                      e._id,
                                      e.paymentMode,
                                      e.paymentId,
                                      e.amount,
                                    ]);
                                  }}
                                >
                                  Cancel Item
                                </button>
                                <button
                                  className={Styles.cancelitem}
                                  onClick={() => {
                                    generateInvoice(e);
                                  }}
                                >
                                  Invoice
                                </button>
                              </>
                            ) : orderStatus === "Order Completed" ? (
                              <button
                                className={Styles.trackpac}
                                onClick={() => {
                                  setTrackPackage(true);
                                  setCurrentOrder(e);
                                }}
                              >
                                View Order Detail
                              </button>
                            ) : orderStatus === "Refunded" ? (
                              <button
                                className={Styles.trackpac}
                                onClick={() => {
                                  setrefundOrder(true);
                                  setCurrentOrder(e);
                                }}
                              >
                                Payment Refund
                              </button>
                            ) : orderStatus === "Order Cancelled" ? (
                              <button
                                className={Styles.trackpac}
                                onClick={() => {
                                  setCancelOrder(true);
                                  setCurrentOrder(e);
                                }}
                              >
                                View Order Detail
                              </button>
                            ) : orderStatus === "Returned" ? (
                              <button
                                className={Styles.trackpac}
                                onClick={() => {
                                  setReturnOrder(true);
                                  setCurrentOrder(e);
                                }}
                              >
                                Return Order Detail
                              </button>
                            ) : (
                              <></>
                            )}
                          </div>
                        </div>
                        {orderStatus == "All" && (
                          <h4
                            style={{
                              display: "flex",
                              alignItems: "center",
                              padding: "3px",
                            }}
                          >
                            {e.orderStatus}
                          </h4>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <h4 style={{ marginTop: "20px" }}>No Orders found</h4>
                )}
              </>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

const styles = {
  orderItem: {
    margin: 20,
    padding: 10,
    alignItems: "center",
  },
  summary: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    // width: "100%",
    margin: 1,
    padding: 1,
  },
  totalAmount: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
  },
  date: {
    fontSize: 16,
    fontFamily: "open-sans",
    color: "#888",
  },
  detailItems: {
    width: "100%",
  },
  actions: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    width: "80%",
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin: 5,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    fontWeight: "bold",
    textAlign: "center",

    fontSize: 14,
    color: "#000",
    marginTop: 0,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  MainContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 0,
  },
  childView: {
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 0,
    marginRight: 10,
  },

  StarImage: {
    width: 18,
    height: 18,
    resizeMode: "cover",
    margin: 2,
  },

  input: {
    margin: 5,
    borderWidth: 1,
    padding: 10,
  },
};

export default Orders;

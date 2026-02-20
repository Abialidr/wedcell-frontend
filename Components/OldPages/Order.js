import React, { useEffect, useState } from "react";
import styles from "./../styles/order.module.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Box,
  Button,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useWindowSize from "@rooks/use-window-size";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, user } from "../../redux/reducer/appEssentials";
import { useRouter } from "next/router";
import axios from "axios";
import { PROXY, S3PROXY } from "../../config";
import styled from "@emotion/styled";
import CancelIcon from "@mui/icons-material/Cancel";
import { orderval } from "../../yupValidation/inhouseValidation";
import {
  useDeletCartMutation,
  useGetAllCartsQuery,
  useUpdateCartMutation,
} from "redux/Api/chw.api";
import {
  useCheckChargesQuery,
  useCheckPinQuery,
  useCodCheckOutMutation,
  useOrderPaymentsMutation,
  useSingleVariantMutation,
  useUpdateCustomerMutation,
} from "redux/Api/orders.api";
import { useCheckOutKeyQuery } from "redux/Api/others.api";
import Image from "next/image";
const moment = require("moment");

const CartData = ({ data, key, deleteCart, setDeleteCart }) => {
  const today = moment();
  const globleuser = useSelector(selectUser);
  const [qnty, setQnty] = useState(data?.quantity);
  const [maxqnty, setMaxqnty] = useState(1000000);
  const [updateCart] = useUpdateCartMutation();
  return (
    <div className={styles.detailcard} key={key}>
      <span
        style={{
          padding: "7px",
          fontSize: "19px",
          fontWeight: "600",
        }}
      >
        Delivery Date :{" "}
        <span style={{ color: "#58ab58" }}>
          {today.clone().add(5, "days").format("DD MMM, YYYY")}
        </span>
      </span>
      <span
        style={{
          paddingLeft: "7px",

          fontSize: "14px",
          fontWeight: "500",
          paddingBottom: "5px",
        }}
      >
        Item dispatch by Wedfield
      </span>
      <div style={{ display: "flex" }}>
        <div className={styles.itemsimg}>
          <Image
            height={0}
            width={0}
            src={`${S3PROXY}${data?.bannerImage}`}
            alt="hii"
          />
        </div>
        <div className={styles.ItemDetail}>
          <span>{data?.name}</span>
          <span>Size : {data?.size}</span>
          <span>Price : {data?.price}</span>
          <div className={styles.qty}>
            <div className={styles.Qty1}>
              <label htmlFor="Qty">Qty</label>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <input
                  onChange={async (e) => {
                    // addEventListener('keydown', (e) => {
                    //   e.preventDefault();
                    // });
                    let quantity = maxqnty;
                    if (quantity === 1000000) {
                      setMaxqnty(parseInt(data?.maxQnty));
                      quantity = parseInt(data?.maxQnty);
                    }
                    if (e.target.value <= data?.maxQnty) {
                      setQnty(e.target.value);
                      const body = {
                        _id: data?._id,
                        quantity: e.target.value,
                      };
                      const config = {
                        headers: {
                          authorization: globleuser?.data?.token,
                        },
                      };
                      const result = await updateCart(body);
                      setDeleteCart(!deleteCart);
                    }
                  }}
                  // onInput={
                  //   (this.value =
                  //     !!this.value && Math.abs(this.value) >= 0
                  //       ? Math.abs(this.value)
                  //       : null)
                  // }
                  type="number"
                  min={1}
                  max={data?.maxQnty}
                  name=""
                  id=""
                  value={data?.quantity}
                  style={{ width: "100%" }}
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <button
                    style={{
                      background: "transparent",
                      color: "white",
                      border: "none", // Remove border if needed
                    }}
                    onClick={async (e) => {
                      if (Number(qnty < maxqnty)) {
                        // setQnty(Number(qnty) -1);
                        // addEventListener("keydown", (e) => {
                        //   e.preventDefault();
                        // });
                        let quantity = maxqnty;
                        if (quantity === 1000000) {
                          setMaxqnty(parseInt(data?.maxQnty));
                          quantity = parseInt(data?.maxQnty);
                        }
                        if (Number(qnty) < quantity) {
                          setQnty(Number(qnty) + 1);
                          const body = {
                            _id: data?._id,
                            quantity: Number(qnty) + 1,
                          };
                          const config = {
                            headers: {
                              authorization: globleuser?.data?.token,
                            },
                          };
                          const result = await updateCart(body);

                          setDeleteCart(!deleteCart);
                        } else {
                          setQnty(Number(qnty) - 1);
                          alert("Not enough item in stock");
                        }
                      }
                    }}
                    // onClick={() => setQnty(Number(qnty) + 1)}
                  >
                    +
                  </button>
                  <button
                    style={{
                      background: "transparent",
                      color: "white",
                      border: "none", // Remove border if needed
                    }}
                    onClick={async (e) => {
                      if (Number(qnty) >= 2) {
                        // addEventListener("keydown", (e) => {
                        //   e.preventDefault();
                        // });
                        let quantity = maxqnty;
                        if (quantity === 1000000) {
                          setMaxqnty(parseInt(data?.maxQnty));
                          quantity = parseInt(data?.maxQnty);
                        }
                        if (Number(qnty) <= quantity) {
                          setQnty(Number(qnty) - 1);
                          const body = {
                            _id: data?._id,
                            quantity: Number(qnty) - 1,
                          };
                          const config = {
                            headers: {
                              authorization: globleuser?.data?.token,
                            },
                          };
                          const result = await updateCart(body);

                          setDeleteCart(!deleteCart);
                        }
                      }
                    }}
                  >
                    -
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const CartDataone = ({ data, key, deleteCart, setDeleteCart }) => {
  const globleuser = useSelector(selectUser);
  const [qnty, setQnty] = useState(data?.quantity);
  const [maxqnty, setMaxqnty] = useState(1000000);
  const [updateCart] = useUpdateCartMutation();
  return (
    <>
      <div className={styles.ProdDetail}>
        <div className={styles.prodimg}>
          <Image
            height={0}
            width={0}
            src={`${S3PROXY}${data?.bannerImage}`}
            alt=""
          />
        </div>
        <div className={styles.productwritten}>
          <span>{data?.name}</span>
          <span>Size : {data?.size}</span>
          <span>Price : {data?.price}</span>
          <div className={styles.qty}>
            <div className={styles.Qty}>
              <label htmlFor="Qty">Quantity</label>
              <input
                onChange={async (e) => {
                  addEventListener("keydown", (e) => {
                    e.preventDefault();
                  });
                  let quantity = maxqnty;
                  if (quantity === 1000000) {
                    setMaxqnty(parseInt(data?.maxQnty));
                    quantity = parseInt(data?.maxQnty);
                  }
                  if (e.target.value <= data?.maxQnty) {
                    setQnty(e.target.value);
                    const body = {
                      _id: data?._id,
                      quantity: e.target.value,
                    };
                    const config = {
                      headers: {
                        authorization: globleuser?.data?.token,
                      },
                    };
                    const result = await updateCart(body);
                    setDeleteCart(!deleteCart);
                  }
                }}
                // onInput={
                //   (this.value =
                //     !!this.value && Math.abs(this.value) >= 0
                //       ? Math.abs(this.value)
                //       : null)
                // }
                type="number"
                min={1}
                max={data?.maxQnty}
                name=""
                id=""
                value={data?.quantity}
                style={{ width: "100%" }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
const Order = () => {
  // Get the current date
  const today = moment();
  const globleuser = useSelector(selectUser);
  useEffect(() => {
    !globleuser?.success && router.push("/");
  }, []);
  const [defaultaddress, setdefaultaddress] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [deleteCart, setDeleteCart] = useState(false);
  const dispatch = useDispatch();
  const [deliverable, setDeliverable] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [openpay, setOpenpay] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const router = useRouter();
  const [allData, setAllData] = useState();
  const [itemData, setItemdata] = useState();
  const [totalcartPrice, settotalcartPrice] = useState();
  const { itemId } = router.query;
  const { cart } = router.query;
  const { size } = router.query;
  const [globalShippingAddress, setGlobalShippingAddress] = useState([]);

  const [qnty, setQnty] = useState(1);
  const [singleWeight, setSingleWeight] = useState(0);
  const [price, setPrice] = useState(0);
  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState(1);
  const [mop, setMop] = useState("Cash on Delivery");
  const [cartCharges, setCartCharges] = useState([]);
  useEffect(() => {
    if (globleuser) {
      setGlobalShippingAddress(
        JSON.parse(JSON.stringify(globleuser?.data?.shipping_address))
      );
    }
  }, [globleuser]);

  const checkPin = async () => {
    const res = await axios.get(`${PROXY}/delivery/check`, {
      params: { pin: globalShippingAddress[defaultaddress]?.pincode },
    });
    if (res?.data?.delivery_codes?.length > 0) {
      setDeliverable(true);
    } else {
      setDeliverable(false);
      window.alert("Not deliverable to this pincode");
    }
  };
  const [weight, setWeight] = useState();
  const { data: chargesData1 } = useCheckChargesQuery(
    {
      pincode: globalShippingAddress[defaultaddress]?.pincode,
      weight: weight,
    },
    {
      skip: !weight,
    }
  );
  const checkCharges = async () => {
    if (itemId) {
      try {
        setWeight(singleWeight);
        const res = { data: chargesData1 };

        if (res?.data[0]) {
          mop == "Cash on Delivery"
            ? setShipping(
                Math.ceil(
                  (res?.data[0]?.total_amount +
                    (res?.data[0]?.total_amount + price * 1.12) * 0.02 * 1.18) *
                    1.01
                ) * qnty
              )
            : setShipping(Math.ceil(res?.data[0]?.total_amount) * qnty);
        }
      } catch (error) {
        console.error(error);
      }
    } else if (cart) {
      let charge = 0;
      let cartChargeArray = [];
      // Use a for...of loop to iterate sequentially
      for (const obj of allData) {
        try {
          ``;
          setWeight(obj.weight * obj.quantity);
          const res = await axios.get(`${PROXY}/delivery/check_charges`, {
            params: {
              pincode: globalShippingAddress[defaultaddress].pincode,
              weight: obj.weight * obj.quantity,
            },
          });
          if (res.data[0]) {
            if (mop === "Cash on Delivery") {
              cartChargeArray.push(
                Math.ceil(
                  res.data[0].total_amount +
                    (obj.price * 1.12 +
                      res.data[0].total_amount / obj.quantity) *
                      0.02 *
                      1.18 *
                      1.03 *
                      obj.quantity
                )
              );

              charge += Math.ceil(
                res.data[0].total_amount +
                  (obj.price * 1.12 + res.data[0].total_amount / obj.quantity) *
                    0.02 *
                    1.18 *
                    1.03 *
                    obj.quantity
              );
            } else {
              cartChargeArray.push(Math.ceil(res.data[0].total_amount));
              charge += Math.ceil(res.data[0].total_amount);
            }
          }
        } catch (error) {
          console.error(error);
        }
      }
      setCartCharges(cartChargeArray);
      setShipping(charge);
    }

    // if(res.data.delivery_codes.length>0){
    //   setDeliverable(true)
    // }else{
    //   setDeliverable(false)
    //   window.alert('Not deliverable to this pincode')

    // }
  };
  useEffect(() => {
    globalShippingAddress.length > 0 &&
      globalShippingAddress[defaultaddress].pincode &&
      globalShippingAddress[defaultaddress].pincode.length > 5 &&
      checkPin();
  }, [globalShippingAddress, defaultaddress]);

  useEffect(() => {
    singleWeight > 0 &&
      globalShippingAddress.length > 0 &&
      globalShippingAddress[defaultaddress].pincode &&
      globalShippingAddress[defaultaddress].pincode.length > 5 &&
      checkCharges();
  }, [globalShippingAddress, defaultaddress]);

  useEffect(() => {
    if (itemId) {
      singleWeight > 0 &&
        globalShippingAddress.length > 0 &&
        globalShippingAddress[defaultaddress].pincode &&
        globalShippingAddress[defaultaddress].pincode.length > 5 &&
        checkCharges();
    } else if (cart) {
      allData &&
        allData.length > 0 &&
        globalShippingAddress.length > 0 &&
        globalShippingAddress[defaultaddress].pincode &&
        globalShippingAddress[defaultaddress].pincode.length > 5 &&
        checkCharges();
    }
  }, [singleWeight, allData, qnty, mop]);
  useEffect(() => {
    setPrice(
      itemData?.psizes[selectedSize]?.priceExclusive -
        Math.floor(
          (itemData?.psizes[selectedSize]?.priceExclusive *
            itemData?.psizes[selectedSize]?.discount) /
            100
        )
    );
    setSingleWeight(itemData?.psizes[selectedSize]?.weight);
  }, [itemData]);

  // useEffect(() => {
  //   // checkPin()

  // }, [globalShippingAddress]);
  useEffect(() => {
    // if (!itemId || !cart) {
    //   router.push("/");
    // }
    if (size) {
      setSelectedSize(size);
    }
  }, [itemId, cart]);
  const [singleVariant] = useSingleVariantMutation();
  const getProduct = async () => {
    const res = await singleVariant({
      _id: itemId,
      size: size,
    });
    if (itemId) {
      setAllData([res?.data]);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);
  const { data: allCart } = useGetAllCartsQuery();
  useEffect(() => {
    const getCartProduct = async () => {
      const config = {
        headers: {
          authorization: globleuser?.data?.token,
        },
      };
      const res = await { data: allCart };
      if (!itemId) {
        setAllData(res?.data?.data);
      }
      settotalcartPrice(res?.data?.total_cart_price);
    };
    getCartProduct();
  }, [deleteCart, cart, allCart]);
  useEffect(() => {
    if (itemId) {
      const itemData = allData?.find((itemtemp) => itemtemp?._id === itemId);
      setItemdata(itemData);
    }
  }, [allData]);

  const handleClickOpen = () => () => {
    setOpen(true);
  };
  const {
    innerWidth: windowWidth,
    innerHeight,
    outerHeight,
    outerWidth,
  } = useWindowSize();
  const [changes, setchanges] = useState(false);
  const [changes1, setchanges1] = useState(false);

  const handleClickClose = () => {
    setOpen(false);
  };
  const handleClosepay = () => {
    setOpenpay(false);
  };
  const [updateCustomer] = useUpdateCustomerMutation();
  const handleSubmit = async () => {
    try {
      await orderval.validate(globalShippingAddress);
      const token = globleuser?.data?.token;
      let res = await updateCustomer({
        _id: globleuser?.data?._id,
        shipping_address: globalShippingAddress,
        mobile: globleuser?.data?.mobile,
        name: globleuser?.data?.name,
        email: globleuser?.data?.email,
        profile_pic: [],
      });
      res = JSON.parse(JSON.stringify(res));
      res.data.data.token = token ? token : "";
      dispatch(user(res?.data));
      localStorage.setItem("wedfield", JSON.stringify(res?.data));
      setOpen(false);
    } catch (e) {
      toast.error(`${e}`, {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };
  const Typo4 = styled(Typography)(({ theme }) => ({
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "30px",
    lineHeight: "46px",
    color: "#000000",
  }));
  const { data: key } = useCheckOutKeyQuery();
  const [orderPayment] = useOrderPaymentsMutation();
  const getPayment = async () => {
    if (deliverable) {
      let sendData;
      if (itemId) {
        sendData = {
          userId: globleuser?.data?._id,
          itemId: itemId,
          quantity: qnty,
          size: size,
          weight: singleWeight,
          shippingAddress: globalShippingAddress[defaultaddress],
          shipping: shipping,
          tax: itemId
            ? Math.ceil(((price * qnty) / 100) * 12)
            : Math.ceil((totalcartPrice / 100) * 12),
          price: itemId ? price * qnty : totalcartPrice,
        };
      } else if (cart) {
        sendData = {
          userId: globleuser?.data?._id,
          cart: allData,
          cartCharges: cartCharges,
          // quantity: qnty,
          shippingAddress: globalShippingAddress[defaultaddress],
          shipping: shipping,
          tax: itemId
            ? Math.ceil(((price * qnty) / 100) * 12)
            : Math.ceil((totalcartPrice / 100) * 12),
          price: itemId ? (price * qnty) / 12 : totalcartPrice,
        };
      }
      const { data: amountData } = await orderPayment(sendData);

      const { data: keyData } = { data: key };

      const options = {
        key: keyData?.key,
        amount: amountData?.data.amount,
        currency: "INR",
        name: "WedField",
        description: "Test Transaction",
        image: "/assests/webp/logo.webp",
        order_id: amountData?.data?.id,

        callback_url: itemId
          ? `/OrderSuccess?da=${defaultaddress}&order=${amountData?.order._id}&item=${itemData._id}&size=${selectedSize}`
          : `/OrderSuccess?da=${defaultaddress}&order=${amountData?.order.data._id}&cart=true`,
        // prefill: {
        //   name: inputValues.name,
        //   email: inputValues.email,
        //   contact: inputValues.number,
        // },
        notes: {
          address: "Delhi",
        },
        theme: {
          color: "#3399cc",
        },
      };

      var rzp1 = new window.Razorpay(options);
      rzp1.open();
    } else {
      window.alert("Change pin code");
    }
  };
  const [cartDelete] = useDeletCartMutation();
  const [codCheckOut] = useCodCheckOutMutation();
  const codPayment = async () => {
    if (deliverable) {
      let sendData;
      if (itemId) {
        sendData = {
          userId: globleuser?.data?._id,
          itemId: itemId,
          quantity: qnty,
          size: size,
          weight: singleWeight,
          shippingAddress: globalShippingAddress[defaultaddress],
          shipping: shipping,
          tax: itemId
            ? Math.ceil(((price * qnty) / 100) * 12)
            : Math.ceil((totalcartPrice / 100) * 12),
          price: itemId ? price * qnty : totalcartPrice,
        };
      } else if (cart) {
        sendData = {
          userId: globleuser?.data?._id,
          cart: allData,
          cartCharges: cartCharges,
          // quantity: qnty,
          shippingAddress: globalShippingAddress[defaultaddress],
          shipping: shipping,
          tax: itemId
            ? Math.ceil(((price * qnty) / 100) * 12)
            : Math.ceil((totalcartPrice / 100) * 12),
          price: itemId ? price * qnty : totalcartPrice,
        };
      }
      const { data: amountData } = await codCheckOut(sendData);
      allData?.map((val, key) => {
        cartDelete(val._id);
      });
      router.push(
        itemId
          ? `/OrderSuccess?da=${defaultaddress}&order=${amountData?.data.id}&item=${itemData?._id}&size=${selectedSize}`
          : `/OrderSuccess?da=${defaultaddress}&order=${amountData?.data.id}&cart=true`
      );
    } else {
      window.alert("Change pin code");
    }
  };
  if (windowWidth <= 660) {
    return (
      <div
        className={styles.mainbodyabove900}
        style={{
          // height: "700px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "18px",
          fontFamily: "Montserrat",
        }}
      >
        <ToastContainer />
        <h2
          style={{
            marginTop: "-20px",
            fontWeight: "600",
            width: "100%",
            paddingLeft: "30px",
            paddingBottom: "0px",
          }}
        >
          Check Out
        </h2>
        <Dialog
          open={open}
          onClose={handleClickClose}
          scroll={"paper"}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <DialogTitle id="scroll-dialog-title">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span>Address</span>
              <IconButton
                aria-label="close"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <CancelIcon />
              </IconButton>
            </div>
          </DialogTitle>
          <DialogContent dividers={true}>
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
              <div>
                <Grid>
                  {/* <form> */}

                  <Grid container spacing={2}>
                    <Grid xs={12} sm={6} item>
                      <TextField
                        onChange={(e) => {
                          const arr = globalShippingAddress;
                          arr[defaultaddress].name = e.target.value;
                          setGlobalShippingAddress([...arr]);
                        }}
                        placeholder="Enter Vendor Id"
                        label="Name"
                        variant="outlined"
                        fullWidth
                        required
                        value={globalShippingAddress[defaultaddress]?.name}
                      />
                      {/* {error.vendorId && error.vendorId.length && (
                          <Alert severity="error">{error.vendorId}</Alert>
                        )} */}
                    </Grid>
                    <Grid xs={12} sm={6} item>
                      <TextField
                        onChange={(e) => {
                          const arr = globalShippingAddress;
                          arr[defaultaddress].number = e.target.value;
                          setGlobalShippingAddress([...arr]);
                        }}
                        placeholder="Number"
                        label="Number"
                        variant="outlined"
                        fullWidth
                        required
                        value={globalShippingAddress[defaultaddress]?.number}
                      />
                      {/* {error.name && error.name.length && (
                          <Alert severity="error">{error.name}</Alert>
                        )} */}
                    </Grid>
                    <Grid xs={12} sm={12} item>
                      <TextField
                        onChange={(e) => {
                          const arr = globalShippingAddress;
                          arr[defaultaddress].address1 = e.target.value;
                          setGlobalShippingAddress([...arr]);
                        }}
                        placeholder="Flat No,Building"
                        label="Flat No,Building"
                        variant="outlined"
                        fullWidth
                        required
                        value={globalShippingAddress[defaultaddress]?.address1}
                      />
                      {/* {error.name && error.name.length && (
                          <Alert severity="error">{error.name}</Alert>
                        )} */}
                    </Grid>
                    <Grid xs={12} sm={12} item>
                      <TextField
                        onChange={(e) => {
                          const arr = globalShippingAddress;
                          arr[defaultaddress].address2 = e.target.value;
                          setGlobalShippingAddress([...arr]);
                        }}
                        placeholder="Area,Street,Sector,Village"
                        label="Area,Street,Sector,Village"
                        variant="outlined"
                        fullWidth
                        required
                        value={globalShippingAddress[defaultaddress]?.address2}
                      />
                      {/* {error.name && error.name.length && (
                          <Alert severity="error">{error.name}</Alert>
                        )} */}
                    </Grid>
                    <Grid xs={12} sm={12} item>
                      <TextField
                        onChange={(e) => {
                          const arr = globalShippingAddress;
                          arr[defaultaddress].landmark = e.target.value;
                          setGlobalShippingAddress([...arr]);
                        }}
                        placeholder="Landmark"
                        label="Landmark"
                        variant="outlined"
                        fullWidth
                        required
                        value={globalShippingAddress[defaultaddress]?.landmark}
                      />
                      {/* {error.name && error.name.length && (
                          <Alert severity="error">{error.name}</Alert>
                        )} */}
                    </Grid>
                    <Grid xs={12} sm={6} item>
                      <TextField
                        label="PinCode"
                        onChange={(e) => {
                          const arr = globalShippingAddress;
                          arr[defaultaddress].pincode = e.target.value;
                          setGlobalShippingAddress([...arr]);
                        }}
                        placeholder="PinCode"
                        sx={{
                          width: "100%",
                        }}
                        value={globalShippingAddress[defaultaddress]?.pincode}
                      >
                        {/* {CategotiesListVenue.map((item, key) => (
                            <MenuItem key={key} value={item.name}>
                              {item.name}
                            </MenuItem>
                          ))} */}
                      </TextField>
                    </Grid>

                    <Grid xs={12} sm={6} item>
                      <TextField
                        onChange={(e) => {
                          const arr = globalShippingAddress;
                          arr[defaultaddress].city = e.target.value;
                          setGlobalShippingAddress([...arr]);
                        }}
                        placeholder="Town/City"
                        label="Town/City"
                        variant="outlined"
                        fullWidth
                        value={globalShippingAddress[defaultaddress]?.city}
                      />
                    </Grid>

                    <Grid xs={12} sm={6} item>
                      <TextField
                        label="State"
                        onChange={(e) => {
                          const arr = globalShippingAddress;
                          arr[defaultaddress].state = e.target.value;
                          setGlobalShippingAddress([...arr]);
                        }}
                        placeholder="Select State"
                        sx={{
                          width: "100%",
                        }}
                        value={globalShippingAddress[defaultaddress]?.state}
                      >
                        {/* {cities.map((item, key) => (
                            <MenuItem key={key} value={item}>
                              {item}
                            </MenuItem>
                          ))} */}
                      </TextField>
                    </Grid>
                    <Grid xs={12} sm={6} item>
                      <TextField
                        onChange={(e) => {
                          const arr = globalShippingAddress;
                          arr[defaultaddress].email = e.target.value;
                          setGlobalShippingAddress([...arr]);
                        }}
                        placeholder="Email"
                        label="Email"
                        variant="outlined"
                        fullWidth
                        value={globalShippingAddress[defaultaddress]?.email}
                      />
                    </Grid>
                  </Grid>
                  {/* </form> */}
                </Grid>
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                const newarr = [...globalShippingAddress];
                newarr.pop();
                setGlobalShippingAddress(newarr);
                setdefaultaddress(0);
                setOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                handleSubmit();
              }}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>

        <div className={styles.MainAboveall}>
          <div className={styles.leftsegment}>
            <div className={styles.AddressDiv}>
              <div className={styles.deliveryAddChange}>
                <div className={styles.heading}>Delivery Address</div>

                {globalShippingAddress.length ? (
                  changes ? (
                    <div
                      className={styles.changes}
                      onClick={() => setchanges(false)}
                    ></div>
                  ) : (
                    <div
                      className={styles.changes}
                      onClick={() => setchanges(true)}
                    >
                      Change
                    </div>
                  )
                ) : (
                  <></>
                )}
              </div>
              {globalShippingAddress.length ? (
                changes === false ? (
                  <>
                    <div className={styles.DeliveryAaDDRESS}>
                      <div className={styles.OneAddress}>
                        <span>
                          {globalShippingAddress[defaultaddress]?.name},
                          {globalShippingAddress[defaultaddress]?.address1}{" "}
                          {globalShippingAddress[defaultaddress]?.address2}{" "}
                          {globalShippingAddress[defaultaddress]?.landmark}{" "}
                          {globalShippingAddress[defaultaddress]?.city}{" "}
                          {globalShippingAddress[defaultaddress]?.state}{" "}
                          {globalShippingAddress[defaultaddress]?.country} -{" "}
                          {globalShippingAddress[defaultaddress]?.pincode}
                        </span>
                        <article>
                          <span>
                            Phone Number :{" "}
                            {globalShippingAddress[defaultaddress]?.number}
                          </span>{" "}
                          <br />
                          <span>
                            Email :{" "}
                            {globalShippingAddress[defaultaddress]?.email}
                          </span>{" "}
                          <br />
                          <span
                            onClick={() => {
                              setOpen(true);
                            }}
                          >
                            Edit Address
                          </span>
                        </article>
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )
              ) : (
                <div className={styles.DeliveryAaDDRESS}>
                  <div className={styles.OneAddress}>
                    <span
                      onClick={() => {
                        setdefaultaddress(globalShippingAddress.length);
                        const newArr = [
                          ...globalShippingAddress,
                          {
                            address1: "",
                            address2: "",
                            landmark: "",
                            state: "",
                            country: "",
                            city: "",
                            pincode: "",
                            name: "",
                            email: "",
                            number: "",
                          },
                        ];
                        setGlobalShippingAddress([...newArr]);
                        setOpen(true);
                      }}
                      className={styles.addnewAddress}
                    >
                      Add New Address +
                    </span>
                  </div>
                </div>
              )}

              {changes && (
                <div className={styles.slectAddress}>
                  <span className={styles.heading}>Your Addresses</span>
                  {globalShippingAddress?.map((data, key) => {
                    return (
                      <div className={styles.oneaddressseg}>
                        <div>
                          <input
                            type="radio"
                            name="SelectedAddress"
                            id=""
                            checked={key === defaultaddress}
                            onClick={() => setdefaultaddress(key)}
                          />
                        </div>
                        <div className={styles.Addresswrit}>
                          <span>
                            {data?.name},{data?.address1} {data?.address2}{" "}
                            {data?.landmark} {data?.city} {data?.state}{" "}
                            {data?.country} - {data?.pincode}
                          </span>
                          <article>
                            <span>Phone Number : {data?.number}</span> <br />
                            <span>Email : {data?.email}</span> <br />
                            <span
                              onClick={() => {
                                setdefaultaddress(key);
                                setOpen(true);
                              }}
                            >
                              Edit Address
                            </span>
                          </article>
                        </div>
                      </div>
                    );
                  })}

                  <div className={styles.addnewAddress}>
                    <span
                      onClick={() => {
                        setdefaultaddress(globalShippingAddress.length);
                        const newArr = [
                          ...globalShippingAddress,
                          {
                            address1: "",
                            address2: "",
                            landmark: "",
                            state: "",
                            country: "",
                            city: "",
                            pincode: "",
                            name: "",
                            email: "",
                            number: "",
                          },
                        ];
                        setGlobalShippingAddress([...newArr]);
                        setOpen(true);
                      }}
                      className={styles.addnewAddress}
                    >
                      Add New Address +
                    </span>
                  </div>
                  <div>
                    <button
                      className={styles.usethisaddress}
                      onClick={() => {
                        setchanges(false);
                      }}
                    >
                      Use This Address
                    </button>
                  </div>
                </div>
              )}
              <div className={styles.BilAandradio}>
                <input type="checkbox" name="" id="" checked />
                <span>Billing and delivery addresses are same.</span>
              </div>
            </div>
            <div className={styles.paymentDiv}>
              <div className={styles.deliveryAddChange}>
                <div className={styles.heading}>Select a payment Mode</div>

                {changes1 ? (
                  <div
                    className={styles.changes}
                    onClick={() => setchanges(false)}
                  ></div>
                ) : (
                  <>
                    <div
                      className={styles.changes}
                      onClick={() => setchanges1(true)}
                    >
                      Change
                    </div>
                  </>
                )}
              </div>
              {!changes1 ? (
                <div className={styles.PaymentMethods}>
                  <div className={styles.OneAddress}>{mop} </div>
                </div>
              ) : (
                <></>
              )}
              <br />
              {changes1 ? (
                <div className={styles.methods}>
                  <div>
                    <input
                      type="radio"
                      name="paymentMethod"
                      id=""
                      checked={mop === "Razor Pay"}
                      onClick={() => {
                        setMop("Razor Pay");
                      }}
                    />
                    <img
                      style={{
                        width: "120px",
                        height: "120px",
                        // borderRadius: "35px",
                        // boxShadow: "0px 0px 14px rgba(0, 0, 0, 0.15)"
                      }}
                      src={`${S3PROXY}/public/logo/webp/RazorPay.webp`}
                    />
                  </div>
                  <div>
                    <input
                      onClick={() => {
                        setMop("Cash on Delivery");
                      }}
                      type="radio"
                      name="paymentMethod"
                      id=""
                      checked={mop === "Cash on Delivery"}
                    />
                    <span>Cash On Delivery</span>
                  </div>
                  <div>
                    <button
                      className={styles.usethisaddress}
                      onClick={() => {
                        setchanges1(false);
                      }}
                    >
                      Use This Mode
                    </button>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
            <div className={styles.ViewOrder}>
              <div className={styles.heading}>Order Review</div>
              {itemId ? (
                <div className={styles.detailcard}>
                  <div style={{ display: "flex" }}>
                    <div className={styles.itemsimg}>
                      {itemData?.mainImages ? (
                        <Image
                          height={0}
                          width={0}
                          src={`${S3PROXY}${itemData?.mainImages}`}
                          alt="hii"
                        />
                      ) : (
                        <></>
                      )}
                    </div>
                    <div className={styles.ItemDetail}>
                      <span style={{ fontWeight: "500" }}>
                        {itemData?.name}
                      </span>
                      <span>Size : {selectedSize}</span>
                      <span>
                        Price :{" "}
                        {itemData?.psizes[selectedSize]?.priceExclusive -
                          Math.floor(
                            (itemData?.psizes[selectedSize]?.priceExclusive *
                              itemData?.psizes[selectedSize]?.discount) /
                              100
                          )}
                      </span>
                      <div className={styles.qty}>
                        <div className={styles.Qty1}>
                          <label htmlFor="Qty">Qty</label>

                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <input
                              onChange={async (e) => {
                                addEventListener("keydown", (e) => {
                                  e.preventDefault();
                                });
                                if (
                                  e.target.value <=
                                  itemData?.psizes[selectedSize]?.qauntity
                                ) {
                                  setQnty(e.target.value);
                                }
                              }}
                              type="number"
                              min={1}
                              max={itemData?.psizes[selectedSize]?.qauntity}
                              name=""
                              id=""
                              value={qnty}
                              style={{ width: "100%" }}
                            />
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <button
                                style={{
                                  background: "transparent",
                                  color: "white",
                                  border: "none", // Remove border if needed
                                }}
                                onClick={() => setQnty(Number(qnty) + 1)}
                              >
                                +
                              </button>
                              <button
                                style={{
                                  background: "transparent",
                                  color: "white",
                                  border: "none", // Remove border if needed
                                }}
                                onClick={() => {
                                  qnty > 1 && setQnty(qnty - 1);
                                }}
                              >
                                -
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                allData?.map((data, key) => {
                  return (
                    // <div className={styles.detailcard}>
                    //   <div className={styles.itemsimg}>
                    //     < src={`${S3PROXY}${data?.bannerImage}`} alt="hii" />
                    //   </div>
                    //   <div className={styles.ItemDetail}>
                    //     <span>{data?.name}</span>
                    //     <span>Size : {data?.size}</span>
                    //     <span>Price : {data?.price}</span>
                    //     <div className={styles.qty}>
                    //       <div className={styles.Qty1}>
                    //         <label htmlFor="Qty">Quantity</label>
                    //         <input
                    //           onChange={async (e) => {
                    //             addEventListener("keydown", (e) => {
                    //               e.preventDefault();
                    //             });
                    //             // let quantity = maxqnty;
                    //             // if (quantity === 1000000) {
                    //             //   setMaxqnty(parseInt(item?.maxQnty));
                    //             //   quantity = parseInt(item?.maxQnty);
                    //             // }
                    //             if (e.target.value <= data?.maxQnty) {
                    //               setQnty(e.target.value);

                    //               // const config = {
                    //               //   headers: {
                    //               //     authorization: globleuser?.data?.token,
                    //               //   },
                    //               // };
                    //               // setDeleteCart(!deleteCart);
                    //             }
                    //           }}
                    //           // onInput={
                    //           //   (this.value =
                    //           //     !!this.value && Math.abs(this.value) >= 0
                    //           //       ? Math.abs(this.value)
                    //           //       : null)
                    //           // }
                    //           type="number"
                    //           min={1}
                    //           max={itemData?.psizes[selectedSize]?.qauntity}
                    //           name=""
                    //           id=""
                    //           value={qnty}
                    //           style={{ width: "100%" }}
                    //         />
                    //       </div>
                    //     </div>
                    //   </div>
                    // </div>
                    <CartData
                      data={data}
                      key={key}
                      deleteCart={deleteCart}
                      setDeleteCart={setDeleteCart}
                    ></CartData>
                  );
                })
              )}
            </div>
            <div className={styles.OrderSummarrydiv}>
              <article className={styles.writtenValue}>
                <span className={styles.written}>Subtotal</span>
                <span className={styles.OrderValue}>
                  ₹{itemId ? price * qnty : totalcartPrice}
                </span>
              </article>
              <article className={styles.writtenValue}>
                <span className={styles.written}>Shiping</span>
                <span className={styles.OrderValue}>₹{shipping}</span>
              </article>
              <article className={styles.writtenValue}>
                <span className={styles.written}>Tax</span>
                <span className={styles.OrderValue}>
                  ₹
                  {itemId
                    ? Math.ceil(((price * qnty) / 100) * 12)
                    : Math.ceil((totalcartPrice / 100) * 12)}
                </span>
              </article>
              <div className={styles.PlaceOrderButtondiv}>
                <article>
                  <span className={styles.orderTotal1}>Total</span>
                  <span className={styles.Ordervalue1}>
                    ₹{" "}
                    {itemId
                      ? (
                          price * qnty +
                          shipping +
                          Math.ceil((price * qnty * 12) / 100)
                        ).toFixed(2)
                      : (
                          totalcartPrice +
                          shipping +
                          Math.ceil((totalcartPrice / 100) * 12)
                        ).toFixed(2)}
                  </span>
                </article>
                <button
                  onClick={() => {
                    setIsOrderPlaced(true);
                    if (mop === "Razor Pay") {
                      getPayment();
                    } else if (mop === "Cash on Delivery") {
                      codPayment();
                    }
                  }}
                  className={styles.Pobtn}
                  disabled={isOrderPlaced}
                  style={{ cursor: isOrderPlaced ? "not-allowed" : "pointer" }}
                >
                  Place Order
                </button>
              </div>
              <span className={styles.tAndC}>
                This is the final step, after you click Place order button, you
                will be redirected to the payment page.
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (windowWidth > 660) {
    return (
      <div
        className={styles.mainbodyabove900}
        style={{
          // height: "700px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "18px",
          fontFamily: "Montserrat",
        }}
      >
        <ToastContainer />
        <h2
          style={{
            fontWeight: "600",
            width: "100%",
            paddingLeft: "30px",
            paddingBottom: "30px",
            borderBottom: "2px solid #C4C4C4",
          }}
        >
          Check Out
        </h2>
        <Dialog
          open={open}
          onClose={handleClickClose}
          scroll={"paper"}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <DialogTitle id="scroll-dialog-title">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span>Address</span>
              <IconButton
                aria-label="close"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <CancelIcon />
              </IconButton>
            </div>
          </DialogTitle>
          <DialogContent dividers={true}>
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
              <div>
                <Grid>
                  {/* <form> */}

                  <Grid container spacing={2}>
                    <Grid xs={12} sm={6} item>
                      <TextField
                        onChange={(e) => {
                          let arr = globalShippingAddress;
                          arr[defaultaddress].name = e.target.value;
                          setGlobalShippingAddress([...arr]);
                        }}
                        placeholder="Enter Vendor Id"
                        label="Name"
                        variant="outlined"
                        fullWidth
                        required
                        value={globalShippingAddress[defaultaddress]?.name}
                      />
                      {/* {error.vendorId && error.vendorId.length && (
                          <Alert severity="error">{error.vendorId}</Alert>
                        )} */}
                    </Grid>
                    <Grid xs={12} sm={6} item>
                      <TextField
                        onChange={(e) => {
                          const arr = globalShippingAddress;
                          arr[defaultaddress].number = e.target.value;
                          setGlobalShippingAddress([...arr]);
                        }}
                        placeholder="Number"
                        label="Number"
                        variant="outlined"
                        fullWidth
                        required
                        value={globalShippingAddress[defaultaddress]?.number}
                      />
                      {/* {error.name && error.name.length && (
                          <Alert severity="error">{error.name}</Alert>
                        )} */}
                    </Grid>
                    <Grid xs={12} sm={12} item>
                      <TextField
                        onChange={(e) => {
                          const arr = globalShippingAddress;
                          arr[defaultaddress].address1 = e.target.value;
                          setGlobalShippingAddress([...arr]);
                        }}
                        placeholder="Flat No,Building"
                        label="Flat No,Building"
                        variant="outlined"
                        fullWidth
                        required
                        value={globalShippingAddress[defaultaddress]?.address1}
                      />
                      {/* {error.name && error.name.length && (
                          <Alert severity="error">{error.name}</Alert>
                        )} */}
                    </Grid>
                    <Grid xs={12} sm={12} item>
                      <TextField
                        onChange={(e) => {
                          const arr = globalShippingAddress;
                          arr[defaultaddress].address2 = e.target.value;
                          setGlobalShippingAddress([...arr]);
                        }}
                        placeholder="Area,Street,Sector,Village"
                        label="Area,Street,Sector,Village"
                        variant="outlined"
                        fullWidth
                        required
                        value={globalShippingAddress[defaultaddress]?.address2}
                      />
                      {/* {error.name && error.name.length && (
                          <Alert severity="error">{error.name}</Alert>
                        )} */}
                    </Grid>
                    <Grid xs={12} sm={12} item>
                      <TextField
                        onChange={(e) => {
                          const arr = globalShippingAddress;
                          arr[defaultaddress].landmark = e.target.value;
                          setGlobalShippingAddress([...arr]);
                        }}
                        placeholder="Landmark"
                        label="Landmark"
                        variant="outlined"
                        fullWidth
                        required
                        value={globalShippingAddress[defaultaddress]?.landmark}
                      />
                      {/* {error.name && error.name.length && (
                          <Alert severity="error">{error.name}</Alert>
                        )} */}
                    </Grid>
                    <Grid xs={12} sm={6} item>
                      <TextField
                        label="PinCode"
                        onChange={(e) => {
                          const arr = globalShippingAddress;
                          arr[defaultaddress].pincode = e.target.value;
                          setGlobalShippingAddress([...arr]);
                        }}
                        placeholder="PinCode"
                        sx={{
                          width: "100%",
                        }}
                        value={globalShippingAddress[defaultaddress]?.pincode}
                      >
                        {/* {CategotiesListVenue.map((item, key) => (
                            <MenuItem key={key} value={item.name}>
                              {item.name}
                            </MenuItem>
                          ))} */}
                      </TextField>
                    </Grid>

                    <Grid xs={12} sm={6} item>
                      <TextField
                        onChange={(e) => {
                          const arr = globalShippingAddress;
                          arr[defaultaddress].city = e.target.value;
                          setGlobalShippingAddress([...arr]);
                        }}
                        placeholder="Town/City"
                        label="Town/City"
                        variant="outlined"
                        fullWidth
                        value={globalShippingAddress[defaultaddress]?.city}
                      />
                    </Grid>

                    <Grid xs={12} sm={6} item>
                      <TextField
                        label="State"
                        onChange={(e) => {
                          const arr = globalShippingAddress;
                          arr[defaultaddress].state = e.target.value;
                          setGlobalShippingAddress([...arr]);
                        }}
                        placeholder="Select State"
                        sx={{
                          width: "100%",
                        }}
                        value={globalShippingAddress[defaultaddress]?.state}
                      >
                        {/* {cities.map((item, key) => (
                            <MenuItem key={key} value={item}>
                              {item}
                            </MenuItem>
                          ))} */}
                      </TextField>
                    </Grid>
                    <Grid xs={12} sm={6} item>
                      <TextField
                        onChange={(e) => {
                          const arr = globalShippingAddress;
                          arr[defaultaddress].email = e.target.value;
                          setGlobalShippingAddress([...arr]);
                        }}
                        placeholder="Email"
                        label="Email"
                        variant="outlined"
                        fullWidth
                        value={globalShippingAddress[defaultaddress]?.email}
                      />
                    </Grid>
                  </Grid>
                  {/* </form> */}
                </Grid>
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                const newarr = [...globalShippingAddress];
                newarr.pop();
                setGlobalShippingAddress(newarr);
                setdefaultaddress(0);
                setOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                handleSubmit();
              }}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openpay}
          onClose={handleClosepay}
          // PaperComponent={PaperComponent}
          aria-labelledby="draggable-dialog-title"
        >
          <Box
            sx={{
              width: "636px",
              height: "747px",
              backgroundColor: "#FFFFFF",
              boxShadow: "0px 63.7349px 33.5807px rgba(0, 0, 0, 0.15)",
              borderRadius: "74px",
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              color: "black",
              padding: "45px",
            }}
          >
            <Stack alignItems={"center"} justifyContent={"center"} spacing={4}>
              <Typo4>Payment Method</Typo4>
              <Stack>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value="female"
                    control={
                      <Radio
                        sx={{
                          color: "green",
                          "&.Mui-checked": {
                            color: "green",
                          },
                        }}
                      />
                    }
                    label={
                      <img
                        style={{
                          width: "259px",
                          height: "155px",
                          borderRadius: "35px",
                          // boxShadow: "0px 0px 14px rgba(0, 0, 0, 0.15)"
                        }}
                        src={`${S3PROXY}/public/logo/webp/RazorPay.webp`}
                      />
                    }
                  />
                  <FormControlLabel
                    value="male"
                    control={
                      <Radio
                        disabled
                        sx={{
                          color: "green",
                          "&.Mui-checked": {
                            color: "green",
                            // background:
                            //   'linear-gradient(92.19deg, #9FF897 1.3%, #C9FF56 98.71%), #D9D9D9',
                            // '-webkit-text-fill-color': 'transparent',
                            // '-webkit-background-clip': 'text',
                          },
                        }}
                      />
                    }
                    label={
                      <img
                        style={{
                          width: "259px",
                          height: "155px",
                          borderRadius: "35px",
                          // boxShadow: "0px 0px 14px rgba(0, 0, 0, 0.15)"
                        }}
                        src={`${S3PROXY}/public/logo/webp/UPI.webp`}
                      />
                    }
                  />
                </RadioGroup>
              </Stack>
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"start"}
                gap={2}
                sx={{
                  marginRight: "135px !important",
                }}
              >
                <img src={`${S3PROXY}/public/icons/webp/money.webp`} />
                <h3>Total</h3>
                <Box
                  sx={{
                    width: "282.35px",
                    height: "52.77px",
                    background: " #FFFFFF",
                    boxShadow: "0px 0px 9.5945px rgba(0, 0, 0, 0.25)",
                    borderRadius: "61.6789px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "Poppins",
                    fontStyle: "normal",
                    fontWeight: "700",
                    fontSize: "22px",
                    lineHeight: "34px",
                  }}
                >
                  Rs{" "}
                  {itemId
                    ? itemData?.psizes[selectedSize]?.priceExclusive -
                      Math.floor(
                        (itemData?.psizes[selectedSize]?.priceExclusive *
                          itemData?.psizes[selectedSize]?.discount) /
                          100
                      )
                    : totalcartPrice}
                </Box>
              </Stack>
              <Button
                sx={{
                  width: "300px",
                  height: "83px",
                  background:
                    "linear-gradient(92.19deg, #9FF897 1.3%, #C9FF56 98.71%), #D9D9D9",
                  borderRadius: "63px",
                  fontFamily: "Poppins",
                  fontStyle: "normal",
                  fontWeight: "500",
                  fontSize: "37px",
                  lineHeight: "54px",
                  color: "black",
                  textTransform: "none",
                }}
                onClick={() => getPayment()}
              >
                Next
              </Button>
            </Stack>
          </Box>
        </Dialog>
        <div className={styles.MainAboveall}>
          <div className={styles.leftsegment}>
            <div className={styles.DeliveryAaDDRESS}>
              <div className={styles.heading}>Delivery Address</div>

              {globalShippingAddress.length ? (
                changes ? (
                  <div
                    className={styles.changes}
                    onClick={() => setchanges(false)}
                  ></div>
                ) : (
                  <div
                    className={styles.changes}
                    onClick={() => setchanges(true)}
                  >
                    Change
                  </div>
                )
              ) : (
                <></>
              )}
              <div className={styles.OneAddress}>
                {globalShippingAddress.length ? (
                  changes === false ? (
                    <>
                      <span>
                        {globalShippingAddress[defaultaddress]?.name},
                        {globalShippingAddress[defaultaddress]?.address1}{" "}
                        {globalShippingAddress[defaultaddress]?.address2}{" "}
                        {globalShippingAddress[defaultaddress]?.landmark}{" "}
                        {globalShippingAddress[defaultaddress]?.city}{" "}
                        {globalShippingAddress[defaultaddress]?.state}{" "}
                        {globalShippingAddress[defaultaddress]?.country} -{" "}
                        {globalShippingAddress[defaultaddress]?.pincode}
                      </span>
                      <article>
                        <span>
                          Phone Number :{" "}
                          {globalShippingAddress[defaultaddress]?.number}
                        </span>{" "}
                        <br />
                        <span>
                          Email : {globalShippingAddress[defaultaddress]?.email}
                        </span>{" "}
                        <br />
                        <span
                          onClick={() => {
                            setOpen(true);
                          }}
                        >
                          Edit Address
                        </span>
                      </article>
                    </>
                  ) : (
                    <></>
                  )
                ) : (
                  <span
                    onClick={() => {
                      setdefaultaddress(globalShippingAddress.length);
                      const newArr = [
                        ...globalShippingAddress,
                        {
                          address1: "",
                          address2: "",
                          landmark: "",
                          state: "",
                          country: "",
                          city: "",
                          pincode: "",
                          name: "",
                          email: "",
                          number: "",
                        },
                      ];
                      setGlobalShippingAddress([...newArr]);
                      setOpen(true);
                    }}
                    className={styles.addnewAddress}
                  >
                    Add New Address +
                  </span>
                )}
              </div>
            </div>
            {changes && (
              <div className={styles.slectAddress}>
                <span className={styles.heading}>Your Addresses</span>
                {globalShippingAddress?.map((data, key) => {
                  return (
                    <div className={styles.oneaddressseg}>
                      <div>
                        <input
                          type="radio"
                          name="SelectedAddress"
                          id=""
                          checked={key === defaultaddress}
                          onClick={() => setdefaultaddress(key)}
                        />
                      </div>
                      <div className={styles.Addresswrit}>
                        <span>
                          {data?.name},{data?.address1} {data?.address2}{" "}
                          {data?.landmark} {data?.city} {data?.state}{" "}
                          {data?.country} - {data?.pincode}
                        </span>
                        <article>
                          <span>Phone Number : {data?.number}</span> <br />
                          <span>Email : {data?.email}</span> <br />
                          <span
                            onClick={() => {
                              setdefaultaddress(key);
                              setOpen(true);
                            }}
                          >
                            Edit Address
                          </span>
                        </article>
                      </div>
                    </div>
                  );
                })}

                <div className={styles.addnewAddress}>
                  <span
                    onClick={() => {
                      setdefaultaddress(globalShippingAddress.length);
                      const newArr = [
                        ...globalShippingAddress,
                        {
                          address1: "",
                          address2: "",
                          landmark: "",
                          state: "",
                          country: "",
                          city: "",
                          pincode: "",
                          name: "",
                          email: "",
                          number: "",
                        },
                      ];
                      setGlobalShippingAddress([...newArr]);
                      setOpen(true);
                    }}
                    className={styles.addnewAddress}
                  >
                    Add New Address +
                  </span>
                </div>
                <div>
                  <button
                    className={styles.usethisaddress}
                    onClick={() => {
                      setchanges(false);
                    }}
                  >
                    Use This Address
                  </button>
                </div>
              </div>
            )}
            <div className={styles.PaymentMethods}>
              <div className={styles.heading}>Select a payment Mode</div>

              {changes1 ? (
                <div
                  className={styles.changes}
                  onClick={() => setchanges(false)}
                ></div>
              ) : (
                <>
                  <div
                    className={styles.changes}
                    onClick={() => setchanges1(true)}
                  >
                    Change
                  </div>
                </>
              )}
              {!changes1 ? (
                <div className={styles.OneAddress}>{mop} </div>
              ) : (
                <></>
              )}
            </div>
            <br />
            {changes1 ? (
              <div className={styles.methods}>
                <div>
                  <input
                    type="radio"
                    name="paymentMethod"
                    id=""
                    checked={mop === "Razor Pay"}
                    onClick={() => {
                      setMop("Razor Pay");
                    }}
                  />
                  <img
                    style={{
                      width: "120px",
                      height: "120px",
                      // borderRadius: "35px",
                      // boxShadow: "0px 0px 14px rgba(0, 0, 0, 0.15)"
                    }}
                    src={`${S3PROXY}/public/logo/webp/RazorPay.webp`}
                  />
                </div>
                <div>
                  <input
                    onClick={() => {
                      setMop("Cash on Delivery");
                    }}
                    type="radio"
                    name="paymentMethod"
                    id=""
                    checked={mop === "Cash on Delivery"}
                  />
                  <span>Cash On Delivery</span>
                </div>
                <div>
                  <button
                    className={styles.usethisaddress}
                    onClick={() => {
                      setchanges1(false);
                    }}
                  >
                    Use This Mode
                  </button>
                </div>
              </div>
            ) : (
              <></>
            )}
            <div className={styles.ViewOrder}>
              <div className={styles.heading}>Review Items</div>
              {itemId ? (
                <div className={styles.detailcard}>
                  <span
                    style={{
                      // padding: "7px",
                      fontSize: "19px",
                      fontWeight: "500",
                    }}
                  >
                    Delivery Date :{" "}
                    <span style={{ color: "#F60B44" }}>
                      {today.clone().add(5, "days").format("DD MMM, YYYY")}
                    </span>
                  </span>
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: "500",
                      paddingBottom: "5px",
                    }}
                  >
                    Item dispatch by Wedfield
                  </span>
                  <div style={{ display: "flex" }}>
                    <div className={styles.itemsimg}>
                      {itemData?.mainImages ? (
                        <Image
                          height={0}
                          width={0}
                          src={`${S3PROXY}${itemData?.mainImages}`}
                          alt="hii"
                        />
                      ) : (
                        <></>
                      )}
                    </div>
                    <div className={styles.ItemDetail}>
                      <span style={{ fontWeight: "500" }}>
                        {itemData?.name}
                      </span>
                      <span>Size : {selectedSize}</span>
                      <span>
                        Price :{" "}
                        {itemData?.psizes[selectedSize]?.priceExclusive -
                          Math.floor(
                            (itemData?.psizes[selectedSize]?.priceExclusive *
                              itemData?.psizes[selectedSize]?.discount) /
                              100
                          )}
                      </span>
                      <div className={styles.qty}>
                        <div className={styles.Qty1}>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              width: "100%",
                            }}
                          >
                            <label htmlFor="Qty">Qty</label>
                            <span> </span>
                            <input
                              onChange={async (e) => {
                                addEventListener("keydown", (e) => {
                                  e.preventDefault();
                                });
                                // let quantity = maxqnty;
                                // if (quantity === 1000000) {
                                //   setMaxqnty(parseInt(item?.maxQnty));
                                //   quantity = parseInt(item?.maxQnty);
                                // }
                                if (
                                  e.target.value <=
                                  itemData?.psizes[selectedSize]?.qauntity
                                ) {
                                  setQnty(e.target.value);
                                }
                              }}
                              type="number"
                              min={1}
                              max={itemData?.psizes[selectedSize]?.qauntity}
                              name=""
                              id=""
                              value={qnty}
                              style={{ width: "100%" }}
                            />
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <button
                                style={{
                                  background: "transparent",
                                  color: "white",
                                  border: "none", // Remove border if needed
                                }}
                                onClick={() => setQnty(Number(qnty) + 1)}
                              >
                                +
                              </button>
                              <button
                                style={{
                                  background: "transparent",
                                  color: "white",
                                  border: "none", // Remove border if needed
                                }}
                                onClick={() => {
                                  qnty > 1 && setQnty(qnty - 1);
                                }}
                              >
                                -
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                allData?.map((data, key) => {
                  return (
                    // <div className={styles.detailcard}>
                    //   <div className={styles.itemsimg}>
                    //     < src={`${S3PROXY}${data?.bannerImage}`} alt="hii" />
                    //   </div>
                    //   <div className={styles.ItemDetail}>
                    //     <span>{data?.name}</span>
                    //     <span>Size : {data?.size}</span>
                    //     <span>Price : {data?.price}</span>
                    //     <div className={styles.qty}>
                    //       <div className={styles.Qty1}>
                    //         <label htmlFor="Qty">Quantity</label>
                    //         <input
                    //           onChange={async (e) => {
                    //             addEventListener("keydown", (e) => {
                    //               e.preventDefault();
                    //             });
                    //             // let quantity = maxqnty;
                    //             // if (quantity === 1000000) {
                    //             //   setMaxqnty(parseInt(item?.maxQnty));
                    //             //   quantity = parseInt(item?.maxQnty);
                    //             // }
                    //             if (e.target.value <= data?.maxQnty) {
                    //               setQnty(e.target.value);

                    //               // const config = {
                    //               //   headers: {
                    //               //     authorization: globleuser?.data?.token,
                    //               //   },
                    //               // };
                    //               // setDeleteCart(!deleteCart);
                    //             }
                    //           }}
                    //           // onInput={
                    //           //   (this.value =
                    //           //     !!this.value && Math.abs(this.value) >= 0
                    //           //       ? Math.abs(this.value)
                    //           //       : null)
                    //           // }
                    //           type="number"
                    //           min={1}
                    //           max={itemData?.psizes[selectedSize]?.qauntity}
                    //           name=""
                    //           id=""
                    //           value={qnty}
                    //           style={{ width: "100%" }}
                    //         />
                    //       </div>
                    //     </div>
                    //   </div>
                    // </div>
                    <CartData
                      data={data}
                      key={key}
                      deleteCart={deleteCart}
                      setDeleteCart={setDeleteCart}
                    ></CartData>
                  );
                })
              )}
            </div>
            <div className={styles.btndiv2}>
              <button
                className={styles.placeorder}
                onClick={() => {
                  setIsOrderPlaced(true);
                  if (mop === "Razor Pay") {
                    getPayment();
                  } else if (mop === "Cash on Delivery") {
                    codPayment();
                  }
                }}
                disabled={isOrderPlaced}
                style={{ cursor: isOrderPlaced ? "not-allowed" : "pointer" }}
              >
                Place Order
              </button>
              <div className={styles.finalorderprice}>
                <span className={styles.Ordertotalspan}>
                  Order Total : ₹{" "}
                  {itemId
                    ? (
                        price * qnty +
                        shipping +
                        Math.ceil((price * qnty * 12) / 100)
                      ).toFixed(2)
                    : (
                        totalcartPrice +
                        shipping +
                        Math.ceil((totalcartPrice / 100) * 12)
                      ).toFixed(2)}
                </span>
                <span className={styles.termsAndConditionspan}>
                  This is the final step, after you click Place order button,
                  you will be redirected to the payment page.
                </span>
                {/*             
                  By placing your order, you agree to Terms and conditions of
                  use. */}
              </div>
            </div>
          </div>
          <div className={styles.rightsegment}>
            <div className={styles.summarycard}>
              {itemId ? (
                <div className={styles.ordersumm}>
                  <div className={styles.btndiv1}>
                    <button
                      onClick={() => {
                        setIsOrderPlaced(true);
                        if (mop === "Razor Pay") {
                          getPayment();
                        } else if (mop === "Cash on Delivery") {
                          codPayment();
                        }
                      }}
                      className={styles.placeorder1}
                      disabled={isOrderPlaced}
                      style={{
                        cursor: isOrderPlaced ? "not-allowed" : "pointer",
                      }}
                    >
                      Place your order
                    </button>
                    <span style={{ fontSize: "11.5px" }}>
                      By placing your order you agree to our terms and
                      conditions
                    </span>
                  </div>
                  <article>
                    <span>Items</span>
                    <span>
                      ₹{price * qnty}
                      .00
                    </span>
                  </article>
                  <article>
                    <span>Shipping & handling</span>
                    <span>₹{shipping}</span>
                  </article>
                  {mop == "Cash on Delivery" && (
                    <article>
                      <span style={{ fontSize: "11px" }}>
                        COD charges ₹ {Math.ceil(price * qnty * 0.02 * 1.12)}
                      </span>
                    </article>
                  )}
                  <article>
                    <span>Estimated tax</span>
                    <span>
                      ₹{" "}
                      {itemId
                        ? Math.ceil(((price * qnty) / 100) * 12)
                        : Math.ceil((totalcartPrice / 100) * 12)}
                    </span>
                  </article>
                  <article className={styles.ordertotal1}>
                    <span>Order Total</span>
                    <span>
                      {" "}
                      ₹
                      {(
                        price * qnty +
                        shipping +
                        Math.ceil((price * qnty * 12) / 100)
                      ).toFixed(2)}
                    </span>
                  </article>
                </div>
              ) : (
                <div className={styles.ordersumm}>
                  <span className={styles.ordersummspan}>Order Summary</span>
                  <article>
                    <span>Items</span>
                    <span>₹{totalcartPrice}</span>
                  </article>
                  <article>
                    <span>Shipping & handling</span>
                    <span>₹{shipping}</span>
                  </article>
                  {/* {mop=="Cash on Delivery" && (<article>
                    <span style={{fontSize: '11px'}}>COD charges ₹ {' '}{Math.ceil(cart*qnty * 0.02*1.18)}</span>
                  </article>)} */}
                  <article>
                    <span>Estimated tax</span>
                    <span>₹{Math.ceil((totalcartPrice / 100) * 12)}</span>
                  </article>
                  <article className={styles.ordertotal1}>
                    <span>Order Total</span>
                    <span>
                      {" "}
                      ₹
                      {(
                        totalcartPrice +
                        shipping +
                        Math.ceil((totalcartPrice / 100) * 12)
                      ).toFixed(2)}
                    </span>
                  </article>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Order;

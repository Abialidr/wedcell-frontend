import React, { useState } from "react";
import styles from "../../styles/NewVenue.module.scss";
import { PROXY, S3PROXY } from "../../config/index";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/reducer/appEssentials";
import { useRouter } from "next/router";
import { venueval } from "../../yupValidation/inhouseValidation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCheckOutKeyQuery, useCheckOutMutation } from "redux/Api/others.api";
import { useCreateInhouseforvenueMutation } from "redux/Api/intheHouse.api";
import Head from "next/head";

const Venue = () => {
  const globleuser = useSelector(selectUser);

  const [activeClass, setActiveClass] = useState(true);
  const [amount, setAmount] = useState(250);
  const [inputValues, setInputValues] = useState({
    name: "",
    number: "",
    city: "",
    budgetHotel: "",
    toe: "",
    doe: "",
  });
  const arr = [1, 2];
  const handleChange = (e) => {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  };
  const router = useRouter();
  const [checkOut] = useCheckOutMutation();
  const [createInhouseforvenue] = useCreateInhouseforvenueMutation();
  const { data: checkOutKey } = useCheckOutKeyQuery();
  const submitHandler = async (e) => {
    try {
      await venueval.validate(inputValues);
      if (globleuser) {
        const { data: amountData } = await checkOut({
          price: amount,
        });
        const { data: keyData } = { data: checkOutKey };
        const options = {
          key: keyData?.key,
          amount: amountData?.amount,
          currency: "INR",
          name: "WedField",
          description: "Test Transaction",
          image: "/assests/webp/icon-only.png",
          order_id: amountData?.id,
          // callback_url: `${PROXY}/api/v1/verify/payment`,
          prefill: {
            name: inputValues.name,
            contact: inputValues.number,
          },
          notes: {
            address: "Delhi",
          },
          theme: {
            color: "#3399cc",
          },
          handler: async (res) => {
            const data = {
              name: inputValues.name,
              number: inputValues.number,
              city: inputValues.city,
              price: 250,
              doe: inputValues.doe,
              toe: inputValues.toe,
              budgetHotel: inputValues.budgetHotel,
              payment_id: res.razorpay_payment_id,
            };
            inputValues.payment_id = res.razorpay_payment_id;
            inputValues.type = "venue";
            inputValues.price = "250";
            const res1 = await createInhouseforvenue(data);
            if (res1?.data) {
              // setInputValues({
              //   name: '',
              //   number: '',
              //   city: '',
              //   budgetHotel: '',
              //   toe: '',
              //   doe: '',
              // });
              // alert('your inquiry is successfully submited');
              toast.success(`your inquiry is successfully submited`, {
                position: "top-right",
                autoClose: 1000,
              });
            } else {
              console.error(err);
            }
          },
        };

        var rzp1 = new window.Razorpay(options);
        rzp1.open();
      } else {
        router.push("/customer-login");
      }
    } catch (e) {
      toast.error(`${e}`, {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Head>
        <title>Venue Booking Service – WedField</title>
        <meta
          name="description"
          content="Get rid of all your time and Hassle of Browsing Through Hundreds of Profiles. Get Your Venue Booked By Our Venue Expert in Best Price – Wedfield."
        />
        <link name="canonical" href={`https://wedfield.com/in-house/venue`} />
        <h1>Venue Booking Service</h1>
        <h2>Best Price Guranteed</h2>
        <h2>Personalised Site Visit</h2>
        <h2>Convenience</h2>
        <h3>How it Works</h3>
        <h4>WedField Gold Plan @ Rs.250/-</h4>
      </Head>
      <ToastContainer />
      <div className={styles.mainWrapper}>
        <div className={styles.bgWrapper}>
          <div className={styles.innerContent1}>
            <h1>Venue Booking Service</h1>
            <p>
              Personally curated list of venue options by experts specially for
              your requirements WedField Good has best price guarantees for its
              vendor partners and you can avail of this through Genie service
              Dedicated RM to help negotiate with the venues on your behalf
              Saves you time & hassle of browsing through hundreds of profiles
            </p>
          </div>
        </div>
      </div>
      <div className={styles.services}>
        <div className={styles.left}>
          <div className={styles.textWrapper}>
            <div>
              <img src={`${S3PROXY}/public/images/bs.png`} alt="" />
              <span>
                <h3>Best price guarnteed</h3>

                <p>Upto 30% or more discount from market prices</p>
              </span>
            </div>
            <div>
              <img src={`${S3PROXY}/public/images/ps.png`} alt="" />
              <span>
                <h3>Personalized Site Visits</h3>
                <p>Meet the decision makers in the venue</p>
              </span>
            </div>
            <div>
              <img src={`${S3PROXY}/public/images/cv.png`} alt="" />
              <span>
                <h3>Convenience</h3>
                <p>Shortlist venues from the comfort of home</p>
              </span>
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <div>
            <h3>How it works...</h3>
            <div className={styles.rightSideContent}>
              <div className={styles.points}>
                <div>
                  <p>
                    {" "}
                    <span>1.</span> Share requirements and book premium
                    concierge service
                  </p>
                </div>

                <div>
                  <p>
                    <span>2.</span> Receive suggestions from Venue Expert and
                    shortlist venues to visit
                  </p>
                </div>

                <div>
                  <p>
                    {" "}
                    <span>3.</span> Get upto 30% offf or finalised venues
                  </p>
                </div>
                {/* <div className={styles.pointsBtn}>
                  <button>Know more</button>
                </div> */}
              </div>
            </div>
          </div>
          <img src={`${S3PROXY}/public/images/vendueImg.svg`} alt="" />
        </div>
      </div>

      <div className={styles.plansWrapper}>
        <div className={styles.wrapper}>
          <div className={styles.plansLeft}>
            {/* WedField Gold plan @ Rs. 500/- Rs. 250/- */}
            <div className={styles.heading}>
              <h2>
                <span>
                  WedField Gold Plan <br /> @
                </span>
                <span className={styles.twofive}>Rs. 250/-</span>{" "}
                <span className={styles.five}>Rs. 250/-</span>
              </h2>
            </div>
            <div className={styles.contentInfo}>
              <div className={styles.infoRight}>
                <h3>
                  <img src={`${S3PROXY}/public/images/starts.png`} alt="" />
                  Personally curated list of venue options by experts specially
                  for your requirements
                </h3>
                <h3>
                  <img src={`${S3PROXY}/public/images/starts.png`} alt="" />
                  WedField Good has best price guarantees for its vendor
                  partners and you can avail of this through Genie service
                </h3>
                <h3>
                  <img src={`${S3PROXY}/public/images/starts.png`} alt="" />
                  Dedicated RM to help negotiate with the venues on your behalf
                </h3>
                <h3>
                  <img src={`${S3PROXY}/public/images/starts.png`} alt="" />
                  Saves you time & hassle of browsing through hundreds of
                  profiles
                </h3>
              </div>
            </div>
          </div>
          <div className={styles.plansRight}>
            <div action="">
              <h4>Enter your Details</h4>
              <div className={styles.inputWrapper}>
                <input
                  type="text"
                  value={inputValues.name}
                  name="name"
                  placeholder=" name*"
                  onChange={handleChange}
                />
                <input
                  type="text"
                  value={inputValues.number}
                  name="number"
                  placeholder=" number*"
                  onChange={handleChange}
                />

                <input
                  type="text"
                  value={inputValues.city}
                  name="city"
                  placeholder=" city"
                  onChange={handleChange}
                />

                <input
                  type="date"
                  value={inputValues.doe}
                  name="doe"
                  placeholder=" Date Of Event"
                  onChange={handleChange}
                />

                <input
                  type="text"
                  value={inputValues.toe}
                  name="toe"
                  placeholder=" Type Of Event"
                  onChange={handleChange}
                />
                <input
                  type="text"
                  value={inputValues.budgetHotel}
                  name="budgetHotel"
                  placeholder="Budget Of Hotel"
                  onChange={handleChange}
                />
                <div className={styles.submitBtn}>
                  <button onClick={() => submitHandler()} type="submit">
                    Submit
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

export default Venue;

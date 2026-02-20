import React, { useEffect, useState } from "react";
import Styles from "../styles/Navbar.module.css";
import Image from "next/image";
import { AiOutlineClose } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";
import Link from "next/link";
import { useRouter } from "next/router";

import { useDispatch } from "react-redux";
import { S3PROXY } from "../../config";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const [auth, setAuth] = useState();
  const [role, setRole] = useState();
  const dispatch = useDispatch();

  const router = useRouter();

  const CategotiesList = [
    {
      name: "Food",
      subCategories: [
        "Chaat Counter",
        "Fruit Counter",
        "Catering services",
        "Pan Counter",
        "Bar Tenders",
      ],
    },
    {
      name: "Invites & Gifts",
      subCategories: ["invitation card", "invitation gift"],
    },
    {
      name: "Music & Dance",
      subCategories: [
        "Anchor",
        "Choreographer",
        "DJ",
        "Ghodi & Baggi",
        "Dhol",
        "Live band",
        "DJ based Band",
        "Male & Female Singer",
        "Dance Troupe",
      ],
    },

    {
      name: "Makeup",
      subCategories: ["bridal makeup", "Groom Makeup", "Family Makeup"],
    },
    {
      name: "Mehndi",
      subCategories: ["Bride Mehndi", "Family Member Mehndi"],
    },
    {
      name: "Photographers",
      subCategories: [
        "Cinema/Video",
        "Album",
        "Collage Maker",
        "Drone",
        "Pre Wedding Shoot",
      ],
    },
    {
      name: "Planning & Decor",
      subCategories: ["Wedding Decor", "Celebrities Management"],
    },
  ];

  const CategotiesListVenue = [
    {
      name: "Hotel",
      subCategories: [],
    },
    {
      name: "Resort",
      subCategories: [],
    },
    {
      name: "Farm House",
      subCategories: [],
    },
    {
      name: "Banquet Hall",
      subCategories: [],
    },
    {
      name: "Lawn",
      subCategories: [],
    },
    {
      name: "Destination Wedding",
      subCategories: [],
    },
  ];

  useEffect(() => {
    const auth = localStorage.getItem("wedfield");
    const role = JSON.parse(localStorage.getItem("role"));
    setAuth(auth);
    setRole(role);
  }, [auth]);

  return (
    <div
      className={Styles.sidebar_container}
      style={{
        transition: "all 450ms",
        transform: isSidebarOpen ? "translateX(0)" : "translateX(100%)",
      }}
    >
      <div className="sidebar-header d-flex justify-content-between align-items-center  px-3">
        <div className="logo-container">
          <Image
            src={`${S3PROXY}/public/images/webp/logo.webp`}
            width="100"
            height="57"
            objectFit="contain"
          />
        </div>
        <button
          className="clos-btn btn p-0 text-white"
          onClick={() => setIsSidebarOpen(false)}
        >
          <AiOutlineClose />
        </button>
      </div>

      <div
        className={`${Styles.links_container} d-flex align-items-center text-white position-relative  w-100 justify-content-between `}
      >
        <span className="d-block">Venues</span>

        <span className={`d-block ${Styles.icon}`}>
          <BiChevronDown />
        </span>

        <div
          className={Styles.dropdown}
          style={{
            zIndex: 10,
          }}
        >
          {CategotiesListVenue?.map((item, key) => (
            <Link href="/venue" key={key}>
              <a className={Styles.dropdown_link}> {item.name}</a>
            </Link>
          ))}
        </div>
      </div>
      {/* <div className={`${Styles.links_container} d-flex align-items-center text-white  w-100 justify-content-between `}> */}
      <div
        className={`${Styles.links_container} d-flex align-items-center text-white position-relative  w-100 justify-content-between `}
      >
        <span className="d-block">Shops</span>

        <span className={`d-block ${Styles.icon}`}>
          <BiChevronDown />
        </span>
        <div
          className={Styles.dropdown}
          style={{
            zIndex: 10,
          }}
        >
          <Link href="/products">
            <a className={Styles.dropdown_link}> Bridal Wear</a>
          </Link>
          <Link href="/products">
            <a className={Styles.dropdown_link}> Groom Wear</a>
          </Link>
        </div>
      </div>
      <div
        className={`${Styles.links_container} d-flex align-items-center text-white position-relative  w-100 justify-content-between `}
      >
        <span className="d-block">Vedors</span>

        <span className={`d-block ${Styles.icon}`}>
          <BiChevronDown />
        </span>

        <div
          className={Styles.dropdown}
          style={{
            height: "250px",
            overflowY: "scroll",
            zIndex: 10,
          }}
        >
          {CategotiesList?.map((item, key) => (
            <Link href="/vendors" key={key}>
              <a className={Styles.dropdown_link}> {item.name}</a>
            </Link>
          ))}
        </div>
      </div>

      <div
        className={`${Styles.links_container} d-flex align-items-center text-white  w-100 justify-content-between `}
      >
        <a href="">Blogs</a>
      </div>
      <br />
      <div
        className={`${Styles.links_container} d-flex align-items-center text-white  w-100 justify-content-between `}
      >
        <a href="/RealWeddingHome">RealWedding</a>
      </div>

      {auth ? (
        <div
          className={`${Styles.links_container} d-flex align-items-center text-white  w-100 justify-content-between `}
        >
          {role.role === "Vendor" ? (
            <Link href="/dashboard">
              <a href="#" className="d-block">
                <br />
                Account
              </a>
            </Link>
          ) : (
            <a
              href={"#"}
              onClick={() => {
                localStorage.removeItem("wedfield");
                localStorage.setItem("wedfieldIsLoged", "");
                localStorage.removeItem("role");
                dispatch(user(undefined));
                document.cookie =
                  "id=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
                location.reload(true);
                router.push("/");
              }}
            >
              <div>
                <br />
                <a href="#">Logout</a>
              </div>
            </a>
          )}
        </div>
      ) : (
        <div
          className={`${Styles.links_container} d-flex align-items-center text-white position-relative  w-100 justify-content-between `}
        >
          <span className="d-block">Login</span>

          <span className={`d-block ${Styles.icon}`}>
            <BiChevronDown />
          </span>

          <div className={Styles.dropdown}>
            {/* <Link href="/vendor-login">
                            <a className={Styles.dropdown_link}> Vendor Login </a>
                        </Link> */}
            <Link href="/customer-login">
              <a className={Styles.dropdown_link}> Customer Login </a>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;

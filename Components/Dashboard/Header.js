import { useEffect, useRef } from "react";
import Styles from "../../styles/Dashboard/Header.module.css";
import Image from "next/image";
import Link from "next/link";
import NavStyles from "../../styles/Navbar.module.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useRouter } from "next/router";
import { useState } from "react";
import { user } from "../../redux/reducer/appEssentials";
import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import MenuIcon from "@mui/icons-material/Menu";
import { S3PROXY } from "../../config";
const Header = ({ setHeaderHeight, setShow }) => {
  const header = useRef(null);
  const dispatch = useDispatch();

  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [openVendor, setOpenVendor] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenVendor = () => setOpenVendor(true);
  const handleCloseVendor = () => setOpenVendor(false);
  useEffect(() => {
    if (header) {
      setHeaderHeight(header.current.clientHeight);
    }
  }, [header]);
  const showSidebar = () => setShow(true);

  return (
    <div ref={header} className={Styles.header}>
      <div className="nav-container d-flex align-items-center">
        <Button
          variant="outlined"
          onClick={showSidebar}
          style={{
            marginLeft: "20px",
            marginBottom: "5px",
            marginRight: "10px",
          }}
        >
          <MenuIcon />
        </Button>
        <Link href={"/"}>
          <div
            className="logo-container"
            style={{
              cursor: "pointer",
            }}
          >
            <Image
              src={`${S3PROXY}/public/webp/logo.webp`}
              width={100}
              height={30}
              objectFit="contain"
            />
          </div>
        </Link>
        <div className="d-flex nav-links-container align-items-center">
          <div
            className={`${NavStyles.nav_link} d-flex align-items-center text-white position-relative`}
          >
            <span className="d-block primary-text">My profile</span>
            <span className={`d-block ms-2 primary-text ${NavStyles.chevron}`}>
              <KeyboardArrowDownIcon />
            </span>
            <div className={NavStyles.dropdown}>
              {/* <Link href='/dashboard'>
                <span className={NavStyles.dropdown_link}> Dashboard</span>
              </Link> */}

              <span
                onClick={() => {
                  dispatch(user(undefined));
                  localStorage.removeItem("wedfield");
                  localStorage.removeItem("role");
                  localStorage.setItem("wedfieldIsLoged", "");
                  document.cookie =
                    "id=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

                  router.push("/");
                }}
              >
                <span className={NavStyles.dropdown_link}> logout</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

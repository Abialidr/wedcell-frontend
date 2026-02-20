import React, { useEffect, useRef, useState } from "react";
import styles from "./layout.module.scss";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import { Tooltip } from "@mui/material";
import useWindowSize from "@rooks/use-window-size";
import { useSelector } from "react-redux";
import { selectLocation } from "redux/reducer/appEssentials";

const SearchBar = ({ searchData, button, handleCloseSearch }) => {
  const [selectedOption, setSelectedOption] = useState("Venue");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useSelector(selectLocation);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleOptionChange = (option) => {
    setSelectedOption(option);
    setDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const [input, setInput] = useState("");
  const router = useRouter();
  const onSearch = () => {
    if (input) {
      if (selectedOption == "Venue") {
        router.push({
          pathname: `/venue/wedding/1/${location}/${input}`,
        });
      } else if (selectedOption == "Vendor") {
        router.push({
          pathname: `/vendors/wedding/1/${location}`,
          query: { search: input },
        });
      } else if (selectedOption == "Apparels") {
        router.push({
          pathname: "/products/wedding/1",
          query: { search: input },
        });
      }
      if (handleCloseSearch) {
        handleCloseSearch();
      }
    } else {
      document.getElementById("search").focus();
    }
  };
  const { innerWidth } = useWindowSize();
  return (
    <article className={styles.searchBar}>
      <Tooltip
        placement="bottom-start"
        title={
          <div
            // style={{ height: dropdownOpen ? '106px' : '0px' }}
            className={styles.dropdownContent}
          >
            <div onClick={() => handleOptionChange("Venue")}>Venue</div>
            <div onClick={() => handleOptionChange("Vendor")}>Vendor</div>
            <div onClick={() => handleOptionChange("Apparels")}>Apparels</div>
          </div>
        }
      >
        <div
          className={styles.dropdown}
          onClick={toggleDropdown}
          ref={dropdownRef}
        >
          <span className={styles.selectedOption}>{selectedOption}</span>
          <Icon icon={"raphael:arrowdown"} className={styles.arrowIcon} />
        </div>
      </Tooltip>
      <div
        style={{
          display: innerWidth > 900 ? "none" : "flex",
          height: dropdownOpen ? "106px" : "0px",
        }}
        className={styles.dropdownContent}
      >
        <div onClick={() => handleOptionChange("Venue")}>Venue</div>
        <div onClick={() => handleOptionChange("Vendor")}>Vendor</div>
        <div onClick={() => handleOptionChange("Apparels")}>Apparels</div>
      </div>
      <input
        id="search"
        type="text"
        onChange={(e) => setInput(e.target.value)}
        placeholder={`Search for ${selectedOption.toLowerCase()}...`}
        onKeyDown={(ev) => {
          if (ev.key === "Enter") {
            // Do code here
            ev.preventDefault();
            onSearch();
          }
        }}
        className={styles.searchInput}
      />
      <button
        type="submit"
        className={`${styles.formButton}`}
        onClick={() => onSearch()}
      >
        <Icon icon={"iconoir:search"} />
      </button>
    </article>
  );
};

export default SearchBar;

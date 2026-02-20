import React, { useState, useEffect, useRef } from "react";
import styles from "./index.module.scss";
import { useRouter } from "next/router";
import { Icon } from "@iconify/react";
import { S3PROXY } from "../../../config";

const TopDiv = ({ imgs, imgView }) => {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchPosition, setTouchPosition] = useState(0);
  const carouselRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    setCurrentSlide(0);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const slide = setInterval(() => {
      setCurrentSlide(
        (prevSlide) => (prevSlide + 1) % (imgs ? imgs?.length : 3)
      );
    }, 5000);

    return () => clearInterval(slide);
  }, [currentSlide, windowWidth]);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % imgs?.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + imgs?.length) % imgs?.length
    );
  };
  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
    setTouchPosition(e.touches[0].clientX);
    clearInterval(intervalRef.current); // Stop auto sliding when touched
  };

  const handleTouchMove = (e) => {
    setTouchPosition(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    const difference = touchStart - touchPosition;
    if (difference > 100) {
      nextSlide();
    } else if (difference < -100) {
      prevSlide();
    }
    setTouchStart(0);
    setTouchPosition(0);
    // Restart auto sliding after touch ends
    intervalRef.current = setInterval(() => {
      nextSlide();
    }, 5000);
  };

  const handleTouchCancel = () => {
    setTouchStart(0);
    setTouchPosition(0);
    // Restart auto sliding after touch cancels
    intervalRef.current = setInterval(() => {
      nextSlide();
    }, 5000);
  };

  return (
    <div
      className={styles.carousel}
      ref={carouselRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchCancel}
    >
      <img
        className={styles.bannerBtm}
        src={`${S3PROXY}/public/LandingPage/bannerBottom.png`}
        alt="Banner Bottom"
      />
      {imgs?.map((slide, index) => (
        <div
          key={index}
          className={`${styles.carousel_item} ${
            index === currentSlide ? styles.active : ""
          }`}
          style={{
            transform: `translateX(calc(-${currentSlide * 100}% + ${
              touchPosition - touchStart
            }px))`,
          }}
        >
          <div className={styles.absolute}>
            <hgroup>{slide.h1}</hgroup>
            <p>{slide.h2}</p>
            <button
              onClick={() => {
                router.replace(slide.link);
              }}
            >
              Book Now
            </button>
          </div>
          <img
            src={`${S3PROXY}${slide[imgView]}`}
            alt={`Slide ${index + 1}`}
            className={styles.slideImage}
          />
        </div>
      ))}
      {windowWidth > 900 && (
        <>
          <button
            onClick={prevSlide}
            className={`${styles.arrow} ${styles.prev}`}
          >
            <Icon icon={"iconamoon:arrow-left-2-duotone"} />
          </button>
          <button
            onClick={nextSlide}
            className={`${styles.arrow} ${styles.next}`}
          >
            <Icon icon={"iconamoon:arrow-right-2"} />
          </button>
        </>
      )}
    </div>
  );
};

export default TopDiv;

import React, { useState, useRef, useEffect } from "react";
import styles from "./index.module.scss";
import useWindowSize from "@rooks/use-window-size";
import { Icon } from "@iconify/react";

const DesktopCarousal = ({ children, slides, pushData }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const nextSlide = () => {
    if (currentSlide !== slides?.length - 1) {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides?.length);
    }
    if (currentSlide == slides?.length - 3) {
      pushData();
    }
  };

  const prevSlide = () => {
    if (currentSlide !== 0) {
      setCurrentSlide(
        (prevSlide) => (prevSlide - 1 + slides?.length) % slides?.length
      );
    }
  };
  return (
    <div className={styles.main}>
      <div className={styles.carousel}>
        <div
          style={{
            display: "flex",
            gap: "15px",
            width: `${slides?.length * 360}px`,
            transform: `translatex(-${currentSlide * 360}px)`,
            transition: `all 1s ease`,
          }}
        >
          {children}
        </div>

        <button
          onClick={prevSlide}
          className={`${styles.arrow} ${styles.prev}`}
        >
          <Icon width={"24px"} icon={"iconamoon:arrow-left-2-duotone"} />
        </button>

        <button
          onClick={nextSlide}
          className={`${styles.arrow} ${styles.next}`}
        >
          <Icon width={"24px"} icon={"iconamoon:arrow-right-2"} />
        </button>
      </div>
    </div>
  );
};
const MobileCarousel = ({ children, slides, pushData }) => {
  const carouselRef = useRef(null);
  const cardWidth = 300; // Width of each card
  const numVisibleCards = 2;
  const { innerWidth: windowWidth } = useWindowSize();

  const handleTouchEnd = () => {
    const container = carouselRef.current;
    if (!container) return;

    const maxScroll = container.scrollWidth - container.clientWidth;
    const currentScroll = container.scrollLeft;
    const remainingScroll = maxScroll - currentScroll;
    if (remainingScroll == 0) {
      pushData();
    }
  };
  const scrollForward = () => {
    const container = carouselRef.current;
    if (container) {
      container.scrollBy({
        left: cardWidth * numVisibleCards,
        behavior: "smooth",
      });
    }
  };

  const scrollBackward = () => {
    const container = carouselRef.current;
    if (container) {
      container.scrollBy({
        left: -cardWidth * numVisibleCards,
        behavior: "smooth",
      });
    }
  };
  return (
    <div className={styles.main}>
      <div
        className={styles.carousel}
        ref={carouselRef}
        onScroll={handleTouchEnd}
      >
        <div
          style={{
            display: "flex",
            gap: "15px",
            width: `${slides?.length * windowWidth > 900 ? 360 : 280}px`,
            transition: `all 1s ease`,
          }}
        >
          {children}
        </div>
      </div>
      <button
        onClick={scrollBackward}
        className={`${styles.arrow} ${styles.prev}`}
      >
        <Icon width={"24px"} icon={"iconamoon:arrow-left-2-duotone"} />
      </button>

      <button
        onClick={scrollForward}
        className={`${styles.arrow} ${styles.next}`}
      >
        <Icon width={"24px"} icon={"iconamoon:arrow-right-2"} />
      </button>
    </div>
  );
};

const Carousal = ({ children, slides, pushData }) => {
  return (
    <>
      <MobileCarousel slides={slides} pushData={pushData}>
        {children}
      </MobileCarousel>
    </>
  );
};

export default Carousal;

import React, { useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";
import { useRouter } from "next/router";
import ReactPlayer from "react-player/lazy";
import { Icon } from "@iconify/react";
import { S3PROXY } from "../../../config";

const Player = ({
  index,
  currentSlide,
  touchPosition,
  touchStart,
  setPlaying,
  slide,
  triger,
  playing,
}) => {
  const [player, setPlayer] = useState(false);
  useEffect(() => {
    setPlayer(false);
  }, [triger]);
  return (
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
      <ReactPlayer
        playing={player}
        onPlay={() => {
          setPlaying(true);
          setPlayer(true);
        }}
        onPause={() => {
          setPlaying(false), setPlayer(false);
        }}
        onEnded={() => {
          setPlaying(false), setPlayer(false);
        }}
        url={slide}
        controls={true}
        style={{ objectFit: "cover" }}
        width={"100%"}
        height={"100%"}
      />
    </div>
  );
};

const PlanningTools = ({ globleuser, videos }) => {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchPosition, setTouchPosition] = useState(0);
  const carouselRef = useRef(null);
  const intervalRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [playingVideo, setPlayingVideo] = useState(false);
  const [triger, setTrigger] = useState(false);

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
    if (!playing) {
      const slide = setInterval(() => {
        setCurrentSlide(
          (prevSlide) => (prevSlide + 1) % (videos ? videos?.length : 3)
        );
      }, 7000);

      return () => clearInterval(slide);
    }
  }, [currentSlide, windowWidth, playing]);

  const nextSlide = () => {
    setTrigger(!triger);
    setCurrentSlide((prevSlide) => (prevSlide + 1) % videos.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + videos.length) % videos.length
    );
    setTrigger(!triger);
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
    if (!playing) {
      intervalRef.current = setInterval(() => {
        nextSlide();
      }, 7000);
    }
  };

  const handleTouchCancel = () => {
    setTouchStart(0);
    setTouchPosition(0);
    // Restart auto sliding after touch cancels
    intervalRef.current = setInterval(() => {
      nextSlide();
    }, 7000);
  };
  return (
    <div className={styles.PlanningTools}>
      <div className={styles.left}>
        <hgroup>Planning Tools</hgroup>
        <span>
          Entrust us with the honor of orchestrating your wedding day, and let
          us guide you through this journey with grace, professionalism, and
          unparalleled expertise."
        </span>
        <article>
          {[
            {
              i: `${S3PROXY}/public/LandingPage/pt1.png`,
              n: "My Wedding",
              l: "user-dashboard?direction=MyWedding",
            },
            {
              i: `${S3PROXY}/public/LandingPage/pt2.png`,
              n: "Checklist",
              l: "user-dashboard?direction=Checklist",
            },
            {
              i: `${S3PROXY}/public/LandingPage/pt3.png`,
              n: "Vendor Manager",
              l: "user-dashboard?direction=VendorManager",
            },
            {
              i: `${S3PROXY}/public/LandingPage/pt4.png`,
              n: "Guest List",
              l: "user-dashboard?direction=GuestList",
            },
            {
              i: `${S3PROXY}/public/LandingPage/pt5.png`,
              n: "Budget Planner",
              l: "user-dashboard?direction=BudgetPlanner",
            },
            {
              i: `${S3PROXY}/public/LandingPage/pt6.png`,
              n: "Invites",
              l: "user-dashboard?direction=Invites",
            },
          ].map((val, key) => {
            return (
              <span
                onClick={() => {
                  router.push(globleuser ? val.l : "/customer-login");
                }}
                key={key}
              >
                <img src={`${val.i}`} alt="" />
                {val.n}
              </span>
            );
          })}
        </article>
      </div>
      <div className={styles.right}>
        <div
          className={styles.carousel}
          ref={carouselRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchCancel}
        >
          {videos?.map((slide, index) => {
            return (
              <Player
                index={index}
                currentSlide={currentSlide}
                touchPosition={touchPosition}
                touchStart={touchStart}
                setPlaying={setPlaying}
                slide={slide}
                triger={triger}
                playing={playing}
              />
            );
          })}
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
        </div>
      </div>
    </div>
  );
};

export default PlanningTools;

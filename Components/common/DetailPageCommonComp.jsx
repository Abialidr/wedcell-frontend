import { Box, styled } from "@mui/material";
import { S3PROXY } from "../../config/index";
import useWindowSize from "@rooks/use-window-size";
import styles from "../DetailPages/venue/venuedetails.module.scss";
import Carousal from "Components/Landing Page/Carousel/Index";
import Image from "next/image";
import { useState } from "react";
import { Icon } from "@iconify/react";
import Head from "next/head";

export const HeartIcon = ({ Iswishlist, onClick }) => {
  const [filled, setFilled] = useState(Iswishlist ? true : false);
  return (
    <span
      onClick={onClick}
      onMouseEnter={() => setFilled(true)}
      onMouseLeave={() => {
        if (!Iswishlist) setFilled(false);
      }}
    >
      <Icon
        icon={`ant-design:heart-${Iswishlist || filled ? "filled" : "outline"}`}
      ></Icon>
    </span>
  );
};

export const MetaTags = ({ meta }) => {
  return (
    <Head>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:url" content={meta.url} />
      <link rel="canonical" href={meta.url} />
    </Head>
  );
};

export function LeftArrow1() {
  const { isFirstItemVisible, scrollPrev } = useContext(VisibilityContext);

  return (
    <Button
      disabled={isFirstItemVisible}
      onClick={() => scrollPrev()}
      sx={{ display: { md: "flex", xs: "none" } }}
    >
      <ArrowBackIosIcon />
    </Button>
  );
}
export function RightArrow1({ pushData, limit }) {
  const { isLastItemVisible, scrollNext, items, visibleElements } =
    React.useContext(VisibilityContext);
  const [disabled, setDisabled] = React.useState(
    !visibleElements.length && isLastItemVisible
  );
  useEffect(() => {
    if (items.toItemsWithoutSeparators().length >= limit) {
      setDisabled(isLastItemVisible);
    }
    if (isLastItemVisible) {
      pushData();
    }
  }, [items, limit, isLastItemVisible]);
  return (
    <Button
      disabled={disabled}
      onClick={() => scrollNext()}
      sx={{ display: { md: "flex", xs: "none" } }}
    >
      <ArrowForwardIosIcon />
    </Button>
  );
}
export const Albums = ({
  data,
  setOpen,
  setSelectedAlbums,
  setInitialSlide,
}) => {
  const { innerWidth: windowWidth } = useWindowSize();
  return (
    <div
      style={{ display: data?.length ? "" : "none" }}
      className={`${styles.imgListContainerforAlbum}`}
    >
      <Carousal slides={data} pushData={() => {}}>
        <div style={{ width: windowWidth > 900 ? "30px" : "0px" }}></div>
        {data?.map((items) => {
          return (
            <div
              className={styles.imgListCardforAlbum}
              onClick={() => {
                setSelectedAlbums(items.value);
                setOpen(true);
                setInitialSlide(0);
              }}
            >
              {items.value[0] && (
                <Image
                  src={`${S3PROXY}${items.value[0]}`}
                  height={0}
                  width={0}
                  alt=""
                />
              )}
              <span>{items.name}</span>
            </div>
          );
        })}
        <div style={{ width: windowWidth > 900 ? "30px" : "0px" }}></div>
      </Carousal>
    </div>
  );
};
export const Video = ({
  data,
  setCurrentVideos,
  setOpen,
  setSelectedVideos,
}) => {
  const { innerWidth: windowWidth } = useWindowSize();

  return (
    <div
      style={{ display: data?.length ? "" : "none" }}
      className={`${styles.imgListContainerforAlbum}`}
    >
      <Carousal slides={data} pushData={() => {}}>
        <div style={{ width: windowWidth > 900 ? "30px" : "0px" }}></div>

        {data?.map((items) => {
          let url;
          const id = extractYouTubeId(items);
          if (id) {
            url = `http://img.youtube.com/vi/${id}/default.jpg`;
          } else {
            url = `${S3PROXY}/public/Layout/logo.svg`;
          }
          return (
            <a href={items} target="_blank">
              <div
                className={styles.imgListCardforAlbum}
                onClick={() => {
                  // setSelectedAlbums(items.value);
                  // setOpen(true);
                }}
              >
                {/* <
                  src={`${S3PROXY}${items.value[0]}`}
                  onClick={(e) => {
                    setCurrentImage(e.target.src);
                  }}
                  alt=""
                /> */}
                <img
                  src={`${url}`}
                  style={{ objectFit: "cover" }}
                  width={"100%"}
                  height={"100%"}
                ></img>
                <YouTubeIcon
                  color="red"
                  style={{
                    position: "absolute",
                    color: "red",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-50%)",
                    height: "75px",
                    width: "75px",
                  }}
                />
                {/* <ReactPlayer
                    url={items}
                    controls={true}
                    style={{ objectFit: "cover" }}
                    width={"100%"}
                    height={"100%"}
                    disabled
                  /> */}
                {/* <span>{items.name}</span> */}
              </div>
            </a>
          );
        })}
        <div style={{ width: windowWidth > 900 ? "30px" : "0px" }}></div>
      </Carousal>
    </div>
  );
};
export const ImageBackground = styled(Box)(({ theme, image }) => ({
  backgroundImage: `url(${S3PROXY}${image})`,
  display: "flex !important",
  alignItems: "center",
  justifyContent: "center",
  padding: "10px 10px",
  backgroundRepeat: "no-repeat",
  backgroundSize: "100% 100%",
  height: "100%",
  width: "100%",
  position: "relative",
}));

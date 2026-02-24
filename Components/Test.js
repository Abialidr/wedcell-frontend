import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";

// import { data } from '../data';
import { Box, MenuItem, Modal, Select } from "@mui/material";
import { data as Data1 } from "../data";
import useWindowSize from "@rooks/use-window-size";
import styles from "../styles/planning.module.scss";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FrameContent,
  ImageContent,
  ShapeContent,
  SvgContent,
  TextContent,
} from "@adojs/core";
import { functionToDwnload } from "../src/Canva-Core/editor";
import moment from "moment";
import { useRouter } from "next/router";
import {
  useGetFamilyDataByIDQuery,
  useGetInvitesDataByIDQuery,
} from "redux/Api/invites.api";
import { useGuestUpdateMutation } from "redux/Api/guestList.api";
import { S3PROXY } from "../config";

function test({ id, FamilyId }) {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [modaldata, setModalData] = useState();
  const [modaleventsdata, setModalEventsData] = useState();
  const [EventId, setEventID] = useState();
  const [attendance, setAttendance] = useState();
  const [update, setUpdate] = useState(true);

  const [data, setData] = useState([]);
  const [eventId, seteventId] = useState();
  const [family, setFamily] = useState();
  const [guest, setGuest] = useState();
  const [events, setEvents] = useState();
  const {
    data: getInvitesDataByID,
    refetch: inviteFetch,
    error,
  } = useGetInvitesDataByIDQuery(id);
  const { data: getFamilyDataByID, refetch: familyFetch } =
    useGetFamilyDataByIDQuery(FamilyId);
  useEffect(() => {
    inviteFetch();
    familyFetch();
  }, []);
  useEffect(() => {
    const getData = async () => {
      let res = { data: getInvitesDataByID };
      res = JSON.parse(JSON.stringify(res));
      if (FamilyId) {
        let res1 = { data: getFamilyDataByID };
        res1 = JSON.parse(JSON.stringify(res1));
        setFamily(res1?.data?.Family);
        setGuest(res1?.data?.Guest);
      }

      if (res?.data?.data?.invitesData) {
        setData(res?.data?.data?.invitesData);
        seteventId(res?.data?.data?.eventID);
        setEvents(res?.data?.data?.events);
      } else {
        setData(Data1);
      }
    };
    getData();
  }, [id, update, getFamilyDataByID, getInvitesDataByID]);

  const handleOpen = (id) => {
    const guests = guest.filter((data) => data.Events.includes(id));
    const event = events?.filter((data) => data.propertyId == id);
    setModalData(guests);
    setModalEventsData(event[0]);
    setEventID(id);
    setOpen(true);
  };
  const handleClose = () => {
    setAttendance();
    setOpen(false);
  };
  const [fonts, setFonts] = useState([]);

  useEffect(() => {
    if (data?.length) {
      const TextLayers = Object.keys(data[0].layers).filter(
        (key) => data[0].layers[key].type.resolvedName === "TextLayer"
      );
      let fonts = TextLayers.flatMap((key) => {
        return data[0].layers[key].props.fonts[0].fonts.map((fonts) => {
          fonts.fontStyle = data[0].layers[key].props.fonts[0].name;
          return fonts;
        });
      });
      fonts = fonts
        .flatMap((data) => {
          return `@font-face {
                  font-family: ${data.fontStyle};
                  src: url(${data.urls[0]}) format('woff2');
                  ${data?.style?.includes("Bold")
              ? `font-weight: bold;`
              : `font-weight: 400;`
            }${data?.style?.includes("Italic")
              ? `font-style: italic;`
              : `font-style: normal;`
            }
                }`;
        })
        .flat()
        .join(" ");
      setFonts(fonts);
    }
  }, [data]);
  function convertRGBToRGBA(rgbColorString, alpha) {
    // Extract the RGB values from the input string
    const rgbValues = rgbColorString.match(/\d+/g);

    if (!rgbValues || rgbValues.length !== 3) {
      // Handle invalid input
      return null;
    }

    // Convert the RGB values to integers
    const r = parseInt(rgbValues[0]);
    const g = parseInt(rgbValues[1]);
    const b = parseInt(rgbValues[2]);

    // Check and normalize the alpha value
    alpha = Math.min(1, Math.max(0, alpha));

    // Create the RGBA color string
    const rgbaColorString = `rgba(${r}, ${g}, ${b}, ${alpha})`;

    return rgbaColorString;
  }
  function setTextShadow(
    direction,
    offset,
    offsteTime,
    isDirection,
    translateScale,
    fontSize
  ) {
    const mappedOffset = ((0.083 * fontSize) / 50) * offset * offsteTime;

    const angleInRadians = -(direction - 90) * (Math.PI / 180);
    switch (isDirection) {
      case "x":
        return mappedOffset * Math.cos(angleInRadians);

      case "y":
        return mappedOffset * Math.sin(angleInRadians);
    }
  }

  const getGradientBackground = (e, t) => {
    const r = 100 / (e.length - 1);
    var n = e.map((e, t) => `${e} ${t * r}%`);

    switch (t) {
      case "leftToRight":
        return `linear-gradient(90deg, ${n.join(", ")})`;
      case "topToBottom":
        return `linear-gradient(${n.join(", ")})`;
      case "topLeftToBottomRight":
        return `linear-gradient(135deg, ${n.join(", ")})`;
      case "circleCenter":
        return `radial-gradient(circle at 50% 50%, ${n.join(", ")})`;
      default:
        return `radial-gradient(circle at 0% 0%, ${n.join(", ")})`;
    }
  };
  const SelectedLayers = (data, childId, mainData) => {
    switch (data.type.resolvedName) {
      case "TextLayer":
        const hello = data?.props.text.replace(
          "J7hPmWk2tR4Y8LqXvE5zNnD0cUj9AeV1f3S6",
          family?.FamilyName ? family?.FamilyName : "________"
        );
        if (
          data?.props.text.includes(`data-list-type="ordered"`) ||
          data?.props.text.includes(`data-list-type=""`)
        ) {
          let pTagArray = data?.props.text.split("</p>");
          pTagArray = pTagArray.filter((data) => data !== "");
          return (
            <div
              onClick={() => {
                if (
                  family?.Events?.includes(
                    mainData[0]?.layers[childId].props.eventId
                  )
                ) {
                  handleOpen(mainData[0]?.layers[childId].props.eventId);
                }
              }}
              style={{
                height: `${data?.props.boxSize.height}px`,
                width: `${data?.props.boxSize.width}px`,
                position: "absolute",
                transform: `translate(${data?.props.position.x}px,${data?.props.position.y}px)`,
                caretColor: "transparent",
                cursor: mainData[0]?.layers[childId].props.eventId
                  ? family?.Events?.includes(
                    mainData[0]?.layers[childId].props.eventId
                  )
                    ? "pointer"
                    : "not-allowed"
                  : "default",
                opacity: mainData[0]?.layers[childId].props.eventId
                  ? family?.Events?.includes(
                    mainData[0]?.layers[childId].props.eventId
                  )
                    ? 1
                    : 0.3
                  : 1,
              }}
              className={`${mainData[0]?.layers[childId].props.eventId &&
                  family?.Events?.includes(
                    mainData[0]?.layers[childId].props.eventId
                  )
                  ? "breath"
                  : ""
                }`}
            >
              <div
                style={{
                  height: `${data?.props.boxSize.height / data?.props.scale}px`,
                  width: `${data?.props.boxSize.width / data?.props.scale}px`,
                  position: "absolute",
                  caretColor: "transparent",

                  transform: `rotate(${data?.props.rotate}deg) scale(${data?.props.scale})`,
                  fontSize: `${data?.props.fontSizes[0]}px`,
                  fontFamily: `${data?.props.fonts[0].name}`,
                  transformOrigin: "0 0",
                  ...(data?.props?.effect?.name === "hollow"
                    ? {
                      "caret-color": `${data.props.colors[0]}`,
                      "-webkit-text-fill-color": "transparent",
                      "-webkit-text-stroke": `${0.0199985 * data?.props?.effect?.settings.thickness
                        }px ${data.props.colors[0]}`,
                    }
                    : {}),
                  ...(data?.props?.effect?.name === "shadow"
                    ? {
                      textShadow: `${convertRGBToRGBA(
                        data?.props?.effect?.settings.color,
                        data?.props?.effect?.settings.transparency / 100
                      )} 
                        ${setTextShadow(
                        data?.props?.effect?.settings.direction,
                        data?.props?.effect?.settings.offset,
                        1,
                        "x",
                        data?.props?.scale,
                        data?.props?.fontSizes[0]
                      )}px
                        ${setTextShadow(
                        data?.props?.effect?.settings.direction,
                        data?.props?.effect?.settings.offset,
                        1,
                        "y",
                        data?.props?.scale,
                        data?.props?.fontSizes[0]
                      )}px
                        ${data?.props?.effect?.settings.blur}px`,
                    }
                    : {}),
                  ...(data?.props?.effect?.name === "lift"
                    ? {
                      textShadow: `rgba(0,0,0,${0.055 * data?.props?.effect?.settings.intensity
                        }) ${0}px ${2.1}px  ${2.1 + data?.props?.effect?.settings.intensity * 0.065
                        }px`,
                      filter: "opacity(1)",
                    }
                    : {}),
                  ...(data?.props?.effect?.name === "echo"
                    ? {
                      textShadow: `${convertRGBToRGBA(
                        data?.props?.effect?.settings.color,
                        0.5
                      )} 
                        ${setTextShadow(
                        data?.props?.effect?.settings.direction,
                        data?.props?.effect?.settings.offset,
                        1,
                        "x",
                        data?.props?.scale,
                        data?.props?.fontSizes[0]
                      )}px
                        ${setTextShadow(
                        data?.props?.effect?.settings.direction,
                        data?.props?.effect?.settings.offset,
                        1,
                        "y",
                        data?.props?.scale,
                        data?.props?.fontSizes[0]
                      )}px
                        ${0}px,
                        ${convertRGBToRGBA(
                        data?.props?.effect?.settings.color,
                        0.3
                      )} 
                        ${setTextShadow(
                        data?.props?.effect?.settings.direction,
                        data?.props?.effect?.settings.offset,
                        2,
                        "x",
                        data?.props?.scale,
                        data?.props?.fontSizes[0]
                      )}px
                        ${setTextShadow(
                        data?.props?.effect?.settings.direction,
                        data?.props?.effect?.settings.offset,
                        2,
                        "y",
                        data?.props?.scale,
                        data?.props?.fontSizes[0]
                      )}px
                        ${0}px
                        `,
                    }
                    : {}),
                  ...(data?.props?.effect?.name === "splice"
                    ? {
                      "caret-color": `${data.props.colors[0]}`,
                      "-webkit-text-fill-color": "transparent",
                      "-webkit-text-stroke": `${0.0199985 * data?.props?.effect?.settings.thickness
                        }px ${data.props.colors[0]}`,
                      textShadow: `${data?.props?.effect?.settings.color} 
                        ${setTextShadow(
                        data?.props?.effect?.settings.direction,
                        data?.props?.effect?.settings.offset,
                        1,
                        "x",
                        data?.props?.scale,
                        data?.props?.fontSizes[0]
                      )}px
                        ${setTextShadow(
                        data?.props?.effect?.settings.direction,
                        data?.props?.effect?.settings.offset,
                        1,
                        "y",
                        data?.props?.scale,
                        data?.props?.fontSizes[0]
                      )}px
                        ${0}px`,
                    }
                    : {}),
                }}
              >
                {data?.props.text.includes(`data-list-type="ordered"`) ? (
                  <ol className="PList oList">
                    {pTagArray.map((data, index) => (
                      <li key={index} dangerouslySetInnerHTML={{ __html: data }} />
                    ))}
                  </ol>
                ) : (
                  <ul className="PList">
                    {pTagArray.map((data, index) => (
                      <li key={index} dangerouslySetInnerHTML={{ __html: data }} />
                    ))}
                  </ul>
                )}
              </div>
            </div>
          );
        } else {
          if (data?.props.rsvp) {
            return (
              <div
                // onClick={() => handleSubmit()}
                style={{
                  height: `${data?.props.boxSize.height}px`,
                  width: `${data?.props.boxSize.width}px`,
                  position: "absolute",
                  transform: `translate(${data?.props.position.x}px,${data?.props.position.y}px)`,
                  caretColor: "transparent",
                  // cursor: 'pointer',
                }}
              >
                <div
                  style={{
                    height: `${data?.props.boxSize.height / data?.props.scale
                      }px`,
                    width: `${data?.props.boxSize.width / data?.props.scale}px`,
                    position: "absolute",
                    transform: `rotate(${data?.props.rotate}deg) scale(${data?.props.scale})`,
                    fontSize: `${data?.props.fontSizes[0]}px`,
                    fontFamily: `${data?.props.fonts[0].name}`,

                    transformOrigin: "0 0",
                    ...(data?.props?.effect?.name === "hollow"
                      ? {
                        "-webkit-text-fill-color": "transparent",
                        "-webkit-text-stroke": `${0.0199985 * data?.props?.effect?.settings.thickness
                          }px ${data.props.colors[0]}`,
                      }
                      : {}),
                    ...(data?.props?.effect?.name === "shadow"
                      ? {
                        textShadow: `${convertRGBToRGBA(
                          data?.props?.effect?.settings.color,
                          data?.props?.effect?.settings.transparency / 100
                        )} 
                        ${setTextShadow(
                          data?.props?.effect?.settings.direction,
                          data?.props?.effect?.settings.offset,
                          1,
                          "x",
                          data?.props?.scale,
                          data?.props?.fontSizes[0]
                        )}px
                        ${setTextShadow(
                          data?.props?.effect?.settings.direction,
                          data?.props?.effect?.settings.offset,
                          1,
                          "y",
                          data?.props?.scale,
                          data?.props?.fontSizes[0]
                        )}px
                        ${data?.props?.effect?.settings.blur}px`,
                      }
                      : {}),
                    ...(data?.props?.effect?.name === "lift"
                      ? {
                        textShadow: `rgba(0,0,0,${0.055 * data?.props?.effect?.settings.intensity
                          }) ${0}px ${2.1}px  ${2.1 +
                          data?.props?.effect?.settings.intensity * 0.065
                          }px`,
                        filter: "opacity(1)",
                      }
                      : {}),
                    ...(data?.props?.effect?.name === "echo"
                      ? {
                        textShadow: `${convertRGBToRGBA(
                          data?.props?.effect?.settings.color,
                          0.5
                        )} 
                        ${setTextShadow(
                          data?.props?.effect?.settings.direction,
                          data?.props?.effect?.settings.offset,
                          1,
                          "x",
                          data?.props?.scale,
                          data?.props?.fontSizes[0]
                        )}px
                        ${setTextShadow(
                          data?.props?.effect?.settings.direction,
                          data?.props?.effect?.settings.offset,
                          1,
                          "y",
                          data?.props?.scale,
                          data?.props?.fontSizes[0]
                        )}px
                        ${0}px,
                        ${convertRGBToRGBA(
                          data?.props?.effect?.settings.color,
                          0.3
                        )} 
                        ${setTextShadow(
                          data?.props?.effect?.settings.direction,
                          data?.props?.effect?.settings.offset,
                          2,
                          "x",
                          data?.props?.scale,
                          data?.props?.fontSizes[0]
                        )}px
                        ${setTextShadow(
                          data?.props?.effect?.settings.direction,
                          data?.props?.effect?.settings.offset,
                          2,
                          "y",
                          data?.props?.scale,
                          data?.props?.fontSizes[0]
                        )}px
                        ${0}px
                        `,
                      }
                      : {}),
                    ...(data?.props?.effect?.name === "splice"
                      ? {
                        "caret-color": `${data.props.colors[0]}`,
                        "-webkit-text-fill-color": "transparent",
                        "-webkit-text-stroke": `${0.0199985 * data?.props?.effect?.settings.thickness
                          }px ${data.props.colors[0]}`,
                        textShadow: `${data?.props?.effect?.settings.color} 
                        ${setTextShadow(
                          data?.props?.effect?.settings.direction,
                          data?.props?.effect?.settings.offset,
                          1,
                          "x",
                          data?.props?.scale,
                          data?.props?.fontSizes[0]
                        )}px
                        ${setTextShadow(
                          data?.props?.effect?.settings.direction,
                          data?.props?.effect?.settings.offset,
                          1,
                          "y",
                          data?.props?.scale,
                          data?.props?.fontSizes[0]
                        )}px
                        ${0}px`,
                      }
                      : {}),
                  }}
                >
                  <TextContent
                    text={hello}
                    colors={data?.props?.colors}
                    fontSizes={data?.props?.fontSizes}
                    effect={data?.props?.effect}
                  ></TextContent>
                </div>
              </div>
            );
          } else {
            return (
              <div
                onClick={() => {
                  if (
                    family?.Events?.includes(
                      mainData[0]?.layers[childId].props.eventId
                    )
                  ) {
                    handleOpen(mainData[0]?.layers[childId].props.eventId);
                  }
                }}
                style={{
                  height: `${data?.props.boxSize.height}px`,
                  width: `${data?.props.boxSize.width}px`,
                  position: "absolute",
                  transform: `translate(${data?.props.position.x}px,${data?.props.position.y}px)`,
                  caretColor: "transparent",
                  cursor: mainData[0]?.layers[childId].props.eventId
                    ? family?.Events?.includes(
                      mainData[0]?.layers[childId].props.eventId
                    )
                      ? "pointer"
                      : "not-allowed"
                    : "default",
                  opacity: mainData[0]?.layers[childId].props.eventId
                    ? family?.Events?.includes(
                      mainData[0]?.layers[childId].props.eventId
                    )
                      ? 1
                      : 0.3
                    : 1,
                }}
              >
                <div
                  style={{
                    height: `${data?.props.boxSize.height / data?.props.scale
                      }px`,
                    width: `${data?.props.boxSize.width / data?.props.scale}px`,
                    position: "absolute",
                    transform: `rotate(${data?.props.rotate}deg) scale(${data?.props.scale})`,
                    fontSize: `${data?.props.fontSizes[0]}px`,
                    fontFamily: `${data?.props.fonts[0].name}`,

                    transformOrigin: "0 0",
                    ...(data?.props?.effect?.name === "hollow"
                      ? {
                        "-webkit-text-fill-color": "transparent",
                        "-webkit-text-stroke": `${0.0199985 * data?.props?.effect?.settings.thickness
                          }px ${data.props.colors[0]}`,
                      }
                      : {}),
                    ...(data?.props?.effect?.name === "shadow"
                      ? {
                        textShadow: `${convertRGBToRGBA(
                          data?.props?.effect?.settings.color,
                          data?.props?.effect?.settings.transparency / 100
                        )} 
                        ${setTextShadow(
                          data?.props?.effect?.settings.direction,
                          data?.props?.effect?.settings.offset,
                          1,
                          "x",
                          data?.props?.scale,
                          data?.props?.fontSizes[0]
                        )}px
                        ${setTextShadow(
                          data?.props?.effect?.settings.direction,
                          data?.props?.effect?.settings.offset,
                          1,
                          "y",
                          data?.props?.scale,
                          data?.props?.fontSizes[0]
                        )}px
                        ${data?.props?.effect?.settings.blur}px`,
                      }
                      : {}),
                    ...(data?.props?.effect?.name === "lift"
                      ? {
                        textShadow: `rgba(0,0,0,${0.055 * data?.props?.effect?.settings.intensity
                          }) ${0}px ${2.1}px  ${2.1 +
                          data?.props?.effect?.settings.intensity * 0.065
                          }px`,
                        filter: "opacity(1)",
                      }
                      : {}),
                    ...(data?.props?.effect?.name === "echo"
                      ? {
                        textShadow: `${convertRGBToRGBA(
                          data?.props?.effect?.settings.color,
                          0.5
                        )} 
                        ${setTextShadow(
                          data?.props?.effect?.settings.direction,
                          data?.props?.effect?.settings.offset,
                          1,
                          "x",
                          data?.props?.scale,
                          data?.props?.fontSizes[0]
                        )}px
                        ${setTextShadow(
                          data?.props?.effect?.settings.direction,
                          data?.props?.effect?.settings.offset,
                          1,
                          "y",
                          data?.props?.scale,
                          data?.props?.fontSizes[0]
                        )}px
                        ${0}px,
                        ${convertRGBToRGBA(
                          data?.props?.effect?.settings.color,
                          0.3
                        )} 
                        ${setTextShadow(
                          data?.props?.effect?.settings.direction,
                          data?.props?.effect?.settings.offset,
                          2,
                          "x",
                          data?.props?.scale,
                          data?.props?.fontSizes[0]
                        )}px
                        ${setTextShadow(
                          data?.props?.effect?.settings.direction,
                          data?.props?.effect?.settings.offset,
                          2,
                          "y",
                          data?.props?.scale,
                          data?.props?.fontSizes[0]
                        )}px
                        ${0}px
                        `,
                      }
                      : {}),
                    ...(data?.props?.effect?.name === "splice"
                      ? {
                        "caret-color": `${data.props.colors[0]}`,
                        "-webkit-text-fill-color": "transparent",
                        "-webkit-text-stroke": `${0.0199985 * data?.props?.effect?.settings.thickness
                          }px ${data.props.colors[0]}`,
                        textShadow: `${data?.props?.effect?.settings.color} 
                        ${setTextShadow(
                          data?.props?.effect?.settings.direction,
                          data?.props?.effect?.settings.offset,
                          1,
                          "x",
                          data?.props?.scale,
                          data?.props?.fontSizes[0]
                        )}px
                        ${setTextShadow(
                          data?.props?.effect?.settings.direction,
                          data?.props?.effect?.settings.offset,
                          1,
                          "y",
                          data?.props?.scale,
                          data?.props?.fontSizes[0]
                        )}px
                        ${0}px`,
                      }
                      : {}),
                  }}
                  className={`${mainData[0]?.layers[childId].props.eventId &&
                      family?.Events?.includes(
                        mainData[0]?.layers[childId].props.eventId
                      )
                      ? "breath"
                      : "hello"
                    }`}
                >
                  <TextContent
                    text={hello}
                    colors={data?.props?.colors}
                    fontSizes={data?.props?.fontSizes}
                    effect={data?.props?.effect}
                  ></TextContent>
                </div>
              </div>
            );
          }
        }
      case "FrameLayer":
        return (
          <div
            onClick={() => {
              if (
                family?.Events?.includes(
                  mainData[0]?.layers[childId].props.eventId
                )
              ) {
                handleOpen(mainData[0]?.layers[childId].props.eventId);
              }
            }}
            style={{
              height: `${data?.props.boxSize.height}px`,
              width: `${data?.props.boxSize.width}px`,
              position: "absolute",
              transform: data.props.rotate
                ? `translate(${data?.props.position.x}px,${data?.props.position.y}px) rotate(${data?.props.rotate}deg)`
                : `translate(${data?.props.position.x}px,${data?.props.position.y}px)`,
              cursor: mainData[0]?.layers[childId].props.eventId
                ? family?.Events?.includes(
                  mainData[0]?.layers[childId].props.eventId
                )
                  ? "pointer"
                  : "not-allowed"
                : "default",
              opacity: mainData[0]?.layers[childId].props.eventId
                ? family?.Events?.includes(
                  mainData[0]?.layers[childId].props.eventId
                )
                  ? 1
                  : 0.3
                : 1,
            }}
            className={`${mainData[0]?.layers[childId].props.eventId &&
                family?.Events?.includes(
                  mainData[0]?.layers[childId].props.eventId
                )
                ? "breath"
                : "hello"
              }`}
          >
            <div
              style={{
                height: `${data?.props.boxSize.height / data?.props.scale}px`,
                width: `${data?.props.boxSize.width / data?.props.scale}px`,
                transform: `scale(${data?.props.scale})`,
                transformOrigin: "0 0",
              }}
            >
              <FrameContent
                clipPath={data?.props.clipPath}
                image={data.props.image}
                color={data?.props.color}
                gradientBackground={data?.props.gradientBackground}
              ></FrameContent>
              {/* <div
                style={{
                  width: '100%',
                  height: '100%',
                  clipPath: data?.props.clipPath,
                }}
              >
                <div
                  style={{
                    width: data.props.image
                      ? `${data.props.image.boxSize.width}px`
                      : `100%`,
                    height: data.props.image
                      ? `${data.props.image.boxSize.height}px`
                      : `100%`,
                    transform:
                      data.props.image &&
                      `translate(${data.props.image.position.x}px,${data.props.image.position.y}px)`,
                    position: 'relative',
                    background: data?.props.gradientBackground
                      ? getGradientBackground(
                          data?.props.gradientBackground.colors,
                          data?.props.gradientBackground.style
                        )
                      : data?.props.color,
                  }}
                >
                  {(data?.props.gradientBackground || data?.props.color) &&
                  !data.props.image ? (
                    <></>
                  ) : (
                    <
                      src={
                        data.props.image
                          ? data.props.image.url
                          : '/assets/images/webp/frame-placeholder.webp'
                      }
                      style={{
                        objectFit: 'fill',
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                      }}
                    />
                  )}
                </div>
              </div> */}
            </div>
          </div>
        );
      case "ImageLayer":
        return (
          <div
            onClick={() => {
              if (
                family?.Events?.includes(
                  mainData[0]?.layers[childId].props.eventId
                )
              ) {
                handleOpen(mainData[0]?.layers[childId].props.eventId);
              }
            }}
            style={{
              height: `${data?.props.boxSize.height}px`,
              width: `${data?.props.boxSize.width}px`,
              position: "absolute",
              transform: data.props.rotate
                ? `translate(${data?.props.position.x}px,${data?.props.position.y}px) rotate(${data?.props.rotate}deg)`
                : `translate(${data?.props.position.x}px,${data?.props.position.y}px)`,
              cursor: mainData[0]?.layers[childId].props.eventId
                ? family?.Events?.includes(
                  mainData[0]?.layers[childId].props.eventId
                )
                  ? "pointer"
                  : "not-allowed"
                : "default",
              opacity: mainData[0]?.layers[childId].props.eventId
                ? family?.Events?.includes(
                  mainData[0]?.layers[childId].props.eventId
                )
                  ? 1
                  : 0.3
                : 1,
            }}
            className={`${mainData[0]?.layers[childId].props.eventId &&
                family?.Events?.includes(
                  mainData[0]?.layers[childId].props.eventId
                )
                ? "breath"
                : ""
              }`}
          >
            <ImageContent
              image={data?.props.image}
              boxSize={data?.props.boxSize}
              imageUrl={data?.props.image.url}
            ></ImageContent>
          </div>
        );
      case "SvgLayer":
        const image = data.props.image;
        const boxSize = data?.props.boxSize;
        const colors = data.props.colors;

        return (
          <div
            onClick={() => {
              if (
                family?.Events?.includes(
                  mainData[0]?.layers[childId].props.eventId
                )
              ) {
                handleOpen(mainData[0]?.layers[childId].props.eventId);
              }
            }}
            style={{
              height: `${data?.props.boxSize.height}px`,
              width: `${data?.props.boxSize.width}px`,
              position: "absolute",
              transform: data.props.rotate
                ? `translate(${data?.props.position.x}px,${data?.props.position.y}px) rotate(${data?.props.rotate}deg)`
                : `translate(${data?.props.position.x}px,${data?.props.position.y}px)`,
              cursor: mainData[0]?.layers[childId].props.eventId
                ? family?.Events?.includes(
                  mainData[0]?.layers[childId].props.eventId
                )
                  ? "pointer"
                  : "not-allowed"
                : "default",
              opacity: mainData[0]?.layers[childId].props.eventId
                ? family?.Events?.includes(
                  mainData[0]?.layers[childId].props.eventId
                )
                  ? 1
                  : 0.3
                : "",
            }}
            className={`${mainData[0]?.layers[childId].props.eventId &&
                family?.Events?.includes(
                  mainData[0]?.layers[childId].props.eventId
                )
                ? "breath"
                : ""
              }`}
          >
            <div
              style={{
                height: `${data?.props.boxSize.height}px`,
                width: `${data?.props.boxSize.width}px`,
                // overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: `100%`,

                  // transform: `translate(${data.props.image.position.x}px,${data.props.image.position.y}px)`,
                }}
              >
                <SvgContent
                  image={image}
                  boxSize={boxSize}
                  colors={colors}
                ></SvgContent>
              </div>
            </div>
          </div>
        );
      case "ShapeLayer":
        return (
          <div
            onClick={() => {
              if (
                family?.Events?.includes(
                  mainData[0]?.layers[childId].props.eventId
                )
              ) {
                handleOpen(mainData[0]?.layers[childId].props.eventId);
              }
            }}
            style={{
              height: `${data?.props.boxSize.height}px`,
              width: `${data?.props.boxSize.width}px`,
              position: "absolute",
              transform: data.props.rotate
                ? `translate(${data?.props.position.x}px,${data?.props.position.y}px) rotate(${data?.props.rotate}deg)`
                : `translate(${data?.props.position.x}px,${data?.props.position.y}px)`,
              cursor: mainData[0]?.layers[childId].props.eventId
                ? family?.Events?.includes(
                  mainData[0]?.layers[childId].props.eventId
                )
                  ? "pointer"
                  : "not-allowed"
                : "default",
              opacity: mainData[0]?.layers[childId].props.eventId
                ? family?.Events?.includes(
                  mainData[0]?.layers[childId].props.eventId
                )
                  ? 1
                  : 0.3
                : data?.props?.transparency
                  ? data?.props?.transparency
                  : 1,
            }}
            className={`${mainData[0]?.layers[childId].props.eventId &&
                family?.Events?.includes(
                  mainData[0]?.layers[childId].props.eventId
                )
                ? "breath"
                : ""
              }`}
          >
            <div
              style={{
                height: `${data?.props.boxSize.height / data.props.scale}px`,
                width: `${data?.props.boxSize.width / data.props.scale}px`,
              }}
            >
              <div
                style={{
                  // clipPath: shape,
                  height: `${data?.props.boxSize.height}px`,
                  width: `${data?.props.boxSize.width}px`,
                  position: "relative",
                }}
              >
                <ShapeContent
                  boxSize={{
                    height: data?.props.boxSize.height * data.props.scale,

                    width: data?.props.boxSize.width * data.props.scale,
                  }}
                  shape={data?.props.shape}
                  color={data?.props.color}
                  gradientBackground={data?.props.gradientBackground}
                  roundedCorners={data?.props.roundedCorners}
                  scale={data?.props.scale}
                  border={{
                    style: data?.props?.border?.style,
                    weight: data?.props.border?.weight * data.props.scale,
                    color: data?.props.border?.color,
                  }}
                ></ShapeContent>
                {/* <div
                  style={{
                    ...(type === 'normal'
                      ? {
                          height: `${
                            data?.props.boxSize.height / data.props.scale
                          }px`,
                          width: `${
                            data?.props.boxSize.width / data.props.scale
                          }px`,
                          clipPath: ogclip,
                          background: data?.props.color,
                          transform: `scaleX(${
                            data?.props.boxSize.width / ogw
                          }) scaleY(${data?.props.boxSize.height / ogh})`,
                          transformOrigin: '0 0',
                        }
                      : {
                          height: `${
                            data?.props.boxSize.height / data.props.scale
                          }px`,
                          width: `${
                            data?.props.boxSize.width / data.props.scale
                          }px`,
                          clipPath: ogclip,
                          background: data?.props.gradientBackground
                            ? getGradientBackground(
                                data?.props.gradientBackground.colors,
                                data?.props.gradientBackground.style
                              )
                            : data?.props.color,
                          transform: `scaleX(${data?.props.scale}) scaleY(${data?.props.scale})`,
                          transformOrigin: '0 0',
                        }),
                  }}
                ></div>
                {data.props.border ? (
                  <svg
                    viewBox={`0 0 ${
                      data?.props.boxSize.width / data.props.scale
                    }  ${data?.props.boxSize.height / data.props.scale} `}
                    style={{ position: 'absolute', inset: 0 }}
                  >
                    "0"
                    <path
                      d={`${path}`}
                      strokeLinecap='butt'
                      fill='none'
                      stroke={data.props.border.color}
                      strokeWidth={data.props.border.weight}
                      strokeDasharray={
                        data.props.border.style === 'dots'
                          ? `${data?.props?.border.weight * 1},${
                              data?.props?.border.weight
                            }`
                          : data.props.border.style === 'shortDashes'
                          ? `${data?.props?.border.weight * 3},${
                              data?.props?.border.weight
                            }`
                          : data.props.border.style === 'longDashes'
                          ? `${data?.props?.border.weight * 6},${
                              data?.props?.border.weight
                            }`
                          : ''
                      }
                      clipPath={ogclip}
                    ></path>
                  </svg>
                ) : (
                  <></>
                )} */}
              </div>
            </div>
          </div>
        );
      default:
        break;
    }
  };
  const {
    innerWidth: windowWidth,
    innerHeight: windowHeight,
    outerHeight,
    outerWidth,
  } = useWindowSize();
  const gradient =
    data[0]?.layers?.ROOT?.props.gradientBackground &&
    getGradientBackground(
      data[0]?.layers.ROOT.props.gradientBackground.colors,
      data[0]?.layers.ROOT.props.gradientBackground.style
    );
  const [guestUpdate] = useGuestUpdateMutation();
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: windowWidth >= 900 ? "500px" : windowWidth >= 460 ? "95%" : "95%",
    bgcolor: "background.paper",
    // border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    borderRadius: "10px",
    height: windowWidth >= 900 ? "fit-content" : "fit-content",
    overflow: "scroll",

    // paddingTop: "270px",
    zIndex: "-1",
    maxHeight: "460px",
  };
  const i = useRef(null);
  return fonts.length ? (
    <>
      <ToastContainer></ToastContainer>
      <Head>
        <style>
          {fonts}
          {`.PList p {
              display:list-item !important;
              margin-left : 1.7em
            }
            .oList p{
              list-style-type: decimal !important;
            }
            .PList {
              padding-left: 0px !important; 
              margin: 0; 
            }
            `}
        </style>
      </Head>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className={styles.mainModaldiv} style={{ position: "relative" }}>
            <span className={styles.seemoreX} onClick={() => handleClose()}>
              <img src={`${S3PROXY}/public/images/webp/Vector12.webp`} alt="" />
            </span>
            <div className={styles.seemorehead}>
              <span>{modaleventsdata?.property}</span>
            </div>
          </div>

          <div className={styles.seemorebody}>
            <article
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                gap: "10px",
              }}
            >
              {modaldata?.map((data) => {
                const key = EventId;
                const retriew = data.EventsAttendance.filter(
                  (id) => Object.keys(id)[0] === EventId
                );
                const value = retriew[0][EventId];

                return (
                  <article
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <span
                      className={styles.seemorebodybold}
                      style={{ width: "50%" }}
                    >
                      {data.name}
                    </span>
                    <Select
                      className={styles.checkbox2input}
                      style={{ width: "50%" }}
                      defaultValue={value}
                      value={attendance}
                      labelId="demo-simple-select-label"
                      placeholder="Attending"
                      onChange={async (e) => {
                        setAttendance(e.target.value);
                        const res = await guestUpdate({
                          id: data._id,
                          eventId: key,
                          value: e.target.value,
                          attendevent: true,
                          type: "NoFamily",
                        });
                        setUpdate(!update);
                      }}
                    >
                      <MenuItem value={0}>Not Attending</MenuItem>
                      <MenuItem value={1}>Attending</MenuItem>
                      <MenuItem value={2}>Pending</MenuItem>
                    </Select>
                  </article>
                );
              })}
            </article>
            <article>
              <img src={`${S3PROXY}/public/images/webp/Clock.webp`} alt="" />
              <span className={styles.seemorebodybold}>
                Time :&nbsp;{" "}
                <span className={styles.seemorebodylight}>
                  {moment(modaleventsdata?.eTime).format("HH:MM A")}
                </span>
              </span>
            </article>
            <article>
              <img
                src={`${S3PROXY}/public/images/webp/Wedding Day.webp`}
                alt=""
              />
              <span className={styles.seemorebodybold}>
                Date :&nbsp;{" "}
                <span className={styles.seemorebodylight}>
                  {moment(modaleventsdata?.eDate).format("dddd")} -{" "}
                  {moment(modaleventsdata?.eDate).format("LL")}
                </span>
              </span>
            </article>
            <article>
              <img
                src={`${S3PROXY}/public/images/webp/Place Marker.webp`}
                alt=""
              />
              <span className={styles.seemorebodybold}>
                Venue :&nbsp;{" "}
                <span className={styles.seemorebodylight}>
                  {modaleventsdata?.eVenue}
                </span>
              </span>
            </article>
            <article>
              <img
                src={`${S3PROXY}/public/images/webp/Wedding Photo.webp`}
                alt=""
              />
              <span className={styles.seemorebodybold}>
                Theme :&nbsp;{" "}
                <span className={styles.seemorebodylight}>
                  {modaleventsdata?.eTheme}
                </span>
              </span>
            </article>
            <article>
              <img src={`${S3PROXY}/public/images/webp/Wedding.webp`} alt="" />
              <span className={styles.seemorebodybold}>
                Colour Code :&nbsp;{" "}
                <span className={styles.seemorebodylight}>
                  {modaleventsdata?.eColourCode}
                </span>
              </span>
            </article>
          </div>
        </Box>
      </Modal>
      {/* <div
        onClick={() => {
          functionToDwnload(i, 1);
        }}
      >
        Download
      </div> */}
      <div
        style={{
          height: "fit-content",
          width: "100vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0px 10px 50px 0px",
          width: "100%",
          toucAction: "pan-x pan-y pinch-zoom",

          // height: `${
          //   (windowWidth / data[0]?.layers.ROOT.props.boxSize.width) *
          //   data[0]?.layers.ROOT.props.boxSize.height
          // }px`,

          transform: "translate(0px, 0px)",
          height: "100%",
        }}
      >
        <div
          ref={i}
          style={{
            // height: `${data[0]?.layers.ROOT.props.boxSize.height}px`,
            height: `${
              // windowWidth < data[0]?.layers.ROOT.props.boxSize.width &&
              // (windowWidth / data[0]?.layers.ROOT.props.boxSize.width) *
              (windowWidth < 530 && router.pathname === "/InvitationCard"
                ? windowWidth / data[0]?.layers.ROOT.props.boxSize.width
                : (windowHeight -
                  (router.pathname === "/InvitationCard" ? 100 : 320)) /
                data[0]?.layers.ROOT.props.boxSize.height) *
              data[0]?.layers.ROOT.props.boxSize.height
              }px`,
            width: `${(windowWidth < 530 && router.pathname === "/InvitationCard"
                ? windowWidth / data[0]?.layers.ROOT.props.boxSize.width
                : (windowHeight -
                  (router.pathname === "/InvitationCard" ? 100 : 320)) /
                data[0]?.layers.ROOT.props.boxSize.height) *
              data[0]?.layers.ROOT.props.boxSize.width
              }px`,
            background: gradient ? gradient : data[0]?.layers.ROOT.props.color,
            backgroundImage: `url(${data[0]?.layers?.ROOT?.props?.image?.url})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            position: "relative",
            boxShadow: "0 0 10px rgba(0,0,0,0.7)",
            overflow: "hidden",
            caretColor: "transparent",
          }}
        >
          <div
            style={{
              height: `${data[0]?.layers.ROOT.props.boxSize.height}px`,
              width: `${data[0]?.layers.ROOT.props.boxSize.width}px`,
              transform: `scale(${
                // windowWidth < data[0]?.layers.ROOT.props.boxSize.width
                //   ? windowWidth / data[0]?.layers.ROOT.props.boxSize.width
                //   :
                windowWidth < 530 && router.pathname === "/InvitationCard"
                  ? windowWidth / data[0]?.layers.ROOT.props.boxSize.width
                  : (windowHeight -
                    (router.pathname === "/InvitationCard" ? 100 : 320)) /
                  data[0]?.layers.ROOT.props.boxSize.height
                })`,
              transformOrigin: "0 0",
              // boxShadow: '0 0 10px rgba(0,0,0,0.7)',
              // padding: '5px',
            }}
          >
            {data[0]?.layers.ROOT.child.map((childId, key) => {
              if (data[0]?.layers[childId].type.resolvedName === "GroupLayer") {
                if (eventId?.includes(data[0]?.layers[childId].props.eventId)) {
                  return (
                    <div
                      onClick={() => {
                        if (
                          family?.Events?.includes(
                            data[0]?.layers[childId].props.eventId
                          )
                        ) {
                          handleOpen(data[0]?.layers[childId].props.eventId);
                        }
                      }}
                      key={key}
                      style={{
                        height: `${data[0]?.layers[childId].props.boxSize.height /
                          data[0]?.layers[childId].props.scale
                          }px`,
                        width: `${data[0]?.layers[childId].props.boxSize.width /
                          data[0]?.layers[childId].props.scale
                          }px`,
                        position: "absolute",
                        transform: `translate(${data[0]?.layers[childId].props.position.x}px,${data[0]?.layers[childId].props.position.y}px) rotate(${data[0]?.layers[childId].props.rotate}deg) scale(${data[0]?.layers[childId].props.scale})`,
                        transformOrigin: "0 0",
                        cursor: family?.Events?.includes(
                          data[0]?.layers[childId].props.eventId
                        )
                          ? "pointer"
                          : "not-allowed",
                        caretColor: "transparent",
                        // opacity: family?.Events?.includes(
                        //   data[0]?.layers[childId].props.eventId
                        // )
                        //   ? 1
                        //   : 0.3,
                      }}
                      className="breath"
                    >
                      {data[0]?.layers[childId].child.map((childId2) =>
                        SelectedLayers(data[0]?.layers[childId2], childId, data)
                      )}
                    </div>
                  );
                } else {
                  return (
                    <div
                      key={key}
                      style={{
                        height: `${data[0]?.layers[childId].props.boxSize.height /
                          data[0]?.layers[childId].props.scale
                          }px`,
                        width: `${data[0]?.layers[childId].props.boxSize.width /
                          data[0]?.layers[childId].props.scale
                          }px`,
                        position: "absolute",
                        transform: `translate(${data[0]?.layers[childId].props.position.x}px,${data[0]?.layers[childId].props.position.y}px) rotate(${data[0]?.layers[childId].props.rotate}deg) scale(${data[0]?.layers[childId].props.scale})`,
                        transformOrigin: "0 0",
                        pointerEvents: "none",
                      }}
                    >
                      {data[0]?.layers[childId].child.map((childId2) =>
                        SelectedLayers(data[0]?.layers[childId2], childId, data)
                      )}
                    </div>
                  );
                }
              } else {
                return SelectedLayers(data[0]?.layers[childId], childId, data);
              }
            })}
          </div>
        </div>
      </div>
    </>
  ) : (
    <>Loading...</>
  );
}

export default React.memo(test);

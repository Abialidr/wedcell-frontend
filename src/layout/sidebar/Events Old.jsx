import React, { useEffect, useState } from "react";
// import { useAsync } from 'react-use';
import XIcon from "@duyank/icons/regular/X";
import { isMobile } from "react-device-detect";
import { useEditor } from "@adojs/editor";
import { Box, Modal, TextField } from "@mui/material";
import { useGetElementsQuery } from "redux/Api/diff.api";

const Events = ({
  onClose,
  propertyName,
  setPropertyName,
  events,
  setevents,
  allLayers,
}) => {
  const { actions, page1, state, dragged, allLayer, childLayers } = useEditor(
    (state) => ({
      page1: state.pages[1].layers,
      dragged: state.dragData.status,
      allLayer: Object.keys(state.pages[1].layers),
      childLayers: state.pages[1].layers.ROOT.data.child,
    })
  );

  const [ButtonEl, setButtonEl] = useState([]);
  const [event, setevent] = useState({});
  const [eventGroupTemplate, setEventGroupTemplate] = useState([]);
  const [key, setkey] = useState("");
  const [texts, setTexts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { data: alltexts } = useGetElementsQuery("texts");
  const useFunc = async () => {
    const response = { data: alltexts };
    setTexts(response?.data);
    setIsLoading(false);
  };
  const [handleclick, sethandleclick] = useState(false);
  useEffect(() => {
    useFunc();
  }, []);

  useEffect(() => {
    const group = childLayers.filter(
      (data) => page1[data].data.type === "Group"
    );
    let filterGroup;
    if (group.length) {
      filterGroup = group.filter((data) => {
        const childs = page1[data].data.child;
        return propertyName.every((property) => {
          return childs.some((child) => {
            return page1[child].data.props.propertyId === property.propertyId;
          });
        });
      });
    }
  }, [childLayers.length]);

  const handleAddText = (data) => {
    actions.addLayerTree(data);
    if (isMobile) {
      onClose();
    }
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setevent({});
    setkey("");
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "350px",
    bgcolor: "background.paper",
    // border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    borderRadius: "10px",
    height: "fit-content",
    overflow: "scroll",
    display: "flex",
    // paddingTop: "270px",
    zIndex: "-1",
    flexDirection: "column",
    gap: "20px",
  };

  const [propertyNameadd, setPropertyNameadd] = useState();
  const [addHandle, setAddHandle] = useState("");
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        flexDirection: "column",
        overflowY: "auto",
        display: "flex",
      }}
    >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            {propertyName.map((item) => {
              return (
                <TextField
                  id="standard-basic"
                  label={item.property}
                  variant="outlined"
                  multiline
                  value={event[item.property]}
                  onChange={(e) =>
                    setevent({ ...event, [item.property]: e.target.value })
                  }
                ></TextField>
              );
            })}
          </div>
          {/* <span>Add Property Value</span>
          <TextField></TextField> */}
          {key !== "" ? (
            <button
              style={{
                padding: "5px",
                border: "none",
                background: "#B4245D",
                color: "white",
                fontSize: "15px",
                fontWeight: "600",
                borderRadius: "5px",
              }}
              onClick={() => {
                const dum = events;
                dum.splice(key, 1, event);
                setevents([...dum]);
                setevent({});
                handleClose();
              }}
            >
              Update
            </button>
          ) : (
            <button
              style={{
                padding: "5px",
                border: "none",
                background: "#B4245D",
                color: "white",
                fontSize: "15px",
                fontWeight: "600",
                borderRadius: "5px",
              }}
              onClick={() => {
                const dum = events;
                dum.push(event);
                setevents([...dum]);
                setevent({});
                handleClose();
              }}
            >
              Save
            </button>
          )}
        </Box>
      </Modal>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          height: 48,
          borderBottom: "1px solid rgba(57,76,96,.15)",
          padding: "0 20px",
        }}
      >
        <p
          style={{
            lineHeight: "48px",
            fontWeight: 600,
            color: "#181C32",
            flexGrow: 1,
          }}
        >
          Properties
        </p>
        <div
          style={{
            fontSize: 20,
            flexShrink: 0,
            width: 32,
            height: 32,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={onClose}
        >
          <XIcon />
        </div>
      </div>
      <div
        style={{ flexDirection: "column", overflowY: "auto", display: "flex" }}
      >
        <div
          style={{
            flexGrow: 1,
            overflowY: "auto",
            display: "grid",
            // gridTemplateColumns: 'repeat(3,minmax(0,1fr))',
            gridGap: 10,
            padding: "16px",
          }}
        >
          <button
            style={{
              padding: "5px",
              border: "none",
              background: "#B4245D",
              color: "white",
              fontSize: "15px",
              fontWeight: "600",
              borderRadius: "5px",
            }}
            onClick={() => setOpen(true)}
          >
            + Add
          </button>
          {/* {events?.length ? (
            events?.map((value) => {
              return Object.entries(value).map((value1) => {
                return (
                  <p>
                    {value1[0]} : {value1[1]}
                  </p>
                );
              });
            })
          ) : (
            <></>
          )} */}
          {events?.length ? (
            events?.map((item, key1) => {
              return (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px 5px",
                    borderBottom: "1px solid gray",
                  }}
                >
                  <div
                    style={{ display: "flex", flexDirection: "column" }}
                    onClick={() => {
                      setkey(key1);
                      setevent(item);
                      setOpen(true);
                    }}
                  >
                    {propertyName.map((items) => {
                      return (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "18px",
                              fontFamily: "Ledger",
                              textTransform: "capitalize",
                            }}
                          >
                            {`${items.property} : ${item[items.property]}`}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  <div
                    style={{
                      fontSize: 20,
                      flexShrink: 0,
                      width: 32,
                      height: 32,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onClick={() => {
                      const newarr = [...events];
                      newarr.splice(key1, 1);
                      setevents(newarr);
                    }}
                  >
                    <XIcon />
                  </div>
                  <div
                    style={{
                      fontSize: 20,
                      flexShrink: 0,
                      width: 32,
                      height: 32,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddText({
                        rootId: "94824946-9971-43f0-97c0-19c3c53f7114",
                        layers: {
                          "94824946-9971-43f0-97c0-19c3c53f7114": {
                            type: { resolvedName: "GroupLayer" },
                            props: {
                              position: { x: 3, y: 445 },
                              boxSize: {
                                width: 1630.2000000000003,
                                height: 77.42709576953018,
                              },
                              scale: 1,
                              rotate: 0,
                            },
                            locked: false,
                            child: ["56ca3676-050d-4eee-b738-073d67752614"],
                            parent: "ROOT",
                          },
                          "56ca3676-050d-4eee-b738-073d67752614": {
                            type: { resolvedName: "TextLayer" },
                            props: {
                              text: `<div style="text-align: center;font-family: Oswald;text-transform: uppercase;font-size: 24px;color: rgb(0, 0, 0);line-height: 1.4;letter-spacing: NaNem;">
                              ${propertyName
                                .map((items) => {
                                  return `
                                <strong>
        
                                    <span style='color: rgb(0, 0, 0);'>
                                     ${item[items.property]}
                                    </span>
                                    <br />
                                
                                    </strong>
                                    `;
                                })
                                .join("")}
                            </div>`,
                              position: {
                                x: 564.1969731378151,
                                y: 19.309760677167333,
                              },
                              boxSize: {
                                width: 490.70655982351354,
                                height: 38.80757441519554,
                                x: 568.791666666667,
                                y: 401.5,
                              },
                              scale: 1.1413992475057513,
                              rotate: 0,
                              fonts: [
                                {
                                  name: "Oswald",
                                  fonts: [
                                    {
                                      style: "Bold",
                                      urls: [
                                        "https://api-gilt-one.vercel.app/assets/liquid-editor/fonts/raw/master/src/fonts/Oswald/Oswald-Bold.woff2",
                                      ],
                                    },
                                    {
                                      urls: [
                                        "https://api-gilt-one.vercel.app/assets/liquid-editor/fonts/raw/master/src/fonts/Oswald/Oswald-Regular.woff2",
                                      ],
                                    },
                                  ],
                                },
                              ],
                              colors: ["rgb(0, 0, 0)"],
                              fontSizes: [24],
                              effect: null,
                            },
                            locked: false,
                            child: [],
                            parent: "94824946-9971-43f0-97c0-19c3c53f7114",
                          },
                        },
                      });
                    }}
                  >
                    <XIcon />
                  </div>
                </div>
              );
            })
          ) : (
            <></>
          )}
          {ButtonEl.map(({ img, data }, idx) => (
            <div
              key={idx}
              style={{
                cursor: "pointer",
                position: "relative",
                paddingBottom: "100%",
                width: "100%",
              }}
              onClick={() => handleAddText(JSON.parse(data))}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  height: "100%",
                  width: "100%",
                  objectFit: "cover",
                }}
              >
                {img}
              </div>
              {/* <
                src={`${S3PROXY}${getThumbnail(img)}`}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  height: '100%',
                  width: '100%',
                  objectFit: 'cover',
                }}
              /> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;

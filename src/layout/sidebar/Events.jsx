import React, { useEffect, useState } from "react";
import XIcon from "@duyank/icons/regular/X";
import { useEditor } from "@adojs/editor";
import { Box, Modal, TextField } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
const Events = ({ onClose, propertyName, setPropertyName, allLayers }) => {
  const { actions, pages, dragged, layers, activePage } = useEditor(
    (state) => ({
      pages: state?.pages,
      dragged: state?.dragData?.status,
      layers: state?.selectedLayers,
      activePage: state?.activePage,
    })
  );
  const [duplicateIds, setDuplicateIds] = useState([]);

  const findDuplicateIds = (res) => {
    const seenIds = {};
    const duplicates = [];

    for (const obj of res) {
      const eventId = obj.eventId;
      const id = obj.id;

      if (!seenIds[eventId]) {
        seenIds[eventId] = true;
      } else {
        if (!duplicates.includes(eventId)) {
          duplicates.push({ id: id, eventId: eventId });
        }
      }

      duplicates.map((data) => {
        actions.setProp(activePage, [data?.id], {
          eventId: "",
        });
      });
    }

    setDuplicateIds(duplicates);
  };

  function checkAndRemove(propertyIdArray) {
    let array2 = propertyIdArray;
    let array1 = Object?.keys(pages[activePage]?.layers)?.map(
      (ids) => pages[activePage]?.layers[ids]?.data
    );
    array1 = [].concat(...array1);

    const idSet1 = array1.map(
      (obj) => obj?.props?.eventChildId && obj?.props?.eventChildId
    );
    let idSet2 = array2.map((obj) => {
      return obj.child.map((childObj) => childObj.componentId);
    });
    idSet2 = idSet2.flat(Infinity);
    if (idSet1?.length && idSet2?.length) {
      const isExist = idSet2?.every((id) => idSet1?.includes(id));
      if (!isExist) {
        for (let j = 0; j < array2.length; j++) {
          for (let i = 0; i < array2[j].child.length; i++) {
            const obj2 = array2[j].child[i];
            let foundInArray1;
            if (array2[j].activePage === activePage) {
              foundInArray1 = array1?.some((obj1) => {
                return obj1?.props?.eventChildId === obj2?.componentId;
              });
            } else {
              foundInArray1 = true;
            }
            if (!foundInArray1) {
              // Remove obj2 from array2

              array2[j].child.splice(i, 1);
              i--; // Decrement i to account for the removed element
            }
          }
        }
        // setPropertyName(array2);
      }
    }
  }

  useEffect(() => {
    try {
      if (
        allLayers.current.length < Object.keys(pages[0].layers).length &&
        !dragged
      ) {
        allLayers.current = Object.keys(pages[0].layers);
        let res = [];
        Object?.keys(pages[0]?.layers)?.map((ids) => {
          if (pages[0]?.layers[ids]?.data?.name === "Group") {
            res.push({
              id: ids,
              eventId: pages[0]?.layers[ids]?.data?.props?.eventId,
            });
          }
        });
        findDuplicateIds(res);
      } else if (
        allLayers.current.length > Object.keys(pages[0].layers).length &&
        !dragged
      ) {
        allLayers.current = Object.keys(pages[0].layers);
        checkAndRemove(propertyName);
      }
    } catch (e) {
      toast.error(`Something Went Wrong`, {
        position: "top-right",
        autoClose: 1000,
      });
    }
  }, [Object?.keys(pages[activePage]?.layers)?.length]);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
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
  const [propertyKey, setPropertyKey] = useState();
  // const [eDate, seteDate] = useState();
  // const [eTime, seteTime] = useState();
  // const [eVenue, seteVenue] = useState();
  // const [eTheme, seteTheme] = useState();
  // const [eColourCode, seteColourCode] = useState();
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        flexDirection: "column",
        overflowY: "auto",
        display: "flex",
      }}>
      <ToastContainer></ToastContainer>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <TextField
            id="standard-basic"
            label="Event Component Name"
            variant="outlined"
            multiline
            onChange={(e) => setPropertyNameadd(e.target.value)}></TextField>

          {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label='Event Date'
              // defaultValue={dayjs(data?.date)}
              onChange={(e) => {
                seteDate(e.$d);
              }}
            />
          </LocalizationProvider>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MobileTimePicker
              label='Event Time'
              ampm={false}
              // defaultValue={dayjs(data?.time)}
              onChange={(e) => {
                seteTime(e.$d);
              }}
            />
          </LocalizationProvider>

          <TextField
            id='standard-basic'
            label='Event Venue'
            variant='outlined'
            multiline
            onChange={(e) => seteVenue(e.target.value)}
          ></TextField>
          <div style={{ display: 'flex', gap: '10px' }}>
            <TextField
              id='standard-basic'
              label='Event Theme'
              variant='outlined'
              multiline
              onChange={(e) => seteTheme(e.target.value)}
            ></TextField>
            <TextField
              id='standard-basic'
              label='Colour Code'
              variant='outlined'
              multiline
              onChange={(e) => seteColourCode(e.target.value)}
            ></TextField>
          </div> */}
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
              try {
                const events = propertyName;
                const id = uuidv4();
                if (typeof events[propertyKey].child !== "array")
                  // events[propertyKey].child = [];

                  events[propertyKey].child.push({
                    componentName: propertyNameadd,
                    componentId: id,
                  });
                actions.setProp(activePage, layers[activePage][0], {
                  eventId: events[propertyKey].propertyId,
                });
                actions.setProp(activePage, layers[activePage][0], {
                  eventChildId: id,
                });
                setPropertyName(events);
                handleClose();
              } catch (e) {
                toast.error(`Something Went Wrong`, {
                  position: "top-right",
                  autoClose: 1000,
                });
              }
              //------------------------------------------------------
              // let isGroup = false;
              // const id123 = layers[activePage][0];
              // const eId123 = pages[activePage]?.layers[id123]?.data;
              // propertyName.map((item) => {
              //   if (item.propertyId === eId123?.props?.eventId) {
              //     isGroup = true;
              //   }
              // });
              // if (!Object?.keys(layers)?.length) {
              //   return alert('please select a layer');
              // } else if (layers[activePage].length > 1) {
              //   return alert('please selct one group');
              // } else if (isGroup) {
              //   return alert('Select other layer');
              // }
              // // else if (layers[activePage][0]) {
              // //   return alert("layer should be group");
              // // }
              // else if (
              //   pages[activePage].layers[layers[activePage][0]].data.type !==
              //   'Group'
              // ) {
              //   return alert('layer should be group');
              // } else if (isGroup) {
              //   return alert('select other group');
              // }
              // const id = uuidv4();
              // propertyName.push({
              //   property: propertyNameadd,
              //   propertyId: id,
              //   eDate,
              //   eTime,
              //   eVenue,
              //   eTheme,
              //   eColourCode,
              //   activePage,
              // });
              // actions.setProp(activePage, layers[activePage][0], {
              //   eventId: id,
              // });
              // setPropertyNameadd('');
              // seteColourCode('');
              // seteTheme('');
              // seteVenue('');
              // seteTime('');
              // seteDate('');
              // handleClose();
            }}>
            Save
          </button>
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
        }}>
        <p
          style={{
            fontWeight: 600,
            fontSize: "15px",
            color: "#181C32",
            flexGrow: 1,
            marginBottom: "0px",
          }}>
          Events
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
          onClick={onClose}>
          <XIcon />
        </div>
      </div>
      <div
        style={{ flexDirection: "column", overflowY: "auto", display: "flex" }}>
        <div
          style={{
            flexGrow: 1,
            overflowY: "auto",
            display: "grid",
            // gridTemplateColumns: 'repeat(3,minmax(0,1fr))',
            gridGap: 10,
            padding: "16px",
          }}>
          {/* <button
            style={{
              padding: '5px',
              border: 'none',
              background: '#B4245D',
              color: 'white',
              fontSize: '15px',
              fontWeight: '600',
              borderRadius: '5px',
            }}
            onClick={() => setOpen(true)}
          >
            + Add
          </button> */}
          {propertyName?.length ? (
            propertyName?.map((item, key) => {
              return (
                <div
                  style={{
                    border: "1px solid black",
                    padding: "7px",
                    margin: "5px",
                    borderRadius: "10px",
                  }}>
                  <button
                    style={{
                      padding: "5px",
                      marginBottom: "5px",
                      border: "none",
                      background: "#B4245D",
                      color: "white",
                      fontSize: "15px",
                      fontWeight: "600",
                      borderRadius: "5px",
                      width: "100%",
                    }}
                    onClick={() => {
                      try {
                        if (layers[activePage][0] === "ROOT") {
                          return alert("whole page cant be event");
                        } else if (
                          pages[activePage].layers[layers[activePage][0]].data
                            .props.eventChildId ||
                          pages[activePage].layers[layers[activePage][0]].data
                            .props.eventId
                        ) {
                          return alert("Duplication of event is not allowed");
                        } else if (
                          pages[activePage].layers[layers[activePage][0]].data
                            .props.rsvp
                        ) {
                          return alert("cannot mark RSVP Layers");
                        } else if (layers[activePage].length > 1) {
                          return alert("cannot mark more then 1 layer");
                        }
                        handleOpen();
                        setPropertyKey(key);
                      } catch (e) {
                        toast.error(`Something Went Wrong`, {
                          position: "top-right",
                          autoClose: 1000,
                        });
                      }
                    }}>
                    <span
                      style={{
                        fontSize: "18px",
                        fontFamily: "Ledger",
                        textTransform: "capitalize",
                      }}>
                      + Add {item.property}
                    </span>
                  </button>
                  {item?.child?.map((data, childkey) => {
                    return (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginLeft: "30%",
                          color: "grey",
                        }}>
                        <span
                          style={{
                            fontSize: "18px",
                            fontFamily: "Ledger",
                            textTransform: "capitalize",
                          }}
                          onClick={() => {
                            try {
                              const newarr = [...propertyName];
                              const id =
                                newarr[key]["child"][childkey].componentId;

                              let array1 = Object?.keys(
                                pages[activePage]?.layers
                              )?.map((ids) => pages[activePage]?.layers[ids]);

                              let FilteredId = array1?.filter(
                                (key) => key?.data?.props?.eventChildId === id
                              );
                              actions.selectLayers(
                                activePage,
                                FilteredId[0]?.id
                              );
                            } catch (e) {
                              toast.error(`Something Went Wrong`, {
                                position: "top-right",
                                autoClose: 1000,
                              });
                            }
                          }}>
                          {data.componentName}
                        </span>
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
                            try {
                              if (item.activePage === activePage) {
                                const newarr = [...propertyName];
                                const id =
                                  newarr[key]["child"][childkey].componentId;

                                let array1 = Object?.keys(
                                  pages[activePage]?.layers
                                )?.map((ids) => pages[activePage]?.layers[ids]);

                                let FilteredId = array1?.filter(
                                  (key) => key?.data?.props?.eventChildId === id
                                );
                                if (FilteredId.length) {
                                  actions.setProp(
                                    activePage,
                                    FilteredId[0]?.id,
                                    {
                                      eventId: "",
                                    }
                                  );
                                  actions.setProp(
                                    activePage,
                                    FilteredId[0]?.id,
                                    {
                                      eventChildId: "",
                                    }
                                  );
                                }
                                // actions.deleteLayer(
                                //   activePage,
                                //   FilteredId[0]?.id
                                // );
                                newarr[key]["child"].splice(childkey, 1);
                                setPropertyName(newarr);
                              } else {
                                alert("cannot delete from other page");
                              }
                            } catch (e) {
                              toast.error(`Something Went Wrong`, {
                                position: "top-right",
                                autoClose: 1000,
                              });
                            }
                          }}>
                          <XIcon />
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Events;

import React, { useEffect, useState } from "react";
import styles from "../../styles/planning.module.scss";
import {
  Box,
  Checkbox,
  Modal,
  Select,
  TextField,
  Tooltip,
} from "@mui/material";
import useWindowSize from "@rooks/use-window-size";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, user } from "../../redux/reducer/appEssentials";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Chart as Chart1, ArcElement } from "chart.js";
import dynamic from "next/dynamic";
import { Spinner } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import ApprovalIcon from "@mui/icons-material/Approval";
import {
  guestlistval1,
  guestlistval2,
  guestlistval3,
} from "../../yupValidation/planningToolsValidation";
import { useRouter } from "next/router";
import {
  DatePicker,
  LocalizationProvider,
  MobileTimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { v4 as uuidv4 } from "uuid";
import {
  useFamilyCreateMutation,
  useFamilyDeleteMutation,
  useGetEventGuestQuery,
  useGetFamilyArrayQuery,
  useGetFamilyDataQuery,
  useGetGuestAttendanceQuery,
  useGetGuestGendersQuery,
  useGetGuestGroupQuery,
  useGetGuestMenuQuery,
  useGetGuestQuery,
  useGetInvitesDataQuery,
  useGuestAddMutation,
  useGuestDeleteMutation,
  useGuestUpdateMutation,
  useInviteUpdateMutation,
  useSendInviteOneonOneGuestsMutation,
  useSendInvitetoAllGuestsMutation,
} from "redux/Api/guestList.api";
import {
  useDeleteTGMMutation,
  useGetAPDQuery,
  useGetATQuery,
  useGetInviteSentQuery,
  useUpdateTGMMutation,
} from "redux/Api/planningTools.api";
import Head from "next/head";
import { S3PROXY } from "../../config";
import { object } from "prop-types";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

Chart1.register(ArcElement);
const GuestAttendanceList = ({
  name,
  value,
  values,
  objId,
  setupdate123,
  update123,
}) => {
  const [attendance, setAttendance] = useState();
  const [guestUpdate] = useGuestUpdateMutation();
  return (
    <article
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        fontSize: "20px",
        color: "gray",
        fontWeight: "600",
      }}
    >
      <span style={{ width: "50%", overflow: "scroll" }}>
        {name[0].property}
      </span>
      <Select
        className={styles.checkbox2input}
        style={{ width: "50%" }}
        defaultValue={value}
        value={attendance}
        labelId="demo-simple-select-label"
        onChange={async (e) => {
          try {
            setAttendance(e.target.value);
            const res = await guestUpdate({
              id: values._id,
              eventId: objId,
              value: e.target.value,
              attendevent: true,
              type: "NoFamily",
            });
            setupdate123(!update123);
          } catch (e) {}
        }}
      >
        <MenuItem value={0}>Not Attending</MenuItem>
        <MenuItem value={1}>Attending</MenuItem>
        <MenuItem value={2}>Pending</MenuItem>
      </Select>{" "}
    </article>
  );
};
const GuestListRow = ({
  checkedbox,
  setCountCheck,
  setCheckedbox,
  countcheck,
  length,
  setIds,
  ids,
  values,
  handleEditopen,
  config,
  setupdate123,
  setOpenLoadingModal,
  update123,
  events,
}) => {
  const { innerWidth: windowWidth } = useWindowSize();
  const [guestUpdate] = useGuestUpdateMutation();
  useEffect(() => {
    try {
      setCheckedboxone(checkedbox);
      if (!checkedbox) {
        setIds([]);
      }
    } catch (e) {}
  }, [checkedbox]);
  const updateAttending = async (value, type) => {
    try {
      if (type === "menu") {
        const res = await guestUpdate({
          id: values._id,
          menu: value,
          type: "NoFamily",
        });
        if (res?.data?.success) {
          setupdate123(!update123);
        }
      }
      if (type === "attend") {
        const res = await guestUpdate({
          id: values._id,
          attendence: value,
          type: "NoFamily",
        });
        if (res?.data?.success) {
          setupdate123(!update123);
        }
      }
      if (type === "invite") {
        const res = await guestUpdate({
          id: values._id,
          inviteSent: value,
          type: "NoFamily",
        });
        if (res?.data?.success) {
          setupdate123(!update123);
        }
      }
    } catch (e) {}
  };
  const [checkedboxone, setCheckedboxone] = useState(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: windowWidth >= 900 ? "450px" : windowWidth >= 460 ? "95%" : "95%",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 3,
    borderRadius: "10px",
    height: "fit-content",
    overflow: "scroll",
    zIndex: "-1",
  };
  const [modaldata, setModalData] = useState();

  const [open1, setOpen1] = React.useState(false);
  const handleOpen1 = () => {
    setOpen1(true);
  };
  const handleClose1 = () => {
    setOpen1(false);
  };
  const [guestDelete] = useGuestDeleteMutation();
  return (
    <div className={styles.under900}>
      <Modal
        open={open1}
        onClose={handleClose1}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div
            className={styles.mainModaldiv}
            style={{ position: "relative", marginBottom: "20px" }}
          >
            <span className={styles.seemoreX} onClick={() => handleClose1()}>
              <img src={`${S3PROXY}/public/images/webp/Vector12.webp`} alt="" />
            </span>
            <div className={styles.seemorehead}>
              <span>Events Attendance</span>
            </div>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "15px" }}
          >
            {modaldata?.map((data) => {
              const objId = Object.keys(data)[0];
              const value = data[objId];
              const name = events.filter((data1) => {
                if (data1.propertyId == objId) {
                  return data1;
                }
              });

              return (
                <GuestAttendanceList
                  name={name}
                  value={value}
                  values={values}
                  objId={objId}
                  setupdate123={setupdate123}
                  update123={update123}
                  handleClose1={handleClose1}
                />
              );
            })}
          </div>
        </Box>
      </Modal>
      <div className={styles.guestlisttablerows}>
        <div className={styles.checkbox}>
          <article className={styles.checkbox1}>
            <input
              type="checkbox"
              style={{
                height: "1.5rem",
                width: "1.5rem",
                accentColor: "#b6255a",
              }}
              checked={checkedboxone}
              onChange={(e) => {
                try {
                  setCheckedboxone(e.target.checked);
                  if (e.target.checked) {
                    setCountCheck((value) => ++value);
                    setIds([...ids, values._id]);
                    if (countcheck === length) {
                      setCheckedbox(true);
                    }
                  } else {
                    setCountCheck((value) => --value);
                    if (countcheck === 1) {
                      setCheckedbox(false);
                    }
                    const newId = ids.filter(
                      (values1) => values1 !== values._id
                    );
                    setIds(newId);
                  }
                } catch (e) {}
              }}
            ></input>
            <span>{values?.name}</span>
            {windowWidth > 900 ? (
              <>
                <span>{values?.gender}</span>
                <span>{values?.group}</span>
                <span>{values?.family}</span>
                <span>{values?.menu}</span>
              </>
            ) : (
              <></>
            )}
            <span>
              <div
                className={styles.todoBtn}
                style={{ width: "100%", justifyContent: "end" }}
              >
                <div
                  style={{ display: "flex", gap: "15px", marginRight: "10px" }}
                >
                  <Tooltip title="Attendance">
                    <span
                      className={styles.checkbox2}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        handleOpen1();
                        setModalData(values.EventsAttendance);
                      }}
                    >
                      <ApprovalIcon
                        sx={{
                          color: "gray",
                          fontSize: "26px",
                        }}
                      />
                    </span>
                  </Tooltip>
                </div>
                <button
                  onClick={() =>
                    handleEditopen(
                      values._id,
                      values.name,
                      values.gender,
                      values.group,
                      values.menu,
                      values.family,
                      values.Events,
                      values.Mobile
                    )
                  }
                >
                  <img
                    src={`${S3PROXY}/public/images/webp/fluent-mdl2_edit.webp`}
                    alt=""
                  />
                </button>

                {values?.group === "Couples" ? (
                  <></>
                ) : (
                  <button
                    onClick={async () => {
                      setOpenLoadingModal(true);
                      const res = await guestDelete(values._id);
                      if (res?.data?.success) {
                        setupdate123(!update123);

                        setOpenLoadingModal(false);
                        toast.success("Guest Deleted Successfully", {
                          position: "top-right",
                          autoClose: 1000,
                        });
                      }
                    }}
                  >
                    <img
                      src={`${S3PROXY}/public/images/webp/delete.webp`}
                      alt=""
                    />
                  </button>
                )}
              </div>
            </span>
            {/* <div
              className={styles.todoBtn}
              style={{ width: '25%', justifyContent: 'end' }}
            >
              <div
                style={{ display: 'flex', gap: '15px', marginRight: '10px' }}
              >
                <Tooltip title='Attendance'>
                  <span
                    className={styles.checkbox2}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      handleOpen1();
                      setModalData(values.EventsAttendance);
                    }}
                  >
                    <ApprovalIcon
                      sx={{
                        color: 'gray',
                        fontSize: '26px',
                      }}
                    />
                  </span>
                </Tooltip>
              </div>
              <button
                onClick={() =>
                  handleEditopen(
                    values._id,
                    values.name,
                    values.gender,
                    values.group,
                    values.menu,
                    values.family,
                    values.Events,
                    values.Mobile
                  )
                }
              >
                <img
                  src={`${S3PROXY}/public/images/webp/fluent-mdl2_edit.webp`}
                  alt=''
                />
              </button>

              {values?.group === 'Couples' ? (
                <></>
              ) : (
                <button
                  onClick={async () => {
                    setOpenLoadingModal(true);
                    const res = await guestDelete(values._id);
                    if (res?.data?.success) {
                      setupdate123(!update123);

                      setOpenLoadingModal(false);
                      toast.success('Guest Deleted Successfully', {
                        position: 'top-right',
                        autoClose: 1000,
                      });
                    }
                  }}
                >
                  <img
                    src={`${S3PROXY}/public/images/webp/delete.webp`}
                    alt=''
                  />
                </button>
              )}
            </div> */}
          </article>
        </div>
      </div>
    </div>
  );
};
const GuestListCat = ({
  values,
  key123,
  config,
  aGM,
  handleEditopen,
  submit,
  arrayMenues,
  update123,
  setupdate123,
  setOpenLoadingModal,
  dataArray,
  family,
  realValue,
  events,
  inviteSented,
}) => {
  const [sendInviteOneonOneGuests] = useSendInviteOneonOneGuestsMutation();
  const { innerWidth: windowWidth } = useWindowSize();
  const globleuser = useSelector(selectUser);
  const [checkedbox, setCheckedbox] = useState();
  const [menu, setMenu] = useState();
  const [arr, setArr] = useState([1, 2, 3, 4, 5]);
  const [countcheck, setCountCheck] = useState(0);
  const [ids, setIds] = useState([]);
  const [data, setData] = useState(!family ? dataArray : []);
  const { data: familyData } = useGetFamilyDataQuery(values);
  const { data: eventData } = useGetEventGuestQuery(realValue);
  useEffect(() => {
    try {
      (async () => {
        if (family) {
          const res = { data: familyData };
          setData(res?.data?.data);
        }
      })();
      (async () => {
        if (aGM === "Events") {
          const res = { data: eventData };
          setData(res?.data?.data);
        }
      })();
    } catch (e) {}
  }, [aGM, familyData, eventData]);
  const [id, setId] = useState();
  const { data: inviteData } = useGetInvitesDataQuery();
  useEffect(() => {
    try {
      (async () => {
        const res = { data: inviteData };
        setId(res?.data?.data?._id);
      })();
    } catch (e) {}
  }, [inviteData]);
  const router = useRouter();
  const [guestUpdate] = useGuestUpdateMutation();
  const [guestDelete] = useGuestDeleteMutation();
  // const [inviteSented, setInviteSented] = useState(false);
  return (
    <div className={styles.guestLiscell}>
      <div className={styles.guestlisttablehead}>
        <span>
          {aGM === "Family" ? realValue.FamilyName : values}
          <div>
            {aGM === "Family" &&
              (data?.length === 0 || dataArray?.length === 0 ? (
                <></>
              ) : inviteSented ? (
                <>
                  <button
                    disabled
                    className={styles.deleteCategorybtn}
                    style={{ color: "lightgreen" }}
                  >
                    Invite Sent
                  </button>
                  <CardGiftcardIcon
                    sx={{
                      color: "lightgreen",
                      fontSize: "26px",
                    }}
                  ></CardGiftcardIcon>
                </>
              ) : (
                <button
                  className={styles.deleteCategorybtn}
                  style={{ color: "#B4245D " }}
                  onClick={async () => {
                    const res = await sendInviteOneonOneGuests({
                      id: values,
                      inviteId: id,
                    });
                    // router.push(`/InvitationCard?id=${id}&FamilyId=${values}`);
                  }}
                >
                  Send Invite
                </button>
              ))}
            {data?.length === 0 || dataArray?.length === 0 ? (
              <button
                className={styles.deleteCategorybtn}
                onClick={() => {
                  submit(values, key123, aGM, family, realValue);
                }}
              >
                <img src={`${S3PROXY}/public/images/webp/delete.webp`} alt="" />
              </button>
            ) : aGM === "Attendance" ? (
              <></>
            ) : (
              <></>
            )}
          </div>
        </span>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
          className={styles.guestlistcellhead}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "25px" }}>
            <div>
              <input
                type="checkbox"
                style={{
                  height: "1.5rem",
                  width: "1.5rem",
                  accentColor: "#b6255a",
                }}
                checked={
                  family
                    ? data?.length === countcheck
                    : dataArray?.length === countcheck
                }
                onChange={(e) => {
                  try {
                    setCheckedbox(e.target.checked);
                    if (e.target.checked) {
                      setCountCheck(family ? data?.length : dataArray?.length);
                      const newId = [];
                      family
                        ? data?.map((values) => {
                            newId = [...newId, values._id];
                          })
                        : dataArray?.map((values) => {
                            newId = [...newId, values._id];
                          });
                      setIds(newId);
                    } else {
                      setCountCheck(0);
                    }
                  } catch (e) {}
                }}
              ></input>
              {/* <Checkbox
                checked={
                  family
                    ? data?.length === countcheck
                    : dataArray?.length === countcheck
                }
              ></Checkbox> */}
              {countcheck <= 0 ? (
                <>
                  <span>Name</span>
                  {windowWidth > 900 ? (
                    <>
                      <span>Gender</span>
                      <span>Group</span>
                      <span>Family</span>
                      <span>Events</span>
                      <span></span>
                    </>
                  ) : (
                    <></>
                  )}
                </>
              ) : (
                <></>
              )}
            </div>
            {windowWidth > 900 ? (
              countcheck > 0 ? (
                <div className={styles.afterShow}>
                  <span className={styles.checkbox2}>
                    <Select
                      className={styles.checkbox2input}
                      value={menu}
                      labelId="demo-simple-select-label"
                      label="Gender"
                      onChange={(e) => {
                        try {
                          if (ids?.length) {
                            ids.forEach(async (values) => {
                              const res = await guestUpdate({
                                id: values,
                                type: "NoFamily",
                                menu: e.target.value,
                              });
                            });
                            setupdate123((data) => !data);
                          }
                        } catch (e) {}
                      }}
                    >
                      {arrayMenues?.map((values, key) => {
                        return <MenuItem value={values}>{values}</MenuItem>;
                      })}
                    </Select>
                  </span>
                  <button
                    onClick={() => {
                      try {
                        setOpenLoadingModal(true);
                        if (ids?.length) {
                          ids.forEach(async (values) => {
                            const res = await guestDelete(values);
                          });
                          setupdate123((data) => !data);
                          setOpenLoadingModal(false);
                          toast.success("Guests Deleted Successfully", {
                            position: "top-right",
                            autoClose: 1000,
                          });
                        }
                      } catch (e) {}
                    }}
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <></>
              )
            ) : (
              <></>
            )}
          </div>
        </div>
        {windowWidth < 901 ? (
          countcheck > 0 ? (
            <div className={styles.topheadund900}>
              <div className={styles.afterShow}>
                <span className={styles.checkbox2}>
                  <Select
                    className={styles.checkbox2input}
                    value={menu}
                    labelId="demo-simple-select-label"
                    // id="demo-simple-select"
                    label="Gender"
                    onChange={(e) => {
                      try {
                        if (ids?.length) {
                          ids.forEach(async (values) => {
                            const res = await guestUpdate({
                              id: values,
                              menu: e.target.value,
                              type: "NoFamily",
                            });
                          });
                          setupdate123((data) => !data);
                        }
                      } catch (e) {}
                    }}
                  >
                    {arrayMenues?.map((values, key) => {
                      return <MenuItem value={values}>{values}</MenuItem>;
                    })}
                  </Select>
                </span>
                <button
                  onClick={() => {
                    try {
                      if (ids?.length) {
                        ids.forEach(async (values) => {
                          const res = await guestDelete(values);
                        });
                        setupdate123((data) => !data);
                      }
                    } catch (e) {}
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          ) : (
            <></>
          )
        ) : (
          <></>
        )}
      </div>
      <div className={styles.rowsTable}>
        {family ? (
          data?.length ? (
            data?.map((values, key) => {
              return (
                <GuestListRow
                  checkedbox={checkedbox}
                  setCountCheck={setCountCheck}
                  setCheckedbox={setCheckedbox}
                  countcheck={countcheck}
                  length={arr?.length}
                  setIds={setIds}
                  ids={ids}
                  values={values}
                  key={key}
                  handleEditopen={handleEditopen}
                  config={config}
                  arrayMenues={arrayMenues}
                  update123={update123}
                  setupdate123={setupdate123}
                  setOpenLoadingModal={setOpenLoadingModal}
                  events={events}
                ></GuestListRow>
              );
            })
          ) : (
            <h4 style={{ width: "100%", padding: "10px 30px" }}>
              No Data Found
            </h4>
          )
        ) : dataArray?.length ? (
          dataArray?.map((values, key) => {
            return (
              <GuestListRow
                checkedbox={checkedbox}
                setCountCheck={setCountCheck}
                setCheckedbox={setCheckedbox}
                countcheck={countcheck}
                length={arr?.length}
                setIds={setIds}
                ids={ids}
                values={values}
                key={key}
                handleEditopen={handleEditopen}
                config={config}
                arrayMenues={arrayMenues}
                update123={update123}
                setupdate123={setupdate123}
                setOpenLoadingModal={setOpenLoadingModal}
                events={events}
              ></GuestListRow>
            );
          })
        ) : (
          <h4 style={{ width: "100%", padding: "10px 30px" }}>No Data Found</h4>
        )}
        {}
      </div>
    </div>
  );
};
const GuestList = () => {
  const [openLoadingModal, setOpenLoadingModal] = useState(false);
  const [openEvents, setOpenEvents] = useState(false);
  const loadingStyles = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100px",
    bgcolor: "background.paper",

    boxShadow: 24,
    p: 4,
    borderRadius: "10px",
    height: "100px",
    overflow: "scroll",

    zIndex: "-1",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  const globleuser = useSelector(selectUser);
  const dispatch = useDispatch();
  const [propertyNameadd, setPropertyNameadd] = useState();
  const [eDate, seteDate] = useState();
  const [eTime, seteTime] = useState();
  const [eVenue, seteVenue] = useState();
  const [eTheme, seteTheme] = useState();
  const [eColourCode, seteColourCode] = useState();
  const { innerWidth: windowWidth } = useWindowSize();
  const config = {
    headers: { authorization: globleuser?.data?.token },
  };
  const [arrayMenues, setarrayMenues] = useState([]);
  const [arrayGroup, setarrayGroup] = useState([]);
  const [arrayFamily, setarrayFamily] = useState([]);
  const [arrayGroup1, setarrayGroup1] = useState([]);
  const [arrayFamily1, setarrayFamily1] = useState([]);

  const [inviteSent, setInviteSent] = useState();

  const [attendingTotal, setAttendingTotal] = useState();
  const [menuReport, setMenuReport] = useState();

  const [groupReport, setGroupReport] = useState();
  const [genderReport, setGenderReport] = useState();
  const [apd, setApd] = useState();
  const [reportPage, setReportpage] = useState(true);
  const { data: resinviteSent } = useGetInviteSentQuery();
  const { data: resat } = useGetATQuery();
  const { data: resapd } = useGetAPDQuery();
  const { data: resgenders } = useGetGuestGendersQuery();
  const { data: resgroup } = useGetGuestGroupQuery(arrayGroup);
  const { data: resmenu } = useGetGuestMenuQuery(arrayMenues);
  useEffect(() => {
    try {
      const getAllreportdata = async () => {
        const res = { data: resinviteSent };
        setInviteSent(res?.data?.data);
        const res1 = { data: resat };
        setAttendingTotal(res1?.data?.data);
        const res2 = { data: resapd };
        setApd(res2?.data?.data);
        const res3 = { data: resmenu };
        setMenuReport(res3?.data?.data);
        const res4 = { data: resgroup };
        setGroupReport(res4?.data?.data);
        const res5 = { data: resgenders };
        setGenderReport(res5?.data?.data);
      };
      getAllreportdata();
    } catch (e) {}
  }, [
    reportPage,
    arrayMenues,
    arrayGroup,
    resinviteSent,
    resat,
    resapd,
    resgenders,
    resgroup,
    resmenu,
  ]);

  const [update123, setupdate123] = useState(false);

  const [arrayAttendance, setarrayAttendance] = useState([0, 1, 2]);
  const [arrayMenues1, setarrayMenues1] = useState([]);
  const [arrayAttendance1, setarrayAttendance1] = useState();
  const [allAttendance, setAllAttendance] = useState();
  const [events, setEvents] = useState([]);
  const [id, setId] = useState();
  const { data: invitesData } = useGetInvitesDataQuery();
  useEffect(() => {
    const getEvents = async () => {
      try {
        const res = { data: invitesData };
        setEvents(res?.data?.data?.events);
        setId(res?.data?.data?._id);
      } catch (e) {}
    };
    getEvents();
  }, [invitesData]);
  const { data: resGrouparray } = useGetGuestQuery({
    category: globleuser?.data?.guest,
    type: "group",
  });
  const { data: resMenuarray } = useGetGuestQuery({
    category: globleuser?.data?.menu,
    type: "menu",
  });
  const { data: resAttenanceArray } = useGetGuestQuery({
    category: [0, 1, 2],
    type: "attendence",
  });
  const { data: familyArray } = useGetFamilyArrayQuery();
  const { data: guestAttendance } = useGetGuestAttendanceQuery();
  useEffect(() => {
    try {
      (async () => {
        const res = { data: resGrouparray };
        setarrayGroup1(res?.data?.data);
      })();
      (async () => {
        const res = { data: familyArray };
        setarrayFamily1(res?.data?.data);
      })();
      (async () => {
        const res = { data: guestAttendance };
        setAllAttendance(res?.data?.data);
      })();

      (async () => {
        const res = { data: resMenuarray };
        setarrayMenues1(res?.data?.data);
      })();
      (async () => {
        const res = { data: resAttenanceArray };
        setarrayAttendance1(res?.data?.data);
      })();
      setarrayGroup(globleuser?.data?.guest);
      setarrayFamily(globleuser?.data?.family);
      setarrayMenues(globleuser?.data?.menu);
    } catch (e) {}
  }, [
    globleuser,
    update123,
    resAttenanceArray,
    resMenuarray,
    resGrouparray,
    guestAttendance,
    familyArray,
  ]);

  const [open1, setOpen1] = useState(false);
  const [open4, setOpen4] = useState(false);

  const handleClose1 = () => {
    setOpen1(false);
  };

  const handleOpen1 = () => {
    setOpen1(true);
  };
  const handleClose4 = () => {
    setOpen4(false);
  };
  const handleOpen4 = () => {
    setOpen4(true);
  };
  const [open2, setOpen2] = useState(false);

  const handleClose2 = () => {
    setOpen2(false);
  };
  const handleOpen2 = () => {
    setOpen2(true);
  };
  const [open3, setOpen3] = useState(false);

  const handleClose3 = () => {
    setOpen3(false);
  };
  const handleOpen3 = () => {
    setOpen3(true);
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: windowWidth >= 900 ? "450px" : windowWidth >= 460 ? "90%" : "95%",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: "10px",
    alignItems: "center",
    justifyContent: "center",
    height: windowWidth >= 900 ? "350px" : "fit-content",
    overflow: "scroll",

    zIndex: "-1",
  };
  const style1 = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: windowWidth >= 900 ? "450px" : windowWidth >= 460 ? "90%" : "95%",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: "10px",
    alignItems: "center",
    justifyContent: "center",
    height: windowWidth >= 900 ? "450px" : "fit-content",
    overflow: "scroll",

    zIndex: "-1",
  };
  const [aGM, setAGM] = useState("Group");
  const [groupName, setGroupName] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [familyPhone, setFamilyPhone] = useState("");
  const [menuName, setMenuName] = useState("");
  const [guestName, setGuestName] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [guestAge, setGuestAge] = useState("Adult");
  const [guestgender, setGuestGender] = useState("");
  const [guestGroup, setGuestGroup] = useState("");
  const [guestFamily, setGuestFamily] = useState("");
  const [guestMenu, setGuestMenu] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);

  const [arrayGender, setArrayGender] = useState([
    "Male",
    "Female",
    "Male-child",
    "Female-child",
  ]);
  const [updateTGM] = useUpdateTGMMutation();
  const handleSubmitforGroup = async () => {
    try {
      await guestlistval1.validate(groupName);
      setOpenLoadingModal(true);
      const array12 = [...arrayGroup, groupName];
      const res = await updateTGM({
        guest: array12,
      });

      setGroupName("");
      setupdate123((data) => !data);
      const d = JSON.parse(JSON.stringify(res.data));
      d.data.token = globleuser?.data?.token;
      dispatch(user(d));
      localStorage.setItem("wedfield", JSON.stringify(d));

      setOpenLoadingModal(false);
      setOpen1(false);

      toast.success("Group Added Successfully", {
        position: "top-right",
        autoClose: 1000,
      });
    } catch (e) {
      toast.error(`${e}`, {
        position: "top-right",
        autoClose: 2000,
      });
      setOpenLoadingModal(false);
    }
  };
  const [familyCreate] = useFamilyCreateMutation();
  const mitforFamily = async () => {
    try {
      setOpenLoadingModal(true);
      const res = await familyCreate({
        name: familyName,
        contact: familyPhone,
      });

      setFamilyName("");
      setFamilyPhone("");
      setupdate123((data) => !data);
      setOpenLoadingModal(false);
      setOpen1(false);
      toast.success("Family Added Successfully", {
        position: "top-right",
        autoClose: 1000,
      });
    } catch (e) {
      toast.error(`${e}`, {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };
  const [selectedbyName, setSelectedbyName] = useState([]);

  const handleSubmitforMenu = async () => {
    try {
      await guestlistval2.validate(menuName);
      setOpenLoadingModal(true);
      const array12 = [...arrayMenues, menuName];
      const res = await updateTGM({
        menu: array12,
      });

      setupdate123((data) => !data);
      setMenuName("");
      const d = JSON.parse(JSON.stringify(res.data));
      console.log("🚀 ~ file: GuestList.js:1123 ~ handleSubmitforMenu ~ d:", d);
      d.data.token = globleuser?.data?.token;
      dispatch(user(d));
      localStorage.setItem("wedfield", JSON.stringify(d));

      setOpenLoadingModal(false);
      setOpen2(false);
      toast.success("Menu Added Successfully", {
        position: "top-right",
        autoClose: 1000,
      });
    } catch (e) {
      toast.error(`${e}`, {
        position: "top-right",
        autoClose: 2000,
      });
      setOpenLoadingModal(false);
    }
  };
  const [guestAdd] = useGuestAddMutation();
  const [guestUpdate] = useGuestUpdateMutation();
  const handleGuestSubmit = async () => {
    try {
      if (guestFamily) {
        if (!selectedOptions.length) {
          return alert("Add Event");
        }
      }
      if (selectedOptions.length) {
        if (guestFamily === "") {
          return alert("Add Family");
        }
      }
      await guestlistval3.validate({
        name: guestName,
        phone: guestPhone,
        group: guestGroup,
        menu: guestMenu,
        gender: guestgender,
      });
      setOpenLoadingModal(true);
      if (!guestId) {
        const res = await guestAdd({
          name: guestName,
          Mobile: guestPhone,
          group: guestGroup,
          menu: guestMenu,
          gender: guestgender,
          family: guestFamily,
          Events: selectedOptions,
        });
        if (res?.data?.success) {
          setupdate123((data) => !data);
          setGuestName("");
          setGuestPhone("");
          setGuestGroup("");
          setGuestGender("");
          setGuestMenu("");
          setSelectedOptions([]);
          setGuestFamily("");
          setSelectedbyName("");
        }
      } else {
        const res = await guestUpdate({
          id: guestId,
          name: guestName,
          group: guestGroup,
          menu: guestMenu,
          gender: guestgender,
          family: guestFamily,
          Events: selectedOptions,
          Mobile: guestPhone,
        });
        if (res?.data?.success) {
          setupdate123((data) => !data);
          setGuestName("");
          setGuestGroup("");
          setGuestPhone("");
          setGuestGender("");
          setGuestMenu("");
          setSelectedOptions([]);
          setSelectedbyName("");
          setOpen3(false);
          setGuestFamily("");
        }
      }
      setOpenLoadingModal(false);
      toast.success("Guest Added Successfully", {
        position: "top-right",
        autoClose: 1000,
      });
    } catch (e) {
      toast.error(`${e}`, {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };
  const [guestId, setGuestId] = useState();
  const handleEditopen = async (
    id,
    name,
    gender,
    group,
    menu,
    family,
    Events,
    phone
  ) => {
    setGuestName(name);
    setGuestGender(gender);
    setGuestGroup(group);
    setGuestMenu(menu);
    setGuestFamily(family);
    setGuestPhone(phone);
    setSelectedOptions(Events);
    const filteredObjects = events?.filter((obj) =>
      Events.includes(obj.propertyId)
    );
    const resultArray = filteredObjects?.map((obj) => obj.property);
    setSelectedbyName(resultArray);
    setGuestId(id);
    setOpen3(true);
  };
  const submit = (cat, key, aGM, family, realValue) => {
    confirmAlert({
      title: "Confirm to delete",
      message: `Are you sure youe want to delete ${cat}`,
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            handleDeleteGroup(cat, key, aGM, family, realValue);
          },
        },
        {
          label: "No",
        },
      ],
    });
  };
  const [deleteTGM] = useDeleteTGMMutation();
  const [familyDelete] = useFamilyDeleteMutation();
  const [inviteUpdate] = useInviteUpdateMutation();
  const handleDeleteGroup = async (cat, key, aGM, family, realValue) => {
    try {
      setOpenLoadingModal(true);
      if (aGM === "Group") {
        const arr123 = [...arrayGroup];
        arr123.splice(key, 1);
        const res = await deleteTGM({
          guest: arr123,
          category: cat,
        });
        res.data.data.token = globleuser?.data?.token;
        dispatch(user(res.data));
        localStorage.setItem("wedfield", JSON.stringify(res.data));
      }
      if (aGM === "Menu") {
        const arr123 = [...arrayMenues];
        arr123.splice(key, 1);
        const res = await deleteTGM({
          menu: arr123,
          category: cat,
        });
        res.data.data.token = globleuser?.data?.token;
        dispatch(user(res.data));
        localStorage.setItem("wedfield", JSON.stringify(res.data));
      }
      if (aGM === "Family") {
        const res = await familyDelete(cat);
        setupdate123(!update123);
      }
      if (aGM === "Events") {
        const allEvents = events.filter((val) => {
          return val.propertyId !== realValue;
        });
        const allEventsId = allEvents.map((val) => {
          return val.propertyId;
        });

        const res = await inviteUpdate({
          eventID: allEventsId,
          events: allEvents,
        });
        setupdate123(!update123);
      }
      setOpenLoadingModal(false);
      toast.success("Guest Group Deleted Successfully", {
        position: "top-right",
        autoClose: 1000,
      });
    } catch (e) {
      toast.error(`${e}`, {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };
  const handleChange = (event) => {
    setSelectedOptions(event.target.value);
    const filteredObjects = events.filter((obj) =>
      event.target.value.includes(obj.propertyId)
    );
    const resultArray = filteredObjects.map((obj) => obj.property);

    setSelectedbyName(resultArray);
  };
  const [sendInvitetoAllGuests] = useSendInvitetoAllGuestsMutation();
  return (
    <div className={styles.VendorManagerDiv}>
      <Head>
        <title>Make Invitation List – WedField</title>
        <meta
          name="description"
          content="Inviting Guest for your Wedding. Make Invitation List just on one click on you your smartphone. By adding name, Phone number, Menu and much more – WedField"
        />
        <link
          name="canonical"
          href={`https://wedfield.com/user-dashboard?direction=GuestList`}
        />
      </Head>
      <Modal
        open={openLoadingModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={loadingStyles}>
          <Spinner></Spinner>
        </Box>
      </Modal>
      <Modal
        open={open1}
        onClose={handleClose1}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className={styles.mainModaldiv}>
            <div
              className={styles.Nameinput}
              style={{ width: "100%", gap: "10px" }}
            >
              <span>Group</span>
              <TextField
                value={groupName}
                id="standard-basic"
                label="Group Name"
                variant="outlined"
                onChange={(e) => {
                  setGroupName(e.target.value);
                }}
              />
            </div>
            <button
              className={styles.saveBtn}
              onClick={() => handleSubmitforGroup()}
            >
              Save
            </button>
          </div>
        </Box>
      </Modal>
      <Modal
        open={open4}
        onClose={handleClose4}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className={styles.mainModaldiv}>
            <div
              className={styles.Nameinput}
              style={{ width: "100%", gap: "10px" }}
            >
              <span>Family</span>
              <TextField
                value={familyName}
                id="standard-basic"
                label="Family Name"
                variant="outlined"
                onChange={(e) => {
                  setFamilyName(e.target.value);
                }}
              />
              <TextField
                value={familyPhone}
                id="standard-basic"
                label="Family Whatsapp number"
                variant="outlined"
                onChange={(e) => {
                  setFamilyPhone(e.target.value);
                }}
              />
            </div>
            <button
              className={styles.saveBtn}
              onClick={() => handleSubmitforFamily()}
            >
              Save
            </button>
          </div>
        </Box>
      </Modal>
      <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className={styles.mainModaldiv}>
            <div
              className={styles.Nameinput}
              style={{ width: "100%", gap: "10px" }}
            >
              <span>Menu</span>
              <TextField
                value={menuName}
                id="standard-basic"
                label="Menu Name"
                variant="outlined"
                onChange={(e) => {
                  setMenuName(e.target.value);
                }}
              />
            </div>
            <button
              className={styles.saveBtn}
              onClick={() => handleSubmitforMenu()}
            >
              Save
            </button>
          </div>
        </Box>
      </Modal>
      <Modal
        open={open3}
        onClose={handleClose3}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style1}>
          <div className={styles.mainModaldiv}>
            <div
              className={styles.Nameinput}
              style={{ width: "100%", gap: "5px" }}
            >
              <span>Guest Name</span>
              <TextField
                value={guestName}
                id="standard-basic"
                label="Guest Name"
                variant="outlined"
                onChange={(e) => {
                  setGuestName(e.target.value);
                }}
              />
            </div>
            <div
              className={styles.Nameinput}
              style={{ width: "100%", gap: "5px" }}
            >
              <span>Guest Phone</span>
              <TextField
                value={guestPhone}
                id="standard-basic"
                label="Guest Phone"
                variant="outlined"
                onChange={(e) => {
                  setGuestPhone(e.target.value);
                }}
              />
            </div>

            <div
              className={styles.Nameinput}
              style={{ width: "100%", gap: "5px", marginTop: "10px" }}
            >
              <span>Gender</span>
              <Select
                value={guestgender}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Gender"
                onChange={(e) => {
                  setGuestGender(e.target.value);
                }}
              >
                <MenuItem value={null} selected disabled>
                  Select Gender
                </MenuItem>
                {arrayGender?.map((values, key) => {
                  return <MenuItem value={values}>{values}</MenuItem>;
                })}
              </Select>
            </div>
            <div
              className={styles.Nameinput}
              style={{ width: "100%", gap: "5px", marginTop: "10px" }}
            >
              <span>Group</span>
              <Select
                value={guestGroup}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Group"
                onChange={(e) => {
                  setGuestGroup(e.target.value);
                }}
              >
                <MenuItem value={null} selected disabled>
                  Select Group
                </MenuItem>
                {arrayGroup?.map((values, key) => {
                  return <MenuItem value={values}>{values}</MenuItem>;
                })}
              </Select>
            </div>
            <div
              className={styles.Nameinput}
              style={{ width: "100%", gap: "5px", marginTop: "10px" }}
            >
              <span>Family</span>
              <Select
                value={guestFamily}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Family"
                onChange={(e) => {
                  setGuestFamily(e.target.value);
                }}
              >
                <MenuItem value={null} selected disabled>
                  Select Family
                </MenuItem>
                {arrayFamily1?.map((values, key) => {
                  return (
                    <MenuItem value={values?._id}>
                      {values?.FamilyName}
                    </MenuItem>
                  );
                })}
              </Select>
            </div>
            <div
              className={styles.Nameinput}
              style={{ width: "100%", gap: "5px", marginTop: "10px" }}
            >
              <span>Events</span>

              <Select
                labelId="multi-select-label"
                id="multi-select"
                multiple
                value={selectedOptions}
                onChange={handleChange}
                renderValue={() => selectedbyName?.join(", ")}
              >
                {events?.map((option, key) => (
                  <MenuItem key={key} value={option.propertyId}>
                    {option.property}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <div
              className={styles.Nameinput}
              style={{ width: "100%", gap: "5px", marginTop: "10px" }}
            >
              <span>Menues</span>
              <Select
                value={guestMenu}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Menues"
                onChange={(e) => {
                  setGuestMenu(e.target.value);
                }}
              >
                <MenuItem value={null} selected disabled>
                  Select Menu
                </MenuItem>

                {arrayMenues?.map((values, key) => {
                  return <MenuItem value={values}>{values}</MenuItem>;
                })}
              </Select>
            </div>
            <button
              className={styles.saveBtn}
              onClick={() => handleGuestSubmit()}
            >
              {/* {id ? "Update" : " Save"}
               */}
              Save
            </button>
          </div>
        </Box>
      </Modal>
      <Modal
        open={openEvents}
        onClose={() => setOpenEvents(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
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
          }}
        >
          <TextField
            id="standard-basic"
            label="Event Name"
            variant="outlined"
            multiline
            onChange={(e) => setPropertyNameadd(e.target.value)}
          ></TextField>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Event Date"
              // defaultValue={dayjs(data?.date)}
              onChange={(e) => {
                seteDate(e.$d);
              }}
            />
          </LocalizationProvider>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MobileTimePicker
              label="Event Time"
              ampm={false}
              // defaultValue={dayjs(data?.time)}
              onChange={(e) => {
                seteTime(e.$d);
              }}
            />
          </LocalizationProvider>

          <TextField
            id="standard-basic"
            label="Event Venue"
            variant="outlined"
            multiline
            onChange={(e) => seteVenue(e.target.value)}
          ></TextField>
          <div style={{ display: "flex", gap: "10px" }}>
            <TextField
              id="standard-basic"
              label="Event Theme"
              variant="outlined"
              multiline
              onChange={(e) => seteTheme(e.target.value)}
            ></TextField>
            <TextField
              id="standard-basic"
              label="Colour Code"
              variant="outlined"
              multiline
              onChange={(e) => seteColourCode(e.target.value)}
            ></TextField>
          </div>
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
            onClick={async () => {
              setOpenLoadingModal(true);

              try {
                const id = uuidv4();
                events = events?.length
                  ? JSON.parse(JSON.stringify(events))
                  : [];
                const eventDummy = events;

                eventDummy.push({
                  property: propertyNameadd,
                  propertyId: id,
                  eDate,
                  eTime,
                  eVenue,
                  eTheme,
                  eColourCode,
                  activePage: 0,
                  child: [],
                });
                setEvents(eventDummy);
                const arr = eventDummy.map((val) => val.propertyId);
                const res = await inviteUpdate({
                  eventID: arr,
                  events: eventDummy,
                });
                setPropertyNameadd("");
                seteColourCode("");
                seteTheme("");
                seteVenue("");
                seteTime("");
                seteDate("");
                setOpenEvents(false);
                toast.success("events added successfully", {
                  position: "top-right",
                  autoClose: 1000,
                });
              } catch (e) {
                toast.error(`${e}`, {
                  position: "top-right",
                  autoClose: 2000,
                });
              } finally {
                setOpenLoadingModal(false);
              }
            }}
          >
            Save
          </button>
        </Box>
      </Modal>
      <>
        <div className={styles.VendorWishlistHead}>
          {/* <button className={styles.VendorManagerseeAll}>See All</button> */}
          <div className={styles.tab}>
            <span
              style={
                !reportPage
                  ? {
                      cursor: "pointer",
                      color: "#b6255a",
                      background: "white",
                    }
                  : {}
              }
              onClick={() => setReportpage(true)}
            >
              Show report
            </span>
            <span
              style={
                reportPage
                  ? {
                      cursor: "pointer",
                      color: "#b6255a",
                      background: "white",
                    }
                  : {}
              }
              onClick={() => setReportpage(false)}
            >
              Manage List
            </span>
          </div>
        </div>
        {reportPage ? (
          <>
            <div className={styles.ReportDiv}>
              {allAttendance?.map((data, key1) => {
                const key = Object.keys(data)[0];
                const value = data[key];

                const name = events?.filter((data1) => {
                  if (data1.propertyId == key) {
                    return data1;
                  }
                });

                return (
                  <>
                    <div
                      key={key1}
                      className={styles.guestInfo}
                      style={{
                        marginBottom: "30px",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        padding: "0px 40px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          padding: "5px",
                          fontSize: "15px",
                          gap: "5px",
                          width: "50%",
                          paddingRight: "10px",
                          alignItems: "center",
                        }}
                      >
                        <img
                          src={`${S3PROXY}/public/images/webp/image 81.webp`}
                          alt=""
                        />
                        <span style={{ fontSize: "17px" }}>
                          Total number of guest attending{" "}
                          <span
                            style={{
                              fontSize: "19px",
                              fontWeight: "600",
                              color: "#626060",
                              textDecoration: "underline",
                            }}
                          >
                            {name?.length ? name[0].property : ""}
                          </span>
                          <br />{" "}
                          <b>
                            {value?.attending} out of {value?.count}
                          </b>
                        </span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          padding: "5px",
                          fontSize: "15px",
                          gap: "5px",
                          width: "50%",
                          alignItems: "center",
                          paddingLeft: "10px",
                          justifyContent: "end",
                        }}
                      >
                        <img
                          src={`${S3PROXY}/public/images/webp/image 77.webp`}
                          alt=""
                        />
                        <article
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            textAlign: "center",
                            gap: "10px",
                          }}
                        >
                          <span>
                            {" "}
                            {value?.attending} <br />
                            Attending
                          </span>
                          <span>
                            {" "}
                            {!value?.pending ? "0" : value?.pending} <br />
                            Pending
                          </span>
                          <span>
                            {" "}
                            {!value?.notAttending ? "0" : value?.notAttending}
                            <br />
                            Declined
                          </span>
                        </article>
                      </div>
                    </div>
                  </>
                );
              })}
              <div className={styles.guestListGraphs}>
                <div className={styles.ReporttopDiv}>
                  <span>GuestList</span>

                  <div className={styles.GraphDiv}>
                    <div style={{ width: "100%" }}>
                      {genderReport !== undefined ? (
                        <Chart
                          options={{
                            labels: [
                              "Male",
                              "Female",
                              "Male Child",
                              "Female Child",
                            ],
                            chart: { type: "donut" },
                            legend: { show: true, position: "right" },
                            dataLabels: { enabled: false },
                            tooltip: { enabled: false },
                            dataLabels: {
                              enabled: true,
                              formatter: function (val) {
                                return val.toFixed(2) + "%";
                              },
                            },
                            stroke: { width: 0 },
                            plotOptions: {
                              pie: {
                                expandOnClick: false,
                                donut: {
                                  size: "50%",
                                  labels: {
                                    show: false,
                                    name: { show: false },

                                    total: {
                                      show: false,
                                      showAlways: false,
                                      formatter: function (w) {
                                        const totals = w.globals.seriesTotals;

                                        const result = totals.reduce(
                                          (a, b) => a + b,
                                          0
                                        );

                                        return (result / 1000).toFixed(3);
                                      },
                                    },
                                  },
                                },
                              },
                            },
                          }}
                          series={[
                            genderReport?.Male,
                            genderReport?.Female,
                            genderReport?.Malechild,
                            genderReport?.Femalechild,
                          ]}
                          type="donut"
                          height={500}
                          width={"100%"}
                        />
                      ) : (
                        <></>
                      )}
                    </div>
                    <div className={styles.reporttoprightDiv}>
                      <article className={styles.reportinvitesentbox}>
                        <article>
                          <span>
                            <span>{inviteSent?.sent}</span>
                            <span>Invite Sent</span>
                          </span>
                        </article>
                        <article>
                          <span>
                            <span style={{ background: "#FFBA49" }}>
                              {inviteSent?.not_sent}
                            </span>
                            <span>Invite Pendings</span>
                          </span>
                        </article>
                      </article>
                    </div>
                  </div>
                </div>
                <div className={styles.reportgenderdiv}>
                  <span>Menu</span>
                  {menuReport?.menu !== undefined ? (
                    <Chart
                      options={{
                        chart: {
                          stacked: false,
                          stackType: "100%",
                          toolbar: {
                            show: false,
                          },
                        },
                        plotOptions: {
                          bar: {
                            horizontal: true,
                          },
                        },
                        dataLabels: {
                          dropShadow: {
                            enabled: false,
                          },
                        },
                        stroke: {
                          width: 0,
                        },
                        xaxis: {
                          categories: [""],
                          labels: {
                            show: false,
                          },
                          axisBorder: {
                            show: false,
                          },
                          axisTicks: {
                            show: false,
                          },
                        },
                        fill: {
                          opacity: 1,
                          type: "gradient",
                          gradient: {
                            shade: "dark",
                            type: "vertical",
                            shadeIntensity: 0.35,
                            gradientToColors: undefined,
                            inverseColors: false,
                            opacityFrom: 0.85,
                            opacityTo: 0.85,
                            stops: [90, 0, 100],
                          },
                        },

                        legend: {
                          offsetY: 50,
                          position: "right",
                          horizontalAlign: "bottom",
                          show: true,
                          fontSize: "17px",
                          fontFamily: "Poppins",
                          gap: "10px",
                        },
                      }}
                      height={150}
                      series={menuReport.menu}
                      type="bar"
                      width={"100%"}
                    />
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div className={styles.reportgroupdiv}>
                {/* <span>Groups</span> */}
                <div className={styles.reportGroupdivtable}>
                  {groupReport?.map((values, key) => {
                    return values.data?.length ? (
                      <Chart
                        options={{
                          chart: {
                            stacked: true,
                            stackType: "100%",
                            toolbar: {
                              show: false,
                            },
                          },
                          plotOptions: {
                            bar: {
                              horizontal: true,
                            },
                          },
                          dataLabels: {
                            dropShadow: {
                              enabled: false,
                            },
                          },
                          stroke: {
                            width: 0,
                          },
                          xaxis: {
                            categories: [
                              `${values?.name} total: ${values?.total} `,
                            ],
                            labels: {
                              show: false,
                            },
                            axisBorder: {
                              show: false,
                            },
                            axisTicks: {
                              show: false,
                            },
                          },
                          fill: {
                            opacity: 1,
                            type: "gradient",
                            gradient: {
                              shade: "dark",
                              type: "vertical",
                              shadeIntensity: 0.35,
                              gradientToColors: undefined,
                              inverseColors: false,
                              opacityFrom: 0.85,
                              opacityTo: 0.85,
                              stops: [90, 0, 100],
                            },
                          },

                          legend: {
                            fontSize: "18px",

                            position: "bottom",
                            horizontalAlign: "right",
                            show:
                              groupReport?.length - 1 === key ? true : false,
                          },
                        }}
                        height={90}
                        series={values?.data}
                        type="bar"
                        width={"100%"}
                      />
                    ) : (
                      <></>
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className={styles.btnDivs}>
              <div className={styles.ChecklistBtndiv}>
                <div className={styles.btnRightdivGL}>
                  <button
                    className={styles.VendorManagerseeAll1}
                    onClick={() => handleOpen1()}
                  >
                    Add Group
                  </button>
                  <button
                    className={styles.VendorManagerseeAll1}
                    onClick={() => handleOpen4()}
                  >
                    Add Family
                  </button>
                  <button
                    className={styles.VendorManagerseeAll1}
                    onClick={() => handleOpen3()}
                  >
                    Add Guest
                  </button>
                  <button
                    className={styles.VendorManagerseeAll1}
                    onClick={() => handleOpen2()}
                  >
                    Add Menu
                  </button>
                  <button
                    className={styles.VendorManagerseeAll1}
                    onClick={() => setOpenEvents(true)}
                  >
                    Add Events
                  </button>
                </div>
              </div>
              <div className={styles.GuestListBodyHead}>
                <span
                  onClick={() => setAGM("Group")}
                  style={{
                    height: "40px",
                    borderBottom: aGM === "Group" ? "2px solid #b6255a" : "",
                    cursor: "pointer",
                  }}
                >
                  Groups
                </span>

                <span
                  onClick={() => setAGM("Menu")}
                  style={{
                    height: "40px",
                    borderBottom: aGM === "Menu" ? "2px solid #b6255a" : "",
                    cursor: "pointer",
                  }}
                >
                  Menu
                </span>
                <span
                  onClick={() => setAGM("Family")}
                  style={{
                    height: "40px",
                    borderBottom: aGM === "Family" ? "2px solid #b6255a" : "",
                    cursor: "pointer",
                  }}
                >
                  Family
                </span>
                <span
                  onClick={() => setAGM("Events")}
                  style={{
                    height: "40px",
                    borderBottom: aGM === "Events" ? "2px solid #b6255a" : "",
                    cursor: "pointer",
                  }}
                >
                  Events
                </span>
              </div>
            </div>
            <div className={styles.GuestListBody}>
              <div className={styles.guestlisttable}>
                {aGM === "Group" ? (
                  arrayGroup?.map((values, key) => {
                    return (
                      <GuestListCat
                        values={values}
                        key123={key}
                        config={config}
                        aGM={aGM}
                        handleEditopen={handleEditopen}
                        submit={submit}
                        arrayMenues={arrayMenues}
                        update123={update123}
                        setupdate123={setupdate123}
                        setOpenLoadingModal={setOpenLoadingModal}
                        dataArray={arrayGroup1[values]}
                        events={events}
                      ></GuestListCat>
                    );
                  })
                ) : aGM === "Menu" ? (
                  arrayMenues?.map((values, key) => {
                    return (
                      <GuestListCat
                        values={values}
                        key123={key}
                        config={config}
                        aGM={aGM}
                        handleEditopen={handleEditopen}
                        submit={submit}
                        arrayMenues={arrayMenues}
                        update123={update123}
                        setupdate123={setupdate123}
                        setOpenLoadingModal={setOpenLoadingModal}
                        dataArray={arrayMenues1[values]}
                        events={events}
                      ></GuestListCat>
                    );
                  })
                ) : aGM === "Family" ? (
                  <>
                    <span
                      style={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "end",
                        fontSize: "20px",
                        marginTop: "10px",
                        marginBottom: "-10px",
                        color: "red",
                        cursor: "pointer",
                      }}
                      onClick={async () => {
                        const res = await sendInvitetoAllGuests({
                          inviteId: id,
                        });
                      }}
                    >
                      Send Invite To All
                    </span>
                    {arrayFamily1?.map((values, key) => {
                      return (
                        <GuestListCat
                          values={values._id}
                          realValue={values}
                          key123={key}
                          config={config}
                          aGM={aGM}
                          handleEditopen={handleEditopen}
                          submit={submit}
                          arrayMenues={arrayMenues}
                          update123={update123}
                          setupdate123={setupdate123}
                          setOpenLoadingModal={setOpenLoadingModal}
                          family={true}
                          dataArray={arrayFamily1}
                          inviteSented={values.InviteSent}
                          events={events}
                        ></GuestListCat>
                      );
                    })}
                  </>
                ) : aGM === "Events" ? (
                  events?.map((values, key) => {
                    return (
                      <GuestListCat
                        values={values.property}
                        realValue={values.propertyId}
                        key123={key}
                        config={config}
                        aGM={aGM}
                        handleEditopen={handleEditopen}
                        submit={submit}
                        arrayMenues={arrayMenues}
                        update123={update123}
                        setupdate123={setupdate123}
                        setOpenLoadingModal={setOpenLoadingModal}
                        family={true}
                        dataArray={arrayFamily1}
                        events={events}
                      ></GuestListCat>
                    );
                  })
                ) : (
                  <></>
                )}
              </div>
            </div>
          </>
        )}
      </>
      <ToastContainer />
    </div>
  );
};

export default GuestList;

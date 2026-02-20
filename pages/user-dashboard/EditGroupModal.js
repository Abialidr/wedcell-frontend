import React, { useEffect, useRef, useState } from "react";
import styles from "../../styles/Modal.module.css"; // Import the CSS module
import { selectUser } from "../../redux/reducer/appEssentials";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import styles2 from "../../styles/planning.module.scss";
import {
  Box,
  Checkbox,
  IconButton,
  InputAdornment,
  Modal,
  TextField,
} from "@mui/material";
import useWindowSize from "@rooks/use-window-size";
import { RiDeleteBin6Line } from "react-icons/ri";
import { pink } from "@mui/material/colors";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import {
  useAddtoGroupMutation,
  useGetContactsQuery,
  useLeaveGroupMutation,
  useRemoveFromGroupMutation,
  useRenameGroupMutation,
} from "redux/Api/chw.api";
const EditGroupModal = ({
  isOpen,
  setOpenEditModal,
  selected,
  openEditModal,
  setShowAllMessage,
  type,
  groupname,
}) => {
  const router = useRouter();
  const globleuser = useSelector(selectUser);
  const config = {
    headers: { authorization: globleuser?.data?.token },
  };
  if (!isOpen) {
    return null; // Don't render the modal if it's not open
  }
  const [connections, setConnections] = useState([]);
  const [selectedPeople, setSelectedPeople] = useState([]);
  const [grpName, setGrpName] = useState("");

  const handleCheckboxChange = (vendor) => {
    const isChecked = selectedPeople.some(
      (selectedVendor) => selectedVendor.vendorId === vendor.vendorId
    );

    if (isChecked) {
      // If vendor is already in the selectedPeople array, remove them
      setSelectedPeople(
        selectedPeople.filter((v) => v.vendorId !== vendor.vendorId)
      );
    } else {
      // If vendor is not in the selectedPeople array, add them
      setSelectedPeople([...selectedPeople, vendor]);
    }
  };
  const {
    innerWidth: windowWidth,
    innerHeight,
    outerHeight,
    outerWidth,
  } = useWindowSize();
  const { data: allcontacts } = useGetContactsQuery(globleuser?.data?._id);
  const [renameGroup] = useRenameGroupMutation();
  const [leavefromgroup] = useLeaveGroupMutation();
  const [removeFromGroup] = useRemoveFromGroupMutation();
  const [addtoGroup] = useAddtoGroupMutation();
  const getContact = async () => {
    let result = { data: allcontacts };
    result = JSON.parse(JSON.stringify(result));
    const filteredData = result?.data?.filter(
      (item) =>
        !selected.vendorInfo.some(
          (excludedItem) => excludedItem.vendorId === item.vendorId
        )
    );
    setConnections(filteredData);
  };
  const editname = async () => {
    const result = await renameGroup({
      _id: selected._id,
      groupName: grpName,
    });

    if (result?.data?.success) {
      alert("Success");
      setOpenEditModal(false);
      router.push("/user-dashboard/Group-Message");
    }
    //   setOpenEditModal(false)
  };
  const leave = async () => {
    const result = await leavefromgroup({
      _id: selected._id,
      prospectId: globleuser.data._id,
    });

    if (result?.data?.success) {
      alert("Success");
      setOpenEditModal(false);
      router.push("/user-dashboard/Group-Message");
    }
    //   setOpenEditModal(false)
  };
  const remove = async (vid) => {
    const result = await removeFromGroup({
      _id: selected._id,
      vendorId: vid,
    });

    if (result?.data?.success) {
      alert("Success");
      setOpenEditModal(false);
      if (type === "mobile") {
        setShowAllMessage(false);
      }

      router.push("/user-dashboard/Group-Message");
    }
    //   setOpenEditModal(false)
  };
  const addToGroup = async (event) => {
    event.preventDefault();
    if (selectedPeople.length > 0) {
      const result = await addtoGroup({
        _id: selected._id,
        vendorInfo: selectedPeople,
      });
      alert("Success");
      setOpenEditModal(false);
      if (type === "mobile") {
        setShowAllMessage(false);
      }
      // router.push("/user-dashboard/Group-Message");
      // setOpenEditModal(false);
    } else {
      alert("Select atleast one person to add");
    }
  };

  useEffect(() => {
    globleuser && getContact();
  }, [globleuser, allcontacts]);
  const style = {
    position: "absolute",
    top: windowWidth > 900 ? "177px" : "50%",
    left: "50%",
    transform: windowWidth > 900 ? "translateX(-50%)" : "translate(-50%, -50%)",
    width: windowWidth >= 900 ? "350px" : windowWidth >= 350 ? "350px" : "95%",
    bgcolor: "background.paper",
    // border: "2px solid #000",
    boxShadow: 24,
    p: 2,
    borderRadius: "10px",
    height: windowWidth >= 900 ? "70%" : "70%",
    overflow: "scroll",
    // paddingTop: "270px",
    zIndex: "-1",
  };
  const containerRef = useRef(null);
  const [removepeople, setRemovepeople] = useState();
  return (
    <Modal
      open={openEditModal}
      onClose={() => {
        setOpenEditModal(false);
        if (type === "mobile") {
          setShowAllMessage(false);
        }
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className={styles.mainModaldiv} style={{ position: "relative" }}>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {/* <ArrowBackIcon sx={{ fontSize: "16px" }}></ArrowBackIcon> */}
            <span
              className={styles.seemoreX}
              onClick={() => {
                setOpenEditModal(false);
                if (type === "mobile") {
                  setShowAllMessage(false);
                }
              }}
            >
              <CloseIcon sx={{ fontSize: "16px" }}></CloseIcon>
            </span>
          </div>
          {/* <div> */}
          <section className={styles.modalSection}>
            <header className={styles.modalHeader}>
              <h4 style={{ color: "#db3673", fontWeight: "600" }}>
                {groupname}
              </h4>
            </header>
          </section>
          <label
            style={{
              fontSize: "18px",
              marginBottom: "12px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <TextField
              label="Group Name"
              sx={{
                // paddingRight: "5px",
                // borderColor: 'white',
                backgroundColor: "white",
                border: "none",
                // border: '1px solid #d43f7a',
                color: "#d43f7a",
                // borderRadius: "20px",
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <IconButton onClick={editname}>
                      <EditIcon
                        sx={{
                          fontSize: "20px",
                          color: "gray",
                          marginLeft: "10px",
                        }}
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              // margin="dense"
              fullWidth
              size="small"
              onChange={(e) => setGrpName(e.target.value)}
            ></TextField>
            {/* <div onClick={editname}>
              <EditIcon sx={{ fontSize: "20px", color: "gray" }} />
            </div> */}
          </label>
          {/* </div> */}
          <label
            // className={styles.cancelButton}
            aria-label="close"
            onClick={leave}
            style={{
              fontSize: "18px",
              marginBottom: "12px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            Leave group
          </label>

          {/* <input onChange={(e) => setGrpName(e.target.value)} /> */}
          {/* <button onClick={editname}>Change name</button> */}

          {/* <div className={styles.modalContent}> */}
          <section className={styles.modalSection}>
            <div className={styles.formGroup}>
              <label
                style={{
                  fontSize: "18px",
                  marginBottom: "12px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                Edit group
                <div onClick={() => setRemovepeople(!removepeople)}>
                  <KeyboardArrowDownIcon
                    sx={{
                      transform: removepeople ? "rotate(180deg)" : "",
                      transition: "transform 300ms ease",
                      fontSize: "25px",
                    }}
                  ></KeyboardArrowDownIcon>
                </div>
              </label>
              {removepeople ? (
                <div>
                  <ul style={{ padding: "0px" }}>
                    {selected.vendorInfo.map((person) => (
                      <li
                        key={person.vendorId}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: "10px",
                        }}
                      >
                        <label
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: "10px",
                            width: "100%",
                            justifyContent: "space-between",
                            gap: "10px",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "10px",
                              fontSize: "15px",
                              fontWeight: "600",
                            }}
                          >
                            <img
                              className={styles2.imgmessagediv}
                              src={`${S3PROXY}${person.vendorImage}`}
                              // alt={`${person.vendorName} Image`}
                            />
                            <span>{person.vendorName}</span>
                          </div>
                          <div
                            style={{ fontSize: "18px" }}
                            onClick={() => remove(person.vendorId)}
                          >
                            <RiDeleteBin6Line></RiDeleteBin6Line>
                          </div>
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <></>
              )}
            </div>
            <form onSubmit={addToGroup}>
              {/* <div>
                <h6>Selected People:</h6>
                <ul>
                  {selectedPeople.map((person) => (
                    <li key={person.vendorId}>{person.vendorName}</li>
                  ))}
                </ul>
              </div> */}
              <div className={styles.formGroup}>
                <label style={{ fontSize: "18px", marginBottom: "12px" }}>
                  Select people you want to add
                </label>
                <div>
                  <ul
                    style={{
                      paddingLeft: "0px",
                      maxHeight: "350px",
                      overflow: "scroll",
                    }}
                  >
                    {connections?.map((person) => (
                      <li
                        key={person.vendorId}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          padding: "5px",
                          color: selectedPeople.includes(person) ? "gray" : "",
                          fontFamily: "Inter",
                          // marginBottom: '10px',
                          backgroundColor: selectedPeople.includes(person)
                            ? "#db367371"
                            : "",
                        }}
                      >
                        <label
                          style={{
                            display: "flex",
                            alignItems: "center",
                            flexDirection: "row-reverse",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              gap: "10px",
                              fontSize: "15px",
                              fontWeight: "600",
                              alignItems: "center",
                            }}
                          >
                            <img
                              className={styles2.imgmessagediv}
                              style={{ minWidth: "40px" }}
                              src={`${S3PROXY}${person.vendorImage}`}
                              // alt={`${person.vendorName} Image`}
                            />
                            <span>{person.vendorName}</span>
                          </div>
                          <Checkbox
                            sx={{
                              color: pink[800],
                              "&.Mui-checked": {
                                color: pink[600],
                              },
                            }}
                            checked={selectedPeople.includes(person)}
                            onChange={() => handleCheckboxChange(person)}
                          />

                          {/* <input
                            type='checkbox'
                            checked={selectedPeople.includes(person)}
                            onChange={() => handleCheckboxChange(person)}
                          /> */}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <footer className={styles.modalFooter}>
                <button type="submit" className={styles.submitButton}>
                  Submit
                </button>
                <button
                  type="button"
                  className={styles.cancelButton}
                  onClick={() => setOpenEditModal(false)}
                >
                  Cancel
                </button>
              </footer>
            </form>
          </section>
          {/* </div> */}
        </div>
      </Box>
    </Modal>
    // <div className={styles.modalContainer}>
    //   <div className={styles.modalContent}>
    //     <header className={styles.modalHeader}>
    //       <h4>Update group</h4>
    //       <button
    //         className={styles.cancelButton}
    //         aria-label='close'
    //         onClick={() => setOpenEditModal(false)}
    //       >
    //         Return back
    //       </button>
    //     </header>
    //     <section className={styles.modalSection}>
    //       <div className={styles.formGroup}>
    //         <label>People in group</label>
    //         <div>
    //           <ul>
    //             {selected.vendorInfo.map((person) => (
    //               <li
    //                 key={person.vendorId}
    //                 style={{
    //                   display: 'flex',
    //                   alignItems: 'center',
    //                   marginBottom: '10px',
    //                 }}
    //               >
    //                 <label
    //                   style={{
    //                     display: 'flex',
    //                     alignItems: 'center',
    //                     marginBottom: '10px',
    //                   }}
    //                 >
    //                   <div
    //                     style={{
    //                       display: 'flex',
    //                     }}
    //                   >
    //                     <span>{person.vendorName}</span>
    //                   </div>
    //                   <button onClick={() => remove(person.vendorId)}>
    //                     Remove
    //                   </button>
    //                 </label>
    //               </li>
    //             ))}
    //           </ul>
    //         </div>
    //       </div>
    //       <form onSubmit={addToGroup}>
    //         <div>
    //           <h6>Selected People:</h6>
    //           <ul>
    //             {selectedPeople.map((person) => (
    //               <li key={person.vendorId}>{person.vendorName}</li>
    //             ))}
    //           </ul>
    //         </div>
    //         <div className={styles.formGroup}>
    //           <label>Select people you want to add</label>
    //           <div>
    //             <ul>
    //               {connections.map((person) => (
    //                 <li
    //                   key={person.vendorId}
    //                   style={{
    //                     display: 'flex',
    //                     alignItems: 'center',
    //                     marginBottom: '10px',
    //                   }}
    //                 >
    //                   <label
    //                     style={{
    //                       display: 'flex',
    //                       alignItems: 'center',
    //                       marginBottom: '10px',
    //                     }}
    //                   >
    //                     <div
    //                       style={{
    //                         display: 'flex',
    //                       }}
    //                     >
    //                       <
    //                         className={styles2.imgmessagediv}
    //                         src={`${S3PROXY}${person.vendorImage}`}
    //                         alt={`${person.vendorName} Image`}
    //                       />
    //                       <span>{person.vendorName}</span>
    //                     </div>
    //                     <input
    //                       type='checkbox'
    //                       checked={selectedPeople.includes(person)}
    //                       onChange={() => handleCheckboxChange(person)}
    //                     />
    //                   </label>
    //                 </li>
    //               ))}
    //             </ul>
    //           </div>
    //         </div>

    //         <footer className={styles.modalFooter}>
    //           <button
    //             type='submit'
    //             className={styles.submitButton}
    //           >
    //             Submit
    //           </button>
    //           <button
    //             type='button'
    //             className={styles.cancelButton}
    //             onClick={() => setOpenEditModal(false)}
    //           >
    //             Cancel
    //           </button>
    //         </footer>
    //       </form>
    //     </section>
    //   </div>
    // </div>
  );
};

export default EditGroupModal;

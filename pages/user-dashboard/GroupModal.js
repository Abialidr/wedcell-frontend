import React, { useEffect, useRef, useState } from "react";
import styles from "../../styles/Modal.module.css";
import { io } from "socket.io-client";
import { selectUser } from "../../redux/reducer/appEssentials";
import { PROXY, S3PROXY } from "../../config";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import styles2 from "../../styles/planning.module.scss";
import { Box, Checkbox, Modal, TextField } from "@mui/material";
import useWindowSize from "@rooks/use-window-size";
import { pink } from "@mui/material/colors";
import { useCreateGroupMutation, useGetContactsQuery } from "redux/Api/chw.api";
const GroupModal = ({ isOpen, setOpenModal, openModal }) => {
  const router = useRouter();
  const globleuser = useSelector(selectUser);
  const config = {
    headers: { authorization: globleuser?.data?.token },
  };
  if (!isOpen) {
    return null;
  }
  const { innerWidth: windowWidth } = useWindowSize();
  const [connections, setConnections] = useState([]);
  const [selectedPeople, setSelectedPeople] = useState([]);
  const [grpName, setGrpName] = useState("");
  const socketRef = useRef(null);

  const handleCheckboxChange = (vendor) => {
    const isChecked = selectedPeople.some(
      (selectedVendor) => selectedVendor.vendorId === vendor.vendorId
    );

    if (isChecked) {
      setSelectedPeople(
        selectedPeople.filter((v) => v.vendorId !== vendor.vendorId)
      );
    } else {
      setSelectedPeople([...selectedPeople, vendor]);
    }
  };
  const [creategroup] = useCreateGroupMutation();
  const { data: getContacts } = useGetContactsQuery(globleuser?.data?._id);
  const getContact = async () => {
    const result = { data: getContacts };
    setConnections(result?.data);
  };
  const createGroup = async (event) => {
    event.preventDefault();
    if (grpName.length > 4 && selectedPeople.length > 1) {
      const result = await creategroup({
        initiatorId: globleuser?.data?._id,
        groupName: grpName,
        prospectId: globleuser?.data?._id,
        prospectName: globleuser?.data?.name,
        prospectContact: globleuser?.data?.mobile,
        prospectImage: globleuser?.data?.profile_pic,
        vendorInfo: selectedPeople,
        allowAccess: [],
      });
      socketRef.current.emit("creategroup", result?.data);
      alert("Success");
      setOpenModal(false);
      router.push("/user-dashboard/Group-Message");
    } else if (selectedPeople.length < 2) {
      alert("Select atleast two people");
    } else {
      alert("Group name must be at least 5 characters");
    }
  };
  useEffect(() => {
    socketRef.current = io.connect(PROXY);

    return () => {
      socketRef.current.disconnect();
    };
  }, []);
  useEffect(() => {
    globleuser && getContact();
  }, [globleuser, getContacts]);
  const style = {
    position: "absolute",
    top: windowWidth > 900 ? "177px" : "50%",
    left: "50%",
    transform: windowWidth > 900 ? "translateX(-50%)" : "translate(-50%, -50%)",
    width: windowWidth >= 900 ? "350px" : windowWidth >= 460 ? "95%" : "95%",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 2,
    borderRadius: "10px",
    height: windowWidth >= 900 ? "fit-content" : "fit-content",
    overflow: "scroll",
    zIndex: "-1",
  };
  return (
    <Modal
      open={openModal}
      onClose={() => setOpenModal(false)}
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
            <header className={styles.modalHeader}>
              <h4 style={{ color: "#db3673", fontWeight: "600" }}>
                Create Group
              </h4>
            </header>
            <span
              className={styles.seemoreX}
              onClick={() => setOpenModal(false)}
            >
              <img src={`${S3PROXY}/public/images/webp/Vector12.webp`} alt="" />
            </span>
          </div>
          <section
            className={styles.modalSection}
            style={{ width: "100%", overflow: "hidden", marginBottom: "0px" }}
          >
            <form onSubmit={createGroup}>
              <div>
                <TextField
                  label="Group Name"
                  sx={{
                    backgroundColor: "white",
                    border: "none",
                    color: "#d43f7a",
                  }}
                  fullWidth
                  size="small"
                  onChange={(e) => setGrpName(e.target.value)}
                ></TextField>
              </div>
              <div className={styles.formGroup}>
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
                  onClick={() => setOpenModal(false)}
                >
                  Cancel
                </button>
              </footer>
            </form>
          </section>
        </div>
      </Box>
    </Modal>
  );
};
export default GroupModal;

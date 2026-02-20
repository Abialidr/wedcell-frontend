import React, { useEffect, useState } from "react";
import styles from "../../styles/planning.module.scss";

import { Box, TextField } from "@mui/material";
import useWindowSize from "@rooks/use-window-size";
import Modal from "@mui/material/Modal";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/reducer/appEssentials";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import dynamic from "next/dynamic";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Spinner } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  budgetPlannerval1,
  budgetPlannerval2,
  budgetPlannerval3,
  budgetPlannerval4,
  budgetPlannerval5,
} from "../../yupValidation/planningToolsValidation";
import {
  useAddBudgetCatsMutation,
  useAddBudgetSubCatsMutation,
  useAddSubCatNotesMutation,
  useDeleteBudgetCatsMutation,
  useDeleteBudgetSubCatsMutation,
  useGeneratePdfMutation,
  useGetBudgetCatsQuery,
  useGetBudgetSubCatsQuery,
  useUpdateCategoryNameMutation,
  useUpdateSubCatsMutation,
  useUpdateTEAMutation,
} from "redux/Api/budgetPlanner.api";
import Head from "next/head";
import { S3PROXY } from "../../config";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
const BudgetPlanner = () => {
  const [openLoadingModal, setOpenLoadingModal] = useState(false);
  const loadingStyles = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100px",
    bgcolor: "background.paper",
    // border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    borderRadius: "10px",
    height: "100px",
    overflow: "scroll",
    // paddingTop: "270px",
    zIndex: "-1",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  const globleuser = useSelector(selectUser);
  const [anchorEl, setAnchorEl] = useState();
  const [showSubmit, setshowSubmit] = useState(false);

  const open5 = Boolean(anchorEl);

  const handleClick5 = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose5 = (opt) => {
    if (opt === "Add Note") {
      setOpen(true);
    }
    if (opt === "Remove") {
      // setOpen(true);
    }
    setAnchorEl(null);
  };

  const config = {
    headers: { authorization: globleuser?.data?.token },
  };
  const { innerWidth: windowWidth } = useWindowSize();
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: windowWidth >= 900 ? "450px" : windowWidth >= 460 ? "450px" : "100%",
    bgcolor: "background.paper",
    // border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: windowWidth >= 900 ? "fit-content" : "350px",
    overflow: "scroll",

    zIndex: "-1",
  };
  const style1 = {
    position: "absolute",
    top: "177px",
    left: "50%",
    transform: "translateX(-50%)",
    width: windowWidth >= 900 ? "580px" : windowWidth >= 460 ? "95%" : "95%",
    bgcolor: "background.paper",
    // border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    borderRadius: "10px",
    height: "fit-content",
    maxHeight: "70vh",
    overflow: "scroll",
    // paddingTop: "270px",
    zIndex: "-1",
  };
  const [update, setUpdate] = useState(false);
  const [allSubCats, setSubAllCats] = useState();
  const [generatePdf] = useGeneratePdfMutation();
  const [allCats, setAllCats] = useState();
  const generateInvoice = async () => {
    const res = await generatePdf(allCats);
    if (res?.data?.success) {
      const pdfBase64 = res.data.pdfBase64;
      const pdfBlob = new Blob([Buffer.from(pdfBase64, "base64")], {
        type: "application/pdf",
      });

      const url = URL.createObjectURL(pdfBlob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "invoice.pdf";

      document.body.appendChild(a);
      a.click();

      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else {
      alert("Error generating PDF");
    }
  };

  const printInvoice = async () => {
    const res = await generatePdf(allCats);
    if (res.data.success) {
      const pdfBase64 = res.data.pdfBase64;
      const pdfBlob = new Blob([Buffer.from(pdfBase64, "base64")], {
        type: "application/pdf",
      });

      const url = URL.createObjectURL(pdfBlob);

      const pdfWindow = window.open(url, "_blank");
      if (!pdfWindow) {
        alert("Pop-up blocked. Please allow pop-ups for this site.");
      } else {
        pdfWindow.onload = () => {
          pdfWindow.print();
        };
      }

      URL.revokeObjectURL(url);
    } else {
      alert("Error generating PDF");
    }
  };
  const [currentid, setCurrentId] = useState();
  const { data: resAllCats, refetch: catsRef } = useGetBudgetCatsQuery();
  const { data: resAllsubcat, refetch: subcatsRef } = useGetBudgetSubCatsQuery(
    currentid ? currentid : resAllCats?.data?.categories[0]?.id
  );
  useEffect(() => {
    catsRef();
  }, [update]);
  useEffect(() => {
    const getallCat = async () => {
      const res = { data: resAllCats };
      setAllCats(res?.data?.data);
      const res2 = { data: resAllsubcat };
      setSubAllCats(res2?.data?.data);
    };
    getallCat();
  }, [update, resAllCats, resAllsubcat]);

  const [expAddCat, setExpAddCat] = useState({
    category: "",
    subCategory: [
      {
        subcategory_name: "",
        estimated_amount: 0,
        final_cost: 0,
        paid_amount: 0,
        notes: "",
      },
    ],
  });

  const [expSubCat, setExpSubCat] = useState({
    subcategory_name: "",
    estimated_amount: 0,
    final_cost: 0,
    paid_amount: 0,
    notes: "",
    cid: "",
  });
  const [addedNote, setAddedNote] = useState({
    notes: "",
    cid: "",
    id: "",
  });

  const [addedName, setAddedName] = useState({
    name: "",
    id: "",
  });

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const [open1, setOpen1] = React.useState(false);
  const handleClose1 = () => {
    setOpen1(false);
  };
  const [open2, setOpen2] = React.useState(false);
  const handleClose2 = () => {
    setOpen2(false);
  };
  const [open6, setOpen6] = useState(false);
  const handleClose6 = () => {
    setOpen6(false);
  };
  const [open7, setOpen7] = useState(false);
  const handleClose7 = () => {
    setOpen7(false);
  };
  const [addBudgetCats] = useAddBudgetCatsMutation();
  const handleCatSubmit = async () => {
    try {
      await budgetPlannerval1.validate(expAddCat);
      setOpenLoadingModal(true);
      const res = await addBudgetCats(expAddCat);
      if (res?.data?.success) {
        setUpdate(!update);
        setOpenLoadingModal(false);
        toast.success("Category Added Successfully", {
          position: "top-right",
          autoClose: 1000,
        });
      }
      setExpAddCat({
        category: "",
        subCategory: [
          {
            subcategory_name: "",
            estimated_amount: 0,
            final_cost: 0,
            paid_amount: 0,
            notes: "",
          },
        ],
      });
      setOpen2(false);
    } catch (e) {
      toast.error(`${e}`, {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };
  const [addSubCatNotes] = useAddSubCatNotesMutation();
  const handleSubmitforNote = async () => {
    try {
      await budgetPlannerval3.validate(addedNote.notes);
      setOpenLoadingModal(true);
      const res = await addSubCatNotes(addedNote);
      if (res?.data?.success) {
        setSubAllCats(res?.data?.data);
        setAddedNote({
          notes: "",
          id: "",
          cid: "",
        });
        setOpen(false);
      }
      setOpenLoadingModal(false);

      toast.success("Note Added Successfully", {
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
  const [updateCategoryName] = useUpdateCategoryNameMutation();
  const handleSubmitforName = async () => {
    try {
      await budgetPlannerval2.validate(addedName.name);
      setOpenLoadingModal(true);
      const res = await updateCategoryName(addedName);
      if (res?.data?.success) {
        setAllCats(res.data.data.catData);
        setSubAllCats(res.data.data.subCatData);
        setAddedName({
          name: "",
          id: "",
        });
        setUpdate(update);
        setOpen6(false);
      }
      setOpenLoadingModal(false);

      toast.success("Name Updated Successfully", {
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
  const [updateTEA] = useUpdateTEAMutation();
  const handleSubmitforTEA = async () => {
    try {
      await budgetPlannerval4.validate(tEA);
      setOpenLoadingModal(true);
      const res = await updateTEA({
        TEA: tEA,
      });
      if (res?.data?.success) {
        setTEA("");
        setUpdate(!update);
        setOpen7(false);
      }
      setOpenLoadingModal(false);

      toast.success("Budget Updated Successfully", {
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
  const [addBudgetSubCats] = useAddBudgetSubCatsMutation();
  const handleSubCatSubmit = async () => {
    try {
      await budgetPlannerval5.validate(expSubCat);
      setOpenLoadingModal(true);
      const res = await addBudgetSubCats(expSubCat);
      if (res?.data?.success) {
        setAllCats(res?.data?.data?.catData);
        setSubAllCats(res?.data?.data?.subCatData);
      }
      setExpSubCat({
        subcategory_name: "",
        estimated_amount: 0,
        final_cost: 0,
        paid_amount: 0,
        notes: "",
        cid: "",
      });
      setOpen1(false);
      setOpenLoadingModal(false);

      toast.success("Subcategory Added Successfully", {
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
  const [tEA, setTEA] = useState();
  const [paymentPage, setPaymentPage] = useState(false);
  const [paymentDetail, setPaymentDetail] = useState(false);
  const [deleteBudgetCats] = useDeleteBudgetCatsMutation();
  const [deleteBudgetSubCats] = useDeleteBudgetSubCatsMutation();
  const [updateSubCats] = useUpdateSubCatsMutation();
  return (
    <div className={styles.VendorManagerDiv}>
      <Head>
        <title>Budget Planner – WedField</title>
        <meta
          name="description"
          content="Buget Planner Tool Will help you to calculate Your wedding Budget very easlily and Best way to calculate your budget on Wedfield."
        />
        <link
          name="canonical"
          href={`https://wedfield.com/user-dashboard?direction=BudgetPlanner`}
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
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className={styles.mainModaldiv}>
            <span>Add Note</span>
            <div
              className={styles.Nameinput}
              style={{ width: "100%", gap: "10px" }}
            >
              <textarea
                value={addedNote?.notes}
                id="standard-basic"
                label="Type Note..."
                variant="outlined"
                multiline
                rows={8}
                onChange={(e) => {
                  setAddedNote({ ...addedNote, notes: e.target.value });
                }}
              />
            </div>
            <button
              className={styles.saveBtn}
              onClick={() => handleSubmitforNote()}
            >
              Save
            </button>
          </div>
        </Box>
      </Modal>
      <Modal
        open={open7}
        onClose={handleClose7}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className={styles.mainModaldiv}>
            <span>Add TEA</span>
            <div
              className={styles.Nameinput}
              style={{ width: "100%", gap: "10px" }}
            >
              <input
                value={tEA}
                id="standard-basic"
                label="Type Note..."
                variant="outlined"
                onChange={(e) => {
                  setTEA(e.target.value ? parseInt(e.target.value) : 0);
                }}
              />
            </div>
            <button
              className={styles.saveBtn}
              onClick={() => handleSubmitforTEA()}
            >
              Save
            </button>
          </div>
        </Box>
      </Modal>
      <Modal
        open={open6}
        onClose={handleClose6}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className={styles.mainModaldiv}>
            <span>Edit Name</span>
            <div
              className={styles.Nameinput}
              style={{ width: "100%", gap: "10px" }}
            >
              <input
                value={addedName?.name}
                id="standard-basic"
                label="Add Name..."
                variant="outlined"
                multiline
                rows={8}
                onChange={(e) => {
                  setAddedName({ ...addedName, name: e.target.value });
                }}
              />
            </div>
            <button
              className={styles.saveBtn}
              onClick={() => handleSubmitforName()}
            >
              Save
            </button>
          </div>
        </Box>
      </Modal>
      <Modal
        open={open1}
        onClose={handleClose1}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style1}>
          <div className={styles.mainModaldiv}>
            <span>Add New Expense</span>

            <div
              className={styles.Nameinput}
              style={{ width: "100%", gap: "5px" }}
            >
              <span>Expense</span>
              <input
                value={expSubCat?.subcategory_name}
                id="standard-basic"
                label="Expense"
                variant="outlined"
                onChange={(e) => {
                  setExpSubCat({
                    ...expSubCat,
                    subcategory_name: e.target.value,
                  });
                }}
              />
            </div>
            <div
              className={styles.Nameinput}
              style={{ width: "100%", gap: "5px", marginTop: "10px" }}
            >
              <span>Estimated Cost</span>
              <input
                value={expSubCat?.estimated_amount}
                type="number"
                id="standard-basic"
                label="Est Cost"
                variant="outlined"
                onChange={(e) => {
                  setExpSubCat({
                    ...expSubCat,
                    estimated_amount: parseInt(e.target.value),
                  });
                }}
              />
            </div>
            <div
              className={styles.Nameinput}
              style={{ width: "100%", gap: "5px", marginTop: "10px" }}
            >
              <span>Final Cost</span>
              <input
                value={expSubCat?.final_cost}
                type="number"
                id="standard-basic"
                label="Final Cost"
                variant="outlined"
                onChange={(e) => {
                  setExpSubCat({
                    ...expSubCat,
                    final_cost: parseInt(e.target.value),
                  });
                }}
              />
            </div>
            <div
              className={styles.Nameinput}
              style={{ width: "100%", gap: "5px", marginTop: "10px" }}
            >
              <span>Paid Amt</span>
              <input
                value={expSubCat?.paid_amount}
                type="number"
                id="standard-basic"
                label="Paid Amt"
                variant="outlined"
                onChange={(e) => {
                  setExpSubCat({
                    ...expSubCat,
                    paid_amount: parseInt(e.target.value),
                  });
                }}
              />
            </div>
            <div
              className={styles.Nameinput}
              style={{ width: "100%", gap: "5px", marginTop: "10px" }}
            >
              <span>Note</span>
              <textarea
                value={expSubCat?.notes}
                id="standard-basic"
                label="Add Note..."
                variant="outlined"
                multiline
                rows={3}
                onChange={(e) => {
                  setExpSubCat({
                    ...expSubCat,
                    notes: e.target.value,
                  });
                }}
              />
            </div>
            <button
              className={styles.saveBtn}
              onClick={() => handleSubCatSubmit()}
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
        <Box sx={style1}>
          <div className={styles.mainModaldiv}>
            <span>Add New Category</span>
            <div
              className={styles.Nameinput}
              style={{ width: "100%", gap: "5px", marginBottom: "20px" }}
            >
              <span>Category</span>
              <input
                value={expAddCat?.category}
                id="standard-basic"
                label="Add Category..."
                variant="outlined"
                onChange={(e) => {
                  setExpAddCat({
                    ...expAddCat,
                    category: e.target.value,
                  });
                }}
              />
            </div>
            <div
              className={styles.Nameinput}
              style={{ width: "100%", gap: "5px", marginBottom: "20px" }}
            >
              <span
                style={{ cursor: "pointer" }}
                onClick={() => {
                  const newArr = {
                    subcategory_name: "",
                    estimated_amount: 0,
                    final_cost: 0,
                    paid_amount: 0,
                    notes: "",
                  };
                  const dummy = expAddCat;
                  dummy.subCategory.push(newArr);
                  setExpAddCat(dummy);
                }}
              >
                Add Subcategory +
              </span>
            </div>
            {expAddCat?.subCategory?.map((value, key) => {
              return (
                <div
                  style={{
                    width: "100%",
                    gap: "5px",
                    marginBottom: "20px",
                  }}
                >
                  <div className={styles.twoinone}>
                    <div
                      className={styles.Nameinput}
                      style={{ width: "100%", gap: "5px" }}
                    >
                      <span>Expense</span>
                      <input
                        id="standard-basic"
                        label="Expense"
                        variant="outlined"
                        value={value?.subcategory_name}
                        onChange={(e) => {
                          const dummy = expAddCat;
                          dummy.subCategory[key].subcategory_name =
                            e.target.value;
                          setExpAddCat({ ...dummy });
                        }}
                      />
                    </div>
                    <div
                      className={styles.Nameinput}
                      style={{ width: "100%", gap: "5px", marginTop: "10px" }}
                    >
                      <span>Estimated Cost</span>
                      <input
                        type="number"
                        id="standard-basic"
                        label="Est Cost"
                        variant="outlined"
                        value={value?.estimated_amount}
                        onChange={(e) => {
                          const dummy = expAddCat;
                          dummy.subCategory[key].estimated_amount = parseInt(
                            e.target.value
                          );
                          setExpAddCat({ ...dummy });
                        }}
                      />
                    </div>
                  </div>
                  <div className={styles.twoinone}>
                    <div
                      className={styles.Nameinput}
                      style={{ width: "100%", gap: "5px", marginTop: "10px" }}
                    >
                      <span>Final Cost</span>
                      <input
                        type="number"
                        id="standard-basic"
                        label="Final Cost"
                        variant="outlined"
                        value={value?.final_cost}
                        onChange={(e) => {
                          const dummy = expAddCat;
                          dummy.subCategory[key].final_cost = parseInt(
                            e.target.value
                          );
                          setExpAddCat({ ...dummy });
                        }}
                      />
                    </div>
                    <div
                      className={styles.Nameinput}
                      style={{ width: "100%", gap: "5px", marginTop: "10px" }}
                    >
                      <span>Paid Amt</span>
                      <input
                        type="number"
                        id="standard-basic"
                        label="Paid Amt"
                        variant="outlined"
                        value={value?.paid_amount}
                        onChange={(e) => {
                          const dummy = expAddCat;
                          dummy.subCategory[key].paid_amount = parseInt(
                            e.target.value
                          );
                          setExpAddCat({ ...dummy });
                        }}
                      />
                    </div>
                  </div>
                  <div
                    className={styles.Nameinput}
                    style={{ width: "100%", gap: "5px", marginTop: "10px" }}
                  >
                    <span>Note</span>
                    <textarea
                      id="standard-basic"
                      label="Add Note..."
                      variant="outlined"
                      multiline
                      rows={3}
                      value={value?.notes}
                      onChange={(e) => {
                        const dummy = expAddCat;
                        dummy.subCategory[key].notes = e.target.value;
                        setExpAddCat({ ...dummy });
                      }}
                    />
                  </div>
                  {expAddCat?.subCategory?.length !== 1 ? (
                    <div className="col-md-4" style={{ marginTop: 30 }}>
                      <span
                        onClick={() => {
                          const dummy = expAddCat;
                          dummy.subCategory.splice(key, 1);
                          setExpAddCat({ ...dummy });
                        }}
                        className="fs-5 cursor-pointer"
                      >
                        <RiDeleteBin6Line />
                      </span>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              );
            })}

            <button
              className={styles.saveBtn}
              onClick={() => handleCatSubmit()}
            >
              Save
            </button>
          </div>
        </Box>
      </Modal>
      {/* <div className={styles.BudplanHead}>
        <div className={styles.tab}>
          <span
            style={{
              borderBottom: paymentPage ? '' : '2px solid #b5255c',
              cursor: 'pointer',
              boxShadow: paymentPage ? '' : '0px 2px 0px 0px #32323253',
              color: paymentPage ? '#32323253' : '',
            }}
            onClick={() => setPaymentPage(false)}
          >
            Budget Planner
          </span>
          <span
            style={{
              borderBottom: paymentPage ? '2px solid #b5255c' : '',
              color: paymentPage ? '' : '#32323253',
              cursor: 'pointer',
              boxShadow: paymentPage ? '0px 2px 0px 0px #32323253' : '',
            }}
            onClick={() => setPaymentPage(true)}
          >
            Budget Report
          </span>
        </div>
      </div> */}
      <div className={styles.VendorWishlistHead}>
        {/* <button className={styles.VendorManagerseeAll}>See All</button> */}
        <div className={styles.tab}>
          <span
            style={
              paymentPage
                ? {
                    cursor: "pointer",
                    color: "#b6255a",
                    background: "white",
                  }
                : {}
            }
            onClick={() => setPaymentPage(false)}
          >
            Budget Planner
          </span>
          <span
            style={
              !paymentPage
                ? {
                    cursor: "pointer",
                    color: "#b6255a",
                    background: "white",
                  }
                : {}
            }
            onClick={() => setPaymentPage(true)}
          >
            Budget Report
          </span>
        </div>
      </div>
      <div className={styles.ChecklistBtndiv1}>
        <div className={styles.btnRightdivBP}>
          <button className={styles.DownloadAndPrint} onClick={generateInvoice}>
            <img
              src={`${S3PROXY}/public/images/webp/downloadIcon.webp`}
              alt=""
            />{" "}
            Download
          </button>
          <button className={styles.DownloadAndPrint} onClick={printInvoice}>
            <img src={`${S3PROXY}/public/images/webp/printicon.webp`} alt="" />
            Print
          </button>
        </div>
      </div>
      {paymentPage ? (
        <div className={styles.paymentPage}>
          <div className={styles.paymentGraphDiv}>
            <span>Expenses</span>
            <div className={styles.paymentgraph}>
              {/* <Chart
                options={{
                  labels: [
                    ...allCats?.categories?.map((values, key) => {
                      return values.name;
                    }),
                  ],
                  chart: { type: 'polarArea' },
                  legend: {
                    show: true,
                    position: windowWidth > 900 ? 'right' : 'bottom',
                    fontSize: '14px',
                    height: '30px',
                    horizontalAlign: 'left',
                  },
                  dataLabels: { enabled: false },
                  tooltip: { enabled: false },
                  dataLabels: {
                    enabled: true,
                    formatter: function (val) {
                      return val.toFixed(2) + '%';
                    },
                  },
                  stroke: { width: 0 },
                  plotOptions: {
                    pie: {
                      expandOnClick: false,
                      donut: {
                        size: '50%',
                        labels: {
                          show: false,
                          name: { show: false },

                          total: {
                            show: false,
                            showAlways: false,
                            formatter: function (w) {
                              const totals = w.globals.seriesTotals;

                              const result = totals.reduce((a, b) => a + b, 0);

                              return (result / 1000).toFixed(3);
                            },
                          },
                        },
                      },
                    },
                  },
                }}
                series={[
                  ...allCats?.categories?.map((values, key) => {
                    return values.percentage;
                  }),
                ]}
                type='polarArea'
                height={'100%'}
              /> */}
              <Chart
                options={{
                  chart: {
                    type: "bar",
                    height: 350,
                  },
                  plotOptions: {
                    bar: {
                      horizontal: false,
                    },
                  },
                  colors: [
                    "#008FFB",
                    "#00E396",
                    "#FEB019",
                    "#FF4560",
                    "#775DD0",
                  ],
                  dataLabels: {
                    enabled: false,
                  },
                  xaxis: {
                    categories: allCats?.categories?.map((values) => {
                      if (windowWidth < 900) {
                        return values.name.substr(0, 5);
                      } else {
                        return values.name;
                      }
                    }),
                  },
                  legend: {
                    position: "right",
                    offsetY: 40,
                  },
                }}
                series={[
                  {
                    name: "Percentage",
                    data: allCats?.categories?.map(
                      (values) => values.percentage
                    ),
                  },
                ]}
                type="bar"
                height={"100%"}
              />
            </div>
          </div>
          <div className={styles.estCostandFincost}>
            {/* <div className={styles.estCostandFincostBox}>
              <span className={styles.estCostandFincostBoxhead}>
                Estimated Cost
              </span>
              <span className={styles.estCostandFincostBoxRup}>
                ₹ {allCats?.total_estimated_amount.toFixed(2)}
              </span>
              <span
                className={styles.estCostandFincostBoxEditBud}
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  setTEA(allCats?.total_estimated_amount);
                  setOpen7(true);
                }}
              >
                Edit Budget
              </span>
            </div> */}
            <article className={styles.payemntOnesecchanged}>
              <span className={styles.payemntOnesecspan}>
                <span className={styles.payemntOnesecspanEvent}>
                  Estimated Cost
                </span>
                <span className={styles.payemntOnesecspanRup}>
                  ₹ {allCats?.total_estimated_amount.toFixed(2)}
                </span>
                <span
                  className={styles.payemntOnesecspanEvent}
                  style={{ cursor: "pointer", textDecoration: "underline" }}
                  onClick={() => {
                    setTEA(allCats?.total_estimated_amount);
                    setOpen7(true);
                  }}
                >
                  Edit Budget
                </span>
              </span>
              <div className={styles.payemntOnesecBriefcase}>
                <img
                  src={`${S3PROXY}/public/images/briefcase-outline.png`}
                  alt=""
                />
              </div>
            </article>
            <article className={styles.payemntOnesecchanged}>
              <span className={styles.payemntOnesecspan}>
                <span className={styles.payemntOnesecspanEvent}>
                  Final Cost
                </span>
                <span className={styles.payemntOnesecspanRup}>
                  ₹ {allCats?.total_final_cost.toFixed(2)}
                </span>
              </span>
              <div className={styles.payemntOnesecBriefcase}>
                <img
                  src={`${S3PROXY}/public/images/briefcase-outline.png`}
                  alt=""
                />
              </div>
            </article>
            <article className={styles.payemntOnesecchanged}>
              <span className={styles.payemntOnesecspan}>
                <span className={styles.payemntOnesecspanEvent}>Paid</span>
                <span className={styles.payemntOnesecspanRup}>
                  ₹ {allCats?.total_paid_amount.toFixed(2)}
                </span>
              </span>
              <div className={styles.payemntOnesecBriefcase}>
                <img
                  src={`${S3PROXY}/public/images/briefcase-outline.png`}
                  alt=""
                />
              </div>
            </article>
            <article className={styles.payemntOnesecchanged}>
              <span className={styles.payemntOnesecspan}>
                <span className={styles.payemntOnesecspanEvent}>Pending</span>
                <span className={styles.payemntOnesecspanRup}>
                  ₹{" "}
                  {(
                    allCats?.total_final_cost - allCats?.total_paid_amount
                  ).toFixed(2)}
                </span>
              </span>
              <div className={styles.payemntOnesecBriefcase}>
                <img
                  src={`${S3PROXY}/public/images/briefcase-outline.png`}
                  alt=""
                />
              </div>
            </article>
          </div>
          <div className={styles.paymentAllCats}>
            {allCats?.categories?.map((values, key) => {
              return (
                <article
                  className={styles.payemntOnesec}
                  onClick={async () => {
                    const config = {
                      headers: { authorization: globleuser?.data?.token },
                    };
                    setCurrentId(values?.id);
                    subcatsRef();
                    const res = { data: resAllsubcat };
                    setSubAllCats(res?.data?.data);
                    setPaymentPage(false);
                    if (windowWidth <= 900) {
                      setPaymentDetail(true);
                    }
                  }}
                >
                  <span className={styles.payemntOnesecspan}>
                    <span className={styles.payemntOnesecspanRup1}>
                      ₹ {values.estimated_amount.toFixed(2)}
                    </span>
                    <span className={styles.payemntOnesecspanEvent1}>
                      {values?.name}
                    </span>
                  </span>
                  <div className={styles.payemntOnesecBriefcase}>
                    <img
                      src={`${S3PROXY}/public/images/webp/briefcase-outline.webp`}
                      alt=""
                    />
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      ) : (
        <>
          <>
            <div className={styles.BudgetPlannerBody}>
              <div className={styles.bodyLeftSecBudPlan}>
                <span className={styles.BudplannerPaymentSpan}>Payment</span>
                <div className={styles.BudplannerPayment}>
                  {allCats?.categories?.map((values, key) => {
                    return (
                      <article
                        className={
                          values?.id === allSubCats?.category_id
                            ? styles.payemntOnesecchanged
                            : styles.payemntOnesec
                        }
                        onClick={async () => {
                          setCurrentId(values?.id);
                          subcatsRef();
                          const res = { data: resAllsubcat };
                          setSubAllCats(res?.data?.data);
                          setshowSubmit(false);
                        }}
                      >
                        <span className={styles.payemntOnesecspan}>
                          <span className={styles.payemntOnesecspanRup}>
                            ₹ {values.estimated_amount.toFixed(2)}
                          </span>
                          <span className={styles.payemntOnesecspanEvent}>
                            {values?.name}
                          </span>
                        </span>
                        <div className={styles.payemntOnesecBriefcase}>
                          <img
                            src={`${S3PROXY}/public/images/briefcase-outline.png`}
                            alt=""
                          />
                        </div>
                      </article>
                    );
                  })}
                  <article className={styles.payemntOnesecplus}>
                    <div
                      className={styles.payemntOnesecBriefcaseplus}
                      onClick={() => setOpen2(true)}
                    >
                      +
                    </div>
                  </article>
                </div>
              </div>
              <div className={styles.bodyRightSecBudPlan}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingRight: "30px",
                  }}
                >
                  <span className={styles.BudgetPlannerpayemntDetailspan}>
                    {allSubCats?.category_name} Payment Details
                  </span>
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={`${S3PROXY}/public/images/fluent-mdl2_edit.png`}
                      alt=""
                      onClick={() => {
                        setAddedName({
                          name: allSubCats?.category_name,
                          id: allSubCats?.category_id,
                        });
                        setOpen6(true);
                      }}
                    />
                    <span
                      onClick={async () => {
                        setOpenLoadingModal(true);
                        const res = await deleteBudgetCats(
                          allSubCats?.category_id
                        );
                        if (res?.data?.success) {
                          setCurrentId("");
                          setUpdate(!update);
                        }
                        setOpenLoadingModal(false);

                        toast.success("Deleted Successfully", {
                          position: "top-right",
                          autoClose: 1000,
                        });
                      }}
                      className="cursor-pointer"
                    >
                      <img
                        src={`${S3PROXY}/public/images/deleteg.png`}
                        alt=""
                      />
                    </span>
                  </div>
                </div>
                <div className={styles.BudgetPlannerpayemntBox}>
                  <div className={styles.BudgetPlannerpayemntBoxTop}>
                    <div className={styles.BudgetPlannerpayemntBoxleft}>
                      <article>
                        <span>Estimated</span>
                        <span>
                          ₹ {allSubCats?.total_estimated_amount.toFixed(2)}
                        </span>
                      </article>
                      <article>
                        <span>Final Cost</span>
                        <span>₹ {allSubCats?.total_final_cost}</span>
                      </article>
                      <article>
                        <span>Paid Amount</span>
                        <span>₹ {allSubCats?.total_paid_amount}</span>
                      </article>
                    </div>
                    <div className={styles.BudgetPlannerpayemntBoxRight}>
                      <div className={styles.bigBriefcase}>
                        <img
                          src={`${S3PROXY}/public/images/briefcase-outline.png`}
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                  <div className={styles.budPlanTable}>
                    <div className={styles.topPart}>
                      <div className={styles.budPlanTableHead}>
                        <span className={styles.budPlanTableHeadnames}>
                          Expense
                        </span>
                        <span className={styles.budPlanTableHeadValues}>
                          Estimated Cost
                        </span>
                        <span className={styles.budPlanTableHeadValues1}>
                          Final Cost
                        </span>
                        <span className={styles.budPlanTableHeadValues1}>
                          Paid
                        </span>
                        <span className={styles.budPlanTableHeadValues1}></span>
                      </div>
                      <div className={styles.budPlanTableBody}>
                        {allSubCats?.subcategory?.map((values, key) => {
                          allSubCats = JSON.parse(JSON.stringify(allSubCats));
                          return (
                            <div className={styles.budPlanTableBodySec}>
                              <span className={styles.budPlanTableHeadnames}>
                                <input
                                  value={values?.subcategory_name}
                                  type="text"
                                  size="small"
                                  variant="standard"
                                  // width='0px'
                                  onChange={(e) => {
                                    const arr = allSubCats;
                                    arr.subcategory[key].subcategory_name =
                                      e.target.value;
                                    setSubAllCats({ ...arr });
                                    setshowSubmit(true);
                                  }}
                                />
                              </span>
                              <span className={styles.budPlanTableHeadValues}>
                                ₹
                                <input
                                  value={values?.estimated_amount}
                                  type="number"
                                  size="small"
                                  variant="standard"
                                  width="0px"
                                  onChange={(e) => {
                                    const arr = allSubCats;
                                    arr.subcategory[key].estimated_amount =
                                      parseInt(e.target.value);
                                    setshowSubmit(true);
                                    setSubAllCats({ ...arr });
                                  }}
                                />
                                {/* <CustomInput placeholder="Enter text" /> */}
                              </span>
                              <span className={styles.budPlanTableHeadValues}>
                                ₹{" "}
                                <input
                                  value={values?.final_cost}
                                  type="number"
                                  size="small"
                                  variant="standard"
                                  width="0px"
                                  onChange={(e) => {
                                    const arr = allSubCats;
                                    arr.subcategory[key].final_cost = parseInt(
                                      e.target.value
                                    );
                                    setshowSubmit(true);
                                    setSubAllCats({ ...arr });
                                  }}
                                />
                              </span>
                              <span className={styles.budPlanTableHeadValues}>
                                ₹{" "}
                                <input
                                  value={values?.paid_amount}
                                  type="number"
                                  size="small"
                                  variant="standard"
                                  width="0px"
                                  onChange={(e) => {
                                    const arr = allSubCats;
                                    arr.subcategory[key].paid_amount = parseInt(
                                      e.target.value
                                    );
                                    setshowSubmit(true);
                                    setSubAllCats({ ...arr });
                                  }}
                                />
                              </span>
                              <span className={styles.budPlanTableHeadValues}>
                                <img
                                  src={`${S3PROXY}/public/images/message.png`}
                                  alt=""
                                  onClick={() => {
                                    setAddedNote({
                                      notes: values?.notes,
                                      cid: allSubCats?.category_id,
                                      id: values?.id,
                                    });
                                    setOpen(true);
                                  }}
                                />
                                <img
                                  src={`${S3PROXY}/public/images/deleteg.png`}
                                  alt=""
                                  onClick={async () => {
                                    setOpenLoadingModal(true);
                                    const res = await deleteBudgetSubCats({
                                      id: values.id,
                                      catId: allSubCats?.category_id,
                                    });
                                    if (res?.data?.success) {
                                      setAllCats(res.data.data.catData);
                                      setSubAllCats(res.data.data.subCatData);
                                    }
                                    setOpenLoadingModal(false);

                                    toast.success("Deleted Successfully", {
                                      position: "top-right",
                                      autoClose: 1000,
                                    });
                                  }}
                                />
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <article>
                      <div className={styles.budPlanTableBodySecbtns}>
                        <span
                          className={styles.budPlanTableBodySecAddnewExp}
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            setExpSubCat({
                              ...expSubCat,
                              cid: allSubCats?.category_id,
                            });
                            setOpen1(true);
                          }}
                        >
                          Add new Expense
                        </span>
                        {showSubmit ? (
                          <button
                            onClick={async () => {
                              setOpenLoadingModal(true);
                              const res = await updateSubCats(allSubCats);
                              if (res?.data?.success) {
                                setSubAllCats(res.data.data.subCatData);
                                setAllCats(res.data.data.catData);
                                setshowSubmit(false);
                              }
                              setOpenLoadingModal(false);

                              toast.success("Updated Successfully", {
                                position: "top-right",
                                autoClose: 1000,
                              });
                            }}
                          >
                            Save
                          </button>
                        ) : (
                          <></>
                        )}
                      </div>
                      <div className={styles.budPlanTableFoot}>
                        <span className={styles.budPlanTableHeadnames}>
                          Total
                        </span>
                        <span className={styles.budPlanTableHeadValues}>
                          ₹ {allSubCats?.total_estimated_amount.toFixed(2)}
                        </span>
                        <span className={styles.budPlanTableHeadValues1}>
                          ₹ {allSubCats?.total_final_cost}
                        </span>
                        <span className={styles.budPlanTableHeadValues1}>
                          ₹ {allSubCats?.total_paid_amount}
                        </span>
                        <span className={styles.budPlanTableHeadValues1}></span>
                      </div>
                    </article>
                  </div>
                </div>
              </div>
            </div>
          </>
        </>
      )}
      <ToastContainer />
    </div>
  );
};

export default BudgetPlanner;

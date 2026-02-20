import React, { useEffect, useState } from "react";
import styles from "../../styles/planning.module.scss";
import { pink, yellow } from "@mui/material/colors";
import ProgressBar from "@ramonak/react-progress-bar";
import { Box, MenuItem, Select, TextField, Tooltip } from "@mui/material";
import Checkbox, { checkboxClasses } from "@mui/material/Checkbox";
import useWindowSize from "@rooks/use-window-size";
import Modal from "@mui/material/Modal";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, user } from "../../redux/reducer/appEssentials";
import moment from "moment";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Spinner } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  checklistval1,
  checklistval2,
} from "../../yupValidation/planningToolsValidation";
import {
  useAddTodosMutation,
  useDeleteTGMMutation,
  useDeleteTodosMutation,
  useGetRtodosQuery,
  useGetTodosByCondition2Query,
  useGetTodosQuery,
  useTodosCheckMutation,
  useUpdateTGMMutation,
  useUpdateTodosMutation,
} from "redux/Api/planningTools.api";
import Head from "next/head";
import { S3PROXY } from "../../config";
const SingleTodo = ({
  category,
  completed,
  config,
  handleEditopen,
  update,
  setUpdate,
  setOpenLoadingModal,
}) => {
  const [data, setData] = useState([]);

  const condition = { category };
  if (completed !== "all") {
    condition.completed = completed;
  }
  const { data: getTodosByCondition2, refetch: getToodbtCondition } =
    useGetTodosByCondition2Query(condition);
  useEffect(() => {
    getToodbtCondition();
  }, [update]);
  useEffect(() => {
    const getdata = async () => {
      const res = { data: getTodosByCondition2 };
      setData(res?.data?.data);
    };
    getdata();
  }, [completed, update, getTodosByCondition2]);

  const [todosCheck] = useTodosCheckMutation();
  const [deleteTodos] = useDeleteTodosMutation();
  return (
    <>
      {data?.length ? (
        data?.map((values, key) => {
          return (
            <div className={styles.listdiv} key={key}>
              <div
                style={{
                  display: "flex",
                  gap: "14px",
                  width: "80%",
                  alignItems: "center",
                }}
              >
                <input
                  type="checkbox"
                  style={{
                    height: "1.5rem",
                    width: "1.5rem",
                    accentColor: "#b6255a",
                  }}
                  checked={values.completed}
                  onChange={async (e) => {
                    const res = await todosCheck({
                      id: values?._id,
                      completed: e.target.checked,
                    });
                    if (res?.data?.success) {
                      setUpdate(!update);
                    }
                  }}
                ></input>
                <article style={{ width: "80%" }}>
                  <span className={styles.shortListSpan}>{values.title}</span>
                  <span className={styles.shortlistDue}>
                    {values.completed
                      ? `Completed
                  ${moment(values.completedOn.replaceAll(`"`, "")).format(
                    "MMM DD"
                  )}`
                      : `Due
                  ${moment(values.dueDate.replaceAll(`"`, "")).format(
                    "MMM DD"
                  )}`}
                  </span>
                </article>
              </div>
              <div className={styles.todoBtn}>
                <button
                  onClick={() =>
                    handleEditopen(
                      values._id,
                      values.title,
                      moment(values.dueDate.replaceAll(`"`, "")).format(),
                      values.category
                    )
                  }
                >
                  <img
                    src={`${S3PROXY}/public/images/fluent-mdl2_edit.png`}
                    alt=""
                  />
                </button>
                <button
                  onClick={async () => {
                    setOpenLoadingModal(true);
                    const res = await deleteTodos(values._id);
                    if (res?.data?.success) {
                      setOpenLoadingModal(false);
                      setUpdate(!update);

                      toast.success("Todo Deleted Successfully", {
                        position: "top-right",
                        autoClose: 1000,
                      });
                    }
                  }}
                >
                  <img src={`${S3PROXY}/public/images/delete.png`} alt="" />
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <h4 style={{ width: "100%", padding: "10px 30px" }}>
          No Checklist Found
        </h4>
      )}
    </>
  );
};
const CheckList = () => {
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
    // border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    borderRadius: "10px",
    alignItems: "center",
    justifyContent: "center",
    height: windowWidth >= 900 ? "450px" : "fit-content",
    overflow: "scroll",

    zIndex: "-1",
  };
  const dispatch = useDispatch();

  const [isClick, setClick] = useState(false);
  const [array1, setarray1] = useState([]);
  const [category, setCategory] = useState([]);
  const [category123, setCategory123] = useState([]);
  const [alltodos, setAlltodos] = useState();
  useEffect(() => {
    setarray1(globleuser?.data?.todos);
  }, [globleuser]);
  const { data: rtodos, refetch: rtodosRefetch } = useGetRtodosQuery({
    todos: array1,
  });
  useEffect(() => {
    rtodosRefetch();
  }, [array1]);
  useEffect(() => {
    const getCat = async () => {
      const res = { data: rtodos };
      setAlltodos(res?.data?.sum);
      setCategory123(res?.data?.data);
    };
    getCat();
  }, [rtodos]);
  const [categoryname, setCategoryname] = useState("");
  const [todoTitle, settodoTitle] = useState("");
  const [dueDate, setdueDate] = useState("");
  const [selectedCategory, setselectedCategory] = useState(null);
  const uniqueNames = Array.from(new Set(category));
  const [open, setOpen] = React.useState(false);
  const [update, setUpdate] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [open1, setOpen1] = React.useState(false);
  const handleOpen1 = () => {
    setOpen1(true);
  };
  const handleClose1 = () => {
    setOpen1(false);
    setId("");
    setselectedCategory("");
    settodoTitle("");
    setdueDate("");
  };
  const [completedTask, setCompletedTask] = useState();
  const { data: Todos } = useGetTodosQuery();
  useEffect(() => {
    const getCompletedTask = async () => {
      const res = {
        data: Todos,
      };
      setCompletedTask(res?.data?.data);
    };
    getCompletedTask();
  }, [globleuser, update, Todos]);
  const [addTodos] = useAddTodosMutation();
  const [resupdateTodos] = useUpdateTodosMutation();
  const handleTodoSubmit = async () => {
    try {
      await checklistval2.validate({
        title: todoTitle,
        selectedCategory: selectedCategory,
        dueDate: moment(dueDate).format(),
      });

      setOpenLoadingModal(true);
      const config = {
        headers: { authorization: globleuser?.data?.token },
      };
      if (!id) {
        const res = await addTodos({
          title: todoTitle,
          category: selectedCategory,
          dueDate: moment(dueDate).format(),
        });
      } else {
        const res = await resupdateTodos({
          title: todoTitle,
          category: selectedCategory,
          dueDate: moment(dueDate).format(),
          id: id,
        });
        if (res?.data?.success) {
          setUpdate(!update);
          setId("");
          setselectedCategory("");
          settodoTitle("");
          setdueDate("");
        }
      }
      setOpenLoadingModal(false);
      toast.success("Todo added Succesfully", {
        position: "top-right",
        autoClose: 1000,
      });
      setUpdate(!update);
      setOpen1(false);
    } catch (e) {
      toast.error(`${e}`, {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };
  const [updateTGM] = useUpdateTGMMutation();
  const handleSubmitforCategory = async () => {
    try {
      await checklistval1.validate(categoryname);
      setOpenLoadingModal(true);
      const array12 = [...array1, categoryname];
      let res = await updateTGM({
        todos: array12,
      });
      res = JSON.parse(JSON.stringify(res));
      res.data.data.token = globleuser?.data?.token;
      dispatch(user(res.data));
      localStorage.setItem("wedfield", JSON.stringify(res.data));
      setOpenLoadingModal(false);
      setCategoryname("");
      setOpen(false);
      toast.success("Category Added Successfully", {
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
  const submit = (cat, key) => {
    confirmAlert({
      title: "Confirm to delete",
      message: `Are you sure youe want to delete ${cat}`,
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            handleDeleteCat(cat, key);
          },
        },
        {
          label: "No",
        },
      ],
    });
  };
  const [completed, setCompleted] = useState("all");
  const [id, setId] = useState();
  const handleEditopen = async (id, title, duedate, cat) => {
    settodoTitle(title);
    setselectedCategory(cat);
    setdueDate(duedate);
    setId(id);
    setOpen1(true);
  };
  const [deleteTGM] = useDeleteTGMMutation();
  const handleDeleteCat = async (cat, key) => {
    setOpenLoadingModal(true);
    if (typeof key === "number") {
      const arr123 = [...array1];
      arr123.splice(key, 1);
      let res = await deleteTGM({
        todos: arr123,
        category: cat,
      });
      res = JSON.parse(JSON.stringify(res));
      res.data.data.token = globleuser?.data?.token;
      dispatch(user(res.data));
      localStorage.setItem("wedfield", JSON.stringify(res.data));
      setOpen(false);
    } else {
      const uniquearray = array1.filter((values) => values !== cat);
      let res = await deleteTGM({
        todos: uniquearray,
        category: cat,
      });
      res = JSON.parse(JSON.stringify(res));
      res.data.data.token = globleuser?.data?.token;
      dispatch(user(res.data));
      localStorage.setItem("wedfield", JSON.stringify(res.data));

      toast.success("Category Deleted Successfully", {
        position: "top-right",
        autoClose: 1000,
      });
      setOpen(false);
    }
    setCategory([]);
    setOpenLoadingModal(false);
    setUpdate(!update);
  };
  return (
    <div className={styles.VendorManagerDiv}>
      <Head>
        <title>Checklist – WedField</title>
        <meta
          name="description"
          content="Track Your Big Day Planning Preparation list on Your Fingertips. You can also Edit or delete Your tasks in the Checklist tab on WedField."
        />
        <link
          name="canonical"
          href={`https://wedfield.com/user-dashboard?direction=Checklist`}
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
            <div
              className={styles.Nameinput}
              style={{ width: "100%", gap: "10px" }}
            >
              <span>Category</span>
              <input
                value={categoryname}
                id="standard-basic"
                label="Category"
                variant="outlined"
                onChange={(e) => {
                  setCategoryname(e.target.value);
                }}
              />
            </div>
            <button
              className={styles.saveBtn}
              onClick={() => handleSubmitforCategory()}
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
            <div
              className={styles.Nameinput}
              style={{ width: "100%", gap: "5px" }}
            >
              <span>Title</span>
              <input
                value={todoTitle}
                id="standard-basic"
                label="Title"
                variant="outlined"
                onChange={(e) => {
                  settodoTitle(e.target.value);
                }}
              />
            </div>
            <div
              className={styles.Nameinput}
              style={{ width: "100%", gap: "5px", marginTop: "10px" }}
            >
              <span>Due Date</span>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  defaultValue={dayjs(dueDate)}
                  label="Due Date"
                  onChange={(e) => setdueDate(e.$d)}
                />
              </LocalizationProvider>
            </div>
            <div
              className={styles.Nameinput}
              style={{ width: "100%", gap: "5px", marginTop: "10px" }}
            >
              <span>Category</span>
              <Select
                value={selectedCategory}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Age"
                onChange={(e) => {
                  setselectedCategory(e.target.value);
                }}
              >
                <MenuItem value={null} selected disabled>
                  Category
                </MenuItem>
                {array1?.map((values, key) => {
                  return <MenuItem value={values}>{values}</MenuItem>;
                })}
              </Select>
            </div>
            <button
              className={styles.saveBtn}
              onClick={() => handleTodoSubmit()}
            >
              {id ? "Update" : " Save"}
            </button>
          </div>
        </Box>
      </Modal>
      {windowWidth > 900 ? (
        <>
          <div className={styles.NEWcheckListhead}>
            <div className={styles.checkListhead1}>
              <span className={styles.VendorManagerspan1}>
                Your Checklist
                {/* <div className={styles.DownloadAndPrintdiv}>
                  <button className={styles.DownloadAndPrint}>
                    <img
                      src={`${S3PROXY}/public/images/downloadIcon.png`}
                      alt=''
                    />{' '}
                    Download
                  </button>
                  <button className={styles.DownloadAndPrint}>
                    <img
                      src={`${S3PROXY}/public/images/printicon.png`}
                      alt=''
                    />
                    Print
                  </button>
                </div> */}
              </span>
              <div className={styles.tcdiv}>
                <span>
                  Task Completed{" "}
                  <b>
                    {completedTask?.completed} out of {completedTask?.all}
                  </b>
                </span>
                <ProgressBar
                  completed={completedTask?.completed}
                  maxCompleted={completedTask?.all}
                  width="100%"
                  baseBgColor="#e1e1e1"
                  bgColor="#B6255A"
                  height="14px"
                  labelSize="0px"
                  borderRadius="50px"
                />
              </div>
            </div>
            <div className={styles.ChecklistBtndiv}>
              <div className={styles.btnRightdiv}>
                <button
                  className={styles.VendorManagerseeAll1}
                  onClick={() => handleOpen()}
                >
                  Add Categories
                </button>
                <button
                  className={styles.VendorManagerseeAll}
                  onClick={() => handleOpen1()}
                >
                  Add Task
                </button>
              </div>
            </div>
          </div>
          <div className={styles.VendorManagerBody1}>
            <div className={styles.bodyLeftSec}>
              <div className={styles.Statusdiv}>
                <span>Status</span>
                <article
                  onClick={() => {
                    setCompleted(false);
                  }}
                >
                  <input
                    type="checkbox"
                    style={{
                      width: "1rem",
                      height: "1rem",
                    }}
                    checked={completed !== "all" && completed === false}
                    onChange={(e) => {
                      setCompleted(!e.target.checked);
                    }}
                  ></input>
                  <span>To Do</span>
                </article>{" "}
                <article
                  onClick={() => {
                    setCompleted(true);
                  }}
                >
                  <input
                    type="checkbox"
                    style={{
                      width: "1rem",
                      height: "1rem",
                    }}
                    checked={completed === true}
                    onChange={(e) => {
                      setCompleted(e.target.checked);
                    }}
                  ></input>
                  <span>Done</span>
                </article>
                <article
                  onClick={() => {
                    setCompleted("all");
                  }}
                >
                  <input
                    type="checkbox"
                    style={{
                      width: "1rem",
                      height: "1rem",
                    }}
                    checked={completed === "all"}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setCompleted("all");
                      }
                    }}
                  ></input>
                  <span>All</span>
                </article>
              </div>
              <div className={styles.monthlyandCat}>
                <span className={styles.monthlyandCatspan}>
                  Filter Category
                </span>
                <div className={styles.monthlyandCatdiv}>
                  <article
                  // onClick={() => {
                  //   setCategory([]);
                  // }}
                  // className={!category.length ? styles.statusselected : ''}
                  >
                    <span className={styles.monthlyandCatname}>
                      {" "}
                      <input
                        type="checkbox"
                        style={{
                          width: "1rem",
                          height: "1rem",
                        }}
                        checked={!category.length}
                        onChange={(e) => {
                          setCategory([]);
                        }}
                      ></input>{" "}
                      All
                    </span>
                    <span className={styles.monthlyandCatvalue}>
                      {alltodos}
                    </span>
                  </article>
                  {category123?.map((value) => {
                    const checkcat = category.some(
                      (item) => item === value.name
                    );
                    return (
                      <article
                      // onClick={() => {
                      //   if (checkcat) {
                      //     const uniquearray = category.filter(
                      //       (values) => values !== value.name
                      //     );
                      //     setCategory(uniquearray);
                      //   } else {
                      //     setCategory([...category, value.name]);
                      //   }
                      // }}
                      >
                        <span className={styles.monthlyandCatname}>
                          <input
                            type="checkbox"
                            style={{
                              width: "1rem",
                              height: "1rem",
                            }}
                            checked={checkcat}
                            onChange={(e) => {
                              if (checkcat) {
                                const uniquearray = category.filter(
                                  (values) => values !== value.name
                                );
                                setCategory(uniquearray);
                              } else {
                                setCategory([...category, value.name]);
                              }
                            }}
                          ></input>{" "}
                          {value?.name.substring(0, 16)}
                          {value.name.length > 16 && "..."}
                        </span>
                        <span className={styles.monthlyandCatvalue}>
                          {value.remaining}
                        </span>
                      </article>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className={styles.bodyRightSec}>
              {uniqueNames.length
                ? uniqueNames?.map((values, key) => {
                    return (
                      <div className={styles.rightsecbody} key={key}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            padding: "0px 20px",
                          }}
                        >
                          <span className={styles.monthName}>{values}</span>
                          <button
                            className={styles.deleteCategorybtn}
                            onClick={() => {
                              const handleUnique = true;
                              submit(values, handleUnique);
                            }}
                          >
                            <img
                              src={`${S3PROXY}/public/images/delete.png`}
                              alt=""
                            />
                          </button>
                        </div>
                        <div className={styles.listTable}>
                          <SingleTodo
                            config={config}
                            category={values}
                            completed={completed}
                            handleEditopen={handleEditopen}
                            update={update}
                            setUpdate={setUpdate}
                            setOpenLoadingModal={setOpenLoadingModal}
                          ></SingleTodo>
                        </div>
                      </div>
                    );
                  })
                : array1?.map((values, key) => {
                    return (
                      <div className={styles.rightsecbody}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            padding: "0px 20px",
                          }}
                        >
                          <span className={styles.monthName}>{values}</span>
                          <button
                            className={styles.deleteCategorybtn}
                            onClick={() => submit(values, key)}
                          >
                            <img
                              src={`${S3PROXY}/public/images/delete.png`}
                              alt=""
                            />
                          </button>
                        </div>
                        <div className={styles.listTable}>
                          <SingleTodo
                            config={config}
                            category={values}
                            completed={completed}
                            handleEditopen={handleEditopen}
                            update={update}
                            setUpdate={setUpdate}
                            setOpenLoadingModal={setOpenLoadingModal}
                          ></SingleTodo>
                        </div>
                      </div>
                    );
                  })}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={styles.checkListhead}>
            <div className={styles.NEWcheckListhead}>
              <div className={styles.checkListhead1}>
                <span className={styles.VendorManagerspan1}>
                  Your Checklist
                  {/* <div className={styles.DownloadAndPrintdiv}>
                    <button className={styles.DownloadAndPrint}>
                      <img
                        src={`${S3PROXY}/public/images/downloadIcon.png`}
                        alt=''
                      />{' '}
                      <span>Download</span>
                    </button>
                    <button className={styles.DownloadAndPrint}>
                      <img
                        src={`${S3PROXY}/public/images/printicon.png`}
                        alt=''
                      />
                      <span>Print</span>
                    </button>
                  </div> */}
                </span>
                <div className={styles.tcdiv}>
                  <span>
                    Task Completed{" "}
                    <b>
                      {completedTask?.completed} out of {completedTask?.all}
                    </b>
                  </span>
                  <ProgressBar
                    completed={completedTask?.completed}
                    maxCompleted={completedTask?.all}
                    width="100%"
                    baseBgColor="#e1e1e1"
                    bgColor="#B6255A"
                    height="14px"
                    labelSize="0px"
                    borderRadius="50px"
                  />
                </div>
              </div>
              <div className={styles.ChecklistBtndiv}>
                <div className={styles.btnRightdiv}>
                  <button
                    className={styles.VendorManagerseeAll1}
                    onClick={() => handleOpen()}
                  >
                    Add Categories
                  </button>
                  <button
                    className={styles.VendorManagerseeAll}
                    onClick={() => handleOpen1()}
                  >
                    Add Task
                  </button>
                </div>
              </div>
            </div>
            <div className={styles.DownloadAndPrintdiv}>
              <span>Filters:</span>
              <select
                name=""
                id=""
                onChange={(e) => {
                  if (e.target.value === "To do") {
                    setCompleted(false);
                  } else if (e.target.value === "Done") {
                    setCompleted(true);
                  } else {
                    setCompleted("all");
                  }
                }}
              >
                <option value="To do">To do</option>
                <option value="Done">Done</option>
                <option value="all" selected>
                  All
                </option>
              </select>
            </div>
            <div className={styles.checklistFilter}>
              {array1?.map((value) => {
                return (
                  <span
                    className={styles.checklistFilterspan}
                    onClick={() => setCategory([...category, value])}
                  >
                    {value}
                  </span>
                );
              })}
            </div>
            <div className={styles.yourSearchDiv}>
              <span>Your Filter</span>
              {uniqueNames?.map((values, key) => {
                return (
                  <article>
                    <span
                      onClick={() => {
                        const newarr = [...uniqueNames];
                        newarr.splice(key, 1);
                        setCategory(newarr);
                      }}
                    >
                      {values}
                    </span>
                  </article>
                );
              })}
            </div>
          </div>

          <div className={styles.VendorManagerBody1}>
            <div className={styles.bodyRightSec}>
              <div
                className={styles.rightsecbody}
                style={{ gap: "20px", border: "none", boxShadow: "none" }}
              >
                {uniqueNames.length
                  ? uniqueNames?.map((values, key) => {
                      return (
                        <div className={styles.rightsecbody} key={key}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              padding: "20px",
                            }}
                          >
                            <span className={styles.monthName}>{values}</span>
                            <button
                              className={styles.deleteCategorybtn}
                              onClick={() => {
                                const handleUnique = true;
                                submit(values, handleUnique);
                              }}
                            >
                              <img
                                src={`${S3PROXY}/public/images/delete.png`}
                                alt=""
                              />
                            </button>
                          </div>
                          <div className={styles.listTable}>
                            <SingleTodo
                              config={config}
                              category={values}
                              completed={completed}
                              handleEditopen={handleEditopen}
                              update={update}
                              setUpdate={setUpdate}
                              setOpenLoadingModal={setOpenLoadingModal}
                            ></SingleTodo>
                          </div>
                        </div>
                      );
                    })
                  : array1?.map((values, key) => {
                      return (
                        <div className={styles.rightsecbody}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              padding: "10px 20px",
                            }}
                          >
                            <span className={styles.monthName}>{values}</span>
                            <button
                              className={styles.deleteCategorybtn}
                              onClick={() => submit(values, key)}
                            >
                              <img
                                src={`${S3PROXY}/public/images/delete.png`}
                                alt=""
                              />
                            </button>
                          </div>
                          <div className={styles.listTable}>
                            <SingleTodo
                              config={config}
                              category={values}
                              completed={completed}
                              handleEditopen={handleEditopen}
                              update={update}
                              setUpdate={setUpdate}
                              setOpenLoadingModal={setOpenLoadingModal}
                            ></SingleTodo>
                          </div>
                        </div>
                      );
                    })}
              </div>
            </div>
          </div>
        </>
      )}
      <ToastContainer />
    </div>
  );
};

export default CheckList;

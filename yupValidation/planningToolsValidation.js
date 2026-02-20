import * as yup from "yup";
import YupPassword from "yup-password";
YupPassword(yup);

export const wedplannerval = yup.object({
  groomName: yup.string().required("Groom Name Is Required"),
  brideName: yup.string().required("Bride Name Is Required"),
  eventDate: yup.string().required("Event Date is required"),
  startTime: yup.string().required("Start time is required"),
  endTime: yup.string().required("End time is required"),
  groomImage: yup
    .mixed()
    .test("asjldjhalskdjlas", "Groom Images is Required", (value) => {
      if (typeof value === "string" || value[0]?.originFileObj) {
        return true;
      } else {
        return false;
      }
    }),
  brideImage: yup
    .mixed()
    .test("asjldjhalskdjlas", "Bride Images is Required", (value) => {
      if (typeof value === "string" || value[0]?.originFileObj) {
        return true;
      } else {
        return false;
      }
    }),
});
export const checkNameEmail = yup.object({
  name: yup.string().required("Name Is Required"),
  email: yup.string().required("Email Required").email(),
});
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const checklistval1 = yup.string().required("Category Is Required");
export const checklistval2 = yup.object({
  title: yup.string().required("Todo Title is Required"),
  selectedCategory: yup.string().required("Subcategory is Required"),
  dueDate: yup
    .string()
    .required("Due Date is required")
    .test("Due Date is required", "Due Date is required", (val) => {
      if (val !== "Invalid date") {
        return true;
      } else {
        return false;
      }
    }),
});
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const guestlistval1 = yup.string().required("Group Name Is Required");
export const guestlistval2 = yup.string().required("Menu Name Is Required");
export const guestlistval3 = yup.object({
  name: yup.string().required("Guest Name is Required"),
  phone: yup.string().required("Guest Phone is Required"),
  group: yup.string().required("Select Group"),
  menu: yup.string().required("Select Menu"),
  gender: yup.string().required("Select Gender"),
});
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const budgetPlannerval1 = yup.object({
  category: yup.string().required("Category Name is Required"),
  subCategory: yup.array().of(
    yup.object({
      subcategory_name: yup.string().required("Expense Name is Required"),
      estimated_amount: yup
        .number()
        .required("Estimated Value is Required")
        .min(1, "Estimated Value Should Not be zero"),
      // .positive("Estimated Amt Should be Positive"),
    })
  ),
});
export const budgetPlannerval2 = yup
  .string()
  .required("Category Name Is Required");
export const budgetPlannerval3 = yup
  .string()
  .required("Note Should Not be Empty");
export const budgetPlannerval4 = yup
  .number()
  .required("Amount Is Required")
  .min(1, "Estimated Value Should Not be zero");
export const budgetPlannerval5 = yup.object({
  subcategory_name: yup.string().required("Expense Name is Required"),
  estimated_amount: yup
    .number()
    .required("Estimated Value is Required")
    .min(1, "Estimated Value Should Not be zero"),
  // .positive("Estimated Amt Should be Positive"),
});
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const invitesval = yup.object({
  groomName: yup.string().required("Groom Name Is Required"),
  brideName: yup.string().required("Bride Name Is Required"),
  brideSurname: yup.string().required("Groom Surname Is Required"),
  groomSurname: yup.string().required("Bride Surname Is Required"),
  weddingDate: yup.string().required("Wedding Date is required"),
  weddingLoc: yup.string().required("Wedding Loc Is Required"),
  ourStory: yup.string().required("Our Story Is Required"),
  groomStory: yup.string().required("Groom Story Is Required"),
  brideStory: yup.string().required("Bride Story Is Required"),
  eventListDesc: yup.string().required("Eventlist Descreption Is Required"),
  bgColor: yup.string().required("BackGround Color Is Required"),
  mainFontcolor: yup.string().required("Main Font Color Is Required"),
  eventFontcolor: yup.string().required("Eventlist Font color Is Required"),
  EventList: yup.array().of(
    yup.object({
      name: yup.string().required("Event Name Is Required"),
      time: yup.string().required("Event Time is required"),
      date: yup.string().required("Event Date is required"),
      venue: yup.string().required("Event Venue is required"),
      theme: yup.string().required("Event Theme is required"),
      colourCode: yup.string().required("Event ColorCode is required"),
    })
  ),

  eventListpic: yup
    .mixed()
    .test("asjldjhalskdjlas", "Eventlist Image is Required", (value) => {
      if (typeof value[0].url === "string" || value[0]?.originFileObj) {
        return true;
      } else {
        return false;
      }
    }),
  circlepic: yup
    .mixed()
    .test("asjldjhalskdjlas", "Story Image is Required", (value) => {
      if (typeof value[0].url === "string" || value[0]?.originFileObj) {
        return true;
      } else {
        return false;
      }
    }),
  coverPic: yup
    .mixed()
    .test("Story Image is Required", "Story Image is Required", (value) => {
      if (typeof value[0].url === "string" || value[0]?.originFileObj) {
        return true;
      } else {
        return false;
      }
    }),
});

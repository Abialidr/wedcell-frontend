import * as yup from "yup";
import YupPassword from "yup-password";
YupPassword(yup);

export const venueval = yup.object({
  name: yup.string().required("Name Is Required"),

  number: yup
    .string()
    .required("Mobile No. Is Required")
    .matches(/^\d+$/, "Mobile No. Should Be in Numbers")
    .length(10, "Mobile No. Should be 10 Digits"),
  city: yup.string().required("City is required"),
  budgetHotel: yup.string().required("Budget Of Hotel is required"),
  toe: yup.string().required("Type of Event is required"),
  doe: yup.string().required("Date of Event is required"),
});
// ==================================================================
export const otherserviceval = yup.object({
  name: yup.string().required("Name Is Required"),
  location: yup.string().required("location Is Required"),
  number: yup
    .string()
    .required("Mobile No. Is Required")
    .matches(/^\d+$/, "Mobile No. Should Be in Numbers")
    .length(10, "Mobile No. Should be 10 Digits"),
  // slot: yup.string().required("slot is required"),
  eventDate: yup.string().required("date is required"),
  address: yup.string().required("Venue is required"),
});
// =====================================================================
export const orderval = yup.array().of(
  yup.object({
    address1: yup.string().required("Address 1 Is Required"),
    address2: yup.string().required("Address 2 Is Required"),
    city: yup.string().required("City Is Required"),
    email: yup
      .string()
      .required("Email Is Required")
      .email("Enter Proper Email"),
    landmark: yup.string().required("Landmark Is Required"),
    name: yup.string().required("Name Is Required"),
    pincode: yup
      .string()
      .required("Pincode Is Required")
      .matches(/^\d+$/, "Pincode Should Be in Numbers")
      .length(6, "Pincode Should be 6 Digits"),
    number: yup
      .string()
      .required("Mobile No. Is Required")
      .matches(/^\d+$/, "Mobile No. Should Be in Numbers")
      .length(10, "Mobile No. Should be 10 Digits"),
    state: yup.string().required("State is required"),
  })
);

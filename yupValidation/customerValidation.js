import * as yup from "yup";
import YupPassword from "yup-password";
YupPassword(yup);

export const customerLoginval = yup.object({
  mobile: yup.string().required("No Mobile No. Provided"),
  otp: yup
    .string()
    .required("No OTP Provided")
    .trim("No Space Should Be Provided In OTP")
    .length(6, "OTP Should be 6 Digits")
    .matches(/^\d+$/, "OTP Should Be in Numbers"),
});
export const customerFPval1 = yup.object({
  mobile: yup.string().required("No Mobile No. Provided"),
});
export const customerFPval2 = yup.object({
  otp: yup
    .string()
    .trim("No Space Should Be Provided In otp")
    .matches(/^\d+$/, "Otp Should Be in Numbers")
    .length(6, "OTP Should be 6 Digits")
    .required("No OTP Provided"),
  password: yup.string().required("No Password Provided"),
});
export const customerCAval1 = yup.object({
  name: yup.string().required("Name Is Required"),
  email: yup.string().email("Enter Proper Email").required("Email Is Required"),
  mobile: yup.string().required("No Mobile No. Provided"),
  password: yup
    .string()
    .required("No Password Provided")
    .min(
      8,
      "password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special"
    )
    .minLowercase(1, "password must contain at least 1 lower case letter")
    .minUppercase(1, "password must contain at least 1 upper case letter")
    .minNumbers(1, "password must contain at least 1 number")
    .minSymbols(1, "password must contain at least 1 special character"),
});
export const customerCAval2 = yup.object({
  groomName: yup.string().required("Groom Name Is Required"),
  brideName: yup.string().required("Bride Name Is Required"),
  eventDate: yup.object({
    $d: yup.string().required("Event Date is required"),
  }),
  starttime: yup.object({
    $d: yup.string().required("Start time is required"),
  }),
  endtime: yup.object({
    $d: yup.string().required("End time is required"),
  }),
  groomImage: yup.array().length(1, "Groom Images is Required"),
  brideImage: yup.array().length(1, "Bride Images is Required"),
});
export const customerCAval3 = yup.object({
  otp: yup
    .string()
    .trim("No Space Should Be Provided In otp")
    .matches(/^\d+$/, "Otp Should Be in Numbers")
    .length(6, "OTP Should be 6 Digits")
    .required("No OTP Provided"),
});

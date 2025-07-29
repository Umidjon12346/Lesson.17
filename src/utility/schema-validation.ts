import * as Yup from "yup";

export const groupSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  courseId: Yup.number().required("Please select a course"),
  status: Yup.mixed<"new" | "active" | "completed" | "cancelled" | "pending">()
    .oneOf(
      ["new", "active", "completed", "cancelled", "pending"],
      "Please select a valid status"
    )
    .required("Please select a status"),
  start_date: Yup.string().required("Start date is required"),
  start_time: Yup.string()
    .matches(
      /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/,
      "Start time must be in HH:mm format (00:00-23:59)"
    )
    .required("Start time is required"),
  roomId: Yup.number().required("Room is required"),
});

export const branchSchema = Yup.object({
  name: Yup.string().required("Branch name is required"),
  address: Yup.string().required("Address is required"),
  call_number: Yup.string().required("Phone number is required"),
});

export const courseSchema = Yup.object().shape({
  title: Yup.string().required("Course title is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number()
    .typeError("Price must be a whole number")
    .min(0, "Price cannot be less than 0")
    .integer("Price must be an integer")
    .required("Price is required"),
  duration: Yup.number()
    .typeError("Duration must be a number")
    .min(1, "Duration must be at least 1 month")
    .required("Duration is required"),
  lessons_in_a_month: Yup.number()
    .required("Lessons per month is required")
    .oneOf([12, 20], "Must be either 12 or 20"),
  lessons_in_a_week: Yup.number()
    .typeError("Lessons per week must be a whole number")
    .min(1, "Lessons per week must be at least 1")
    .integer("Lessons per week must be an integer")
    .required("Lessons per week is required"),
  lesson_duration: Yup.number()
    .typeError("Duration must be a number")
    .min(1, "Duration must be at least 1 month")
    .required("Duration is required"),
});

export const RoomValidation = Yup.object({
  branchId: Yup.number()
    .typeError("Filial ID raqam bo'lishi kerak")
    .required("Filial ID majburiy"),
  name: Yup.string()
    .required("Xona nomi majburiy")
    .min(2, "Xona nomi kamida 2 ta belgidan iborat bo'lishi kerak"),
  capacity: Yup.number()
    .typeError("Sigim raqam bolishi kerak")
    .required("Sigim majburiy")
    .positive("Sigim musbat son bolishi kerak")
    .integer("Sigim butun son bolishi kerak"),
});

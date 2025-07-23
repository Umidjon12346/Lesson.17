import * as Yup from "yup";

export const groupSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  course_id: Yup.number().required("Please select a course"),
  status: Yup.string().required("Please select a status"),
  start_date: Yup.string().required("Start date is required"),
  end_date: Yup.string().required("End date is required"),
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
  duration: Yup.string().required("Duration is required"),
  lessons_in_a_week: Yup.number()
    .typeError("Lessons per week must be a whole number")
    .min(1, "Lessons per week must be at least 1")
    .integer("Lessons per week must be an integer")
    .required("Lessons per week is required"),
  lesson_duration: Yup.string().required("Lesson duration is required"),
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
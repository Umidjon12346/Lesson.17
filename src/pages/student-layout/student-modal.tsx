import React from "react";
import {
  Modal,
  Input,
  Form as AntForm,
  Button,
  DatePicker,
  InputNumber,
  Select,
  message,
} from "antd";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import type { Student } from "../../types/student";
import { MaskedInput } from "antd-mask-input";
import { useStudent } from "../../hooks/useStudent";

interface StudentModalProps {
  visible: boolean;
  onClose: () => void;
  editData?: Student;
}

const createValidationSchema = (isEdit: boolean) =>
  Yup.object({
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
    gender: Yup.string().required("Gender is required"),
    date_of_birth: Yup.string().required("Date of birth is required"),
    lidId: Yup.number().required("Lid ID is required"),
    ...(isEdit
      ? {}
      : {
          password_hash: Yup.string()
            .min(8, "Password must be at least 8 characters")
            .required("Password is required"),
          confirm_password: Yup.string()
            .oneOf([Yup.ref("password_hash")], "Passwords do not match")
            .required("Password confirmation is required"),
        }),
  });



const StudentModal: React.FC<StudentModalProps> = ({
  visible,
  onClose,
  editData,
}) => {
  const isEdit = !!editData;

  const initialValues: Student = {
    first_name: editData?.first_name || "",
    last_name: editData?.last_name || "",
    email: editData?.email || "",
    phone: editData?.phone || "",
    password_hash: "",
    confirm_password: "",
    gender: editData?.gender || "",
    date_of_birth: editData?.date_of_birth || "",
    lidId: editData?.lidId || 0,
  };

  const {useStudentCreate,useStudentUpdate} = useStudent({page:1,limit:5})
  const {mutate:updatefn} = useStudentUpdate()
  const {mutate:createfn} = useStudentCreate()

   const handleSubmit = (values: Student) => {
     const { confirm_password, password_hash, ...rest } = values;

     const payload: any = {
       ...rest,
       ...(isEdit ? {} : { password_hash,confirm_password }),
     };

     if (isEdit && editData?.id != null) {
       updatefn(
         { id: editData.id, model: payload },
         {
           onSuccess: () => {
             message.success("Student updated successfully.");
             onClose();
           },
           onError: () => {
             message.error("Failed to update student.");
           },
         }
       );
     } else {
       createfn(payload, {
         onSuccess: () => {
           message.success("Student created successfully.");
           onClose();
         },
         onError: () => {
           message.error("Failed to create student.");
         },
       });
     }
   };




  return (
    <Modal
      title={isEdit ? "Edit Student" : "Add Student"}
      open={visible}
      onCancel={onClose}
      footer={null}
      destroyOnHidden
    >
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={createValidationSchema(isEdit)}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values }) => (
          <Form>
            <AntForm.Item label="First Name" labelCol={{ span: 24 }}>
              <Field as={Input} name="first_name" placeholder="First name" />
              <div style={{ color: "red" }}>
                <ErrorMessage name="first_name" />
              </div>
            </AntForm.Item>

            <AntForm.Item label="Last Name" labelCol={{ span: 24 }}>
              <Field as={Input} name="last_name" placeholder="Last name" />
              <div style={{ color: "red" }}>
                <ErrorMessage name="last_name" />
              </div>
            </AntForm.Item>

            <AntForm.Item label="Email" labelCol={{ span: 24 }}>
              <Field as={Input} name="email" placeholder="Email" />
              <div style={{ color: "red" }}>
                <ErrorMessage name="email" />
              </div>
            </AntForm.Item>
            <AntForm.Item label="Phone" labelCol={{ span: 24 }}>
              <Field name="phone">
                {({ field, form }: any) => (
                  <MaskedInput
                    {...field}
                    value={field.value || ""}
                    onChange={(e) =>
                      form.setFieldValue("phone", e.target.value)
                    }
                    onBlur={field.onBlur}
                    mask="+\9\9\8 (00) 000-00-00"
                  />
                )}
              </Field>
              <div style={{ color: "red" }}>
                <ErrorMessage name="phone" />
              </div>
            </AntForm.Item>

            {!isEdit && (
              <>
                <AntForm.Item label="Password" labelCol={{ span: 24 }}>
                  <Field
                    as={Input.Password}
                    name="password_hash"
                    placeholder="Password"
                  />
                  <div style={{ color: "red" }}>
                    <ErrorMessage name="password_hash" />
                  </div>
                </AntForm.Item>

                <AntForm.Item label="Confirm Password" labelCol={{ span: 24 }}>
                  <Field
                    as={Input.Password}
                    name="confirm_password"
                    placeholder="Confirm password"
                  />
                  <div style={{ color: "red" }}>
                    <ErrorMessage name="confirm_password" />
                  </div>
                </AntForm.Item>
              </>
            )}

            <AntForm.Item label="Gender" labelCol={{ span: 24 }}>
              <Field name="gender">
                {({ field }: any) => (
                  <Select
                    {...field}
                    value={field.value}
                    onChange={(value) => setFieldValue("gender", value)}
                    style={{ width: "100%" }}
                    placeholder="Select gender"
                  >
                    <Select.Option value="male">Male</Select.Option>
                    <Select.Option value="female">Female</Select.Option>
                  </Select>
                )}
              </Field>
              <div style={{ color: "red" }}>
                <ErrorMessage name="gender" />
              </div>
            </AntForm.Item>

            <AntForm.Item label="Date of Birth" labelCol={{ span: 24 }}>
              <DatePicker
                format="YYYY-MM-DD"
                value={
                  values.date_of_birth ? dayjs(values.date_of_birth) : null
                }
                onChange={(_, dateString) =>
                  setFieldValue("date_of_birth", dateString)
                }
                style={{ width: "100%" }}
              />
              <div style={{ color: "red" }}>
                <ErrorMessage name="date_of_birth" />
              </div>
            </AntForm.Item>

            <AntForm.Item label="Lid ID" labelCol={{ span: 24 }}>
              <Field name="lidId">
                {({ field }: any) => (
                  <InputNumber
                    {...field}
                    value={values.lidId}
                    onChange={(val) => setFieldValue("lidId", val)}
                    style={{ width: "100%" }}
                    min={0}
                  />
                )}
              </Field>
              <div style={{ color: "red" }}>
                <ErrorMessage name="lidId" />
              </div>
            </AntForm.Item>

            <Button type="primary" htmlType="submit" block>
              Save
            </Button>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default StudentModal;

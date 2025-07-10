import React from "react";
import {
  Modal,
  Input,
  Form as AntForm,
  Button,
  DatePicker,
  InputNumber,
  Select,
} from "antd";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import type { Student } from "../../types/student";



interface StudentModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (values: Student) => Promise<void>;
  editData?: Student;
}

const createValidationSchema = (isEdit: boolean) =>
  Yup.object({
    first_name: Yup.string().required("Ism majburiy"),
    last_name: Yup.string().required("Familiya majburiy"),
    email: Yup.string()
      .email("Email manzili noto‘g‘ri formatda")
      .required("Email majburiy"),
    phone: Yup.string().required("Telefon majburiy"),
    gender: Yup.string().required("Jins majburiy"),
    date_of_birth: Yup.string().required("Tug‘ilgan sana majburiy"),
    lidId: Yup.number().required("Lid ID majburiy"),
    ...(isEdit
      ? {}
      : {
          password_hash: Yup.string()
            .min(8, "Parol kamida 8 ta belgidan iborat bo‘lishi kerak")
            .required("Parol majburiy"),
          confirm_password: Yup.string()
            .oneOf([Yup.ref("password_hash")], "Parollar mos emas")
            .required("Parolni tasdiqlash majburiy"),
        }),
  });

const StudentModal: React.FC<StudentModalProps> = ({
  visible,
  onClose,
  onSubmit,
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

  return (
    <Modal
      title={isEdit ? "Talabani tahrirlash" : "Talaba qo‘shish"}
      open={visible}
      onCancel={onClose}
      footer={null}
      destroyOnClose
    >
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={createValidationSchema(isEdit)}
        onSubmit={(values) => {
          const { confirm_password, ...data } = values;
          return onSubmit(data as Student);
        }}
      >
        {({ setFieldValue, values }) => (
          <Form>
            <AntForm.Item label="Ism">
              <Field as={Input} name="first_name" placeholder="Ism" />
              <div style={{ color: "red" }}>
                <ErrorMessage name="first_name" />
              </div>
            </AntForm.Item>

            <AntForm.Item label="Familiya">
              <Field as={Input} name="last_name" placeholder="Familiya" />
              <div style={{ color: "red" }}>
                <ErrorMessage name="last_name" />
              </div>
            </AntForm.Item>

            <AntForm.Item label="Email">
              <Field as={Input} name="email" placeholder="Email" />
              <div style={{ color: "red" }}>
                <ErrorMessage name="email" />
              </div>
            </AntForm.Item>

            <AntForm.Item label="Telefon">
              <Field as={Input} name="phone" placeholder="Telefon raqami" />
              <div style={{ color: "red" }}>
                <ErrorMessage name="phone" />
              </div>
            </AntForm.Item>

            {!isEdit && (
              <>
                <AntForm.Item label="Parol">
                  <Field
                    as={Input.Password}
                    name="password_hash"
                    placeholder="Parol"
                  />
                  <div style={{ color: "red" }}>
                    <ErrorMessage name="password_hash" />
                  </div>
                </AntForm.Item>

                <AntForm.Item label="Parolni tasdiqlang">
                  <Field
                    as={Input.Password}
                    name="confirm_password"
                    placeholder="Parolni qayta kiriting"
                  />
                  <div style={{ color: "red" }}>
                    <ErrorMessage name="confirm_password" />
                  </div>
                </AntForm.Item>
              </>
            )}

            <AntForm.Item label="Jinsi">
              <Field name="gender">
                {({ field }: any) => (
                  <Select
                    {...field}
                    value={field.value}
                    onChange={(value) => setFieldValue("gender", value)}
                    style={{ width: "100%" }}
                    placeholder="Jinsni tanlang"
                  >
                    <Select.Option value="male">Erkak</Select.Option>
                    <Select.Option value="female">Ayol</Select.Option>
                  </Select>
                )}
              </Field>
              <div style={{ color: "red" }}>
                <ErrorMessage name="gender" />
              </div>
            </AntForm.Item>

            <AntForm.Item label="Tug‘ilgan sana">
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

            <AntForm.Item label="Lid ID">
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
              Saqlash
            </Button>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default StudentModal;

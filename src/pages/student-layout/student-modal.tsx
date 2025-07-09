import React from "react";
import { Modal, Input, Form as AntForm, Button, DatePicker, InputNumber } from "antd";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";

export interface Student {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password_hash: string;
  gender: string;
  date_of_birth: string;
  lidId: number;
  eventsId: number;
  groupsId: number;
}

interface StudentModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (values: Student) => Promise<void>;
  editData?: Student;
}

const validationSchema = Yup.object({
  first_name: Yup.string().required("Ism majburiy"),
  last_name: Yup.string().required("Familiya majburiy"),
  email: Yup.string()
    .email("Email manzili noto‘g‘ri formatda")
    .required("Email majburiy"),
  phone: Yup.string().required("Telefon majburiy"),
  password_hash: Yup.string()
    .min(8, "Parol kamida 8 ta belgidan iborat bo‘lishi kerak")
    .required("Parol majburiy"),
  gender: Yup.string().required("Jins majburiy"),
  date_of_birth: Yup.string().required("Tug‘ilgan sana majburiy"),
  lidId: Yup.number().required("Lid ID majburiy"),
  eventsId: Yup.number()
    .required("Voqea ID majburiy")
    .typeError("Son bo'lishi kerak"),
  groupsId: Yup.number()
    .required("Guruh ID majburiy")
    .typeError("Son bo'lishi kerak"),
});

const StudentModal: React.FC<StudentModalProps> = ({
  visible,
  onClose,
  onSubmit,
  editData,
}) => {
  const initialValues: Student = editData || {
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password_hash: "",
    gender: "",
    date_of_birth: "",
    lidId: 0,
    eventsId: 0,
    groupsId: 0,
  };

  return (
    <Modal
      title={editData ? "Talabani tahrirlash" : "Talaba qo‘shish"}
      open={visible}
      onCancel={onClose}
      footer={null}
      destroyOnClose
    >
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ setFieldValue, values }) => (
          <Form>
            <AntForm.Item label="Ism">
              <Field as={Input} name="first_name" placeholder="Ism" />
              <div style={{ color: "red" }}>
                <ErrorMessage name="first_name" component="div" />
              </div>
            </AntForm.Item>

            <AntForm.Item label="Familiya">
              <Field as={Input} name="last_name" placeholder="Familiya" />
              <div style={{ color: "red" }}>
                <ErrorMessage name="last_name" component="div" />
              </div>
            </AntForm.Item>

            <AntForm.Item label="Email">
              <Field as={Input} name="email" placeholder="Email" />
              <div style={{ color: "red" }}>
                <ErrorMessage name="email" component="div" />
              </div>
            </AntForm.Item>

            <AntForm.Item label="Telefon">
              <Field as={Input} name="phone" placeholder="Telefon raqami" />
              <div style={{ color: "red" }}>
                <ErrorMessage name="phone" component="div" />
              </div>
            </AntForm.Item>

            <AntForm.Item label="Parol">
              <Field
                as={Input.Password}
                name="password_hash"
                placeholder="Parol"
                
              />
              <div style={{ color: "red" }}>
                <ErrorMessage name="password_hash" component="div" />
              </div>
            </AntForm.Item>

            <AntForm.Item label="Jinsi">
              <Field
                as={Input}
                name="gender"
                placeholder="Jins (masalan: erkak/ayol)"
              />
              <div style={{ color: "red" }}>
                <ErrorMessage name="gender" component="div" />
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
                <ErrorMessage name="date_of_birth" component="div" />
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
                <ErrorMessage name="lidId" component="div" />
              </div>
            </AntForm.Item>

            <AntForm.Item label="Voqea ID">
              <Field name="eventsId">
                {({ field }: any) => (
                  <InputNumber
                    {...field}
                    value={values.eventsId}
                    onChange={(val) => setFieldValue("eventsId", val)}
                    style={{ width: "100%" }}
                    min={0}
                  />
                )}
              </Field>
              <div style={{ color: "red" }}>
                <ErrorMessage name="eventsId" component="div" />
              </div>
            </AntForm.Item>

            <AntForm.Item label="Guruh ID">
              <Field name="groupsId">
                {({ field }: any) => (
                  <InputNumber
                    {...field}
                    value={values.groupsId}
                    onChange={(val) => setFieldValue("groupsId", val)}
                    style={{ width: "100%" }}
                    min={0}
                  />
                )}
              </Field>
              <div style={{ color: "red" }}>
                <ErrorMessage name="groupsId" component="div" />
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

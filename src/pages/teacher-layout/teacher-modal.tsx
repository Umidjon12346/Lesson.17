import React from "react";
import { Modal, Input, Form as AntForm, Button, Select } from "antd";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import type { Teacher } from "../../types/teacher";

interface Branch {
  id: number | undefined;
  name: string;
}

interface TeacherModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (values: Teacher) => Promise<void>;
  editData?: Teacher;
  branches: Branch[];
}

const roles = ["main teacher", "admin", "assistant"];

const validationSchema = (isEdit: boolean) =>
  Yup.object({
    first_name: Yup.string().required("Ism majburiy"),
    last_name: Yup.string().required("Familiya majburiy"),
    email: Yup.string().email("Email noto‘g‘ri").required("Email majburiy"),
    phone: Yup.string().required("Telefon majburiy"),
    role: Yup.string().required("Rol majburiy"),
    branchId: Yup.array().min(1, "Kamida bitta filial tanlang").required(),
    ...(isEdit
      ? {}
      : {
          password: Yup.string()
            .min(6, "Parol kamida 6 belgidan iborat bo‘lishi kerak")
            .required("Parol majburiy"),
        }),
  });

const TeacherModal: React.FC<TeacherModalProps> = ({
  visible,
  onClose,
  onSubmit,
  editData,
  branches,
}) => {
  const isEdit = !!editData;

  const initialValues: Teacher = {
    first_name: editData?.first_name || "",
    last_name: editData?.last_name || "",
    email: editData?.email || "",
    password: "",
    phone: editData?.phone || "",
    role: editData?.role || "",
    branchId: editData?.branchId || [],
  };

  return (
    <Modal
      title={isEdit ? "O‘qituvchini tahrirlash" : "O‘qituvchi qo‘shish"}
      open={visible}
      onCancel={onClose}
      footer={null}
    >
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema(isEdit)}
        onSubmit={onSubmit}
      >
        {({ setFieldValue }) => (
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
              <Field as={Input} name="phone" placeholder="Telefon" />
              <div style={{ color: "red" }}>
                <ErrorMessage name="phone" />
              </div>
            </AntForm.Item>

            {!isEdit && (
              <>
                <AntForm.Item label="Parol">
                  <Field
                    as={Input.Password}
                    name="password"
                    placeholder="Parol"
                  />
                  <div style={{ color: "red" }}>
                    <ErrorMessage name="password" />
                  </div>
                </AntForm.Item>
              </>
            )}

            <AntForm.Item label="Rol">
              <Field name="role">
                {({ field }: any) => (
                  <Select
                    {...field}
                    value={field.value}
                    onChange={(value) => setFieldValue("role", value)}
                    style={{ width: "100%" }}
                    placeholder="Rolni tanlang"
                  >
                    {roles.map((r) => (
                      <Select.Option key={r} value={r}>
                        {r}
                      </Select.Option>
                    ))}
                  </Select>
                )}
              </Field>
              <div style={{ color: "red" }}>
                <ErrorMessage name="role" />
              </div>
            </AntForm.Item>

            <AntForm.Item label="Filial ID(lar)">
              <Field name="branchId">
                {({ field }: any) => (
                  <Select
                    {...field}
                    mode="multiple"
                    value={field.value}
                    onChange={(val) => setFieldValue("branchId", val)}
                    style={{ width: "100%" }}
                    placeholder="Filial(lar)ni tanlang"
                  >
                    {branches.map((branches) => (
                      <Select.Option key={branches.id} value={branches.id}>
                        {branches.name}
                      </Select.Option>
                    ))}
                  </Select>
                )}
              </Field>
              <div style={{ color: "red" }}>
                <ErrorMessage name="branchId" />
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

export default TeacherModal;

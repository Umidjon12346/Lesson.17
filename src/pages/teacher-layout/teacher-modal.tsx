import React from "react";
import { Modal, Input, Form as AntForm, Button, Select, message } from "antd";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import type { Teacher } from "../../types/teacher";
import { useTeachers } from "../../hooks/useTeacher";


interface Branch {
  id: number | undefined;
  name: string;
}

interface TeacherModalProps {
  visible: boolean;
  onClose: () => void;
  editData?: Teacher;
  branches: Branch[];
}

const roles = ["main teacher", "assistant"];

const validationSchema = (isEdit: boolean) =>
  Yup.object({
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string().required("Phone is required"),
    role: Yup.string().required("Role is required"),
    branchId: Yup.array()
      .min(1, "At least one branch must be selected")
      .required(),
    ...(isEdit
      ? {}
      : {
          password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required"),
        }),
  });

const TeacherModal: React.FC<TeacherModalProps> = ({
  visible,
  onClose,
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

  const {useTeacherCreate,useTeacherUpdate}=useTeachers({})
  const {mutate:createfn} = useTeacherCreate()
  const {mutate:updatefn} = useTeacherUpdate()

  const handleSubmit = async (values: Teacher) => {
    if (editData?.id) {
      updatefn(
        { id: editData.id, data: values },
        {
          onSuccess: () => {
            message.success("Teacher updated successfully");
            onClose();
          },
          onError: () => {
            message.error("Error while updating teacher");
          },
        }
      );
    } else {
      createfn(values, {
        onSuccess: () => {
          message.success("New teacher added");
          onClose();
        },
        onError: () => {
          message.error("Error while creating teacher");
        },
      });
    }
  };


  return (
    <Modal
      title={isEdit ? "Edit Teacher" : "Add Teacher"}
      open={visible}
      onCancel={onClose}
      footer={null}
    >
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema(isEdit)}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
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
              <Field as={Input} name="phone" placeholder="Phone number" />
              <div style={{ color: "red" }}>
                <ErrorMessage name="phone" />
              </div>
            </AntForm.Item>

            {!isEdit && (
              <AntForm.Item label="Password" labelCol={{ span: 24 }}>
                <Field
                  as={Input.Password}
                  name="password"
                  placeholder="Password"
                />
                <div style={{ color: "red" }}>
                  <ErrorMessage name="password" />
                </div>
              </AntForm.Item>
            )}

            <AntForm.Item label="Role" labelCol={{ span: 24 }}>
              <Field name="role">
                {({ field }: any) => (
                  <Select
                    {...field}
                    value={field.value}
                    onChange={(value) => setFieldValue("role", value)}
                    style={{ width: "100%" }}
                    placeholder="Select role"
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

            <AntForm.Item label="Branch(es)" labelCol={{ span: 24 }}>
              <Field name="branchId">
                {({ field }: any) => (
                  <Select
                    {...field}
                    mode="multiple"
                    value={field.value}
                    onChange={(val) => setFieldValue("branchId", val)}
                    style={{ width: "100%" }}
                    placeholder="Select branch(es)"
                  >
                    {branches.map((branch) => (
                      <Select.Option key={branch.id} value={branch.id}>
                        {branch.name}
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
              Save
            </Button>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default TeacherModal;

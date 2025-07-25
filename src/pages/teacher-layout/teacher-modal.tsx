import React from "react";
import { Modal, Input, Form as AntForm, Button, Select, message } from "antd";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import type { Teacher } from "../../types/teacher";
import { useTeachers } from "../../hooks/useTeacher";
import { MaskedInput } from "antd-mask-input";
import { useBranches } from "../../hooks";



interface TeacherModalProps {
  visible: boolean;
  onClose: () => void;
  editData?: any;

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
}) => {
  const isEdit = !!editData;

 
  

  const initialValues: any = {
    first_name: editData?.first_name || "",
    last_name: editData?.last_name || "",
    email: editData?.email || "",
    password: "",
    phone: editData?.phone || "",
    role: editData?.role || "",
    branchId: editData?.branches.id || [],
  };
  console.log(initialValues);
  

  const { useTeacherCreate, useTeacherUpdate } = useTeachers({});
  const { mutate: createfn } = useTeacherCreate();
  const { mutate: updatefn } = useTeacherUpdate();
  const {data} = useBranches({})
  const branches = data?.data.branch
  console.log(data);
  

  const handleSubmit = async (values: Teacher) => {
    const { password, ...rest } = values;

    const payload: any = {
      ...rest,
      ...(isEdit ? {} : { password }),
    };
    if (isEdit && editData?.id != null) {
      updatefn(
        { id: editData.id, data: payload },
        {
          onSuccess: () => {
            message.success("Teacher updated successfully.");
            onClose();
          },
          onError: () => {
            message.error("Failed to update teacher.");
          },
        }
      );
    } else {
      createfn(payload, {
        onSuccess: () => {
          message.success("Teacher created successfully.");
          onClose();
        },
        onError: () => {
          message.error("Failed to create teacher.");
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
                    {branches.map((branch:any) => (
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

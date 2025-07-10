import React from "react";
import { Modal, Input, Form as AntForm, Button } from "antd";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import type { Branch } from "../../types/branch";

interface BranchModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (values: Branch) => void;
  editData?: Branch;
}

// Validation schema
const validationSchema = Yup.object({
  name: Yup.string().required("Branch name is required"),
  address: Yup.string().required("Address is required"),
  call_number: Yup.string().required("Phone number is required"),
});

const BranchModal: React.FC<BranchModalProps> = ({
  visible,
  onClose,
  onSubmit,
  editData,
}) => {
  // Initial values: use editData if exists
  const initialValues: Branch = editData || {
    id:0,
    name: "",
    address: "",
    call_number: "",
  };

  return (
    <Modal
      title={editData ? "Edit Branch" : "Add Branch"}
      open={visible}
      onCancel={onClose}
      footer={null}
      destroyOnHidden
    >
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {() => (
          <Form>
            {/* Branch Name */}
            <AntForm.Item label="Branch Name" labelCol={{ span: 24 }}>
              <Field as={Input} name="name" placeholder="Enter branch name" />
              <ErrorMessage name="name">
                {(msg) => <div style={{ color: "red" }}>{msg}</div>}
              </ErrorMessage>
            </AntForm.Item>

            {/* Address */}
            <AntForm.Item label="Address" labelCol={{ span: 24 }}>
              <Field as={Input} name="address" placeholder="Enter address" />
              <ErrorMessage name="address">
                {(msg) => <div style={{ color: "red" }}>{msg}</div>}
              </ErrorMessage>
            </AntForm.Item>

            {/* Phone Number */}
            <AntForm.Item label="Phone Number" labelCol={{ span: 24 }}>
              <Field
                as={Input}
                name="call_number"
                placeholder="Enter phone number"
              />
              <ErrorMessage name="call_number">
                {(msg) => <div style={{ color: "red" }}>{msg}</div>}
              </ErrorMessage>
            </AntForm.Item>

            {/* Submit Button */}
            <Button type="primary" htmlType="submit" block>
              Save
            </Button>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default BranchModal;

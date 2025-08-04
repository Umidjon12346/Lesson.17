import { Modal, Input, Button, message } from "antd";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface ResetPasswordModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: {
    new_password: string;
    confirm_password: string;
  }) => void;
}

const passwordSchema = Yup.object({
  new_password: Yup.string()
    .min(6, "At least 6 characters")
    .required("New password is required"),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("new_password")], "Passwords do not match")
    .required("Confirm password is required"),
});

const ResetPasswordModal = ({
  open,
  onClose,
  onSubmit,
}: ResetPasswordModalProps) => {
  return (
    <Modal title="Reset Password" open={open} footer={null} onCancel={onClose}>
      <Formik
        initialValues={{ new_password: "", confirm_password: "" }}
        validationSchema={passwordSchema}
        onSubmit={(values) => {
          onSubmit(values);
          message.success("Password changed successfully");
          onClose();
        }}
      >
        {({ handleChange, values }) => (
          <Form>
            <div style={{ marginBottom: 16 }}>
              <label>New Password:</label>
              <Field
                as={Input.Password}
                name="new_password"
                placeholder="Enter new password"
                onChange={handleChange}
                value={values.new_password}
              />
              <ErrorMessage name="new_password">
                {(msg: string) => <div style={{ color: "red" }}>{msg}</div>}
              </ErrorMessage>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label>Confirm Password:</label>
              <Field
                as={Input.Password}
                name="confirm_password"
                placeholder="Confirm new password"
                onChange={handleChange}
                value={values.confirm_password}
              />
              <ErrorMessage name="confirm_password">
                {(msg: string) => <div style={{ color: "red" }}>{msg}</div>}
              </ErrorMessage>
            </div>

            <Button type="primary" htmlType="submit" block>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default ResetPasswordModal;

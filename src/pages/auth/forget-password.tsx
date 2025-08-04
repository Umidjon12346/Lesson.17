import { useState } from "react";
import { Card, Input, Button, Select } from "antd";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useForgotPassword, useVerifyOtp } from "../../hooks";
import ResetPasswordModal from "./forgot-pass-modal";

const { Option } = Select;

const initialValues = {
  email: "",
  role: "",
  otp: "",
};

const validationStepOne = Yup.object({
  email: Yup.string().email("Invalid email").required("Required"),
  role: Yup.string().required("Required"),
});

const validationStepTwo = Yup.object({
  otp: Yup.number().required("OTP required"),
});


const ForgetPassword = () => {
  const [step, setStep] = useState<1 | 2>(1);
  const { mutate: forgetPassword } = useForgotPassword();
  const { mutate: verifyOtp } = useVerifyOtp();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEmailSubmit = (values: any) => {
    const { email, role } = values;
    forgetPassword(
      { email, role },
      {
        onSuccess: () => {
          setStep(2);
        },
        onError: (err) => {
          console.error("OTP yuborishda xatolik:", err);
        },
      }
    );
  };



  const handleOtpSubmit = (values:any) => {
    const {otp} = values
    console.log(otp);
    
    verifyOtp(
      { otp: Number(otp) }, // String -> Number
      {
        onSuccess: () => {
          setIsModalOpen(true);
        },
        onError: (err) => {
          console.error("OTP tekshirishda xatolik:", err);
        },
      }
    );
  };


  const handlePasswordSubmit = (values: {
    new_password: string;
    confirm_password: string;
  }) => {
    console.log("Yangi parollar:", values);
    // bu yerga reset password API chaqiruvi yoziladi
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card title="Forgot Password" style={{ width: 400 }}>
        <Formik
          initialValues={initialValues}
          validationSchema={step === 1 ? validationStepOne : validationStepTwo}
          onSubmit={step === 1 ? handleEmailSubmit : handleOtpSubmit}
        >
          {({ handleChange, values, setFieldValue }) => (
            <Form>
              {step === 1 && (
                <>
                  <div style={{ marginBottom: "16px" }}>
                    <label>Email:</label>
                    <Field
                      as={Input}
                      name="email"
                      placeholder="example@mail.com"
                      onChange={handleChange}
                      value={values.email}
                    />
                    <ErrorMessage
                      name="email"
                      render={(msg: string) => (
                        <div style={{ color: "red" }}>{msg}</div>
                      )}
                    />
                  </div>

                  <div style={{ marginBottom: "16px" }}>
                    <label>Role:</label>
                    <Select
                      placeholder="Select a role"
                      onChange={(value) => setFieldValue("role", value)}
                      value={values.role}
                      style={{ width: "100%" }}
                    >
                      <Option value="teacher">Teacher</Option>
                      <Option value="student">Student</Option>
                      <Option value="admin">Admin</Option>
                      <Option value="lid">Lid</Option>
                    </Select>
                    <ErrorMessage
                      name="role"
                      render={(msg: string) => (
                        <div style={{ color: "red" }}>{msg}</div>
                      )}
                    />
                  </div>
                </>
              )}

              {step === 2 && (
                <div style={{ marginBottom: "16px" }}>
                  <label>Enter OTP:</label>
                  <Field
                    as={Input}
                    name="otp"
                    placeholder="123456"
                    onChange={handleChange}
                    value={values.otp}
                  />
                  <ErrorMessage
                    name="otp"
                    render={(msg: string) => (
                      <div style={{ color: "red" }}>{msg}</div>
                    )}
                  />
                </div>
              )}

              <Button type="primary" htmlType="submit" block>
                {step === 1 ? "Send OTP" : "Verify OTP"}
              </Button>
            </Form>
          )}
        </Formik>
      </Card>
      <ResetPasswordModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handlePasswordSubmit}
      />
    </div>
  );
};

export default ForgetPassword;

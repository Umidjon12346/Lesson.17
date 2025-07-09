import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
// import { authService } from "../../service/auth.service";
import { Card, Input, Button, Select } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { setItem } from "../../helpers";
import { useAuth } from "../../hooks";

const { Option } = Select;

interface SignInFormValues {
  email: string;
  password: string;
  role: string;
}

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Email noto‘g‘ri kiritilgan")
    .required("Email majburiy"),
  password: Yup.string()
    .min(6, "Parol kamida 6 ta belgidan iborat bo‘lishi kerak")
    .required("Parol majburiy"),
  role: Yup.string().required("Rol tanlanishi shart"),
});

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const { mutate,isPending } = useAuth();
  const initialValues: SignInFormValues = {
    email: "",
    password: "",
    role: "",
  };

  const handleSubmit = async (values: SignInFormValues) => {
    const { email, password, role } = values;
    const payload = { email, password };
    mutate(
      { data: payload, role },
      {
        onSuccess: (res: any) => {
          if (res?.status === 201) {
            setItem("access_token", res.data.access_token);
            setItem("role", role);
            navigate(`/${role}`);
          }
        },
      }
    );
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
      <Card title="Kirish" style={{ width: 400 }}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, setFieldValue, values }) => (
            <Form>
              <div style={{ marginBottom: "16px" }}>
                <label>Email:</label>
                <Field
                  as={Input}
                  name="email"
                  type="email"
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
                <label>Parol:</label>
                <Field
                  as={Input.Password}
                  name="password"
                  placeholder="Parol"
                  onChange={handleChange}
                  value={values.password}
                />
                <ErrorMessage
                  name="password"
                  render={(msg: string) => (
                    <div style={{ color: "red" }}>{msg}</div>
                  )}
                />
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label>Rol:</label>
                <Select
                  placeholder="Rolni tanlang"
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

              <Button type="primary" htmlType="submit" loading={isPending} block>
                Kirish
              </Button>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
};

export default SignIn;

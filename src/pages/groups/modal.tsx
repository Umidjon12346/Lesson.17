import React from "react";
import {
  Modal,
  Input,
  DatePicker,
  Select,
  Form as AntForm,
  Button,
} from "antd";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";


const { Option } = Select;

export interface Group {
  name: string;
  course_id: number;
  status: string;
  start_date: string;
  end_date: string;
}

interface GroupModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (values: Group) => void;
  courses: { id: number; name: string }[]; // course_id uchun select
}

const validationSchema = Yup.object({
  name: Yup.string().required("Nomi majburiy"),
  course_id: Yup.number().required("Kurs tanlanishi kerak"),
  status: Yup.string().required("Holat majburiy"),
  start_date: Yup.string().required("Boshlanish sanasi kerak"),
  end_date: Yup.string().required("Tugash sanasi kerak"),
});

const GroupModal: React.FC<GroupModalProps> = ({
  visible,
  onClose,
  onSubmit,
  courses,
}) => {
  const initialValues: Group = {
    name: "",
    course_id: 0,
    status: "",
    start_date: "",
    end_date: "",
  };

  return (
    <Modal
      title="Guruh yaratish"
      open={visible}
      onCancel={onClose}
      footer={null}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          onSubmit(values);
          onClose();
        }}
      >
        {({ setFieldValue, values }) => (
          <Form>
            <AntForm.Item label="Guruh nomi">
              <Field as={Input} name="name" placeholder="Guruh nomi" />
              <ErrorMessage
                name="name"
                component="div"
               
              />
            </AntForm.Item>

            <AntForm.Item label="Kurs tanlang">
              <Select
                onChange={(value) => setFieldValue("course_id", value)}
                value={values.course_id || undefined}
                placeholder="Kursni tanlang"
              >
                {courses.map((course) => (
                  <Option key={course.id} value={course.id}>
                    {course.name}
                  </Option>
                ))}
              </Select>
              <ErrorMessage
                name="course_id"
                component="div"
               
              />
            </AntForm.Item>

            <AntForm.Item label="Holat">
              <Select
                onChange={(value) => setFieldValue("status", value)}
                value={values.status || undefined}
                placeholder="Holatni tanlang"
              >
                <Option value="active">Active</Option>
                <Option value="inactive">Inactive</Option>
              </Select>
              <ErrorMessage
                name="status"
                component="div"
               
              />
            </AntForm.Item>

            <AntForm.Item label="Boshlanish sanasi">
              <DatePicker
                style={{ width: "100%" }}
                onChange={(date, dateString) =>
                  setFieldValue("start_date", dateString)
                }
              />
              <ErrorMessage
                name="start_date"
                component="div"
               
              />
            </AntForm.Item>

            <AntForm.Item label="Tugash sanasi">
              <DatePicker
                style={{ width: "100%" }}
                onChange={(date, dateString) =>
                  setFieldValue("end_date", dateString)
                }
              />
              <ErrorMessage
                name="end_date"
                component="div"
               
              />
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

export default GroupModal;

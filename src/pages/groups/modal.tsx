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
import dayjs from "dayjs";

const { Option } = Select;

export interface Group {
  name: string;
  course_id: number;
  status: string;
  start_date: string;
  end_date: string;
}

interface Course {
  id: number;
  title: string;
}

interface GroupModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (values: Group) => void;
  editData?: Group;
  courses: Course[];
}

const validationSchema = Yup.object({
  name: Yup.string().required("Nomi majburiy"),
  course_id: Yup.number().required("Kurs tanlang"),
  status: Yup.string().required("Holat tanlang"),
  start_date: Yup.string().required("Boshlanish sanasi"),
  end_date: Yup.string().required("Tugash sanasi"),
});

const GroupModal: React.FC<GroupModalProps> = ({
  visible,
  onClose,
  onSubmit,
  editData,
  courses,
}) => {
  const initialValues: Group = editData || {
    name: "",
    course_id: 0,
    status: "",
    start_date: "",
    end_date: "",
  };

  return (
    <Modal
      title={editData ? "Guruhni tahrirlash" : "Guruh qo‘shish"}
      open={visible}
      onCancel={onClose}
      footer={null}
    >
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ setFieldValue, values }) => (
          <Form>
            <AntForm.Item label="Guruh nomi">
              <Field as={Input} name="name" placeholder="Guruh nomi" />
              <ErrorMessage name="name" component="div" />
            </AntForm.Item>

            <AntForm.Item label="Kurs">
              <Select
                value={values.course_id || undefined}
                onChange={(value) => setFieldValue("course_id", value)}
                placeholder="Kursni tanlang"
                style={{ width: "100%" }}
              >
                {courses.map((course) => (
                  <Option key={course.id} value={course.id}>
                    {course.title}
                  </Option>
                ))}
              </Select>
              <ErrorMessage name="course_id" component="div" />
            </AntForm.Item>

            <AntForm.Item label="Holat">
              <Select
                value={values.status || undefined}
                onChange={(value) => setFieldValue("status", value)}
                placeholder="Holatni tanlang"
              >
                <Option value="active">Active</Option>
                <Option value="new">New</Option>
              </Select>
              <ErrorMessage name="status" component="div" />
            </AntForm.Item>

            <AntForm.Item label="Boshlanish sanasi">
              <DatePicker
                style={{ width: "100%" }}
                value={values.start_date ? dayjs(values.start_date) : undefined}
                onChange={(_, dateString) =>
                  setFieldValue("start_date", dateString)
                }
              />
              <ErrorMessage name="start_date" component="div" />
            </AntForm.Item>

            <AntForm.Item label="Tugash sanasi">
              <DatePicker
                style={{ width: "100%" }}
                value={values.end_date ? dayjs(values.end_date) : undefined}
                onChange={(_, dateString) =>
                  setFieldValue("end_date", dateString)
                }
              />
              <ErrorMessage name="end_date" component="div" />
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

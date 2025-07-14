import React, { useEffect } from "react";
import {
  Modal,
  Input,
  DatePicker,
  Select,
  Form as AntForm,
  Button,
} from "antd";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import dayjs from "dayjs";
import type { Group } from "../../types/group";

const { Option } = Select;

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
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Group>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      id: 0,
      name: "",
      course_id: 0,
      status: "",
      start_date: "",
      end_date: "",
    },
  });

  useEffect(() => {
    if (editData) {
      reset(editData);
    } else {
      reset({
        id: 0,
        name: "",
        course_id: 0,
        status: "",
        start_date: "",
        end_date: "",
      });
    }
  }, [editData, reset]);

  return (
    <Modal
      title={editData ? "Guruhni tahrirlash" : "Guruh qo‘shish"}
      open={visible}
      onCancel={onClose}
      footer={null}
    >
      <AntForm layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <AntForm.Item
          label="Guruh nomi"
          validateStatus={errors.name ? "error" : ""}
          help={errors.name?.message}
        >
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Guruh nomi" />
            )}
          />
        </AntForm.Item>

        <AntForm.Item
          label="Kurs"
          validateStatus={errors.course_id ? "error" : ""}
          help={errors.course_id?.message}
        >
          <Controller
            name="course_id"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                placeholder="Kursni tanlang"
                value={field.value || undefined}
                onChange={(value) => field.onChange(value)}
              >
                {courses.map((course) => (
                  <Option key={course.id} value={course.id}>
                    {course.title}
                  </Option>
                ))}
              </Select>
            )}
          />
        </AntForm.Item>

        <AntForm.Item
          label="Holat"
          validateStatus={errors.status ? "error" : ""}
          help={errors.status?.message}
        >
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                placeholder="Holatni tanlang"
                value={field.value || undefined}
                onChange={(value) => field.onChange(value)}
              >
                <Option value="active">Active</Option>
                <Option value="new">New</Option>
              </Select>
            )}
          />
        </AntForm.Item>

        <AntForm.Item
          label="Boshlanish sanasi"
          validateStatus={errors.start_date ? "error" : ""}
          help={errors.start_date?.message}
        >
          <Controller
            name="start_date"
            control={control}
            render={({ field }) => (
              <DatePicker
                style={{ width: "100%" }}
                value={field.value ? dayjs(field.value) : undefined}
                onChange={(_, dateString) => field.onChange(dateString)}
              />
            )}
          />
        </AntForm.Item>

        <AntForm.Item
          label="Tugash sanasi"
          validateStatus={errors.end_date ? "error" : ""}
          help={errors.end_date?.message}
        >
          <Controller
            name="end_date"
            control={control}
            render={({ field }) => (
              <DatePicker
                style={{ width: "100%" }}
                value={field.value ? dayjs(field.value) : undefined}
                onChange={(_, dateString) => field.onChange(dateString)}
              />
            )}
          />
        </AntForm.Item>

        <Button type="primary" htmlType="submit" block>
          Saqlash
        </Button>
      </AntForm>
    </Modal>
  );
};

export default GroupModal;

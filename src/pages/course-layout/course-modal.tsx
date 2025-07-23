import React from "react";
import { Modal, Input, Form as AntForm, Button, Select, message } from "antd";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import type { Course } from "../../types/course";
import { useCourse } from "../../hooks";
import { courseSchema } from "../../utility";

const { Option } = Select;

interface CourseModalProps {
  visible: boolean;
  onClose: () => void;
  editData?: Course;
}



const CourseModal: React.FC<CourseModalProps> = ({
  visible,
  onClose,
  editData,
}) => {
  const { updateCourseMutation, createCourseMutation } = useCourse({});
  const { mutate: updatefn } = updateCourseMutation();
  const { mutate: createfn } = createCourseMutation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Course>({
    defaultValues: {
      title: "",
      description: "",
      price: undefined,
      duration: "",
      lessons_in_a_week: undefined,
      lesson_duration: "",
      ...editData,
    },
    resolver: yupResolver(courseSchema),
  });

  const onSubmit = async (values: Course) => {
    const payload = {
      title: values.title,
      description: values.description,
      price: values.price,
      duration: values.duration,
      lessons_in_a_week: values.lessons_in_a_week,
      lesson_duration: values.lesson_duration,
    };

    try {
      if (editData) {
        updatefn({ data: payload, id: editData.id! });
        message.success("Course updated successfully");
      } else {
        createfn(payload);
        message.success("Course created successfully");
      }
      onClose();
    } catch (error) {
      console.error(error);
      message.error("Error creating or updating course");
    }
  };

  return (
    <Modal
      title={editData ? "Edit Course" : "Add Course"}
      open={visible}
      onCancel={() => {
        reset();
        onClose();
      }}
      footer={null}
    >
      <AntForm layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <AntForm.Item
          label="Course Title"
          validateStatus={errors.title ? "error" : ""}
          help={errors.title?.message}
        >
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Enter course title" />
            )}
          />
        </AntForm.Item>

        <AntForm.Item
          label="Price"
          validateStatus={errors.price ? "error" : ""}
          help={errors.price?.message}
        >
          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <Input
                type="number"
                {...field}
                placeholder="Enter course price"
              />
            )}
          />
        </AntForm.Item>

        <AntForm.Item
          label="Duration"
          validateStatus={errors.duration ? "error" : ""}
          help={errors.duration?.message}
        >
          <Controller
            name="duration"
            control={control}
            render={({ field }) => (
              <Select {...field} placeholder="Select duration" allowClear>
                <Option value="3 months">3 months</Option>
                <Option value="6 months">6 months</Option>
                <Option value="12 months">12 months</Option>
              </Select>
            )}
          />
        </AntForm.Item>

        <AntForm.Item
          label="Lessons per Week"
          validateStatus={errors.lessons_in_a_week ? "error" : ""}
          help={errors.lessons_in_a_week?.message}
        >
          <Controller
            name="lessons_in_a_week"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                placeholder="Select number of lessons"
                allowClear
              >
                <Option value={3}>3</Option>
                <Option value={5}>5</Option>
              </Select>
            )}
          />
        </AntForm.Item>

        <AntForm.Item
          label="Lesson Duration"
          validateStatus={errors.lesson_duration ? "error" : ""}
          help={errors.lesson_duration?.message}
        >
          <Controller
            name="lesson_duration"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                placeholder="Select lesson duration"
                allowClear
              >
                <Option value="2 hours">2 hours</Option>
                <Option value="4 hours">4 hours</Option>
              </Select>
            )}
          />
        </AntForm.Item>

        <AntForm.Item
          label="Description"
          validateStatus={errors.description ? "error" : ""}
          help={errors.description?.message}
        >
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Input.TextArea
                {...field}
                rows={4}
                placeholder="Enter course description"
              />
            )}
          />
        </AntForm.Item>

        <Button type="primary" htmlType="submit" block>
          Save
        </Button>
      </AntForm>
    </Modal>
  );
};

export default CourseModal;

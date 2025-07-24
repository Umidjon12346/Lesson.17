import React, { useEffect } from "react";
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
    setValue,
    formState: { errors },
  } = useForm<Course>({
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      duration: 0,
      lessons_in_a_week: 0,
      lessons_in_a_month: 0,
      lesson_duration: 0,
      ...editData,
    },
    resolver: yupResolver(courseSchema),
  });

  useEffect(() => {
    if (editData) {
      Object.entries(editData).forEach(([key, value]) => {
        setValue(key as keyof Course, value);
      });
    } else {
      reset();
    }
  }, [editData, setValue, reset]);

  const onSubmit = async (values: Course) => {
    const payload: Course = {
      title: values.title,
      description: values.description,
      price: Number(values.price),
      duration: Number(values.duration),
      lessons_in_a_week: Number(values.lessons_in_a_week),
      lessons_in_a_month: Number(values.lessons_in_a_month),
      lesson_duration: Number(values.lesson_duration),
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
      reset();
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
        {/* Course Title */}
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

        {/* Price */}
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
                {...field}
                type="number"
                placeholder="Enter course price"
              />
            )}
          />
        </AntForm.Item>

        {/* Duration */}
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
                <Option value={3}>3 months</Option>
                <Option value={6}>6 months</Option>
                <Option value={12}>12 months</Option>
              </Select>
            )}
          />
        </AntForm.Item>

        {/* Lessons in a Week */}
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
                placeholder="Select lessons per week"
                onChange={field.onChange}
              >
                <Option value={3}>3</Option>
                <Option value={5}>5</Option>
              </Select>
            )}
          />
        </AntForm.Item>

        {/* Lessons in a Month */}
        <AntForm.Item
          label="Lessons per Month"
          validateStatus={errors.lessons_in_a_month ? "error" : ""}
          help={errors.lessons_in_a_month?.message}
        >
          <Controller
            name="lessons_in_a_month"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                placeholder="Select lessons per month"
                onChange={field.onChange}
              >
                <Option value={12}>12</Option>
                <Option value={16}>16</Option>
                <Option value={20}>20</Option>
              </Select>
            )}
          />
        </AntForm.Item>

        {/* Lesson Duration */}
        <AntForm.Item
          label="Lesson Duration (minutes)"
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
                onChange={field.onChange}
              >
                <Option value={120}>2 hours</Option>
                <Option value={180}>3 hours</Option>
                <Option value={240}>4 hours</Option>
                <Option value={270}>4.5 hours</Option>
              </Select>
            )}
          />
        </AntForm.Item>

        {/* Description */}
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
                placeholder="Enter description"
              />
            )}
          />
        </AntForm.Item>

        <Button type="primary" htmlType="submit" block>
          {editData ? "Update Course" : "Create Course"}
        </Button>
      </AntForm>
    </Modal>
  );
};

export default CourseModal;

import React, { useEffect } from "react";
import {
  Modal,
  Input,
  DatePicker,
  Select,
  Form as AntForm,
  Button,
  message,
  TimePicker,
} from "antd";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import dayjs from "dayjs";

import type { Group } from "../../types/group";
import { useCourse, useGroup } from "../../hooks";
import { groupSchema } from "../../utility";

const { Option } = Select;

interface GroupModalProps {
  visible: boolean;
  onClose: () => void;
  editData?: Group;
}

const GroupModal: React.FC<GroupModalProps> = ({
  visible,
  onClose,
  editData,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Group>({
    resolver: yupResolver(groupSchema),
    defaultValues: {
      name: "",
      courseId: undefined,
      status: "active",
      start_date: "",
      start_time: "",
      roomId: 1,
    },
  });

  const { createGroupMutation, updateGroupMutation } = useGroup({});
  const { mutate: createFn } = createGroupMutation();
  const { mutate: updateFn } = updateGroupMutation();

  const { data: courseData } = useCourse({});
  const courses = courseData?.data?.courses || [];

  useEffect(() => {
    if (editData) {
      reset({
        id: editData.id,
        name: editData.name,
        courseId: editData.course?.id,
        status: editData.status,
        start_date: editData.start_date,
        start_time: editData.start_time,
        roomId: editData.roomId,
      });
    } else {
      reset({
        name: "",
        courseId: undefined,
        status: "active",
        start_date: "",
        start_time: "",
        roomId: 1,
      });
    }
  }, [editData, reset]);

const onSubmit = async (values: Group) => {
  const payload = {
    name: values.name,
    courseId: values.course?.id ?? values.courseId,
    status: values.status,
    start_date: values.start_date,
    start_time: values.start_time,
    roomId: values.roomId,
  };

  try {
    if (editData) {
      await updateFn({ data: payload, id: editData.id! }); // await
      message.success("Group updated successfully");
    } else {
      await createFn(payload); // await
      message.success("Group created successfully");
    }

    // ✅ faqat success bo‘lsa modal yopiladi
    onClose();
  } catch (error) {
    message.error("Error creating or updating group");
    console.error(error);
  }
};




  return (
    <Modal
      title={editData ? "Edit Group" : "Add Group"}
      open={visible}
      onCancel={onClose}
      footer={null}
    >
      <AntForm layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <AntForm.Item
          label="Group Name"
          validateStatus={errors.name ? "error" : ""}
          help={errors.name?.message}
        >
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Enter name" />
            )}
          />
        </AntForm.Item>

        <AntForm.Item
          label="Course"
          validateStatus={errors.courseId ? "error" : ""}
          help={errors.courseId?.message}
        >
          <Controller
            name="courseId"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                placeholder="Select course"
                onChange={(val) => field.onChange(val)}
              >
                {courses.map((course: any) => (
                  <Option key={course.id} value={course.id}>
                    {course.title}
                  </Option>
                ))}
              </Select>
            )}
          />
        </AntForm.Item>

        <AntForm.Item
          label="Status"
          validateStatus={errors.status ? "error" : ""}
          help={errors.status?.message}
        >
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Select {...field} onChange={(val) => field.onChange(val)}>
                <Option value="active">Active</Option>
                <Option value="new">New</Option>
              </Select>
            )}
          />
        </AntForm.Item>

        <AntForm.Item
          label="Start Date"
          validateStatus={errors.start_date ? "error" : ""}
          help={errors.start_date?.message}
        >
          <Controller
            name="start_date"
            control={control}
            render={({ field }) => (
              <DatePicker
                style={{ width: "100%" }}
                value={field.value ? dayjs(field.value) : null}
                onChange={(_, dateStr) => field.onChange(dateStr)}
              />
            )}
          />
        </AntForm.Item>

        <AntForm.Item
          label="Start Time"
          validateStatus={errors.start_time ? "error" : ""}
          help={errors.start_time?.message}
        >
          <Controller
            name="start_time"
            control={control}
            render={({ field }) => (
              <TimePicker
                style={{ width: "100%" }}
                format="HH:mm"
                value={field.value ? dayjs(field.value, "HH:mm") : null}
                onChange={(time) => {
                  if (time) {
                    field.onChange(time.format("HH:mm")); // <-- Faqat string yuborish
                  } else {
                    field.onChange("");
                  }
                }}
              />
            )}
          />
        </AntForm.Item>

        <AntForm.Item
          label="Room ID"
          validateStatus={errors.roomId ? "error" : ""}
          help={errors.roomId?.message}
        >
          <Controller
            name="roomId"
            control={control}
            render={({ field }) => (
              <Input
                type="number"
                {...field}
                placeholder="Enter room ID"
                min={1}
              />
            )}
          />
        </AntForm.Item>

        <Button type="primary" htmlType="submit" block>
          {editData ? "Update" : "Create"}
        </Button>
      </AntForm>
    </Modal>
  );
};

export default GroupModal;

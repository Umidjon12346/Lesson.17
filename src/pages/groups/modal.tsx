import React, { useEffect } from "react";
import {
  Modal,
  Input,
  DatePicker,
  Select,
  Form as AntForm,
  Button,
  message,
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
      id: 0,
      name: "",
      course_id: 0,
      status: "",
      start_date: "",
      end_date: "",
    },
  });

  console.log(editData);
  
  const { createGroupMutation, updateGroupMutation } = useGroup({});
  const { mutate: updatefn } = updateGroupMutation();
  const { mutate: createfn } = createGroupMutation();

  const { data } = useCourse({});
  const courses = data?.data?.courses;
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

  const onSubmit = async (values: Group) => {
    const payload = {
      name: values.name,
      course_id: values.id,
      status: values.status,
      start_date: values.start_date,
      end_date: values.end_date,
    };

    
    try {
      if (editData) {
        updatefn({ data: payload, id: editData.id! }); // await ishlaydi
        message.success("Group updated successfully");
      } else {
        createfn(payload);
        message.success("Group created successfully");
      }

      onClose();
    } catch (error: any) {
      console.error(error);
      message.error("Error creating or updating group");
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
              <Input {...field} placeholder="Enter group name" />
            )}
          />
        </AntForm.Item>

        <AntForm.Item
          label="Course"
          validateStatus={errors.course_id ? "error" : ""}
          help={errors.course_id?.message}
        >
          <Controller
            name="course_id"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                placeholder="Select a course"
                value={field.value || undefined}
                onChange={(value) => field.onChange(value)}
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
              <Select
                {...field}
                placeholder="Select status"
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
                value={field.value ? dayjs(field.value) : undefined}
                onChange={(_, dateString) => field.onChange(dateString)}
              />
            )}
          />
        </AntForm.Item>

        <AntForm.Item
          label="End Date"
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
          Save
        </Button>
      </AntForm>
    </Modal>
  );
};

export default GroupModal;

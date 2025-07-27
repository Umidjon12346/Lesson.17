import { Modal, Select, Form, DatePicker, message, Switch } from "antd";
import { useEffect } from "react";
import dayjs from "dayjs";
import { useGroup } from "../../hooks";

interface AddStudentToGroupModalProps {
  open: boolean;
  onCancel: () => void;
  allStudents: any[]; // Barcha studentlar
  groupStudents: any[]; // Guruhga biriktirilganlar
  groupId: number;
}

const AddStudentToGroupModal: React.FC<AddStudentToGroupModalProps> = ({
  open,
  onCancel,
  allStudents,
  groupStudents,
  groupId,
}) => {
  const [form] = Form.useForm();
  const { useAssignStudentToGroup } = useGroup({});
  const { mutate } = useAssignStudentToGroup();

  useEffect(() => {
    if (!open) form.resetFields();
  }, [open, form]);

  const availableStudents = allStudents
    .filter(
      (student) => !groupStudents.some((g: any) => g.student.id === student.id)
    )
    .map((student) => ({
      label: `${student.first_name} ${student.last_name}`,
      value: student.id,
    }));

  const handleSubmit = (data: any) => {
    try {
      mutate({
        groupId,
        studentId: data.studentId,
        status:data.status,
        start_date: data.start_date,
      });
      onCancel();
      message.success("Student(s) successfully assigned!");
    } catch (error) {
      message.error("Failed to assign student. Try again.");
      console.error("Assign student error:", error);
    }
  };

  return (
    <Modal
      title="Assign Students to Group"
      open={open}
      onCancel={onCancel}
      onOk={() => form.submit()}
      okText="Assign"
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ start_date: dayjs() }}
      >
        <Form.Item
          label="Select Student(s)"
          name="studentId"
          rules={[
            { required: true, message: "Please select at least one student" },
          ]}
        >
          <Select
            mode="multiple"
            placeholder="Select students"
            options={availableStudents}
            showSearch
            filterOption={(input, option) =>
              (option?.label as string)
                .toLowerCase()
                .includes(input.toLowerCase())
            }
          />
        </Form.Item>

        <Form.Item label="Start Date" name="start_date">
          <DatePicker style={{ width: "100%" }} format="YYYY-MM-DD" />
        </Form.Item>

        <Form.Item label="Active Status" name="status" valuePropName="checked">
          <Switch />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddStudentToGroupModal;

import { Modal, Select, Switch, Form, DatePicker, message } from "antd";
import { useEffect } from "react";
import dayjs from "dayjs";
import { useGroup } from "../../hooks";

interface AddTeacherToGroupModalProps {
  open: boolean;
  onCancel: () => void;
  allTeachers: any[]; // Barcha mavjud ustozlar
  groupTeachers: any[]; // Faqat shu guruhga biriktirilgan ustozlar
  groupId: number;
}

const AddTeacherToGroupModal: React.FC<AddTeacherToGroupModalProps> = ({
  open,
  onCancel,
  allTeachers,
  groupTeachers,
  groupId,
}) => {
  const [form] = Form.useForm();

  const { useAssignTeacherToGroup } = useGroup({});
  const { mutate } = useAssignTeacherToGroup();
  useEffect(() => {
    if (!open) {
      form.resetFields();
    }
  }, [open, form]);

  // Faqat hali guruhga biriktirilmagan ustozlar
  const availableTeachers = allTeachers
    .filter(
      (teacher) =>
        teacher.is_active && !groupTeachers.some((g) => g.id === teacher.id)
    )
    .map((teacher) => ({
      label: `${teacher.first_name} ${teacher.last_name} - ${teacher.role}`,
      value: teacher.id,
    }));

   const handleSubmit = (data: any) => {
     try {
       mutate({
         teacherId: data.teacherId,
         groupId,
         status: data.status,
         start_date: data.start_date,
       });
       onCancel();
       message.success("Teacher successfully assigned!");
     } catch (error) {
       message.error("Failed to assign teacher. Please try again.");
       console.error("Error assigning teacher:", error);
     }
   };


  return (
    <Modal
      title="Assign Teacher to Group"
      open={open}
      onCancel={onCancel}
      onOk={() => form.submit()}
      okText="Assign"
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          startDate: dayjs(),
          status: true,
        }}
      >
        <Form.Item
          label="Select Teacher(s)"
          name="teacherId"
          rules={[
            { required: true, message: "Please select at least one teacher" },
          ]}
        >
          <Select
            mode="multiple"
            showSearch
            placeholder="Select teacher(s)"
            options={availableTeachers}
            filterOption={(input, option) =>
              (option?.label as string)
                ?.toLowerCase()
                .includes(input.toLowerCase())
            }
          />
        </Form.Item>

        <Form.Item label="Start Date" name="startDate">
          <DatePicker style={{ width: "100%" }} format="YYYY-MM-DD" />
        </Form.Item>

        <Form.Item label="Active Status" name="status" valuePropName="checked">
          <Switch   />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddTeacherToGroupModal;

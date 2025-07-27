import { Button, Space, Table } from "antd";
import { useState } from "react";
import AddStudentToGroupModal from "./add-student";
import { useStudent } from "../../hooks/useStudent";

function GroupStudents({
  students,
  groupId,
}: {
  students: any[];
  groupId: number;
}) {
  const [open, setOpen] = useState(false);

  const { data } = useStudent({ page: 1, limit: 20 });
  const allStudents = data?.data.data || []
  console.log(data);
  
  

  const handleAddStudent = () => {
    setOpen(true); // Modalni ochadi
  };

  const columns = [
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
  ];

  const dataSource = students.map((item: any) => {
    const student = item.student;
    return {
      key: student.id,
      fullName: `${student.first_name} ${student.last_name}`,
      phone: student.phone,
      email: student.email,
    };
  });
  

  return (
    <div className="m-1">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold">Students</h2>
        <Space>
          <Button type="primary" onClick={handleAddStudent}>
            + Add Student
          </Button>
        </Space>
      </div>
      <Table
        className="mt-4"
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        bordered
      />

      <AddStudentToGroupModal
        open={open}
        onCancel={() => setOpen(false)}
        allStudents={allStudents}
        groupStudents={students}
        groupId={groupId}
      />
    </div>
  );
}

export default GroupStudents;

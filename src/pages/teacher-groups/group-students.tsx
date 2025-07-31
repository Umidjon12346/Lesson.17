import { useParams } from "react-router-dom";
import { useTeachers } from "../../hooks";
import { Button, Table, Switch } from "antd";
import { useEffect, useState } from "react";

const TeacherGroupStudents = () => {
  const [studentss, setStudentss] = useState<any[]>([]);
  const { id } = useParams();
  const { students } = useTeachers(undefined, Number(id));

  useEffect(() => {
    if (students?.data?.groupStudents) {
      const mapped = students.data.groupStudents.map((item: any) => ({
        studentId: item.student.id,
        status: true,
        full_name: `${item.student.first_name} ${item.student.last_name}`,
      }));
      setStudentss(mapped);
    }
  }, [students]);

  const handleChange = (id: number) => {
    setStudentss((prev) =>
      prev.map((item) =>
        item.studentId === id ? { ...item, status: !item.status } : item
      )
    );
  };

  const submit = () => {
    console.log(studentss, "Submitted students");
    // bu yerga API chaqiruv yoki post logikasi yoziladi
  };

  const columns = [
    {
      title: "Full name",
      dataIndex: "full_name",
      key: "full_name",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <Switch
          checked={record.status}
          onChange={() => handleChange(record.studentId)}
        />
      ),
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={studentss}
        rowKey={(row) => row.studentId}
        pagination={false}
      />
      <Button type="primary" onClick={submit} style={{ marginTop: 16 }}>
        Submit
      </Button>
    </div>
  );
};

export default TeacherGroupStudents;

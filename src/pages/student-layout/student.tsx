import { useEffect, useState } from "react";
import { Button, Table, message } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { useLocation } from "react-router-dom";
import { EditOutlined } from "@ant-design/icons";

import type { Student } from "../../types/student";
import StudentModal from "./student-modal";
import { PopConfirm } from "../../components";
import { useGeneral } from "../../hooks";
import { useStudent } from "../../hooks/useStudent";

function Student() {
  const location = useLocation();
  const { handleTableChange } = useGeneral();

  const [params, setParams] = useState({
    page: 1,
    limit: 5,
  });

  const { data, useStudentDelete } = useStudent({ params });
  const {mutate:studentDelete} = useStudentDelete()

  const students = data?.data.students ?? [];
  const total = data?.data.total ?? 0;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState<Student | null>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const page = searchParams.get("page");
    const limit = searchParams.get("limit");
    if (page && limit) {
      setParams({
        page: Number(page),
        limit: Number(limit),
      });
    }
  }, [location.search]);

  const onTableChange = (pagination: TablePaginationConfig) => {
    handleTableChange({ pagination, setParams });
  };

  const handleDelete = async (id: number) => {
    studentDelete(id)
    message.success("O'chirildi")
  };

 

  const columns: ColumnsType<Student> = [
    { title: "First Name", dataIndex: "first_name", key: "first_name" },
    { title: "Last Name", dataIndex: "last_name", key: "last_name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    { title: "Gender", dataIndex: "gender", key: "gender" },
    {
      title: "Date of Birth",
      dataIndex: "date_of_birth",
      key: "date_of_birth",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div style={{ display: "flex", gap: 8 }}>
          <Button
            onClick={() => {
              setEditData(record);
              setIsModalOpen(true);
            }}
          >
            <EditOutlined />
          </Button>
          <PopConfirm onDelete={() => handleDelete(record.id!)} />
        </div>
      ),
    },
  ];

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <h2>Students</h2>
        <Button
          type="primary"
          onClick={() => {
            setEditData(null);
            setIsModalOpen(true);
          }}
        >
          + Add Student
        </Button>
      </div>

      <Table<Student>
        bordered
        columns={columns}
        dataSource={students}
        rowKey={(record) => record.id ?? record.email}
        pagination={{
          current: params.page,
          pageSize: params.limit,
          total,
          showSizeChanger: true,
          pageSizeOptions: ["4", "5", "10", "20"],
        }}
        onChange={onTableChange}
      />

      <StudentModal
        visible={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditData(null);
        }}
        editData={editData ?? undefined}
      />
    </div>
  );
}

export default Student;

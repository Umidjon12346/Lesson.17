import { useEffect, useState } from "react";
import { Button, Table } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type { Teacher } from "../../types/teacher";
import TeacherModal from "./teacher-modal";
import { PopConfirm } from "../../components";
import { EditOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import { useGeneral, useTeachers } from "../../hooks";
import { useBranches } from "../../hooks/useBranches";

function TeacherPage() {
  const [loading, setLoading] = useState(false);
  const { handleTableChange } = useGeneral();
  const location = useLocation();
  const [params, setParams] = useState({
    page: 1,
    limit: 5,
  });

  const { data: teachersData, useTeacherDelete } = useTeachers(params);
  const { mutate: deleteTeacher } = useTeacherDelete();
  const { data: branchData } = useBranches({});
  const branches = branchData?.data.branch;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState<Teacher | null>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const page = searchParams.get("page");
    const limit = searchParams.get("limit");
    if (page && limit) {
      setParams(() => ({
        page: Number(page),
        limit: Number(limit),
      }));
    }
  }, [location.search]);

  const onTableChange = (pagination: TablePaginationConfig) => {
    handleTableChange({ pagination, setParams });
  };

  const handleDelete = async (id: number) => {
    deleteTeacher( id );
  };

  const columns: ColumnsType<Teacher> = [
    { title: "First Name", dataIndex: "first_name", key: "first_name" },
    { title: "Last Name", dataIndex: "last_name", key: "last_name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    { title: "Role", dataIndex: "role", key: "role" },
    {
      title: "Branches",
      dataIndex: "branchId",
      key: "branchId",
      render: (branchId?: number[]) => {
        if (!Array.isArray(branchId)) return "—";
        const branchNames = branchId
          .map((id) => branches?.find((b: { id: number }) => b.id === id)?.name)
          .filter(Boolean);
        return branchNames.length > 0 ? branchNames.join(", ") : "—";
      },
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
        <h2>Teachers</h2>
        <Button
          type="primary"
          onClick={() => {
            setEditData(null);
            setIsModalOpen(true);
          }}
        >
          + Add Teacher
        </Button>
      </div>

      <Table<Teacher>
        bordered
        dataSource={teachersData?.data.teachers || []}
        columns={columns}
        loading={loading}
        rowKey={(record) => record.id!}
        pagination={{
          current: params.page,
          pageSize: params.limit,
          total: teachersData?.data.total,
          showSizeChanger: true,
          pageSizeOptions: ["4", "5", "7", "10"],
        }}
        onChange={onTableChange}
      />

      <TeacherModal
        visible={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditData(null);
        }}
        branches={branches}
        editData={editData ?? undefined}
      />
    </div>
  );
}

export default TeacherPage;

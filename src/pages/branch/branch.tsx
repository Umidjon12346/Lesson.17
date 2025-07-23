import { Button, message, Table } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { useEffect, useState } from "react";
import BranchModal from "./branch-modal";
import { PopConfirm } from "../../components";
import { EditOutlined } from "@ant-design/icons";
import type { Branch } from "../../types/branch";
import { useBranches,  } from "../../hooks/useBranches";
import { useLocation } from "react-router-dom";
import { useGeneral } from "../../hooks";

interface BranchWithId extends Branch {
  id: number;
}

const Branch = () => {
  const location = useLocation();
  const { handleTableChange } = useGeneral();
  const [params, setParams] = useState({ page: 1, limit: 5 });

  const { data,useBranchDelete  } = useBranches(params);
  const { mutate: deleteBranch } = useBranchDelete();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState<BranchWithId | null>(null);

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

  const handleDelete = (id: number) => {
    deleteBranch(id, {
      onSuccess: () => message.success("Branch deleted"),
      onError: () => message.error("Error deleting branch"),
    });
  };

  const columns: ColumnsType<BranchWithId> = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Address", dataIndex: "address", key: "address" },
    { title: "Phone Number", dataIndex: "call_number", key: "call_number" },
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
          <PopConfirm onDelete={() => handleDelete(record.id)} />
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
        <h2>Branches</h2>
        <Button
          type="primary"
          onClick={() => {
            setEditData(null);
            setIsModalOpen(true);
          }}
        >
          + Add Branch
        </Button>
      </div>

      <Table<BranchWithId>
        bordered
        columns={columns}
        dataSource={data?.data.branch || []}
        rowKey={(record) => record.id}
        pagination={{
          current: params.page,
          pageSize: params.limit,
          total: data?.data.total,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "15"],
        }}
        onChange={onTableChange}
      />

      <BranchModal
        visible={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditData(null);
        }}
        
        editData={editData ?? undefined}
      />
    </div>
  );
};

export default Branch;

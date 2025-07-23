import { useEffect, useState } from "react";
import { Button, Table } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type { Group } from "../../types/group";
import GroupModal from "./modal";
import { PopConfirm } from "../../components";
import {  Link, useLocation } from "react-router-dom";
import { useGeneral, useGroup } from "../../hooks";
import {EditOutlined} from "@ant-design/icons";

interface GroupWithId extends Group {
  id: number;
  created_at?: string;
  updated_at?: string;
}


function Groups() {
  const [loading, setLoading] = useState(false);
  const { handleTableChange } = useGeneral();
  const location = useLocation();
  const [params, setParams] = useState({
    page: 1,
    limit: 5,
  });
  const { data, useDeleteGroup } = useGroup(params);
  const { mutate: deleteGroup } = useDeleteGroup();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState<GroupWithId | null>(null);

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
    deleteGroup({ id });
  };

 

  const columns: ColumnsType<Group> = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Status", dataIndex: "status", key: "status" },
    { title: "Course ID", dataIndex: "course_id", key: "course_id" },
    { title: "Start Date", dataIndex: "start_date", key: "start_date" },
    { title: "End Date", dataIndex: "end_date", key: "end_date" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record: any) => (
        <div style={{ display: "flex", gap: 8 }}>
          <PopConfirm onDelete={() => handleDelete(record.id)} />
          <Button
            onClick={() => {
              setEditData(record);
              setIsModalOpen(true);
            }}
          >
            <EditOutlined />
          </Button>
          <Link to={`${record.id}`}>view</Link>
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
        <h2>Groups</h2>
        <Button
          type="primary"
          onClick={() => {
            setEditData(null);
            setIsModalOpen(true);
          }}
        >
          + Add Group
        </Button>
      </div>

      <Table<Group>
        bordered
        columns={columns}
        dataSource={data?.data.data}
        loading={loading}
        rowKey={(record) => record.id ?? `${record.name}-${record.course_id}`}
        pagination={{
          current: params.page,
          pageSize: params.limit,
          total: data?.data?.total,
          showSizeChanger: true,
          pageSizeOptions: ["4", "5", "7", "10"],
        }}
        onChange={onTableChange}
      />

      <GroupModal
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

export default Groups;

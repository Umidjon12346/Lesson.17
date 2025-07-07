import { useEffect, useState } from "react";
import { Button, Table, message } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { GroupService } from "../../service/groups.service";
import type { Group } from "../../types/group";
import GroupModal from "./modal";

interface GroupWithId extends Group {
  id: number;
}

function Groups() {
  const [groups, setGroups] = useState<GroupWithId[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 5,
    total: 0,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState<GroupWithId | null>(null);

  const fetchGroups = async (page: number, pageSize: number) => {
    setLoading(true);
    try {
      const response = await GroupService.getGroups();
      if (response?.data?.data) {
        setGroups(response.data.data);
        setPagination({
          ...pagination,
          current: page,
          pageSize,
          total: response.data.data.length,
        });
      }
    } catch (err) {
      message.error("Ma'lumotlarni yuklashda xatolik yuz berdi");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchGroups(pagination.current!, pagination.pageSize!);
  }, []);

  const handleTableChange = (pagination: TablePaginationConfig) => {
    fetchGroups(pagination.current!, pagination.pageSize!);
  };

  const handleDelete = async (id: number) => {
    try {
      await GroupService.deleteGroup(id);
      message.success("Guruh o‘chirildi");
      fetchGroups(pagination.current!, pagination.pageSize!);
    } catch (err) {
      message.error("O‘chirishda xatolik yuz berdi");
    }
  };

  const handleSubmit = async (values: Group) => {
    // id, created_at, updated_at va boshqa keraksiz maydonlarni olib tashlash
    const cleanedValues = {
      name: values.name,
      course_id: values.course_id,
      status: values.status,
      start_date: values.start_date,
      end_date: values.end_date,
    };

    if (editData) {
      const res = await GroupService.editGroup(editData.id, cleanedValues);
      if (res?.status === 200) {
        message.success("Guruh tahrirlandi");
      } else {
        message.error("Tahrirlashda xatolik");
      }
    } else {
      const res = await GroupService.createGroup(cleanedValues);
      if (res?.status === 201 || res?.status === 200) {
        message.success("Guruh yaratildi");
      } else {
        message.error("Yaratishda xatolik");
      }
    }

    fetchGroups(pagination.current!, pagination.pageSize!);
    setIsModalOpen(false);
    setEditData(null);
  };
  

  const columns: ColumnsType<GroupWithId> = [
    { title: "Nomi", dataIndex: "name", key: "name" },
    { title: "Status", dataIndex: "status", key: "status" },
    { title: "Kurs ID", dataIndex: "course_id", key: "course_id" },
    { title: "Boshlanish", dataIndex: "start_date", key: "start_date" },
    { title: "Tugash", dataIndex: "end_date", key: "end_date" },
    {
      title: "Amallar",
      key: "actions",
      render: (_, record) => (
        <div style={{ display: "flex", gap: 8 }}>
          <Button danger onClick={() => handleDelete(record.id)}>
            O‘chirish
          </Button>
          <Button
            onClick={() => {
              setEditData(record);
              setIsModalOpen(true);
            }}
          >
            Edit
          </Button>
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
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <h2 style={{ margin: 0 }}>Guruhlar</h2>
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

      <Table
        columns={columns}
        dataSource={groups}
        loading={loading}
        rowKey={(record) => record.id}
        pagination={pagination}
        onChange={handleTableChange}
      />

      <GroupModal
        visible={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditData(null);
        }}
        onSubmit={handleSubmit}
        editData={editData ?? undefined} // ❗️Bu qatordan `editData` propni uzatyapmiz
      />
    </div>
  );
}

export default Groups;

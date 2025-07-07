import { useEffect, useState } from "react";
import { Button, Table, message } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { GroupService } from "../../service/groups.service";
import { CourseService } from "../../service/course.service"
import type { Group } from "../../types/group";
import GroupModal from "./modal";

interface GroupWithId extends Group {
  id: number;
  created_at?: string;
  updated_at?: string;
}

interface Course {
  id: number;
  title: string;
}

function Groups() {
  const [groups, setGroups] = useState<GroupWithId[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
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
    } catch {
      message.error("Ma'lumotlarni yuklashda xatolik yuz berdi");
    }
    setLoading(false);
  };

  const fetchCourses = async () => {
    try {
      const res = await CourseService.getCourses();
      console.log(res);
      
      if (res && res.data && res.data.courses) {
        setCourses(res.data.courses);
      } else {
        setCourses([]);
      }
    } catch {
      message.error("Kurslarni yuklashda xatolik");
    }
  };

  useEffect(() => {
    fetchGroups(pagination.current!, pagination.pageSize!);
    fetchCourses();
  }, []);

  const handleTableChange = (pagination: TablePaginationConfig) => {
    fetchGroups(pagination.current!, pagination.pageSize!);
  };

  const handleDelete = async (id: number) => {
    try {
      await GroupService.deleteGroup(id);
      message.success("Guruh o‘chirildi");
      fetchGroups(pagination.current!, pagination.pageSize!);
    } catch {
      message.error("O‘chirishda xatolik yuz berdi");
    }
  };

  const handleSubmit = async (values: Group) => {
    const payload = {
      name: values.name,
      course_id: values.course_id,
      status: values.status,
      start_date: values.start_date,
      end_date: values.end_date,
    };

    try {
      if (editData) {
        const res = await GroupService.editGroup(editData.id, payload);
        if (res?.status === 200) {
          message.success("Guruh tahrirlandi");
        }
      } else {
        const res = await GroupService.createGroup(payload);
        if (res?.status === 201 || res?.status === 200) {
          message.success("Guruh yaratildi");
        }
      }
      fetchGroups(pagination.current!, pagination.pageSize!);
      setIsModalOpen(false);
      setEditData(null);
    } catch {
      message.error("Yaratishda yoki tahrirlashda xatolik");
    }
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
            Tahrirlash
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
          marginBottom: 16,
        }}
      >
        <h2>Guruhlar</h2>
        <Button
          type="primary"
          onClick={() => {
            setEditData(null);
            setIsModalOpen(true);
          }}
        >
          + Guruh qo‘shish
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
        editData={editData ?? undefined}
        courses={courses}
      />
    </div>
  );
}

export default Groups;

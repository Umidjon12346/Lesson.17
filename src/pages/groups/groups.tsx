import { useEffect, useState } from "react";
import { Button, Table, message } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { GroupService } from "../../service/groups.service";
import { CourseService } from "../../service/course.service";
import type { Group } from "../../types/group";
import GroupModal from "./modal";
import { PopConfirm } from "../../components";
import { useLocation } from "react-router-dom";
import { useGeneral, useGroup } from "../../hooks";

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
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const { handleTableChange } = useGeneral();
  const location = useLocation();
  const [params, setParams] = useState({
    page: 1,
    limit: 5,
  });
  const { data, useDeleteGroup } = useGroup(params );
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
    fetchCourses();
  }, []);

  const onTableChange = (pagination: TablePaginationConfig) => {
    handleTableChange({ pagination, setParams });
  };

  const handleDelete = async (id: number) => {
    deleteGroup({ id });
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

      setIsModalOpen(false);
      setEditData(null);
    } catch {
      message.error("Yaratishda yoki tahrirlashda xatolik");
    }
  };


  const columns: ColumnsType<Group> = [
    { title: "Nomi", dataIndex: "name", key: "name" },
    { title: "Status", dataIndex: "status", key: "status" },
    { title: "Kurs ID", dataIndex: "course_id", key: "course_id" },
    { title: "Boshlanish", dataIndex: "start_date", key: "start_date" },
    { title: "Tugash", dataIndex: "end_date", key: "end_date" },
    {
      title: "Amallar",
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

      <Table<Group>
        columns={columns}
        dataSource={data?.data.data}
        loading={loading}
        rowKey={(record) => record.id ?? `${record.name}-${record.course_id}`}
        pagination={{
          current: params.page,
          pageSize: params.limit,
          total: data?.data?.total,
          showSizeChanger:true,
          pageSizeOptions:["4","5","7","10"]
        }}
        onChange={onTableChange}
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

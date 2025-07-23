import { useEffect, useState } from "react";
import { Button, Table } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type { Course } from "../../types/course";
import { useLocation } from "react-router-dom";
import { useGeneral, useCourse } from "../../hooks";
import CoursesModal from "./course-modal";
import { PopConfirm } from "../../components";
import { EditOutlined } from "@ant-design/icons";

interface CourseWithId extends Course {
  id: number;
}

function Courses() {
  const location = useLocation();
  const { handleTableChange } = useGeneral();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState<CourseWithId | null>(null);

  const [params, setParams] = useState({
    page: 1,
    limit: 5,
  });

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

  const { data, useDeleteCourse } = useCourse(params);
  const { mutate: deleteCourse } = useDeleteCourse();



  const handleDelete = async (id: number) => {
    deleteCourse( id );
  };

  const onTableChange = (pagination: TablePaginationConfig) => {
    handleTableChange({ pagination, setParams });
  };

  const columns: ColumnsType<CourseWithId> = [
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Description", dataIndex: "description", key: "description" },
    { title: "Price", dataIndex: "price", key: "price" },
    { title: "Duration", dataIndex: "duration", key: "duration" },
    {
      title: "Lessons/Week",
      dataIndex: "lessons_in_a_week",
      key: "lessons_in_a_week",
    },
    {
      title: "Lesson Duration",
      dataIndex: "lesson_duration",
      key: "lesson_duration",
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
        <h2>Courses</h2>
        <Button
          type="primary"
          onClick={() => {
            setEditData(null);
            setIsModalOpen(true);
          }}
        >
          + Add Course
        </Button>
      </div>

      <Table<CourseWithId>
        bordered
        columns={columns}
        dataSource={data?.data.courses}
        rowKey={(record) => record.id}
        pagination={{
          current: params.page,
          pageSize: params.limit,
          total: data?.data.total,
          showSizeChanger: true,
          pageSizeOptions: ["4", "5", "10"],
        }}
        onChange={onTableChange}
      />

      <CoursesModal
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

export default Courses;

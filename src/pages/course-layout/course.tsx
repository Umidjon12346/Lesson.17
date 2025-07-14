import { useEffect, useState } from "react";
import { Button, Table, message } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type { Course } from "../../types/course";
import { CourseService } from "../../service/course.service";
import Coursesmodal from "./course-modal";
import { PopConfirm } from "../../components";

interface CourseWithId extends Course {
  id: number;
}

function Courses() {
  const [courses, setCourses] = useState<CourseWithId[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 1000,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState<CourseWithId | null>(null);

  const fetchCourses = async (page: number, pageSize: number) => {
    setLoading(true);
    try {
      const res = await CourseService.getCourses();
      if (res?.data?.courses) {
        setCourses(res.data.courses);
        setPagination({
          ...pagination,
          current: page,
          pageSize,
          total: res.data.courses.length,
        });
      }
    } catch {
      message.error("Failed to load courses");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCourses(pagination.current!, pagination.pageSize!);
  }, []);

  const handleTableChange = (pagination: TablePaginationConfig) => {
    fetchCourses(pagination.current!, pagination.pageSize!);
  };

  const handleDelete = async (id: number) => {
    try {
      await CourseService.deleteCourses(id);
      message.success("Course deleted");
      fetchCourses(pagination.current!, pagination.pageSize!);
    } catch {
      message.error("An error occurred while deleting");
    }
  };

  const handleSubmit = async (values: Course) => {
    const payload = {
      title: values.title,
      description: values.description,
      price: values.price,
      duration: values.duration,
      lessons_in_a_week: values.lessons_in_a_week,
      lesson_duration: values.lesson_duration,
    };

    try {
      if (editData) {
        const res = await CourseService.updateCourses(payload, editData.id);
        if (res?.status === 200) {
          message.success("Course updated");
        }
      } else {
        const res = await CourseService.createCourses(payload);
        if (res?.status === 201 || res?.status === 200) {
          message.success("Course created");
        }
      }
      fetchCourses(pagination.current!, pagination.pageSize!);
      setIsModalOpen(false);
      setEditData(null);
    } catch {
      message.error("An error occurred while creating or updating");
    }
  };

  const columns: ColumnsType<CourseWithId> = [
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Description", dataIndex: "description", key: "description" },
    { title: "Price", dataIndex: "price", key: "price" },
    { title: "Duration", dataIndex: "duration", key: "duration" },
    {
      title: "Lessons per Week",
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
            Edit
          </Button>
          <PopConfirm onDelete={()=>handleDelete(record.id)}/>
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

      <Table
        columns={columns}
        dataSource={courses}
        loading={loading}
        rowKey={(record) => record.id}
        pagination={pagination}
        onChange={handleTableChange}
      />

      <Coursesmodal
        visible={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditData(null);
        }}
        onSubmit={handleSubmit}
        editData={editData ?? undefined}
      />
    </div>
  );
}

export default Courses;

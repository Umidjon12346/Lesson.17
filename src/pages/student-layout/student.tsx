import { useEffect, useState } from "react";
import { Button, Table, message } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { StudentService } from "../../service/student.service";
import StudentModal from "./student-modal";
import type { Student } from "../../types/student";


function Student() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 5,
    total: 0,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState<Student | null>(null);

  const fetchStudents = async (page: number, pageSize: number) => {
    setLoading(true);
    try {
      const res = await StudentService.getStudents();
      
      if (res?.data?.students) {
        setStudents(res.data.students);
        setPagination({
          ...pagination,
          current: page,
          pageSize,
          total: res.data.students.length,
        });
      }
    } catch {
      message.error("Talabalarni yuklashda xatolik yuz berdi");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchStudents(pagination.current!, pagination.pageSize!);
  }, []);

  const handleTableChange = (pagination: TablePaginationConfig) => {
    fetchStudents(pagination.current!, pagination.pageSize!);
  };

  const handleDelete = async (id: number) => {
    try {
      await StudentService.deleteStudent(id);
      message.success("Talaba o‘chirildi");
      fetchStudents(pagination.current!, pagination.pageSize!);
    } catch {
      message.error("O‘chirishda xatolik yuz berdi");
    }
  };

  const handleSubmit = async (values: Student) => {
    try {
      if (editData?.id != null) {
        const res = await StudentService.updateStudent(values, editData.id);
        if (res?.status === 200) {
          message.success("Talaba tahrirlandi");
        }
      } else {
        const res = await StudentService.createStudent(values);
        console.log(res);
        
        if (res?.status === 201 || res?.status === 200) {
          message.success("Talaba yaratildi");
        }
      }
      fetchStudents(pagination.current!, pagination.pageSize!);
      setIsModalOpen(false);
      setEditData(null);
    } catch {
      message.error("Saqlashda xatolik yuz berdi");
    }
  };

  const columns: ColumnsType<Student> = [
    { title: "Ism", dataIndex: "first_name", key: "first_name" },
    { title: "Familiya", dataIndex: "last_name", key: "last_name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Telefon", dataIndex: "phone", key: "phone" },
    { title: "Jinsi", dataIndex: "gender", key: "gender" },
    {
      title: "Tug‘ilgan sana",
      dataIndex: "date_of_birth",
      key: "date_of_birth",
    },
    {
      title: "Amallar",
      key: "actions",
      render: (_, record) => (
        <div style={{ display: "flex", gap: 8 }}>
          <Button
            onClick={() => {
              setEditData(record);
              setIsModalOpen(true);
            }}
          >
            Tahrirlash
          </Button>
          <Button
            danger
            onClick={() => {
              if (
                window.confirm("Haqiqatan ham o‘chirmoqchimisiz?") &&
                record.id !== undefined
              ) {
                handleDelete(record.id);
              }
            }}
          >
            O‘chirish
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
        <h2>Talabalar</h2>
        <Button
          type="primary"
          onClick={() => {
            setEditData(null);
            setIsModalOpen(true);
          }}
        >
          + Talaba qo‘shish
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={students}
        loading={loading}
        // rowKey={(record) => record.id}
        rowKey={(record) => record.id ?? record.email}
        pagination={pagination}
        onChange={handleTableChange}
      />

      <StudentModal
        visible={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditData(null);
        }}
        onSubmit={handleSubmit}
        // onSubmit: (values: Student) => Promise<void>;
        editData={editData ?? undefined}
      />
    </div>
  );
}

export default Student;

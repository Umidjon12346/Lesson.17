import { useEffect, useState } from "react";
import { Button, Table, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { TablePaginationConfig } from "antd/es/table";
import type { Teacher } from "../../types/teacher";
import { TeacherService } from "../../service/teacher.service";
import TeacherModal from "./teacher-modal";
import type { Branch } from "../../types/branch";
import { BranchService } from "../../service/branch.service";
import { PopConfirm } from "../../components";

function TeacherPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(false);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState<Teacher | null>(null);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 5,
    total: 0,
  });

  const fetchTeachers = async () => {
    setLoading(true);
    try {
      const res = await TeacherService.getTeacher();
      if (res?.data?.teachers) {
        setTeachers(res.data.teachers);
        setPagination((prev) => ({
          ...prev,
          total: res.data.teachers.length,
        }));
      }
    } catch {
      message.error("O‘qituvchilarni yuklashda xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  const fetchBranch = async () => {
    try {
      const res = await BranchService.getBranches();
      const branchesData = res?.data?.branch;

      if (Array.isArray(branchesData)) {
        const cleanedBranches = branchesData.map((b: any) => ({
          id: b.id,
          name: b.name,
          address: b.address ?? "",
          call_number: b.call_number ?? "",
        }));
        setBranches(cleanedBranches);
      } else {
        setBranches([]);
      }
    } catch {
      message.error("Filiallarni yuklashda xatolik");
    }
  };

  useEffect(() => {
    fetchTeachers();
    fetchBranch();
  }, []);

  const handleSubmit = async (values: Teacher) => {
    try {
      if (editData?.id) {
        await TeacherService.updateTeacher(values, editData.id);
        message.success("O‘qituvchi yangilandi");
      } else {
        await TeacherService.createTeacher(values);
        message.success("Yangi o‘qituvchi qo‘shildi");
      }
      fetchTeachers();
      setIsModalOpen(false);
      setEditData(null);
    } catch {
      message.error("Saqlashda xatolik yuz berdi");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await TeacherService.deleteTeacher(id);
      message.success("O‘qituvchi o‘chirildi");
      fetchTeachers();
    } catch {
      message.error("O‘chirishda xatolik yuz berdi");
    }
  };

  const columns: ColumnsType<Teacher> = [
    { title: "Ism", dataIndex: "first_name", key: "first_name" },
    { title: "Familiya", dataIndex: "last_name", key: "last_name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Telefon", dataIndex: "phone", key: "phone" },
    { title: "Rol", dataIndex: "role", key: "role" },
    {
      title: "Filiallar",
      dataIndex: "branchId",
      key: "branchId",
      render: (branchId?: number[]) => {
        if (!Array.isArray(branchId)) return "—";
        const branchNames = branchId
          .map((id) => branches.find((b) => b.id === id)?.name)
          .filter(Boolean);
        return branchNames.length > 0 ? branchNames.join(", ") : "—";
      },
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
        <h2>O‘qituvchilar</h2>
        <Button
          type="primary"
          onClick={() => {
            setEditData(null);
            setIsModalOpen(true);
          }}
        >
          + O‘qituvchi qo‘shish
        </Button>
      </div>

      <Table
        dataSource={teachers}
        columns={columns}
        loading={loading}
        rowKey={(record) => record.id!}
        pagination={pagination}
      />

      <TeacherModal
        visible={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditData(null);
        }}
        onSubmit={async (values) => {
          if (editData) {
            const { password, ...data } = values;
            await handleSubmit(data as Teacher);
          } else {
            await handleSubmit(values); // password bo'lishi kerak
          }
        }}
        branches={branches}
        editData={editData ?? undefined}
      />
    </div>
  );
}

export default TeacherPage;

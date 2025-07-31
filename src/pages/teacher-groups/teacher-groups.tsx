import { Table, Tag } from "antd";
import { useTeachers } from "../../hooks";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const TeachersGroups = () => {
  const { teacherGroups } = useTeachers();
  const navigate = useNavigate()

  const columns = [
    {
      title: "Group Name",
      dataIndex: ["group", "name"],
      key: "name",
    },
    {
      title: "Start Date",
      dataIndex: "start_date",
      key: "start_date",
      render: (date: string) => dayjs(date).format("YYYY-MM-DD"),
    },
    {
      title: "End Date",
      dataIndex: "end_date",
      key: "end_date",
      render: (date: string) => dayjs(date).format("YYYY-MM-DD"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: boolean) =>
        status ? (
          <Tag color="green">Active</Tag>
        ) : (
          <Tag color="red">Inactive</Tag>
        ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <h2 style={{ marginBottom: 16 }}>My Groups</h2>
      <Table
        columns={columns}
        dataSource={teacherGroups || []}
        rowKey="id"
        bordered
        pagination={false}
        onRow={(record:any) => ({
          onClick: () => {
            navigate(`/teacher/students/${record.group.id}`);
          },
        })}
      />
    </div>
  );
};

export default TeachersGroups;

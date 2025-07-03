import { useEffect, useState } from "react";
import { Table } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { GroupService } from "../../service/groups.service";
import type { Group } from "../../types/group";

function Groups() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 5,
    total: 0,
  });

  const fetchGroups = async (page: number, pageSize: number) => {
    setLoading(true);
    const response = await GroupService.getGroups();
    if (response?.data?.data) {
      setGroups(response.data.data);
      setPagination({
        ...pagination,
        current: page,
        pageSize: pageSize,
        total: response.data.data.length, // agar server pagination qilsa, bu serverdan keladi
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchGroups(pagination.current!, pagination.pageSize!);
  }, []);

  const handleTableChange = (pagination: TablePaginationConfig) => {
    fetchGroups(pagination.current!, pagination.pageSize!);
  };

  const columns: ColumnsType<Group> = [
    {
      title: "Nomi",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Kurs ID",
      dataIndex: "course_id",
      key: "course_id",
    },
    {
      title: "Boshlanish",
      dataIndex: "start_date",
      key: "start_date",
    },
    {
      title: "Tugash",
      dataIndex: "end_date",
      key: "end_date",
    },
  ];

  return (
    <div>
      <h2>Guruhlar</h2>
      <Table
        columns={columns}
        dataSource={groups}
        loading={loading}
        rowKey={(record) => record.name + record.start_date}
        pagination={pagination}
        onChange={handleTableChange}
      />
    </div>
  );
}

export default Groups;

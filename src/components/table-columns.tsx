import type { TableProps } from "antd";
import type { Room } from "../types/room";

export const RoomColumns: TableProps<Room>["columns"] = [
{
  title: "Branch",
  key: "branch",
  render: (_, record: any) =>
    record.branch?.name ?? "-",
}
,
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Capacity",
    dataIndex: "capacity",
    key: "capacity",
  },
];

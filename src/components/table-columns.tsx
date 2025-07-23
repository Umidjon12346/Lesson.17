import type { TableProps } from "antd";
import type { Room } from "../types/room";

export const RoomColumns: TableProps<Room>["columns"] = [
  {
    title: "Branches",
    dataIndex: "branchId",
    key: "branchId",
    // render: (branch: { title: string }) => <span>{branch.title}</span>,
    // render: (branch: { name: string }) => <span>{branch.name}</span>,
    render: (branch: Room) => <span>{branch?.name}</span>,
  },
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

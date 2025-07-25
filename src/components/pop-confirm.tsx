import React from "react";
import { Button, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";


interface PopConfirmProps {
  onDelete: () => void;
}

const PopConfirm: React.FC<PopConfirmProps> = ({ onDelete }) => (
  <Popconfirm
    title="Delete the task"
    description="Are you sure to delete this task?"
    okText="Yes"
    cancelText="No"
    onConfirm={onDelete}
  >
    <Button danger icon={<DeleteOutlined />}></Button>
  </Popconfirm>
);

export default PopConfirm;

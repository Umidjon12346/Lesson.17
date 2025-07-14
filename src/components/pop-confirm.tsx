import React from "react";
import { Button, Popconfirm } from "antd";



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
    <Button  danger>
      Delete
    </Button>
  </Popconfirm>
);

export default PopConfirm;

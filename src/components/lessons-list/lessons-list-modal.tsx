import { Modal, Select, Input } from "antd";
import React from "react";

const { Option } = Select;
const { TextArea } = Input;

interface LessonModalProps {
  open: boolean;
  lesson: any;
  status: string;
  description: string;
  onChangeStatus: (value: string) => void;
  onChangeDescription: (value: string) => void;
  onOk: () => void;
  onCancel: () => void;
}

const LessonModal: React.FC<LessonModalProps> = ({
  open,
  lesson,
  status,
  description,
  onChangeStatus,
  onChangeDescription,
  onOk,
  onCancel,
}) => {
  return (
    <Modal
      title={`Dars ${lesson?.index + 1} - Tahrirlash`}
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      okText="Saqlash"
      cancelText="Bekor qilish"
    >
      <div className="mb-4">
        <label>Status:</label>
        <Select
          value={status} 
          onChange={onChangeStatus}
          className="w-full mt-1"
        >
          <Option value="new">Yangi</Option>
          <Option value="active">Faol</Option>
          <Option value="cancelled">Bekor qilingan</Option>
          <Option value="completed">Yakunlangan</Option>
        </Select>
      </div>

      <div>
        <label>Izoh:</label>
        <TextArea
          rows={4}
          value={description}
          onChange={(e) => onChangeDescription(e.target.value)}
          className="mt-1"
        />
      </div>
    </Modal>
  );
};

export default LessonModal;

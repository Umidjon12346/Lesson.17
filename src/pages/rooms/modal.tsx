import {
  Modal,
  Input,
  Form as AntForm,
  Button,
  Select,
  InputNumber,
} from "antd";
import { Controller, useForm } from "react-hook-form";
import type { Room } from "../../types/room";
import { useBranches, useRoom } from "../../hooks/index";
import { yupResolver } from "@hookform/resolvers/yup";
import { RoomValidation } from "../../utility";

const { Option } = Select;

interface RoomModalProps {
  open: boolean;
  toggle: () => void;
  update: Room | null;
  mode: "create" | "update";
}

const RoomModal: React.FC<RoomModalProps> = ({
  open,
  toggle,
  update,
  mode,
}) => {
  const { useRoomCreate, useRoomUpdate } = useRoom({ page: 1, limit: 10 });
  const { mutate: createFn, isPending: isCreating } = useRoomCreate();
  const { mutate: updateFn, isPending: isUpdating } = useRoomUpdate();
  const { data } = useBranches({});
  const branches = data?.data.branch || [];

  const isLoading = isCreating || isUpdating;

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Room>({
    defaultValues: {
      name: update?.name || "",
      branchId: update?.branchId || 0,
      capacity: update?.capacity || 0,
    },
    resolver: yupResolver(RoomValidation),
  });

  const onSubmit = (values: Room) => {
    if (mode === "create") {
      createFn(values, { onSuccess: toggle });
    } else if (mode === "update" && update?.id) {
      updateFn({ model: values, id: update.id }, { onSuccess: toggle });
    }
  };

  return (
    <Modal
      open={open}
      title={mode === "create" ? "Add new room" : "Edit room"}
      onCancel={() => {
        reset();
        toggle();
      }}
      footer={null}
      destroyOnHidden
    >
      <AntForm layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <AntForm.Item
          label="Name"
          validateStatus={errors.name && "error"}
          help={errors.name?.message}
        >
          <Controller
            name="name"
            control={control}
            render={({ field }) => <Input {...field} />}
          />
        </AntForm.Item>

        <AntForm.Item
          label="Branch"
          validateStatus={errors.branchId && "error"}
          help={errors.branchId?.message}
        >
          <Controller
            name="branchId"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                value={field.value || undefined}
                onChange={field.onChange}
                placeholder="Choose branch"
              >
                {branches.map((branch: any) => (
                  <Option key={branch.id} value={branch.id}>
                    {branch.name}
                  </Option>
                ))}
              </Select>
            )}
          />
        </AntForm.Item>

        <AntForm.Item
          label="Capacity"
          validateStatus={errors.capacity && "error"}
          help={errors.capacity?.message}
        >
          <Controller
            name="capacity"
            control={control}
            render={({ field }) => (
              <InputNumber {...field} min={1} style={{ width: "100%" }} />
            )}
          />
        </AntForm.Item>

        <AntForm.Item>
          <Button type="primary" htmlType="submit" block loading={isLoading}>
            {mode === "update" ? "Update" : "Create"}
          </Button>
        </AntForm.Item>
      </AntForm>
    </Modal>
  );
};

export default RoomModal;

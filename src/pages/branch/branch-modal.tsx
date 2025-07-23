import React, { useEffect } from "react";
import { Modal, Input, Form as AntForm, Button, message } from "antd";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import type { Branch } from "../../types/branch";
import { useBranches } from "../../hooks/useBranches";
import { branchSchema } from "../../utility";

interface BranchModalProps {
  visible: boolean;
  onClose: () => void;
  editData?: Branch;
}



const BranchModal: React.FC<BranchModalProps> = ({
  visible,
  onClose,
  editData,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Branch>({
    resolver: yupResolver(branchSchema),
    defaultValues: {
      id: 0,
      name: "",
      address: "",
      call_number: "",
    },
  });

  useEffect(() => {
    if (editData) {
      reset(editData);
    } else {
      reset({
        id: 0,
        name: "",
        address: "",
        call_number: "",
      });
    }
  }, [editData, reset]);

  const {useBranchUpdate,useBranchCreate}=useBranches({})
  const {mutate:updatefn} = useBranchUpdate()
  const {mutate:createfn} = useBranchCreate()

   const handleSubmitt = async (values: Branch) => {
     const payload = {
       name: values.name,
       address: values.address,
       call_number: values.call_number,
     };
     try {
       if (editData) {
         updatefn({ data: payload, id: editData.id! }); // await ishlaydi
         message.success("Group updated successfully");
       } else {
         createfn(payload);
         message.success("Group created successfully");
       }

       onClose();
     } catch (error: any) {
       console.error(error);
       message.error("Error creating or updating group");
     }
   };



  return (
    <Modal
      title={editData ? "Edit Branch" : "Add Branch"}
      open={visible}
      onCancel={onClose}
      footer={null}
    >
      <AntForm layout="vertical" onFinish={handleSubmit(handleSubmitt)}>
        {/* Branch Name */}
        <AntForm.Item
          label="Branch Name"
          validateStatus={errors.name ? "error" : ""}
          help={errors.name?.message}
        >
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Enter branch name" />
            )}
          />
        </AntForm.Item>

        {/* Address */}
        <AntForm.Item
          label="Address"
          validateStatus={errors.address ? "error" : ""}
          help={errors.address?.message}
        >
          <Controller
            name="address"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Enter address" />
            )}
          />
        </AntForm.Item>

        {/* Phone Number */}
        <AntForm.Item
          label="Phone Number"
          validateStatus={errors.call_number ? "error" : ""}
          help={errors.call_number?.message}
        >
          <Controller
            name="call_number"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Enter phone number" />
            )}
          />
        </AntForm.Item>

        <Button type="primary" htmlType="submit" block>
          Save
        </Button>
      </AntForm>
    </Modal>
  );
};

export default BranchModal;

// import { useState } from "react";
// import { Avatar, Tag, Collapse, Badge, Button } from "antd";
// import {
//   UserOutlined,
//   TeamOutlined,
//   DownOutlined,
//   RightOutlined,
//   PlusOutlined,
// } from "@ant-design/icons";
// import AddTeacherToGroupModal from "./teacher-add"; // modalni import qilish
// import {  useGroup, useTeachers } from "../../hooks";


// const GroupTeachers = ({
//   teachers,
//   groupId,
// }: any) => {
//   const {data:GroupData} = useGroup({})
//   const [modalOpen, setModalOpen] = useState(false);
//   const {data} = useTeachers({page:1,limit :20})
//   const allTeachers = data?.data.data || []
  
  


//   const activeTeachersCount = teachers.filter(
//     (item: any) => item.teacher?.is_active
//   ).length;

//   const renderTeacherCard = (item: any) => {
//     const { teacher } = item;
//     const fullName = `${teacher.first_name} ${teacher.last_name}`;
//     const avatar = teacher.avatar_url || "";

//     return (
//       <div
//         key={teacher.id}
//         className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
//       >
//         <div className="flex items-center gap-3">
//           <Avatar
//             size={40}
//             src={avatar || undefined}
//             icon={!avatar && <UserOutlined />}
//           />
//           <div>
//             <div className="font-medium text-gray-900">{fullName}</div>
//             <div className="text-sm text-gray-500">{teacher.role}</div>
//             {item.start_date && (
//               <div className="text-xs text-gray-400 mt-1">
//                 Started: {new Date(item.start_date).toLocaleDateString()}
//               </div>
//             )}
//           </div>
//         </div>
//         <Tag color={teacher.is_active ? "green" : "red"}>
//           {teacher.is_active ? "Active" : "Inactive"}
//         </Tag>
//       </div>
//     );
//   };

//   const customExpandIcon = ({ isActive }: { isActive?: boolean }) => (
//     <div className="flex items-center gap-2">
//       {isActive ? <DownOutlined /> : <RightOutlined />}
//     </div>
//   );

//   const items = [
//     {
//       key: "teachers",
//       label: (
//         <div className="flex items-center justify-between w-full pr-4">
//           <div className="flex items-center gap-3">
//             <TeamOutlined className="text-blue-500" />
//             <span className="font-semibold text-gray-700">Teachers</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <Badge
//               count={activeTeachersCount}
//               style={{ backgroundColor: "#52c41a" }}
//             />
//             <span className="text-sm text-gray-500">
//               Total: {teachers.length}
//             </span>
//           </div>
//         </div>
//       ),
//       children: (
//         <div className="space-y-3 mt-2">
//           {teachers.length > 0 ? (
//             teachers.map((item: any) => renderTeacherCard(item))
//           ) : (
//             <div className="text-center py-8 text-gray-500">
//               <TeamOutlined className="text-4xl mb-2" />
//               <p>No teachers found</p>
//               <Button
//                 type="primary"
//                 icon={<PlusOutlined />}
//                 onClick={() => setModalOpen(true)}
//                 className="mt-4"
//               >
//                 + Add Teacher
//               </Button>
//             </div>
//           )}
//         </div>
//       ),
//     },
//   ];



//   return (
//     <div className="w-full">
//       <div className="flex justify-end mb-3">
//         <Button
//           type="primary"
//           icon={<PlusOutlined />}
//           onClick={() => setModalOpen(true)}
//         >
//           Add Teacher
//         </Button>
//       </div>

//       <Collapse
//         ghost
//         expandIcon={customExpandIcon}
//         className="bg-white rounded-lg shadow-sm"
//         items={items}
//         defaultActiveKey={["teachers"]}
//       />

//       <AddTeacherToGroupModal
//         open={modalOpen}
//         onCancel={() => setModalOpen(false)}
//         groupTeachers={teachers}
//         allTeachers={allTeachers}
//         groupId={groupId}
//       />
//     </div>
//   );
// };
// export default GroupTeachers;

import { useState } from "react";
import { Avatar, Tag, Collapse, Badge, Button, Descriptions } from "antd";
import {
  UserOutlined,
  TeamOutlined,
  DownOutlined,
  RightOutlined,
  PlusOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import AddTeacherToGroupModal from "./teacher-add";
import { useGroup, useTeachers } from "../../hooks";

const GroupTeachers = ({ teachers, groupId }: any) => {
  const [modalOpen, setModalOpen] = useState(false);

  const { groupById } = useGroup({}, groupId); // ✅ to‘g‘rilandi
  const { data } = useTeachers({ page: 1, limit: 100 });
  const allTeachers = data?.data.data || [];

  const activeTeachersCount = teachers.filter(
    (item: any) => item.teacher?.is_active
  ).length;

  const renderTeacherCard = (item: any) => {
    const { teacher } = item;
    const fullName = `${teacher.first_name} ${teacher.last_name}`;
    const avatar = teacher.avatar_url || "";

    return (
      <div
        key={teacher.id}
        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
      >
        <div className="flex items-center gap-3">
          <Avatar
            size={40}
            src={avatar || undefined}
            icon={!avatar && <UserOutlined />}
          />
          <div>
            <div className="font-medium text-gray-900">{fullName}</div>
            <div className="text-sm text-gray-500">{teacher.role}</div>
            {item.start_date && (
              <div className="text-xs text-gray-400 mt-1">
                Started: {new Date(item.start_date).toLocaleDateString()}
              </div>
            )}
          </div>
        </div>
        <Tag color={teacher.is_active ? "green" : "red"}>
          {teacher.is_active ? "Active" : "Inactive"}
        </Tag>
      </div>
    );
  };
console.log(groupById);

  const customExpandIcon = ({ isActive }: { isActive?: boolean }) => (
    <div className="flex items-center gap-2">
      {isActive ? <DownOutlined /> : <RightOutlined />}
    </div>
  );

  return (
    <div className="w-full">
      <div className="flex justify-end mb-3">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setModalOpen(true)}
        >
          Add Teacher
        </Button>
      </div>

      {/* ✅ Collapse lar yonma-yon bo'lishi uchun flex */}
      <div className="flex flex-row gap-4">
        {/* Group Info */}
        <div className="w-1/2">
          <Collapse
            ghost
            expandIcon={customExpandIcon}
            className="bg-white rounded-lg shadow-sm"
            items={[
              {
                key: "group",
                label: (
                  <div className="flex items-center gap-3">
                    <InfoCircleOutlined className="text-purple-500" />
                    <span className="font-semibold text-gray-700">
                      Group Info
                    </span>
                  </div>
                ),
                children: groupById ? (
                  <Descriptions
                    bordered
                    column={1}
                    size="small"
                    labelStyle={{ fontWeight: 500 }}
                  >
                    <Descriptions.Item label="Title">
                      {groupById.data.group.name}
                    </Descriptions.Item>
                    <Descriptions.Item label="Room">
                      {groupById.data.group.room?.name || "No room"}
                    </Descriptions.Item>
                    <Descriptions.Item label="Start Date">
                      {new Date(
                        groupById.data.group.start_date
                      ).toLocaleDateString()}
                    </Descriptions.Item>
                    <Descriptions.Item label="End Date">
                      {new Date(
                        groupById.data.group.end_date
                      ).toLocaleDateString()}
                    </Descriptions.Item>
                    <Descriptions.Item label="Status">
                      <Tag
                        color={
                          groupById.data.group.status === "new"
                            ? "blue"
                            : groupById.data.group.status === "active"
                            ? "green"
                            : groupById.data.group.status === "inactive"
                            ? "red"
                            : "default"
                        }
                      >
                        {groupById.data.group.status?.charAt(0).toUpperCase() +
                          groupById.data.group.status?.slice(1)}
                      </Tag>
                    </Descriptions.Item>
                    <Descriptions.Item label="Description">
                      {groupById.data.group.description || "-"}
                    </Descriptions.Item>
                  </Descriptions>
                ) : (
                  <p>Loading group information...</p>
                ),
              },
            ]}
            defaultActiveKey={["group"]}
          />
        </div>

        {/* Teachers */}
        <div className="w-1/2">
          <Collapse
            ghost
            expandIcon={customExpandIcon}
            className="bg-white rounded-lg shadow-sm"
            items={[
              {
                key: "teachers",
                label: (
                  <div className="flex items-center justify-between w-full pr-4">
                    <div className="flex items-center gap-3">
                      <TeamOutlined className="text-blue-500" />
                      <span className="font-semibold text-gray-700">
                        Teachers
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        count={activeTeachersCount}
                        style={{ backgroundColor: "#52c41a" }}
                      />
                      <span className="text-sm text-gray-500">
                        Total: {teachers.length}
                      </span>
                    </div>
                  </div>
                ),
                children: (
                  <div className="space-y-3 mt-2">
                    {teachers.length > 0 ? (
                      teachers.map((item: any) => renderTeacherCard(item))
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <TeamOutlined className="text-4xl mb-2" />
                        <p>No teachers found</p>
                        <Button
                          type="primary"
                          icon={<PlusOutlined />}
                          onClick={() => setModalOpen(true)}
                          className="mt-4"
                        >
                          + Add Teacher
                        </Button>
                      </div>
                    )}
                  </div>
                ),
              },
            ]}
            defaultActiveKey={["teachers"]}
          />
        </div>
      </div>

      <AddTeacherToGroupModal
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        groupTeachers={teachers}
        allTeachers={allTeachers}
        groupId={groupId}
      />
    </div>
  );
};

export default GroupTeachers;

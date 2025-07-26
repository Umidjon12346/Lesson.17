// import {  Avatar, Tag, Collapse, Badge } from "antd";
// import {
//   UserOutlined,
//   TeamOutlined,
//   DownOutlined,
//   RightOutlined,
// } from "@ant-design/icons";

// const { Panel } = Collapse;

// function GroupTeachers({ teachers }: any) {
//   // Count active teachers
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
//           </div>
//         </div>
//         <Tag color={teacher.is_active ? "green" : "red"}>
//           {teacher.is_active ? "Faol" : "Nofaol"}
//         </Tag>
//       </div>
//     );
//   };

//   const customExpandIcon = ({ isActive }: { isActive?: boolean }) => (
//     <div className="flex items-center gap-2">
//       {isActive ? <DownOutlined /> : <RightOutlined />}
//     </div>
//   );

//   return (
//     <Collapse
//       ghost
//       expandIcon={customExpandIcon}
//       className="bg-white rounded-lg shadow-sm"
//     >
//       <Panel
//         header={
//           <div className="flex items-center justify-between w-full pr-4">
//             <div className="flex items-center gap-3">
//               <TeamOutlined className="text-blue-500" />
//               <span className="font-semibold text-gray-700">O'qituvchilar</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <Badge
//                 count={activeTeachersCount}
//                 style={{ backgroundColor: "#52c41a" }}
//               />
//               <span className="text-sm text-gray-500">
//                 Jami: {teachers.length}
//               </span>
//             </div>
//           </div>
//         }
//         key="teachers"
//       >
//         <div className="space-y-3 mt-2">
//           {teachers.length > 0 ? (
//             teachers.map((item: any) => renderTeacherCard(item))
//           ) : (
//             <div className="text-center py-8 text-gray-500">
//               <TeamOutlined className="text-4xl mb-2" />
//               <p>Hech qanday o'qituvchi topilmadi</p>
//             </div>
//           )}
//         </div>
//       </Panel>
//     </Collapse>
//   );
// }

// export default GroupTeachers;
import { Avatar, Tag, Collapse, Badge } from "antd";
import {
  UserOutlined,
  TeamOutlined,
  DownOutlined,
  RightOutlined,
} from "@ant-design/icons";

function GroupTeachers({ teachers }: any) {
  // Count active teachers
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
          </div>
        </div>
        <Tag color={teacher.is_active ? "green" : "red"}>
          {teacher.is_active ? "Faol" : "Nofaol"}
        </Tag>
      </div>
    );
  };

  const customExpandIcon = ({ isActive }: { isActive?: boolean }) => (
    <div className="flex items-center gap-2">
      {isActive ? <DownOutlined /> : <RightOutlined />}
    </div>
  );

  const items = [
    {
      key: "teachers",
      label: (
        <div className="flex items-center justify-between w-full pr-4">
          <div className="flex items-center gap-3">
            <TeamOutlined className="text-blue-500" />
            <span className="font-semibold text-gray-700">Teachers</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              count={activeTeachersCount}
              style={{ backgroundColor: "#52c41a" }}
            />
            <span className="text-sm text-gray-500">
              All: {teachers.length}
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
              <p>Hech qanday o'qituvchi topilmadi</p>
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <Collapse
      ghost
      expandIcon={customExpandIcon}
      className="bg-white rounded-lg shadow-sm"
      items={items}
    />
  );
}

export default GroupTeachers;
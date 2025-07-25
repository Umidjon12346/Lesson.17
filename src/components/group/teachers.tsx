
// import { Card, Avatar, Tag } from "antd";
// import {
//   UserOutlined,

// } from "@ant-design/icons";

// function GroupTeachers({ teachers }: any) {
//   console.log(teachers);
  
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
//       {teachers.map((item: any) => {
//         const { teacher} = item;
//         const fullName = `${teacher.first_name} ${teacher.last_name}`;
//         const avatar = teacher.avatar_url || "";

//         return (
//           <Card
//             key={teacher.id}
//             className="rounded-2xl shadow-lg hover:shadow-2xl transition duration-300"
//             style={{ padding: "24px" }}
//           >
//             <div className="flex flex-col items-center text-center">
//               <Avatar
//                 size={96}
//                 src={avatar || undefined}
//                 icon={!avatar && <UserOutlined />}
//                 className="mb-4"
//               />
//               <h2 className="text-xl font-semibold mb-1">{fullName}</h2>
//               <div className="mb-2 text-gray-500 text-sm">{teacher.role}</div>

//               <div className="flex flex-wrap justify-center gap-2 my-2">
//                 <Tag color={teacher.is_active ? "green" : "red"}>
//                   {teacher.is_active ? "Faol" : "Nofaol"}
//                 </Tag>
//               </div>
//             </div>
//           </Card>
//         );
//       })}
//     </div>
//   );
// }

// export default GroupTeachers;


// import { Card, Avatar, Tag } from "antd";
// import { UserOutlined } from "@ant-design/icons";

// function GroupTeachers({ teachers }: any) {
//   const activeTeachers = teachers.filter(
//     (item: any) => item.teacher?.is_active
//   );

//   return (
//     <div className="grid grid-rows-1 sm:grid-rows-2 lg:grid-rows-3 gap-6 p-4">
//       {activeTeachers.map((item: any) => {
//         const { teacher } = item;
//         const fullName = `${teacher.first_name} ${teacher.last_name}`;
//         const avatar = teacher.avatar_url || "";

//         return (
//           <Card
//             key={teacher.id}
//             className="rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
//           >
//             <div className="flex items-center gap-4">
//               <Avatar
//                 size={64}
//                 src={avatar || undefined}
//                 icon={!avatar && <UserOutlined />}
//               />
//               <div>
//                 <h3 className="text-lg font-semibold">{fullName}</h3>
//                 <Tag color={teacher.is_active ? "green" : "red"}>
//                   {teacher.is_active ? "Faol" : "Nofaol"}
//                 </Tag>
//               </div>
//             </div>
//           </Card>
//         );
//       })}
//     </div>
//   );
// }

// export default GroupTeachers;



import { Card, Avatar, Tag } from "antd";
import { UserOutlined, PhoneOutlined, MailOutlined } from "@ant-design/icons";

function GroupTeachers({ teachers }: any) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {teachers.map((item: any) => {
        const { teacher, start_date, end_date } = item;
        const fullName = `${teacher.first_name} ${teacher.last_name}`;
        const avatar = teacher.avatar_url || "";

        return (
          <Card
            key={teacher.id}
            title={fullName}
            bordered
            className="shadow-md rounded-2xl"
          >
            <Card.Meta
              avatar={
                avatar ? (
                  <Avatar src={avatar} />
                ) : (
                  <Avatar icon={<UserOutlined />} />
                )
              }
              description={
                <div className="space-y-2 mt-2 text-sm">
                  <div>
                    <MailOutlined className="mr-2" />
                    {teacher.email}
                  </div>
                  <div>
                    <PhoneOutlined className="mr-2" />
                    {teacher.phone}
                  </div>
                  <div>
                    <Tag color="blue">{teacher.role}</Tag>
                    <Tag color={teacher.is_active ? "green" : "red"}>
                      {teacher.is_active ? "Faol" : "Nofaol"}
                    </Tag>
                  </div>
                  <div className="text-xs text-gray-500">
                    {start_date} - {end_date}
                  </div>
                </div>
              }
            />
          </Card>
        );
      })}
    </div>
  );
}

export default GroupTeachers;
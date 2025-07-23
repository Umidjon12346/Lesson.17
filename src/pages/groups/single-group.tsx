import { useParams } from "react-router-dom";
import { useGroup } from "../../hooks";
import GroupStudents from "../../components/group/students";
import GroupTeachers from "../../components/group/teachers";
import GroupLessons from "../../components/group/lessons";

const SingleGroup = () => {
  const { id } = useParams();
  const groupId = Number(id);

  if (isNaN(groupId)) {
    return <div>Noto‘g‘ri guruh ID</div>;
  }

  const { students, teachers, lessons } = useGroup(
    { page: 1, limit: 10 },
    groupId
  );

  return (
    <div className="flex flex-col gap-9">
      {teachers?.data?.length > 0 && <GroupTeachers teachers={teachers?.data} />}
      {lessons?.data?.lessons?.length > 0 && (
        <GroupLessons lessons={lessons?.data.lessons} />
      )}
      {students?.data?.length > 0 && <GroupStudents students={students?.data} />}
    </div>
  );
};

export default SingleGroup;

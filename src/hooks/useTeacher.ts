import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TeacherService } from "../service/teacher.service";

export const useTeachers = (params?: any, id?: number) => {
  const queryClient = useQueryClient();

  // 1. Teacher ma'lumotlarini olish
  const { data } = useQuery({
    enabled: !!params,
    queryKey: ["teacher", params],
    queryFn: () => TeacherService.getTeacher(params),
  });

  // 2. Teacher'ga biriktirilgan guruhlar ro'yxatini olish
  const {
    data: teacherGroupsData,
    isLoading: isLoadingGroups,
    isError: isGroupsError,
  } = useQuery({
    enabled: id === undefined, // id bo'lmasa, teacherGroups olib kelinadi
    queryKey: ["teacher-groups"],
    queryFn: () => TeacherService.getTeacherGroups(),
  });

  const teacherGroups = teacherGroupsData?.data || [];

  // 3. Teacher guruhining studentlarini olish
  const {
    data: groupStudentsData,
    isLoading: isLoadingStudents,
    isError: isStudentsError,
  } = useQuery({
    enabled: !!id,
    queryKey: ["teacher-group-students", id],
    queryFn: () => TeacherService.getTeacherGroupById(id!),
  });

  // 4. Teacher yaratish
  const useTeacherCreate = () => {
    return useMutation({
      mutationFn: (data: any) => TeacherService.createTeacher(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["teacher"] });
      },
    });
  };

  // 5. Teacher yangilash
  const useTeacherUpdate = () => {
    return useMutation({
      mutationFn: ({ id, data }: { id: number; data: any }) =>
        TeacherService.updateTeacher(data, id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["teacher"] });
      },
    });
  };

  // 6. Teacher o‘chirish
  const useTeacherDelete = () => {
    return useMutation({
      mutationFn: (id: number) => TeacherService.deleteTeacher(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["teacher"] });
      },
    });
  };

  return {
    data,
    teacherGroups,
    students: groupStudentsData,
    isLoadingGroups,
    isGroupsError,
    isLoadingStudents,
    isStudentsError,
    useTeacherCreate,
    useTeacherUpdate,
    useTeacherDelete,
  };
};

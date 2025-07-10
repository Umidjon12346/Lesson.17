import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TeacherService } from "../service/teacher.service";

export const useTeachers = () => {
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["teacher"],
    queryFn: async () => TeacherService.getTeacher(),
  });
  const useTeacherCreate = () => {
    return useMutation({
      mutationFn: async (data: any) => TeacherService.createTeacher(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["teacher"] });
      },
    });
  };
  const useTeacherUpdate = () => {
    return useMutation({
      mutationFn: async ({ id, data }: { id: number; data: any }) =>
        TeacherService.updateTeacher( data,id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["teacher"] });
      },
    });
  };
  const useTeacherDelete = () => {
    return useMutation({
      mutationFn: async (id: number) => TeacherService.deleteTeacher(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["teacher"] });
      },
    });
  };
  return { useTeacherCreate, data, useTeacherUpdate, useTeacherDelete };
};

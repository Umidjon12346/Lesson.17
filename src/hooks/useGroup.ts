import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GroupService } from "../service/groups.service";

export const useGroup = (params: any, id?: number) => {
  const queryClient = useQueryClient();
  const { data } = useQuery({
    enabled:!id,
    queryKey: ["groups", params],
    queryFn: () => GroupService.getGroups(params),
  });

    const getGroupLessonsQuery = useQuery({
      enabled: !!id,
      queryKey: ["group-lessons"],
      queryFn: async () => GroupService.getGroupLessons(id!),
    });
    const lessons = getGroupLessonsQuery.data;


  const getGroupStudentsQuery = useQuery({
    enabled: !!id,
    queryKey: ["group-students"],
    queryFn: async () => GroupService.getGroupStudents(id!),
  });
  const students = getGroupStudentsQuery.data;

  const getGroupTeachersQuery = useQuery({
    enabled: !!id,
    queryKey: ["group-teachers"],
    queryFn: async () => GroupService.getGroupTeachers(id!),
  });
  const teachers = getGroupTeachersQuery.data;

  const createGroupMutation = () => {
    return useMutation({
      mutationFn: (data: any) => GroupService.createGroup(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["groups"] });
      },
    });
  };
  const updateGroupMutation = () => {
    return useMutation({
      mutationFn: ({ data, id }: { data: any; id: number }) =>
        GroupService.editGroup(id, data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["groups"] });
      },
    });
  };

  const useDeleteGroup = () => {
    return useMutation({
      mutationFn: ({ id }: { id: number }) => GroupService.deleteGroup(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["groups"] });
      },
    });
  };
  return {
    data,
    students,
    teachers,
    lessons,
    createGroupMutation,
    useDeleteGroup,
    updateGroupMutation,
  };
};

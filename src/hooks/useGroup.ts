import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GroupService } from "../service/groups.service";

export const useGroup = (params:any) => {
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["groups", params],
    queryFn: () => GroupService.getGroups( params ),
  });

  const createGroupMutation = () => {
    return useMutation({
      mutationFn: (data: any) => GroupService.createGroup(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["groups"] });
      },
    });
  };
  const updateGroupMutation = () => {
    useMutation({
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
    createGroupMutation,
    useDeleteGroup,
    updateGroupMutation,
    data,
  };
};

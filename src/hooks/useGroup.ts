import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GroupService } from "../service/groups.service";

export const useGroup = () => {
    const queryClient = useQueryClient()
  const getGroupsQuery = useQuery({
    queryKey: ["groups"],
    queryFn: () => GroupService.getGroups(),
  });

  const createGroupMutation = useMutation({
    mutationFn: (groupData: any) => GroupService.createGroup(groupData),
    onSuccess:()=>{
        queryClient.invalidateQueries({queryKey:["groups"]})
    }
  });
  const updateGroupMutation = useMutation({
    mutationFn: ({ updateData, id }: { updateData: any; id: number }) =>
      GroupService.editGroup(id, updateData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
  });

  const deleteGroupMutation = useMutation({
    mutationFn: ({ id }: { id: number }) => GroupService.deleteGroup(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
  });
  return {
    createGroupMutation,
    deleteGroupMutation,
    updateGroupMutation,
    getGroupsQuery
  };
};

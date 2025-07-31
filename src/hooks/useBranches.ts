import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BranchService} from "../service/branch.service";

export const useBranches = (params:any) => {
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["branches",params],
    queryFn: async () => BranchService.getBranches(params),
  });
  
  const useBranchCreate = () => {
    return useMutation({
      mutationFn: async (data: any) => BranchService.createBranch(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["branches"] });
      },
    });
  };
  const useBranchUpdate = () => {
    return useMutation({
      mutationFn: async ({ id, data }: { id: number; data: any }) =>
        BranchService.updateBranch( data,id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["branches"] });
      },
    });
  };
  const useBranchDelete = () => {
    return useMutation({
      mutationFn: async (id: number) => BranchService.deleteBranch(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["branches"] });
      },
    });
  };
  return { useBranchCreate, data, useBranchUpdate, useBranchDelete };
};

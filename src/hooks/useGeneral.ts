import { useNavigate } from "react-router-dom";
import type { Paginationconfig } from "../types/general";
import {  useMutation } from "@tanstack/react-query";
import { GeneralService } from "../service/general.service";

export const useGeneral = () => {
  // const queryClient = useQueryClient()
  const navigate = useNavigate();
  const handleTableChanges = ({ pagination, setParams }: Paginationconfig) => {
    const { current, pageSize } = pagination;
    
    setParams({
      page: current!,
      limit: pageSize!,
    });
    const searchParams = new URLSearchParams();
    searchParams.set("page", current!.toString());
    searchParams.set("limit", pageSize!.toString());
    navigate({ search: `?${searchParams.toString()}` });  
  };
const updateLessonStatus = () => {
  return useMutation({
    mutationFn: ({
      id,
      status,
      description,
    }: {
      id: number;
      status: string;
      description: string;
    }) => GeneralService.updateLessonStatus(id, { status, description }),
  });
};



  return {
    handleTableChanges,
    updateLessonStatus,
  };


};

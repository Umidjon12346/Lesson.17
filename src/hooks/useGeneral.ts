import { useNavigate } from "react-router-dom";
import type { Paginationconfig } from "../types/general";

export const useGeneral = () => {
  const navigate = useNavigate();
  const handleTableChange = ({ pagination, setParams }: Paginationconfig) => {
    const { current, pageSize } = pagination;
    console.log(pagination);
    
    setParams({
      page: current!,
      limit: pageSize!,
    });
    const searchParams = new URLSearchParams();
    searchParams.set("page", current!.toString());
    searchParams.set("limit", pageSize!.toString());
    navigate({ search: `?${searchParams.toString()}` });
    console.log(searchParams);
    
  };

  return {
    handleTableChange
  }
};

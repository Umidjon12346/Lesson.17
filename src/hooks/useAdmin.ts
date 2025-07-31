import { useQuery } from "@tanstack/react-query";
import { adminService } from "../service/admin.service";

export const useAdmin = () => {

  const { data } = useQuery({
    queryKey: ["admin"],
    queryFn: async () => adminService.adminProfile(),
  });

return {
    data
}
}
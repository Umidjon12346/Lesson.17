import { RoomService } from "../service/room.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {  Room } from "../types/room";
import { useNavigate } from "react-router-dom";

export const useRoom = (params: any) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["rooms", params],
    queryFn: async () => RoomService.getRooms(params),
  });
  const handlePagination = (pagination: any, setParams: any) => {
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

  const useRoomCreate = () => {
    return useMutation({
      mutationFn: async (data: Room) => RoomService.createRoom(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["rooms"] });
      },
    });
  };

  const useRoomUpdate = () => {
    return useMutation({
      mutationFn: async ({ model, id }: { model: Room; id: number }) =>
        RoomService.updateRoom(model, id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["rooms"] });
      },
    });
  };

  const useRoomDelete = () => {
    return useMutation({
      mutationFn: async (id: number) => RoomService.deleteRoom(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["rooms"] });
      },
    });
  };

  return {
    data,
    useRoomCreate,
    useRoomDelete,
    useRoomUpdate,
    handlePagination,
  };
};

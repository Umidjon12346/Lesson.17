import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CourseService } from "../service/course.service";

export const useCourse = (params:any) => {
  const queryClient = useQueryClient()
  const { data } = useQuery({
    queryKey: ["courses", params],
    queryFn: () => CourseService.getCourses(params),
  });

  const createCourseMutation = () => {
      return useMutation({
        mutationFn: (data: any) => CourseService.createCourses(data),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["groups"] });
        },
      });
    };
    const updateCourseMutation = () => {
      return useMutation({
        mutationFn: ({ data, id }: { data: any; id: number }) =>
          CourseService.updateCourses( data,id),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["groups"] });
        },
      });
    };
const useDeleteCourse = () => {
  return useMutation({
    mutationFn: async (id: number) => CourseService.deleteCourses(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["student"] });
    },
  });
};
  return {
    data,
    useDeleteCourse,
    updateCourseMutation,
    createCourseMutation,
  };
};

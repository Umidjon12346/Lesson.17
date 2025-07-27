export class ApiUrls {
  public static LOGIN: string = "/log-in";

  public static Groups: string = "/group";

  public static Course: string = "/courses";

  public static STUDENT: string = "/students";

  public static Teacher: string = "/teacher";

  public static BRANCH: string = "/branches";

  public static ROOM: string = "/rooms";

  //Lessons
  public static LESSONS: string = "/lessons";
  public static GROUP_LESSONS: string = this.LESSONS + "/group";

  //Group teachers
  public static GROUP_TEACHERS: string = "/group-teachers";
  public static GROUP_TEACHERS_BY_GROUP_ID: string = "/group-teachers/by-group";


  // Group Students
  public static GROUP_STUDENTS: string = "/group-students";
  public static GROUP_STUDENTS_BY_GROUP_ID: string = "/group-students/by-group";
}

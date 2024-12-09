import EmployeeAccessAttendanceCalendar from "@/pages/employee_access/attendance";
import TeamAttendanceCalendar from "@/pages/employee_access/attendance/TeamAttendance";

export const AttendanceRoutes = [
  {
    path: "",
    element: <EmployeeAccessAttendanceCalendar />,
  },
  {
    path: "team-attendance",
    element: <TeamAttendanceCalendar />,
  },
];
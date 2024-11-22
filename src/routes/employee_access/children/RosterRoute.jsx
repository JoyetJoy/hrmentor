import EmployeeAccessRosterCalendar from "@/pages/employee_access/roster";
import EmployeeAccessTeamRoster from "@/pages/employee_access/roster/TeamRoster";

export const RosterRoutes = [
  {
    path: "",
    element: <EmployeeAccessRosterCalendar />,
  },
  {
    path: "teamroster",
    element: <EmployeeAccessTeamRoster />,
  },
  
];
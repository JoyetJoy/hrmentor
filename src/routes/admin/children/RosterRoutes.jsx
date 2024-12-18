import RosterList from "@/pages/admin/masters/roster/Index";
import RosterCalendar from "@/pages/admin/masters/roster/calender/Calender";
import RosterDepartment from "@/pages/admin/masters/roster/calender/Department";
import { RosterCalendarView } from "@/pages/admin/masters/roster/calender/calenderview";

export const RosterRoutes = [
  {
    path: "",
    element: <RosterList />,
  },
  {
    path: "calendar",
    element: <RosterDepartment />,
  },
  {
    path: "calendarview",
    element: <RosterCalendarView />,
  },
];

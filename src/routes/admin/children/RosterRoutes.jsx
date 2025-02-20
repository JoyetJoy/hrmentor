import RosterCalendar from "@/pages/admin/masters/roster/calender/Calender";
import RosterDepartment from "@/pages/admin/masters/roster/calender/Department";
import { RosterCalendarView } from "@/pages/admin/masters/roster/calender/calenderview";
import RosterLists from "@/pages/admin/masters/roster/RosterList";

export const RosterRoutes = [
  {
    path: "",
    element: <RosterDepartment />,
  },
  {
    path: "List",
    element: <RosterLists />,
  },
  {
    path: "calendarview",
    element: <RosterCalendarView />,
  },
];

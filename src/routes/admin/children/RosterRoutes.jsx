import RosterDepartment from "@/pages/admin/masters/roster/calender/Department";
import RosterLists from "@/pages/admin/masters/roster/RosterList";

export const RosterRoutes = [
  {
    path: "",
    element: <RosterDepartment />,
  },
  {
    path: "rosterpdf",
    element: <Rosterpdf />,
  },
  {
    path: "List",
    element: <RosterLists />,
  },
 
];

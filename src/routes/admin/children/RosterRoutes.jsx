import RosterDepartment from "@/pages/admin/masters/roster/calender/Department";
import RosterLists from "@/pages/admin/masters/roster/RosterList";
import Rosterpdf from "@/pages/admin/masters/roster/Rosterpdf";

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

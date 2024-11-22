import TimeSheet from "@/pages/employee_access/timesheet";
import TeamTimeSheet from "@/pages/employee_access/timesheet/TeamTimeSheet";

export const TimeSheetRoutes = [
    {
      path: "",
      element: <TimeSheet />,
    },
    {
      path:"team",
      element:<TeamTimeSheet/>
    }
  
    
  ];
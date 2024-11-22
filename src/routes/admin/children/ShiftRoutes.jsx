import RosterDepartment from "@/pages/admin/masters/roster/calender/Department";
import ShiftList from "@/pages/admin/masters/shift/view";
import SaveMasterShift from "@/pages/admin/masters/shift/view/Save";
import EmployeeAttendanceCalendar from "@/pages/admin/menu/attendance/Index";

export const ShiftRoutes =[
    {
        path: "",
        element: <ShiftList />,
      },
      {
        path: "calender",
        element: <EmployeeAttendanceCalendar />,
      },
      
      {
        path: "save-shift",
        element: <SaveMasterShift />,
      },
      {
        path: "calender-department",
        element: <RosterDepartment />,
      },
]
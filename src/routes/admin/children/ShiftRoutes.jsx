import { ShiftCalendarView } from "@/pages/admin/masters/roster/calender/calenderview";
import ShiftDepartment from "@/pages/admin/masters/shift/calender/Department";
import ShiftLists from "@/pages/admin/masters/shift/ShiftList";
import SaveMasterShift from "@/pages/admin/masters/shift/view/Save";
import EmployeeAttendanceCalendar from "@/pages/admin/menu/attendance/employeeAttendance";

export const ShiftRoutes =[
    // {
    //     path: "",
    //     element: <ShiftList />,
    //   },
    {
        path: "",
        element: <ShiftDepartment />,
      },
    {
        path: "List",
        element: <ShiftLists />,
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
        path: "calendarview",
        element: <ShiftCalendarView />,
      }
]
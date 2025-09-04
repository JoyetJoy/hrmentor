import  Leave from "@/pages/employee_access/leave";
import BankHoliday from "@/pages/employee_access/leave/BankHoliday";
import TeamLeaveRequest from "@/pages/employee_access/leave/team";
import TeamLeave from "@/pages/employee_access/leave/TeamLeave";

export const LeaveRoute = [
    {
        path:"request",
        element: <Leave/>
    },
    {
        path:"bank-holiday",
        element:<BankHoliday/>
    },
    {
        path:"team-leave",
        element:<TeamLeave/>
    },
    {
        path:"team-request",
        element:<TeamLeaveRequest/>
    },
];

import Leave from "@/pages/employee_access/leave";
import BankHoliday from "@/pages/employee_access/leave/BankHoliday";
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
];

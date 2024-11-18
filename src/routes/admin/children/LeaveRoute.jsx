import { LeaveHolidayrequestList } from "@/pages/admin/masters/leave/Index"
import { AwaitingapprovalList } from "@/pages/admin/masters/leave/holidayrequest/Awaitingapproval"
import { CompletedList } from "@/pages/admin/masters/leave/holidayrequest/Completed"
import BankHolidays from "@/pages/admin/masters/leave/bankholidays/Index"
import { HolidayList } from "@/pages/admin/masters/leave/settings/Index"

export const LeaveRoutes = [
    {
      path: "holidayrequest",
      children: [
        {
            path: "",
            element: <LeaveHolidayrequestList />,
        },
        {
            path: "awaitingapproval",
            element: <AwaitingapprovalList />,
        },
        {
            path: "completed",
            element: <CompletedList />,
        },
      ],
    },
    {
      path: "bankholidays",
      children: [
        {
            path: "",
            element: <BankHolidays />,
        },
        {
            path: "awaitingapproval",
            element: <AwaitingapprovalList />,
        },
        {
            path: "completed",
            element: <CompletedList />,
        },
      ],
    },{
      path: "settings",
      children: [
        {
            path: "",
            element: <HolidayList />,
        },
      ],
    },
]  
import { LeaveHolidayrequestList } from "@/pages/admin/masters/leave/Index";
import { AwaitingapprovalList } from "@/pages/admin/masters/leave/holidayrequest/Awaitingapproval";
import { CompletedList } from "@/pages/admin/masters/leave/holidayrequest/Completed";
import BankHolidays from "@/pages/admin/masters/leave/bankholidays/Index";
import { HolidayList } from "@/pages/admin/masters/leave/settings/Index";
import { BaseSettings } from "@/pages/admin/masters/leave/settings/Base";
import { Availability } from "@/pages/admin/masters/leave/settings/Availability";
import { Advanced } from "@/pages/admin/masters/leave/settings/Advanced";

export const LeaveRoutes = [
  {
    path: "request",
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
    ],
  },
  {
    path: "settings",
    children: [
      {
        path: "",
        element: <HolidayList />,
      },
      {
        path: "basesettings",
        element: <BaseSettings />,
      },
      {
        path: "availabilitysettings/:id",
        element: <Availability />,
      },
      {
        path: "advancedsettings/:id",
        element: <Advanced />,
      },
    ],
  },
];

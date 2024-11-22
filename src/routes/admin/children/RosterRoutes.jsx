import Claim from "@/pages/admin/masters/roster/Claim";
import RosterList from "@/pages/admin/masters/roster/Index";
import RosterCalendar from "@/pages/admin/masters/roster/calender/Calender";
export const RosterRoutes =[
    {
        path:"",
        element:<RosterList/>,
      },
        {
          path:"claim",
          element:<Claim/>
        },
        {
          path:"calendar",
          element:<RosterCalendar/>
        }
]
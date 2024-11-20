import Claim from "@/pages/admin/masters/roster/Claim";
import RosterList from "@/pages/admin/masters/roster/Index";

export const RosterRoutes =[
    {
        path:"",
        element:<RosterList/>,
      },
        {
          path:"claim",
          element:<Claim/>
        }
]
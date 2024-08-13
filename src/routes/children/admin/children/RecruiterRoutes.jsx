
import RecruiterDashbaord from "@/pages/admin/menu/recruiter";
import RecruiterJobs from "@/pages/admin/menu/recruiter/jobs";
import Candidate from "@/pages/admin/menu/recruiter/jobs/candidate";
import Promote from "@/pages/admin/menu/recruiter/jobs/promote";
import Refer from "@/pages/admin/menu/recruiter/jobs/refer";

 export  const  RecruiterRoutes = [
 {
    path:"dashbord",
    element:<RecruiterDashbaord/>
 },
 {
    path:"jobs",
    element:<RecruiterJobs/>
 },
 {
    path:"candidate",
    element:<Candidate/>
 },
 {
   path:"promote",
   element:<Promote/>
 },
 {
path:'refer',
element:<Refer/>
 },
 ]


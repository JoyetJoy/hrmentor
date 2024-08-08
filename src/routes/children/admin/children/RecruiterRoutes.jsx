
import RecruiterDashbaord from "@/pages/admin/menu/recruiter";
import RecruiterJobs from "@/pages/admin/menu/recruiter/jobs";
import Candidate from "@/pages/admin/menu/recruiter/jobs/candidate";

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
 }
 ]


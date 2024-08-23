
import RecruiterDashbaord from "@/pages/admin/menu/recruiter";
import CandidatesList from "@/pages/admin/menu/recruiter/candidate";
import AddCandidates from "@/pages/admin/menu/recruiter/candidate/addcandidates";
import Discussions from "@/pages/admin/menu/recruiter/candidate/details/discussions";
import Documents from "@/pages/admin/menu/recruiter/candidate/details/documents";
import Email from "@/pages/admin/menu/recruiter/candidate/details/email";
import History from "@/pages/admin/menu/recruiter/candidate/details/history";
import Interviews from "@/pages/admin/menu/recruiter/candidate/details/interviews";
import Profile from "@/pages/admin/menu/recruiter/candidate/details/profile";
import Question from "@/pages/admin/menu/recruiter/candidate/details/question";
import RecruiterJobs from "@/pages/admin/menu/recruiter/jobs";
import Candidate from "@/pages/admin/menu/recruiter/jobs/candidate";
import Application from "@/pages/admin/menu/recruiter/jobs/createJob/application";
import Interview from "@/pages/admin/menu/recruiter/jobs/createJob/interview";
import Post from "@/pages/admin/menu/recruiter/jobs/createJob/post";
import Team from "@/pages/admin/menu/recruiter/jobs/createJob/team";
import JobDetails from "@/pages/admin/menu/recruiter/jobs/jobdetails";
import Promote from "@/pages/admin/menu/recruiter/jobs/promote";
import Refer from "@/pages/admin/menu/recruiter/jobs/refer";

 export  const  RecruiterRoutes = [
 {
    path:"index",
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
path:"refer",
element:<Refer/>
 },
 {
 path:"job-details",
 element:<JobDetails/>
 },
 {
   path:"post",
   element:<Post/>
 },
 {
   path:"application",
   element:<Application/>
 },
 {
   path:"interview",
   element:<Interview/>
 },
 {
   path:"promote",
   element:<Promote/>
 },
  {
   path:"create-job-refer",
   element:<Refer/>
 },
 {
   path:"team",
   element:<Team/>
 },
//  ------candidate----------
 {
  path:"candidatelist",
  element:<CandidatesList/>
 },
 {
  path:"add-candidate",
  element:<AddCandidates/>
 },
 {
  path:"profile",
  element:<Profile/>
 },
 {
  path:"interviews",
  element:<Interviews/>
 },
 {
path:"question-answers",
element:<Question/>
 },
 {
  path:"discussions",
  element:<Discussions/>
 },
 {
  path:"documents",
  element:<Documents/>
 },
 {
  path:"email",
  element:<Email/>
 },
 {
  path:"history",
  element:<History/>
 },

 
 ]


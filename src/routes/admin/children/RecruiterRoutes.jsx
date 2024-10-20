import RecruiterDashbaord from "@/pages/admin/menu/recruiter";
import CandidatesList from "@/pages/admin/menu/recruiter/candidate/CandidateList";
import Discussions from "@/pages/admin/menu/recruiter/candidate/details/discussions";
import Documents from "@/pages/admin/menu/recruiter/candidate/details/documents";
import Consider from "@/pages/admin/menu/recruiter/candidate/details/email/Consider";
import CustomMail from "@/pages/admin/menu/recruiter/candidate/details/email/CustomMail";
import InterviewResult from "@/pages/admin/menu/recruiter/candidate/details/email/InterviewResult";
import InterviewSchedule from "@/pages/admin/menu/recruiter/candidate/details/email/InterviewSchedule";
import MoveHiring from "@/pages/admin/menu/recruiter/candidate/details/email/MoveHiring";
import WelcomeMail from "@/pages/admin/menu/recruiter/candidate/details/email/WelcomeMail";
import History from "@/pages/admin/menu/recruiter/candidate/details/history";
import Interviews from "@/pages/admin/menu/recruiter/candidate/details/interviews";
import Question from "@/pages/admin/menu/recruiter/candidate/details/question";
import InterviewMain from "@/pages/admin/menu/recruiter/interview";
import RecruiterJobs from "@/pages/admin/menu/recruiter/jobs";
import Candidate from "@/pages/admin/menu/recruiter/jobs/candidate";
import { InterviewGuide } from "@/pages/admin/menu/recruiter/jobs/createJob/InterviewGuide";
import JobInterview from "@/pages/admin/menu/recruiter/jobs/createJob/jobinterview";
import RecruiterJobPost from "@/pages/admin/menu/recruiter/jobs/createJob/Save";
import { RequestRefferal } from "@/pages/admin/menu/recruiter/jobs/createJob/RequestRefferal";
import JobDetails from "@/pages/admin/menu/recruiter/jobs/jobdetails";
import Promote from "@/pages/admin/menu/recruiter/jobs/promote";
import Refer from "@/pages/admin/menu/recruiter/jobs/refer";
import RecruiterReports from "@/pages/admin/menu/recruiter/report";
import { RecruiterSettingCandidateType } from "@/pages/admin/menu/recruiter/settings/CandidateType";
import { RecruiterSettingQualification } from "@/pages/admin/menu/recruiter/settings/EducationQualification";
import { RecruiterSettingJobDescription } from "@/pages/admin/menu/recruiter/settings/Index";
import { Integrations } from "@/pages/admin/menu/recruiter/settings/Integrations";
import { RecruiterSettingInterviewType } from "@/pages/admin/menu/recruiter/settings/InterviewType";
import { RecruiterSettingMinimumExperience } from "@/pages/admin/menu/recruiter/settings/MinimumExperience";
import { RecruiterSettingProfileQuestion } from "@/pages/admin/menu/recruiter/settings/ProfileQuestions";
import { RecruiterSettingSources } from "@/pages/admin/menu/recruiter/settings/Sources";
import SaveCandidates from "@/pages/admin/menu/recruiter/candidate/Save";
import CandidateProfile from "@/pages/admin/menu/recruiter/candidate/details/profile";
import JobApplicationQuestion from "@/pages/admin/menu/recruiter/jobs/createJob/RecJobApplication";
import RecJobHiringTeam from "@/pages/admin/menu/recruiter/jobs/createJob/HiringTeam";

export const RecruiterRoutes = [
  {
    index: true,
    element: <RecruiterDashbaord />,
  },
  {
    path: "candidate",
    element: <Candidate />,
  },
  {
    path: "promote",
    element: <Promote />,
  },
  {
    path: "refer",
    element: <Refer />,
  },
  {
    path: "job-details",
    element: <JobDetails />,
  },

  // ---- Job ----
  {
    path: "jobs",
    children: [
      {
        path: "",
        element: <RecruiterJobs />,
      },
      {
        path: "post",
        element: <RecruiterJobPost />,
      },
      {
        path: "application-question",
        element: <JobApplicationQuestion />,
      },
      {
        path: "team",
        element: <RecJobHiringTeam />,
      },
    ],
  },

  {
    path: "interview",
    element: <JobInterview />,
  },
  {
    path: "interview-guide",
    element: <InterviewGuide />,
  },
  {
    path: "request-refferals",
    element: <RequestRefferal />,
  },
  {
    path: "settings",
    children: [
      {
        path: "job-description",
        element: <RecruiterSettingJobDescription />,
      },
      {
        path: "profile-questions",
        element: <RecruiterSettingProfileQuestion />,
      },
      {
        path: "education-qualification",
        element: <RecruiterSettingQualification />,
      },
      {
        path: "interview-type",
        element: <RecruiterSettingInterviewType />,
      },
      {
        path: "candidate-type",
        element: <RecruiterSettingCandidateType />,
      },
      {
        path: "minimum-experience",
        element: <RecruiterSettingMinimumExperience />,
      },
      {
        path: "integrations",
        element: <Integrations />,
      },
      {
        path: "sources",
        element: <RecruiterSettingSources />,
      },
    ],
  },
  {
    path: "create-job-promote",
    element: <Promote />,
  },

  //  ----Candidate----
  {
    path: "candidate",
    children: [
      {
        path: "",
        element: <CandidatesList />,
      },
      {
        path: "save",
        element: <SaveCandidates />,
      },
      {
        path: "profile",
        element: <CandidateProfile />,
      },
      {
        path: "interviews",
        element: <Interviews />,
      },
      {
        path: "question-answers",
        element: <Question />,
      },
      {
        path: "discussions",
        element: <Discussions />,
      },
      {
        path: "documents",
        element: <Documents />,
      },
      {
        path: "email",
        children: [
          {
            path: "custom-mail",
            element: <CustomMail />,
          },
          {
            path: "welcome-mail",
            element: <WelcomeMail />,
          },
          {
            path: "interview-schedule",
            element: <InterviewSchedule />,
          },
          {
            Path: "interview-result",
            element: <InterviewResult />,
          },
          {
            path: "consider",
            element: <Consider />,
          },
          {
            path: "move-to-hiring",
            element: <MoveHiring />,
          },
        ],
      },
      {
        path: "history",
        element: <History />,
      },
    ],
  },
  // ----Interview----
  {
    path: "interview",
    children: [
      {
        path: "interview-list",
        element: <InterviewMain />,
      },
    ],
  },
  {
    path: "reports",
    children: [
      {
        path: "job-reports",
        element: <RecruiterReports />,
      },
    ],
  },
];

import RecruiterDashbaord from "@/pages/admin/menu/recruiter";
import CandidatesList from "@/pages/admin/menu/recruiter/candidate/CandidateList";
import Consider from "@/pages/admin/menu/recruiter/candidate/details/email/Consider";
import CustomMail from "@/pages/admin/menu/recruiter/candidate/details/email/CustomMail";
import InterviewResult from "@/pages/admin/menu/recruiter/candidate/details/email/InterviewResult";
import InterviewSchedule from "@/pages/admin/menu/recruiter/candidate/details/email/InterviewSchedule";
import MoveHiring from "@/pages/admin/menu/recruiter/candidate/details/email/MoveHiring";
import WelcomeMail from "@/pages/admin/menu/recruiter/candidate/details/email/WelcomeMail";
import RecruiterJobs from "@/pages/admin/menu/recruiter/jobs/RecJobs";
import JobInterview from "@/pages/admin/menu/recruiter/jobs/createJob/jobinterview";
import RecruiterJobPost from "@/pages/admin/menu/recruiter/jobs/createJob/Save";
import { RecRequestRefferal } from "@/pages/admin/menu/recruiter/jobs/createJob/RequestRefferal";
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
import CandidateProfile from "@/pages/admin/menu/recruiter/candidate/details/CandidateProfile";
import JobApplicationQuestion from "@/pages/admin/menu/recruiter/jobs/createJob/RecJobApplication";
import RecJobHiringTeam from "@/pages/admin/menu/recruiter/jobs/createJob/HiringTeam";
import RecJobInterviewGuide from "@/pages/admin/menu/recruiter/jobs/createJob/InterviewGuide";
import RecPromoteJob from "@/pages/admin/menu/recruiter/jobs/createJob/promote";
import RecViewJobDetail from "@/pages/admin/menu/recruiter/jobs/view/Index";
import CandidateQuestionAnswer from "@/pages/admin/menu/recruiter/candidate/details/CadidateQuestionAnswer";
import CandidateDiscussion from "@/pages/admin/menu/recruiter/candidate/details/CandidateDiscussion";
import CandidateInterviews from "@/pages/admin/menu/recruiter/candidate/details/CandidateInterviews";
import CandidateDocuments from "@/pages/admin/menu/recruiter/candidate/details/CandidateDocuments";
import CandidateHistoryTimeline from "@/pages/admin/menu/recruiter/candidate/details/CandidateHistory";
import RecInterviews from "@/pages/admin/menu/recruiter/interview/RecInterviews";
import RecViewJobPromote from "@/pages/admin/menu/recruiter/jobs/view/Promote";
import RecViewJobRefer from "@/pages/admin/menu/recruiter/jobs/view/Refer";

export const RecruiterRoutes = [
  {
    index: true,
    element: <RecruiterDashbaord />,
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
        path: "view",
        element: <RecViewJobDetail />,
      },
      {
        path: "promote",
        element: <RecViewJobPromote />,
      },
      {
        path: "refer",
        element: <RecViewJobRefer />,
      },
      {
        path: "application-question",
        element: <JobApplicationQuestion />,
      },
      {
        path: "team",
        element: <RecJobHiringTeam />,
      },
      {
        path: "interview-guideline",
        element: <RecJobInterviewGuide />,
      },
      {
        path: "create-refferal",
        element: <RecRequestRefferal />,
      },
      {
        path: "promote-job",
        element: <RecPromoteJob />,
      },
    ],
  },

  {
    path: "interview",
    element: <JobInterview />,
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
        element: <CandidateInterviews />,
      },
      {
        path: "question-answers",
        element: <CandidateQuestionAnswer />,
      },
      {
        path: "discussions",
        element: <CandidateDiscussion />,
      },
      {
        path: "documents",
        element: <CandidateDocuments />,
      },
      {
        path: "history",
        element: <CandidateHistoryTimeline />,
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
    ],
  },
  {
    path: "interviews",
    children: [
      {
        path: "",
        element: <RecInterviews />,
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

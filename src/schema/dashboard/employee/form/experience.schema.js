import * as Yup from "yup";

export const empExperienceSchema = Yup.object({
  job_role: Yup.string().required("Job role is required"),
  employer: Yup.string().required("Employer is required"),
  start_date: Yup.string().required("Start date is required"),
  end_date: Yup.string().required("End date is required"),
  employer_details: Yup.string().required("Employer details is required"),
});

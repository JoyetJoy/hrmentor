import * as Yup from "yup";

export const WorkInfoSchema = Yup.object({
  reporting_manager_id: Yup.string().required("Report Manager is required"),
  hiring_manager_id: Yup.string().required("Hiring Manager is required"),
  eeo_job_category_id: Yup.string().required("eeo jobcategory is required"),
  ethinicity_id: Yup.string().required("Ethinicity_id is required"),
  gender: Yup.string().required("Gender is required"),
  marital_status: Yup.string().required("Marital Status is required"),
  disability: Yup.string().required("Physical / Mental disabilityis required"),
  relegion_belief_id: Yup.string().required("Relegion belief is required"),
  sexual_orientation_id: Yup.string().required("sexualorientation is required"),
  age: Yup.string().required("Age is required"),
  pregnancy_and_maternity: Yup.string().required("Pregnancy and Mmaternity is required"),
});

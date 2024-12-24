import * as Yup from "yup";
export const taskSchema = Yup.object({
  subject: Yup.string(),
  start_date: Yup.string(),
  due_date: Yup.string(),
  priority_id: Yup.string(),
  task_description: Yup.string(),
  status: Yup.string(),
  file: Yup.string(),
});

export const projectSchema = Yup.object({
  project_name: Yup.string().required("Project Name is required"),
  start_date: Yup.string().required("Start Date is required"),
  end_date: Yup.string().required("End date is required"),
  priority_id: Yup.string().required("Priority is required"),
  description: Yup.string(),
  status: Yup.string(),
  created_by: Yup.string(),
  file: Yup.string(),
  members: Yup.array(),
});

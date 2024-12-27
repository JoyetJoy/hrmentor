import * as Yup from "yup";
export const taskSchema = Yup.object({
  subject: Yup.string().required("Subject Name is required"),
  start_date: Yup.string().required("Start Date Name is required"),
  due_date: Yup.string().required("Due Date is required"),
  priority_id: Yup.string().required("Priority is required"),
  task_description: Yup.string().required("Task Description is required"),
  related_to: Yup.string().required("Related To is required"),
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

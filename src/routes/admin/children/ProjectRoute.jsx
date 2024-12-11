import ProjectManagement from "@/pages/admin/masters/project/project_management";
import TaskManagement from "@/pages/admin/masters/project/task_management";

export const ProjectRoutes = [
  {
    path: "/admin/project/projectManagement",
    element: <ProjectManagement />,
  },
  {
    path: "/admin/project/taskManagement",
    element: <TaskManagement />,
  },
];

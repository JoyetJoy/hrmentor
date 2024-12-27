import ProjectManagement from "@/pages/admin/masters/project/project_management";
import ProjectManagementView from "@/pages/admin/masters/project/project_management/view";
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
  {
    path: "/admin/project/projectManagementView",
    element: <ProjectManagementView />,
  },
];

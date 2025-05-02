import ProjectManagement from "@/pages/employee_access/project/project_management";
import ProjectManagementView from "@/pages/employee_access/project/project_management/view";
import TaskManagement from "@/pages/employee_access/project/task_management";

export const ProjectRoutes = [
  {
    path: "projectManagement",
    element: <ProjectManagement />,
  },
  {
    path: "taskManagement",
    element: <TaskManagement />,
  },
  {
    path: "projectManagementView",
    element: <ProjectManagementView />,
  },
];

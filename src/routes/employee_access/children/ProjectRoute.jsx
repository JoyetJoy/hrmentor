import ProjectManagement from "@/pages/employee_access/project/project_management";
import ProjectManagementView from "@/pages/employee_access/project/project_management/view";
import TaskManagement from "@/pages/employee_access/project/task_management";

export const ProjectRoutes = [
  {
    path: "/employee-access/projectManagement",
    element: <ProjectManagement />,
  },
  {
    path: "/employee-access/taskManagement",
    element: <TaskManagement />,
  },
  {
    path: "/employee-access/projectManagementView",
    element: <ProjectManagementView />,
  },
];

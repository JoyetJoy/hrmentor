import SetupList from "@/pages/admin/masters/setup";
import EmailSetup from "@/pages/admin/masters/setup/Email/Folder";
import EmailSetupSave from "@/pages/admin/masters/setup/Email/saveEmail";

export const SetupRoutes = [
        {
            path: "",
            element: <SetupList/>,
          },

          {
            path: "/admin/setup/email",
            element: <EmailSetup/>,
          },

          {
            path: "/admin/setup/email/view",
            element: <EmailSetupSave/>,
          }
    
]
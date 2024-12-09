import SetupList from "@/pages/admin/masters/setup";
import EmailSetup from "@/pages/admin/masters/setup/Email/Folder";
import EmailFolders from "@/pages/admin/masters/setup/Email/Folder/edit_folder";
import EmailSetupSave from "@/pages/admin/masters/setup/Email/saveEmail";
import EmailType from "@/pages/admin/masters/setup/Email/Type";
import EmailTypeSave from "@/pages/admin/masters/setup/Email/Type/save";

export const SetupRoutes = [
  {
    path: "",
    element: <SetupList />,
  },

  {
    path: "/admin/setup/email",
    element: <EmailSetup />,
  },

  {
    path: "/admin/setup/email/view",
    element: <EmailSetupSave />,
  },
  {
    path: "/admin/setup/type",
    element: <EmailType />,
  },
  {
    path: "/admin/setup/type/view",
    element: <EmailTypeSave />,
  },
  {
    path: "/admin/setup/folder/view",
    element: <EmailFolders />,
  },
];

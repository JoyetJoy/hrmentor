import { getemployeeaccessItems } from "@/constants/dummyData";
import { Menu } from "@headlessui/react";
import { ProfileImage } from "@/utils";
import { usePermissionStore } from "@/lib/slices/auth.slice";

export default function ProfileDropdown({ handleNavigation, user }) {
  const { permissions } = usePermissionStore((state) => ({
    permissions: state.permissions,
    }));
    console.log(permissions);
    

    const employeeaccessItems = getemployeeaccessItems(permissions);
  return (
    <div className="relative flex flex-col items-center gap-3">
      <Menu>
        <Menu.Button className="flex cursor-pointer flex-row items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full overflow-hidden bg-hrmprimaryorange/20 text-sm font-bold uppercase">
          <img className="w-full h-full" src={user?.user?.profile_image||ProfileImage} alt="" />
          </div>
          <h1 className="text-textcolor-100 flex flex-col text-start text-sm font-semibold text-hrmdarkblue">
            {user?.user?.name} {user?.user?.sur_name}
            <span className="text-xs font-medium text-gray-lightDim">
              {user?.employee_data?.designation?.designation_name}
            </span>
          </h1>
        </Menu.Button>
        <Menu.Items className="absolute top-12 z-20 w-48 rounded-lg bg-white p-4 shadow-lg">
          <ul className="flex flex-col gap-4">
            {employeeaccessItems.map((item, index) => (
              <Menu.Item key={index}>
                {({ active }) => (
                  <button
                    onClick={() => handleNavigation(item.path)}
                    className={`flex cursor-pointer items-center gap-2 whitespace-nowrap text-[0.8rem] font-semibold ${
                      active ? "" : ""
                    }`}
                  >
                    <div className="h-4 w-4">
                      <img
                        src={item.icon}
                        alt={`${item.label} icon`}
                        className="w-full object-contain"
                      />
                    </div>
                    {item.label}
                  </button>
                )}
              </Menu.Item>
            ))}
          </ul>
        </Menu.Items>
      </Menu>
    </div>
  );
}

import { getadminItems } from "@/constants/dummyData";
import { Menu } from "@headlessui/react";
import { ProfileImage } from "@/utils";
import { useRoleStore } from "@/lib/slices/auth.slice";

export default function ProfileDropdown({ handleNavigation, user, permissions }) {
  const { role } = useRoleStore((state) => ({
      role: state.role,
      }));
console.log(role);

  const adminItems=getadminItems(permissions,role)
  return (
    <div className="relative flex flex-col items-center gap-3">
      <Menu>
        <Menu.Button className="flex cursor-pointer flex-row items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border text-sm font-bold uppercase">
            <img className="h-full w-full object-contain" src={user?.profile_image||ProfileImage} alt="" />
          </div>
          <h1 className="text-textcolor-100 flex flex-col text-start text-sm font-semibold text-hrmdarkblue">
            {user?.first_name} {user?.sur_name}
            <span className="text-xs font-medium text-gray-lightDim">
            {user?.designation_name}
            </span>
          </h1>
        </Menu.Button>
        <Menu.Items className="absolute top-12 z-30 ml-7 w-48 rounded-lg bg-white p-4 shadow-lg">
          <ul className="flex flex-col gap-4">
            {adminItems.map((item, index) => (
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

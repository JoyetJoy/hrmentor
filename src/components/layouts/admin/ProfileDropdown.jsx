import { adminItems } from "@/constants/dummyData";
import { Menu } from "@headlessui/react";
import { useNavigate } from "react-router-dom";

export default function ProfileDropdown({ handleNavigation, user, setUser }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    setUser({});
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div className="relative flex flex-col items-center gap-3">
      <Menu>
        <Menu.Button className="flex cursor-pointer flex-row items-center gap-3">
          <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-100">
            <img
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              className="w-full object-contain"
            />
          </div>
          <h1 className="text-textcolor-100 flex flex-col text-start text-sm font-semibold text-textcolor-darkblue">
            {user.first_name} {user.sur_name}
            <span className="text-xs font-medium text-textcolor-200">
              Administrator
            </span>
          </h1>
        </Menu.Button>
        <Menu.Items className="absolute top-12 z-20 w-48 rounded-lg bg-white p-4 shadow-lg">
          <ul className="flex flex-col gap-5">
            <>
              {adminItems.slice(0, 2).map((item, index) => (
                <Menu.Item key={index}>
                  {({ active }) => (
                    <li
                      onClick={() => handleNavigation(item.path)}
                      className={`flex cursor-pointer items-center gap-2 whitespace-nowrap text-xs font-semibold ${
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
                    </li>
                  )}
                </Menu.Item>
              ))}
            </>
            <>
              {adminItems.slice(2).map((item, index) => (
                <Menu.Item key={index}>
                  {({ active }) => (
                    <li
                      onClick={handleLogout}
                      className={`flex cursor-pointer items-center gap-2 whitespace-nowrap text-xs font-semibold ${
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
                    </li>
                  )}
                </Menu.Item>
              ))}
            </>
          </ul>
        </Menu.Items>
      </Menu>
    </div>
  );
}

import { Share2 } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

function MenuSubHeader(props) {
  const location = useLocation();

  const {
    heading,
    FirstLink,
    SecondLink,
    Firstpath,
    Secondpath,
    currentpage,
    menuicon,
    Secondicon,
  } = props;

  const isPrimaryPath = location.pathname === "/admin/employees/primary";
  const isWorkInformationPath =
    location.pathname === "/admin/employees/work-information";

  return (
    <div>
      <div className="my-1 flex flex-row items-center justify-between">
        <h1 className="flex flex-row items-center justify-center gap-1 text-lg font-bold text-[#2C2C2C]">
          {menuicon}
          {heading} <span className="text-xs">{currentpage}</span>
        </h1>
        {heading !== "Documents" && heading !== "Payslip" && (
          <div className="flex items-center gap-2 font-semibold text-white">
            {isPrimaryPath && (
              <Link
                to=""
                className="btn flex h-11 min-h-11 min-w-40 items-center justify-center gap-1 bg-bgColor-300 px-6 text-xs font-bold text-[#2C2C2C] shadow-none hover:bg-bgColor-300"
              >
                <Share2 className="size-4" color="black" />
                Onboarding Form
              </Link>
            )}
            {isPrimaryPath || isWorkInformationPath ? (
              <Link
                to={Firstpath}
                onClick={FirstLink?.onClick}
                className="btn flex h-11 min-h-11 min-w-28 flex-row bg-[#030E5C] text-xs text-white hover:bg-[#030E5C]"
              >
                {FirstLink?.label}
              </Link>
            ) : (
              <Link
                to={Secondpath}
                onClick={SecondLink?.onClick}
                className="btn h-11 min-h-11 min-w-28 whitespace-nowrap rounded-[0.3rem] bg-[#030E5C] text-xs text-white hover:bg-[#030E5C]"
              >
                {Secondicon}
                {SecondLink?.label}
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default MenuSubHeader;

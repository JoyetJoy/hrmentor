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

  return (
    <div>
      <div className="my-1 flex flex-row items-center justify-between">
        <h1 className="flex flex-row items-center justify-center gap-1 text-lg font-bold text-textcolor-darkCharcoal">
          {menuicon}
          {heading} <span className="text-xs">{currentpage}</span>
        </h1>
        {heading !== "Documents" && heading !== "Payslip" && (
          <div className="flex items-center gap-2 font-semibold text-white">
            <Link
              to={Secondpath}
              onClick={SecondLink?.onClick}
              className="btn h-11 min-h-11 min-w-28 whitespace-nowrap rounded-[0.3rem] bg-hrmblue text-xs text-white hover:bg-hrmblue"
            >
              {Secondicon}
              {SecondLink?.label}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default MenuSubHeader;

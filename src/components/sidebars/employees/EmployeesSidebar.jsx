import React from "react";
import { Link } from "react-router-dom";

function EmployeesSidebar() {
  return (
    <div className="bg-white rounded-b-md ">
      <ul className="flex flex-col items-baseline gap-3">
        <Link to={""}>Primary Information</Link>
        <Link to={""}>Work Information</Link>
        <Link to={""}>Skills/Qulification</Link>
        <Link to={""}>Experience </Link>
        <Link to={""}>Registration&Membership</Link>
        <Link to={""}>Right to work</Link>
        <Link to={""}>Emeergency contacts</Link>
        <Link to={""}>Bank Details</Link>
        <Link to={""}>Compensation</Link>
        <Link to={""}>Documents</Link>
        <Link to={""}>payslip</Link>
      </ul>
    </div>
  );
}

export default EmployeesSidebar;

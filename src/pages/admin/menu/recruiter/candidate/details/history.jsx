import MenuHeader from "@/components/common/MenuHeader";
import React from "react";

function History() {
  return (
    <div>
      <MenuHeader
        backlink={""}
        menu={"Menu"}
        subMenu={""}
        currentpath={"Recruiter"}
        activeSubMenu={"Candidates"}
        activeMenu={"Candidates"}
      />
      <div className=" mx-auto max-w-2xl my-4  w-full table ">
        <table  className="w-full mx-auto table-auto">
          <thead className="overflow-hidden rounded-lg bg-[#D9D9D9]  ">
            <tr className="   px-5 py-5 text-sm font-semibold text-black">
              <th className="">Scheduled</th>
              <th className="">Date</th>
              <th className="">Job Title</th>
              <th className="">Interview Type</th>
            </tr>
          </thead>
          <tbody className=" px-4   bg-transparent border-none">
            <tr className=" text-xs font-medium text-black">
              <td className="">Shahnaz.Shaji(interviewer)</td>
              <td className="">10/5/23</td>
              <td className="">Developer</td>
              <td className="">Telephonic</td>
            </tr>
            <tr className=" py-3 text-xs font-medium text-black">
              <td className="">Shahnaz.Shaji(interviewer)</td>
              <td className="">10/5/23</td>
              <td className="">Developer</td>
              <td className="">Telephonic</td>
            </tr>
            <tr className=" py-3 text-xs font-medium text-black">
              <td className="">Shahnaz.Shaji(interviewer)</td>
              <td className="">10/5/23</td>
              <td className="">Developer</td>
              <td className="">Telephonic</td>
            </tr>
     
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default History;

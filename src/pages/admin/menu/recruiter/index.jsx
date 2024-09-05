import MenuHeader from "@/components/common/MenuHeader";
import QueryTable from "@/components/table/QueryTable";
import { TableData } from "@/constants/tableDummy";
import { MoveDiagonal, } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function RecruiterDashbaord() {
  const list = React.useMemo(() => TableData, [TableData]);
  const columns = React.useMemo(
    () => [
      {
        header: "Name",
        accessorKey: "name",
      },
      { header: "Date Created", accessorKey: "dateCreate" },

      {
        header: "Action",
        accessorKey: "action",
        cell: ({ row }) => (
          <div className="flex relative gap-1 text-xs ">
            <Link
              to={`/sales/invoices/detail-view/${row?.original?.id}`}
              className="cursor-pointer flex items-center  bg-[#EBEBF0] p-2 rounded-full"
            >
              <MoveDiagonal className="size-3" />
              </Link>
          </div>
        ),
      },
    ],

    []
  );
  // const [popupOpen, setPopupOpen] = useState(true);
  return (
    <>
      {/* <AddEducation popupOpen={popupOpen} setPopupOpen={setPopupOpen} /> */}
      <MenuHeader
        backlink={""}
        menu={"Menu"}
        subMenu={""}
        currentpath={"Recruiter"}
        activeMenu={"Dashboard"}
      />
      <div className="grid grid-cols-6 gap-5">
        {/* ---images---- */}
        <div className="">
          <img
            src={"/assets/images/admin/recruiter/Group 1000003983.png"}
            alt=""
          />
        </div>
        <div className="">
          <img
            src={"/assets/images/admin/recruiter/Group 1000003983.png"}
            alt=""
          />
        </div>
        <div className="">
          <img
            src={"/assets/images/admin/recruiter/Group 1000003983.png"}
            alt=""
          />
        </div>
        <div className="">
          <img
            src={"/assets/images/admin/recruiter/Group 1000003983.png"}
            alt=""
          />
        </div>
        <div className="">
          <img
            src={"/assets/images/admin/recruiter/Group 1000003983.png"}
            alt=""
          />
        </div>
        <div className="">
          <img
            src={"/assets/images/admin/recruiter/Group 1000003983.png"}
            alt=""
          />
        </div>
      </div>
      <div className="grid grid-cols-3 my-3 gap-3">
        <div className="overflow-hidden h-full ">
          <h1 className="font-bold mb-4  text-sm text-[#2C2C2C]">Open Jobs</h1>
          <QueryTable className="" columns={columns} list={list} />
        </div>
        <div>
          <h1 className="font-bold text-sm text-[#2C2C2C] mb-4">Interview</h1>
          <div>
            <img src={"/assets/images/admin/recruiter/calender.png"} alt="" />
          </div>
        </div>
        <div>
          <h1 className="font-bold text-sm text-[ #2C2C2C] mb-4">Candidate</h1>
          <div className="bg-white rounded-md  h-full w-full p-5 flex flex-col gap-y-3">
            <div className="bg-[#F5F5F7] w-full h-20 rounded-md flex justify-between items-center py-2  pl-5 pr-9">
              <div className="flex gap-x-2 items-center">
                <div className="avatar">
                  <div className="w-10 rounded-full">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-base">Harshal H</h3>
                  <p
                    className="text-xs text-[#2C2C2C66] font-medium"
                  >
                    UI/UX Design Intern
                  </p>
                </div>
              </div>
              <Link
              to={""}
              className="cursor-pointer flex items-center  bg-[#EBEBF0] p-2 rounded-full"
            >
              <MoveDiagonal className="size-3" />
              </Link>
            </div>
            <div className="bg-[#F5F5F7] w-full h-20 rounded-md flex justify-between items-center py-2 pl-5 pr-9">
              <div className="flex gap-x-2 items-center">
                <div className="avatar">
                  <div className="w-10 rounded-full">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-base">Harshal H</h3>
                  <p
                    className="text-xs text-[#2C2C2C66] font-medium"
                  >
                    UI/UX Design Intern
                  </p>
                </div>
              </div>
              <Link
              to={""}
              className="cursor-pointer flex items-center  bg-[#EBEBF0] p-2 rounded-full"
            >
              <MoveDiagonal className="size-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

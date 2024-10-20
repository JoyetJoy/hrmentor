import MenuHeader from "@/components/common/MenuHeader";
import { ArrowLeft, Plus, Search, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { TableData } from "@/constants/tableDummy";
import QueryTable from "@/components/table/QueryTable";
import CreateJobSideBar from "@/components/sidebars/recruiter/CreateJobSideBar";
import AddHiringTeam from "@/components/popups/recruiter/createjob/AddHiringTeam";
import DeleteHiringTeam from "@/components/popups/recruiter/createjob/DeleteHiringTeam";
import EditHiringTeam from "@/components/popups/recruiter/createjob/EditHiringTeam"; // Import the new popup

function RecJobHiringTeam() {
  const [popupOpen, setPopupOpen] = useState(false); // To open/close popups
  const [popupDelete, setPopupDelete] = useState(false); // To track 'add' or 'delete' popup
  const [popupEditOpen, setPopupEditOpen] = useState(false);

  const [totalPages, setTotalPages] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const list = React.useMemo(() => TableData, [TableData]);
  const location = useLocation();

  const columns = React.useMemo(
    () => [
      {
        header: "Employee name",
        accessorKey: "name",
      },

      {
        header: "Recruiting role",
        accessorKey: "type",
      },
      {
        header: "Designation",
        accessorKey: "designation",
        cell: ({ row }) => <p className="">{row?.original?.designation}</p>,
      },

      // {
      //   header: "Status",
      //   accessorKey: "status",
      //   cell: ({ row }) => (
      //     <div className="bg-[#473A990D] w-fit text-[#7D067F] h-8 px-3 font-medium flex items-center justify-center rounded-md ">
      //       {row?.original?.status}
      //     </div>
      //   ),
      // },
      {
        header: "Action",
        accessorKey: "action",
        cell: ({ row }) => (
          <div className="flex items-center gap-2 text-xs">
            <Link
              to={""}
              onClick={() => setPopupEditOpen(true)}
              className="flex size-7 cursor-pointer items-center rounded-full bg-[#EBEBF0] p-2"
            >
              <img
                src="/assets/icons/admin/marker.svg"
                className="w-full object-contain"
              />
            </Link>
            <Link
              onClick={() => {
                setPopupOpen(true);
                setPopupDelete("delete"); // Open DeleteHiringTeam popup
              }}
              className="flex cursor-pointer items-center justify-center rounded-full bg-[#EBEBF0] p-2"
            >
              <Trash2 className="h-3 w-3 text-[#AB2727]" />
            </Link>
          </div>
        ),
      },
    ],
    [],
  );

  return (
    <div>
      <MenuHeader
        backlink={""}
        menu={"Menu"}
        subMenu={""}
        currentpath={"Recruiter"}
        activeMenu={"Jobs"}
      />
      <div className="flex flex-row items-start justify-between gap-3">
        <div className="w-full">
          <div className="mb-3 mt-1 flex items-center justify-between">
            <h1 className="flex flex-row items-center justify-center gap-2 text-base font-bold text-black">
              <ArrowLeft className="h-4 w-4" />
              Create New Job
              <div className="h-4 w-[.07rem] bg-[#B0B0B0]"></div>
              <span className="text-sm font-medium text-[#2C2C2C]">Team</span>
            </h1>
            <Link
              to={"/admin/recruiter/interview"}
              className="btn h-11 min-h-11 rounded-md bg-bgColor-100 px-6 text-sm font-normal text-white hover:bg-bgColor-100"
            >
              Next
            </Link>
          </div>
          <div className="w-full rounded-md bg-white px-7 py-4">
            <div className="mb-7 flex flex-col gap-1">
              <p className="text-base font-medium text-[#2C2C2C]">
                Choose the right team for the job.
              </p>
              <p className="text-medium text-sm text-[#7F7F7F]">
                This job's hiring team can include group or individual people
                who are helping you fill this position.
              </p>
            </div>
            <div className="my-4 flex items-center justify-between">
              <div className="input-box flex min-h-11 min-w-96 items-center gap-2 rounded-md border border-[#EBEBF0] placeholder:text-black">
                <Search className="h-4 w-4 text-[#7F7F7F]" />
                <input
                  type="text"
                  className="h-full w-full placeholder:text-[#7F7F7F]"
                  placeholder="Search"
                />
              </div>
              <Link
                onClick={() => {
                  setPopupOpen(true);
                  setPopupDelete("add"); // Open AddHiringTeam popup
                }}
                className="btn flex h-11 min-h-11 min-w-44 flex-row items-center gap-1 whitespace-nowrap rounded-[0.3rem] bg-bgColor-100 text-xs text-white hover:bg-bgColor-100"
              >
                <Plus className="h-4 w-4" />
                Add hiring team
              </Link>
            </div>
            <QueryTable
              columns={columns}
              list={list}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
            />
          </div>
        </div>
        <CreateJobSideBar />
      </div>

      {/* Conditionally render the correct popup */}
      {popupDelete === "add" && (
        <AddHiringTeam popupOpen={popupOpen} setPopupOpen={setPopupOpen} />
      )}
      {popupDelete === "delete" && (
        <DeleteHiringTeam
          popupdeleteOpen={popupOpen}
          setPopupdeleteOpen={setPopupOpen}
        />
      )}
      {popupEditOpen && (
        <EditHiringTeam
          popupEditOpen={popupEditOpen}
          setPopupEditOpen={setPopupEditOpen}
        />
      )}
    </div>
  );
}

export default RecJobHiringTeam;

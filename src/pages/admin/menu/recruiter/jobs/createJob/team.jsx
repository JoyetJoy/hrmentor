import MenuHeader from '@/components/common/MenuHeader';
import { ArrowLeft, Plus, Search, Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { TableData } from "@/constants/tableDummy";
import QueryTable from '@/components/table/QueryTable';
import CreateJobSideBar from '@/components/sidebars/recruiter/CreateJobSideBar';
import AddHiringTeam from '@/components/popups/recruiter/createjob/AddHiringTeam';
import DeleteHiringTeam from '@/components/popups/recruiter/createjob/DeleteHiringTeam';
import EditHiringTeam from '@/components/popups/recruiter/createjob/EditHiringTeam'; // Import the new popup

function Team() {
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
        header: "Job Title",
        accessorKey: "name",
      },
      { header: "  Job ID ", accessorKey: "addNo" },
      {
        header: "Date created",
        accessorKey: "dignation",
        cell: ({ row }) => <p className="">{row?.original?.designation}</p>,
      },
      {
        header: "Type",
        accessorKey: "type",
      },
      {
        header: "Department",
        accessorKey: "designation",
        cell: ({ row }) => <p className="">{row?.original?.designation}</p>,
      },
      {
        header: "Location",
        accessorKey: "location",
      },
      {
        header: "Status",
        accessorKey: "status",
        cell: ({ row }) => (
          <div className="bg-[#473A990D] w-fit text-[#7D067F] h-8 px-3 font-medium flex items-center justify-center rounded-md ">
            {row?.original?.status}
          </div>
        ),
      },
      {
        header: "Action",
        accessorKey: "action",
        cell: ({ row }) => (
          <div className="flex items-center gap-2 text-xs">
            <Link
              to={""}
              onClick={() => setPopupEditOpen(true)}
              className="cursor-pointer flex items-center bg-[#EBEBF0] p-2 size-7 rounded-full"
            >
              <img src="/assets/icons/admin/marker.svg" className="w-full object-contain" />
            </Link>
            <Link
              onClick={() => {
                setPopupOpen(true);
                setPopupDelete('delete'); // Open DeleteHiringTeam popup
              }}
              className="cursor-pointer flex justify-center items-center bg-[#EBEBF0] p-2 rounded-full"
            >
              <Trash2 className="w-3 h-3 text-[#AB2727]" />
            </Link>
          </div>
        ),
      },
    ],
    []
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
          <div className="flex items-center justify-between mt-1 mb-3">
            <h1 className="text-lg font-bold text-black flex flex-row gap-2 items-center justify-center">
              <ArrowLeft className="w-5 h-5" />
              Create New Job
              <div className="w-[.07rem] h-4 bg-[#B0B0B0]"></div>
              <span className="text-sm font-medium text-[#2C2C2C]">Post</span>
            </h1>
            <Link
              to={"/admin/recruiter/interview"}
              className="btn text-white rounded-md bg-bgColor-100 px-8 hover:bg-bgColor-100 min-h-11 h-11"
            >
              Next
            </Link>
          </div>
          <div className="w-full bg-white rounded-md py-4 px-7">
            <div className="flex flex-col gap-1 mb-7">
              <p className="font-medium text-[#2C2C2C] text-base">Choose the right team for the job.</p>
              <p className="text-[#7F7F7F] text-sm text-medium ml-4">
                This job's hiring team can include group or individual people who are helping you fill this position.
              </p>
            </div>
            <div className="flex items-center justify-between my-4">
              <div className="flex gap-2 placeholder:text-black items-center rounded-md input-box min-h-11 min-w-96 border border-[#EBEBF0]">
                <Search className="w-4 h-4 text-[#7F7F7F]" />
                <input
                  type="text"
                  className="w-full h-full placeholder:text-[#7F7F7F]"
                  placeholder="Search"
                />
              </div>
              <Link
                onClick={() => {
                  setPopupOpen(true);
                  setPopupDelete('add'); // Open AddHiringTeam popup
                }}
                className="btn bg-[#030E5C] text-white text-xs items-center flex flex-row gap-1 rounded-[0.3rem] hover:bg-[#030E5C] min-w-28 min-h-11 h-11 whitespace-nowrap"
              >
                <Plus className="w-4 h-4" />
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
      {popupDelete === 'add' && (
        <AddHiringTeam popupOpen={popupOpen} setPopupOpen={setPopupOpen} />
      )}
      {popupDelete === 'delete' && (
        <DeleteHiringTeam popupdeleteOpen={popupOpen} setPopupdeleteOpen={setPopupOpen} />
      )}
      {popupEditOpen && (
        <EditHiringTeam popupEditOpen={popupEditOpen} setPopupEditOpen={setPopupEditOpen} />
      )}
    </div>
  );
}

export default Team;

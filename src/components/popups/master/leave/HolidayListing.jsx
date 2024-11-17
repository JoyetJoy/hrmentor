import { newRequest } from "@/api";
import DeleteConfirmation from "@/components/common/DeleteConfirmation";
import LeaveHeader from "@/components/common/LeaveMenuHeader";
import QueryTable from "@/components/table/QueryTable";
import { MoveDiagonal } from "lucide-react";
import { Button } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight,Filter, Plus, Search, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import LeaveRequest from "./LeaveRequest";
// import SaveRecruiterMasterForm from "./Save";
import { SettingsList } from "@/constants/menus/leave";
// import { recruiterSetting } from "@/constants/sidebars/recruiter";
import { SettingsSidebar } from "@/components/sidebars/recruiter/SettingsSidebar";
import Loader from "@/components/ui/Loader";
import LeaveSettingsHeader from "@/components/common/LeaveSettingsHeader";
import Addholiday from "./Addholiday";

export const HolidayListing = ({ api, qrkey, colKeys, type }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [popupOpen, setPopupOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [deletePopup, setDeletePopup] = useState(false);
  const [selectedField, setSelectedField] = useState(0);
  const [addholidayOpen,setAddholidayOpen] = useState(false);
  const pageLimit = 10;

  useEffect(() => {
    if (selectedField) {
      setPopupOpen(true);
    }
  }, [selectedField]);

  // Fetch List
  const { data, isLoading } = useQuery({
    queryKey: [qrkey, currentPage, type, qrkey, keyword],
    queryFn: () =>
      newRequest
        .get(api, {
          params: {
            search: keyword,
            page: currentPage,
            per_limit: pageLimit,
          },
        })
        .then((res) => {
          return res.data;
        }),
  });

  useEffect(() => {
    if (data) {
      setTotalPages(data?.last_page);
    }
  }, [data]);
  const columns = React.useMemo(
    () => [
      {
        header: "Sl No",
        accessorKey: "sno",
        cell: ({ row }) => {
          return (
            <div className="flex px-2">
              {row.index + 1 + (currentPage - 1) * pageLimit}
            </div>
          );
        },
      },
      {
        header: "Holiday Name",
        accessorKey: "job_title",
      },
      {
        header: "Display Name",
        accessorKey: "designation",
        cell: ({ row }) => (
          <p className="">{row?.original?.designation?.designation_name}</p>
        ),
      },
      {
        header: "Type",
        accessorKey: "type",
        cell: ({ row }) => (
          <p className="">
            {row?.original?.employment_type?.employment_type_name}
          </p>
        ),
      },
      {
        header: 'Status',
        accessorKey: "status",
        cell: ({ row }) => {
          const fieldValue = row.original?.status
          return (
            <div
              className={`flex h-8 w-28 items-center justify-center rounded-md px-3 font-semibold ${
                fieldValue === "active"
                  ? "bg-[#e6f8ed] text-[#00b448]"
                  : "bg-[#f7eaea] text-[#db0000]"
              }`}
            >
              {fieldValue ==='active' ? "Active" : "Inactive"}
            </div>
          );
        },
      },
      {
        header: "Action",
        accessorKey: "action",
        cell: ({ row }) => (
          <div className="flex items-center gap-2 text-xs">
            <button
              to={`/admin/recruiter/jobs/post?jid=${row.original.id}`}
              className="flex size-7 cursor-pointer items-center rounded-full bg-gray-soft p-2"
            >
              <img
                src="/assets/icons/admin/marker.svg"
                className="w-full object-contain"
              />
            </button>
              <button
                onClick={() => {
                  setDeletePopup(true);
                  setSelectedField(row?.original?.id);
                }}
                className="flex cursor-pointer items-center justify-center rounded-full bg-gray-soft p-2"
              >
                <Trash2 className="size-3" />
              </button>
          </div>
        ),
      },
    ],
    
    [currentPage, pageLimit, colKeys]
  );
  
  return (
    <>
      <DeleteConfirmation
        open={deletePopup}
        onCancel={setDeletePopup}
        selectedId={selectedId}
        qrkey={qrkey}
        api={api}
      />
      <LeaveRequest
        popupOpen={popupOpen}
        setPopupOpen={setPopupOpen}
        
      />
      <div className="flex flex-col">
      <LeaveHeader page={3} currentPage ={'Settings'} />
        {addholidayOpen?
        <Addholiday/> 
        :(
        <>
            
        <LeaveSettingsHeader setAddholidayOpen={setAddholidayOpen}/>
        <div className="flex gap-x-3">
          <SettingsSidebar sidebarList={SettingsList} active={type} />
          <div className="min-h-[570px] w-full rounded-md bg-white px-5 py-4">
            <div>
              {isLoading ? (
                <Loader />
              ) : (
                <QueryTable
                  columns={columns}
                  list={data?.listing ?? []}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  totalPages={totalPages}
                />
              )}
            </div>
          </div>
        </div>
            </>
        )
        }
      </div>
    </>
  );
};

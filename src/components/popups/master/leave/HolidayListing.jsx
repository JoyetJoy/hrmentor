import { newRequest } from "@/api";
import DeleteConfirmation from "@/components/common/DeleteConfirmation";
import LeaveHeader from "@/components/common/LeaveMenuHeader";
import QueryTable from "@/components/table/QueryTable";
import { useQuery } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import LeaveRequest from "./LeaveRequest";
import { SettingsList } from "@/constants/menus/leave";
import { SettingsSidebar } from "@/components/sidebars/recruiter/SettingsSidebar";
import Loader from "@/components/ui/Loader";
import LeaveSettingsHeader from "@/components/common/LeaveSettingsHeader";
import { useUserStore } from "@/lib/slices/auth.slice";
import BasicSettings from "./settings/BasicSettings";
import { useNavigate } from "react-router-dom";

export const HolidayListing = ({ api, qrkey, colKeys, type }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [popupOpen, setPopupOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [deletePopup, setDeletePopup] = useState(false);
  const [selectedField, setSelectedField] = useState(0);
  const pageLimit = 10;
  const { user } = useUserStore((state) => ({
    user: state.user,
  }));

  const navigate = useNavigate();

  const handleNavigation = (id) => {
    navigate(`/admin/leave/settings/basesettings?id=${id}`);
  };

  // Fetch List
  const { data, isLoading } = useQuery({
    queryKey: [qrkey, currentPage, type, qrkey, keyword, user?.id],
    queryFn: () =>
      newRequest
        .get(api, {
          params: {
            search: keyword,
            page: currentPage,
            per_limit: pageLimit,
            user_id: user?.id,
          },
        })
        .then((res) => {
          return res.data;
        }),
  });

  const removeIdFromLocalStorage = () => {
    const storedData = localStorage.getItem("myData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      delete parsedData.id; // Remove the `id` property
      localStorage.setItem("myData", JSON.stringify(parsedData)); // Save the updated object
    }
  };

  useEffect(() => {
    if (data) {
      setTotalPages(data?.original?.pagination);
      removeIdFromLocalStorage();
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
        accessorKey: "leave_name",
      },
      {
        header: "Display Name",
        accessorKey: "display_name",
        cell: ({ row }) => <p className="">{row?.original?.display_name}</p>,
      },
      {
        header: "Type",
        accessorKey: "pay_type",
        cell: ({ row }) => <p className="">{row?.original?.pay_type}</p>,
      },
      {
        header: "Status",
        accessorKey: "status_name",
        cell: ({ row }) => {
          const fieldValue = row.original?.status?.status_name;
          const isActive = fieldValue === "Active";

          // Define colors based on the status
          const bgColor = isActive ? "bg-green-100" : "bg-red-100";
          const textColor = isActive ? "text-green-600" : "text-red-600";
          const borderColor = isActive ? "border-green-300" : "border-red-300";

          return (
            <div
              className={`flex h-8 w-28 items-center justify-center rounded-md px-3 font-semibold ${bgColor} ${textColor} ${borderColor}`}
            >
              {fieldValue}
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
              onClick={() => handleNavigation(row.original?.id)}
              className="flex size-7 cursor-pointer items-center rounded-full bg-gray-soft p-2"
            >
              <img
                src="/assets/icons/admin/marker.svg"
                className="w-full object-contain"
              />
            </button>
            {/* <button
              onClick={() => {
                setDeletePopup(true);
                setSelectedField(row?.original?.id);
              }}
              className="flex cursor-pointer items-center justify-center rounded-full bg-gray-soft p-2"
            >
              <Trash2 className="size-3" />
            </button> */}
          </div>
        ),
      },
    ],

    [currentPage, pageLimit, colKeys],
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
      <LeaveRequest popupOpen={popupOpen} setPopupOpen={setPopupOpen} />
      <div className="flex flex-col">
        <LeaveHeader page={3} currentPage={"Settings"} />
        <>
          <LeaveSettingsHeader />
          <div className="flex gap-x-3">
            <SettingsSidebar sidebarList={SettingsList} active={type} />
            <div className="min-h-[570px] w-full rounded-md bg-white px-5 py-4">
              <div>
                {isLoading ? (
                  <Loader />
                ) : (
                  <QueryTable
                    columns={columns}
                    list={data?.original?.data ?? []}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalPages={totalPages}
                  />
                )}
              </div>
            </div>
          </div>
        </>
      </div>
    </>
  );
};

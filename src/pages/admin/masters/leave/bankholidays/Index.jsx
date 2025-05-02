import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Filter, MoveDiagonal, Plus, Search, Trash2 } from "lucide-react";
import QueryTable from "@/components/table/QueryTable";
import LeaveHeader from "@/components/common/LeaveMenuHeader";
import { newRequest, TEAM_BANK_HOLIDAY } from "@/api";
import { useQuery } from "@tanstack/react-query";
import Select from "react-select";
import { customSelectStyles } from "@/utils/customStyles";
import dayjs from "dayjs";
import Loader from "@/components/ui/Loader";
import DeleteConfirmation from "@/components/common/DeleteConfirmation";
import AddBankHoliday from "@/components/popups/master/leave/Addbankholiday";
import { usePermissionStore, useUserStore } from "@/lib/slices/auth.slice";

function BankHolidays() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [byStatus, setByStatus] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [deletePopup, setDeletePopup] = useState(false);
  const [selectedField, setSelectedField] = useState("");
  const [date, setDate] = useState(new Date());
  const [popupOpen, setPopupOpen] = useState(false);
  const [type, setType] = useState("");
  const pageLimit = 10;

  const { permissions } = usePermissionStore((state) => ({
    permissions: state.permissions,
  }));
  const { user } = useUserStore((state) => ({
    user: state.user,
  }));
  const months = Array.from({ length: 12 }, (_, i) => ({
    value: i,
    label: dayjs().month(i).format("MMMM"),
  }));

  const years = Array.from({ length: 11 }, (_, i) => ({
    value: 2020 + i,
    label: (2020 + i).toString(),
  }));

  const handleMonthChange = (selectedOption) => {
    const updatedDate = dayjs(date).month(selectedOption.value).toDate();
    setDate(updatedDate);
  };
  const handleYearChange = (selectedOption) => {
    const updatedDate = dayjs(date).year(selectedOption.value).toDate();
    setDate(updatedDate);
  };

  // Fetch List
  const {
    data: bankHolidays,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["bankHolidays", currentPage, byStatus, keyword, user?.id, date],
    queryFn: () =>
      newRequest
        .get(TEAM_BANK_HOLIDAY, {
          params: {
            search: keyword,
            page: currentPage,
            per_limit: pageLimit,
            by_status: byStatus,
            user_id: user?.id,
            date: date,
          },
        })
        .then((res) => res.data),
    enabled: !!user?.id,
  });

  useEffect(() => {
    if (bankHolidays) {
      setTotalPages(bankHolidays?.original?.pagination?.last_page);
    }
  }, [bankHolidays]);

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
        header: "Holiday",
        accessorKey: "leave_name",
      },
      {
        header: "Date",
        accessorKey: "date",
        cell: ({ row }) => (
          <p className="">
            {row.original?.date
              ? dayjs(row.original.date).format("DD-MM-YYYY")
              : "N/A"}
          </p>
        ),
      },
      // {
      //   header: "Description",
      //   accessorKey: "description",
      //   cell: ({ row }) => (
      //     <p className="">
      //       {row.original?.description === "null"
      //         ? ""
      //         : row.original?.description}
      //     </p>
      //   ),
      // },
      {
        header: "Location",
        accessorKey: "location",
        cell: ({ row }) => (
          <p className="">
            {row.original?.work_location?.location_name || "N/A"}
          </p>
        ),
      },
      {
        header: "Type",
        accessorKey: "type",
        cell: ({ row }) => <p className="">{row.original?.type || "N/A"}</p>,
      },
      {
        header: "Action",
        accessorKey: "action",
        cell: ({ row }) => (
          <div className="flex items-center gap-2 text-xs">
            <Link
              className="flex size-7 cursor-pointer items-center rounded-full bg-gray-soft p-2"
              onClick={() => {
                setPopupOpen(true);
                setType("View");
                setSelectedField(row?.original?.id);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-eye"
              >
                <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </Link>
            {permissions.includes("bank-holiday-edit") && (
            <Link
              className="flex size-7 cursor-pointer items-center rounded-full bg-gray-soft p-2"
              onClick={() => {
                setPopupOpen(true);
                setType("Edit");
                setSelectedField(row?.original?.id);
              }}
            >
              <img
                src="/assets/icons/admin/marker.svg"
                className="w-full object-contain"
              />
            </Link>
            )}
          {permissions.includes("bank-holiday-delete") && (
            <button
              onClick={() => {
                setDeletePopup(true);
                setSelectedField(row?.original?.id);
              }}
              className="flex cursor-pointer items-center justify-center rounded-full bg-gray-soft p-2"
            >
              <Trash2 className="size-3" />
            </button>
          )}
          </div>
        ),
      },
    ],
    [bankHolidays, byStatus],
  );
  return (
    <>
      <AddBankHoliday
        popupOpen={popupOpen}
        setPopupOpen={setPopupOpen}
        selectedField={selectedField}
        setSelectedField={setSelectedField}
        type={type}
      />
      <DeleteConfirmation
        open={deletePopup}
        onCancel={setDeletePopup}
        id={selectedField}
        qrkey={"bankHolidays"}
        api={TEAM_BANK_HOLIDAY}
      />
      <LeaveHeader page={2} currentPage={"Bank Holidays"} />
      <div className="items-centerm flex justify-between pb-3 pt-2">
        <div className="flex items-center gap-4">
          <h5 className="text-lg font-bold">Bank Holiday</h5>
          <Select
            options={years}
            isSearchable={true}
            onChange={handleYearChange}
            styles={customSelectStyles}
            placeholder={dayjs(date).format("YYYY")}
            className="input-box h-10 w-40 rounded-md border-gray-muted bg-white focus:border-gray-muted"
          />
          <Select
            options={months}
            isSearchable={true}
            onChange={handleMonthChange}
            styles={customSelectStyles}
            placeholder={dayjs(date).format("MMMM")}
            className="input-box h-10 w-52 rounded-md border-gray-muted bg-white focus:border-gray-muted"
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="input flex h-10 min-h-10 min-w-80 flex-row items-center gap-2 rounded-md border border-gray-platinum outline-none hover:border-gray-platinum">
            <Search
              className="size-4 object-contain text-gray-dark"
              strokeWidth={2}
            />
            <input
              type="text"
              onChange={(e) => {
                setKeyword(e.target.value);
              }}
              value={keyword}
              className="h-full w-full grow text-sm text-black placeholder:text-sm placeholder:font-medium placeholder:text-black/50 focus:outline-none"
              placeholder="Search"
            />
          </label>
          <div className="h-10 min-h-10 rounded-md border border-gray-platinum bg-white p-3">
            <Filter
              className="stroke size-4 font-medium text-black"
              strokeWidth={2}
            />
          </div>
          {permissions.includes("bank-holiday-create") && (
          <button
            onClick={() => {
              setPopupOpen(true);
              setType("Add");
            }}
            className="btn flex h-10 min-h-10 items-center rounded-md bg-hrmprimaryorange px-5 text-xs font-semibold text-white hover:bg-hrmblue"
          >
            <Plus className="size-5" strokeWidth={2} />
            Add Bank Holiday
          </button>
          )}
        </div>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <QueryTable
          columns={columns}
          list={bankHolidays?.original?.data ?? []}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      )}
    </>
  );
}

export default BankHolidays;

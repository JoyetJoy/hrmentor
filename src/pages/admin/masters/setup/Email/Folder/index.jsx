import MenuHeader from "@/components/common/MenuHeader";
import SetUpHeader from "@/components/common/SetupMenuHeader";
import Setup from "@/components/sidebars/setup";
import QueryTable from "@/components/table/QueryTable";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function EmailSetup() {
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [pageLimit, setPageLimit] = useState(10);
  const navigate = useNavigate();

  const List = [
    {
      id: 1,
      business_name: "deded@gmail.com",
    },
    {
      id: 2,
      business_name: "example@gmail.com",
    },
    {
      id: 3,
      business_name: "test@gmail.com",
    },
  ];

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
      {
        header: "Description",
        accessorKey: "description",
        cell: ({ row }) => (
          <p className="">{row.original?.description || "N/A"}</p>
        ),
      },
      {
        header: "Location",
        accessorKey: "location",
        cell: ({ row }) => (
          <p className="">
            {row.original?.work_location?.location_name || "N/A"}
          </p>
        ),
      },
    ],
    [List],
  );

  return (
    <>
      <SetUpHeader menu="Menu" currentpath="Folder"  page={1}/>
      <div className="mb-4 mt-1 flex items-center justify-between">
        <label></label>
        <Link
          to="/admin/setup/email/view"
          className="flex w-fit items-center justify-center gap-2 rounded-md bg-hrmprimaryorange px-5 py-2.5 text-sm font-medium text-white hover:bg-hrmdarkblue/70 focus:outline-none"
        >
          <Plus className="size-4" />
          Add
        </Link>
      </div>
      <div className="flex gap-4">
        <Setup />
        <div className="flex w-full flex-col">
          <div className="flex min-h-[570px] w-full flex-col gap-4 rounded-md bg-white px-5 py-4">
            <QueryTable
              columns={columns}
              list={List} // Corrected here
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
            />
          </div>
        </div>
      </div>
    </>
  );
}

import MenuHeader from "@/components/common/MenuHeader";
import SetUpHeader from "@/components/common/SetupMenuHeader";
import Setup from "@/components/sidebars/setup";
import QueryTable from "@/components/table/QueryTable";
import { Eye, Plus, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function EmailType() {
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
        header: "Email Type",
        accessorKey: "leave_name",
      },

      {
        header: "Action",
        accessorKey: "location",
        cell: ({ row }) => (
          <div className="flex items-center gap-2 text-xs">
            <button
              type="button"
              className="flex size-7 cursor-pointer items-center rounded-full bg-[#EBEBF0] p-2"
            >
              <Eye className="size-3" />
            </button>
            <button
              type="button"
              className="flex size-7 cursor-pointer items-center rounded-full bg-[#EBEBF0] p-2"
            >
              <img
                src="/assets/icons/admin/marker.svg"
                className="w-full object-contain"
              />
            </button>
            <button
              type="button"
              className="flex cursor-pointer items-center justify-center rounded-full bg-[#EBEBF0] p-2 text-[#2C2C2C]"
            >
              <Trash2 className="size-3" />
            </button>
          </div>
        ),
      },
    ],
    [List],
  );

  return (
    <>
      <SetUpHeader menu="Menu" currentpath="Folder" page={2} />
      <div className="mb-4 mt-1 flex items-center justify-between">
        <label></label>
        <Link
          to="/admin/setup/type/view"
          className="flex w-fit items-center justify-center gap-2 rounded-md bg-hrmprimaryorange px-5 py-2.5 text-sm font-medium text-white hover:bg-hrmdarkblue/70 focus:outline-none"
        >
          <Plus className="size-4" />
          Add Type
        </Link>
      </div>
      <div className="flex gap-4">
        <Setup />
        <div className="flex w-full flex-col">
          <div className="space-between flex min-h-[570px] w-full flex-col gap-4 rounded-md bg-white px-5 py-4">
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

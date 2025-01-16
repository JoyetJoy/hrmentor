import { newRequest } from "@/api";
import { EMAIL_TYPE } from "@/api/setup";
import SetUpHeader from "@/components/common/SetupMenuHeader";
import Setup from "@/components/sidebars/setup";
import QueryTable from "@/components/table/QueryTable";
import { useUserStore } from "@/lib/slices/auth.slice";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EmailType() {
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [pageLimit, setPageLimit] = useState(10);
  const navigate = useNavigate();
  const { user } = useUserStore((state) => ({
    user: state.user,
  }));

  const { data: emailType } = useQuery({
    queryKey: ["emailType", user?.id, currentPage, pageLimit],
    queryFn: () =>
      newRequest
        .get(EMAIL_TYPE, {
          params: {
            user_id: user?.id,
            page: currentPage,
            per_limit: pageLimit,
          },
        })
        .then((res) => res.data),
    enabled: user?.id, 
  });
  const columns = React.useMemo(
    () => [
      {
        header: "Email Type",
        accessorKey: "label",
      },

      {
        header: "Action",
        accessorKey: "location",
        cell: ({ row }) => (
          <div className="flex items-center gap-2 text-xs">
            {/* <button
              type="button"
              className="flex size-7 cursor-pointer items-center rounded-full bg-[#EBEBF0] p-2"
            >
              <Eye className="size-3" />
            </button> */}
            <button
              type="button"
              className="flex size-7 cursor-pointer items-center rounded-full bg-[#EBEBF0] p-2"
              onClick={() => {
                const id = row.original.id;
                const label = row.original.label;
                navigate(
                  `/admin/setup/type/view?id=${id}&label=${encodeURIComponent(label)}`,
                );
              }}
            >
              <img
                src="/assets/icons/admin/marker.svg"
                className="w-full object-contain"
              />
            </button>
            {/* <button
              type="button"
              className="flex cursor-pointer items-center justify-center rounded-full bg-[#EBEBF0] p-2 text-[#2C2C2C]"
            >
              <Trash2 className="size-3" />
            </button> */}
          </div>
        ),
      },
    ],
    [emailType, pageLimit],
  );

  return (
    <>
      <SetUpHeader menu="Menu" currentpath="Folder" page={2} />
      <div className="mb-4 mt-1 flex items-center justify-between">
        <label></label>
        {/* <Link
          to="/admin/setup/type/view"
          className="flex w-fit items-center justify-center gap-2 rounded-md bg-hrmprimaryorange px-5 py-2.5 text-sm font-medium text-white hover:bg-hrmdarkblue/70 focus:outline-none"
        >
          <Plus className="size-4" />
          Add Type
        </Link> */}
      </div>
      <div className="flex gap-4">
        <Setup />
        <div className="flex w-full flex-col">
          <div className="space-between flex min-h-[570px] w-full flex-col gap-4 rounded-md bg-white px-5 py-4">
            <QueryTable
              columns={columns}
              list={emailType} // Corrected here
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

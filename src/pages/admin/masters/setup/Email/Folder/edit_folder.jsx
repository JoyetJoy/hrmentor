import { newRequest } from "@/api";
import { EMAIL_TEMPLATE } from "@/api/setup";
import SetUpHeader from "@/components/common/SetupMenuHeader";
import Setup from "@/components/sidebars/setup";
import QueryTable from "@/components/table/QueryTable";
import { useUserStore } from "@/lib/slices/auth.slice";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Eye, Plus, Trash2 } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function EmailFolders() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const label = searchParams.get("label");
  const [loader, setLoader] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [deletePopup, setDeletePopup] = useState(false);
  const [templeteId, setTempleteId] = useState(null);

  const navigate = useNavigate();
  const { user } = useUserStore((state) => ({
    user: state.user,
  }));
  const { data: emailTemplate = [] } = useQuery({
    queryKey: ["emailTemplate", user?.id, id],
    queryFn: () =>
      newRequest
        .get(EMAIL_TEMPLATE, { params: { user_id: user?.id, folder_id: id } })
        .then((res) => res.data.listing),
    enabled: user?.id && id,
  });

  const columns = React.useMemo(
    () => [
      {
        header: "Emails",
        accessorKey: "templete_name",
      },
      {
        header: "Action",
        accessorKey: "location",
        cell: ({ row }) => (
          <div className="flex items-center gap-2 text-xs">
            <button
              type="button"
              className="flex size-7 cursor-pointer items-center rounded-full bg-[#EBEBF0] p-2"
              onClick={() => {
                const id = row.original.id;
                navigate(`/admin/setup/templete/view?id=${id}`);
              }}
            >
              <Eye className="size-3" />
            </button>
            <button
              type="button"
              className="flex size-7 cursor-pointer items-center rounded-full bg-[#EBEBF0] p-2"
              onClick={() => {
                const id = row.original.id;
                navigate(`/admin/setup/templete/edit?id=${id}`);
              }}
            >
              <img
                src="/assets/icons/admin/marker.svg"
                className="w-full object-contain"
              />
            </button>
            <button
              type="button"
              className="flex cursor-pointer items-center justify-center rounded-full bg-[#EBEBF0] p-2 text-[#2C2C2C]"
              onClick={() => {
                setDeletePopup(true);
                setTempleteId(row.original.id);
              }}
            >
              <Trash2 className="size-3" />
            </button>
          </div>
        ),
      },
    ],
    [emailTemplate],
  );

  const handleDelete = async () => {
    setLoader(true);
    try {
      const res = await newRequest.delete(`${EMAIL_TEMPLATE}/${templeteId}`, {
        params: {
          user_id: user?.id,
        },
      });
      if (res) {
        toast.success(res?.data?.message);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.error);
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      <SetUpHeader menu="Menu" currentpath="Folder" page={1} />
      <div className="mb-4 mt-1 flex items-center justify-between">
        <label className="flex items-center gap-2">
          <ArrowLeft
            onClick={() => {
              history.back();
            }}
            className="size-4 cursor-pointer"
          />
          {label}
        </label>
        <button
          onClick={() => {
            navigate(
              `/admin/setup/email/view?id=${id}&label=${encodeURIComponent(label)}`,
            );
          }}
          className="flex w-fit items-center justify-center gap-2 rounded-md bg-hrmprimaryorange px-5 py-2.5 text-sm font-medium text-white hover:bg-hrmdarkblue/70 focus:outline-none"
        >
          <Plus className="size-4" />
          Add Email
        </button>
      </div>
      <div className="flex gap-4">
        <Setup />
        <div className="flex w-full flex-col">
          <div className="flex min-h-[570px] w-full flex-col gap-4 rounded-md bg-white px-5 py-4">
            <QueryTable
              columns={columns}
              list={emailTemplate} // Corrected here
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
            />
          </div>
        </div>
      </div>
      {deletePopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-lg">
            <h2 className="text-lg font-extrabold text-black/70">
              Confirm Delete
            </h2>
            <p className="mt-2 text-sm text-gray-medium">
              Are you sure you want to delete this item? This action cannot be
              undone.
            </p>
            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={() => {
                  setDeletePopup(false);
                }}
                className="rounded-lg border border-gray-light px-4 py-2 text-sm font-semibold text-gray-medium hover:bg-gray-smoke"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
              >
                {loader ? (
                  <div className="flex items-center gap-3">
                    <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
                    Deleting
                  </div>
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

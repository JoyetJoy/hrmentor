import { newRequest } from "@/api";
import DeleteConfirmation from "@/components/common/DeleteConfirmation";
import MenuHeader from "@/components/common/MenuHeader";
import QueryTable from "@/components/table/QueryTable";
import { Button } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import { Plus, Search, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import SaveRecruiterMasterForm from "./Save";
import { recruiterSetting } from "@/constants/sidebars/recruiter";
import { SettingsSidebar } from "@/components/sidebars/recruiter/SettingsSidebar";
import Loader from "@/components/ui/Loader";
import { usePermissionStore } from "@/lib/slices/auth.slice";

export const RecruiterMasters = ({ api, qrkey, colKeys, type }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [popupOpen, setPopupOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [deletePopup, setDeletePopup] = useState(false);
  const [selectedField, setSelectedField] = useState(0);
  const pageLimit = 10;

  const { permissions } = usePermissionStore((state) => ({
    permissions: state.permissions,
  }));
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
    () =>
      [
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
          header: colKeys?.field1?.label,
          accessorKey: colKeys?.field1?.key,
          cell: ({ row, getValue }) => {
            const fieldValue = getValue();
            return (
              <div className="flex max-w-xl items-center gap-3">
                {fieldValue}
                {row?.original?.is_default === "1" ? (
                  <div className="rounded-full border border-[#7F7F7F] px-2 py-0.5 font-semibold text-[#7F7F7F]">
                    Default
                  </div>
                ) : null}
              </div>
            );
          },
        },
        colKeys.field3 && {
          header: colKeys?.field3?.label,
          accessorKey: colKeys?.field3?.key,
          cell: ({ getValue }) => {
            const fieldValue = getValue();
            return (
              <div
                className="!line-clamp-3 flex max-w-sm flex-col gap-1"
                dangerouslySetInnerHTML={{ __html: fieldValue }}
              />
            );
          },
        },
        {
          header: colKeys?.field2?.label,
          accessorKey: colKeys?.field2?.key,
          cell: ({ row }) => {
            const fieldValue = row.original?.[colKeys?.field2?.key];
            return (
              <div
                className={`flex h-8 w-20 items-center justify-center rounded-md px-3 font-semibold ${row?.original?.[colKeys.field2.key] == 1 ? "bg-active/15 text-active" : "bg-inactive/15 text-inactive"}`}
              >
                {fieldValue == 1 ? "Active" : "Inactive"}
              </div>
            );
          },
        },
        {
          header: "Action",
          accessorKey: "action",
          cell: ({ row }) => (
            <div className="flex items-center gap-2 text-xs">
              {permissions.includes("settings-edit") && (
                <button
                type="button"
                onClick={() => setSelectedField(row?.original?.id)}
                className="flex size-7 cursor-pointer items-center rounded-full bg-[#EBEBF0] p-2"
              >
                <img
                  src="/assets/icons/admin/marker.svg"
                  className="w-full object-contain"
                />
              </button>
              )}
              {permissions.includes("settings-delete") && (
                <button
                type="button"
                onClick={() => {
                  setDeletePopup(true);
                  setSelectedId(row?.original?.id);
                }}
                className="flex cursor-pointer items-center justify-center rounded-full bg-[#EBEBF0] p-2 text-[#2C2C2C]"
              >
                <Trash2 className="size-3" />
              </button>
              )}
            </div>
          ),
        },
      ].filter(Boolean),
    [(data, type, api, qrkey, colKeys,permissions)],
  );
  return (
    <>
      <SaveRecruiterMasterForm
        popupOpen={popupOpen}
        setPopupOpen={setPopupOpen}
        selectedField={selectedField}
        setSelectedField={setSelectedField}
        qrkey={qrkey}
        type={type}
        colKeys={colKeys}
        api={api}
      />
      <DeleteConfirmation
        open={deletePopup}
        onCancel={setDeletePopup}
        id={selectedId}
        qrkey={qrkey}
        api={api}
      />
      <div className="flex flex-col">
        <MenuHeader
          menu={"Menu"}
          currentpath={"Recruiter"}
          activeMenu={"Settings"}
        />
        <div className="flex gap-x-3">
          <SettingsSidebar sidebarList={recruiterSetting} active={type} />
          <div className="min-h-[570px] w-full rounded-md bg-white px-5 py-4">
            <div className="my-4 flex items-center justify-between">
            <div className="input flex min-h-10 h-10 w-80 items-center gap-2 placeholder:text-black border border-gray-platinum outline-none hover:border-gray-platinum text-sm">
                <Search className="size-4 text-[#7F7F7F]" />
                <input
                  type="text"
                  onChange={(e) => setKeyword(e.target.value)}
                  className="h-full w-full placeholder:text-[#7F7F7F]"
                  placeholder="Search"
                />
              </div>
              {permissions.includes("settings-create") && (
                <Button
                onClick={() => {
                  setPopupOpen(true);
                }}
                className="flex w-fit items-center justify-center gap-2 rounded-md bg-hrmprimaryorange px-5 py-2.5 text-sm font-medium text-white focus:outline-none data-[hover]:bg-[#030E5C]/70 data-[focus]:outline-1 data-[focus]:outline-white"
              >
                <Plus className="size-4" />
                Add
              </Button>
              )}
            </div>
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
      </div>
    </>
  );
};

import MenuHeader from "@/components/common/MenuHeader";
import SetUpHeader from "@/components/common/SetupMenuHeader";
import Setup from "@/components/sidebars/setup";
import QueryTable from "@/components/table/QueryTable";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Eye, Plus, Trash2, X } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function EmailSetup() {
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [pageLimit, setPageLimit] = useState(10);
  const navigate = useNavigate();
  const [popupOpen, setPopupOpen] = useState(false);
  function close() {
    setPopupOpen(false);
    reset();
  }

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
        header: "Folders",
        accessorKey: "description",
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
              onClick={() => {
                navigate("/admin/setup/folder/view");
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
      <SetUpHeader menu="Menu" currentpath="Folder" page={1} />
      <div className="mb-4 mt-1 flex items-center justify-between">
        <label></label>
        <Link
          onClick={() => {
            setPopupOpen(true);
          }}
          className="flex w-fit items-center justify-center gap-2 rounded-md bg-hrmprimaryorange px-5 py-2.5 text-sm font-medium text-white hover:bg-hrmdarkblue/70 focus:outline-none"
        >
          <Plus className="size-4" />
          Add Folder
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
      <Dialog
        open={popupOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/20">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="data-[closed]:transform-[scale(95%)] h-full w-full max-w-md rounded bg-white/90 p-10 backdrop-blur-2xl duration-300 ease-out data-[closed]:opacity-0"
            >
              <div className="mb-7 flex items-center justify-between">
                <h1 className="text-[0.99rem] font-bold leading-7 text-neutral-700">
                  Add Folder
                </h1>
                <button
                  onClick={close}
                  className="text-lg font-extrabold text-[#00000080]"
                >
                  <X />
                </button>
              </div>
              <form className="grid-cols-1n grid gap-1">
                <div className="group mt-3 flex flex-col space-y-1 text-[0.85rem] font-medium">
                  <label>New Folder name</label>
                  <input
                    autoComplete="off"
                    type="text"
                    className="input-box min-h-18 py-1"
                  />{" "}
                </div>

                <div className="mt-3 flex flex-row gap-3">
                  <button
                    onClick={close}
                    className="flex h-11 w-1/2 cursor-pointer items-center justify-center gap-2 rounded-md border border-[#cecdcd] text-sm font-normal text-black focus:outline-none"
                  >
                    <span>Cancel</span>
                  </button>
                  <button
                    type="submit"
                    className="flex h-11 w-1/2 cursor-pointer items-center justify-center gap-2 rounded-md bg-hrmblack text-sm font-normal text-white focus:outline-none"
                  >
                    <span>Submit</span>
                  </button>
                </div>
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}

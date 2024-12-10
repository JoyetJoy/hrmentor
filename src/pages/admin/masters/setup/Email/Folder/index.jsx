import { newRequest } from "@/api";
import { EMAIL_FOLDER } from "@/api/setup";
import DeleteConfirmation from "@/components/common/DeleteConfirmation";
import MenuHeader from "@/components/common/MenuHeader";
import SetUpHeader from "@/components/common/SetupMenuHeader";
import Setup from "@/components/sidebars/setup";
import QueryTable from "@/components/table/QueryTable";
import { useUserStore } from "@/lib/slices/auth.slice";
import { Dialog, DialogPanel } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import { Eye, Plus, Trash2, X } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function EmailSetup() {
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState("");
  const [loader, setLoader] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [pageLimit, setPageLimit] = useState(10);
  const navigate = useNavigate();
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupEditOpen, setPopupEditOpen] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);

  const [folderName, setFolderName] = useState("");
  const [folderId, setFolderId] = useState(null);

  function close() {
    setPopupOpen(false);
    reset();
  }
  function closeEdit() {
    setPopupEditOpen(false);
    reset();
  }
  const { user } = useUserStore((state) => ({
    user: state.user,
  }));
  const { data: emailFolderList = [] } = useQuery({
    queryKey: ["emailFolderList", user?.id],
    queryFn: () =>
      newRequest
        .get(EMAIL_FOLDER, { params: { user_id: user?.id } })
        .then((res) => res.data.listing),
    enabled: !!user?.id,
  });

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
  });

  const columns = React.useMemo(
    () => [
      {
        header: "Folders",
        accessorKey: "folder_name",
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
                const label = row.original.folder_name;
                navigate(
                  `/admin/setup/folder/view?id=${id}&label=${encodeURIComponent(label)}`,
                );
              }}
            >
              <Eye className="size-3" />
            </button>
            <button
              type="button"
              className="flex size-7 cursor-pointer items-center rounded-full bg-[#EBEBF0] p-2"
              onClick={() => {
                setFolderId(row.original.id);
                setFolderName(row.original.folder_name);
                setPopupEditOpen(true);
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
                setFolderId(row.original.id);
              }}
            >
              <Trash2 className="size-3" />
            </button>
          </div>
        ),
      },
    ],
    [emailFolderList],
  );

  const onSubmit = async () => {
    setLoader(true);
    try {
      const formData = {
        folder_name: folderName,
      };
      const res = await newRequest.post(
        `${EMAIL_FOLDER}`, // URL with dynamic ID
        formData, // formData should be the second argument, which is the request body
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          params: {
            user_id: user?.id,
          },
        },
      );
      if (res) {
        toast.success(res?.data?.message);
        close();
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.error);
    } finally {
      setLoader(false);
    }
  };
  const onEditSubmit = async () => {
    setLoader(true);
    try {
      const formData = {
        folder_name: folderName,
      };
      const res = await newRequest.patch(
        `${EMAIL_FOLDER}/${folderId}`, // Correct dynamic URL
        formData, // formData should be the second argument, which is the request body
        {
          params: {
            user_id: user?.id,
          },
        },
      );
      if (res) {
        toast.success(res?.data?.message);
        closeEdit();
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.error);
    } finally {
      setLoader(false);
    }
  };

  const handleDelete = async () => {
    setLoader(true);
    try {
      const res = await newRequest.delete(`${EMAIL_FOLDER}/${folderId}`, {
        params: {
          user_id: user?.id,
        },
      });
      if (res) {
        toast.success(res?.data?.message);
        closeEdit();
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
              list={emailFolderList} // Corrected here
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
              <form
                className="grid-cols-1n grid gap-1"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="group mt-3 flex flex-col space-y-1 text-[0.85rem] font-medium">
                  <label>New Folder name</label>
                  <input
                    autoComplete="off"
                    type="text"
                    className="input-box min-h-18 py-1"
                    onChange={(e) => setFolderName(e.target.value)}
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
      <Dialog
        open={popupEditOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={closeEdit}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/20">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="data-[closed]:transform-[scale(95%)] h-full w-full max-w-md rounded bg-white/90 p-10 backdrop-blur-2xl duration-300 ease-out data-[closed]:opacity-0"
            >
              <div className="mb-7 flex items-center justify-between">
                <h1 className="text-[0.99rem] font-bold leading-7 text-neutral-700">
                  Edit Folder
                </h1>
                <button
                  onClick={closeEdit}
                  className="text-lg font-extrabold text-[#00000080]"
                >
                  <X />
                </button>
              </div>
              <form
                className="grid-cols-1n grid gap-1"
                onSubmit={handleSubmit(onEditSubmit)}
              >
                <div className="group mt-3 flex flex-col space-y-1 text-[0.85rem] font-medium">
                  <label>Folder name</label>
                  <input
                    autoComplete="off"
                    type="text"
                    className="input-box min-h-18 py-1"
                    value={folderName}
                    onChange={(e) => setFolderName(e.target.value)}
                  />{" "}
                </div>

                <div className="mt-3 flex flex-row gap-3">
                  <button
                    onClick={closeEdit}
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

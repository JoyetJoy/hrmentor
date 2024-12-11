import { newRequest } from "@/api";
import { EMAIL_FOLDER } from "@/api/setup";
import ProjectHeader from "@/components/common/ProjectHeader";
import SetUpHeader from "@/components/common/SetupMenuHeader";
import Setup from "@/components/sidebars/setup";
import QueryTable from "@/components/table/QueryTable";
import { useUserStore } from "@/lib/slices/auth.slice";
import { Dialog, DialogPanel } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import { Eye, Filter, Plus, Search, Trash2, X } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function TaskManagement() {
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

  const statuses = [
    { label: "Not Started", count: 1, tasks: 1, color: "text-gray-700" },
    { label: "In Progress", count: 3, tasks: 3, color: "text-blue-600" },
    { label: "Testing", count: 0, tasks: 0, color: "text-purple-600" },
    { label: "Awaiting Feedback", count: 0, tasks: 1, color: "text-green-600" },
    { label: "Complete", count: 2, tasks: 2, color: "text-green-600" },
  ];
  const projects = [
    {
      id: 1,
      name: "HR Mentor project",
      status: "Not started",
      startDate: "25/12/2024",
      dueDate: "25/01/2025",
      assignedTo: [
        "/path/to/avatar1.jpg",
        "/path/to/avatar2.jpg",
        "/path/to/avatar3.jpg",
      ],
      priority: "Medium",
    },
    {
      id: 2,
      name: "HR Mentor project",
      status: "In progress",
      startDate: "25/12/2024",
      dueDate: "25/01/2025",
      assignedTo: [
        "/path/to/avatar1.jpg",
        "/path/to/avatar2.jpg",
        "/path/to/avatar3.jpg",
      ],
      priority: "Medium",
    },
    {
      id: 3,
      name: "HR Mentor project",
      status: "Canceled",
      startDate: "25/12/2024",
      dueDate: "25/01/2025",
      assignedTo: [
        "/path/to/avatar1.jpg",
        "/path/to/avatar2.jpg",
        "/path/to/avatar3.jpg",
      ],
      priority: "Medium",
    },
    {
      id: 4,
      name: "HR Mentor project",
      status: "On hold",
      startDate: "25/12/2024",
      dueDate: "25/01/2025",
      assignedTo: [
        "/path/to/avatar1.jpg",
        "/path/to/avatar2.jpg",
        "/path/to/avatar3.jpg",
      ],
      priority: "Low",
    },
    {
      id: 5,
      name: "HR Mentor project",
      status: "Finished",
      startDate: "25/12/2024",
      dueDate: "25/01/2025",
      assignedTo: [
        "/path/to/avatar1.jpg",
        "/path/to/avatar2.jpg",
        "/path/to/avatar3.jpg",
      ],
      priority: "Nil",
    },
  ];

  const renderStatusBadge = (status) => {
    const statusColors = {
      "Not started": "bg-yellow-100 text-yellow-600",
      "In progress": "bg-blue-100 text-blue-600",
      Canceled: "bg-purple-100 text-purple-600",
      "On hold": "bg-orange-100 text-orange-600",
      Finished: "bg-green-100 text-green-600",
    };
    return (
      <span
        className={`rounded-md px-3 py-1 text-sm font-medium ${statusColors[status]}`}
      >
        {status}
      </span>
    );
  };
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
        header: "Sl No",
        accessorKey: "id",
      },
      {
        header: "Name",
        accessorKey: "name",
      },
      {
        header: "Status",
        accessorKey: "status",
        cell: ({ row }) => (
          <td>{renderStatusBadge(row.original.status)}</td> // Render badge based on status
        ),
      },
      {
        header: "Start Date",
        accessorKey: "startDate",
      },
      {
        header: "DueDate",
        accessorKey: "dueDate",
      },
      {
        header: "Assigned To",
        accessorKey: "assignedTo",
        cell: ({ row }) => (
          <div className="d-flex">
            {row.original.assignedTo.map((member, idx) => (
              <img
                key={idx}
                src={member}
                alt="Member"
                className="rounded-circle"
                style={{
                  width: "30px",
                  height: "30px",
                  marginLeft: idx > 0 ? "-10px" : "0",
                  border: "2px solid white",
                }}
              />
            ))}
          </div>
        ),
      },

      {
        header: "Priority",
        accessorKey: "priority",
      },
    ],
    [projects],
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
      <ProjectHeader
        menu="Menu"
        currentpath="Task Management"
        page={2}
        currentPage={"Task Management"}
      />
      <div className="mb-4 mt-1 flex items-center justify-between">
        {/* Left-aligned label */}
        <label style={{ fontWeight: "bold", fontSize: "17px" }}>
          Task Management
        </label>

        {/* Right-aligned group */}
        <div className="flex items-center gap-4">
          {/* Search bar */}
          <label className="input flex h-10 min-h-10 items-center gap-2 rounded-md border-none pr-28 outline-none">
            <Search className="size-4 object-contain text-gray-dark" />
            <input
              type="text"
              className="grow placeholder:text-sm placeholder:text-gray-dark focus:outline-none"
              placeholder="Search"
            />
          </label>

          {/* Filter button */}
          <div className="flex h-10 min-h-10 items-center justify-center rounded-md border border-gray-400 bg-white p-3">
            <Filter className="size-4" />
          </div>

          {/* Add Project button */}
          <Link
            onClick={() => {
              setPopupOpen(true);
            }}
            className="flex w-fit items-center justify-center gap-2 rounded-md bg-hrmprimaryorange px-5 py-2.5 text-sm font-medium text-white hover:bg-hrmdarkblue/70 focus:outline-none"
          >
            <Plus className="size-4" />
            Add Task
          </Link>
        </div>
      </div>
      <div className="flex items-center rounded-lg bg-gray-50 p-4 shadow-sm">
        {statuses.map((status, index) => (
          <React.Fragment key={status.label}>
            <div className="flex flex-col items-center px-24">
              <span className={`text-lg font-semibold ${status.color}`}>
                {status.count} {status.label}
              </span>
              <span className="text-sm text-gray-500">
                Task assigned to: {status.tasks}
              </span>
            </div>
            {index < statuses.length - 1 && (
              <div className="h-10 w-px bg-gray-300"></div>
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="mt-3 flex gap-4">
        <div className="flex w-full flex-col">
          <div className="flex min-h-[570px] w-full flex-col gap-4 rounded-md bg-white px-5 py-4">
            <QueryTable
              columns={columns}
              list={projects} // Corrected here
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

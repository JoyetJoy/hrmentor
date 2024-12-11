import { newRequest } from "@/api";
import { EMAIL_FOLDER } from "@/api/setup";
import ProjectHeader from "@/components/common/ProjectHeader";
import SetUpHeader from "@/components/common/SetupMenuHeader";
import Setup from "@/components/sidebars/setup";
import QueryTable from "@/components/table/QueryTable";
import { useUserStore } from "@/lib/slices/auth.slice";
import { customSelectStyles } from "@/utils/customStyles";
import { Dialog, DialogPanel, Select } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import {
  Eye,
  Filter,
  Plus,
  Search,
  Trash2,
  UploadCloud,
  X,
} from "lucide-react";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import ReactQuill from "react-quill";
import { Link, useNavigate } from "react-router-dom";

export default function ProjectManagement() {
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
  const projects = [
    {
      id: 1,
      name: "HR Mentor Project",
      startDate: "25/12/2024",
      deadline: "25/01/2025",
      members: [
        "/path/to/image1.jpg",
        "/path/to/image2.jpg",
        "/path/to/image3.jpg",
      ],
      status: "Not started",
    },
    {
      id: 2,
      name: "HR Mentor Project",
      startDate: "25/12/2024",
      deadline: "25/01/2025",
      members: [
        "/path/to/image1.jpg",
        "/path/to/image2.jpg",
        "/path/to/image3.jpg",
      ],
      status: "In progress",
    },
    {
      id: 3,
      name: "HR Mentor Project",
      startDate: "25/12/2024",
      deadline: "25/01/2025",
      members: [
        "/path/to/image1.jpg",
        "/path/to/image2.jpg",
        "/path/to/image3.jpg",
      ],
      status: "Canceled",
    },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "Not started":
        return <span className="text-dark badge bg-warning">Not started</span>;
      case "In progress":
        return <span className="badge bg-primary">In progress</span>;
      case "Canceled":
        return <span className="bg-danger badge">Canceled</span>;
      default:
        return null;
    }
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
        header: "Project Name",
        accessorKey: "name",
      },
      {
        header: "Start Date",
        accessorKey: "startDate",
      },
      {
        header: "Deadline",
        accessorKey: "deadline",
      },
      {
        header: "Members",
        accessorKey: "members",
        cell: ({ row }) => (
          <div className="d-flex">
            {row.original.members.map((member, idx) => (
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
        header: "Status",
        accessorKey: "status",
        cell: ({ row }) => (
          <td>{getStatusBadge(row.original.status)}</td> // Render badge based on status
        ),
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
                // navigate(
                //   `/admin/setup/folder/view?id=${id}&label=${encodeURIComponent(label)}`,
                // );
              }}
            >
              <Eye className="size-3" />
            </button>
          </div>
        ),
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
        currentpath="Project Management"
        page={1}
        currentPage={"Project Management"}
      />
      <div className="mb-4 mt-1 flex items-center justify-between">
        {/* Left-aligned label */}
        <label style={{ fontWeight: "bold", fontSize: "17px" }}>
          Project Management
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
            Add Project
          </Link>
        </div>
      </div>

      <div className="flex gap-4">
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
              className="data-[closed]:transform-[scale(95%)] h-full w-full max-w-2xl rounded bg-white/90 p-10 backdrop-blur-2xl duration-300 ease-out data-[closed]:opacity-0"
            >
              <div className="mb-7 flex items-center justify-between">
                <h1 className="text-[0.99rem] font-bold leading-7 text-neutral-700">
                  Add New Project
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
                  <label>Project name</label>
                  <input
                    autoComplete="off"
                    type="text"
                    className="input-box min-h-18 py-1"
                    placeholder="Project name"
                  />{" "}
                </div>

                <div className="flex w-full gap-3">
                  {/* Name of the Leave */}
                  <div className="flex w-[50%] flex-col gap-1.5 py-2">
                    <label className="required label-text">Start Date</label>
                    <input
                      autoComplete="off"
                      type="date"
                      placeholder="Enter Name of the Leave"
                      className="input-box"
                    />
                  </div>

                  {/* Display Name */}
                  <div className="group col-span-2 flex w-[50%] flex-col gap-1.5 py-2">
                    <label className="required label-text">Deadline</label>
                    <input
                      autoComplete="off"
                      type="date"
                      placeholder="Enter Display Name"
                      className="input-box"
                    />
                  </div>
                </div>
                <div className="flex w-full gap-3">
                  {/* Name of the Leave */}
                  <div className="flex w-[50%] flex-col gap-1.5 py-2">
                    <label className="required text-[0.8rem] font-medium text-[#3A3A3A]">
                      Priority
                    </label>
                    <Controller
                      name="emailTemplateId"
                      control={control}
                      rules={{ required: "Email Folder is required" }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          styles={customSelectStyles}
                          placeholder="Select Email Folder"
                          className="input-box"
                        />
                      )}
                    />
                  </div>

                  {/* Display Name */}
                  <div className="group col-span-2 flex w-[50%] flex-col gap-1.5 py-2">
                    <label className="required text-[0.8rem] font-medium text-[#3A3A3A]">
                      Members
                    </label>
                    <Controller
                      name="members"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          styles={customSelectStyles}
                          placeholder="Select a members"
                          className="input-box"
                        />
                      )}
                    />
                  </div>
                </div>

                <div className="group flex w-[50%] flex-col space-y-1">
                  <label className="text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                    Attach Files
                  </label>
                  <label
                    htmlFor="profile_image"
                    className="input-box flex h-10 cursor-pointer items-center justify-center rounded-md border border-dashed"
                  >
                    <div className="flex items-center gap-2">
                      <UploadCloud />
                      <span className="font-semibold text-textcolor-darkCharcoal">
                        Attach Files
                      </span>
                    </div>
                    <input id="profile_image" type="file" className="hidden" />
                  </label>
                </div>

                <div
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    maxWidth: "700px",
                  }}
                >
                  <label className="required text-[0.8rem] font-medium text-[#3A3A3A]">
                    Description
                  </label>
                  <ReactQuill
                    modules={{
                      toolbar: [
                        ["bold", "italic", "underline", "strike"],
                        [{ header: [1, 2, false] }],
                        [{ list: "ordered" }, { list: "bullet" }],
                        [{ align: [] }],
                        [{ color: [] }, { background: [] }],
                        ["link", "image"],
                        ["clean"],
                      ],
                    }}
                    placeholder="Type your content here..."
                  />
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

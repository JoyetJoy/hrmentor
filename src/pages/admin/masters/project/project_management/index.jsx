import {
  ACTIVE_EMPLOYEE,
  ALL_STATUS_LIST,
  newRequest,
  PROJECT_LIST,
} from "@/api";
import DeleteConfirmation from "@/components/common/DeleteConfirmation";
import ProjectHeader from "@/components/common/ProjectHeader";
import QueryTable from "@/components/table/QueryTable";
import useImageUpload from "@/hooks/useImageUpload";
import { usePermissionStore, useUserStore } from "@/lib/slices/auth.slice";
import { projectSchema } from "@/schema/dashboard/employee/masters/project_and_tasks.schema";
import { customSelectStyles } from "@/utils/customStyles";
import { Dialog, DialogPanel } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { color } from "@mui/system";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowUpFromLine,
  Eye,
  Filter,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import ReactQuill from "react-quill";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import {projectMenu } from "@/constants/menus/project";

const Priority = [
  { value: 1, label: "Low" },
  { value: 2, label: "Medium" },
  { value: 3, label: "High" },
  { value: 4, label: "Urgent" },
];

export default function ProjectManagement() {
  const [keyword, setKeyword] = useState("");
  const [loader, setLoader] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [pageLimit, setPageLimit] = useState(10);
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [deletePopup, setDeletePopup] = useState(false);
  const [memberList, setMemberList] = useState([]);
  const [status, setStatus] = useState([]);
  const navigate = useNavigate();

  const { permissions } = usePermissionStore((state) => ({
    permissions: state.permissions,
  }));

  const [content, setContent] = useState("");
  const { image, imageFile, handleImageChange, clearImage, setImage } =
    useImageUpload();
  function close() {
    setPopupOpen(false);
    reset();
    setMemberList([]);
    setSelectedId(null);
    clearImage();
    setContent("");
  }
  const { user } = useUserStore((state) => ({
    user: state.user,
  }));

  const handleContentChange = (value) => {
    setContent(value);
  };

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(projectSchema),
  });

  const { data: EmployeeList, error } = useQuery({
    queryKey: ["EmployeeList", user?.id],
    queryFn: () =>
      newRequest
        .get(ACTIVE_EMPLOYEE, {
          params: { user_id: user?.id },
        })
        .then((res) => res.data),
    enabled: !!user?.id, // Only run if user.id is defined
  });

  const { data: projectList, isLoading } = useQuery({
    queryKey: ["projectList", currentPage, keyword],
    queryFn: () =>
      newRequest
        .get(PROJECT_LIST, {
          params: {
            search: keyword,
            page: currentPage,
            per_limit: pageLimit,
          },
        })
        .then((res) => {
          return res.data?.original?.data;
        }),
  });

  useEffect(() => {
    if (projectList) {
      setTotalPages(projectList?.last_page || 1);
      setCurrentPage(projectList?.current_page || 1);
    }
  }, [projectList]);

  const { data: projectListDetails } = useQuery({
    queryKey: ["projectListDetail", selectedId],
    queryFn: async () => {
      const response = await newRequest.get(
        `${PROJECT_LIST}/${selectedId}/${"edit"}`,
      );
      return response?.data;
    },
    enabled: !!selectedId != 0, // Ensures the query runs only when selectedField is truthy
  });

  const { data: statusList } = useQuery({
    queryKey: ["statusList"],
    queryFn: async () => {
      const response = await newRequest.get(`${"get-all-status"}`);
      // Map the statuses into the desired format
      return response?.data?.statuses?.map((status) => ({
        value: status?.id, // Use the unique identifier for the status
        label: status?.project_status_name, // Use the status name as the label
      }));
    },
  });

  useEffect(() => {
    if (statusList) {
      setStatus(statusList);
    }
  }, [statusList]);

  useEffect(() => {
    if (projectListDetails) {
      setValue("project_name", projectListDetails?.project_name || "");
      setValue("start_date", projectListDetails?.start_date || "");
      setValue("end_date", projectListDetails?.end_date || "");
      setValue("priority_id", projectListDetails?.priority?.value || "");
      setValue("description", projectListDetails?.description || "");
      setMemberList(projectListDetails?.members);
      setImage(projectListDetails?.file);
      setContent(projectListDetails?.description || "");
    }
  }, [projectListDetails, setValue]);

  const handleStatusChange = async (id, newValue) => {
    const selectedOption = status.find((option) => option.value === newValue);
    try {
      const formData = {
        status: selectedOption?.value,
      };

      let res;
      res = await newRequest.post(
        `${"projects"}/${id}/${"status"}`, // URL with dynamic ID
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
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.error);
    } finally {
      setLoader(false);
    }
  };

  const columns = React.useMemo(
    () => [
      {
        header: "Sl No",
        accessorKey: "id",
        cell: ({ row }) => (
          <>
            <div>{row.index + 1 + (currentPage - 1) * pageLimit}</div>
          </>
        ),
      },
      {
        header: "Project Name",
        accessorKey: "project_name",
      },
      {
        header: "Start Date",
        accessorKey: "start_date",
      },
      {
        header: "Deadline",
        accessorKey: "end_date",
      },
      {
        header: "Members",
        accessorKey: "members",
        cell: ({ row }) => (
          <div className="flex items-center">
            {row?.original?.members?.map((member, idx) => (
              <div
                key={idx}
                className="group relative"
                style={{ marginLeft: idx > 0 ? "-10px" : "0" }}
              >
                <img
                  src={member?.employee?.profile_image}
                  alt={`${member?.employee?.first_name} ${member?.employee?.sur_name}`}
                  className="rounded-full"
                  style={{
                    width: "30px",
                    height: "30px",
                    border: "2px solid white",
                  }}
                />
                {/* Tooltip for hover */}
                <div
                  className="absolute bottom-full left-1/2 mb-1 w-max -translate-x-1/2 rounded bg-black px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100"
                  style={{ whiteSpace: "nowrap" }}
                >
                  {member?.employee?.first_name}{" "}
                  {member?.employee?.middle_name
                    ? `${member?.employee?.middle_name} `
                    : ""}
                  {member?.employee?.sur_name}
                </div>
              </div>
            ))}
          </div>
        ),
      },
      {
        header: "Status",
        accessorKey: "status",
        cell: ({ row }) => (
          <select
            value={row.original.status} // Assuming status stores the numeric value (e.g., 1, 2, 3)
            onChange={(e) => {
              const newValue = parseInt(e.target.value, 10); // Convert string to number
              handleStatusChange(row.original.id, newValue);
            }}
          >
            {status?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ),
      },
      {
        header: "Action",
        accessorKey: "location",
        cell: ({ row }) => (
          <div className="flex items-center justify-start gap-3 text-xs">
            <Link
              onClick={() => {
                navigate(
                  `/admin/project/projectManagementView?id=${row.original.id}`,
                );
              }}
              className="flex cursor-pointer items-center rounded-full bg-gray-soft p-2"
            >
              <Eye className="size-3" />
            </Link>
            {permissions.includes("project-edit") && (
            <Link
              onClick={() => {
                setPopupOpen(true);
                setSelectedId(row.original.id);
              }}
              className="flex size-7 cursor-pointer items-center rounded-full bg-gray-soft p-2"
            >
              <img
                src="/assets/icons/admin/marker.svg"
                className="w-full object-contain"
              />
            </Link>
            )}
            {permissions.includes("project-delete") && (
            <Link
              className="flex cursor-pointer items-center justify-center rounded-full bg-gray-soft p-2 text-textcolor-red"
              onClick={() => {
                setDeletePopup(true);
                setSelectedId(row?.original?.id);
              }}
            >
              <Trash2 className="size-3" />
            </Link>
            )}
          </div>
        ),
      },
    ],
    [projectList?.listing, currentPage, totalPages],
  );

  const onSubmit = async (data) => {
    setLoader(true);
    try {
      if (!memberList) {
        return toast.error("Select A members");
      }
      if (!content) {
        return toast.error("Please Fill Description");
      }
      const newArray = memberList?.map(({ id, employee_id }) => ({
        user_id: id,
        employee_id,
      }));

      const formData = new FormData();
      formData.append("project_name", data?.project_name);
      formData.append("end_date", data?.end_date);
      formData.append("start_date", data.start_date);
      imageFile && formData.append("file", imageFile);
      formData.append("priority_id", data?.priority_id);
      formData.append("status", data?.status);
      formData.append("description", content);
      newArray.forEach((member, index) => {
        formData.append(`members[${index}][user_id]`, member.user_id);
        formData.append(`members[${index}][employee_id]`, member.employee_id);
      });
      formData.append("created_by", "superadmin");

      let res;

      if (selectedId) {
        res = await newRequest.post(
          `${"update-project"}/${selectedId}`, // URL with dynamic ID
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
      } else {
        res = await newRequest.post(
          `${PROJECT_LIST}`, // URL with dynamic ID
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
      }

      if (res) {
        toast.success("Status Updated Successfully");
        close();
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
        projectMenu={projectMenu}
        page={1}
        currentPage={"Project Management"}
      />
      <DeleteConfirmation
        open={deletePopup}
        onCancel={setDeletePopup}
        id={selectedId}
        qrKey={"eventList"}
        api={PROJECT_LIST}
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
            <Search
              className="size-4 object-contain text-gray-dark"
              onChange={(e) => setKeyword(e.target.value)}
            />
            <input
              type="text"
              className="grow placeholder:text-sm placeholder:text-gray-dark focus:outline-none"
              placeholder="Search"
            />
          </label>

          {/* Filter button */}
          {/* <div className="flex h-10 min-h-10 items-center justify-center rounded-md border border-gray-400 bg-white p-3">
            <Filter className="size-4" />
          </div> */}

          {/* Add Project button */}
          {permissions.includes("project-create") && (
          <Link
            onClick={() => {
              setPopupOpen(true);
            }}
            className="flex w-fit items-center justify-center gap-2 rounded-md bg-hrmprimaryorange px-5 py-2.5 text-sm font-medium text-white hover:bg-hrmdarkblue/70 focus:outline-none"
          >
            <Plus className="size-4" />
            Add Project
          </Link>
          )}
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex w-full flex-col">
          <div className="flex min-h-[570px] w-full flex-col gap-4 rounded-md bg-white px-5 py-4">
            <QueryTable
              columns={columns}
              list={projectList?.listing ?? []} // Corrected here
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
                  {selectedId ? "Edit Project" : "Add New Project"}
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
                    {...register("project_name", { required: true })}
                    name="project_name"
                  />{" "}
                  {errors.project_name && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.project_name?.message}
                    </span>
                  )}
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
                      name="start_date"
                      {...register("start_date", { required: true })}
                    />
                    {errors.start_date && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.start_date?.message}
                      </span>
                    )}
                  </div>

                  {/* Display Name */}
                  <div className="group col-span-2 flex w-[50%] flex-col gap-1.5 py-2">
                    <label className="required label-text">Deadline</label>
                    <input
                      autoComplete="off"
                      type="date"
                      placeholder="Enter Display Name"
                      className="input-box"
                      name="end_date"
                      {...register("end_date", { required: true })}
                    />
                    {errors.end_date && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.end_date?.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex w-full gap-3">
                  {/* Name of the Leave */}
                  <div className="flex w-[50%] flex-col gap-1.5 py-2">
                    <label className="required text-[0.8rem] font-medium text-[#3A3A3A]">
                      Priority
                    </label>
                    <Controller
                      name="priority_id"
                      control={control}
                      rules={{ required: "Priority is required" }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          styles={customSelectStyles}
                          options={Priority}
                          placeholder="Select Priority"
                          className="input-box"
                          value={Priority.find(
                            (option) => option.value === field.value,
                          )} // Ensure the selected value matches
                          onChange={(selectedOption) =>
                            field.onChange(selectedOption?.value)
                          } // Update the value in RHF
                        />
                      )}
                    />
                    {errors.priority_id && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.priority_id?.message}
                      </span>
                    )}
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
                          options={EmployeeList}
                          isMulti
                          styles={customSelectStyles}
                          placeholder="Select a members"
                          className="input-box"
                          value={memberList} //
                          onChange={(value) => setMemberList(value)} // Correctly passing a function
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="flex w-full gap-3">
                  <div className="flex w-[50%] flex-col gap-1.5 py-2">
                    <label className="text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                      Attach Files
                    </label>
                    <div className="group flex flex-col gap-1.5">
                      {image ? (
                        <div className="relative">
                          <img
                            src={image}
                            alt="Uploaded"
                            className="max-h-24 w-full rounded-md border border-black/20 object-contain"
                          />
                          <X
                            onClick={clearImage}
                            className="absolute -right-2 -top-2 h-5 w-5 cursor-pointer rounded-full bg-hrmdarkblue p-1 text-white"
                          />
                        </div>
                      ) : (
                        <label
                          htmlFor="featured_image"
                          className="input-box items-centre flex h-10 cursor-pointer justify-start rounded-md border border-dashed pl-2"
                        >
                          <div className="flex items-center">
                            <ArrowUpFromLine
                              strokeWidth={2}
                              className="size-4"
                            />
                            <span className="text-sm font-semibold text-[#2C2C2C]">
                              Attach Files
                            </span>
                          </div>
                          <input
                            id="featured_image"
                            onChange={handleImageChange}
                            type="file"
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>
                  </div>
                  {!selectedId && (
                    <div className="flex w-[50%] flex-col gap-1.5 py-2">
                      <label className="required text-[0.8rem] font-medium text-[#3A3A3A]">
                        Status
                      </label>
                      <Controller
                        name="status"
                        control={control}
                        rules={{ required: "Priority is required" }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            styles={customSelectStyles}
                            options={status}
                            placeholder="Select Status"
                            className="input-box"
                            value={status.find(
                              (option) => option.value === field.value,
                            )} // Ensure the selected value matches
                            onChange={(selectedOption) =>
                              field.onChange(selectedOption?.value)
                            } // Update the value in RHF
                          />
                        )}
                      />
                      {errors.status && (
                        <span className="text-xs font-medium text-red-500">
                          {errors.status?.message}
                        </span>
                      )}
                    </div>
                  )}
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
                    value={content}
                    onChange={handleContentChange}
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
                  {errors.description && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.description?.message}
                    </span>
                  )}
                </div>

                <div className="flex w-full gap-3">
                  {/* Name of the Leave */}
                  <div className="flex w-[50%] flex-row gap-1.5 py-2">
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
                      <span>Save</span>
                    </button>
                  </div>
                </div>
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}

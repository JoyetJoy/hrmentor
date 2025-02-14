import {
  ACTIVE_EMPLOYEE,
  ALL_STATUS_LIST,
  newRequest,
  PROJECT_LIST,
  TASK_LIST,
} from "@/api";
import DeleteConfirmation from "@/components/common/DeleteConfirmation";
import ProjectHeader from "@/components/common/ProjectHeader";
import QueryTable from "@/components/table/QueryTable";
import useImageUpload from "@/hooks/useImageUpload";
import { useUserStore } from "@/lib/slices/auth.slice";
import { taskSchema } from "@/schema/dashboard/employee/masters/project_and_tasks.schema";
import { customSelectStyles } from "@/utils/customStyles";
import { Dialog, DialogPanel } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
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
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";

const Priority = [
  { value: 1, label: "Low" },
  { value: 2, label: "Medium" },
  { value: 3, label: "High" },
  { value: 4, label: "Urgent" },
];

export default function TaskManagement() {
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState("");
  const [loader, setLoader] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [pageLimit, setPageLimit] = useState(10);
  const navigate = useNavigate();
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupViewOpen, setPopupViewOpen] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);
  const [memberList, setMemberList] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [status, setStatus] = useState([]);

  const { image, imageFile, handleImageChange, clearImage, setImage } =
    useImageUpload();

  function close() {
    setPopupOpen(false);
    setPopupViewOpen(false);
    setSelectedId(null);
    reset();
  }

  const { user } = useUserStore((state) => ({
    user: state.user,
  }));

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(taskSchema),
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

  const { data: projectList } = useQuery({
    queryKey: ["projectList", user?.id],
    queryFn: async () => {
      const response = await newRequest.get(PROJECT_LIST, {
        params: { user_id: user?.id },
      });

      // Map the data into the desired format
      const mappedStatuses = response.data?.original?.data?.listing?.map(
        (status) => ({
          value: status?.id, // Use the unique identifier for the status
          label: status?.project_name, // Use the project name as the label
        }),
      );

      return mappedStatuses || []; // Ensure a defined return value
    },
    enabled: !!user?.id, // Only run if user.id is defined
  });

  const { data: statusList } = useQuery({
    queryKey: ["statusList"],
    queryFn: async () => {
      const response = await newRequest.get(`${ALL_STATUS_LIST}`);
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

  const { data: taskList,refetch } = useQuery({
    queryKey: ["taskList", currentPage, keyword],
    queryFn: () =>
      newRequest
        .get(TASK_LIST, {
          params: {
            search: keyword,
            page: currentPage,
            per_limit: pageLimit,
          },
        })
        .then((res) => res.data),
  });
console.log(taskList);

  const { data: taskListDetails } = useQuery({
    queryKey: ["taskListDetails", selectedId],
    queryFn: () =>
      newRequest
        .get(`${TASK_LIST}/${selectedId}`, {})
        .then((res) => res.data?.data?.task),
    enabled: !!selectedId != 0,
  });

  useEffect(() => {
    if (taskList) {
      setTotalPages(taskList?.last_page || 1);
      setCurrentPage(taskList?.current_page || 1);
    }
  }, [taskList]);

  useEffect(() => {
    if (taskListDetails) {
      setValue("subject", taskListDetails?.subject);
      setValue("start_date", taskListDetails?.start_date);
      setValue("due_date", taskListDetails?.due_date);
      setValue("file", taskListDetails?.file);
      setValue("priority_id", taskListDetails?.priority?.value);
      setValue("status", taskListDetails?.status?.value);
      setValue("task_description", taskListDetails?.task_description);
      setValue("assignees", taskListDetails?.assignees);
      setValue("related_to", taskListDetails?.related_to?.value);
      setMemberList(taskListDetails?.assignees);
    }
  }, [taskListDetails]);

  const statuses = [
    { label: "Not Started", count: 1, tasks: 1, color: "text-gray-700" },
    { label: "In Progress", count: 3, tasks: 3, color: "text-blue-600" },
    { label: "Testing", count: 0, tasks: 0, color: "text-purple-600" },
    { label: "Awaiting Feedback", count: 0, tasks: 1, color: "text-green-600" },
    { label: "Complete", count: 2, tasks: 2, color: "text-green-600" },
  ];

  const handleStatusChange = async (id, newValue) => {
    const selectedOption = status.find((option) => option.value === newValue);
    try {
      const formData = {
        status: selectedOption?.value,
      };

      let res;
      res = await newRequest.post(
        `${"task"}/${id}/${"status"}`, // URL with dynamic ID
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
        setSelectedId(null);
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
        cell: ({ row }) => (
          <>
            <div>{row.index + 1 + (currentPage - 1) * pageLimit}</div>
          </>
        ),
      },
      {
        header: "Name",
        accessorKey: "subject",
      },
      {
        header: "Status",
        accessorKey: "status",
        cell: ({ row }) => (
          <td>
            <select
              value={row.original.status} // Assuming status stores the numeric value (e.g., 1, 2, 3)
              onChange={(e) => {
                const newValue = parseInt(e.target.value, 10); // Convert string to number
                handleStatusChange(row.original.id, newValue);
              }}
            >
              {status.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </td>
        ),
      },
      {
        header: "Start Date",
        accessorKey: "start_date",
      },
      {
        header: "DueDate",
        accessorKey: "due_date",
      },
      {
        header: "Assigned To",
        cell: ({ row }) => (
          <div className="flex items-center">
            {row.original?.assignees.map((member, idx) => (
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
        header: "Priority",
        accessorKey: "priority",
      },
      {
        header: "Action",
        accessorKey: "location",
        cell: ({ row }) => (
          <div className="flex items-center justify-start gap-3 text-xs">
            <Link
              onClick={() => {
                setPopupViewOpen(true);
                setSelectedId(row.original.id);
              }}
              className="flex cursor-pointer items-center rounded-full bg-gray-soft p-2"
            >
              <Eye className="size-3" />
            </Link>
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
            <Link
              className="flex cursor-pointer items-center justify-center rounded-full bg-gray-soft p-2 text-textcolor-red"
              onClick={() => {
                setDeletePopup(true);
                setSelectedId(row?.original?.id);
              }}
            >
              <Trash2 className="size-3" />
            </Link>
          </div>
        ),
      },
    ],
    [taskList?.listing, currentPage, totalPages],
  );

  const onSubmit = async (data) => {
    setLoader(true);
    try {
      if (!memberList) {
        return toast.error("Select A Assignees");
      }
      const newArray = memberList.map(({ id, employee_id }) => ({
        user_id: id,
        employee_id,
      }));

      const formData = new FormData();
      formData.append("subject", data?.subject);
      formData.append("start_date", data?.start_date);
      formData.append("due_date", data.due_date);
      imageFile && formData.append("file", imageFile);
      formData.append("priority_id", data?.priority_id);
      formData.append("status", data?.status);
      formData.append("task_description", data?.task_description);
      newArray.forEach((member, index) => {
        formData.append(`assignees[${index}][user_id]`, member.user_id);
        formData.append(`assignees[${index}][employee_id]`, member.employee_id);
      });
      formData.append("related_to", data?.related_to);

      let res;

      if (selectedId) {
        res = await newRequest.post(
          `${"update-task"}/${selectedId}`, // URL with dynamic ID
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
          `${TASK_LIST}`, // URL with dynamic ID
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
        toast.success(res?.data?.message);
        close();
        refetch();
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
      <DeleteConfirmation
        open={deletePopup}
        onCancel={setDeletePopup}
        id={selectedId}
        qrKey={"taskList"}
        api={TASK_LIST}
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
      <div className="flex items-center rounded-lg bg-gray-50 p-5 shadow-sm">
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
              list={taskList?.listing} // Corrected here
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
                  {selectedId ? "Edit Task" : "Add New Task"}
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
                  <label>Subject</label>
                  <input
                    autoComplete="off"
                    type="text"
                    className="input-box min-h-18 py-1"
                    placeholder="Subject"
                    {...register("subject", { required: true })}
                    name="subject"
                  />{" "}
                  {errors.subject && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.subject?.message}
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
                      {...register("start_date", { required: true })}
                      name="start_date"
                    />
                    {errors.start_date && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.start_date?.message}
                      </span>
                    )}
                  </div>

                  {/* Display Name */}
                  <div className="group col-span-2 flex w-[50%] flex-col gap-1.5 py-2">
                    <label className="required label-text">Due Date</label>
                    <input
                      autoComplete="off"
                      type="date"
                      placeholder="Due Date"
                      className="input-box"
                      {...register("due_date", { required: true })}
                      name="due_date"
                    />
                    {errors.due_date && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.due_date?.message}
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
                  <div className="flex w-[50%] flex-col gap-1.5 py-2">
                    <label className="text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                      Document (optional)
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
                              Document Files
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
                </div>
                <div className="flex w-full gap-3">
                  {/* Display Name */}

                  <div className="group col-span-2 flex w-[50%] flex-col gap-1.5 py-2">
                    <label className="required text-[0.8rem] font-medium text-[#3A3A3A]">
                      Related To
                    </label>
                    <Controller
                      name="related_to"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={projectList}
                          placeholder="Select Related"
                          styles={customSelectStyles}
                          className="input-box"
                          value={projectList.find(
                            (option) => option.value === field.value,
                          )} // Ensure the selected value matches
                          onChange={(selectedOption) =>
                            field.onChange(selectedOption?.value)
                          } // Update the value in RHF
                        />
                      )}
                    />
                    {errors.related_to && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.related_to?.message}
                      </span>
                    )}
                  </div>

                  {/* Display Name */}
                  <div className="group col-span-2 flex w-[50%] flex-col gap-1.5 py-2">
                    <label className="required text-[0.8rem] font-medium text-[#3A3A3A]">
                      Assignees
                    </label>
                    <Controller
                      name="assignees"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={EmployeeList}
                          isMulti
                          styles={customSelectStyles}
                          placeholder="Select a Assignees"
                          className="input-box"
                          value={memberList} //
                          onChange={(value) => setMemberList(value)}
                        />
                      )}
                    />
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

                <div
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    maxWidth: "700px",
                  }}
                >
                  <label className="required text-[0.8rem] font-medium text-[#3A3A3A]">
                    Description
                  </label>

                  <textarea
                    autoComplete="off"
                    type="text"
                    className="input-box min-h-28 py-1"
                    {...register("task_description", { required: true })}
                    name="task_description"
                  />
                  {errors.task_description && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.task_description?.message}
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
      <Dialog
        open={popupViewOpen}
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
                  View Task
                </h1>
                <button
                  onClick={close}
                  className="text-lg font-extrabold text-[#00000080]"
                >
                  <X />
                </button>
              </div>
              <div className="flex flex-col rounded-lg bg-white p-6 shadow-md md:flex-row">
                {/* Left Section */}
                <div className="w-full border-r p-4 md:w-1/2">
                  <h2 className="mb-4 text-xl font-semibold">Salary Type</h2>
                  <p className="mb-2 text-gray-500">
                    <strong>Related:</strong> #1045-HRMentor
                  </p>
                  <button className="mb-4 flex w-full items-center justify-center rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600">
                    <span className="material-icons mr-2">timer</span> Start
                    Timer
                  </button>
                  <h3 className="text-md mb-2 font-medium">Task Description</h3>
                  <p className="text-gray-600">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nunc vulputate libero et velit interdum, ac aliquet odio
                    mattis.
                  </p>
                </div>

                {/* Right Section */}
                <div className="w-full p-4 md:w-1/2">
                  <h3 className="mb-4 text-lg font-semibold">Task Info</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                    <p>
                      <strong>Task Created:</strong> 08-05-2025, 09:00 AM
                    </p>
                    <p></p>
                    <p>
                      <strong>Start Date:</strong> 08-05-2025
                    </p>
                    <p>
                      <strong>Due Date:</strong> 08-05-2025
                    </p>
                    <p>
                      <strong>Logged Time:</strong> 00:00
                    </p>
                    <p>
                      <strong>Total Logged Time:</strong>{" "}
                      <span className="text-green-500">05:56</span>
                    </p>
                  </div>

                  <h3 className="mt-6 font-medium">Priority</h3>
                  <span className="inline-block rounded-md bg-blue-100 px-3 py-1 text-sm font-medium text-blue-600">
                    In Progress
                  </span>

                  <h3 className="mt-6 font-medium">Assignees</h3>
                  <div className="mt-2 flex">
                    <img
                      src="https://via.placeholder.com/40"
                      alt="Assignee 1"
                      className="-ml-2 h-10 w-10 rounded-full border-2 border-white shadow"
                    />
                    <img
                      src="https://via.placeholder.com/40"
                      alt="Assignee 2"
                      className="-ml-2 h-10 w-10 rounded-full border-2 border-white shadow"
                    />
                  </div>

                  <h3 className="mt-6 font-medium">Attach Files</h3>
                  <div className="mt-2 rounded-md border-2 border-dashed border-gray-300 p-4 text-center text-gray-500">
                    <button className="flex items-center justify-center text-blue-500">
                      <span className="material-icons mr-2">upload</span> Attach
                      files
                    </button>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}

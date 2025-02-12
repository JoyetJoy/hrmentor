import { ACTIVE_EMPLOYEE, newRequest, PROJECT_LIST } from "@/api";
import DeleteConfirmation from "@/components/common/DeleteConfirmation";
import ProjectHeader from "@/components/common/ProjectHeader";
import useImageUpload from "@/hooks/useImageUpload";
import { useUserStore } from "@/lib/slices/auth.slice";
import { projectSchema } from "@/schema/dashboard/employee/masters/project_and_tasks.schema";
import { customSelectStyles } from "@/utils/customStyles";
import { Dialog, DialogPanel } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@tanstack/react-query";
import { ArrowUpFromLine, Filter, Plus, Search, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import ReactQuill from "react-quill";
import { Link, useSearchParams } from "react-router-dom";
import Select from "react-select";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
const Priority = [
  { value: 1, label: "Low" },
  { value: 2, label: "Medium" },
  { value: 3, label: "High" },
  { value: 4, label: "Urgent" },
];

export default function ProjectManagementView() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [keyword, setKeyword] = useState("");
  const [loader, setLoader] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [pageLimit, setPageLimit] = useState(10);
  const [popupOpen, setPopupOpen] = useState(false);
  const [memberList, setMemberList] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");

  console.log(id, "idid");

  const [content, setContent] = useState("");
  const { image, imageFile, handleImageChange, clearImage, setImage } =
    useImageUpload();
  function close() {
    setPopupOpen(false);
    reset();
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

  const { data: projectListDetails } = useQuery({
    queryKey: ["projectListDetail", id],
    queryFn: async () => {
      const response = await newRequest.get(`${PROJECT_LIST}/${id}`);
      return response?.data?.data?.project;
    },
    enabled: !!id != 0, // Ensures the query runs only when selectedField is truthy
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

  const onSubmit = async (data) => {
    setLoader(true);
    try {
      if (!memberList) {
        return toast.error("Select A members");
      }
      if (!image) {
        return toast.error("Select A Image");
      }
      if (!content) {
        return toast.error("Please Fill Description");
      }
      const newArray = memberList.map(({ id, employee_id }) => ({
        user_id: id,
        employee_id,
      }));

      const formData = new FormData();
      formData.append("project_name", data?.project_name);
      formData.append("end_date", data?.end_date);
      formData.append("start_date", data.start_date);
      imageFile && formData.append("file", imageFile);
      formData.append("priority_id", data?.priority_id);
      formData.append("status", 1);
      formData.append("description", content);
      newArray.forEach((member, index) => {
        formData.append(`members[${index}][user_id]`, member.user_id);
        formData.append(`members[${index}][employee_id]`, member.employee_id);
      });
      formData.append("created_by", "superadmin");

      let res;

      if (selectedId) {
        res = await newRequest.post(
          `${PROJECT_LIST}/${selectedId}`, // URL with dynamic ID
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

  const chartData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "My First Dataset",
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(201, 203, 207, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
 console.log(projectListDetails,"projectListDetailsprojectListDetails")
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
          HR Mentor
        </label>
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
            New Task
          </Link>
        </div>
      </div>
      <div className="flex w-full flex-col gap-8 rounded-md bg-white px-5 py-7">
        <div className="flex items-center gap-8 text-xs">
          <div className="flex -space-x-3">
            <div className="flex items-center">
              {projectListDetails?.members.map((member, idx) => (
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
                      width: "50px",
                      height: "50px",
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
          </div>
          <button className="flex w-fit items-center justify-center gap-2 rounded-md border border-[#448FFF] bg-[#448FFF33] px-6 py-2 text-base font-medium text-[#448FFF] focus:outline-none">
          {projectListDetails?.status?.label}
          </button>
        </div>
        <div className="flex items-center gap-8">
          <h1
            onClick={() => setActiveTab("overview")}
            className={`items-centre flex gap-2 text-base font-semibold ${activeTab ? "border-b-2 border-hrmprimaryorange text-hrmprimaryorange" : "text-gray-dark"}`}
          >
            <img
              className="h-5 w-5"
              src={
                activeTab
                  ? "/assets/icons/admin/over-view-color.svg"
                  : "/assets/icons/admin/overview.svg"
              }
              alt=""
            />
            Over View
          </h1>
          <h1
            onClick={() => setActiveTab("task")}
            className={`items-centre flex gap-2 text-base font-semibold ${!activeTab ? "border-b-2 border-hrmprimaryorange text-hrmprimaryorange" : "text-gray-dark"}`}
          >
            <img
              className="h-5 w-5"
              src={
                !activeTab
                  ? "/assets/icons/admin/task-color.svg"
                  : "/assets/icons/admin/task.svg"
              }
              alt=""
            />
            Task
          </h1>{" "}
        </div>
      </div>
      <div className="mt-5 flex w-full gap-6">
        <div className="flex w-1/2 flex-col gap-2 rounded-md bg-white p-6">
          <div style={styles.statsCard} className="w-full">
            <h4 className="items-centre flex gap-1 text-gray-dark">
              Project Progress <span>0%</span>
            </h4>
            <div style={styles.progressBar}>
              <div style={{ ...styles.progress, width: "29.41%" }}></div>
            </div>
          </div>
          <div className="border-b-2 border-gray-soft/50"></div>
          <div className="mb-6 grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
            <div>
              <p className="text-gray-dark">Project#</p>
              <p className="font-semibold">{projectListDetails?.id}</p>
            </div>
            <div>
              <p className="text-gray-dark">Customer</p>
              <p className="font-semibold text-textcolor-red">
                {projectListDetails?.project_name}
              </p>
            </div>
            <div>
              <p className="text-gray-dark">Status</p>
              <p className="font-semibold">
                {projectListDetails?.status?.label}
              </p>
            </div>
            <div>
              <p className="text-gray-dark">Date Created</p>
              <p className="font-semibold">
                {projectListDetails?.created_date

                  ? new Intl.DateTimeFormat("en-US", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    }).format(new Date(projectListDetails.created_date
                    ))
                  : "N/A"}
              </p>
            </div>
            <div>
              <p className="text-gray-dark">Start Date</p>
              <p className="font-semibold">{projectListDetails?.start_date}</p>
            </div>
            <div>
              <p className="text-gray-dark">Deadline</p>
              <p className="font-semibold">{projectListDetails?.end_date}</p>
            </div>
            <div>
              <p className="text-gray-dark">Total Logged Hours</p>
              <p className="font-semibold"></p>
            </div>
            <div>
              <p className="text-gray-dark">Description</p>
              <p className="text-gray-dark">
                {projectListDetails?.description}
              </p>
            </div>
          </div>
        </div>
        <div style={styles.container} className="w-1/2">
          <div style={styles.statsContainer} className="w-full">
            <div
              style={styles.statsCard}
              className="flex w-full flex-col items-start rounded-md bg-white p-4"
            >
              <h4 className="flex flex-col items-start">
                12 / 17 Open Task <span>29.41%</span>
              </h4>

              <div style={styles.progressBar} className="">
                <div style={{ ...styles.progress, width: "29.41%" }}></div>
              </div>
            </div>
            <div
              style={styles.statsCard}
              className="flex w-full flex-col items-start rounded-md bg-white p-4"
            >
              <h4 className="flex flex-col items-start">
                12 / 17 Open Task <span>29.41%</span>
              </h4>
              <div style={styles.progressBar} className="">
                <div style={{ ...styles.progress, width: "1.89%" }}></div>
              </div>
            </div>
          </div>
          <div style={styles.chartSection}>
            <Bar data={chartData} options={{ maintainAspectRatio: false }} />
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
                  Add New Task
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
                  <label>Task Name</label>
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
                    {errors.featured_image && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.featured_image?.message}
                      </span>
                    )}
                  </div>
                  <div className="flex w-[50%] flex-col gap-1.5 py-2">
                    <label className="required text-[0.8rem] font-medium text-[#3A3A3A]">
                      Status
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

const styles = {
  container: {
    // padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  avatars: {
    display: "flex",
    gap: "10px",
  },
  avatar: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: "#ccc",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
  },
  statusButton: {
    padding: "10px 0px",
    backgroundColor: "#4caf50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  overviewSection: {
    marginBottom: "20px",
  },
  sectionTitle: {
    marginBottom: "10px",
  },
  statsContainer: {
    display: "flex",
    gap: "20px",
    marginBottom: "20px",
    width: "100%",
  },
  statsCard: {
    // flex: "1",
    // padding: "20px",
    // borderRadius: "10px",
    // backgroundColor: "#f9f9f9",
    // boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  progressBar: {
    width: "100%",
    height: "10px",
    backgroundColor: "#ddd",
    borderRadius: "5px",
    overflow: "hidden",
    margin: "10px 0",
  },
  progress: {
    height: "100%",
    backgroundColor: "#4caf50",
  },
  chartSection: {
    height: "300px",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  },
};

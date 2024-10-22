import MenuHeader from "@/components/common/MenuHeader";
import CreateJobSideBar from "@/components/sidebars/recruiter/CreateJobSideBar";
import QueryTable from "@/components/table/QueryTable";
import {
  ArrowLeft,
  Facebook,
  Link2,
  Linkedin,
  Plus,
  Search,
  Trash2,
  Twitter,
} from "lucide-react";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import ReactQuill from "react-quill";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { EmployeeSchema } from "@/schema/dashboard/employee/form/employee.schema";
import { customSelectStyles } from "@/utils/customStyles";
import { genders } from "@/constants/data";
import { recJobReferSchema } from "@/schema/dashboard/recruiter/job/applicationQuestion.schema";
import { newFormRequest } from "@/api";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
export const TableData = [
  {
    id: 1,
    name: "Amal Joseph",
    addNo: "#123456",
    designation: "UI/UX Designer",
    type: "Freelance",
    department: "UI/UX Designer",
    location: "Trivandrum",
    status: "Onboarding Pending",
  },
];
export const RecRequestRefferal = () => {
  const queryClient = useQueryClient();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const jid = searchParams.get("jid");
  const {
    register,
    handleSubmit,
    control,
    setValue,
    setError,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    mode: "on",
    reValidateMode: "onChange",
    resolver: yupResolver(recJobReferSchema),
  });
  const [description, setDescription] = useState("");

  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const [selectedField, setSelectedField] = useState("");
  const list = React.useMemo(() => TableData, [TableData]);
  // const location = useLocation();
  const columns = React.useMemo(
    () => [
      {
        header: "Job Title",
        accessorKey: "name",
      },

      {
        header: "Receipts",
        accessorKey: "type",
      },
      {
        header: "Subject ",
        accessorKey: "designation",
        cell: ({ row }) => <p className="">{row?.original?.designation}</p>,
      },

      {
        header: "",
        accessorKey: "action",
        cell: ({ row }) => (
          <div className="flex items-center gap-2 text-xs">
            <Link
              to={""}
              className="flex size-7 cursor-pointer items-center rounded-full bg-[#EBEBF0] p-2"
            >
              <img
                src="/assets/icons/admin/marker.svg"
                className="w-full object-contain"
              />
            </Link>
            <Link className="flex cursor-pointer items-center justify-center rounded-full bg-[#EBEBF0] p-2">
              <Trash2 className="size-3 text-[#AB2727]" />
            </Link>
          </div>
        ),
      },
    ],
    [],
  );

  const onSubmit = (data) => {
    setLoader(true);
    handleEmployee(data);
  };

  const handleEmployee = async (data) => {
    const formData = {
      job_id: 6,
      subject: "Refferel Mail",
      subject: "Note This Job",
      recipients: {
        user_id: 44,
      },
    };
    formData.append("mobile_number", data.mobile_number);
    formData.append("work_email", data.work_email);
    formData.append("personal_email", data.personal_email);
    formData.append(
      "national_insurance_number",
      data.national_insurance_number,
    );
    formData.append("home_address", data.home_address);
    formData.append("communication_address", data.communication_address);
    formData.append("department_id", data.department_id?.id);
    formData.append("worklocation_id", data.worklocation_id?.id);
    formData.append("employment_type", data.employment_type?.id);
    formData.append("designation_id", data.designation_id?.id);
    formData.append("date_of_joining", data.date_of_joining);
    data.role_id.forEach((role) => {
      formData.append("role_id[]", role.id);
    });
    formData.append("country_id", data.country_id?.id);
    formData.append("city_id", data.city_id?.id);
    formData.append("state_id", data.state_id?.id);
    imageFile && formData.append("profile_image", imageFile);
    formData.append("same_as_home", sameAsHome ? 1 : 0);

    try {
      let res;
      if (selectedField != 0) {
        res = await newFormRequest.post(`${UPDATE_EMPLOYEE}/${uid}`, formData);
      } else {
        res = await newFormRequest.post(EMPLOYEE, formData);
      }
      if (res.data?.status === 201) {
        toast.success(res?.data?.message);
        queryClient.invalidateQueries(["employeeDetails"]);
        queryClient.invalidateQueries(["employeeListing"]);
        clearImage();
        reset();
        setLoader(false);
      } else {
        toast.error("Failed to save employee.");
        setLoader(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to save employee.");
      setLoader(false);
    }
  };

  const modules = {
    toolbar: {
      container: "#toolbar", // Attach the toolbar to a custom container
    },
  };
  return (
    <div>
      <MenuHeader
        backlink={""}
        menu={"Menu"}
        subMenu={""}
        currentpath={"Recruiter"}
        activeMenu={"Jobs"}
      />
      <div className="flex flex-row items-start justify-between gap-3">
        <div className="w-full">
          <div className="mb-3 mt-1 flex items-center justify-between">
            <h1 className="flex flex-row items-center justify-center gap-2 text-base font-bold text-black">
              <ArrowLeft
                onClick={() => {
                  history.back();
                }}
                className="size-4 cursor-pointer"
              />
              Create New Job <div className="h-4 w-[.07rem] bg-[#B0B0B0]"></div>
              <span className="text-sm font-medium text-[#2C2C2C]">Refer</span>
            </h1>
            <button
              type="button"
              onClick={() => {
                navigate(`/admin/recruiter/jobs/promote-job?jid=${jid}`);
              }}
              className="btn flex h-10 min-h-10 min-w-24 items-center rounded bg-hrmprimaryorange text-sm font-medium text-white transition-all duration-500 hover:bg-[#030E5C]/70"
            >
              Next
            </button>
          </div>

          <div className="h-full w-full rounded-md bg-white px-7 py-4">
            <div className="mb-7 flex flex-col gap-1">
              <p className="text-base font-medium text-black/90">
                Invite you college for refer candidates for the job.
              </p>
              <p className="text-medium text-sm text-[#7F7F7F]">
                Edit the email text to include the specific details of your
                referral program or highlight your incentive
              </p>
            </div>
            <p className="text-[0.94rem] font-semibold text-black/90">
              Request Refferals
            </p>
            <form className="my-4 grid grid-cols-2 gap-4">
              <div className="group flex flex-col gap-1.5">
                <label className="required label-text">Recipient</label>
                <Controller
                  name="Recipient"
                  className=""
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      isSearchable={true}
                      styles={customSelectStyles}
                      options={genders}
                      placeholder="Select Gender"
                      className="input-box"
                    />
                  )}
                />
                {errors.gender && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.gender.message}
                  </span>
                )}
              </div>
              <div className="group flex flex-col gap-1.5">
                <label className="required label-text">Subject</label>
                <input type="text" className="input-box" />
                {errors.gender && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.gender.message}
                  </span>
                )}
              </div>
              <div className="text-editor col-span-2 my-4 w-full rounded-md">
                <div
                  id="toolbar"
                  className="mb-2 flex items-center rounded border border-[#ECE9F1] bg-gray-50 p-2"
                >
                  <button className="ql-bold"></button>
                  <button className="ql-italic"></button>
                  <button className="ql-underline"></button>
                  <button className="ql-strike"></button>
                  <select className="ql-header">
                    <option value="1"></option>
                    <option value="2"></option>
                    <option selected></option>
                  </select>
                  <select className="ql-font">
                    <option value="sans-serif">Sans Serif</option>
                    <option value="serif">Serif</option>
                    <option value="monospace">Monospace</option>
                  </select>
                  <select className="ql-align">
                    <option selected></option>
                    <option value="center"></option>
                    <option value="right"></option>
                    <option value="justify"></option>
                  </select>
                  <select className="ql-color"></select>
                  <select className="ql-background"></select>
                  <button className="ql-list" value="ordered"></button>
                  <button className="ql-list" value="bullet"></button>
                  <button className="ql-link"></button>
                  <button className="ql-image"></button>
                  <button className="ql-clean"></button>
                </div>

                <ReactQuill
                  theme="snow"
                  modules={modules}
                  placeholder={"Write something awesome..."}
                  className="h-36 w-full rounded-md border border-[#ECE9F1]"
                />
              </div>
              <button
                type="submit"
                className="flex h-11 w-fit min-w-52 cursor-pointer items-center justify-center gap-2 rounded-md bg-hrmblack text-sm font-normal text-white focus:outline-none"
                disabled={loader}
              >
                {loader ? (
                  <div className="flex items-center gap-3">
                    <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
                    {selectedField ? "Updating" : "Saving"}
                  </div>
                ) : (
                  <span>{selectedField ? "Update" : "Save"}</span>
                )}
              </button>
            </form>
            <QueryTable columns={columns} list={list} />
            <div className="my-10 flex flex-col gap-1">
              <h3 className="text-base font-semibold">Share via</h3>
              <p className="text-sm text-[#7F7F7F]">
                Share this job with your Facebook, LinkedIn, and Twitter
                connections to spread the word that you're hiring.
              </p>
              <div className="flex items-center gap-2">
                <div className="flex size-10 items-center justify-center rounded-full border border-[#ECE9F1]">
                  <Linkedin
                    strokeWidth={0.5}
                    className="size-5 fill-[#0071BC] text-[#0071BC]"
                  />
                </div>
                <div className="flex size-10 items-center justify-center rounded-full border border-[#ECE9F1]">
                  <Facebook
                    strokeWidth={0.5}
                    className="size-5 fill-[#0071BC] text-[#0071BC]"
                  />
                </div>
                <div className="flex size-10 items-center justify-center rounded-full border border-[#ECE9F1]">
                  <Twitter
                    strokeWidth={0.5}
                    className="size-5 fill-[#1DA1F2] text-[#1DA1F2]"
                  />
                </div>
                <div className="flex size-10 items-center justify-center rounded-full border border-[#ECE9F1]">
                  <Link2 className="size-5 -rotate-45" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <CreateJobSideBar stepCounter={5} />
      </div>
    </div>
  );
};

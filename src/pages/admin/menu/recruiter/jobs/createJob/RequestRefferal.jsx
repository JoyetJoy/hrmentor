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
import ReactQuill from "react-quill";
import { Link } from "react-router-dom";
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
  {
    id: 2,
    name: "John Doe",
    addNo: "#654321",
    designation: "Software Engineer",
    type: "Permanent",
    department: "Engineering",
    location: "Kochi",
    status: "Active",
  },
  {
    id: 3,
    name: "Jane Smith",
    addNo: "#112233",
    designation: "Product Manager",
    type: "Freelance",
    department: "Product Management",
    location: "Bangalore",
    status: "Onboarding Pending",
  },
];
export const RequestRefferal = () => {
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
  const [value, setValue] = useState("");

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
              <ArrowLeft className="size-4" />
              Create New Job <div className="h-4 w-[.07rem] bg-[#B0B0B0]"></div>
              <span className="text-sm font-medium text-[#2C2C2C]">Refer</span>
            </h1>
            <Link
              to={""}
              className="btn h-11 min-h-11 rounded-md bg-bgColor-100 px-6 text-sm text-white font-normal hover:bg-bgColor-100"
            >
              Next
            </Link>
          </div>

          <div className="h-full w-full rounded-md bg-white px-7 py-4">
            <div className="mb-7 flex flex-col gap-1">
              <p className="text-base font-medium text-[#2C2C2C]">
                Invite you college for refer candidates for the job.
              </p>
              <p className="text-medium text-sm text-[#7F7F7F]">
                Edit the email text to include the specific details of your
                referral program or highlight your incentive
              </p>
            </div>
            <div className="my-4 grid grid-cols-2 gap-4  ">
              <div className="input-box h-10 w-full">
                <input
                  type="text"
                  className="h-full w-full placeholder:text-[#7F7F7F]"
                  placeholder="Search"
                />
              </div>
              <div className="input-box h-10 w-full">
                <input
                  type="text"
                  className="h-full w-full placeholder:text-[#7F7F7F]"
                  placeholder="Search"
                />
              </div>
              <div className="text-editor col-span-2 my-4 w-full  rounded-md  ">
                <div
                  id="toolbar"
                  className="mb-2 flex items-center rounded  bg-gray-50 p-2 border border-[#ECE9F1]"
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
                  className="h-36 w-full border border-[#ECE9F1] rounded-md"
                />
              </div>
              <button
                // onClick={() => navigate("/admin/recruiter/request-refferals")}
                className="my-4 flex h-10 w-36 cursor-pointer items-center justify-center rounded-md bg-[#181C3A] font-semibold text-white"
              >
                Save
              </button>
            </div>
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
        <CreateJobSideBar />
      </div>
    </div>
  );
};

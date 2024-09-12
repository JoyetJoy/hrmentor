import MenuHeader from "@/components/common/MenuHeader";
import RecruiterSideBar from "@/components/sidebars/recruiter/RecruiterSideBar";
import { customSelectStyles } from "@/utils/customStyles";
import { Button, Select } from "@headlessui/react";
import { ArrowLeft, Send } from "lucide-react";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

function Refer() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    // resolver: yupResolver(schema),
  });
  return (
    <div>
      <MenuHeader
        backlink={""}
        menu={"Menu"}
        subMenu={""}
        currentpath={"Recruiter"}
        activeMenu={"Jobs"}
      />
      <div className="my-4 flex flex-row items-center justify-between">
        <h1 className="flex items-center gap-1 text-base font-bold text-[#2C2C2C]">
          <ArrowLeft className="size-4" />
          Project manger
        </h1>
        <div className="flex gap-5">
          <Link
            to="/admin/recruiter/candidate"
            className={`text-sm ${
              location.pathname === "/admin/recruiter/candidate"
                ? "active-menu px-2 font-extrabold text-[#181C3A] before:bg-[#181C3A]"
                : "text-[#808080]"
            }`}
          >
            Candidate
          </Link>

          <Link
            to="/admin/recruiter/promote"
            className={`text-sm ${
              location.pathname === "/admin/recruiter/promote"
                ? "active-menu px-2 font-extrabold text-[#181C3A] before:bg-[#181C3A]"
                : "text-[#808080]"
            }`}
          >
            Promote
          </Link>

          <Link
            to="/admin/recruiter/refer"
            className={`text-sm ${
              location.pathname === "/admin/recruiter/refer"
                ? "active-menu px-2 font-extrabold text-[#181C3A] before:bg-[#181C3A]"
                : "text-[#808080]"
            }`}
          >
            Refer
          </Link>
        </div>
      </div>
      <div className="my-3 flex flex-row gap-2">
        <RecruiterSideBar />
        <div className="w-full rounded-md bg-white p-6">
          <h1 className="mb-4 text-base font-semibold">Refer</h1>
          <div className="flex flex-col items-baseline gap-5">
            <div className="flex h-full w-full flex-col gap-1">
              <label className="label-text">Subject</label>
              <input
                type="text"
                className="input-box h-10 w-3/5 border-2 border-[#C2C1C1] focus:border-[#C2C1C1]"
              />
            </div>
            <div className="flex h-full w-full flex-col gap-1">
              <label className="label-text">Choose Template</label>
              <Select
                placeholder="Select the item"
                className="input-box h-9 w-1/3 border-2 border-[#C2C1C1] focus:border-[#C2C1C1]"
              ></Select>
            </div>
            <div className="flex h-full w-full flex-col gap-1">
              <label className="label-text">Recipient</label>
              <input
                type="text"
                placeholder="Enter the email "
                className="input-box h-12 w-3/5 border-2 border-[#C2C1C1] placeholder:text-[#C2C1C1] focus:border-[#C2C1C1]"
              ></input>
            </div>
            <div className="flex h-full w-full flex-col gap-1">
              <label className="label-text">Message</label>
              <textarea className="input-box h-40 w-3/5 border-2 border-[#C2C1C1] focus:border-[#C2C1C1]"></textarea>
            </div>
          </div>
          <Link
            to={"/admin/recruiter/job-details"}
            className="btn mt-14 flex w-32 flex-row gap-2 bg-bgColor-100 text-sm font-normal text-white hover:bg-bgColor-100"
          >
            {" "}
            <Send className="size-4 text-white" strokeWidth={1} /> Send
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Refer;

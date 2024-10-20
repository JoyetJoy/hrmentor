import MenuHeader from "@/components/common/MenuHeader";
import { ArrowLeft } from "lucide-react";
import Select from "react-select";
import { Controller, useForm } from "react-hook-form";
import { customSelectStyles } from "@/utils/customStyles";
import ReactQuill from "react-quill";
// import EditorToolbar, { modules, formats } from "./EditorToolbar";
import "react-quill/dist/quill.snow.css";
import React from "react";
import { useNavigate } from "react-router-dom";

export const RecJobInterviewGuide = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    // resolver: yupResolver(schema),
  });

  const [state, setState] = React.useState({ value: null });
  const handleChange = (value) => {
    setState({ value });
  };
  const modules = {
    toolbar: {
      container: "#toolbar", // Attach the toolbar to a custom container
    },
  };
  return (
    <>
      <MenuHeader
        backlink={""}
        menu={"Menu"}
        subMenu={""}
        currentpath={"Recruiter"}
        activeMenu={"Jobs"}
      />

      <div className="my-1 h-screen w-full overflow-hidden rounded-md bg-white p-3">
        <div className="flex items-center gap-2">
          <ArrowLeft className="size-4" />
          <p className="text-base font-bold text-black">Create New Job </p>
        </div>
        <div className="grid grid-cols-2 gap-x-10">
          <div className="grid grid-cols-2 gap-x-3 py-2">
            <div className="group flex flex-col px-3 py-2">
              <label className="label-text">Blood Group</label>
              <Controller
                name="bloodGroup"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    // required
                    //   selected={''}
                    //   value={''}
                    //   onChange={(selectedOption) => {
                    //     handle(selectedOption);
                    //     field.onChange(selectedOption);
                    //   }}
                    //   options={}
                    isSearchable={false}
                    styles={customSelectStyles}
                    placeholder="Select Gender"
                    className="input-box h-10 w-full focus:border-gray-300"
                  />
                )}
              />
              {errors.bloodGroup && (
                <span className="text-xs font-medium text-red-500">
                  {errors.bloodGroup?.message}
                </span>
              )}
            </div>
            <div className="group flex flex-col px-3 py-2">
              <label className="label-text">Blood Group</label>
              <Controller
                name="bloodGroup"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    // required
                    //   selected={''}
                    //   value={''}
                    //   onChange={(selectedOption) => {
                    //     handle(selectedOption);
                    //     field.onChange(selectedOption);
                    //   }}
                    //   options={}
                    isSearchable={false}
                    styles={customSelectStyles}
                    placeholder="Select Gender"
                    className="input-box h-10 w-full focus:border-gray-300"
                  />
                )}
              />
              {errors.bloodGroup && (
                <span className="text-xs font-medium text-red-500">
                  {errors.bloodGroup?.message}
                </span>
              )}
            </div>
            <div className="group flex flex-col px-3 py-2">
              <label className="label-text">Blood Group</label>
              <Controller
                name="bloodGroup"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    // required
                    //   selected={''}
                    //   value={''}
                    //   onChange={(selectedOption) => {
                    //     handle(selectedOption);
                    //     field.onChange(selectedOption);
                    //   }}
                    //   options={}
                    isSearchable={false}
                    styles={customSelectStyles}
                    placeholder="Select Gender"
                    className="input-box h-10 w-full focus:border-gray-300"
                  />
                )}
              />
              {errors.bloodGroup && (
                <span className="text-xs font-medium text-red-500">
                  {errors.bloodGroup?.message}
                </span>
              )}
            </div>
            <div className="group flex flex-col px-3 py-2">
              <label className="label-text">Blood Group</label>
              <Controller
                name="bloodGroup"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    // required
                    //   selected={''}
                    //   value={''}
                    //   onChange={(selectedOption) => {
                    //     handle(selectedOption);
                    //     field.onChange(selectedOption);
                    //   }}
                    //   options={}
                    isSearchable={false}
                    styles={customSelectStyles}
                    placeholder="Select Gender"
                    className="input-box h-10 w-full focus:border-gray-300"
                  />
                )}
              />
              {errors.bloodGroup && (
                <span className="text-xs font-medium text-red-500">
                  {errors.bloodGroup?.message}
                </span>
              )}
            </div>
            <div className="group flex flex-col px-3 py-2">
              <label className="label-text">Blood Group</label>
              <Controller
                name="bloodGroup"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    // required
                    //   selected={''}
                    //   value={''}
                    //   onChange={(selectedOption) => {
                    //     handle(selectedOption);
                    //     field.onChange(selectedOption);
                    //   }}
                    //   options={}
                    isSearchable={false}
                    styles={customSelectStyles}
                    placeholder="Select Gender"
                    className="input-box h-10 w-full focus:border-gray-300"
                  />
                )}
              />
              {errors.bloodGroup && (
                <span className="text-xs font-medium text-red-500">
                  {errors.bloodGroup?.message}
                </span>
              )}
            </div>
            <div className="group flex flex-col px-3 py-2">
              <label className="label-text">Blood Group</label>
              <Controller
                name="bloodGroup"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    // required
                    //   selected={''}
                    //   value={''}
                    //   onChange={(selectedOption) => {
                    //     handle(selectedOption);
                    //     field.onChange(selectedOption);
                    //   }}
                    //   options={}
                    isSearchable={false}
                    styles={customSelectStyles}
                    placeholder="Select Gender"
                    className="input-box h-10 w-full focus:border-gray-300"
                  />
                )}
              />
              {errors.bloodGroup && (
                <span className="text-xs font-medium text-red-500">
                  {errors.bloodGroup?.message}
                </span>
              )}
            </div>
            <div className="my-5 flex gap-5 px-3 py-2">
              <div className="flex h-10 w-1/2 items-center justify-center rounded-md border border-[#ECE9F1] font-semibold">
                Cancel
              </div>
              <button
                // onClick={() => navigate("/admin/recruiter/request-refferals")}
                className="flex h-10 w-1/2 cursor-pointer items-center justify-center rounded-md bg-[#181C3A] font-semibold text-white"
              >
                Save
              </button>
            </div>
          </div>
          <div>
            <div className="group flex flex-col px-3 py-2">
              <label className="label-text">Preparation notes</label>
              <div
                id="toolbar"
                className="mb-2 flex items-center rounded border bg-gray-50 p-2"
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
              {/* <EditorToolbar /> */}
              <ReactQuill
                theme="snow"
                value={state}
                onChange={handleChange}
                placeholder={"Write something awesome..."}
                className="h-36"
                modules={modules}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Select from "react-select";
import { customSelectStyles } from "@/utils/customStyles";

// Validation Schema
const leaveSchema = Yup.object().shape({
  departmentAvailableTo: Yup.array()
    .min(1, "Select at least one department")
    .required("Available departments are required"),
  departmentExcept: Yup.array()
    .min(1, "Select at least one department")
    .required("Except departments are required"),
  locationAvailableTo: Yup.array()
    .min(1, "Select at least one location")
    .required("Available locations are required"),
  locationExcept: Yup.array()
    .min(1, "Select at least one location")
    .required("Except locations are required"),
  genderAvailableTo: Yup.array()
    .min(1, "Select at least one gender")
    .required("Available genders are required"),
  genderExcept: Yup.array()
    .min(1, "Select at least one gender")
    .required("Except genders are required"),
  roleAvailableTo: Yup.array()
    .min(1, "Select at least one role")
    .required("Available roles are required"),
  roleExcept: Yup.array()
    .min(1, "Select at least one role")
    .required("Except roles are required"),
});

const available = [
  { id: 1, label: "All Department", value: "All Department" },
  { id: 2, label: "Marketing", value: "Marketing" },
  { id: 3, label: "Sales", value: "Sales" },
];
const availableExcept = [
  { id: 1, label: "All Department", value: "All Department" },
  { id: 2, label: "Marketing", value: "Marketing" },
  { id: 3, label: "Sales", value: "Sales" },
];
const location = [
  { id: 1, label: "All Location", value: "All Location" },
  { id: 2, label: "Kochi", value: "Kochi" },
  { id: 3, label: "Kollam", value: "Kollam" },
];
const locationExcept = [
  { id: 1, label: "All Location", value: "All Location" },
  { id: 2, label: "Kochi", value: "Kochi" },
  { id: 3, label: "Kollam", value: "Kollam" },
];
const gender = [
  { id: 1, label: "All Gender", value: "All Gender" },
  { id: 2, label: "Male", value: "Male" },
  { id: 3, label: "Female", value: "Female" },
];
const genderExcept = [
  { id: 1, label: "All Gender", value: "All Gender" },
  { id: 2, label: "Male", value: "Male" },
  { id: 3, label: "Female", value: "Female" },
];
const role = [
  { id: 1, label: "All Role", value: "All Role" },
  { id: 2, label: "Developer", value: "Developer" },
  { id: 3, label: "Tester", value: "Tester" },
];
const roleExcept = [
  { id: 1, label: "All Role", value: "All Role" },
  { id: 2, label: "Developer", value: "Developer" },
  { id: 3, label: "Tester", value: "Tester" },
];

const AvailabilitySettings = ({ formtype = "save" }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(leaveSchema),
  });

  const [loader, setLoader] = useState(false);

  const onSubmit = (data) => {
    console.log("Form data:", data);
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
      console.log(
        formtype === "update" ? "Updated successfully!" : "Saved successfully!"
      );
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full p-5">
      <div className="flex w-full flex-row items-center justify-between">
        <h1 className="text-lg font-bold">AvailabilitySettings</h1>
      </div>

      <div className="grid gap-x-3 lg:grid-cols-2 mt-5">
        <div className="mt-4 w-full flex flex-col gap-3">
          {/* Sections */}
          {[
            {
              title: "Department",
              fields: ["departmentAvailableTo", "departmentExcept"],
              options: [available, availableExcept],
            },
            {
              title: "Office locations",
              fields: ["locationAvailableTo", "locationExcept"],
              options: [location, locationExcept],
            },
            {
              title: "Gender",
              fields: ["genderAvailableTo", "genderExcept"],
              options: [gender, genderExcept],
            },
            {
              title: "Roles",
              fields: ["roleAvailableTo", "roleExcept"],
              options: [role, roleExcept],
            },
          ].map(({ title, fields, options }) => (
            <div key={title} className="flex flex-col gap-3">
              <div className="text-[0.9rem] font-bold">{title}</div>
              <div className="w-full grid grid-cols-2 gap-3">
                {fields.map((field, idx) => (
                  <div className="group flex flex-col gap-1.5" key={field}>
                    <label className="required label-text">
                      {idx === 0 ? "Available to" : "Except"}
                    </label>
                    <Controller
                      name={field}
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          isSearchable={true}
                          styles={customSelectStyles}
                          options={options[idx]}
                          isMulti
                          placeholder={`Select ${title}`}
                          className="input-box h-fit"
                        />
                      )}
                    />
                    {errors[field] && (
                      <span className="text-xs font-medium text-red-500">
                        {errors[field].message}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Buttons */}
          <div className="mt-6 flex items-center justify-end gap-4">
            <button
              type="button"
              className="btn flex h-10 min-h-10 min-w-[10rem] items-center border border-gray-400 bg-white text-sm font-medium text-gray-700 hover:bg-gray-100"
              onClick={() => console.log("Cancel clicked")}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn flex h-10 min-h-10 min-w-[10rem] items-center bg-hrmblack text-sm font-medium text-white transition-all duration-500 hover:bg-hrmdarkblue/70"
            >
              {loader ? (
                <div className="flex items-center gap-3">
                  <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
                  {formtype === "update" ? "Updating" : "Saving"}
                </div>
              ) : (
                <>{formtype === "update" ? "Update" : "Save"}</>
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AvailabilitySettings;

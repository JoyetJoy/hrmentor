import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { Plus , Minus} from 'lucide-react';
import { yupResolver } from "@hookform/resolvers/yup";
import Select from "react-select";

const customSelectStyles = {
  control: (base) => ({
    ...base,
    borderColor: "#cacaca",
  }),
};

const statusOptions = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];
const accrualPeriodOptions = [
  { value: "annual", label: "Annual" },
  { value: "monthly", label: "Monthly" },
];

// Validation Schema
const leaveSchema = Yup.object().shape({
  leaveName: Yup.string().required("Name of the leave is required"),
  displayName: Yup.string().required("Display name is required"),
  code: Yup.string()
    .required("Code is required")
    .matches(
      /^[A-Za-z0-9_-]+$/,
      "Code must be alphanumeric and can include dashes or underscores",
    ),
  description: Yup.string()
    .max(200, "Description cannot exceed 200 characters")
    .required("Description is required"),
  validFrom: Yup.date()
    .required("Valid from date is required")
    .typeError("Invalid date format"),
  status: Yup.object().required("Status is required"),
});

const BasicSettings = ({ formtype = "save" }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(leaveSchema),
  });

  const [loader, setLoader] = useState(false);
  const [accrualType, setAccrualType] = useState("bycycle");
  const [applicable, setApplicable] = useState("allemployees");
  const [isOn, setIsOn] = useState(false); // Track the button state
  const [isOn2, setIsOn2] = useState(false); // Track the button state
  const [isOn3, setIsOn3] = useState(false); // Track the button state
  const [units,setUnits] = useState('day')
  const [boxes, setBoxes] = useState([{ id: 1 }]); // Initial box

  // Handler to add a new box
  const addBox = () => {
    setBoxes([...boxes, { id: boxes.length + 1 }]);
  };

  // Handler to remove a box
  const removeBox = (id) => {
    setBoxes(boxes.filter((box) => box.id !== id));
  };

  const onSubmit = (data) => {
    console.log("Form data:", data);
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
      console.log(
        formtype === "update" ? "Updated successfully!" : "Saved successfully!",
      );
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full p-5">
      <div className="flex w-full flex-row items-center justify-between">
        <h1 className="text-lg font-bold">Basic Settings</h1>
      </div>

      <div className="grid gap-x-3 lg:grid-cols-2">
        <div className="mt-4 w-full">
          <div className="flex w-full gap-2">
            {/* Name of the Leave */}
            <div className="flex w-[50%] flex-col gap-1.5 py-2">
              <label className="required label-text">Name of the Leave</label>
              <input
                autoComplete="off"
                type="text"
                placeholder="Enter Name of the Leave"
                {...register("leaveName")}
                className="input-box"
              />
              {errors.leaveName && (
                <span className="text-xs font-medium text-red-500">
                  {errors.leaveName.message}
                </span>
              )}
            </div>

            {/* Display Name */}
            <div className="group col-span-2 flex w-[50%] flex-col gap-1.5 py-2">
              <label className="required label-text">Display Name</label>
              <input
                autoComplete="off"
                type="text"
                placeholder="Enter Display Name"
                {...register("displayName")}
                className="input-box"
              />
              {errors.displayName && (
                <span className="text-xs font-medium text-red-500">
                  {errors.displayName.message}
                </span>
              )}
            </div>
          </div>
          {/* Code */}
          <div className="group col-span-2 flex w-full flex-col gap-1.5 py-2 lg:w-[49.5%]">
            <label className="required label-text">Code</label>
            <input
              autoComplete="off"
              type="text"
              placeholder="Enter Code"
              {...register("code")}
              className="input-box"
            />
            {errors.code && (
              <span className="text-xs font-medium text-red-500">
                {errors.code.message}
              </span>
            )}
          </div>
          <div className="grid grid-cols-2">
            <div className="group mt-2 flex flex-col gap-3 text-[0.85rem] font-medium">
              <label className="required label-text">Pay type</label>
              <div className="flex gap-3">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="leaveStatus"
                    value="paid"
                    onClick={() => setRejected(false)}
                    className="radio-black"
                    defaultChecked
                  />
                  <label className="text-sm font-normal">Paid</label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="leaveStatus"
                    value="unpaid"
                    onClick={() => setRejected(false)}
                    className="radio-black"
                  />
                  <label className="text-sm font-normal">Unpaid</label>
                </div>
              </div>
            </div>
            <div className="group mt-2 flex flex-col gap-3 text-[0.85rem] font-medium">
              <label className="required label-text">Units</label>
              <div className="flex gap-3">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="unitStatus"
                    value="days"
                    onClick={() => setUnits('day')}
                    className="radio-black"
                    defaultChecked
                  />
                  <label className="text-sm font-normal">Days</label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="unitStatus"
                    value="hours"
                    onClick={() => setUnits('hour')}
                    className="radio-black"
                  />
                  <label className="text-sm font-normal">Hours</label>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="group col-span-2 flex flex-col gap-1.5 py-2">
            <label className="required label-text">Description</label>
            <textarea
              autoComplete="off"
              placeholder="Enter Description"
              {...register("description")}
              className="input-box h-20"
            ></textarea>
            {errors.description && (
              <span className="text-xs font-medium text-red-500">
                {errors.description.message}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Valid From */}
            <div className="group flex flex-col gap-1.5 py-2">
              <label className="required label-text">Valid From</label>
              <input
                autoComplete="off"
                type="date"
                {...register("validFrom")}
                className="input-box"
              />
              {errors.validFrom && (
                <span className="text-xs font-medium text-red-500">
                  {errors.validFrom.message}
                </span>
              )}
            </div>

            {/* Status */}
            <div className="group flex flex-col gap-1.5 py-2">
              <label className="text-sm font-medium">Status</label>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    isSearchable
                    // styles={customSelectStyles}
                    options={statusOptions}
                    placeholder="Select a status"
                    onChange={(selectedOption) => {
                      field.onChange(selectedOption);
                      setSelectedlocationId(selectedOption.value);
                    }}
                    className="input-box w-full"
                  />
                )}
              />
              {errors.status && (
                <span className="text-xs text-red-500">
                  {errors.status.message}
                </span>
              )}
            </div>
          </div>

          <div className="text-[0.85rem] font-semibold">Leave accrual</div>
          <div className="group mt-2 flex flex-col gap-3 text-[0.85rem] font-medium">
            <label className="required label-text">Accrual type</label>
            <div className="flex gap-3">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="accrualStatus"
                  value="bycycle"
                  onClick={() => setAccrualType("bycycle")}
                  className="radio-black"
                  defaultChecked
                />
                <label className="text-sm font-normal">By cycle</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="accrualStatus"
                  value="byworkingdays"
                  onClick={() => setAccrualType("byworkingdays")}
                  className="radio-black"
                />
                <label className="text-sm font-normal">By Working days</label>
              </div>
            </div>
          </div>
          {accrualType === "bycycle" && (
            <div className="grid grid-cols-2 gap-3">
              {/* Accrual Period */}
              <div className="group flex flex-col gap-1.5 py-2">
                <label className="text-sm font-medium">Accrual period</label>
                <Controller
                  name="accrualPeriod"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      isSearchable
                      options={[
                        { value: "annually", label: "Annually" },
                        { value: "monthly", label: "Monthly" },
                      ]}
                      placeholder="Select a period"
                      onChange={(selectedOption) => {
                        field.onChange(selectedOption);
                        setSelectedlocationId(selectedOption.value);
                      }}
                      className="input-box w-full overflow-hidden"
                    />
                  )}
                />
                {errors.accrualPeriod && (
                  <span className="text-xs text-red-500">
                    {errors.accrualPeriod.message}
                  </span>
                )}
              </div>

              {/* Accrual Days */}
              <div className="group flex flex-col gap-1.5 py-2">
                <label className="text-sm font-medium">Accrual day(s)</label>
                <Controller
                  name="accrualDays"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={[
                        ...Array.from({ length: 28 }, (_, i) => ({
                          value: i + 1,
                          label: (i + 1).toString(),
                        })),
                        { value: "lastDay", label: "Last day" }, // Adding the "last day" option
                      ]}
                      placeholder="Select a day"
                      onChange={(selectedOption) => {
                        field.onChange(selectedOption);
                        setSelectedlocationId(selectedOption.value);
                      }}
                      className="input-box w-full overflow-hidden"
                    />
                  )}
                />
                {errors.accrualDays && (
                  <span className="text-xs text-red-500">
                    {errors.accrualDays.message}
                  </span>
                )}
              </div>

              {/* Accrual Month */}
              <div className="group flex flex-col gap-1.5 py-2">
                <label className="text-sm font-medium">Accrual month(s)</label>
                <Controller
                  name="accrualMonth"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      isSearchable
                      options={[
                        { value: "jan", label: "January" },
                        { value: "feb", label: "February" },
                        { value: "mar", label: "March" },
                        { value: "apr", label: "April" },
                        { value: "may", label: "May" },
                        { value: "jun", label: "June" },
                        { value: "jul", label: "July" },
                        { value: "aug", label: "August" },
                        { value: "sep", label: "September" },
                        { value: "oct", label: "October" },
                        { value: "nov", label: "November" },
                        { value: "dec", label: "December" },
                      ]}
                      placeholder="Select a month"
                      onChange={(selectedOption) => {
                        field.onChange(selectedOption);
                        setSelectedlocationId(selectedOption.value);
                      }}
                      className="input-box w-full overflow-hidden"
                    />
                  )}
                />
                {errors.accrualMonth && (
                  <span className="text-xs text-red-500">
                    {errors.accrualMonth.message}
                  </span>
                )}
              </div>
            </div>
          )}
          {accrualType === "byworkingdays" && (
            <div className="grid grid-cols-2 gap-3">
              {/* Accrual Period */}
              <div className="group flex flex-col gap-1.5 py-2">
                <label className="text-sm font-medium">
                  Number of working days to accrual leave
                </label>
                <input autoComplete="off" type="number" className="input-box" />
                {errors.accrualPeriod && (
                  <span className="text-xs text-red-500">
                    {errors.accrualPeriod.message}
                  </span>
                )}
              </div>

              <div className="group flex flex-col gap-1.5 py-2">
                <label className="mb-1 mt-4 text-sm font-medium">
                  Accrual period
                </label>
                <Controller
                  name="accrualPeriod"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      isSearchable
                      options={[
                        { value: "annually", label: "Annually" },
                        { value: "monthly", label: "Monthly" },
                      ]}
                      placeholder="Select a period"
                      onChange={(selectedOption) => {
                        field.onChange(selectedOption);
                        setSelectedlocationId(selectedOption.value);
                      }}
                      className="input-box w-full"
                    />
                  )}
                />
                {errors.accrualPeriod && (
                  <span className="text-xs text-red-500">
                    {errors.accrualPeriod.message}
                  </span>
                )}
              </div>

              {/* Accrual Days */}
              <div className="group flex flex-col gap-1.5 py-2">
                <label className="text-sm font-medium">Accrual at</label>
                <Controller
                  name="accrualat"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={[
                        ...Array.from({ length: 28 }, (_, i) => ({
                          value: i + 1,
                          label: (i + 1).toString(),
                        })),
                        { value: "lastDay", label: "Last day" }, // Adding the "last day" option
                      ]}
                      onChange={(selectedOption) => {
                        field.onChange(selectedOption);
                        setSelectedlocationId(selectedOption.value);
                      }}
                      className="input-box w-full"
                    />
                  )}
                />
                {errors.accrualDays && (
                  <span className="text-xs text-red-500">
                    {errors.accrualDays.message}
                  </span>
                )}
              </div>

              {/* Accrual Month */}
              <div className="group flex flex-col gap-1.5 py-2">
                <label className="required text-sm font-medium">
                  Specific days{" "}
                </label>
                <input autoComplete="off" type="number" className="input-box" />
                {errors.accrualPeriod && (
                  <span className="text-xs text-red-500">
                    {errors.accrualPeriod.message}
                  </span>
                )}
              </div>
            </div>
          )}
          <div className="group mt-2 flex flex-col gap-3 text-[0.85rem] font-medium">
            <label className="required label-text">Applicable to </label>
            <div className="flex gap-3">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="applicableStatus"
                  value="allemployees"
                  onClick={() => setApplicable("allemployees")}
                  className="radio-black"
                  defaultChecked
                />
                <label className="text-sm font-normal">All employees</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="applicableStatus"
                  value="onexperience"
                  onClick={() => setApplicable("onexperience")}
                  className="radio-black"
                />
                <label className="text-sm font-normal">
                  Based on experience
                </label>
              </div>
            </div>
          </div>
          {applicable==='allemployees'&&(
            <div className="grid grid-cols-2">
            <div className="group flex flex-col gap-1.5 py-2">
              <input
                autoComplete="off"
                placeholder={`Number of ${units}(s)`}
                type="number"
                className="input-box"
              />
              {errors.accrualPeriod && (
                <span className="text-xs text-red-500">
                  {errors.accrualPeriod.message}
                </span>
              )}
            </div>
          </div>
          )}
          {applicable === 'onexperience' && (
            <div className="flex flex-col gap-4 mt-2">
              <p className="mt-3 border-l-4 border-hrmprimaryorange bg-[#FFECE7] py-3 pl-3 text-xs font-normal text-gray-darkpale">
                Please make sure that you have covered values from beginning to end
              </p>
              <div className="w-full">
                {boxes.map((box, index) => (
                  <div
                    key={box.id}
                    className={`mb-4 ${index>0?'px-2 py-5':'p-5'} w-full border border-dashed border-black rounded-lg flex flex-row justify-around`}
                  >
                    <div className="flex flex-col w-1/5">
                      <label htmlFor={`years-${box.id}`} className="text-sm font-normal">
                        Years
                      </label>
                      <input
                        type="number"
                        id={`years-${box.id}`}
                        className="input-box h-10 border rounded-md"
                      />
                    </div>
                    <div className="flex flex-col w-1/5">
                      <label htmlFor={`months-${box.id}`} className="text-sm font-normal">
                        Months
                      </label>
                      <input
                        type="number"
                        id={`months-${box.id}`}
                        className="input-box h-10 border rounded-md"
                      />
                    </div>
                    <div className="flex items-center justify-center w-1/6 text-sm font-normal">
                      Will get
                    </div>
                    <div className="flex flex-col w-1/5">
                      <label htmlFor={`days-${box.id}`} className="text-sm font-normal">
                        Days of leave
                      </label>
                      <input
                        type="number"
                        id={`days-${box.id}`}
                        className="input-box h-10 border rounded-md"
                      />
                    </div>
                    <div className={`flex items-center space-x-2 w-1/12 justify-center ${index>0?'w-[5rem]': 'w-1/12'}`}>
                      {/* Show Minus button for boxes after the first one */}
                      {index > 0 && (
                        <div
                          className="h-8 w-8 flex items-center justify-center rounded-full bg-black text-white cursor-pointer"
                          onClick={() => removeBox(box.id)}
                        >
                          <Minus className="size-5" strokeWidth={2} />
                        </div>
                      )}
                      {/* Plus button */}
                      <div
                        className="h-8 w-8 flex items-center justify-center rounded-full bg-hrmprimaryorange text-white cursor-pointer"
                        onClick={addBox}
                      >
                        <Plus className="size-5" strokeWidth={2} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="group col-span-2 flex flex-col gap-1.5 py-2">
            <div className="flex justify-between">
              <p className="text-[0.85rem] font-bold">Carry Forward</p>
              <div
                onClick={() => {
                  if (isOn) {
                    setIsOn(false);
                  } else {
                    setIsOn(true);
                  }
                }}
                className={`h-5 w-10 rounded-full p-[1px] ${isOn ? "bg-[#8be691] pt-[2.1px]" : "border border-[#888888] bg-white"}`}
              >
                <div
                  className={`h-4 w-4 ${isOn ? "bg-[#00b448]" : "bg-black"} transform rounded-full transition-transform ${
                    isOn ? "translate-x-5" : "translate-x-0"
                  }`}
                ></div>
              </div>
            </div>
            <p className="text-[0.85rem] font-normal">
              Number of unused leaves of an employee can be carry forwarded
            </p>
          </div>
          {isOn&&(
            <>
                <div className="group mt-2 flex flex-col gap-3 text-[0.85rem] font-medium">
                    <p className="text-[0.85rem] font-normal">
                    The specified leave count will be automatically carried forward to
                    the next year's leave balance at the end of each year
                    </p>
                    <label className="required label-text">
                    Max no of {units}(s) can be carry forwarded{" "}
                    </label>
                </div>
                <div className="grid grid-cols-2">
                    <div className="group flex flex-col gap-1.5 py-2">
                    <input autoComplete="off" type="number" className="input-box" />
                    {errors.accrualPeriod && (
                        <span className="text-xs text-red-500">
                        {errors.accrualPeriod.message}
                        </span>
                    )}
                    </div>
                </div>
                <div className="group col-span-2 flex flex-col gap-1.5 py-2">
                    <div className="flex justify-between">
                    <p className="text-[0.85rem] font-semibold">
                        Carry forward expires
                    </p>
                    <div
                        onClick={() => {
                        if (isOn2) {
                            setIsOn2(false);
                        } else {
                            setIsOn2(true);
                        }
                        }}
                        className={`h-[1.30rem] w-10 rounded-full p-[1px] ${isOn2 ? "bg-[#8be691] pt-[2px]" : "border border-[#888888] pt-[0.5px] bg-white"}`}
                    >
                        <div
                        className={`h-4 w-4 ${isOn2 ? "bg-[#00b448]" : "bg-black"} transform rounded-full transition-transform ${
                            isOn2 ? "translate-x-5" : "translate-x-0"
                        }`}
                        ></div>
                    </div>
                    </div>
                </div>
                {isOn2&&(
                    <>
                        <div className="group mt-2 flex flex-col gap-3 text-[0.85rem] font-medium">
                            <p className="text-[0.85rem] font-normal">
                            The expiry days for unused carry forwarded leave(s) will be
                            calculated from the beginning of the leave year.
                            </p>
                        </div>
                        <div className="grid grid-cols-2">
                            <div className="group flex flex-col gap-1.5 py-2">
                            <input
                                autoComplete="off"
                                type="number"
                                placeholder="Expires in days"
                                className="input-box"
                            />
                            {errors.accrualPeriod && (
                                <span className="text-xs text-red-500">
                                {errors.accrualPeriod.message}
                                </span>
                            )}
                            </div>
                        </div>
                    </>
                )}
            </>
          )}
          <div className="group col-span-2 flex flex-col gap-1.5 py-2">
            <div className="flex justify-between">
              <p className="text-[0.85rem] font-semibold">Encashments</p>
              <div
                onClick={() => {
                  if (isOn3) {
                    setIsOn3(false);
                  } else {
                    setIsOn3(true);
                  }
                }}
                className={`h-[1.30rem] w-10 rounded-full p-[1px] ${isOn3 ? "bg-[#8be691] pt-[2.5px]" : "border border-[#888888] bg-white pt-[1.2px]"}`}
              >
                <div
                  className={`h-4 w-4 ${isOn3 ? "bg-[#00b448]" : "bg-black"} transform rounded-full transition-transform ${
                    isOn3 ? "translate-x-5" : "translate-x-0"
                  }`}
                ></div>
              </div>
            </div>
            <p className="text-[0.85rem] font-medium">
              Number of unused leaves of an employee can be encashed
            </p>
          </div>
          {isOn3&&(
            <div className={`group col-span-2 flex flex-col gap-1.5 py-2`}>
                <div className="flex justify-between">
                <p className="text-[0.85rem] font-bold">Encashment Basic pay </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                <div className={`group flex flex-col gap-1.5 py-2 ${units==='day'?'mt-5':''}`}>
                    <label className="label-text">
                    Max number of {units}s can be enchased {" "}
                    </label>
                    <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                    <Select
                        {...field}
                        isSearchable
                        // styles={customSelectStyles}
                        options={[
                            { value: `allremaining${units}`, label: `All the remaining ${units}(s)` },
                            { value: `specificnumberof${units}`, label: `Specific number of ${units}(s)` },
                        ]}
                        placeholder="Select a status"
                        onChange={(selectedOption) => {
                        field.onChange(selectedOption);
                        setSelectedlocationId(selectedOption.value);
                        }}
                        className="input-box w-full overflow-hidden"
                    />
                    )}
                />
                </div>
                <div className="group flex flex-col gap-1.5 py-2">
                    <label className="label-text mt-5">Number of {units}s</label>
                <input
                    autoComplete="off"
                    placeholder="Number of day(s)"
                    type="number"
                    className="input-box"
                />
                {errors.accrualPeriod && (
                    <span className="text-xs text-red-500">
                    {errors.accrualPeriod.message}
                    </span>
                )}
                </div>
                </div>
            </div>
          )}
          {/* Buttons Section */}
            <div className="mt-6 flex items-center justify-end gap-4">
                <button
                type="button"
                className="btn flex h-10 min-h-10 min-w-[8rem] items-center border border-gray-400 bg-white text-sm font-medium text-gray-700 hover:bg-gray-100"
                onClick={() => console.log("Cancel clicked")}
                >
                Cancel
                </button>
                <button
                type="submit"
                className="btn flex h-10 min-h-10 min-w-[8rem] items-center bg-hrmblack text-sm font-medium text-white transition-all duration-500 hover:bg-hrmdarkblue/70"
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

export default BasicSettings;

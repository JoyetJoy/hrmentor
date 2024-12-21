import { customSelectStyles } from "@/utils/customStyles";
import { yupResolver } from "@hookform/resolvers/yup";
import Select from "react-select";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Search } from "lucide-react";
import dayjs from "dayjs";

export default function TeamTimeSheetSideBar({
  years,
  months,
  weeks,
  handleWeekChange,
  selectedWeek,
  setSelectedEmployee,
  date,
  handleYearChange,
  type,
  rosterEmpList,
  shiftList,
  setSelectedShift,
}) {
  console.log(years, date);
  const { control } = useForm();

  const [employee, setEmployee] = useState("");

  return (
    <div
      className={`min-h-full rounded-md bg-white ${type === "attendance" ? "w-64" : "max-w-[18rem]"}`}
    >
      <div className="w-full rounded-md bg-white px-5 py-7">
        <h1 className="text-base font-semibold text-textcolor-darkCharcoal">
          Filter
        </h1>
        <div>
          {type === "attendance" ? (
            <div className={`group flex flex-col gap-1.5 py-2`}>
              <label className="label-text">Shift</label>
              <Controller
                name="shift"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    isSearchable={true}
                    styles={customSelectStyles}
                    options={shiftList?.data?.original?.data.map((item) => ({
                      label: item.name,
                      value: item.id,
                    }))}
                    placeholder="Select Shift"
                    className="input-box w-full text-black"
                    onChange={(selectedOption) => {
                      field.onChange(selectedOption);
                      setSelectedShift(selectedOption?.value);
                    }}
                  />
                )}
              />
            </div>
          ) : (
            <div className={`group flex flex-col gap-1.5 px-3 py-2`}>
              <label className="label-text">Year</label>
              <Select
                options={years}
                isSearchable={true}
                onChange={handleYearChange}
                styles={customSelectStyles}
                value={years.find(
                  (yearOption) => yearOption.value === dayjs(date).year(),
                )}
                placeholder={dayjs(date).format("YYYY")}
                className="input-box h-10 w-full rounded-md border-gray-muted focus:border-gray-muted"
              />
            </div>
          )}
          {type === "timesheet" && (
            <div className="group flex flex-col gap-1.5 px-3 py-2">
              <label className="label-text">Week</label>
              <Select
                options={weeks}
                isSearchable={true}
                onChange={handleWeekChange}
                styles={customSelectStyles}
                value={weeks.find(
                  (weekOption) => weekOption.value === selectedWeek,
                )}
                placeholder={`Week ${selectedWeek}`}
                className="input-box h-10 w-full rounded-md border-gray-muted focus:border-gray-muted"
              />
            </div>
          )}

          {/* <div className="group flex flex-col gap-1.5 px-3 py-2">
            <label className=" label-text">Designation</label>
            <Controller
              name="designation"
              className=""
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  {...field}
                  isSearchable={true}
                  styles={customSelectStyles}
                  placeholder="Select"
                  className="input-box"
                />
              )}
            />
            {errors.designation && (
              <span className="text-xs font-medium text-red-500">
                {errors.designation.message}
              </span>
            )}
          </div> */}
          <div
            className={`group flex flex-col gap-1.5 py-2 ${type === "attendance" ? "px-0" : "px-3"}`}
          >
            <label className="label-text">Search employee</label>

            <Controller
              name="employees"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  isSearchable={true}
                  styles={customSelectStyles}
                  placeholder="Select Employee"
                  className="input-box w-full"
                  options={rosterEmpList?.employees?.map((item) => ({
                    label: item.first_name,
                    value: item?.id,
                  }))}
                  onChange={(selectedOption) => {
                    field.onChange(selectedOption);
                    setSelectedEmployee(selectedOption);
                  }}
                />
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

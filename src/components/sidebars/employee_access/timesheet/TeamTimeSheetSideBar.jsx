import { customSelectStyles } from "@/utils/customStyles";
import { yupResolver } from "@hookform/resolvers/yup";
import Select from "react-select";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Search } from "lucide-react";
import dayjs from "dayjs";

export default function TeamTimeSheetSideBar({years,months,weeks,handleWeekChange,selectedWeek,handleMonthChange,date,handleYearChange,employeelist,type,employeeLists}) {
  console.log(years,date);

  const [employee, setEmployee] = useState('')

  const handleEmployee = (selectedemployee)=>{
    console.log(selectedemployee);
    


  }
  
  return (
    <div className={`min-h-full rounded-md bg-white ${type==='attendance'? 'w-64':"min-w-64"}`}>
      <div className="w-full rounded-md bg-white px-5 py-7">
        <h1 className="text-base font-semibold text-textcolor-darkCharcoal">
          Filter
        </h1>
        <div>
          {type==='attendance'? (
            <div className={`group flex flex-col gap-1.5 py-2`}>
            <label className="label-text">Shift</label>
            <Select
              options={employeeLists}
              isSearchable={true}
              onChange={handleEmployee}
              styles={customSelectStyles}
              value={years.find(
                (yearOption) => yearOption.value === dayjs(date).year(),
              )}
              placeholder={dayjs(date).format("YYYY")}
              className="input-box h-10 w-full rounded-md border-gray-muted focus:border-gray-muted"
            />
          </div>
          ) : (
            <div className={`group flex flex-col gap-1.5 py-2 px-3`}>
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
          {type==='timesheet' && (
            <div className="group flex flex-col gap-1.5 px-3 py-2">
            <label className=" label-text">Week</label>
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
          <div className={`group flex flex-col gap-1.5 py-2 ${type==='attendance'? 'px-0':"px-3"}`}>
            <label className=" label-text">Search employee</label>

            <label className=" flex h-10 min-h-10 items-center gap-2 rounded-md border border-[#A7A7A7] pr-28 outline-none overflow-hidden">
              <Search className="size-4 object-contain text-[#A7A7A7]" />
              <input
                type="text"
                className="grow placeholder:text-sm placeholder:text-gray-dark focus:outline-none "
                placeholder="Search"
              />
            </label>
          </div>
          <div className="overflow-y-min flex flex-col overflow-y-scroll gap-3">
            <div className="flex items-center gap-3 bg-gray-100 p-3">
              <div className="rounded-full bg-gray-dark p-4"></div>
              <div>
                <p className="text-sm font-medium">kp</p>
                <p className="text-xs font-medium text-darkblack">
                  UI/UX Design Intern
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-gray-100 p-3">
              <div className="rounded-full bg-gray-dark p-4"></div>
              <div>
                <p className="text-sm font-medium">kp</p>
                <p className="text-xs font-medium text-darkblack">
                  UI/UX Design Intern
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

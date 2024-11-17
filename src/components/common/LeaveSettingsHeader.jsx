import React,{useState} from 'react'
import { Filter, MoveDiagonal, Plus, Search, Trash2 } from "lucide-react";
import { customSelectStyles } from "@/utils/customStyles";
import dayjs from "dayjs";
import Select from "react-select";

function LeaveSettingsHeader({setAddholidayOpen}) {
    const [date, setDate] = useState(new Date());
    const [keyword, setKeyword]= useState('')

    const months = Array.from({ length: 12 }, (_, i) => ({
        value: i,
        label: dayjs().month(i).format("MMMM"),
      }));
      
      const years = Array.from({ length: 11 }, (_, i) => ({
        value: 2020 + i,
        label: (2020 + i).toString(),
      }));  
    
      const handleMonthChange = (selectedOption) => {
        const updatedDate = dayjs(date).month(selectedOption.value).toDate();
        setDate(updatedDate);
      };
      const handleYearChange = (selectedOption) => {
        const updatedDate = dayjs(date).year(selectedOption.value).toDate();
        setDate(updatedDate);
      };
  return (
    <div className="items-centerm flex justify-between pb-3 pt-2">
      <div className="flex items-center gap-4">
          <h5 className="text-lg font-bold">Holiday</h5>
          <Select
            options={years}
            isSearchable={true}
            onChange={handleYearChange}
            styles={customSelectStyles}
            placeholder={dayjs(date).format("YYYY")}
            className="input-box h-10 w-40 rounded-md border-gray-muted bg-white focus:border-gray-muted"
          />
          <Select
            options={months}
            isSearchable={true}
            onChange={handleMonthChange}
            styles={customSelectStyles}
            placeholder={dayjs(date).format("MMMM")}
            className="input-box h-10 w-52 rounded-md border-gray-muted bg-white focus:border-gray-muted"
          />
        </div>
        <div className="flex items-center gap-2">
        <label className="input flex h-10 min-h-10 min-w-80 flex-row items-center gap-2 rounded-md border border-gray-platinum outline-none hover:border-gray-platinum">
            <Search
              className="size-4 object-contain text-gray-200"
              strokeWidth={2}
            />
            <input
              type="text"
              onChange={(e) => {
                setKeyword(e.target.value);
              }}
              value={keyword}
              className="grow  h-full w-full text-sm text-black placeholder:text-sm placeholder:font-medium placeholder:text-black/50 focus:outline-none"
              placeholder="Search"
            />
          </label>
          <div className="h-10 min-h-10 rounded-md border border-gray-platinum bg-white p-3">
            <Filter
              className="stroke size-4 font-medium text-black"
              strokeWidth={2}
            />
          </div>
          <button
            onClick={()=>setAddholidayOpen(true)}
            className="btn flex h-10 min-h-10 items-center bg-hrmprimaryorange px-5 text-xs font-semibold text-white hover:bg-hrmblue rounded-md"
          >
            <Plus className="size-5" strokeWidth={2} />
            Add Holiday
          </button>
        </div>
      </div>
  )
}

export default LeaveSettingsHeader

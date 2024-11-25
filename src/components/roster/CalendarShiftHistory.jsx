import React, { useState } from "react";

const CalendarShiftHistory = () => {
    const [click, setClick] = useState('');
  return (
    <div className="overflow-y-min flex flex-col overflow-y-auto px-4 py-3 overflow-x-hidden">
        <p className="text-[1rem] font-semibold text-black">Shift History</p>
        <div 
        onClick={()=>setClick('1')}
        className="text-sm text-[#797979] pt-4 cursor-pointer">
            <div className="grid grid-cols-4">
            <div className={`pt-2 ${click==='1'?'border-r border-r-black':'border-r'}`}>
                <p>30/04/2024</p>
                <p>9:20 PM</p>
            </div>
            <div className="col-span-2 ml-2 pt-2">
                <p>Mammutty P s</p>
                <p>Adeed to shift</p>
            </div>
            <div className="pt-2">
                <p>Administrator</p>
            </div>
            </div>
        </div>
        <div 
        onClick={()=>setClick('2')}
        className="text-sm text-[#797979] cursor-pointer">
            <div className="grid grid-cols-4 ">
            <div className={`pt-2 ${click==='2'?'border-r border-r-black':'border-r'}`}>
                <p>30/04/2024</p>
                <p>9:20 PM</p>
            </div>
            <div className="col-span-2 ml-2 pt-4">
                <p>Mammutty P s</p>
                <p>Adeed to shift</p>
            </div>
            <div className="pt-4">
                <p>Administrator</p>
            </div>
            </div>
        </div>
        <div 
        onClick={()=>setClick('3')}
        className="text-sm text-[#797979] cursor-pointer">
            <div className="grid grid-cols-4 ">
            <div className={`pt-2 ${click==='3'?'border-r border-r-black':'border-r'}`}>
                <p>30/04/2024</p>
                <p>9:20 PM</p>
            </div>
            <div className="col-span-2 ml-2 pt-4">
                <p>Mammutty P s</p>
                <p>Adeed to shift</p>
            </div>
            <div className="pt-4">
                <p>Administrator</p>
            </div>
            </div>
        </div>
        <div 
        onClick={()=>setClick('4')}
        className="text-sm text-[#797979] cursor-pointer">
            <div className="grid grid-cols-4 ">
            <div className={`pt-2 ${click==='4'?'border-r border-r-black':'border-r'}`}>
                <p>30/04/2024</p>
                <p>9:20 PM</p>
            </div>
            <div className="col-span-2 ml-2 pt-4">
                <p>Mammutty P s</p>
                <p>Adeed to shift</p>
            </div>
            <div className="pt-4">
                <p>Administrator</p>
            </div>
            </div>
        </div>
      
    </div>
  );
};

export default CalendarShiftHistory;

import React, { useState } from "react";

export default function WeeklyRecurrence({ recurrencePattern,setSelectedDays,selectedDays,type,days,dayerror,setDayerror }) {

    const toggleDaySelection = (day) => {
        setSelectedDays((prev) =>
          prev.includes(day)
            ? prev.filter((d) => d !== day) // Deselect if already selected
            : [...prev, day] // Select if not already selected
        );
        setDayerror((prev) => {
          const newErrors = [...prev];
          const dayIndex = days.indexOf(day);
          newErrors[dayIndex] = false; // Reset error if day is toggled
          return newErrors;
        });
      };

  return (
    <>
      {recurrencePattern === "weekly" && (
        <>
        {type==='peoplerequired'&&(
            <h3 className="mb-2 text-sm font-semibold">
              People Required
            </h3>
        )}
        <div className="grid h-8 grid-cols-7 overflow-hidden rounded-md border">
          {days.map((day) => (
            <h1
              key={day}
              onClick={() => toggleDaySelection(day)}
              className={`px-2 py-2 text-center text-xs border-r border-black-300 cursor-pointer ${
                selectedDays.includes(day)
                  ? "bg-[#e95d39] text-white" // Apply orange background and white text if selected
                  : "bg-white text-black" // Default style for unselected days
              }`}
            >
              {day}
            </h1>
          ))}
        </div>
        </>
      )}
      
    </>
  );
}

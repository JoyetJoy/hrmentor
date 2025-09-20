import React from "react";

const CompanyWeekendCalendar = () => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const headers = [
    "All",
    "1st",
    "2nd",
    "3rd",
    "4th",
    "5th",
    "Alternate weekend",
  ];

  return (
    <>
      <div className="grid grid-cols-8 gap-28 text-center font-semibold">
        <div></div>
        {headers?.map((header, index) => (
          <div key={index} className="whitespace-nowrap text-sm font-normal">
            {header}
          </div>
        ))}
      </div>
      {days?.map((day, dayIndex) => (
        <div
          key={dayIndex}
          className="my-7 grid grid-cols-8 items-center gap-28 text-center"
        >
          <div className="text-left">{day}</div>
          {headers?.map((_, colIndex) => (
            <input
              key={colIndex}
              type="checkbox"
              className="h-5 w-5 rounded border-gray-400 focus:ring-hrmprimaryorange focus:ring-offset-0"
            />
          ))}
        </div>
      ))}
    </>
  );
};

export default CompanyWeekendCalendar;

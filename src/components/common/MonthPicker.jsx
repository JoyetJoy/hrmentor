import dayjs from "dayjs";

const MonthlyCalendarPicker = ({ selectedDate, setSelectedDate }) => {
  const daysInWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const startOfMonth = dayjs(selectedDate).startOf("month");
  const endOfMonth = dayjs(selectedDate).endOf("month");

  const startOfGrid = startOfMonth.startOf("week");

  const endOfGrid = endOfMonth.endOf("week");

  const days = [];
  let currentDay = startOfGrid;
  while (
    currentDay.isBefore(endOfGrid) ||
    currentDay.isSame(endOfGrid, "day")
  ) {
    days.push(currentDay);
    currentDay = currentDay.add(1, "day");
  }

  const handleNextMonth = () => {
    setSelectedDate(selectedDate.add(1, "month"));
  };

  const handlePrevMonth = () => {
    setSelectedDate(selectedDate.subtract(1, "month"));
  };

  return (
    <div className="Calendar-container">
      <div className="header px-5 py-3">
        <h2 className="!text-base font-medium">
          {selectedDate.format("MMMM YYYY")}
        </h2>
        <div className="flex gap-2">
          <button
            className="size-7 rounded-full bg-gray-smoke"
            onClick={handlePrevMonth}
          >
            &lt;
          </button>

          <button
            className="size-7 rounded-full bg-gray-smoke"
            onClick={handleNextMonth}
          >
            &gt;
          </button>
        </div>
      </div>
      <hr className="border-gray-light" />
      <div className="grid grid-cols-7 px-7 pt-4 text-center font-medium">
        {daysInWeek.map((day, index) => (
          <div key={index} className="day-name">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 px-7 pt-3 text-center">
        {days.map((day, index) => (
          <div
            key={index}
            className={`day-box ${
              day.isSame(selectedDate, "date") ? "selected" : ""
            } ${!day.isSame(selectedDate, "month") ? "text-gray-light" : ""}`}
            onClick={() => setSelectedDate(day)}
          >
            {day.format("D")}
          </div>
          
        ))}
      </div>
    </div>
  );
};

export default MonthlyCalendarPicker;

import dayjs from "dayjs";

const MonthlyCalendarPicker = ({ selectedDate, setSelectedDate }) => {
  const daysInWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // Get the first day and the last day of the selected month
  const startOfMonth = dayjs(selectedDate).startOf("month");
  const endOfMonth = dayjs(selectedDate).endOf("month");

  // Get the first day of the grid (start of the week containing the first day of the month)
  const startOfGrid = startOfMonth.startOf("week");

  // Get the last day of the grid (end of the week containing the last day of the month)
  const endOfGrid = endOfMonth.endOf("week");

  // Generate all days to display in the grid
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
      <div className="header px-3 py-2">
        <button
          className="h-9 w-9 rounded-full bg-gray-smoke"
          onClick={handlePrevMonth}
        >
          &lt;
        </button>
        <h2 className="!text-base font-medium">
          {selectedDate.format("MMMM YYYY")}
        </h2>
        <button
          className="h-9 w-9 rounded-full bg-gray-smoke"
          onClick={handleNextMonth}
        >
          &gt;
        </button>
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

import dayjs from "dayjs";

const WeeklyCalendarPicker = ({ selectedDate, setSelectedDate }) => {
  const daysInWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const days = Array.from({ length: 7 }, (_, i) =>
    dayjs(selectedDate)
      .startOf("week")
      .add(i + 1, "day"),
  );

  const handleNextWeek = () => {
    setSelectedDate(selectedDate.add(1, "week"));
  };

  const handlePrevWeek = () => {
    setSelectedDate(selectedDate.subtract(1, "week"));
  };

  return (
    <div className="Calendar-container">
      <div className="header px-3 py-2">
        <button
          className="h-9 w-9 rounded-full bg-gray-smoke"
          onClick={handlePrevWeek}
        >
          &lt;
        </button>
        <h2 className="!text-base font-medium">
          {selectedDate.format("MMMM YYYY")}
        </h2>
        <button
          className="h-9 w-9 rounded-full bg-gray-smoke"
          onClick={handleNextWeek}
        >
          &gt;
        </button>
      </div>
      <hr className="border-gray-light" />
      <div className="days-row px-7">
        {daysInWeek?.map((day, index) => (
          <div key={index} className="day-name">
            {day}
          </div>
        ))}
      </div>
      <div className="dates-row px-7">
        {days?.map((day, index) => (
          <div
            key={index}
            className={`day-box ${
              day.isSame(selectedDate, "date") ? "selected" : ""
            }`}
            onClick={() => setSelectedDate(day)}
          >
            {day.format("D")}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyCalendarPicker;

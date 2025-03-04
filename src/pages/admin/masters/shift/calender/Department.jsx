import React from "react";
import ShiftHeader from "@/components/common/ShiftHeader";
import ShiftCalendar from "./Calender";

export default function ShiftDepartment() {
  return (
    <>
      <ShiftHeader page={1} />
      <ShiftCalendar/>
    </>
  );
}

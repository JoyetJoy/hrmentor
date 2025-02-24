import React from "react";
import RosterItemList from "@/components/sidebars/roster/Index";
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

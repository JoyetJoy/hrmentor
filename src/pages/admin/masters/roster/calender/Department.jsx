import RosterHeader from "@/components/common/RosterHeader";
import React from "react";
import RosterCalendar from "./Calender";

export default function RosterDepartment() {
  return (
    <>
      <RosterHeader page={1} />
      <RosterCalendar />
    </>
  );
}

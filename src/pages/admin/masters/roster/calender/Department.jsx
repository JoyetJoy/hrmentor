import RosterHeader from "@/components/common/RosterHeader";
import React from "react";
import RosterItemList from "@/components/sidebars/roster/Index";
import RosterCalendar from "./Calender";

export default function RosterDepartment() {
  return (
    <>
      <RosterHeader page={1} />
      <div className="flex gap-2">
        <RosterItemList />
        <RosterCalendar />
      </div>
    </>
  );
}

import React from "react";
import RosterList from "@/pages/admin/masters/roster/Index";
import ShiftHeader from "@/components/common/ShiftHeader";
import ShiftList from "./view";

export default function ShiftLists() {
  return (
    <>
      <ShiftHeader page={2} />
      <ShiftList />
    </>
  );
}

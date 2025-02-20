import RosterHeader from "@/components/common/RosterHeader";
import React from "react";
import RosterList from "@/pages/admin/masters/roster/Index";

export default function RosterLists() {
  return (
    <>
      <RosterHeader page={2} />
      <RosterList />
    </>
  );
}

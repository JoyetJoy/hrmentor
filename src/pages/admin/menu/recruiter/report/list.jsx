import MenuHeader from "@/components/common/MenuHeader";
import React from "react";

function List() {
  return (
    <div className="">
      <MenuHeader
        backlink={""}
        menu={"Menu"}
        subMenu={""}
        currentpath={"Recruiter"}
        activeMenu={"Reports"}
      />
      <div className="min-h-[520px] rounded-md bg-white px-10 py-6"></div>
    </div>
  );
}

export default List;

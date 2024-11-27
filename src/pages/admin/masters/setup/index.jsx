import MenuHeader from "@/components/common/MenuHeader";
import Setup from "@/components/sidebars/setup";
import { Plus, Search } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function SetupList() {
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState("");

  return (
    <>
      <MenuHeader menu="Menu" currentpath="Setup" />
      <div className="mb-4 mt-1 flex items-center justify-between">
        <label className="input flex h-10 min-h-10 min-w-96 items-center gap-2 rounded-md border border-gray-soft outline-none">
          <Search className="size-4 object-contain text-gray-dark" />
          <input
            type="text"
            onChange={(e) => {
              setKeyword(e.target.value);
            }}
            className="grow placeholder:text-sm placeholder:text-gray-dark focus:outline-none"
            placeholder="Search"
          />
        </label>
        <Link
          to=""
          className="flex w-fit items-center justify-center gap-2 rounded-md bg-hrmprimaryorange px-5 py-2.5 text-sm font-medium text-white focus:outline-none data-[hover]:bg-hrmdarkblue/70"
        >
          <Plus className="size-4" />
          Addsss
        </Link>
      </div>
      <div className="flex gap-4">
        <Setup />
        <div className="flex w-full flex-col">
          <div className="flex min-h-[570px] w-full flex-col gap-4 rounded-md bg-white px-5 py-4">
            {loading ? (
              <div className="flex min-h-96 w-full items-center justify-center bg-white">
                <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-hrmprimaryorange"></div>
              </div>
            ) : (
              <div className="flex min-h-96 w-full items-center justify-center bg-white"></div>
              //   <QueryTable
              //     columns={columns}
              //     list={shiftDetails?.data?.original?.data || []}
              //     currentPage={currentPage}
              //     setCurrentPage={setCurrentPage}
              //     totalPages={totalPages}
              //   />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

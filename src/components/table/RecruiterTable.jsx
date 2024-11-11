import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import Pagination from "./Pagination";

function RecruiterTable({  list,
    columns,
    totalPages,
    currentPage,
    setCurrentPage,})
     {
    const tableInstance = useReactTable({
        columns,
        data: list,
        getCoreRowModel: getCoreRowModel(),
      });
      
      // Access the table state and methods
      const { getHeaderGroups, getRowModel } = tableInstance;
  return (
    <>
     <div className="bg-white rounded-md border border-gray-300 pb-2">
      <div className="table table-md  mx-auto  w-full">
        <table style={{ borderSpacing: "0", width: "100%" }}>
          <thead className="bg-gray-soft rounded-md overflow-hidden ">
            {getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="">
                {headerGroup.headers.map((column) => (
                  <th
                    colSpan={headerGroup.colSpan}
                    key={column.id}
                    className=" text-base font-semibold text-hrmdarkblue capitalize    py-5 text-start "
                  >
                    {flexRender(
                      column.column.columnDef.header,
                      column.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          {/* -padding--- */}
          <tbody className=" ">
            {getRowModel().rows.map((row) => {
              return (
                <tr
                  key={row.id}
                  className="borde-b-2  borde-[#C0C0C0] last:border-none  "
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="text-[15px] text-start   text-textcolor-darkCharcoal font-medium capitalize py-7 "
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
    {totalPages && (
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      )}
    </>
  )
}

export default RecruiterTable

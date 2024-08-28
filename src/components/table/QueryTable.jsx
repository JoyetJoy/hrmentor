import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import Pagination from "./Pagination";

export default function QueryTable({
  list,
  columns,
  totalPages,
  currentPage,
  setCurrentPage,
}) {
  // Table instance
  const tableInstance = useReactTable({
    columns,
    data: list,
    getCoreRowModel: getCoreRowModel(),
  });
  
  // Access the table state and methods
  const { getHeaderGroups, getRowModel } = tableInstance;
  return (
    <div className="bg-[#FFFFFF] rounded-md border border-gray-300 pb-2">
      <div className="table table-md  mx-auto  w-full">
        <table style={{ borderSpacing: "0", width: "100%" }}>
          <thead className="bg-[#EBEBF0] rounded-md overflow-hidden">
            {getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="text-left">
                {headerGroup.headers.map((column) => (
                  <th
                    colSpan={headerGroup.colSpan}
                    key={column.id}
                    className=" text-sm font-semibold text-[#525252] capitalize "
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
                  className="borde-b-2  borde-[#C0C0C0] last:border-none text-left "
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="text-[0.8rem] justify-end  text-[#525252] font-medium capitalize "
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
      {totalPages && (
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      )}
    </div>
  );
}

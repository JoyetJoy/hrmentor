import React from "react";
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
  const pageLimit = 10; 
  const tableInstance = useReactTable({
    columns,
    data: list,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      currentPage,
      pageLimit,
    },
   
  });

  // Access the table state and methods
  const { getHeaderGroups, getRowModel } = tableInstance;
  return (
    <>
      {list?.length ? (
        <div className="rounded-md border border-gray-300 bg-white pb-2 w-full">
          <div className="table table-md mx-auto w-full">
            <table style={{ borderSpacing: "0", width: "100%" }}>
              <thead className="overflow-hidden rounded-md bg-gray-soft">
                {getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id} className="">
                    {headerGroup.headers.map((column) => (
                      <th
                        colSpan={headerGroup.colSpan}
                        key={column.id}
                        className="text-sm font-semibold capitalize text-gray-darkpale"
                      >
                        {flexRender(
                          column.column.columnDef.header,
                          column.getContext(),
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="">
                {getRowModel().rows.map((row) => {
                  return (
                    <tr
                      key={row.id}
                      className="borde-b-2 borde-[#C0C0C0] text-left last:border-none"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td
                          key={cell.id}
                          className="justify-end text-[0.8rem] font-medium text-gray-darkpale"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
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
      ) : (
        <img
          className="mx-auto my-10 h-52 object-contain"
          src="/not-found.svg"
        />
      )}
    </>
  );
}

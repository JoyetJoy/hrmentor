import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { TableData } from "../../constants/tableDummy";
import Pagination from "./Pagination";
import { getRandomPastelColor } from "../../utils/helpers";

export default function QueryTable({ list, columns }) {
  //remove later
  const pageLimit = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();

  // remove later
  const dcolumns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessorKey: "name",
        cell: ({ row }) => (
          <div className="flex gap-x-2 items-center ">
            <p
              style={{ backgroundColor: getRandomPastelColor() }}
              className="bg-[#F3] font-medium text-[#202020] size-8 rounded-full flex justify-center items-center"
            >
              {row?.original?.name?.match(/\b\w/g).join("")}
            </p>
            <p>{row?.original?.name}</p>
          </div>
        ),
      },
      { Header: "ID Number", accessorKey: "addNo" },
      {
        Header: "Designation",
        accessorKey: "designation",
      },
      {
        Header: "Type",
        accessorKey: "type",
      },
      {
        Header: "Department",
        accessorKey: "department",
      },
      {
        Header: "Location",
        accessorKey: "location",
      },
      {
        Header: "Status",
        accessorKey: "status",
      },
    ],

    []
  );
  // Table instance
  const tableInstance = useReactTable({
    columns: dcolumns,
    data: TableData,
    getCoreRowModel: getCoreRowModel(),
  });

  // like this
  // const tableInstance = useReactTable({
  //   columns,
  //   data: list,
  //   getCoreRowModel: getCoreRowModel(),
  // });
  // Access the table state and methods
  const { getHeaderGroups, getRowModel } = tableInstance;

  return (
    <div className="bg-[#FFFFFF] rounded-md border border-gray-300 pb-2">
      <div className="table table-md  mx-auto  w-full">
        <table style={{ borderSpacing: "0", width: "100%" }}>
          <thead className="bg-[#C0C0C033]">
            {getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((column) => (
                  <th
                    colSpan={headerGroup.colSpan}
                    key={column.id}
                    className="py-4 px-4  text-left text-base font-semibold text-[#525252] capitalize"
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

          <tbody className="px-2">
            {getRowModel().rows.map((row) => {
              return (
                <tr
                  key={row.id}
                  className="borde-b-[0.6px]  borde-[#C0C0C0] last:border-none"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-2 py-3 text-left text-[0.9rem]  text-[#525252] font-normal capitalize"
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

      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={20}
      />
    </div>
  );
}

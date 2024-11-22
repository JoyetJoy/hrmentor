import QueryTable from "@/components/table/QueryTable";
import React, { useState } from "react";

export const OfferDeclinedTable = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const list = [
    {
      name: "Varadharajan Rengaswamy",
      type: "Full time",
      title: "Sales & Marketing",
      departments: "Sales & Marketing",
      location: "Nill",
      sentdate: "05/07/2023",
      status: " Conditional Rejected",
      action: "",
      imageUrl: "../../../../public/assets/images/hiring/avatar/a1.png", // Add the image URL here
    },
    {
      name: "Varadharajan Rengaswamy",
      type: "Full time",
      title: "Sales & Marketing",
      departments: "Sales & Marketing",
      location: "Nill",
      sentdate: "05/07/2023",
      action: "",
      status: " Conditional Rejected",
      imageUrl: "../../../../public/assets/images/hiring/avatar/a2.png", // Add the image URL here
    },
    {
      name: "Varadharajan Rengaswamy",
      type: "Full time",
      title: "Sales & Marketing",
      departments: "Sales & Marketing",
      location: "Nill",
      status: " Conditional Rejected",
      sentdate: "05/07/2023",
      action: "",
      imageUrl: "../../../../public/assets/images/hiring/avatar/a3.png", // Add the image URL here
    },
    // Add more rows as needed
  ];

  const columns = [
    {
      header: "Name",
      accessorKey: "name",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <img
            src={row.original.imageUrl}
            alt={row.original.name}
            className="h-8 w-8 rounded-full"
          />
          <span>{row.original.name}</span>
        </div>
      ),
    },
    {
      header: "Type",
      accessorKey: "type",
    },
    {
      header: "Title",
      accessorKey: "title",
    },
    {
      header: "Departments",
      accessorKey: "departments",
    },
    {
      header: "Location",
      accessorKey: "location",
    },
    {
      header: "Sent Date",
      accessorKey: "sentdate",
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ getValue }) => (
        <span className="rounded-md border border-[#E95D39] bg-[#E95D390D]/5 px-6 py-1.5">
          {getValue()}
        </span>
      ),
    },
  ];
  const totalPages = 5;

  return (
    <>
      <QueryTable
        list={list}
        columns={columns}
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

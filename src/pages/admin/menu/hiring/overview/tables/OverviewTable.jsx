import QueryTable from "@/components/table/QueryTable";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export const OverviewTable = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // Example data and columns
  const list = [
    {
      name: "Varadharajan Rengaswamy",
      type: "Full time",
      title: "Sales & Marketing",
      departments: "Sales & Marketing",
      location: "Nill",
      sentdate: "05/07/2023",
      status: "Move to Hiring",
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
      status: "Move to Hiring",
      action: "",
      imageUrl: "../../../../public/assets/images/hiring/avatar/a2.png", // Add the image URL here
    },
    {
      name: "Varadharajan Rengaswamy",
      type: "Full time",
      title: "Sales & Marketing",
      departments: "Sales & Marketing",
      location: "Nill",
      sentdate: "05/07/2023",
      status: "Move to Hiring",
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
        <span className="rounded-md border border-[#8BE691] bg-[#F0FFF1] px-3 py-1.5">
          {getValue()}
        </span>
      ),
    },
    {
      header: "Action",
      accessorKey: "action",
      cell: () => (
        <div className="flex gap-2">
          <Link to={"offer-to-be-finalized"}>
            <button className="rounded-md border-green-800 bg-[#00B448] px-4 py-1.5 text-white">
              Send Offer Letter
            </button>
          </Link>
          <button className="rounded-md bg-[#AB27271A]/10 px-4 py-1.5 text-[#AB2727]">
            Reject
          </button>
        </div>
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

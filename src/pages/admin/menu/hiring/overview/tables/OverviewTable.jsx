import QueryTable from '@/components/table/QueryTable';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

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
      imageUrl: "../../../../public/assets/images/hriring/avatar/a1.png", // Add the image URL here
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
      imageUrl: "../../../../public/assets/images/hriring/avatar/a2.png", // Add the image URL here
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
      imageUrl: "../../../../public/assets/images/hriring/avatar/a3.png", // Add the image URL here
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
            className="w-8 h-8 rounded-full"
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
        <span className="bg-[#F0FFF1] py-1.5 px-3 border border-[#8BE691] rounded-md">
          {getValue()}
        </span>
      ),
    },
    {
      header: "Action",
      accessorKey: "action",
      cell: () => (
        <div className="flex gap-2">
          <Link to={"offer-to-be-finalized"}><button className="bg-[#00B448] py-1.5 px-4 text-white  border-green-800 rounded-md">
            Send Offer Letter
          </button></Link>
          <button className="bg-[#AB27271A]/10 py-1.5 px-4   text-[#AB2727] rounded-md">
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
      /></>
  )
}

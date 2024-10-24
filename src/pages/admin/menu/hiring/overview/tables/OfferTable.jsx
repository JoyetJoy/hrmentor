import QueryTable from '@/components/table/QueryTable';
import React, { useState } from 'react'

export const OfferTable = () => {
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
      status:"Hired",
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
      action: "",
      status:"Hired",
      imageUrl: "../../../../public/assets/images/hriring/avatar/a2.png", // Add the image URL here
    },
    {
      name: "Varadharajan Rengaswamy",
      type: "Full time",
      title: "Sales & Marketing",
      departments: "Sales & Marketing",
      location: "Nill",
      status:"Hired",
      sentdate: "05/07/2023",
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
        <span className="bg-[#FFFCF0] py-1.5 px-6 border border-[#ECD682] rounded-md">
          {getValue()}
        </span>
      ),
    },
    {
       header: "action",
      accessorKey: "action",
      cell: ({  }) => (
        
       
        <button
                type="button"
                className="flex size-7 cursor-pointer items-center rounded-full bg-[#EBEBF0] p-2"
              >
                <img
                  src="/assets/icons/admin/marker.svg"
                  className="w-full object-contain"
                />
              </button>
      ), 
    }
    
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

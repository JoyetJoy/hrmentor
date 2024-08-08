import RecruiterHeader from '@/components/common/RecruiterHeader'
import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { TableData } from "@/constants/tableDummy";
import { ArrowUpFromLine, Filter, MoveDiagonal, Plus, Search, Trash2 } from "lucide-react";

import QueryTable from "@/components/table/QueryTable";

function RecruiterJobs() {
    const [totalPages, setTotalPages] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const list = React.useMemo(() => TableData, [TableData]);

    const columns = React.useMemo(
        () => [
            {
                header: "Name",
                accessorKey: "name",
            },
            { header: "ID Number", accessorKey: "addNo" },
            {
                header: "Designation",
                accessorKey: "dignation",
                cell: ({ row }) => <p className="font-medium">{row?.original?.designation}</p>,

            },
            {
                header: "Type",
                accessorKey: "type",
            },
            {
                header: "Location",
                accessorKey: "location",
            },
            {
                header: "Department",
                accessorKey: "designation",
                cell: ({ row }) => <p className="font-medium">{row?.original?.designation}</p>,
            },
            {
                header: "Status",
                accessorKey: "status",
                cell: ({ row }) => <div className="bg-pink-100 text p-1 rounded-md">{row?.original?.status}</div>
            },

            {
                header: "",
                accessorKey: "action",
                cell: ({ row }) => (
                    <div className="flex relative gap-1 text-xs ">
                        <Link
                            //   to={`/sales/invoices/detail-view/${row?.original?.id}`}
                            to={"/admin/recruiter/candidate"}

                            className="cursor-pointer flex items-center  bg-[#F5F5F5] text-black p-2  size-8 rounded-full"
                        >
                            <MoveDiagonal />
                        </Link>
                        <Link
                            to={""}
                            className="cursor-pointer flex items-center bg-[#F5F5F5] text-black p-2  size-8 rounded-full"
                        >
                            <img src="/assets/icons/admin/marker.svg" />
                        </Link>
                        <span className="cursor-pointer flex justify-center items-center text-black bg-[#F5F5F5]  size-8 rounded-full">
                            <Trash2 className="w-5 h-5" />
                        </span>
                    </div>
                ),
            },
        ],
        []
    );
    return (
        <div>
            <RecruiterHeader
                backlink={""}
                menu={"Menu"}
                subMenu={""}
                currentpath={"Recruiter"}
                firsttLink={"Dashboard"}
                secondLink={"Jobs"}
                thirdLink={"Candidate"}
                fourthLink={"Interview"}
                fifthLink={"Report"}
                six={"Setttings"}
            />
            <div className="flex justify-between items-center my-2">
                <div className="text-white font-semibold flex  items-center gap-2">
                    <Link
                        to={"/admin/employees/create"}
                        className="btn bg-btncolor text-white hover:bg-btncolor"
                    >
                        <Plus />
                        Create Job
                    </Link>
                    <Link
                        to={""}
                        className="btn bg-white text-btncolor hover:bg-white"
                    >
                        View Current Page
                    </Link>
                    <label className="input outline-none border-none pr-28 flex items-center  h-11 gap-2">
                        <Search className="text-gray-200 object-contain size-5" />
                        <input
                            type="text"
                            className="grow placeholder:text-sm focus:outline-none placeholder:text-gray-200 "
                            placeholder="Search"
                        />
                    </label>
                    <div className="bg-white rounded-md p-3 border border-gray-400">
                        <Filter className="size-4 text-black" />
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Link to={" "} className=" text-sm font-bold text-btncolor">All Jobs </Link>
                    <Link to={""} className=" text-sm font-bold text-gray-200 ">Open Jobs</Link>
                    <Link to={""} className=" text-sm font-bold text-gray-200 ">Draft</Link>
                </div>
            </div>
            <QueryTable
                columns={columns}
                list={list}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages} 
            />
        </div>
    )
}

export default RecruiterJobs

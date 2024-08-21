import RecruiterHeader from '@/components/common/RecruiterHeader'
import React, { useState } from 'react'
import { Link, useLocation } from "react-router-dom";
import { TableData } from "@/constants/tableDummy";
import { ArrowUpFromLine, Filter, MoveDiagonal, Plus, Search, Trash2 } from "lucide-react";

import QueryTable from "@/components/table/QueryTable";

function RecruiterJobs() {
    const [totalPages, setTotalPages] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const list = React.useMemo(() => TableData, [TableData]);
    const location = useLocation();
    const isActive = (path) => path.includes(location.pathname);

    const columns = React.useMemo(
        () => [
            {
                header: "Job Title",
                accessorKey: "name",
            },
            { header: "  Job ID ", accessorKey: "addNo" },
            {
                header: "Date created",
                accessorKey: "dignation",
                cell: ({ row }) => <p className="">{row?.original?.designation}</p>,

            },
            {
                header: "Type",
                accessorKey: "type",
            },
            {
                header: "Department",
                accessorKey: "designation",
                cell: ({ row }) => <p className="">{row?.original?.designation}</p>,
            },
            {
                header: "Location",
                accessorKey: "location",
            },
            {
                header: "Status",
                accessorKey: "status",
                cell: ({ row }) => <div className="bg-[#473A990D]  w-fit	 text-[#7D067F] h-8 px-3 font-medium flex items-center justify-center rounded-md ">{row?.original?.status}</div>
            },


            {
                header: "Action",
                accessorKey: "action",
                cell: ({ row }) => (
                    <div className="flex items-center justify-start gap-2  text-xs ">
                        <Link
                            //   to={`/sales/invoices/detail-view/${row?.original?.id}`}

                            className="cursor-pointer flex items-center  bg-[#EBEBF0] p-2  size-8 rounded-full"
                            to={"/admin/recruiter/candidate"}

                        >
                            <MoveDiagonal />
                        </Link>
                        <Link
                            to={""}
                            className="cursor-pointer flex items-center bg-[#EBEBF0]  p-2  size-8 rounded-full"
                        >
                            <img src="/assets/icons/admin/marker.svg" />
                        </Link>
                        <Link className="cursor-pointer flex justify-center items-center text-black bg-[#EBEBF0] size-8 rounded-full">
                            <Trash2 className="size-4" strokeWidth={1} />
                        </Link>
                    </div>
                ),
            },
        ],

        []
    );
    return (
        <div className=''>
            <RecruiterHeader
                backlink={""}
                menu={"Menu"}
                subMenu={""}
                currentpath={"Recruiter"}
                firstLink={"Dashboard"}
                secondLink={"Jobs"}
                thirdLink={"Candidate"}
                fourthLink={"Interview"}
                fifthLink={"Report"}
                six={"Setttings"}
            />
            <div className="flex justify-between items-center mb-4 mt-4">
                <div className="text-white font-semibold flex  items-center gap-2">
                    <Link
                        to={"/admin/recruiter/post"}
                        className="btn hover:bg-bgColor-100 bg-bgColor-100 text-white text-sm  min-h-10 h-10"
                    >
                        <Plus className='size-5' />
                        Create Job
                    </Link>
                    <Link
                        to={""}
                        className="btn bg-white text-bgColor-100 text-sm hover:bg-white min-h-10 h-10"
                    >
                        View Current Page
                    </Link>
                    <label className="input outline-none border-none pr-28 flex items-center  gap-2 min-h-10 h-10">
                        <Search className="text-gray-200 object-contain size-4" />
                        <input
                            type="text"
                            className="grow placeholder:text-sm focus:outline-none text-sm   placeholder:text-gray-200 placeholder:font-normal "
                            placeholder="Search"
                        />
                    </label>
                    <div className="bg-white rounded-md p-3 border border-gray-400 min-h-10 h-10">
                        <Filter className="size-4 text-black font-medium stroke" strokeWidth={2} />
                    </div>
                </div>
                <div className="flex items-center gap-7">
                    <Link to={""} className={` text-sm ${isActive(["/admin/recruiter/jobs"]) ? "text-bgColor-100 font-bold " : "font-normal text-[#808080]"}`}>All Jobs </Link>
                    <Link to={""} className={` text-sm ${isActive([""]) ? "text-bgColor-100 font-bold " : "font-normal text-[#808080]"}`}>Open Jobs</Link>
                    <Link to={""} className={` text-sm ${isActive([""]) ? "text-bgColor-100 font-bold " : "font-normal text-[#808080]"}`}>Draft</Link>
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

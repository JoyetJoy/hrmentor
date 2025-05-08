import { DOWNLOAD_PAYSLIP, EMPLOYEE_PAYSLIP, newRequest } from "@/api";
import MenuHeaderEmployeeAccess from "@/components/employee_access/MenuHeader";
import ProfileSidebar from "@/components/sidebars/employee_access/profile_management/ProfileSideBar";
import Pagination from "@/components/table/Pagination";
import QueryTable from "@/components/table/QueryTable";
import { customSelectStyles } from "@/utils/customStyles";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { ArrowDownToLine, ChevronRight, Eye, Search } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";

export default function PaySlip() {
  const [keyword, setKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const pageLimit = 10;

  // Fetch List
  const { data: payslipListing, isLoading } = useQuery({
    queryKey: ["payslipListing", currentPage, keyword],
    queryFn: () =>
      newRequest
        .get(EMPLOYEE_PAYSLIP, {
          params: {
            search: keyword,
            page: currentPage,
            per_limit: pageLimit,
          },
        })
        .then((res) => {
          return res.data;
        }),
  });

  const PrintDiv = async (id) => {
    try {
      const response = await newRequest.get(`${DOWNLOAD_PAYSLIP}/${id}`, {
        responseType: "blob",
      });

      // Detect file type from the blob
      const contentType = response.data.type; // e.g., "application/pdf" or "image/png"
      let extension = "pdf"; // default
      if (contentType.includes("image/png")) extension = "png";
      else if (contentType.includes("image/jpeg")) extension = "jpg";
      else if (contentType.includes("image/webp")) extension = "webp";
      else if (contentType.includes("application/pdf")) extension = "pdf";

      const blobUrl = window.URL.createObjectURL(response.data);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.setAttribute("download", `invoice_${id}.${extension}`); // Dynamic filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl); // Clean up
    } catch (error) {
      console.error("Failed to download the file:", error);
    }
  };

  const viewPayslip = (fileUrl) => {
    if (fileUrl) {
      window.open(fileUrl, "_blank");
    }
  };

  // Define table columns
  const columns = React.useMemo(
    () => [
      {
        header: "Sl No",
        accessorKey: "sno",
        cell: ({ row }) => {
          return (
            <div className="flex px-2">
              {row.index + 1 + (currentPage - 1) * pageLimit}
            </div>
          );
        },
      },
      {
        header: "Pay Period",
        accessorKey: "period",
      },
      {
        header: "Transaction Id",
        accessorKey: "transaction_id",
      },
      {
        header: "Transaction Date",
        accessorKey: "transaction_date",
      },
      {
        header: "Pay Amount",
        accessorKey: "net_pay",
        cell: ({ row }) => {
          return <div className="flex px-2">£{row.original.net_pay}</div>;
        },
      },
      {
        header: "Payslip",
        accessorKey: "action",
        cell: ({ row }) => (
          <div className="flex items-end gap-2 text-xs">
            <button
              onClick={() => viewPayslip(row.original.payslip_path)}
              className="flex size-7 cursor-pointer items-center rounded-full bg-gray-soft p-2"
            >
              <Eye className="size-3" />
            </button>
            <button
              onClick={() => PrintDiv(row.original.id)}
              className="flex size-7 cursor-pointer items-center rounded-full bg-gray-soft p-2"
            >
              <ArrowDownToLine className="size-3" />
            </button>
          </div>
        ),
      },
    ],
    [],
  );

  return (
    <div className="flex flex-col">
      <MenuHeaderEmployeeAccess
        pathlink=""
        currentpage="Payslip"
        subMenu="ProfileManagement"
        icon={<ChevronRight className="size-3" />}
        page={2}
      />
      <div className="flex gap-x-3">
        <ProfileSidebar />
        <div className="mt-2 w-full">
          <div className="flex items-center justify-between">
            <h5 className="text-lg font-bold">PaySlip</h5>
            <div className="flex items-center gap-3">
              {/* Search input */}
              <div className="input flex h-10 min-h-10 w-80 items-center gap-2 border border-gray-platinum text-sm outline-none placeholder:text-black hover:border-gray-platinum">
                <Search className="size-4 text-gray-dark" />
                <input
                  type="text"
                  onChange={(e) => setKeyword(e.target.value)}
                  className="h-full w-full placeholder:text-gray-dark"
                  placeholder="Search"
                />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-y-min mt-5 h-screen w-full overflow-y-auto rounded-md bg-white p-7">
            <QueryTable columns={columns} list={payslipListing?.data} />
            {totalPages && (
              <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

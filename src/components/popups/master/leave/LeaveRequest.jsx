import { LeaveRequestSchema } from "@/schema/dashboard/masters/shift.schema";
import { Dialog, DialogPanel } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { X, ChevronDown } from "lucide-react";
import toast from "react-hot-toast";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { newRequest } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { ADMIN_EMPLOYEE_LEAVE_UPDATE, LEAVE_REQUEST_LIST } from "@/api/master";
import { useUserStore } from "@/lib/slices/auth.slice";
import QueryTable from "@/components/table/QueryTable";

export default function LeaveRequest({
  popupOpen,
  setPopupOpen,
  id,
  ViewEdit,
}) {
  const [showLeaveList, setShowLeaveList] = useState(false);
  const [showLeaveDetail, setShowLeaveDetail] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [reason, setReason] = useState(null);
  const [rejected, setRejected] = useState(false);
  const { user } = useUserStore((state) => ({
    user: state.user,
  }));
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(LeaveRequestSchema),
  });

  const { data: leaveDetails } = useQuery({
    queryKey: ["leaveDetails", user?.id, id],
    queryFn: () =>
      newRequest
        .get(`${LEAVE_REQUEST_LIST}/${id}`, {
          params: { user_id: user?.id },
        })
        .then((res) => res.data),
    enabled: !!user?.id && !!id,
  });
  useEffect(() => {
    if (leaveDetails) {
      setSelectedStatus(leaveDetails?.leave_status?.id);
    }
  }, [leaveDetails]);
  const onSubmit = async (data) => {
    try {
      const formData = {
        leave_status_id: selectedStatus,
        descriptions: reason,
      };

      const res = await newRequest.post(
        `${ADMIN_EMPLOYEE_LEAVE_UPDATE}/${id}`,
        formData,
        {
          params: {
            user_id: user?.id,
          },
        },
      );
      if (res) {
        toast.success(res?.data?.message);
        window.location.reload();
        close();
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.error);
    } finally {
      setLoader(false);
    }
  };

  function close() {
    setPopupOpen(false);
    setShowLeaveDetail(false);
    reset();
  }

  const columns = React.useMemo(
    () => [
      {
        header: "Sl.no",
        accessorKey: "sno",
        cell: ({ row }) => {
          return <div className="">{row.index + 1}</div>;
        },
      },
      {
        header: "Date",
        accessorKey: "date",
        cell: ({ row }) => <p>{row?.original?.date || "0000-00-00"}</p>,
      },
      {
        header: "Shift",
        accessorKey: "shift_name",
      },
    ],
    [],
  );

  return (
    <Dialog
      open={popupOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={close}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/20">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="data-[closed]:transform-[scale(95%)] h-full w-full max-w-md rounded bg-white/90 p-10 backdrop-blur-2xl duration-300 ease-out data-[closed]:opacity-0"
          >
            <div className="mb-7 flex items-center justify-between">
              <h1 className="text-[0.99rem] font-bold leading-7 text-neutral-700">
                {ViewEdit == "view"
                  ? "View leave request"
                  : "Edit leave request"}
              </h1>
              <button
                onClick={close}
                className="text-lg font-extrabold text-[#00000080]"
              >
                <X />
              </button>
            </div>
            <form
              className="grid-cols-1n grid gap-1"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="group mt-3 flex flex-col space-y-1 text-[0.85rem] font-medium">
                <p className="text-[0.95rem] font-extrabold text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                  {leaveDetails?.employee?.first_name}{" "}
                  {leaveDetails?.employee?.middle_name}
                </p>
                <p>#{leaveDetails?.employee_id}</p>
                <p className="mt-5">Department</p>
              </div>
              <div className="group mt-5 flex justify-between text-[0.85rem] font-medium">
                <div className="flex flex-col">
                  <p>Start Date</p>
                  <p className="text-[0.95rem] font-extrabold text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                    {leaveDetails?.from_date}
                  </p>
                </div>
                <div>
                  <p>End Date</p>
                  <p className="text-[0.95rem] font-extrabold text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                    {leaveDetails?.to_date}
                  </p>
                </div>
              </div>
              <div className="group mt-5 flex justify-between space-y-1 text-[0.85rem] font-medium">
                <div>
                  <p>Leave Type</p>
                  <p className="text-[0.95rem] font-extrabold text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                    {leaveDetails?.leave_type}
                  </p>
                </div>
                <div className="w-[25%]">
                  <p>Leave Count</p>
                  <p className="text-[0.95rem] font-extrabold text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                    {leaveDetails?.total_leave_days}
                  </p>
                </div>
              </div>
              <div className="group mt-5 flex justify-between space-y-1 text-[0.85rem] font-medium">
                <div>
                  <p>Applied on</p>
                  <p className="text-[0.95rem] font-extrabold text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                    {(() => {
                      const formatDate = (dateString) => {
                        if (!dateString) return "N/A"; // Handle cases where dateString is undefined
                        const date = new Date(dateString);
                        const day = String(date.getDate()).padStart(2, "0");
                        const month = String(date.getMonth() + 1).padStart(
                          2,
                          "0",
                        ); // Months are 0-indexed
                        const year = date.getFullYear();
                        return `${day}-${month}-${year}`;
                      };

                      return formatDate(leaveDetails?.created_at);
                    })()}
                  </p>
                </div>
                <div className="w-[25%]">
                  <p>LOP Days</p>
                  <p className="text-[0.95rem] font-extrabold text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                    1
                  </p>
                </div>
              </div>
              <div className="group mt-5 flex flex-col justify-between space-y-1 text-[0.85rem] font-medium">
                <p>Reason</p>
                <p className="text-[0.95rem] font-extrabold text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                  {leaveDetails?.reason}
                </p>
              </div>
              {/* <div
                className="group mt-5 flex cursor-pointer items-center space-y-1 text-[0.85rem] font-medium text-[#030e5c]"
                onClick={() => setShowLeaveList((prev) => !prev)}
              >
                <p>Available Leaves</p>
                <span>
                  <ChevronDown size={24} color="#1f008f" strokeWidth={0.75} />
                </span>
              </div> */}
              {showLeaveList && (
                <div className="group mt-5 grid w-full grid-cols-3 justify-between gap-3 space-y-1 rounded-md border border-[#cecdcd] p-3 text-[0.85rem] font-medium">
                  <div className="pt-1">
                    <p>Casual Leave</p>
                    <p>0/5</p>
                  </div>
                  <div>
                    <p>Sick Leave</p>
                    <p>0/5</p>
                  </div>
                  <div>
                    <p>Comp Off</p>
                    <p>0/5</p>
                  </div>
                  <div>
                    <p>Lop</p>
                    <p>0/5</p>
                  </div>
                  <div>
                    <p>Comp Off</p>
                    <p>0/5</p>
                  </div>
                  <div>
                    <p>Special Leave</p>
                    <p>0/5</p>
                  </div>
                </div>
              )}
              <div className="group mt-5 flex items-center gap-3 text-[0.85rem] font-medium">
                <p>View leave details</p>
                <ChevronDown
                  size={20}
                  className={`cursor-pointer transition-transform duration-300 ${
                    showLeaveDetail ? "rotate-180" : ""
                  }`}
                  onClick={() => setShowLeaveDetail(!showLeaveDetail)}
                />
              </div>

              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  showLeaveDetail
                    ? "mt-5 max-h-[500px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <QueryTable
                  columns={columns}
                  list={leaveDetails?.leave_period}
                />
              </div>

              <div className="group mt-5 flex items-center gap-3 text-[0.85rem] font-medium">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="leaveStatus"
                    disabled={ViewEdit === "view"}
                    value="pending"
                    onClick={() => {
                      setRejected(false);
                      setSelectedStatus(1);
                    }}
                    className="radio-black"
                    checked={selectedStatus === 1}
                  />
                  <label className="text-sm font-normal">Pending</label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="leaveStatus"
                    disabled={ViewEdit === "view"}
                    value="approved"
                    onClick={() => {
                      setRejected(false);
                      setSelectedStatus(2);
                    }}
                    className="radio-black"
                    checked={selectedStatus === 2}
                  />
                  <label className="text-sm font-normal">Approved</label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="leaveStatus"
                    disabled={ViewEdit === "view"}
                    value="rejected"
                    onClick={() => {
                      setRejected(true);
                      setSelectedStatus(3);
                    }}
                    className="radio-black"
                    checked={selectedStatus === 3}
                  />
                  <label className="text-sm font-normal">Rejected</label>
                </div>
              </div>
              {rejected && (
                <div className="mt-2 flex flex-col gap-2 text-[0.85rem] font-medium">
                  <label>Reason for rejection</label>
                  <textarea
                    className="h-20 w-full rounded-md border border-[#cecdcd] p-1"
                    placeholder="Enter your reason here..."
                    onChange={(e) => setReason(e.target.value)}
                  ></textarea>
                </div>
              )}
              {ViewEdit == "edit" && (
                <div className="mt-3 flex flex-row gap-3">
                  <button
                    onClick={close}
                    className="flex h-11 w-1/2 cursor-pointer items-center justify-center gap-2 rounded-md border border-[#cecdcd] text-sm font-normal text-black focus:outline-none"
                  >
                    <span>Cancel</span>
                  </button>
                  <button
                    type="submit"
                    className="flex h-11 w-1/2 cursor-pointer items-center justify-center gap-2 rounded-md bg-hrmblack text-sm font-normal text-white focus:outline-none"
                  >
                    <span>Save</span>
                  </button>
                </div>
              )}
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

import { newRequest, ROASTER_GET, TEAMROSTER_EMPLOYEELIST } from "@/api/master";
import { Dialog, DialogPanel } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import { X } from "lucide-react";
import React from "react";

export default function TeamRosterShiftView({
  popupOpen,
  setPopupOpen,
  selectedField,
  date,
  convertTo12HourFormat,
}) {

  // const [loader, setLoader] = useState(false);
  const { data, refetch } = useQuery({
    queryKey: ["shiftDetails", selectedField?.id], // Array of query keys
    queryFn: () =>
      newRequest
        .get(`${ROASTER_GET}/${selectedField?.id}`)
        .then((res) => res.data),
    enabled: !!selectedField, // Only run query if selectedField is defined
  });
  const { data: employeelist } = useQuery({
    queryKey: ["employeeList", selectedField?.id], // Unique query key
    queryFn: () =>
      newRequest
        .get(`${TEAMROSTER_EMPLOYEELIST}/${data?.shift_id}`)
        .then((res) => res.data),
    enabled: !!data?.shift_id, // Run only if data and shift_id exist
  });

  function close() {
    setPopupOpen(false);
  }
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
            className="data-[closed]:transform-[scale(95%)] w-full max-w-md justify-between rounded bg-white/90 px-12 py-10 backdrop-blur-2xl duration-300 ease-out data-[closed]:opacity-0"
          >
            <div className="mb-7 flex items-center justify-between">
              <h1 className="text-lg font-bold leading-7 text-textcolor-darkCharcoal">
                Shift details
              </h1>
              <button
                onClick={close}
                className="text-xl font-extrabold text-textcolor-darkCharcoal"
              >
                <X />
              </button>
            </div>
            <div className="grid grid-cols-2 justify-between gap-3 gap-y-7">
              <div className="group col-span-2 flex items-center justify-between space-y-1 border border-b border-gray-darklight">
                <label className="flex text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                  <div className="mr-2 mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-[#e9e9e9] p-2">
                    <img
                      src="/assets/icons/setup/re-box.svg"
                      alt="icons"
                      className="h-4 w-4"
                    />
                  </div>
                  <div>
                    <p>{data?.shift?.name}</p>
                    <p className="text-sm font-semibold">
                      {" "}
                      {convertTo12HourFormat(data?.shift?.start_time || "")}-
                      {convertTo12HourFormat(data?.shift?.end_time || "")}
                    </p>
                  </div>
                </label>
                <div className="cursor-pointer rounded-full bg-gray-darklight p-2">
                  <img
                    src="/assets/icons/setup/re-Edit.svg"
                    alt="icons"
                    className="h-5 w-5"
                  />
                </div>
              </div>
              <div className="group flex flex-col space-y-1">
                <label className="text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                  Clock in time
                </label>
                <p className="text-sm font-semibold">1:00pm </p>
              </div>
              <div className="group flex w-full flex-col gap-1">
                <label className="label-text">Clock Out</label>
                <p className="text-sm font-semibold">3:00pm</p>
              </div>
              <div className="group col-span-2 flex w-full flex-col gap-1">
                <label className="label-text">Members</label>
                <p className="text-sm font-semibold">
                  {data?.shift?.people_required || "0"}
                </p>
              </div>
              <div className="group flex w-full flex-col gap-1">
                <label className="label-text">Department</label>
                <p className="text-sm font-semibold">
                  {data?.shift?.department?.department_name || ""}
                </p>
              </div>
              <div className="group flex w-full flex-col gap-1">
                <label className="label-text">Work Location</label>
                <p className="text-sm font-semibold">
                  {data?.shift?.location?.work_location_name || ""}
                </p>
              </div>
              <div className="group flex w-full flex-col gap-1">
                <label className="label-text">Work Area</label>
                <p className="text-sm font-semibold">
                  {data?.shift?.work_area?.name || ""}
                </p>
              </div>
              <div className="group flex w-full flex-col gap-1">
                <label className="label-text">Pay type</label>
                <p className="text-sm font-semibold">perday</p>
              </div>
              <div className="group flex w-full flex-col gap-1">
                <label className="label-text">Created by</label>
                <p className="text-sm font-semibold">krishna</p>
              </div>
            </div>
            <div className="mt-5 flex max-h-48 flex-col gap-2 overflow-y-auto">
              {employeelist?.map((employee) => (
                <div
                  key={employee.id}
                  className="flex items-center gap-3 rounded-lg bg-gray-100 p-3"
                >
                  <div className="rounded-full bg-gray-dark w-8 h-8 overflow-hidden">
                    <img className="w-full h-full" src={employee?.employee?.profile_image} alt="" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      {employee?.employee?.first_name }
                    </p>
                    <p className="text-xs font-medium text-darkblack">
                      {employee?.designation?.designation_name || "Role not available"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

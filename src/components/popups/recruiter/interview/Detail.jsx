import { newRequest } from "@/api";
import { Dialog, DialogPanel } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import { User } from "lucide-react";

export default function RecInterviewDetailView({
  popupOpen,
  setPopupOpen,
  selectedField,
  setSelectedField,
  api,
}) {
  let enableKey = selectedField === 0 ? false : true;
  // Get selected data
  const { data: recInterviewDetail, isLoading } = useQuery({
    queryKey: ["recInterviewDetail", api, selectedField],
    queryFn: () =>
      newRequest.get(`${api}/${selectedField}`).then((res) => res.data),
    enabled: enableKey,
  });

  function close() {
    setPopupOpen(false);
    setSelectedField(0);
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
            className="data-[closed]:transform-[scale(95%)] w-full max-w-md rounded bg-white/90 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:opacity-0"
          >
            <div className="mb-10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex size-7 items-center justify-center rounded-full border">
                  <User className="size-4 fill-black" />
                </div>
                <div className="flex flex-col">
                  <div className="text-sm font-semibold">
                    {recInterviewDetail?.candidate_name}
                  </div>
                  <div className="text-xs text-[#7F7F7F]">
                    {recInterviewDetail?.job_title}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <h5 className="text-[0.94rem] font-semibold">Status :</h5>
                <p className="text-sm font-semibold text-hrmprimaryorange">
                  {recInterviewDetail?.interview_status}
                </p>
              </div>
            </div>
            {isLoading ? (
              <div className="flex min-h-72 w-full items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-hrmprimaryorange"></div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 gap-y-7">
                <div className="group flex flex-col space-y-1">
                  <label className="text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                    Interview Date
                  </label>
                  <p className="text-sm font-semibold">
                    {recInterviewDetail?.scheduled_date}
                  </p>
                </div>
                <div className="group flex flex-col space-y-1">
                  <label className="text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                    Interview mode
                  </label>
                  <p className="text-sm font-semibold">
                    {recInterviewDetail?.interview_guide_id?.label}
                  </p>
                </div>
                <div className="group flex flex-col space-y-1">
                  <label className="text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                    Interviewer
                  </label>
                  <div className="flex items-center gap-2">
                    {recInterviewDetail?.interviewers?.slice(0, 1).map((i) => (
                      <span className="text-sm font-medium" key={i?.id}>
                        {i?.value}
                      </span>
                    ))}
                    {recInterviewDetail?.interviewers?.length > 2 && (
                      <div
                        className="tooltip ml-1 cursor-pointer"
                        data-tip={recInterviewDetail?.interviewers
                          ?.map((i) => `${i?.value}`)
                          .join(", ")}
                      >
                        <span className="text-[0.7rem] font-bold text-hrmprimaryorange">
                          +{recInterviewDetail?.interviewers?.length - 1} more
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="group flex w-full flex-col gap-1">
                  <label className="label-text">Department</label>
                  <p className="text-sm font-semibold">
                    {recInterviewDetail?.department}
                  </p>
                </div>
                <div className="mt-7 flex w-full items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={close}
                    className="flex h-11 w-fit min-w-40 cursor-pointer items-center justify-center gap-2 rounded-md bg-black text-sm font-semibold text-white focus:outline-none"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

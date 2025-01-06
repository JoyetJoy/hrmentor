import React, { useEffect, useState } from "react";
import Select from "react-select";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Controller, useForm } from "react-hook-form";
import { customSelectStyles } from "@/utils/customStyles";
import useEmployeeMaster from "@/hooks/useEmployeeMasters";
import { SALARY_DEFAULT_MASTERS } from "@/api/master";
import { newFormRequest, newRequest } from "@/api";
import { recCandidateSchema } from "@/schema/dashboard/recruiter/candidate/form/save.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { GET_CANDIDATES, GET_CANDIDATES_VIEW } from "@/api/recruiter";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ChevronDown,
  CircleArrowDown,
  Filter,
  History,
  MoveLeft,
  Search,
  User,
  X,
} from "lucide-react";
import ResumePreview from "@/components/recruiter/candidate/Preview";
import ChooseOfferLetterType from "@/components/popups/hiring/ready-to-hiring/ChooseTypeOffer";
import RejectCandidate from "@/components/popups/hiring/ready-to-hiring/RejectCandidate";
import { CANDIDATE_STATUS, CANDIDATE_STATUS_UPDATE } from "@/api/hiring";
import toast from "react-hot-toast";
import MenuHeaderHiring from "@/components/hiring/MenuHeader";
import ChangeStatus from "@/components/popups/hiring/ready-to-hiring/ChangeStatus";

export default function HiringCandidateDetails() {
  let type = "update";
  const [popupOpen, setPopupOpen] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);
  const [selectedField, setSelectedField] = useState(0);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const cid = searchParams.get("cid");
  const [filePreview, setFilePreview] = useState("");
  const [resumefile, setResumeFile] = useState(null);
  const [conditionalOfferLetter, setConditionalOfferLetter] = useState(null);
  const [statusList, setStatusList] = useState([]);
  const [popup, setPopup] = useState(false);
  const [statusPopup,setStatusPopup] = useState(false);
  const [status,setStatus] = useState({
    id:'',
    status_name:''
  })

  const [loader, setLoader] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(recCandidateSchema),
  });

  //
  // GET DETAILS IN CASE OF UPDATE
  const { data: candidateDetails, isLoading,refetch } = useQuery({
    queryKey: ["candidateDetails", cid, type],
    queryFn: () =>
      newRequest.get(`${GET_CANDIDATES_VIEW}/${cid}`).then((res) => {
        return res.data;
      }),
    enabled: type == "update",
  });

  const { data: candidateStatus } = useQuery({
    queryKey: ["candidateStatus"],
    queryFn: () =>
      newRequest.get(`${CANDIDATE_STATUS}`).then((res) => {
        return res.data;
      }),
  });

  useEffect(() => {
    if (candidateStatus) {
      const filteredData = candidateStatus.filter(
        (item) => item.label !== "" && item.value !== "",
      );
      setStatusList(filteredData);
    }
  }, [candidateStatus]);

  useEffect(() => {
    if (candidateDetails) {
      localStorage.setItem(
        "candidateDetails",
        JSON.stringify(candidateDetails),
      );
    }
  }, []);

  const [sameAsHome, setSameAsHome] = useState(false);
  const { country_id, state_or_province, home_address } = watch();

  // RECRUITER MASTERS LISTING
  const { data: recruiterMasters } = useEmployeeMaster(
    SALARY_DEFAULT_MASTERS,
    "recruiterMasters",
  );

  useEffect(() => {
    if (candidateDetails) {
      setResumeFile(candidateDetails?.accepted_condtional_offer_letter_pdf);
      setConditionalOfferLetter(
        candidateDetails?.uncondtional_offer_letter_document_pdf,
      );
    }
  }, [candidateDetails, setResumeFile, setConditionalOfferLetter]);

  useEffect(() => {
    if (candidateDetails) {
      setSameAsHome(
        candidateDetails?.data?.same_as_home_address == 1 ? true : false,
      );
    }
  }, [candidateDetails, setSameAsHome]);

  // SAME AS HOME
  useEffect(() => {
    if (sameAsHome === true) {
      setValue("communication_address", home_address);
    } else if (sameAsHome === false) {
      setValue("communication_address", "");
    }
  }, [sameAsHome]);

  const onSubmit = (data) => {
    setLoader(true);
  };

  const handleCandidateStatus = async (selectedOption) => {
    setLoader(true); // Ensure the loader is activated before the API call

    try {
      // Make the API request to update the candidate status
      const res = await newRequest.post(
        `${CANDIDATE_STATUS_UPDATE}/${cid}/${selectedOption?.id}`,
      );

      // If the response is successful, display a success toast
      if (res?.data?.message) {
        toast.success(res.data.message);
        refetch();
      } else {
        toast.success("Candidate status updated successfully.");
        refetch();
      }
    } catch (error) {
      // Log and display an error message if the API request fails
      console.error("Error updating candidate status:", error);

      const errorMessage =
        error?.response?.data?.error ||
        "Failed to update candidate status. Please try again.";
      toast.error(errorMessage);
    } finally {
      // Ensure the loader is deactivated after the API call
      setLoader(false);
    }
  };

  const handleCandidateConfirm = async () => {
    setLoader(true); // Ensure the loader is activated before the API call

    try {
      const formData = new FormData();
      formData.append("candidate_id", Number(cid));

      // Make the API request to update the candidate status
      const res = await newRequest.post(
        "hiring-candidate-to-employee",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      // Handle success response
      const successMessage =
        res?.data?.message || "Candidate status updated successfully.";
      toast.success(successMessage);
      window.location.reload();
    } catch (error) {
      // Log the error and display an appropriate message to the user
      console.error("Error updating candidate status:", error);

      const errorMessage =
        error?.response?.data?.error || "Email Is Duplicate ,Please check";
      toast.error(errorMessage);
    } finally {
      // Ensure the loader is deactivated after the API call
      setLoader(false);
    }
  };

  return (
    <>
      <ChooseOfferLetterType
        open={popupOpen}
        setPopupOpen={setPopupOpen}
        selectedField={selectedField}
      />
      <MenuHeaderHiring page={1} />
      <RejectCandidate
        open={rejectOpen}
        setPopupOpen={setRejectOpen}
        selectedField={selectedField}
      />
      <ChangeStatus
      statusList={statusList}
      candidateDetails={candidateDetails}
      open={statusPopup}
      setOpen={setStatusPopup}
      handleCandidateStatus={handleCandidateStatus}
      />
      <div>
        <div className="flex items-center justify-between gap-2 font-semibold text-white">
          <div className="flex">
            {candidateDetails && (
              <div className="flex items-center gap-2">
                <div className="flex size-7 items-center justify-center rounded-full border">
                  <User className="size-4 fill-black" />
                </div>
                <div className="flex flex-col text-black">
                  <div className="text-sm font-semibold">
                    {candidateDetails?.first_name} {candidateDetails?.sur_name}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 rounded-md border bg-white px-7 py-2 font-medium text-sm text-black">
            <History size={16} color="black" />
            <p>History</p>
          </div>
        </div>
        <form className="mt-2 grid grid-cols-2 gap-5 rounded-md py-4 pb-12">
          <div className="flex flex-col rounded-md bg-white p-5">
            <div className="flex">
              <div className="mt-2 flex h-fit w-full flex-col gap-3 rounded bg-white py-1">
                <div className="flex items-center gap-2">
                  <img
                    className="h-7 w-7"
                    src="/assets/images/hiring/offer/1.png"
                    alt=""
                  />
                  <p className="text-[0.9rem] font-medium">
                    {candidateDetails?.employement_type}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <img
                    className="h-7 w-7"
                    src="/assets/images/hiring/offer/2.png"
                    alt=""
                  />
                  <p className="text-[0.9rem] font-medium">
                    {candidateDetails?.date_applied}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <img
                    className="h-7 w-7"
                    src="/assets/images/hiring/offer/3.png"
                    alt=""
                  />
                  <p className="text-[0.9rem] font-medium">
                    {candidateDetails?.city}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <img
                    className="h-7 w-7"
                    src="/assets/images/hiring/offer/4.png"
                    alt=""
                  />
                  <p className="text-[0.9rem] font-medium">
                    {candidateDetails?.department}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <img
                    className="h-7 w-7"
                    src="/assets/images/hiring/offer/5.png"
                    alt=""
                  />
                  <p className="text-[0.9rem] font-medium">
                    {candidateDetails?.designation}
                  </p>
                </div>
              </div>
              {candidateDetails?.status?.id === 11 ? (
                <>
                  <span className="group flex w-1/6 flex-col items-center text-[0.80rem] text-[#3a3a3a] bg-[#f2f4f5] pl-1 rounded-md space-y-1 h-9 mt-2 py-2 cursor-pointer">
                    {candidateDetails?.status?.status_name}
                  </span>
                </>
              ) : (
                <>
                  <div className="group flex w-3/4 flex-col border border-[#8be691] text-[0.80rem] text-[#3a3a3a] bg-[#f0fff1] pl-1 rounded-md space-y-1 h-9 mt-2 py-2 cursor-pointer">
                  <p 
                  onClick={()=>setStatusPopup(true)}
                  className="flex gap-2">{candidateDetails?.status?.status_name}<ChevronDown size={20} color="#8c8989" /></p>
                  </div>
                  <div className="ml-3 mt-2 w-1/2">
                    <button
                      type={"button"}
                      onClick={() => {
                        setPopup(true);
                      }}
                      className="h-9 w-full rounded bg-hrmprimaryorange px-7 text-xs text-white"
                    >
                      Confirm Join{" "}
                    </button>
                  </div>
                </>
              )}
            </div>
            <div className="grid grid-cols-2 gap-x-3 rounded border-t bg-white py-4">
              <div className="group flex flex-col space-y-1 py-2">
                <label className="label-text">Joining Date</label>
                <input
                  {...register("joining_date")}
                  autoComplete="off"
                  type="date"
                  className="input-box pr-2"
                  value={candidateDetails?.joining_date}
                />
                {errors.joining_date && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.joining_date?.message}
                  </span>
                )}
              </div>
              <div className="mb-2 mt-8 flex items-center space-y-1 rounded-md border p-2 text-sm font-semibold text-[#71717a]">
                Reschedule
              </div>
              <div className="group flex flex-col space-y-1 py-2">
                <label className="label-text">Per</label>
                <Controller
                  name="pay_type"
                  className=""
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      isSearchable={true}
                      styles={customSelectStyles}
                      value={recruiterMasters?.pers.find(
                        (option) =>
                          option.id === candidateDetails?.pay_type?.id,
                      )}
                      options={recruiterMasters?.pers}
                      placeholder="Select type"
                      className="input-box"
                    />
                  )}
                />
                {errors.pay_type && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.pay_type?.message}
                  </span>
                )}
              </div>
              <div className="group flex flex-col space-y-1 py-2">
                <label className="label-text">Salary</label>
                <input
                  {...register("salary")}
                  autoComplete="off"
                  type="text"
                  className="input-box"
                  value={candidateDetails?.salary}
                />
                {errors.salary && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.salary?.message}
                  </span>
                )}
              </div>
            </div>
            {candidateDetails?.status?.id !== 11 && (
              <div className="flex gap-3">
                <button
                  type={"button"}
                  onClick={() => {
                    setRejectOpen(true);
                    setSelectedField(candidateDetails?.data?.id);
                  }}
                  className="h-9 rounded bg-[#AB2727]/10 px-7 text-xs font-semibold text-[#AB2727]"
                >
                  Reject
                </button>
                <button
                  type={"button"}
                  onClick={() => {
                    setPopupOpen(true);
                    setSelectedField(candidateDetails?.data?.id);
                  }}
                  className="h-9 rounded bg-hrmprimaryorange px-7 text-xs text-white"
                >
                  Send Offer Letter
                </button>
              </div>
            )}
          </div>

          <div className="mx-auto w-full rounded-md bg-white px-11 py-9">
            <Disclosure as="div" className="" defaultOpen={false}>
              <DisclosureButton className="group flex w-full items-center gap-4 py-5">
                <CircleArrowDown className="size-5 !fill-white/60 text-black/30 group-data-[open]:rotate-180 group-data-[hover]:fill-white/50" />
                <span className="text-sm/6 font-medium group-data-[hover]:text-black/80">
                  View uploaded document
                </span>
              </DisclosureButton>
              <DisclosurePanel className="mt-2 h-fit">
                <ResumePreview
                  file={resumefile}
                  setFile={setResumeFile}
                  filePreview={filePreview}
                  setFilePreview={setFilePreview}
                />
              </DisclosurePanel>
            </Disclosure>
            <hr />
            <Disclosure as="div" className="" defaultOpen={false}>
              <DisclosureButton className="group flex w-full items-center gap-4 py-5">
                <CircleArrowDown className="size-5 !fill-white/60 text-black/30 group-data-[open]:rotate-180 group-data-[hover]:fill-white/50" />
                <span className="text-sm/6 font-medium group-data-[hover]:text-black/80">
                  View unconditional offer letter
                </span>
              </DisclosureButton>
              <DisclosurePanel className="mt-2 h-fit">
                <ResumePreview
                  file={conditionalOfferLetter}
                  setFile={setConditionalOfferLetter}
                  filePreview={filePreview}
                  setFilePreview={setFilePreview}
                />
              </DisclosurePanel>
            </Disclosure>
            <hr />
          </div>
        </form>
      </div>

      {popup == true && (
        <div className="fixed inset-0 z-[99] flex items-center justify-center bg-black bg-opacity-50">
          <div className="flex w-full max-w-sm flex-col items-center justify-center rounded bg-white px-10 py-7 shadow-lg">
            <button
              className="mb-3 flex w-full justify-end"
              onClick={() => {
                setPopup(false);
              }}
            >
              <X />
            </button>
            <h1 className="font-bold">Confirm Joining</h1>
            <h4 className="text-sm text-black/70">
              Are you sure you want to confirm joining?
            </h4>
            <div className="mt-10 flex w-full items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => {
                  setPopup(false);
                }}
                className="h-11 w-full rounded-lg border border-black/20 px-4 text-sm font-semibold text-black/70 hover:bg-gray-pale"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedField(candidateDetails?.data?.id);
                  handleCandidateConfirm();
                }}
                className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-black/80 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

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
import { CircleArrowDown, MoveLeft, User } from "lucide-react";
import ResumePreview from "@/components/recruiter/candidate/Preview";
import ChooseOfferLetterType from "@/components/popups/hiring/ready-to-hiring/ChooseTypeOffer";
import RejectCandidate from "@/components/popups/hiring/ready-to-hiring/RejectCandidate";
import { CANDIDATE_STATUS, CANDIDATE_STATUS_UPDATE } from "@/api/hiring";
import toast from "react-hot-toast";

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
  const { data: candidateDetails, isLoading } = useQuery({
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
      setResumeFile(candidateDetails?.condtional_offer_letter_document_pdf);
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
    console.log(selectedOption?.id, "Selected Candidate Status ID");

    setLoader(true); // Ensure the loader is activated before the API call

    try {
      // Make the API request to update the candidate status
      const res = await newRequest.post(
        `${CANDIDATE_STATUS_UPDATE}/${cid}/${selectedOption?.id}`,
      );

      // If the response is successful, display a success toast
      if (res?.data?.message) {
        toast.success(res.data.message);
        window.location.reload();
      } else {
        toast.success("Candidate status updated successfully.");
        window.location.reload();
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

  return (
    <>
      <ChooseOfferLetterType
        open={popupOpen}
        setPopupOpen={setPopupOpen}
        selectedField={selectedField}
      />
      <RejectCandidate
        open={rejectOpen}
        setPopupOpen={setRejectOpen}
        selectedField={selectedField}
      />
      <form className="mt-2 grid grid-cols-2 gap-5 rounded-md bg-white px-6 py-4 pb-12">
        <div className="flex flex-col">
          <div className="flex">
            {candidateDetails && (
              <div className="flex items-center gap-2">
                <MoveLeft onClick={() => history.back()} className="h-5" />
                <div className="flex size-7 items-center justify-center rounded-full border">
                  <User className="size-4 fill-black" />
                </div>
                <div className="flex flex-col text-black">
                  <div className="text-sm font-semibold">
                    {candidateDetails?.first_name} {candidateDetails?.sur_name}
                  </div>
                  <div className="text-xs text-gray-dark">
                    {candidateDetails?.data?.education?.value}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="flex">
            <div className="mt-2 flex h-fit w-full flex-col gap-3 rounded bg-white py-4">
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
            {candidateDetails?.status?.status_name === "Hired" ? (
              <>
                <span
                  style={{
                    backgroundColor: candidateDetails?.status?.background_color,
                    color: candidateDetails?.status?.text_color,
                    border: `1px solid ${candidateDetails?.status?.border_color || "transparent"}`,
                    borderRadius: "5px", // Rounded corners
                    padding: "5px 15px", // Padding for spacing
                    display: "inline-block", // Ensures it behaves like a box
                    height: "30px", // Adjust height
                    lineHeight: "30px", // Vertically center the text
                    minWidth: "80px", // Adjust width (optional)
                    textAlign: "center", // Center-align text
                    fontSize: "14px", // Font size
                    fontWeight: "bold", // Bold text
                  }}
                >
                  {candidateDetails?.status?.status_name}
                </span>
              </>
            ) : (
              <div className="group flex w-full flex-col space-y-1 py-2">
                <label className="required label-text">Status</label>
                <Controller
                  name="status_hiring"
                  className=""
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      isSearchable={true}
                      styles={customSelectStyles}
                      options={statusList}
                      value={statusList.find(
                        (option) => option.id === candidateDetails?.status?.id,
                      )}
                      onChange={(e) => {
                        field.onChange(e);
                        handleCandidateStatus(e);
                      }}
                      placeholder="New Hiring"
                      className="input-box"
                    />
                  )}
                />
              </div>
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
            <div className="group flex flex-col space-y-1 py-2">
              <label className="label-text">Pay Type</label>
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
                    value={recruiterMasters?.payTypes.find(
                      (option) => option.id === candidateDetails?.pay_type?.id,
                    )}
                    options={recruiterMasters?.payTypes}
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
        </div>

        <div className="mx-auto w-full max-w-lg rounded-xl bg-white">
          <Disclosure as="div" className="p-6" defaultOpen={false}>
            <DisclosureButton className="group flex w-full items-center gap-4 border px-5 py-3">
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
          <Disclosure as="div" className="p-6" defaultOpen={false}>
            <DisclosureButton className="group flex w-full items-center gap-4 border px-5 py-3">
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
        </div>
      </form>
    </>
  );
}

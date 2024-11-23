import React, { useEffect, useState } from "react";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Controller, useForm } from "react-hook-form";
import { customSelectStyles } from "@/utils/customStyles";
import useEmployeeMaster from "@/hooks/useEmployeeMasters";
import Addtransfer from "@/components/popups/recruiter/candiadate/AddTransfer";
import {
  COUNTRY,
  COUNTRY_CITY,
  SALARY_DEFAULT_MASTERS,
  SOURCES_LIST,
  STATE_COUNTRY,
} from "@/api/master";
import { newFormRequest, newRequest } from "@/api";
import { recCandidateSchema } from "@/schema/dashboard/recruiter/candidate/form/save.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import Loader from "@/components/ui/Loader";
import toast from "react-hot-toast";
import { GET_CANDIDATES, UPDATE_CANDIDATE } from "@/api/recruiter";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ChevronDown,
  CircleArrowDown,
  MoveDown,
  MoveLeft,
  Plus,
  User,
} from "lucide-react";
import ResumePreview from "@/components/recruiter/candidate/Preview";
import ChooseOfferLetterType from "@/components/popups/hiring/ready-to-hiring/ChooseTypeOffer";

export default function HiringCandidateDetails() {
  let type = "update";
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedField, setSelectedField] = useState(0);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const cid = searchParams.get("cid");
  const [filePreview, setFilePreview] = useState("");
  const [resumefile, setResumeFile] = useState(null);
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
      newRequest.get(`${GET_CANDIDATES}/${cid}`).then((res) => {
        return res.data;
      }),
    enabled: type == "update",
  });
  console.log(candidateDetails?.data);

  useEffect(() => {
    if (candidateDetails) {
      localStorage.setItem(
        "candidateDetails",
        JSON.stringify(candidateDetails?.data),
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

  // SOURCES LISTING
  const { data: sourcesList } = useEmployeeMaster(SOURCES_LIST, "sourcesList");

  // COUNTRY LISTING
  const { data: countryList } = useEmployeeMaster(COUNTRY, "countryList");
  // GET STATTE BY COUNTRY ID AND SEARCH KEY
  const loadStatesOptions = async (inputValue) => {
    if (inputValue?.length < 3) {
      return [];
    }
    const response = await newRequest.get(STATE_COUNTRY, {
      params: { country_id: parseInt(country_id?.id), search: inputValue },
    });
    return response?.data;
  };

  // GET CITY BY STATE ID AND SEARCH KEY
  const loadCitiesOptions = async (inputValue) => {
    if (inputValue?.length < 3) {
      return [];
    }
    const response = await newRequest.get(COUNTRY_CITY, {
      params: {
        state_id: parseInt(state_or_province?.id),
        search: inputValue,
      },
    });

    return response?.data;
  };

  useEffect(() => {
    if (candidateDetails?.data) {
      setValue("employee_id", candidateDetails?.data?.employee_id);
      setValue("first_name", candidateDetails?.data?.first_name);
      setValue("middle_name", candidateDetails?.data?.middle_name);
      setValue("post_code", candidateDetails?.data?.post_code);
      setValue("sur_name", candidateDetails?.data?.sur_name);
      setValue("gender", candidateDetails?.data?.genderValue);
      setValue("date_of_birth", candidateDetails?.data?.date_of_birth);
      setValue("nationality_id", candidateDetails?.data?.nationality_id);
      setValue(
        "communication_address",
        candidateDetails?.data?.communication_address,
      );
      setValue("post_code", candidateDetails?.data?.post_code);
      setValue("highest_education_level", candidateDetails?.data?.education);
      setValue(
        "college_or_university",
        candidateDetails?.data?.college_university,
      );
      setValue("job_id", candidateDetails?.data?.JobName);
      setValue("date_applied", candidateDetails?.data?.date_applied);
      setValue("source", candidateDetails?.data?.sourceName);
      setValue("home_address", candidateDetails?.data?.home_address);
      setValue("email", candidateDetails?.data?.email);
      setValue("phone_number", candidateDetails?.data?.phone_number);
      setValue("email", candidateDetails?.data?.email);
      setValue("language_spoken", candidateDetails?.data?.languages);
      setValue("country_id", candidateDetails?.data?.country);
      setValue("state_or_province", candidateDetails?.data?.stateOrProvince);
      setValue("city_id", candidateDetails?.data?.city);
      setValue("linked_in", candidateDetails?.data?.linkedin_id ?? "");
    }
  }, [candidateDetails, setValue]);

  useEffect(() => {
    if (candidateDetails) {
      setResumeFile(candidateDetails?.data?.pdf_upload);
    }
  }, [candidateDetails, setResumeFile]);

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

  return (
    <>
      <ChooseOfferLetterType
        open={popupOpen}
        setPopupOpen={setPopupOpen}
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
                    {candidateDetails?.data?.first_name}{" "}
                    {candidateDetails?.data?.sur_name}
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
                <p className="text-[0.9rem] font-medium">Full Time</p>
              </div>
              <div className="flex items-center gap-2">
                <img
                  className="h-7 w-7"
                  src="/assets/images/hiring/offer/2.png"
                  alt=""
                />
                <p className="text-[0.9rem] font-medium">11/07/2023</p>
              </div>
              <div className="flex items-center gap-2">
                <img
                  className="h-7 w-7"
                  src="/assets/images/hiring/offer/3.png"
                  alt=""
                />
                <p className="text-[0.9rem] font-medium">Trivandrum</p>
              </div>
              <div className="flex items-center gap-2">
                <img
                  className="h-7 w-7"
                  src="/assets/images/hiring/offer/4.png"
                  alt=""
                />
                <p className="text-[0.9rem] font-medium">Sales & Marketing</p>
              </div>
              <div className="flex items-center gap-2">
                <img
                  className="h-7 w-7"
                  src="/assets/images/hiring/offer/5.png"
                  alt=""
                />
                <p className="text-[0.9rem] font-medium">Sales & Marketing</p>
              </div>
            </div>
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
                    options={[]}
                    placeholder="New Hiring"
                    className="input-box"
                  />
                )}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-3 rounded border-t bg-white py-4">
            <div className="group flex flex-col space-y-1 py-2">
              <label className="label-text">Joining Date</label>
              <input
                {...register("joining_date")}
                autoComplete="off"
                type="date"
                className="input-box pr-2"
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
                setPopupOpen(true);
                setSelectedField(candidateDetails?.data?.id);
              }}
              className="h-9 rounded bg-[#AB2727]/10 px-7 text-xs text-[#AB2727]"
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

        <div className="mx-auto w-full max-w-lg divide-y divide-black/5 rounded-xl bg-white">
          <Disclosure as="div" className="p-6" defaultOpen={true}>
            <DisclosureButton className="group flex w-full items-center gap-4 border px-5 py-3">
              <CircleArrowDown className="size-5 !fill-white/60 group-data-[open]:rotate-180 group-data-[hover]:fill-white/50" />
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
        </div>
      </form>
    </>
  );
}

import React, { useEffect, useState } from "react";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import { Controller, useForm } from "react-hook-form";
import { customSelectStyles } from "@/utils/customStyles";
import ResumeDragzone from "@/components/recruiter/candidate/ResumeDragzone";
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
import MenuHeaderCandidate from "./MenuHeader";
import { ChevronDown, Plus } from "lucide-react";

export default function RecSaveFormCandidate({ type }) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const cid = searchParams.get("cid");
  const types = searchParams.get("types");
  const [filePreview, setFilePreview] = useState("");
  const [resumefile, setResumeFile] = useState(null);
  const [loader, setLoader] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Consider");
  const [popupOpen, setPopupOpen] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [state, setState] = useState("");
  const [edit, setEdit] = useState(false);

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
      console.log(candidateDetails?.data);

      setValue("employee_id", candidateDetails?.data?.employee_id);
      setValue("first_name", candidateDetails?.data?.first_name);
      setValue("middle_name", candidateDetails?.data?.middle_name || "");
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
      if (candidateDetails?.data?.stateOrProvince) {
        setState(candidateDetails?.data?.stateOrProvince?.value);
      }
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
    handleEmployee(data);
  };

  const handleEmployee = async (data) => {
    if (!resumefile) {
      toast.error("Please upload resume");
      setLoader(false);
      return;
    }
    const formData = new FormData();
    console.log(data.state_or_province);

    formData.append("first_name", data.first_name);
    formData.append("middle_name", data.middle_name ?? "");
    formData.append("sur_name", data.sur_name);
    formData.append("gender", data.gender?.id);
    formData.append("date_of_birth", data.date_of_birth);
    formData.append("source", data.source.id);
    formData.append("job_id", data.job_id.id);
    formData.append("post_code", data.post_code);
    formData.append("linked_in", data.linked_in ?? "");
    formData.append("phone_number", data.phone_number);
    formData.append("email", data.email);
    formData.append("personal_email", data.personal_email);
    formData.append("resume_file", resumefile);
    formData.append("home_address", data.home_address);
    formData.append("communication_address", data.communication_address);
    formData.append(
      "highest_education_level",
      data.highest_education_level?.id,
    );
    formData.append("college_or_university", data.college_or_university?.id);
    formData.append("date_applied", data.date_applied);
    data.language_spoken.forEach((language) => {
      formData.append("language_spoken[]", language.id);
    });
    formData.append("country_id", data.country_id?.id);
    formData.append("city_id", data.city_id?.id);
    formData.append("state_or_province", data.state_or_province?.id);
    formData.append("same_as_home_address", sameAsHome ? 1 : 0);

    try {
      let res;
      if (type == "update") {
        res = await newFormRequest.post(`${UPDATE_CANDIDATE}/${cid}`, formData);
      } else {
        res = await newFormRequest.post(GET_CANDIDATES, formData);
      }
      if (res.data?.status === 201) {
        toast.success(res?.data?.message);
        queryClient.invalidateQueries(["candidateListing"]);
        reset();
        setLoader(false);
        navigate("/admin/recruiter/candidate");
      } else {
        toast.error("Failed to save candidate.");
        setLoader(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to save candidate.");
      setLoader(false);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option); // Update the button text
    setDropdownOpen(false); // Close the dropdown
  };

  const handleCitySelect = (selectedCity) => {
    if (selectedCity?.state_name) {
      setState(selectedCity.state_name);
      setValue("state_or_province", {
        id: selectedCity.state_id,
        label: selectedCity.state_name,
        value: selectedCity.state_id,
      });
    }
  };

  return (
    <>
      <Addtransfer popupOpen={popupOpen} setPopupOpen={setPopupOpen} />
      {type === "update" && (
        <MenuHeaderCandidate page={1} candidate={candidateDetails?.data} />
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-2 grid grid-cols-2 gap-5 rounded-md bg-white px-6 py-4 pb-12"
      >
        <div className="flex flex-col">
          <div className="flex w-full justify-between">
            <h1 className="pt-3 text-base font-bold">
              {type === "update" ? "Personal information" : "Add Candidate"}
            </h1>
            {type === "update" && (
              <div className="relative flex gap-3">
                {/* Consider Button */}
                <div className="relative">
                  {/* <div
                    className="flex h-10 min-h-10 w-40 cursor-pointer items-center justify-center gap-2 rounded-md border border-[#ecbebe] bg-[#fff2f2] pl-4 text-xs font-semibold text-black"
                    onClick={toggleDropdown}
                  >
                    {selectedOption}
                    <ChevronDown
                      size={20}
                      strokeWidth={1.25}
                      className={`transform transition-transform duration-500 ease-in-out ${
                        isDropdownOpen ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </div> */}

                  {/* Dropdown Menu */}
                  {/* {isDropdownOpen && (
                    <div className="absolute left-0 top-12 z-10 w-40 rounded-md border border-gray-200 bg-white text-sm shadow-lg">
                      <ul className="py-2">
                        <li
                          className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                          onClick={() => handleOptionClick("Option 1")}
                        >
                          Option 1
                        </li>
                        <li
                          className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                          onClick={() => handleOptionClick("Option 2")}
                        >
                          Option 2
                        </li>
                        <li
                          className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                          onClick={() => handleOptionClick("Option 3")}
                        >
                          Option 3
                        </li>
                      </ul>
                    </div>
                  )} */}
                </div>

                {/* Transfer to Job Button */}
                <div
                  onClick={() => setPopupOpen(true)}
                  className="flex h-10 min-h-10 w-40 cursor-pointer items-center justify-center gap-2 rounded-md bg-hrmprimaryorange pl-4 text-xs font-semibold text-white"
                >
                  Transfer to job
                  <Plus size={20} color="#ffffff" strokeWidth={2} />
                </div>
              </div>
            )}
          </div>
          <div className="mt-5 grid w-full grid-cols-2 gap-x-5">
            <div className="group flex flex-col gap-1.5 py-2">
              <label className="required label-text">First Name</label>
              <input
                autoComplete="off"
                type="text"
                disabled={types === "1"}
                placeholder="Enter First Name"
                {...register("first_name", { required: true })}
                className="input-box"
              />
              {errors.first_name && (
                <span className="text-xs font-medium text-red-500">
                  {errors.first_name?.message}
                </span>
              )}
            </div>
            <div className="group flex flex-col gap-1.5 py-2">
              <label className="label-text">Middle Name</label>
              <input
                autoComplete="off"
                type="text"
                disabled={types === "1"}
                placeholder="Enter Middle Name"
                {...register("middle_name")}
                className="input-box"
              />
              {errors.middle_name && (
                <span className="text-xs font-medium text-red-500">
                  {errors.middle_name?.message}
                </span>
              )}
            </div>
            <div className="group flex flex-col gap-1.5 py-2">
              <label className="required label-text">Last name</label>
              <input
                {...register("sur_name")}
                autoComplete="off"
                disabled={types === "1"}
                placeholder="Enter Surname"
                type="text"
                className="input-box"
              />
              {errors.sur_name && (
                <span className="text-xs font-medium text-red-500">
                  {errors.sur_name?.message}
                </span>
              )}
            </div>
            <div className="group flex flex-col gap-1.5 py-2">
              <label className="required label-text">Phone</label>
              <input
                {...register("phone_number", { required: true })}
                autoComplete="off"
                disabled={types === "1"}
                type="text"
                placeholder="Enter Moblie Number"
                onKeyPress={(event) => {
                  if (
                    !/^[0-9]$/.test(event.key) ||
                    event.target.value.length >= 11
                  ) {
                    event.preventDefault();
                  }
                }}
                className="input-box"
              />
              {errors.phone_number && (
                <span className="text-xs font-medium text-red-500">
                  {errors.phone_number?.message}
                </span>
              )}
            </div>

            <div className="group flex flex-col gap-1.5 py-2">
              <label className="required label-text">Email </label>
              <input
                {...register("email", { required: true })}
                autoComplete="off"
                type="text"
                disabled={types === "1"}
                placeholder="Enter Email Address"
                className="input-box"
              />
              {errors.email && (
                <span className="text-xs font-medium text-red-500">
                  {errors.email?.message}
                </span>
              )}
            </div>
            <div className="group flex flex-col space-y-1 py-2">
              <label className="required label-text">Gender</label>
              <Controller
                name="gender"
                className=""
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    isSearchable={true}
                    styles={customSelectStyles}
                    isDisabled={types === "1"}
                    options={recruiterMasters?.genders}
                    placeholder="Select Gender"
                    className="input-box"
                  />
                )}
              />
              {errors.gender && (
                <span className="text-xs font-medium text-red-500">
                  {errors.gender.message}
                </span>
              )}
            </div>

            <div className="group flex flex-col gap-1.5 py-2">
              <label className="required label-text">Date of birth</label>
              <input
                {...register("date_of_birth", { required: true })}
                autoComplete="off"
                disabled={types === "1"}
                type="date"
                className="input-box pr-2"
              />
              {errors.date_of_birth && (
                <span className="text-xs font-medium text-red-500">
                  {errors.date_of_birth?.message}
                </span>
              )}
            </div>

            <div className="group flex flex-col space-y-1 py-2">
              <label className="required label-text">Country</label>
              <Controller
                name="country_id"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    isSearchable={true}
                    isDisabled={types === "1"}
                    styles={customSelectStyles}
                    options={countryList}
                    placeholder="Select Country"
                    className="input-box"
                  />
                )}
              />
              {errors.country_id && (
                <span className="text-xs font-medium text-red-500">
                  {errors.country_id?.message}
                </span>
              )}
            </div>
            <div className="group flex flex-col space-y-1 py-2">
              <label className="required label-text flex flex-row items-center gap-1">
                City or Town
              </label>
              <Controller
                name="city_id"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <AsyncSelect
                    {...field}
                    placeholder="Search ..."
                    loadOptions={loadCitiesOptions}
                    isSearchable={true}
                    isDisabled={types === "1"}
                    onChange={(selectedOption) => {
                      field.onChange(selectedOption); // Update form state
                      handleCitySelect(selectedOption);
                    }}
                    noOptionsMessage={() => "type and search"}
                    className="input-box"
                  />
                )}
              />
              {errors.city_id && (
                <span className="text-xs font-medium text-red-500">
                  {errors.city_id?.message}
                </span>
              )}
            </div>
            <div className="group flex flex-col space-y-1 py-2">
              <label className="label-text">County</label>
              {/* Show the selected state's name if a city is selected */}
              <span className="h-10 rounded-md border border-[#cacaca] p-2 text-sm font-thin">
                {state || ""}
              </span>
              {errors.state_or_province && (
                <span className="text-xs font-medium text-red-500">
                  {errors.state_or_province?.message}
                </span>
              )}
            </div>
            <div className="group flex flex-col gap-1.5 py-2">
              <label className="required label-text">Post Code</label>
              <input
                {...register("post_code", { required: true })}
                autoComplete="off"
                type="text"
                disabled={types === "1"}
                placeholder="Enter Post Code"
                className="input-box"
                onKeyPress={(event) => {
                  if (
                    !/^[a-zA-Z0-9\s]$/.test(event.key) ||
                    event.target.value.replace(/\s/g, "").length >= 7
                  ) {
                    event.preventDefault();
                  }
                }}
              />
              {errors.post_code && (
                <span className="text-xs font-medium text-red-500">
                  {errors.post_code?.message}
                </span>
              )}
            </div>
            <div className="group flex flex-col space-y-1 py-2">
              <label className="required label-text">Languages spoken</label>
              <Controller
                name="language_spoken"
                className=""
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    isSearchable={true}
                    isDisabled={types === "1"}
                    styles={customSelectStyles}
                    options={recruiterMasters?.languages}
                    isMulti
                    placeholder="Select languages"
                    className="input-box h-fit"
                  />
                )}
              />
              {errors.language_spoken && (
                <span className="text-xs font-medium text-red-500">
                  {errors.language_spoken?.message}
                </span>
              )}
            </div>
            <div className="group flex flex-col space-y-1 py-2">
              <label className="required label-text">
                Highest education level
              </label>
              <Controller
                name="highest_education_level"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    isSearchable={true}
                    isDisabled={types === "1"}
                    styles={customSelectStyles}
                    options={recruiterMasters?.educationlevels}
                    placeholder="Select college or University"
                    className="input-box"
                  />
                )}
              />
              {errors?.highest_education_level && (
                <span className="text-xs font-medium text-red-500">
                  {errors.highest_education_level?.message}
                </span>
              )}
            </div>
            <div className="group flex flex-col space-y-1 py-2">
              <label className="required label-text">
                College or University
              </label>
              <Controller
                name="college_or_university"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    isSearchable={true}
                    isDisabled={types === "1"}
                    styles={customSelectStyles}
                    options={recruiterMasters?.collegesUniversities}
                    placeholder="Select college or University"
                    className="input-box"
                  />
                )}
              />
              {errors.college_or_university && (
                <span className="text-xs font-medium text-red-500">
                  {errors.college_or_university?.message}
                </span>
              )}
            </div>
            <div className="group flex flex-col gap-1.5 py-2">
              <label className="required label-text h-5">Home Address</label>
              <textarea
                autoComplete="off"
                type="text"
                disabled={types === "1"}
                {...register("home_address", { required: true })}
                className="input-box min-h-28 py-1"
              />
              {errors.home_address && (
                <span className="text-xs font-medium text-red-500">
                  {errors.home_address?.message}
                </span>
              )}
            </div>
            <div className="group flex flex-col gap-1.5 py-2">
              <label className="label-text flex items-center justify-between">
                <p className="required">Communication Address</p>
                <div className="flex gap-1.5">
                  <input
                    type="checkbox"
                    disabled={types === "1"}
                    checked={sameAsHome}
                    onChange={() => {
                      setSameAsHome(!sameAsHome);
                    }}
                  />
                  <span className="mt-0.5 whitespace-nowrap text-[0.5rem] font-medium text-gray-dim md:text-xs">
                    Same as home
                  </span>
                </div>
              </label>
              <textarea
                disabled={sameAsHome || types === "1"}
                autoComplete="off"
                {...register("communication_address", { required: true })}
                className="input-box min-h-28 py-1"
              />
              {errors.communication_address && (
                <span className="text-xs font-medium text-red-500">
                  {errors.communication_address?.message}
                </span>
              )}
            </div>
            <div className="group flex flex-col space-y-1 py-2">
              <label className="label-text">Source</label>
              <Controller
                name="source"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    isSearchable={true}
                    isDisabled={types === "1"}
                    styles={customSelectStyles}
                    options={sourcesList}
                    placeholder="Select source"
                    className="input-box"
                  />
                )}
              />
              {errors.source && (
                <span className="text-xs font-medium text-red-500">
                  {errors.source?.message}
                </span>
              )}
            </div>
            <div className="group flex flex-col space-y-1 py-2">
              <label className="required label-text">Date Applied</label>
              <input
                {...register("date_applied", { required: true })}
                autoComplete="off"
                disabled={types === "1"}
                type="date"
                className="input-box pr-2"
              />
              {errors.date_applied && (
                <span className="text-xs font-medium text-red-500">
                  {errors.date_applied?.message}
                </span>
              )}
            </div>

            <div className="group flex flex-col space-y-1 py-2">
              <label className="required label-text">Recruiting job</label>
              <Controller
                name="job_id"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    isSearchable={true}
                    isDisabled={types === "1"}
                    styles={customSelectStyles}
                    options={recruiterMasters?.activeJobs}
                    placeholder="Select recruiting job"
                    className="input-box"
                  />
                )}
              />
              {errors.job_id && (
                <span className="text-xs font-medium text-red-500">
                  {errors.job_id?.message}
                </span>
              )}
            </div>
            <div className="group flex flex-col space-y-1 py-2">
              <label className="label-text">LinkedIn ID</label>
              <input
                {...register("linked_in")}
                autoComplete="off"
                disabled={types === "1"}
                type="text"
                className="input-box"
              />
              {errors.linked_in && (
                <span className="text-xs font-medium text-red-500">
                  {errors.linked_in?.message}
                </span>
              )}
            </div>
          </div>
        </div>
        <ResumeDragzone
          file={resumefile}
          setFile={setResumeFile}
          filePreview={filePreview}
          setFilePreview={setFilePreview}
        />
        {type === "save" ? (
          <div className="flex items-center font-semibold">
            <button
              type="submit"
              disabled={loader}
              className="btn flex h-10 min-h-10 items-center gap-2 rounded-md bg-hrmblack px-14 text-xs font-semibold text-white hover:bg-hrmdarkblue"
            >
              {loader ? (
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>{" "}
                  {"Saving"}
                </div>
              ) : (
                <>{"Submit"}</>
              )}
            </button>
          </div>
        ) : types === "2" ? (
          <div className="flex items-center font-semibold">
            <button
              type="submit"
              disabled={loader}
              className="btn flex h-10 min-h-10 items-center gap-2 rounded-md bg-hrmblack px-14 text-xs font-semibold text-white hover:bg-hrmdarkblue"
            >
              {loader ? (
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>{" "}
                  {type == "update" ? "Updating" : "Saving"}
                </div>
              ) : (
                <>{type == "update" ? "Update" : "Submit"}</>
              )}
            </button>
          </div>
        ) : (
          <></>
        )}
      </form>
    </>
  );
}

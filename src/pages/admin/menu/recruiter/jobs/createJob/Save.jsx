import MenuHeader from "@/components/common/MenuHeader";
import CreateJobSideBar from "@/components/sidebars/recruiter/CreateJobSideBar";
import { customSelectStyles } from "@/utils/customStyles";
import Select from "react-select";
import {
  ArrowLeft,
  ChevronRight,
  PenLineIcon,
  UploadCloud,
  X,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import useImageUpload from "@/hooks/useImageUpload";
import AsyncSelect from "react-select/async";
import {
  Disclosure,
  DisclosurePanel,
  DisclosureButton,
} from "@headlessui/react";
import { newFormRequest, newRequest } from "@/api";
import { GENERATE_JOB_CODE, GET_JOBS } from "@/api/recruiter";
import toast from "react-hot-toast";
import {
  COUNTRY,
  COUNTRY_CITY,
  EMPLOYEE_DEPARTMENT,
  EMPLOYEE_DEPARTMENT_LIST,
  EMPLOYEE_DESIGNATION,
  EMPLOYEE_DESIGNATION_LIST,
  EMPLOYEE_TYPE,
  EMPLOYEE_TYPE_LIST,
  JOB_DESCRIPTION,
  JOB_DESCRIPTION_LIST,
  MINIMUM_Experience,
  MINIMUM_EXPERIENCE_LIST,
  SALARY_DEFAULT_MASTERS,
  STATE_COUNTRY,
} from "@/api/master";
import {
  recColumnKeysForJobDescription,
  recColumnKeysForMinimumExperience,
} from "@/lib/columns/recruiter";
import {
  employeeColumnKeysForDepartment,
  employeeColumnKeysForDesignation,
  employeeColumnKeysForEmployeeType,
} from "@/lib/columns/employee";
import SaveRecruiterMasterForm from "@/components/popups/recruiter/settings/common/Save";
import useEmployeeMaster from "@/hooks/useEmployeeMasters";
import { recruiterJobPostSchema } from "@/schema/dashboard/recruiter/job/post.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import EditJobDescriptionRecruiterJobForm from "@/components/popups/recruiter/createjob/EditJobDescription";
import { salaryPackageType } from "@/constants/data";
import { useQueryClient } from "@tanstack/react-query";

const masterConfig = {
  department: {
    api: EMPLOYEE_DEPARTMENT,
    qrkey: "employeeDepartmentList",
    type: "Department",
    colKeys: employeeColumnKeysForDepartment,
  },
  job_description: {
    api: JOB_DESCRIPTION,
    qrkey: "recJobDescriptionList",
    type: "Job Description",
    colKeys: recColumnKeysForJobDescription,
  },
  designation: {
    api: EMPLOYEE_DESIGNATION,
    qrkey: "employeeDesignationList",
    type: "Designation",
    colKeys: employeeColumnKeysForDesignation,
  },
  employment_type: {
    api: EMPLOYEE_TYPE,
    qrkey: "employeeTypeList",
    type: "Employee Type",
    colKeys: employeeColumnKeysForEmployeeType,
  },
  minimum_experience: {
    api: MINIMUM_Experience,
    qrkey: "recMinimumExperienceList",
    type: "Minimum Experience",
    colKeys: recColumnKeysForMinimumExperience,
  },
};

function RecruiterJobPost() {
  const queryClient = useQueryClient();
  const [masterApi, setMasterApi] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [qrkey, setQrkey] = useState(null);
  const [type, setType] = useState(null);
  const [colKeys, setColKeys] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [editDescription, setEditDescription] = useState(false);
  const [workType, setWorkType] = useState(1);
  const [showToCareerPage, setShowToCareerPage] = useState(false);
  const [loader, setLoader] = useState(false);
  const [postStepStatus, setPostStepStatus] = useState({
    jobDetails: false,
    advanceJobDetails: false,
    sensitiveData: false,
    exposure: false,
  });

  // LISTINGS

  // COUNTRY LISTING
  const { data: countryList } = useEmployeeMaster(COUNTRY, "countryList");

  // EMOPLOYEE TYPE LIST
  const { data: employeeTypeList } = useEmployeeMaster(
    EMPLOYEE_TYPE_LIST,
    "employeeTypeList",
  );

  // DESIGNATION LISTING
  const { data: designationListing } = useEmployeeMaster(
    EMPLOYEE_DESIGNATION_LIST,
    "employeeDesignationList",
  );

  // MINIMUM EXPERIENCE LIST
  const { data: minimumExperienceList } = useEmployeeMaster(
    MINIMUM_EXPERIENCE_LIST,
    "recMinimumExperienceList",
  );

  // JOB DESCRIPTION LIST
  const { data: jobDescriptionList } = useEmployeeMaster(
    JOB_DESCRIPTION_LIST,
    "recJobDescriptionList",
  );

  // DEPARTMENT LISTING
  const { data: departmentListing } = useEmployeeMaster(
    EMPLOYEE_DEPARTMENT_LIST,
    "employeeDepartmentList",
  );

  // RECRUITER MASTERS LISTING
  const { data: recruiterMasters } = useEmployeeMaster(
    SALARY_DEFAULT_MASTERS,
    "recruiterMasters",
  );

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(recruiterJobPostSchema),
  });

  console.log(errors);

  const {
    job_code,
    country_id,
    job_title,
    employment_type,
    designation_id,
    department_id,
    city_id,
    state_id,
    job_description_id,
    salary_package,
  } = watch();

  useEffect(() => {
    setPostStepStatus({
      jobDetails: !!country_id && !!job_title && !!employment_type,
      advanceJobDetails:
        !!designation_id && !!department_id && !!city_id && !!state_id,
      sensitiveData: !!job_description_id,
      exposure: !!workType,
    });
  }, [
    country_id,
    job_title,
    employment_type,
    designation_id,
    department_id,
    city_id,
    state_id,
    job_description_id,
  ]);

  const getJobDescriptionDetails = async () => {
    const response = await newRequest.get(
      `${JOB_DESCRIPTION}/${job_description_id?.id}`,
    );
    setJobDescription(response?.data?.job_description);
  };

  useEffect(() => {
    if (job_description_id) {
      getJobDescriptionDetails();
    }
  }, [job_description_id]);

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
      params: { state_id: parseInt(state_id?.id), search: inputValue },
    });
    return response?.data;
  };

  const handleOpenSaveMaster = (toOpen) => {
    const config = masterConfig[toOpen];
    setMasterApi(config.api);
    setQrkey(config.qrkey);
    setType(config.type);
    setColKeys(config.colKeys);
    setPopupOpen(true);
  };

  // GENERATE JOB CODE
  const generateJobCode = async () => {
    try {
      const res = await newRequest.get(GENERATE_JOB_CODE);
      if (res?.status === 200) {
        setValue("job_code", res?.data?.unique_id);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate job code.");
    }
  };

  const {
    image: post,
    imageFile: postFile,
    handleImageChange: handlePostChange,
    clearImage: clearPost,
    setImage: setPost,
  } = useImageUpload();

  const {
    image: guideline,
    imageFile: guidelinefile,
    handleImageChange: handleGuidelineChange,
    clearImage: clearGuideline,
    setImage: setGuideline,
  } = useImageUpload();

  const onSubmit = (data) => {
    setLoader(true);
    handleSaveJob(data);
  };
  console.log(salary_package);
  const handleSaveJob = async (data) => {
    const formData = new FormData();
    formData.append("job_title", data.job_title);
    formData.append("job_code", data.job_code);
    formData.append("min_exp_id", data.min_exp_id?.id);
    formData.append("job_description", jobDescription);
    formData.append("salary_package", data.salary_package?.value);
    formData.append("sensitive_salary_type", data.salary_type?.id);
    formData.append("minimum_range", data.minimum_range);
    formData.append("maximum_range", data?.maximum_range);
    formData.append("salary_package_type", data.salary_package_type?.id);
    formData.append(
      "sensitive_salary_minimum_range",
      data.sensitive_salary_minimum_range,
    );
    formData.append(
      "sensitive_salary_maximum_range",
      data.sensitive_salary_maximum_range,
    );
    formData.append("currency_type", data.currency_type?.id);
    formData.append(
      "search_engine_description",
      data.search_engine_description,
    );
    formData.append(
      "sensitive_data_internal_note",
      data.sensitive_data_internal_note,
    );
    formData.append("job_description_id", data.job_description_id?.id);
    formData.append("postal_code", data.postal_code);
    formData.append("department_id", data.department_id?.id);
    formData.append("work_type", workType);
    formData.append("employment_type", data.employment_type?.id);
    formData.append("designation_id", data.designation_id?.id);
    formData.append("country_id", data.country_id?.id);
    formData.append("city_id", data.city_id?.id);
    formData.append("meta_title", data.meta_title);
    formData.append("state_id", data.state_id?.id);
    formData.append("career_page", showToCareerPage ? 1 : 0);
    postFile && formData.append("image", postFile);
    guidelinefile && formData.append("interview_guideline_file", guidelinefile);

    try {
      let res = await newFormRequest.post(GET_JOBS, formData);
      if (res.data?.status === 201) {
        toast.success(res?.data?.message);
        queryClient.invalidateQueries(["employeeDetails"]);
        queryClient.invalidateQueries(["employeeListing"]);
        clearPost();
        reset();
        setLoader(false);
        navigate("/admin/recruiter/jobs");
      } else {
        toast.error("Failed to save job.");
        setLoader(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to save job.");
      setLoader(false);
    }
  };

  const handleImageError = (event) => {
    event.target.src = "/assets/icons/tort.svg";
  };
  return (
    <>
      <EditJobDescriptionRecruiterJobForm
        popupOpen={editDescription}
        setPopupOpen={setEditDescription}
        jobDescription={jobDescription}
        setJobDescription={setJobDescription}
      />
      <SaveRecruiterMasterForm
        popupOpen={popupOpen}
        setPopupOpen={setPopupOpen}
        selectedField={0}
        setSelectedField={() => {}}
        qrkey={qrkey}
        type={type}
        colKeys={colKeys}
        api={masterApi}
      />
      <MenuHeader
        backlink={""}
        menu={"Menu"}
        subMenu={""}
        currentpath={"Recruiter"}
        activeMenu={"Jobs"}
      />
      <div className="flex flex-row items-start justify-between gap-3">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="mb-3 mt-1 flex items-center justify-between">
            <div className="flex flex-row items-center justify-center gap-2 text-base font-bold text-black">
              <ArrowLeft className="size-4" />
              Create New Job <div className="h-4 w-[.07rem] bg-[#B0B0B0]"></div>
              <span className="text-sm font-medium text-[#2C2C2C]">Post</span>
            </div>
            <button
              type="submit"
              className="btn flex h-10 min-h-10 items-center rounded bg-hrmprimaryorange px-7 text-xs font-semibold text-white hover:bg-[#030E5C]"
            >
              Next
            </button>
          </div>
          <div className="w-full rounded-md bg-white">
            <div className="mb-9 grid grid-cols-1 gap-x-3 py-2">
              <div className="grid grid-cols-3 items-baseline justify-center gap-y-2 rounded-md px-5 py-4">
                <div className="group flex flex-col space-y-1 px-3 py-2">
                  <label className="label-text">
                    Job title <span className="text-red-500">*</span>
                  </label>
                  <input
                    autoComplete="off"
                    type="text"
                    {...register("job_title", { required: true })}
                    className="input-box"
                  />
                  {errors.job_title && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.job_title?.message}
                    </span>
                  )}
                </div>
                <div className="group flex flex-col space-y-1 px-3 py-2">
                  <label className="label-text flex flex-row items-center gap-1">
                    Employment type <span className="text-red-500">*</span>
                    <button
                      type="button"
                      onClick={() => {
                        handleOpenSaveMaster("employment_type");
                      }}
                      className="cursor-pointer font-bold text-blue-700"
                    >
                      (Create)
                    </button>
                  </label>
                  <Controller
                    name="employment_type"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        isSearchable={false}
                        styles={customSelectStyles}
                        options={employeeTypeList}
                        placeholder="Select employee type"
                        className="input-box"
                      />
                    )}
                  />
                  {errors.employment_type && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.employment_type?.message}
                    </span>
                  )}
                </div>
                <div className="group flex flex-col space-y-1 px-3 py-2">
                  <label className="label-text flex flex-row items-center gap-1">
                    Designation <span className="text-red-500">*</span>
                    <button
                      onClick={() => {
                        handleOpenSaveMaster("designation");
                      }}
                      type="button"
                      className="font-bold text-blue-700"
                    >
                      (Create)
                    </button>
                  </label>
                  <Controller
                    name="designation_id"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        isSearchable={false}
                        styles={customSelectStyles}
                        options={designationListing}
                        placeholder="Select Designation"
                        className="input-box"
                      />
                    )}
                  />
                  {errors.designation_id && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.designation_id?.message}
                    </span>
                  )}
                </div>
                <div className="group flex flex-col space-y-1 px-3 py-2">
                  <label className="label-text flex flex-row items-center gap-1">
                    Minimum Experience <span className="text-red-500">*</span>
                    <button
                      onClick={() => {
                        handleOpenSaveMaster("minimum_experience");
                      }}
                      type="button"
                      className="font-bold text-blue-700"
                    >
                      (Create)
                    </button>
                  </label>
                  <Controller
                    name="min_exp_id"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        isSearchable={false}
                        styles={customSelectStyles}
                        options={minimumExperienceList}
                        placeholder="Select minimum experience"
                        className="input-box"
                      />
                    )}
                  />
                  {errors.min_exp_id && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.min_exp_id?.message}
                    </span>
                  )}
                </div>
                <div className="group flex flex-col space-y-1 px-3 py-2">
                  <label className="required label-text flex flex-row items-center gap-1">
                    Department
                    <button
                      onClick={() => {
                        handleOpenSaveMaster("department");
                      }}
                      type="button"
                      className="font-bold text-blue-700"
                    >
                      (Create)
                    </button>
                  </label>
                  <Controller
                    name="department_id"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        isSearchable={false}
                        styles={customSelectStyles}
                        options={departmentListing}
                        placeholder="Select Department"
                        className="input-box"
                      />
                    )}
                  />
                  {errors.department_id && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.department_id?.message}
                    </span>
                  )}
                </div>
                <div className="group flex flex-col gap-1.5 px-3 py-2">
                  <label className="label-text">Post Image </label>
                  {post ? (
                    <div className="relative">
                      <img
                        src={post}
                        alt="Uploaded"
                        className="max-h-24 w-full rounded-md border border-black/20 object-contain"
                      />
                      <X
                        onClick={clearPost}
                        className="absolute -right-2 -top-2 h-5 w-5 cursor-pointer rounded-full bg-hrmdarkblue p-1 text-white"
                      />
                    </div>
                  ) : (
                    <label
                      htmlFor="employee-profile-pic"
                      className="input-box flex h-10 cursor-pointer items-center justify-center rounded-md border border-dashed"
                    >
                      <div className="flex items-center gap-2">
                        <UploadCloud />
                        <span className="font-semibold text-[#2C2C2C]">
                          Upload File
                        </span>
                      </div>
                      <input
                        id="employee-profile-pic"
                        onChange={handlePostChange}
                        type="file"
                        className="hidden"
                      />
                    </label>
                  )}
                  {errors.employeeId && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.employeeId?.message}
                    </span>
                  )}
                </div>
                <div className="group col-span-2 flex w-full flex-col space-y-1 px-3 py-2">
                  <label className="required label-text flex flex-row items-center gap-1">
                    Job description
                    <button
                      onClick={() => {
                        handleOpenSaveMaster("job_description");
                      }}
                      type="button"
                      className="font-bold text-blue-700"
                    >
                      (Create)
                    </button>
                  </label>
                  <div className="flex items-center gap-5">
                    <Controller
                      name="job_description_id"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          isSearchable={false}
                          styles={customSelectStyles}
                          options={jobDescriptionList}
                          placeholder="Select Description"
                          className="input-box"
                        />
                      )}
                    />
                    <button
                      type="button"
                      disabled={!job_description_id}
                      onClick={() => {
                        setEditDescription(true);
                      }}
                      className={`flex h-10 min-h-10 w-fit min-w-64 cursor-pointer flex-row items-center justify-center gap-2 rounded-md px-7 text-center text-sm font-semibold ${job_description_id ? "bg-hrmprimaryorange/80 text-white" : "bg-hrmprimaryorange/10 text-black/55"}`}
                    >
                      <PenLineIcon className="h-4" /> Edit Job Description
                    </button>
                  </div>
                  {errors.job_description_id && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.job_description_id?.message}
                    </span>
                  )}
                </div>
                <div className="group flex flex-col gap-1.5 px-3 py-2">
                  <label className="label-text">Interview Guidelines </label>
                  {guideline ? (
                    <div className="relative">
                      <img
                        src={guideline}
                        alt="Uploaded"
                        onError={handleImageError}
                        className="max-h-24 w-full rounded-md border border-black/20 object-contain"
                      />
                      <X
                        onClick={clearGuideline}
                        className="absolute -right-2 -top-2 h-5 w-5 cursor-pointer rounded-full bg-hrmdarkblue p-1 text-white"
                      />
                    </div>
                  ) : (
                    <label
                      htmlFor="employee-profile-pic"
                      className="input-box flex h-10 cursor-pointer items-center justify-center rounded-md border border-dashed"
                    >
                      <div className="flex items-center gap-2">
                        <UploadCloud />
                        <span className="font-semibold text-[#2C2C2C]">
                          Upload File
                        </span>
                      </div>
                      <input
                        id="employee-profile-pic"
                        onChange={handleGuidelineChange}
                        type="file"
                        className="hidden"
                      />
                    </label>
                  )}
                  {errors.employeeId && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.employeeId?.message}
                    </span>
                  )}
                </div>
                <div className="group flex flex-col space-y-1 px-3 py-2">
                  <label className="required label-text">Country</label>
                  <Controller
                    name="country_id"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        isSearchable={true}
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
                <div className="group flex flex-col space-y-1 px-3 py-2">
                  <label className="required label-text flex flex-row items-center gap-1">
                    County
                  </label>
                  <Controller
                    name="state_id"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <AsyncSelect
                        {...field}
                        placeholder="Search ..."
                        loadOptions={loadStatesOptions}
                        isSearchable={true}
                        noOptionsMessage={() => "type state name"}
                        className="input-box"
                      />
                    )}
                  />
                  {errors.state_id && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.state_id?.message}
                    </span>
                  )}
                </div>
                <div className="group flex flex-col space-y-1 px-3 py-2">
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
                        noOptionsMessage={() => "type city name"}
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
                <div className="group flex flex-col space-y-1 px-3 py-2">
                  <label className="label-text">Postal Code</label>
                  <input
                    {...register("postal_code")}
                    autoComplete="off"
                    onKeyPress={(event) => {
                      if (
                        !/^[0-9]$/.test(event.key) ||
                        event.target.value.length >= 6
                      ) {
                        event.preventDefault();
                      }
                    }}
                    type="text"
                    className="input-box"
                  />
                  {errors.postal_code && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.postal_code?.message}
                    </span>
                  )}
                </div>
                <div className="group col-span-3 flex w-full flex-col space-y-1 px-3 py-2">
                  <label className="label-text">Work type</label>
                  <div className="flex flex-row items-start gap-4">
                    <label className="label flex w-[20%] cursor-pointer flex-row items-center justify-start gap-3 rounded-md border border-gray-300 focus:border-[#C7C7C7]">
                      <input
                        type="radio"
                        name="workOption"
                        onChange={() => {
                          setWorkType(1);
                        }}
                        checked={workType === 1}
                        className="ml-2 h-4 w-4 rounded-sm accent-bgColor-100 checked:accent-bgColor-100"
                      />
                      <span className="label-text">Onsite</span>
                    </label>
                    <label className="label flex w-[20%] cursor-pointer flex-row items-center justify-start gap-3 rounded-md border border-gray-300 focus:border-[#C7C7C7]">
                      <input
                        type="radio"
                        name="workOption"
                        onChange={() => {
                          setWorkType(2);
                        }}
                        checked={workType === 2}
                        className="ml-2 h-4 w-4 rounded-sm accent-bgColor-100 checked:accent-bgColor-100"
                      />
                      <span className="label-text">Remote</span>
                    </label>
                    <label className="label flex w-[20%] cursor-pointer flex-row items-center justify-start gap-3 rounded-md border border-gray-300 focus:border-[#C7C7C7]">
                      <input
                        type="radio"
                        name="workOption"
                        onChange={() => {
                          setWorkType(3);
                        }}
                        checked={workType === 3}
                        className="ml-2 h-4 w-4 rounded-sm accent-bgColor-100 checked:accent-bgColor-100"
                      />
                      <span className="label-text">Hybrid</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2.5 pb-7">
              <Disclosure as="div" className="px-5 py-2" defaultOpen={false}>
                <DisclosureButton className="group flex w-full items-center gap-x-2">
                  <div className="flex size-5 min-w-5 items-center justify-center rounded-full bg-[#F7F7F7]">
                    <ChevronRight className="size-4 group-data-[open]:rotate-90" />
                  </div>
                  <p className="flex flex-row whitespace-nowrap text-sm font-semibold">
                    Advanced job details{" "}
                  </p>
                  <div className="h-px w-full bg-[#ECE9F1]"></div>
                </DisclosureButton>
                <DisclosurePanel className="my-4 text-sm/5 text-black/50">
                  <div className="mt-4 grid w-8/12 grid-cols-2 items-center justify-center gap-y-2">
                    <div className="group flex flex-col space-y-1 px-3 py-2">
                      <label className="label-text">Job code</label>
                      <div className="input-box flex">
                        <input
                          {...register("job_code")}
                          autoComplete="off"
                          disabled
                          className="w-full"
                        />
                        <button
                          type="button"
                          disabled={job_code}
                          onClick={generateJobCode}
                          className="w-fit text-[0.8rem] font-medium text-hrmprimaryorange"
                        >
                          Generate
                        </button>
                      </div>
                      {errors.job_code && (
                        <span className="text-xs font-medium text-red-500">
                          {errors.job_code?.message}
                        </span>
                      )}
                    </div>
                    <div className="group flex flex-col space-y-1 px-3 py-2">
                      <label className="label-text">Salary Package</label>
                      <Controller
                        name="salary_package"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            isSearchable={false}
                            styles={customSelectStyles}
                            options={salaryPackageType}
                            placeholder="Select package"
                            className="input-box"
                          />
                        )}
                      />
                      {errors.salary_package && (
                        <span className="text-xs font-medium text-red-500">
                          {errors.salary_package?.message}
                        </span>
                      )}
                    </div>
                  </div>

                  {salary_package?.value === 1 ? (
                    <div className="group flex flex-col space-y-1 px-3 py-2">
                      <label className="label-text">
                        Salary Range(Internal Only)
                      </label>
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col gap-1">
                          <input
                            autoComplete="off"
                            type="text"
                            {...register("minimum_range")}
                            placeholder="Minimum range"
                            onKeyPress={(event) => {
                              if (!/^[0-9]$/.test(event.key)) {
                                event.preventDefault();
                              }
                            }}
                            className="input-box"
                          />
                          {errors.minimum_range && (
                            <span className="text-xs font-medium text-red-500">
                              {errors.minimum_range?.message}
                            </span>
                          )}
                        </div>
                        <div className="flex flex-col gap-1">
                          <input
                            autoComplete="off"
                            type="text"
                            {...register("maximum_range")}
                            placeholder="Minimum range"
                            onKeyPress={(event) => {
                              if (!/^[0-9]$/.test(event.key)) {
                                event.preventDefault();
                              }
                            }}
                            className="input-box"
                          />
                          {errors.maximum_range && (
                            <span className="text-xs font-medium text-red-500">
                              {errors.maximum_range?.message}
                            </span>
                          )}
                        </div>
                        <div className="flex flex-col gap-1">
                          <Controller
                            name="currency_type"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                              <Select
                                {...field}
                                options={recruiterMasters?.currencies}
                                isSearchable={false}
                                styles={customSelectStyles}
                                placeholder="Currency"
                                className="input-box"
                              />
                            )}
                          />
                          {errors.currency_type && (
                            <span className="text-xs font-medium text-red-500">
                              {errors.currency_type?.message}
                            </span>
                          )}
                        </div>
                        <div className="flex flex-col">
                          <Controller
                            name="salary_package_type"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                              <Select
                                {...field}
                                isSearchable={false}
                                options={recruiterMasters?.paySchedules}
                                styles={customSelectStyles}
                                placeholder="Pay type"
                                className="input-box"
                              />
                            )}
                          />
                          {errors.salary_package_type && (
                            <span className="text-xs font-medium text-red-500">
                              {errors.salary_package_type?.message}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-1 px-3">
                      <textarea
                        autoComplete="off"
                        type="text"
                        {...register("reason")}
                        placeholder="Reason "
                        className="input-box min-h-24 py-1"
                      />
                      {errors.reason && (
                        <span className="text-xs font-medium text-red-500">
                          {errors.reason?.message}
                        </span>
                      )}
                    </div>
                  )}
                </DisclosurePanel>
              </Disclosure>
              <Disclosure as="div" className="px-5 py-2" defaultOpen={false}>
                <DisclosureButton className="group flex w-full items-center gap-x-2">
                  <div className="flex size-5 min-w-5 items-center justify-center rounded-full bg-[#F7F7F7]">
                    <ChevronRight className="size-4 group-data-[open]:rotate-90" />
                  </div>
                  <p className="flex flex-row whitespace-nowrap text-sm font-semibold">
                    Sensitive data
                  </p>
                  <div className="h-[0.5px] w-full bg-[#ECE9F1]"></div>
                </DisclosureButton>
                <DisclosurePanel className="my-4 text-sm/5 text-black/50">
                  <div>
                    <p className="my-8 px-3 text-sm">
                      This section is visible to Admins, Hiring Managers, And
                      User with sensitive data privilege.
                    </p>
                    <div className="mt-4 grid w-full grid-cols-2 items-center justify-center gap-y-2">
                      <div className="group flex flex-col space-y-1 px-3 py-2">
                        <label className="label-text">Salary Type</label>
                        <Controller
                          name="salary_type"
                          control={control}
                          rules={{ required: true }}
                          render={({ field }) => (
                            <Select
                              {...field}
                              isSearchable={false}
                              options={recruiterMasters?.paySchedules}
                              styles={customSelectStyles}
                              placeholder="Select salary type"
                              className="input-box"
                            />
                          )}
                        />
                        {errors.salary_type && (
                          <span className="text-xs font-medium text-red-500">
                            {errors.salary_type?.message}
                          </span>
                        )}
                      </div>
                      <div className="group flex flex-col space-y-1 px-3 py-2">
                        <label className="label-text">
                          Salary Range(Internal Only)
                        </label>
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col gap-1">
                            <input
                              autoComplete="off"
                              type="text"
                              {...register("sensitive_salary_minimum_range")}
                              placeholder="Minimum range"
                              onKeyPress={(event) => {
                                if (!/^[0-9]$/.test(event.key)) {
                                  event.preventDefault();
                                }
                              }}
                              className="input-box"
                            />
                            {errors.sensitive_salary_minimum_range && (
                              <span className="text-xs font-medium text-red-500">
                                {errors.sensitive_salary_minimum_range?.message}
                              </span>
                            )}
                          </div>
                          <div className="flex flex-col gap-1">
                            <input
                              autoComplete="off"
                              type="text"
                              {...register("sensitive_salary_maximum_range")}
                              placeholder="Minimum range"
                              onKeyPress={(event) => {
                                if (!/^[0-9]$/.test(event.key)) {
                                  event.preventDefault();
                                }
                              }}
                              className="input-box"
                            />
                            {errors.sensitive_salary_maximum_range && (
                              <span className="text-xs font-medium text-red-500">
                                {errors.sensitive_salary_maximum_range?.message}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="group flex w-full flex-col space-y-1 px-3 py-2">
                      <label className="label-text">Internal Note</label>
                      <textarea
                        autoComplete="off"
                        {...register("sensitive_data_internal_note")}
                        className="input-box h-20 w-full"
                      />
                      {errors.sensitive_data_internal_note && (
                        <span className="text-xs font-medium text-red-500">
                          {errors.sensitive_data_internal_note?.message}
                        </span>
                      )}
                    </div>
                  </div>
                </DisclosurePanel>
              </Disclosure>
              <Disclosure as="div" className="px-5 py-2" defaultOpen={false}>
                <DisclosureButton className="group flex w-full items-center gap-x-2">
                  <div className="flex size-5 min-w-5 items-center justify-center rounded-full bg-[#F7F7F7]">
                    <ChevronRight className="size-4 group-data-[open]:rotate-90" />
                  </div>
                  <p className="flex flex-row whitespace-nowrap text-sm font-semibold">
                    Exposure
                  </p>
                  <div className="h-px w-full bg-[#ECE9F1]"></div>
                </DisclosureButton>
                <DisclosurePanel className="my-4 text-sm/5 text-black/50">
                  <div>
                    <div className="group flex w-full flex-col space-y-1 py-2">
                      <label className="label-text">Meta Title</label>
                      <input
                        autoComplete="off"
                        type="text"
                        {...register("meta_title")}
                        className="input-box"
                      />
                      {errors.meta_title && (
                        <span className="text-xs font-medium text-red-500">
                          {errors.meta_title?.message}
                        </span>
                      )}
                    </div>
                    <div className="group mb-4 flex w-full flex-col space-y-1 py-2">
                      <label className="label-text">
                        Search Engine Description
                      </label>
                      <input
                        autoComplete="off"
                        type="text"
                        {...register("search_engine_description")}
                        className="input-box h-20"
                      />
                      {errors.search_engine_description && (
                        <span className="text-xs font-medium text-red-500">
                          {errors.search_engine_description?.message}
                        </span>
                      )}
                    </div>
                    <div className="form-control">
                      <h1 className="label-text mb-2">Career page</h1>
                      <label className="label cursor-pointer justify-normal gap-4">
                        <input
                          type="checkbox"
                          onChange={(e) => {
                            setShowToCareerPage(e.target.checked);
                          }}
                          checked={showToCareerPage}
                          className="checkbox size-4 rounded-sm"
                        />
                        <span className="text-gary-200 label-text text-sm">
                          Show these in career page?
                        </span>
                      </label>
                    </div>
                  </div>
                </DisclosurePanel>
              </Disclosure>
            </div>
          </div>
        </form>
        <CreateJobSideBar stepCounter={1} />
      </div>
    </>
  );
}

export default RecruiterJobPost;

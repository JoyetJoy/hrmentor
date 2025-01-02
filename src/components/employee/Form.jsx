import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import { Eye, Plus, RotateCw, Share2, UploadCloud, X } from "lucide-react";
import { customSelectStyles } from "@/utils/customStyles";
import { EmployeeSchema } from "@/schema/dashboard/employee/form/employee.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import SaveEmployeeMasterForm from "../popups/employees/settings/common/Save";
import {
  bloodGroups,
  maritalStatuses,
  pentionStatuses,
} from "@/constants/data";
import {
  COUNTRY,
  COUNTRY_CITY,
  EMPLOYEE_DEPARTMENT,
  EMPLOYEE_DEPARTMENT_LIST,
  EMPLOYEE_DESIGNATION,
  EMPLOYEE_DESIGNATION_LIST,
  EMPLOYEE_ONBOARD_MAIL_SEND,
  EMPLOYEE_TYPE,
  EMPLOYEE_TYPE_LIST,
  EMPLOYEE_WORK_LOCATION,
  EMPLOYEE_WORK_LOCATION_LIST,
  NATIONALITY,
  ROLES_LIST,
  SALARY_DEFAULT_MASTERS,
  STATE_COUNTRY,
} from "@/api/master";
import useImageUpload from "@/hooks/useImageUpload";
import useEmployeeMaster from "@/hooks/useEmployeeMasters";
import {
  EMPLOYEE,
  EMPLOYEE_UNIQUE_ID,
  newFormRequest,
  newRequest,
  SEND_ONBORDING,
  UPDATE_EMPLOYEE,
} from "@/api";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  employeeColumnKeysForDepartment,
  employeeColumnKeysForDesignation,
  employeeColumnKeysForEmployeeType,
  employeeColumnKeysForWorkLocation,
} from "@/lib/columns/employee";
import { Dialog, DialogPanel } from "@headlessui/react";
import { useUserStore } from "@/lib/slices/auth.slice";
import Share from "../popups/employees/view/Share";

const masterConfig = {
  department: {
    api: EMPLOYEE_DEPARTMENT,
    qrkey: "employeeDepartmentList",
    type: "Department",
    colKeys: employeeColumnKeysForDepartment,
  },
  work_location: {
    api: EMPLOYEE_WORK_LOCATION,
    qrkey: "employeeWorkLocationList",
    type: "Work Location",
    colKeys: employeeColumnKeysForWorkLocation,
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
};

export default function SaveEmployeeForm({ formtype }) {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    setError,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    mode: "on",
    reValidateMode: "onChange",
    resolver: yupResolver(EmployeeSchema),
  });

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const uid = searchParams.get("uid");

  const { user } = useUserStore((state) => ({
    user: state.user,
  }));

  // MASTERS LISTING
  const { data: employeeMasters } = useEmployeeMaster(
    SALARY_DEFAULT_MASTERS,
    "employeeMasters",
  );

  const { image, imageFile, handleImageChange, clearImage, setImage } =
    useImageUpload();

  // GET DETAILS IN CASE OF UPDATE
  const { data: employeeDetails, isLoading } = useQuery({
    queryKey: ["employeeDetails", uid, formtype],
    queryFn: () =>
      newRequest.get(`${EMPLOYEE}/${uid}`).then((res) => {
        return res.data;
      }),
    enabled: formtype == "update",
  });

  const navigate = useNavigate();
  const [masterApi, setMasterApi] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [qrkey, setQrkey] = useState(null);
  const [type, setType] = useState(null);
  const [colKeys, setColKeys] = useState(null);
  const [sameAsHome, setSameAsHome] = useState(false);
  const [loader, setLoader] = useState(false);
  const [state, setState] = useState();
  const [sharePopupOpen, setSharePopupOpen] = useState(false);

  const [imageerror, setImageerror] = useState("");

  useEffect(() => {
    if (employeeDetails) {
      setValue("employee_id", employeeDetails.employee_id);
      setValue("first_name", employeeDetails.first_name);
      setValue("middle_name", employeeDetails.middle_name || "");
      setValue("post_code", employeeDetails.post_code);
      setValue("sur_name", employeeDetails.sur_name);
      setValue("gender", employeeDetails.gender);
      setValue("dob", employeeDetails.dob);
      setValue("marital_status", employeeDetails.marital_status);
      setValue("blood_group", employeeDetails.blood_group);
      setValue("nationality_id", employeeDetails.nationality_id);
      setValue("communication_address", employeeDetails.communication_address);
      setValue("home_address", employeeDetails.home_address);
      setValue("email", employeeDetails.email);
      setValue("mobile_number", employeeDetails.mobile_number);
      setValue("employee_type", employeeDetails.employee_type);
      setValue("department", employeeDetails.department);
      setValue("worklocation_id", employeeDetails.worklocation_id);
      setValue("designation_id", employeeDetails.designation_id);
      setValue("date_of_joining", employeeDetails.date_of_joining);
      setValue("role_id", employeeDetails.role_id);
      setValue("work_email", employeeDetails.work_email);
      setValue("personal_email", employeeDetails.personal_email);
      setValue(
        "national_insurance_number",
        employeeDetails.national_insurance_number,
      );
      setValue("country_id", employeeDetails.country_id);
      setValue("state_id", employeeDetails.state_id);
      setValue("city_id", employeeDetails.city_id);
      setValue("department_id", employeeDetails.department_id);
      setValue("employment_type", employeeDetails.employment_type);
      setValue("pension_subscription", employeeDetails.pension_subscription);
      if (employeeDetails?.state_id) {
        setState(employeeDetails?.state_id?.value);
      }
    }
  }, [employeeDetails, setValue]);

  useEffect(() => {
    if (employeeDetails) {
      setImage(employeeDetails?.profile_image);
    }
  }, [employeeDetails, setImage]);

  const handleOpenSaveMaster = (toOpen) => {
    const config = masterConfig[toOpen];
    setMasterApi(config.api);
    setQrkey(config.qrkey);
    setType(config.type);
    setColKeys(config.colKeys);
    setPopupOpen(true);
  };

  useEffect(() => {
    if (employeeDetails) {
      setSameAsHome(employeeDetails?.same_as_home === 1 ? true : false);
    }
  }, [employeeDetails, setSameAsHome]);

  // SAME AS HOME
  useEffect(() => {
    if (sameAsHome === true) {
      setValue("communication_address", home_address);
    } else if (sameAsHome === false) {
      setValue(
        "communication_address",
        employeeDetails?.communication_address ?? "",
      );
    }
  }, [employeeDetails, sameAsHome]);

  // COUNTRY LISTING
  const { data: countryList } = useEmployeeMaster(COUNTRY, "countryList");

  // DESIGNATION LISTING
  const { data: designationListing } = useEmployeeMaster(
    EMPLOYEE_DESIGNATION_LIST,
    "employeeDesignationList",
  );

  // NATIONALITY LISTING
  const { data: nationalityList } = useEmployeeMaster(
    NATIONALITY,
    "nationalityList",
  );

  const { country_id, state_id, home_address, city_id } = watch();

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

  // Function to display state of the selected city
  const handleCitySelect = (selectedCity) => {
    if (selectedCity?.state_name) {
      setState(selectedCity.state_name);
      setValue("state_id", {
        id: selectedCity.state_id,
        label: selectedCity.state_name,
        value: selectedCity.state_id,
      });
    }
  };

  // DEPARTMENT LISTING
  const { data: departmentListing } = useEmployeeMaster(
    EMPLOYEE_DEPARTMENT_LIST,
    "employeeDepartmentList",
  );

  // WORK LOCATION LISTING
  const { data: workLocationListing } = useEmployeeMaster(
    EMPLOYEE_WORK_LOCATION_LIST,
    "employeeWorkLocationList",
  );

  // EMOPLOYEE TYPE LIST
  const { data: employeeTypeList } = useEmployeeMaster(
    EMPLOYEE_TYPE_LIST,
    "employeeTypeList",
  );

  // EMPLOYEE UNIQUE ID
  const { data: uniqueId } = useEmployeeMaster(
    EMPLOYEE_UNIQUE_ID,
    "employeeUniqueId",
  );

  useEffect(() => {
    if (employeeDetails?.unique_id) {
      setValue("unique_id", employeeDetails?.unique_id);
    } else if (uniqueId && formtype === "save") {
      setValue("unique_id", uniqueId?.unique_id);
    } else {
    }
  }, [uniqueId, employeeDetails, setValue]);

  // CHECK IF UNIQUE ID IS AVAILABLE
  const handleUniqueIdChange = async (uniqueId) => {
    try {
      const res = await newRequest(EMPLOYEE_UNIQUE_ID, {
        params: { unique_id: uniqueId },
      });

      if (res?.status === 200) {
        setError("unique_id", {
          type: "manual",
          message: "",
        });
      }
    } catch (error) {
      setError("unique_id", {
        type: "manual",
        message: error?.response?.data?.error,
      });
    }
  };

  // ROLES LIST
  const { data: rolesList } = useEmployeeMaster(ROLES_LIST, "rolesList");

  const onSubmit = (data) => {
    handleEmployee(data);
  };

  const handleEmployee = async (data) => {
    setLoader(true)
    const formData = new FormData();
    formData.append("first_name", data.first_name);
    formData.append("middle_name", data.middle_name);
    formData.append("sur_name", data.sur_name);
    formData.append("gender", data.gender?.id);
    formData.append("post_code", data.post_code);
    formData.append("dob", data.dob);
    formData.append("blood_group", data.blood_group?.value);
    formData.append("marital_status", data.marital_status?.value);
    formData.append("nationality_id", data.nationality_id?.id);
    formData.append("unique_id", uniqueId?.unique_id);
    formData.append("mobile_number", data.mobile_number);
    formData.append("work_email", data.work_email);
    formData.append("personal_email", data.personal_email);
    formData.append(
      "national_insurance_number",
      data.national_insurance_number,
    );
    formData.append("home_address", data.home_address);
    formData.append("communication_address", data.communication_address);
    formData.append("department_id", data.department_id?.id);
    formData.append("worklocation_id", data.worklocation_id?.id);
    formData.append("employment_type", data.employment_type?.id);
    formData.append("designation_id", data.designation_id?.id);
    formData.append("date_of_joining", data.date_of_joining);
    data.role_id.forEach((role) => {
      formData.append("role_id[]", role.id);
      formData.append("roles[]", role.value);
    });
    formData.append("country_id", data.country_id?.id);
    formData.append("city_id", data.city_id?.id);
    formData.append("state_id", data.state_id?.id);
    imageFile
      ? formData.append("profile_image", imageFile)
      : formData.append("profile_image", "");
    formData.append("same_as_home", sameAsHome ? 1 : 0);
    formData.append("pension_subscription", data.pension_subscription?.id);

    try {
      let res;
      if (formtype === "save") {
        res = await newFormRequest.post(EMPLOYEE, formData);
      } else {
        res = await newFormRequest.post(`${UPDATE_EMPLOYEE}/${uid}`, formData);
      }
      if (res.data?.status === 201) {
        toast.success(res?.data?.message);
        queryClient.invalidateQueries(["employeeDetails"]);
        queryClient.invalidateQueries(["employeeListing"]);
        clearImage();
        reset();
        setLoader(false);
        navigate("/admin/employee");
      } else {
        toast.error("Failed to save employee.");
        setLoader(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message[0] || "Failed to save employee.",
      );
      setLoader(false);
    }
  };

  return (
    <>
      <Share
        sharePopupOpen={sharePopupOpen}
        setSharePopupOpen={setSharePopupOpen}
        uid={uid}
      />
      <SaveEmployeeMasterForm
        popupOpen={popupOpen}
        setPopupOpen={setPopupOpen}
        selectedField={0}
        setSelectedField={() => {}}
        qrkey={qrkey}
        type={type}
        colKeys={colKeys}
        api={masterApi}
      />
      {isLoading ? (
        <div className="flex min-h-72 w-full items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-hrmprimaryorange"></div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="my-1 flex w-full flex-row items-center justify-between">
            <h1 className="text-lg font-bold">
              {formtype === "update"
                ? "Primary Information"
                : "Add New Employees"}
            </h1>
            <div className="flex items-center gap-3">
              {formtype === "update" && (
                <button
                  type="button"
                  className="hover:bg-bgColor-300 btn flex h-10 min-h-10 min-w-40 items-center justify-center gap-1 bg-paleblue px-6 text-xs font-bold text-[#2C2C2C] shadow-none"
                  onClick={() => {
                    if (employeeDetails?.status?.value === 1) {
                      setSharePopupOpen(true);
                    } else {
                      reset();
                      navigate(`/onboarding-form?uid=${uid}&employee_id=${employeeDetails?.employee_id}`);
                    }
                  }}
                >
                  {employeeDetails?.status?.value === 1 ? (
                    <Share2 className="size-4" color="black" />
                  ) : (
                    <Eye className="size-4" color="black" />
                  )}
                  Onboarding Form
                </button>
              )}
              <button
                type="submit"
                className="btn flex h-10 min-h-10 min-w-24 items-center bg-hrmprimaryorange text-sm font-medium text-white transition-all duration-500 hover:bg-hrmblue/70"
              >
                {loader ? (
                  <div className="flex items-center gap-3">
                    <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
                    {formtype === "update" ? "Updating" : "Saving"}
                  </div>
                ) : (
                  <>
                    <div className="w-3.5">
                      <img
                        src={"/assets/icons/employees/save.svg"}
                        alt="save icon"
                        className="w-full object-contain"
                      />
                    </div>
                    {formtype === "update" ? "Update" : "Save"}
                  </>
                )}
              </button>
            </div>
          </div>
          <div className="grid w-full gap-x-3 py-2 lg:grid-cols-2">
            <div
              className={`flex w-full flex-col rounded-md border border-gray-light bg-white py-4 ${formtype === "update" ? "px-2" : "px-5"}`}
            >
              <div className="flex items-center justify-between">
                <h1 className="px-3 text-[1.1rem] font-bold">Basic Details</h1>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1">
                    <div className="flex h-11 w-fit items-center justify-between gap-3 font-semibold text-black">
                      <label className="label-text text-sm">Employee ID</label>
                      <input
                        disabled={formtype === "update"}
                        {...register("unique_id", { required: true })}
                        onChange={(e) => {
                          if (e.target.value.length > 0) {
                            handleUniqueIdChange(e.target.value);
                          }
                        }}
                        className="flex h-9 w-24 items-center rounded-md border bg-white px-3 text-sm font-semibold text-black/70"
                      ></input>
                    </div>
                    {formtype === "save" && (
                      <RotateCw
                        onClick={() => {
                          setValue("unique_id", uniqueId?.unique_id);
                          setError("unique_id", {
                            type: "manual",
                            message: "",
                          });
                        }}
                        className="h-5"
                      />
                    )}
                  </div>
                  {errors.unique_id && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.unique_id?.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="mt-4 grid w-full lg:grid-cols-2">
                <div className="group flex flex-col gap-1.5 px-3 py-2">
                  <label className="required label-text">First Name</label>
                  <input
                    autoComplete="off"
                    type="text"
                    placeholder="Enter First Name"
                    {...register("first_name", {
                      required: "First Name is required",
                      pattern: {
                        value: /^[A-Za-z]+$/,
                        message: "Only alphabetic characters are allowed",
                      },
                    })}
                    className="input-box"
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/[^A-Za-z]/g, "");
                    }}
                  />
                  {errors.first_name && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.first_name?.message}
                    </span>
                  )}
                </div>

                <div className="group flex flex-col gap-1.5 px-3 py-2">
                  <label className="label-text">Middle Name</label>
                  <input
                    {...register("middle_name", {
                      pattern: {
                        value: /^[A-Za-z]+$/,
                        message: "Only alphabetic characters are allowed",
                      },
                    })}
                    autoComplete="off"
                    placeholder="Enter Middle Name"
                    type="text"
                    className="input-box"
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/[^A-Za-z]/g, "");
                    }}
                  />
                  {errors.middle_name && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.middle_name?.message}
                    </span>
                  )}
                </div>
                <div className="group flex flex-col gap-1.5 px-3 py-2">
                  <label className="required label-text">Surname</label>
                  <input
                    {...register("sur_name", {
                      required: "Surname is required",
                      pattern: {
                        value: /^[A-Za-z]+$/,
                        message: "Only alphabetic characters are allowed",
                      },
                    })}
                    autoComplete="off"
                    placeholder="Enter Surname"
                    type="text"
                    className="input-box"
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/[^A-Za-z]/g, "");
                    }}
                  />
                  {errors.sur_name && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.sur_name?.message}
                    </span>
                  )}
                </div>
                <div className="group flex flex-col gap-1.5 px-3 py-2">
                  <label className="required label-text">Date of birth</label>
                  <input
                    {...register("dob", { required: true })}
                    autoComplete="off"
                    type="date"
                    max={new Date().toISOString().split("T")[0]}
                    className="input-box pr-2"
                  />
                  {errors.dob && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.dob?.message}
                    </span>
                  )}
                </div>
                <div className="group flex flex-col gap-1.5 px-3 py-2">
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
                        options={employeeMasters?.genders}
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
                <div className="group flex flex-col gap-1.5 px-3 py-2">
                  <label className="required label-text">Nationality</label>
                  <Controller
                    name="nationality_id"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        isSearchable={true}
                        styles={customSelectStyles}
                        options={nationalityList}
                        placeholder="Select Nationality"
                        className="input-box"
                      />
                    )}
                  />
                  {errors.nationality_id && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.nationality_id?.message}
                    </span>
                  )}
                </div>
                <div className="group flex flex-col gap-1.5 px-3 py-2">
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
                <div className="group flex flex-col gap-1.5 px-3 py-2">
                  <label className="required label-text">City</label>
                  <Controller
                    name="city_id"
                    control={control}
                    rules={{ required: "City is required" }} // Custom error message
                    render={({ field }) => (
                      <AsyncSelect
                        {...field}
                        placeholder="Search ..."
                        loadOptions={loadCitiesOptions}
                        isSearchable={true}
                        noOptionsMessage={() => "Type city name"}
                        onChange={(selectedOption) => {
                          field.onChange(selectedOption); // Update form state
                          handleCitySelect(selectedOption);
                        }}
                        value={field.value} // Ensure the value is controlled
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

                <div className="group flex flex-col gap-1.5 px-3 py-2">
                  <label className="label-text">County</label>
                  {/* Show the selected state's name if a city is selected */}
                  <span className="h-10 rounded-md border border-[#cacaca] p-2 text-sm font-thin">
                    {state || ""}
                  </span>
                  {errors.state_id && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.state_id?.message}
                    </span>
                  )}
                </div>
                <div className="group flex flex-col gap-1.5 px-3 py-2">
                  <label className="required label-text">Post Code</label>
                  <input
                    {...register("post_code", {
                      required: true,
                    })}
                    autoComplete="off"
                    type="text"
                    placeholder="Enter Post Code"
                    onKeyPress={(event) => {
                      if (
                        !/^[a-zA-Z0-9\s]$/.test(event.key) ||
                        event.target.value.replace(/\s/g, "").length >= 7
                      ) {
                        event.preventDefault();
                      }
                    }}
                    className="input-box"
                  />

                  {errors.post_code && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.post_code?.message}
                    </span>
                  )}
                </div>
                <div className="group flex flex-col gap-1.5 px-3 py-2">
                  <label className="label-text">Blood Group</label>
                  <Controller
                    name="blood_group"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        isSearchable={true}
                        styles={customSelectStyles}
                        options={bloodGroups}
                        placeholder="Select Blood Group"
                        className="input-box"
                      />
                    )}
                  />
                  {errors.blood_group && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.blood_group?.message}
                    </span>
                  )}
                </div>
                <div className="group flex flex-col gap-1.5 px-3 py-2">
                  <label className="required label-text">
                    National Insurance Number
                  </label>
                  <input
                    {...register("national_insurance_number", {
                      required: true,
                      maxLength: {
                        value: 9,
                        message:
                          "National Insurance must not exceed 9 characters",
                      },
                    })}
                    autoComplete="off"
                    type="text"
                    maxLength={9}
                    placeholder="Enter National Insurance Number"
                    className="input-box"
                  />
                  {errors.national_insurance_number && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.national_insurance_number?.message}
                    </span>
                  )}
                </div>
                <div className="group flex flex-col gap-1.5 px-3 py-2">
                  <label
                    className={`required label-text ${formtype === "update" ? "h-9" : ""}`}
                  >
                    Home Address
                  </label>
                  <textarea
                    autoComplete="off"
                    type="text"
                    {...register("home_address", { required: true })}
                    className="input-box min-h-28 py-1"
                    onInput={(e) => {
                      const value = e.target.value;
                      e.target.value = value.replace(/^\s+/g, ""); // Remove leading spaces from the first line
                    }}
                  />
                  {errors.home_address && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.home_address?.message}
                    </span>
                  )}
                </div>
                <div className="group flex flex-col gap-1.5 px-3 py-2">
                  <label
                    className={`label-text flex flex-row ${formtype === "update" ? "flex-col" : "items-center justify-between"}`}
                  >
                    <p className="required">Communication Address</p>
                    <div className="flex gap-1.5">
                      <input
                        type="checkbox"
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
                    disabled={sameAsHome}
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
                <div className="group flex flex-col gap-1.5 px-3 py-2">
                  <label className="label-text">Upload Image</label>
                  {imageerror && (
                    <span className="text-xs font-medium text-red-500">
                      {imageerror}
                    </span>
                  )}
                  {image ? (
                    <div className="relative">
                      <img
                        src={image}
                        alt="Uploaded"
                        className="max-h-24 w-full rounded-md border border-black/20 object-contain"
                      />
                      <X
                        onClick={clearImage}
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
                        <span className="font-semibold text-textcolor-darkCharcoal">
                          Upload Image
                        </span>
                      </div>
                      <input
                        id="employee-profile-pic"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            const allowedTypes = [
                              "image/jpeg",
                              "image/png",
                              "image/gif",
                            ]; // Allowed MIME types
                            if (!allowedTypes.includes(file.type)) {
                              toast.error(
                                "Invalid file type. Only images (JPEG, PNG, GIF) are allowed.",
                              );
                              e.target.value = ""; // Clear the input
                              return;
                            }
                            handleImageChange(e); // Proceed with the valid file
                          }
                        }}
                        type="file"
                        className="hidden"
                        accept="image/jpeg, image/png, image/gif" // Restrict file types
                      />
                    </label>
                  )}
                </div>
              </div>
            </div>
            <div
              className={`flex w-full flex-col rounded-md border border-gray-300 bg-white py-4 ${formtype === "update" ? "px-2" : "px-5"}`}
            >
              <h1 className="px-3 text-[1.1rem] font-bold">Work Details</h1>
              <div className="mt-4 grid w-full lg:grid-cols-2">
                <div className="group flex flex-col gap-1.5 px-3 py-2">
                  <label className="label-text flex flex-row items-center gap-1">
                    <span className="required">Department</span>
                    <div
                      onClick={() => {
                        handleOpenSaveMaster("department");
                      }}
                      className="flex h-4 w-4 cursor-pointer items-center justify-center rounded-full bg-black text-white"
                    >
                      <Plus className="h-3" />
                    </div>
                  </label>
                  <Controller
                    name="department_id"
                    className=""
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        isSearchable={true}
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
                  <label className="required label-text">Role</label>
                  <Controller
                    name="role_id"
                    className=""
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        isSearchable={true}
                        styles={customSelectStyles}
                        options={rolesList}
                        isMulti
                        placeholder="Select Role"
                        className="input-box h-fit"
                      />
                    )}
                  />
                  {errors.role_id && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.role_id.message}
                    </span>
                  )}
                </div>
                <div className="group flex flex-col gap-1.5 px-3 py-2">
                  <label className="label-text flex flex-row items-center gap-1">
                    <span>Designation</span>
                    <div
                      onClick={() => {
                        handleOpenSaveMaster("designation");
                      }}
                      className="flex h-4 w-4 cursor-pointer items-center justify-center rounded-full bg-black text-white"
                    >
                      <Plus className="h-3" />
                    </div>
                  </label>
                  <Controller
                    name="designation_id"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        isSearchable={true}
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

                <div className="group flex flex-col gap-1.5 px-3 py-2">
                  <label className="required label-text">Date of Joining</label>
                  <input
                    {...register("date_of_joining", { required: true })}
                    autoComplete="off"
                    type="date"
                    className="input-box pr-2"
                  />
                  {errors.date_of_joining && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.date_of_joining?.message}
                    </span>
                  )}
                </div>
                <div className="group flex flex-col gap-1.5 px-3 py-2">
                  <label className="label-text flex flex-row items-center gap-1">
                    <span className="required">Work Location</span>
                    <div
                      onClick={() => {
                        handleOpenSaveMaster("work_location");
                      }}
                      className="flex h-4 w-4 cursor-pointer items-center justify-center rounded-full bg-black text-white"
                    >
                      <Plus className="h-3" />
                    </div>
                  </label>
                  <Controller
                    name="worklocation_id"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        isSearchable={true}
                        styles={customSelectStyles}
                        options={workLocationListing}
                        placeholder="Select Work location"
                        className="input-box"
                      />
                    )}
                  />
                  {errors.worklocation_id && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.worklocation_id?.message}
                    </span>
                  )}
                </div>
                <div className="group flex flex-col gap-1.5 px-3 py-2">
                  <label className="label-text flex flex-row items-center gap-1">
                    <span className="required">Employment Type</span>
                    <div
                      onClick={() => {
                        handleOpenSaveMaster("employment_type");
                      }}
                      className="flex h-4 w-4 cursor-pointer items-center justify-center rounded-full bg-black text-white"
                    >
                      <Plus className="h-3" />
                    </div>
                  </label>
                  <Controller
                    name="employment_type"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        isSearchable={true}
                        styles={customSelectStyles}
                        options={employeeTypeList}
                        placeholder="Select Employement Type"
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
                <div className="group flex flex-col gap-1.5 px-3 py-2">
                  <label className="required label-text">Mobile Number </label>
                  <input
                    {...register("mobile_number", { required: true })}
                    autoComplete="off"
                    type="text"
                    placeholder="Enter Moblie Number"
                    onKeyPress={(event) => {
                      // Allow only digits (0-9) and prevent input if length is already 11
                      if (
                        !/^[0-9]$/.test(event.key) || // Check if the key is a number
                        event.target.value.length >= 11 // Prevent typing if length is 11
                      ) {
                        event.preventDefault();
                      }
                    }}
                    className="input-box"
                  />
                  {errors.mobile_number && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.mobile_number?.message}
                    </span>
                  )}
                </div>
                <div className="group flex flex-col gap-1.5 px-3 py-2">
                  <label className="required label-text">Marital Status</label>
                  <Controller
                    name="marital_status"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        isSearchable={true}
                        styles={customSelectStyles}
                        options={maritalStatuses}
                        placeholder="Select Marital status"
                        className="input-box"
                      />
                    )}
                  />
                  {errors.marital_status && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.marital_status?.message}
                    </span>
                  )}
                </div>
                <div className="group flex flex-col gap-1.5 px-3 py-2">
                  <label className="required label-text">
                    Personal Email Address{" "}
                  </label>
                  <input
                    {...register("personal_email", { required: true })}
                    autoComplete="off"
                    type="text"
                    placeholder="Enter Personal Email Address  "
                    className="input-box"
                  />
                  {errors.personal_email && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.personal_email?.message}
                    </span>
                  )}
                </div>
                <div className="group flex flex-col gap-1.5 px-3 py-2">
                  <label className="label-text">Work Email Address</label>
                  <input
                    {...register("work_email", { required: true })}
                    autoComplete="off"
                    type="text"
                    placeholder="Enter Work Email Address"
                    className="input-box"
                  />
                  {errors.work_email && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.work_email?.message}
                    </span>
                  )}
                </div>
                <div className="group flex flex-col gap-1.5 px-3 py-2">
                  <label className="required label-text">
                    Pension subscription
                  </label>
                  <Controller
                    name="pension_subscription"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        isSearchable={true}
                        styles={customSelectStyles}
                        options={pentionStatuses}
                        placeholder="Select status"
                        className="input-box"
                      />
                    )}
                  />
                  {errors.pension_subscription && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.pension_subscription?.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </>
  );
}

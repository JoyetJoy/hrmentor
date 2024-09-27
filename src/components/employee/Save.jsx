import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import { ChevronRight, Plus, RotateCw, UploadCloud, X } from "lucide-react";
import { customSelectStyles } from "@/utils/customStyles";
import MenuHeader from "@/components/common/MenuHeader";
import { EmployeeSchema } from "@/schema/dashboard/employee/form/employee.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import SaveEmployeeMasterForm from "../popups/employees/settings/common/Save";
import {
  bloodGroups,
  employeeColumnKeysForDepartment,
  employeeColumnKeysForDesignation,
  employeeColumnKeysForEmployeeType,
  employeeColumnKeysForWorkLocation,
  genders,
  maritalStatuses,
} from "@/constants/data";
import {
  COUNTRY,
  COUNTRY_CITY,
  EMPLOYEE_DEPARTMENT,
  EMPLOYEE_DEPARTMENT_LIST,
  EMPLOYEE_DESIGNATION,
  EMPLOYEE_DESIGNATION_LIST,
  EMPLOYEE_TYPE,
  EMPLOYEE_TYPE_LIST,
  EMPLOYEE_WORK_LOCATION,
  EMPLOYEE_WORK_LOCATION_LIST,
  NATIONALITY,
  ROLES_LIST,
} from "@/api/master";
import useImageUpload from "@/hooks/useImageUpload";
import useEmployeeMaster from "@/hooks/useEmployeeMasters";
import {
  EMPLOYEE,
  EMPLOYEE_UNIQUE_ID,
  newFormRequest,
  newRequest,
} from "@/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

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

export default function SaveEmployee() {
  const navigate = useNavigate();
  const [masterApi, setMasterApi] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [qrkey, setQrkey] = useState(null);
  const [type, setType] = useState(null);
  const [colKeys, setColKeys] = useState(null);
  const [openMasterModalType, setOpenMasterModalType] = useState(null);
  const [sameAsHome, setSameAsHome] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(0);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const config = masterConfig[openMasterModalType];
    if (config) {
      setMasterApi(config.api);
      setQrkey(config.qrkey);
      setType(config.type);
      setColKeys(config.colKeys);
      setPopupOpen(true);
    } else {
      setMasterApi(null);
      setQrkey(null);
      setType(null);
      setColKeys(null);
      setPopupOpen(false);
    }
  }, [openMasterModalType]);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    setError,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(EmployeeSchema),
  });

  const { communication_address, home_address } = getValues();

  // SAME AS HOME
  useEffect(() => {
    if (sameAsHome) {
      setValue("communication_address", home_address);
    } else if (communication_address === home_address) {
      setValue("communication_address", "");
    }
  }, [sameAsHome]);

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

  // COUNTRY LISTING
  const { data: countryList } = useEmployeeMaster(COUNTRY, "countryList");

  // GET CITY BY COUNTRY ID AND SEARCH KEY
  const loadCitiesOptions = async (inputValue) => {
    if (inputValue?.length < 3) {
      return [];
    }
    const response = await newRequest.get(COUNTRY_CITY, {
      params: { country_id: parseInt(selectedCountry), search: inputValue },
    });
    return response?.data;
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
    if (uniqueId) {
      setValue("unique_id", uniqueId?.unique_id);
    }
  }, [uniqueId, setValue]);

  // CHECK IF UNIQUE ID IS AVAILABLE
  const handleUniqueIdChange = async (uniqueId) => {
    try {
      const res = await newRequest(EMPLOYEE_UNIQUE_ID, {
        params: { unique_id: parseInt(uniqueId) },
      });
      console.log(res);
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
  const { image, imageFile, handleImageChange, clearImage } = useImageUpload();
  const onSubmit = (data) => {
    setLoader(true);
    handleEmployee(data);
  };

  const handleEmployee = async (data) => {
    const formData = new FormData();
    formData.append("first_name", data.first_name);
    formData.append("sur_name", data.sur_name);
    formData.append("gender", data.gender?.value);
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
    data.role.forEach((role) => {
      formData.append("role_id[]", role.id);
    });
    formData.append("country_id", data.country_id?.id);
    formData.append("city_id", data.city_id?.id);
    if (imageFile) {
      formData.append("profile_image", imageFile);
    }
    try {
      const res = await newFormRequest.post(EMPLOYEE, formData);
      if (res.data?.status === 201) {
        toast.success("Employee saved successfully.");
        navigate("/admin/employees");
        clearImage();
        reset();
        setLoader(false);
      } else {
        toast.error("Failed to save employee.");
        setLoader(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to save employee.");
      setLoader(false);
    }
  };

  return (
    <>
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

      <MenuHeader
        menu={"Menu"}
        subMenu={"Employee"}
        currentpath={"Add Employee"}
        icon={<ChevronRight className="size-3" />}
        activeMenu={"Employees"}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="my-1 flex flex-row items-center justify-between">
          <h1 className="text-lg font-bold">Add New Employees</h1>
          <button
            type="submit"
            className="btn flex h-10 min-h-10 min-w-24 items-center bg-[#030E5C] text-sm font-medium text-white transition-all duration-500 hover:bg-[#030E5C]/70"
          >
            {loader ? (
              <div className="flex items-center gap-3">
                <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
                Saving
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
                Save
              </>
            )}
          </button>
        </div>
        <div className="grid gap-x-3 py-2 lg:grid-cols-2">
          <div className="flex flex-col rounded-md border border-gray-300 bg-white px-5 py-4">
            <div className="flex items-center justify-between">
              <h1 className="px-3 text-[1.1rem] font-bold">Basic Details</h1>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <div className="flex h-11 w-72 items-center justify-between gap-5 rounded-xl bg-hrmdarkblue pl-7 pr-3 text-[0.94rem] text-white">
                    Employee ID{" "}
                    <input
                      {...register("unique_id", { required: true })}
                      onChange={(e) => {
                        if (e.target.value.length > 0) {
                          handleUniqueIdChange(e.target.value);
                        }
                      }}
                      className="flex h-9 w-24 items-center rounded-md bg-white px-4 text-sm font-semibold text-black/70"
                    ></input>
                  </div>
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
                  {...register("first_name", { required: true })}
                  className="input-box"
                />
                {errors.first_name && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.first_name?.message}
                  </span>
                )}
              </div>
              <div className="group flex flex-col gap-1.5 px-3 py-2">
                <label className="required label-text">Surname</label>
                <input
                  {...register("sur_name")}
                  autoComplete="off"
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

              <div className="group flex flex-col gap-1.5 px-3 py-2">
                <label className="required label-text">Date of birth</label>
                <input
                  {...register("dob", { required: true })}
                  autoComplete="off"
                  type="date"
                  className="input-box"
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
                      options={genders}
                      placeholder="Select Gender"
                      className="input-box"
                    />
                  )}
                />
                {errors.gender && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.gender?.message}
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
                      onChange={(event) => {
                        setValue("country_id", event);
                        setSelectedCountry(event?.id);
                      }}
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
              <div className="group flex flex-col gap-1.5 px-3 py-2">
                <label className="required label-text">Blood Group</label>
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
                  {...register("national_insurance", { required: true })}
                  autoComplete="off"
                  type="text"
                  placeholder="Enter National Insurance Number"
                  className="input-box"
                />
                {errors.national_insurance && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.national_insurance?.message}
                  </span>
                )}
              </div>
              <div className="group flex flex-col gap-1.5 px-3 py-2">
                <label className="required label-text">Upload Image </label>
                {image ? (
                  <div className="relative">
                    <img
                      src={image}
                      alt="Uploaded"
                      className="max-h-24 w-full rounded-md"
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
                      <span className="font-semibold text-[#2C2C2C]">
                        Upload Image
                      </span>
                    </div>
                    <input
                      id="employee-profile-pic"
                      onChange={handleImageChange}
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
              <div className="group flex flex-col gap-1.5 px-3 py-2">
                <label className="required label-text">Home Address</label>
                <textarea
                  autoComplete="off"
                  type="text"
                  {...register("home_address", { required: true })}
                  className="input-box min-h-28 py-1"
                />
                {errors.home_address && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.home_address?.message}
                  </span>
                )}
              </div>
              <div className="group flex flex-col gap-1.5 px-3 py-2">
                <label className="label-text flex flex-row items-center justify-between">
                  <p className="required">Communication Address</p>
                  <div className="flex gap-1.5">
                    <input
                      type="checkbox"
                      checked={sameAsHome}
                      onChange={() => {
                        setSameAsHome(!sameAsHome);
                      }}
                    />
                    <p className="whitespace-nowrap text-[0.5rem] font-medium text-[#696969] md:text-xs">
                      Same as home
                    </p>
                  </div>
                </label>
                <textarea
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
            </div>
          </div>
          <div className="flex flex-col rounded-md border border-gray-300 bg-white px-5 py-4">
            <h1 className="px-3 text-[1.1rem] font-bold">Work Details</h1>
            <div className="mt-4 grid w-full lg:grid-cols-2">
              <div className="group flex flex-col gap-1.5 px-3 py-2">
                <label className="label-text flex flex-row items-center gap-1">
                  <span className="required">Department</span>
                  <div
                    onClick={() => {
                      setOpenMasterModalType("department");
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
                  name="role"
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
                      className="input-box"
                    />
                  )}
                />
                {errors.role && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.role?.message}
                  </span>
                )}
              </div>
              <div className="group flex flex-col gap-1.5 px-3 py-2">
                <label className="label-text flex flex-row items-center gap-1">
                  <span className="required">Designation</span>
                  <div
                    onClick={() => {
                      setOpenMasterModalType("designation");
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
                  className="input-box"
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
                      setOpenMasterModalType("work_location");
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
                      setOpenMasterModalType("employment_type");
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
                    if (
                      !/^[0-9]$/.test(event.key) ||
                      event.target.value.length >= 10
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
                <label className="required label-text">
                  Work Email Address
                </label>
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
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import { ChevronRight, Eye, RotateCw, X } from "lucide-react";
import { customSelectStyles } from "@/utils/customStyles";
import { EmployeeSchema } from "@/schema/dashboard/employee/form/employee.schema";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  COUNTRY,
  COUNTRY_CITY,
  ROLES_LIST,
  SALARY_DEFAULT_MASTERS,
} from "@/api/master";
import useImageUpload from "@/hooks/useImageUpload";
import useEmployeeMaster from "@/hooks/useEmployeeMasters";
import { EMPLOYEE, EMPLOYEE_UNIQUE_ID, newRequest } from "@/api";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "@/lib/slices/auth.slice";

export default function BasicDetails({ formtype }) {
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
  const [sameAsHome, setSameAsHome] = useState(false);
  const [state, setState] = useState();
  const [isImageVisible, setIsImageVisible] = useState(false);
  const [imageError, setImageError] = useState(null);
  const { country_id, state_id, home_address, city_id } = watch();

  const toggleImageVisibility = () => {
    setIsImageVisible((prev) => !prev);
  };
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

  console.log(employeeDetails, "employeeDetailsemployeeDetails");
  useEffect(() => {
    if (employeeDetails) {
      console.log(employeeDetails);

      setValue("employee_id", employeeDetails.employee_id);
      setValue("first_name", employeeDetails.first_name);
      setValue("middle_name", employeeDetails.middle_name || "");
      setValue("post_code", employeeDetails.post_code);
      setValue("sur_name", employeeDetails.sur_name);
      setValue("gender", employeeDetails.gender);
      setValue("dob", employeeDetails.dob);
      setValue("blood_group", employeeDetails.blood_group);
      setValue("nationality_id", employeeDetails.nationality_id);
      setValue("communication_address", employeeDetails.communication_address);
      setValue("home_address", employeeDetails.home_address);
      setValue("employee_type", employeeDetails.employee_type);
      setValue(
        "national_insurance_number",
        employeeDetails.national_insurance_number,
      );
      setValue("country_id", employeeDetails.country_id);
      setValue("state_id", employeeDetails.state_id);
      setValue("city_id", employeeDetails.city_id);
      setValue("employment_type", employeeDetails.employment_type);
      if (employeeDetails?.state_id) {
        setState(employeeDetails?.state_id?.value);
      }
    }
  }, [employeeDetails, setValue]);

  console.log(
    employeeDetails?.gender?.value,
    " employeeDetails.employment_type",
  );
  useEffect(() => {
    if (employeeDetails) {
      setImage(employeeDetails?.profile_image);
    }
  }, [employeeDetails, setImage]);

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
        params: { unique_id: parseInt(uniqueId) },
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

  return (
    <Disclosure as="div" className="px-5 py-2" defaultOpen={true}>
      <DisclosureButton className="group flex w-full items-center gap-x-2">
        <div className="flex size-5 min-w-5 items-center justify-center rounded-full bg-gray-darklight">
          <ChevronRight className="size-4 group-data-[open]:rotate-90" />
        </div>
        <p className="flex flex-row whitespace-nowrap text-sm font-semibold">
          Basic Details
        </p>
        <div className="w-full border bg-darkblack"></div>
      </DisclosureButton>
      <DisclosurePanel className="my-4 grid grid-cols-2 text-sm/5 text-black/50">
        <div
          className={`flex w-full flex-col rounded-md bg-white py-4 ${formtype === "update" ? "px-2" : "px-5"}`}
        >
          <div className="flex items-center justify-end">
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
              {/* {errors.unique_id && (
                <span className="text-xs font-medium text-red-500">
                  {errors.unique_id?.message}
                </span>
              )} */}
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
                // onInput={(e) => {
                //   e.target.value = e.target.value.replace(/[^A-Za-z]/g, "");
                // }}
              />
              {/* {errors.first_name && (
                <span className="text-xs font-medium text-red-500">
                  {errors.first_name?.message}
                </span>
              )} */}
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
              {/* {errors.middle_name && (
                <span className="text-xs font-medium text-red-500">
                  {errors.middle_name?.message}
                </span>
              )} */}
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
              {/* {errors.sur_name && (
                <span className="text-xs font-medium text-red-500">
                  {errors.sur_name?.message}
                </span>
              )} */}
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
              {/* {errors.dob && (
                <span className="text-xs font-medium text-red-500">
                  {errors.dob?.message}
                </span>
              )} */}
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
                    // options={employeeMasters?.genders}
                    placeholder="Select Gender"
                    className="input-box"
                  />
                )}
              />
              {/* {errors.gender && (
                <span className="text-xs font-medium text-red-500">
                  {errors.gender.message}
                </span>
              )} */}
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
                    // options={nationalityList}
                    placeholder="Select Nationality"
                    className="input-box"
                  />
                )}
              />
              {/* {errors.nationality_id && (
                <span className="text-xs font-medium text-red-500">
                  {errors.nationality_id?.message}
                </span>
              )} */}
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
                    // options={countryList}
                    placeholder="Select Country"
                    className="input-box"
                  />
                )}
              />
              {/* {errors.country_id && (
                <span className="text-xs font-medium text-red-500">
                  {errors.country_id?.message}
                </span>
              )} */}
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
                    // onChange={(selectedOption) => {
                    //   field.onChange(selectedOption); // Update form state
                    //   handleCitySelect(selectedOption);
                    // }}
                    value={field.value} // Ensure the value is controlled
                    className="input-box"
                  />
                )}
              />
            </div>

            <div className="group flex flex-col gap-1.5 px-3 py-2">
              <label className="label-text">County</label>
              <span className="input-box p-2">{state || ""}</span>
            </div>
            <div className="group flex flex-col gap-1.5 px-3 py-2">
              <label className="required label-text">Post Code</label>
              <input
                {...register("post_code", {
                  required: true,
                  minLength: 5,
                  maxLength: 7,
                })}
                autoComplete="off"
                type="text"
                placeholder="Enter Post Code"
                className="input-box"
              />
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
                    // options={bloodGroups}
                    placeholder="Select Blood Group"
                    className="input-box"
                  />
                )}
              />
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
                    message: "National Insurance must not exceed 9 characters",
                  },
                })}
                autoComplete="off"
                type="text"
                maxLength={9}
                placeholder="Enter National Insurance Number"
                className="input-box"
              />
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
              />
            </div>
            <div className="group flex flex-col gap-1.5 px-3 py-2">
              <label className={`label-text flex flex-col`}>
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
            </div>
            <div className="group flex flex-col gap-1.5 px-3 py-2">
              <label className="required label-text">Profile pic</label>
              {imageError && (
                <span className="text-xs font-medium text-red-500">
                  {imageError}
                </span>
              )}
              {isImageVisible ? (
                <div className="relative">
                  <img
                    src={image}
                    alt="Uploaded"
                    className="max-h-24 w-full rounded-md border border-black/20 object-contain"
                  />
                  <X
                    onClick={toggleImageVisibility}
                    className="absolute -right-2 -top-2 h-5 w-5 cursor-pointer rounded-full bg-hrmdarkblue p-1 text-white"
                  />
                </div>
              ) : (
                <label
                  onClick={toggleImageVisibility}
                  className="input-box flex h-10 cursor-pointer items-center justify-start rounded-md border border-dashed pl-2"
                >
                  <div className="flex items-center justify-start">
                    <Eye className="size-4" />
                    <span className="text-xs font-semibold text-textcolor-darkCharcoal">
                      View image
                    </span>
                  </div>
                </label>
              )}
            </div>
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}

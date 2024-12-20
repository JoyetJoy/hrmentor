import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Select from "react-select";
import { customSelectStyles } from "@/utils/customStyles";
import {
  EMPLOYEE_DEPARTMENT_LIST,
  newRequest,
  ROLES_LIST,
  SALARY_DEFAULT_MASTERS,
} from "@/api/master";
import { useUserStore } from "@/lib/slices/auth.slice";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import { HOLIDAY_AVAILABLE_SETTING, WORK_LOCATIONS } from "@/api";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";

// Validation Schema
const leaveSchema = Yup.object().shape({
  user_id: Yup.string().min(1, "Select at least one department"),
  department_except: Yup.array().min(1, "Select at least one department"),
  locations_availability: Yup.array().min(1, "Select at least one location"),
  locations_except: Yup.array().min(1, "Select at least one location"),
  gender_availability: Yup.array().min(1, "Select at least one gender"),
  gender_except: Yup.array().min(1, "Select at least one gender"),
  role_availability: Yup.array().min(1, "Select at least one role"),
  role_except: Yup.array().min(1, "Select at least one role"),
});

const AvailabilitySettings = ({ formtype = "save" }) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(leaveSchema),
  });

  const close = () => {
    setPopupOpen(false);
    reset();
  };

  const { id } = useParams();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const { user } = useUserStore((state) => ({ user: state.user }));
  const queryClient = useQueryClient();

  const [availabilitySelection, setAvailabilitySelection] = useState({
    department_availability: [],
    department_except: [],
    locations_availability: [],
    locations_except: [],
    gender_availability: [],
    gender_except: [],
    role_availability: [],
    role_except: [],
  });

  const { isLoading: isLocation, data: location } = useQuery({
    queryKey: ["location", user?.id],
    queryFn: () =>
      newRequest
        .get(WORK_LOCATIONS, {
          params: { user_id: user?.id },
        })
        .then((res) => res.data),
    enabled: !!user?.id,
  });

  const { isLoading: isGender, data: gender } = useQuery({
    queryKey: ["gender", user?.id],
    queryFn: () =>
      newRequest
        .get(SALARY_DEFAULT_MASTERS, {
          params: { user_id: user?.id },
        })
        .then((res) => res.data.genders),
    enabled: !!user?.id,
  });

  const { isLoading: isDepartment, data: department } = useQuery({
    queryKey: ["department", user?.id],
    queryFn: () =>
      newRequest
        .get(EMPLOYEE_DEPARTMENT_LIST, {
          params: { user_id: user?.id },
        })
        .then((res) => res.data),
    enabled: !!user?.id,
  });

  const { isLoading: isRoleList, data: role } = useQuery({
    queryKey: ["role", user?.id],
    queryFn: () =>
      newRequest
        .get(ROLES_LIST, {
          params: { user_id: user?.id },
        })
        .then((res) => res.data),
    enabled: !!user?.id,
  });

  const onSubmit = async () => {
    handledSubmit(availabilitySelection);
  };

  const handledSubmit = async (availabilitySelection) => {
    try {
      setLoader(true);
      const formData = {
        holiday_id: id,
        ...availabilitySelection, // Use spread syntax to avoid listing each field
      };
      if (formData.department_availability.length == 0) {
        return toast.error("Select Department Availability");
      }
      if (formData.gender_availability.length == 0) {
        return toast.error("Select Gender Availability");
      }
      if (formData.locations_availability.length == 0) {
        return toast.error("Select Locations Availability");
      }
      if (formData.role_availability.length == 0) {
        return toast.error("Select Role Availability");
      }

      const res = await newRequest.post(HOLIDAY_AVAILABLE_SETTING, formData);

      if (res.data.success === true) {
        navigate(`/admin/leave/settings/advancedsettings/${res.data.data.id}`);
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.error || "An unexpected error occurred";
      toast.error(errorMessage);
    } finally {
      setLoader(false);
    }
  };

  const handleSelectChange = (selectedOptions, field, oppositeField) => {
    // Convert selected options to an array of values
    const selectedValues = selectedOptions.map((option) => option.id);

    // Update the availabilitySelection state for the current field
    setAvailabilitySelection((prev) => ({ ...prev, [field]: selectedValues }));

    // Update the form field value in React Hook Form's control
    control.setValue(field, selectedValues);

    // Filter out selected values from the opposite field to prevent duplication
    const filteredOptions = availabilitySelection[oppositeField].filter(
      (val) => !selectedValues.includes(val),
    );
    setAvailabilitySelection((prev) => ({
      ...prev,
      [oppositeField]: filteredOptions,
    }));

    // Update the opposite field value in React Hook Form's control
    control.setValue(oppositeField, filteredOptions);
  };

  return (
    <div className="min-h-[570px] w-full rounded-md bg-white px-5 py-4">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full p-5">
        <div className="flex w-full flex-row items-center justify-between">
          <h1 className="text-lg font-bold">AvailabilitySettings</h1>
        </div>

        <div className="mt-5 grid gap-x-3 lg:grid-cols-2">
          <div className="mt-4 flex w-full flex-col gap-3">
            {[
              {
                title: "Department",
                fields: ["department_availability", "department_except"],
                options: department || [], // Fallback to empty array
              },
              {
                title: "Office locations",
                fields: ["locations_availability", "locations_except"],
                options: location || [], // Fallback to empty array
              },
              {
                title: "Gender",
                fields: ["gender_availability", "gender_except"],
                options: gender || [], // Fallback to empty array
              },
              {
                title: "Roles",
                fields: ["role_availability", "role_except"],
                options: role || [], // Fallback to empty array
              },
            ].map(({ title, fields, options }) => (
              <div key={title} className="flex flex-col gap-3">
                <div className="text-[0.9rem] font-bold">{title}</div>
                <div className="grid w-full grid-cols-2 gap-3">
                  {fields.map((field, idx) => (
                    <div className="group flex flex-col gap-1.5" key={field}>
                      <label className="required label-text">
                        {idx === 0 ? "Available to" : "Except"}
                      </label>
                      <Controller
                        name={field}
                        control={control}
                        render={({ field: controllerField }) => (
                          <Select
                            {...controllerField}
                            isSearchable
                            styles={customSelectStyles}
                            options={(options || []).filter(
                              (opt) =>
                                !availabilitySelection[
                                  fields[1 - idx]
                                ].includes(opt.id),
                            )}
                            isMulti
                            value={availabilitySelection[field].map((id) =>
                              options.find((opt) => opt.id === id),
                            )}
                            placeholder={`Select ${title}`}
                            className="input-box h-fit"
                            onChange={(selectedOptions) =>
                              handleSelectChange(
                                selectedOptions,
                                field,
                                fields[1 - idx],
                              )
                            }
                          />
                        )}
                      />
                      {errors[field] && (
                        <span className="text-xs font-medium text-red-500">
                          {errors[field].message}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div className="mt-6 flex items-center justify-end gap-4">
              <button
                type="button"
                className="btn flex h-10 min-h-10 min-w-[10rem] items-center border border-gray-400 bg-white text-sm font-medium text-gray-700 hover:bg-gray-100"
                onClick={() => console.log("Cancel clicked")}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn flex h-10 min-h-10 min-w-[10rem] items-center bg-hrmblack text-sm font-medium text-white transition-all duration-500 hover:bg-hrmdarkblue/70"
              >
                {loader ? (
                  <div className="flex items-center gap-3">
                    <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
                    {formtype === "update" ? "Updating" : "Saving"}
                  </div>
                ) : (
                  <>{formtype === "update" ? "Update" : "Save"}</>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AvailabilitySettings;

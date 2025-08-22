import React, { useEffect, useState } from "react";
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
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { HOLIDAY_AVAILABLE_SETTING, WORK_LOCATIONS } from "@/api";
import toast from "react-hot-toast";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";

// Validation Schema
const leaveSchema = Yup.object().shape({
  user_id: Yup.string().min(1, "Select at least one department"),
  locations_availability: Yup.array().min(1, "Select at least one location"),
  gender_availability: Yup.array().min(1, "Select at least one gender"),
  role_availability: Yup.array().min(1, "Select at least one role"),
});

const AvailabilitySettings = ({ formtype = "save" }) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(leaveSchema),
  });

  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const { user } = useUserStore((state) => ({ user: state.user }));
  const queryClient = useQueryClient();

  const getStoredData = () => {
    const storedData = localStorage.getItem("myData");
    return storedData ? JSON.parse(storedData) : null;
  };

  const storedData = getStoredData();
  const { id: routeId } = useParams();
  const [searchParams] = useSearchParams();

  const id = searchParams.get("id") || routeId || storedData?.id || null;

  useEffect(() => {
    const data = { id };
    localStorage.setItem("myData", JSON.stringify(data));
  }, [id]);

  const [availabilitySelection, setAvailabilitySelection] = useState({
    department_availability: [],
    locations_availability: [],
    gender_availability: [],
    role_availability: [],
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

  const { data: availableholidayDetails } = useQuery({
    queryKey: ["availableholidayDetails", user?.id, id],
    queryFn: () =>
      newRequest
        .get(`${HOLIDAY_AVAILABLE_SETTING}/${id}`, {
          params: { user_id: user?.id },
        })
        .then((res) => res.data),
    enabled: !!user?.id && !!id,
  });
  // Auto-select all options when data loads and no saved availability exists
useEffect(() => {
  if (department?.length) {
    setAvailabilitySelection((prev) => ({
      ...prev,
      department_availability: department.map((d) => d.id),
    }));
    setValue("department_availability", department.map((d) => d.id));
  }

  if (location?.length) {
    setAvailabilitySelection((prev) => ({
      ...prev,
      locations_availability: location.map((l) => l.id),
    }));
    setValue("locations_availability", location.map((l) => l.id));
  }

  if (gender?.length) {
    setAvailabilitySelection((prev) => ({
      ...prev,
      gender_availability: gender.map((g) => g.id),
    }));
    setValue("gender_availability", gender.map((g) => g.id));
  }

  if (role?.length) {
    setAvailabilitySelection((prev) => ({
      ...prev,
      role_availability: role.map((r) => r.id),
    }));
    setValue("role_availability", role.map((r) => r.id));
  }
}, [department, location, gender, role, setValue,id]);


  useEffect(() => {
    if (availableholidayDetails) {
      const updatedSelection = Object.keys(availabilitySelection).reduce(
        (acc, key) => {
          acc[key] = availableholidayDetails[key] || [];
          return acc;
        },
        {}
      );

      setAvailabilitySelection(updatedSelection);
    }
  }, [availableholidayDetails, reset]);

  const onSubmit = async () => {
    handledSubmit(availabilitySelection);
  };

  const handledSubmit = async (availabilitySelection) => {
    try {
      setLoader(true);
      const formData = {
        holiday_id: id,
        ...availabilitySelection,
      };
      if (formData.department_availability.length === 0) {
        return toast.error("Select Department Availability");
      }
      if (formData.gender_availability.length === 0) {
        return toast.error("Select Gender Availability");
      }
      if (formData.locations_availability.length === 0) {
        return toast.error("Select Locations Availability");
      }
      if (formData.role_availability.length === 0) {
        return toast.error("Select Role Availability");
      }

      const res = await newRequest.post(HOLIDAY_AVAILABLE_SETTING, formData);

      if (res.data.success === true) {
        toast.success("Leave created successfully");
        navigate(`/admin/leave/settings`);
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.error || "An unexpected error occurred";
      toast.error(errorMessage);
    } finally {
      setLoader(false);
    }
  };

  const handleSelectChange = (selectedOptions, field) => {
    const selectedValues = selectedOptions.map((option) => option.id);

    setAvailabilitySelection((prev) => ({ ...prev, [field]: selectedValues }));
    setValue(field, selectedValues);
  };

  return (
    <div className="min-h-[570px] w-full rounded-md bg-white px-5 py-4">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full p-5">
        <div className="flex w-full flex-row items-center justify-between">
          <h1 className="text-lg font-bold">Availability Settings</h1>
        </div>

        <div className="mt-5 grid gap-x-3 lg:grid-cols-2">
          <div className="mt-4 flex w-full flex-col gap-3">
            {[
              {
                title: "Department",
                field: "department_availability",
                options: department || [],
              },
              {
                title: "Office locations",
                field: "locations_availability",
                options: location || [],
              },
              {
                title: "Gender",
                field: "gender_availability",
                options: gender || [],
              },
              {
                title: "Roles",
                field: "role_availability",
                options: role || [],
              },
            ].map(({ title, field, options }) => (
              <div key={title} className="flex flex-col gap-3">
                <div className="text-[0.9rem] font-bold">{title}</div>
                <div className="group flex flex-col gap-1.5">
                  <label className="label-text required">Available to</label>
                  <Controller
                    name={field}
                    control={control}
                    render={({ field: controllerField }) => (
                      <Select
                        {...controllerField}
                        isSearchable
                        styles={customSelectStyles}
                        options={options || []}
                        isMulti
                        value={availabilitySelection[field].map((id) =>
                          options.find((opt) => opt.id === id)
                        )}
                        placeholder={`Select ${title}`}
                        className="input-box h-fit"
                        onChange={(selectedOptions) =>
                          handleSelectChange(selectedOptions, field)
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
              </div>
            ))}
            <div className="mt-6 flex items-center justify-end gap-4">
              <button
                type="button"
                className="btn flex h-10 min-h-10 min-w-[10rem] items-center border border-gray-400 bg-white text-sm font-medium text-gray-700 hover:bg-gray-100"
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

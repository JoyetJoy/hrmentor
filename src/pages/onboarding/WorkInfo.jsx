import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { yupResolver } from "@hookform/resolvers/yup";
import { EMPLOYEE } from "@/api";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronRight, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { customSelectStyles } from "@/utils/customStyles";
import { EmployeeSchema } from "@/schema/dashboard/employee/form/employee.schema";

export default function WorkInfo({ formtype }) {
  const [state, setState] = useState();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    setError,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(EmployeeSchema),
  });

  console.log(errors, "errorserrors");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const uid = searchParams.get("uid");

  const { data: employeeDetails, isLoading } = useQuery({
    queryKey: ["employeeDetails", uid, formtype],
    queryFn: () =>
      newRequest.get(`${EMPLOYEE}/${uid}`).then((res) => {
        return res.data;
      }),
    enabled: formtype == "update",
  });
  useEffect(() => {
    if (employeeDetails) {
      console.log(employeeDetails);

      setValue("department_id", employeeDetails.department_id);
      setValue("role_id", employeeDetails.role_id);
      setValue("designation_id", employeeDetails.designation_id);
      setValue("date_of_joining", employeeDetails.date_of_joining);
      setValue("worklocation_id", employeeDetails.worklocation_id);
      setValue("date_of_joining", employeeDetails.date_of_joining);
      setValue("employment_type", employeeDetails.employment_type);
      setValue("mobile_number", employeeDetails.mobile_number);
      setValue("marital_status", employeeDetails.marital_status);
      setValue("personal_email", employeeDetails.personal_email);
      setValue("work_email", employeeDetails.work_email);
      setValue("probation_period", employeeDetails?.probation_period);
      setValue("pension_subscription", employeeDetails.pension_subscription);
      if (employeeDetails?.state_id) {
        setState(employeeDetails?.state_id?.value);
      }
    }
  }, [employeeDetails, setValue]);

  return (
    <Disclosure as="div" className="px-5 py-2" defaultOpen={false}>
      <DisclosureButton className="group flex w-full items-center gap-x-2">
        <div className="flex size-5 min-w-5 items-center justify-center rounded-full bg-gray-darklight">
          <ChevronRight className="size-4 group-data-[open]:rotate-90" />
        </div>
        <p className="flex flex-row whitespace-nowrap text-sm font-semibold">
          Work Details
        </p>
        <div className="w-full border"></div>
      </DisclosureButton>
      <DisclosurePanel className="my-4 grid grid-cols-2 text-sm/5 text-black/50">
        <div
          className={`flex w-full flex-col bg-white py-4 ${formtype === "update" ? "px-2" : "px-5"}`}
        >
          <div className="mt-4 grid w-full lg:grid-cols-2">
            <div className="group flex flex-col gap-1.5 px-3 py-2">
              <label className="label-text flex flex-row items-center gap-1">
                <span className="required">Department</span>
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
                    placeholder="Select Department"
                    className="input-box"
                  />
                )}
              />
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
                    isMulti
                    placeholder="Select Role"
                    className="input-box h-fit"
                  />
                )}
              />
            </div>
            <div className="group flex flex-col gap-1.5 px-3 py-2">
              <label className="label-text flex flex-row items-center gap-1">
                <span>Designation</span>
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
                    placeholder="Select Designation"
                    className="input-box"
                  />
                )}
              />
            </div>
            <div className="group flex flex-col gap-1.5 px-3 py-2">
              <label className="required label-text">Date of Joining</label>
              <input
                {...register("date_of_joining", { required: true })}
                autoComplete="off"
                type="date"
                className="input-box pr-2"
              />
            </div>
            <div className="group flex flex-col gap-1.5 px-3 py-2">
              <label className="label-text flex flex-row items-center gap-1">
                <span className="required">Work Location</span>
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
                    placeholder="Select Work location"
                    className="input-box"
                  />
                )}
              />
            </div>
            <div className="group flex flex-col gap-1.5 px-3 py-2">
              <label className="label-text flex flex-row items-center gap-1">
                <span className="required">Employment Type</span>
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
                    placeholder="Select Employement Type"
                    className="input-box"
                  />
                )}
              />
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
                    event.target.value.length >= 11
                  ) {
                    event.preventDefault();
                  }
                }}
                className="input-box"
              />
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
                    placeholder="Select Marital status"
                    className="input-box"
                  />
                )}
              />
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
                    placeholder="Select status"
                    className="input-box"
                  />
                )}
              />
            </div>
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}

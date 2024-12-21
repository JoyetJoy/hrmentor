import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { yupResolver } from "@hookform/resolvers/yup";
import { EMPLOYEE_WORK_INFO, newRequest } from "@/api";
import { useLocation } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";
import { WorkInfoEmployeeSchema } from "@/schema/dashboard/employee/form/workinfo.schema";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { customSelectStyles } from "@/utils/customStyles";

export default function WorkInfo({ formtype }) {
  const [reportNotRequired, setReportNotRequired] = useState(false);
  // const [loader, setLoader] = useState(false);
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
    resolver: yupResolver(WorkInfoEmployeeSchema),
  });

  console.log(errors, "errorserrors");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const uid = searchParams.get("uid");

  const { data: empWorkInfoDetail, refetch } = useQuery({
    queryKey: ["empWorkInfoDetail", uid, formtype],
    queryFn: () =>
      newRequest.get(`${EMPLOYEE_WORK_INFO}/${uid}`).then((res) => {
        return res.data;
      }),

    enabled: !!uid,
  });
  useEffect(() => {
    if (empWorkInfoDetail) {
      console.log(empWorkInfoDetail);

      setValue("hiring_manager_id", empWorkInfoDetail?.hiringManager);
      setValue("reporting_manager_id", empWorkInfoDetail?.reportingManager);
      setValue("ethinicity_id", empWorkInfoDetail?.ethnicity);
      setValue("eeo_job_category_id", empWorkInfoDetail?.eeoJobCategory);
      setValue("notice_period", empWorkInfoDetail?.notice_period);
      setValue("probation_period", empWorkInfoDetail?.probation_period);
      setValue("relegion_belief_id", empWorkInfoDetail?.relegion_belief_id);
      setValue("sexual_orientation_id", empWorkInfoDetail?.sexual_orientation);
      setValue("gender", empWorkInfoDetail?.gender);
      setValue("marital_status", empWorkInfoDetail?.marital_status);
      setValue("disability", empWorkInfoDetail?.disability);
      setValue(
        "pregnancy_and_maternity",
        empWorkInfoDetail?.pregnancy_and_maternity,
      );
      setValue("probation_period", empWorkInfoDetail?.probation_period);
      setValue("age", empWorkInfoDetail?.age);
    }
  }, [empWorkInfoDetail, setValue]);

  useEffect(() => {
    if (uid) {
      refetch().then((response) => {
        console.log("Data refetched", response);
      });
    }
  }, [uid, refetch]);

  useEffect(() => {
    if (empWorkInfoDetail) {
      setReportNotRequired(
        empWorkInfoDetail?.dosent_reporting === 1 ? true : false,
      );
    }
  }, [empWorkInfoDetail, setReportNotRequired]);

  return (
    <Disclosure as="div" className="px-5 py-2" defaultOpen={false}>
      <DisclosureButton className="group flex w-full items-center gap-x-2">
        <div className="flex size-5 min-w-5 items-center justify-center rounded-full bg-gray-darklight">
          <ChevronRight className="size-4 group-data-[open]:rotate-90" />
        </div>
        <p className="flex flex-row whitespace-nowrap text-sm font-semibold">
          Work Information
        </p>
        <div className="w-full border"></div>
      </DisclosureButton>
      <DisclosurePanel className="my-4 grid grid-cols-2 text-sm/5 text-black/50">
        <div
          className={`flex w-full flex-col bg-white py-4 ${formtype === "update" ? "px-2" : "px-5"}`}
        >
          <div className="flex flex-col">
            <div className="mt-4 grid w-full grid-cols-2 gap-x-2">
              <div className="group flex flex-col gap-1.5 px-3 py-2">
                <label className="label-text">Age</label>
                <input
                  autoComplete="off"
                  type="number"
                  name="age"
                  placeholder="Enter"
                  {...register("age", { required: true })}
                  className="input-box placeholder:text-[0.8rem]"
                  value={watch("age")}
                />
              </div>
              <div className="group flex flex-col gap-1.5 px-3 py-2">
                <label className="label-text">EEO Job Category</label>
                <Controller
                  name="eeo_job_category_id"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      isSearchable={true}
                      styles={customSelectStyles}
                      // options={eeoJobCategoryList}
                      placeholder="Select"
                      className="input-box"
                    />
                  )}
                />
              </div>
              <div className="group flex flex-col gap-1.5 px-3 py-2">
                <label className="label-text">Ethinicity</label>
                <Controller
                  name="ethinicity_id"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      isSearchable={true}
                      styles={customSelectStyles}
                      // options={ethinicityList}
                      placeholder="Select"
                      className="input-box"
                    />
                  )}
                />
              </div>
              <div className="group flex flex-col gap-1.5 px-3 py-2">
                <label className="label-text">Religious belief</label>
                <Controller
                  name="relegion_belief_id"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      isSearchable={true}
                      styles={customSelectStyles}
                      // options={religiousSexualList?.religious}
                      placeholder="Select"
                      className="input-box"
                    />
                  )}
                />
              </div>
              <div className="group flex flex-col gap-1.5 px-3 py-2">
                <label className="label-text">Gender</label>
                <Controller
                  name="gender"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      isSearchable={true}
                      styles={customSelectStyles}
                      // options={genders}
                      placeholder="Select"
                      className="input-box"
                    />
                  )}
                />
              </div>
              <div className="group flex flex-col gap-1.5 px-3 py-2">
                <label className="label-text">Sexual orientation</label>
                <Controller
                  name="sexual_orientation_id"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      isSearchable={true}
                      styles={customSelectStyles}
                      placeholder="Select"
                      className="input-box"
                    />
                  )}
                />
              </div>
              <div className="group flex flex-col gap-1.5 px-3 py-2">
                <label className="label-text">Marital status</label>
                <Controller
                  name="marital_status"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      isSearchable={true}
                      styles={customSelectStyles}
                      placeholder="Select"
                      className="input-box"
                    />
                  )}
                />
              </div>
              <div className="group flex flex-col gap-1.5 px-3 py-2">
                <label className="label-text">Pregnancy & maternity</label>
                <Controller
                  name="pregnancy_and_maternity"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      isSearchable={true}
                      styles={customSelectStyles}
                      placeholder="Select"
                      className="input-box"
                    />
                  )}
                />
              </div>
              <div className="group flex flex-col gap-1.5 px-3 py-2">
                <label className="label-text">
                  Physical / Mental disability{" "}
                </label>
                <Controller
                  name="disability"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      isSearchable={true}
                      styles={customSelectStyles}
                      placeholder="Select"
                      className="input-box"
                    />
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}

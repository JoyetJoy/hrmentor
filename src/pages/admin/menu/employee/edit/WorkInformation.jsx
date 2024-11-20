import React, { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { customSelectStyles } from "@/utils/customStyles";
import EmployeesSidebar from "@/components/sidebars/employee/EmployeesSidebar";
import MenuHeader from "@/components/common/MenuHeader";
import { yupResolver } from "@hookform/resolvers/yup";
import useEmployeeMaster from "@/hooks/useEmployeeMasters";
import { genders, maritalStatuses, successStatus } from "@/constants/data";
import {
  ACTIVE_EMPLOYEE,
  EMPLOYEE_WORK_INFO,
  newFormRequest,
  newRequest,
} from "@/api";
import { useLocation } from "react-router-dom";
import {
  EMPLOYEE_EEO_CATEGORY_LIST,
  EMPLOYEE_ETHNICITY_LIST,
} from "@/api/master";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { WorkInfoSchema } from "@/schema/dashboard/employee/form/workinfo.schema";

export const WorkInformation = () => {
  const [reportNotRequired, setReportNotRequired] = useState(false);
  const [loader, setLoader] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(WorkInfoSchema(reportNotRequired)),
  });

  const queryClient = useQueryClient();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const uid = searchParams.get("uid");

  // GET DETAILS IN CASE OF UPDATE
  const { data: empWorkInfoDetail, isLoading } = useQuery({
    queryKey: ["empWorkInfoDetail", uid],
    queryFn: () =>
      newRequest.get(`${EMPLOYEE_WORK_INFO}/${uid}`).then((res) => {
        return res.data;
      }),
    enabled: !!uid,
  });

  useEffect(() => {
    if (empWorkInfoDetail) {
      setValue("hiring_manager_id", empWorkInfoDetail?.hiringManager);
      setValue("reporting_manager_id", empWorkInfoDetail?.reportingManager);
      setValue("ethinicity_id", empWorkInfoDetail?.ethnicity);
      setValue("eeo_job_category_id", empWorkInfoDetail?.eeoJobCategory);
      setValue("notice_period", empWorkInfoDetail?.notice_period);
      setValue("probation_period", empWorkInfoDetail?.probation_period);
    }
  }, [empWorkInfoDetail, setValue]);

  useEffect(() => {
    if (empWorkInfoDetail) {
      setReportNotRequired(
        empWorkInfoDetail?.dosent_reporting === 1 ? true : false,
      );
    }
  }, [empWorkInfoDetail, setReportNotRequired]);

  const onSubmit = (data) => {
    setLoader(true);
    handleSave(data);
  };

  const handleSave = async (data) => {
    const formData = new FormData();
    formData.append("user_id", uid);
    formData.append("hiring_manager_id", data.hiring_manager_id?.id ?? 0);
    formData.append("reporting_manager_id", data.reporting_manager_id?.id ?? 0);
    formData.append("ethinicity_id", data.ethinicity_id?.id);
    formData.append("eeo_job_category_id", data.eeo_job_category_id?.id);
    formData.append("age", data.age);
    formData.append("religious", data.religious);
    formData.append("dosent_reporting", reportNotRequired ? 1 : 0);
    try {
      const res = await newFormRequest.post(EMPLOYEE_WORK_INFO, formData);
      if (res?.data?.status === 201) {
        toast.success(res?.data?.message);
        queryClient.invalidateQueries(["empWorkInfoDetail"]);
        setLoader(false);
      } else {
        toast.error("Failed to update work information");
        setLoader(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update");
      setLoader(false);
    }
  };

  // EMOPLOYEE LIST
  const { data: activeEmployeeList } = useEmployeeMaster(
    ACTIVE_EMPLOYEE,
    "activeEmployeeList",
  );

  // Active ethinicity list
  const { data: ethinicityList } = useEmployeeMaster(
    EMPLOYEE_ETHNICITY_LIST,
    "ethnicityList",
  );
  // EEO job category list
  const { data: eeoJobCategoryList } = useEmployeeMaster(
    EMPLOYEE_EEO_CATEGORY_LIST,
    "eeoJobCategoryList",
  );

  return (
    <div className="flex flex-col">
      <MenuHeader
        menu={"Menu"}
        subMenu={"Employee"}
        currentpath={"Employee Edit"}
        icon={<ChevronRight className="size-3" />}
        activeMenu={"Employee"}
      />
      <div className="flex gap-x-3">
        <EmployeesSidebar />
        {isLoading ? (
          <div className="flex min-h-72 w-full items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-hrmprimaryorange"></div>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className="my-1 flex w-full flex-row items-center justify-between">
              <h1 className="text-lg font-bold">Work Information</h1>
              <button
                type="submit"
                className="btn flex h-10 min-h-10 min-w-24 items-center bg-hrmprimaryorange text-sm font-medium text-white transition-all duration-500 hover:bg-hrmblue/70"
              >
                {loader ? (
                  <div className="flex items-center gap-3">
                    <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
                    Saving
                  </div>
                ) : (
                  <span>Update</span>
                )}
              </button>
            </div>
            <div className="grid grid-cols-2 gap-x-3 pt-2">
              <div className="flex h-screen flex-col items-baseline rounded-md border border-gray-300 bg-white px-3 py-4">
                <h1 className="flex w-full flex-row items-center justify-between px-3 text-lg font-bold text-textcolor-darkCharcoal">
                  Reporting to
                  <div className="flex items-center gap-1.5">
                    <input
                      checked={reportNotRequired}
                      onChange={(e) => {
                        setReportNotRequired(e.target.checked);
                      }}
                      type="checkbox"
                      className="size-4"
                    />
                    <p className="text-lightMedium mt-[1px] whitespace-nowrap text-[13px] font-normal">
                      Doesn't report to anyone
                    </p>
                  </div>
                </h1>
                {!reportNotRequired ? (
                  <div className="mt-4 grid w-full grid-cols-2 items-start gap-y-2">
                    <div className="group flex flex-col gap-1.5 px-3 py-2">
                      <label className="label-text">Reporting Manager</label>
                      <Controller
                        name="reporting_manager_id"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            isSearchable={true}
                            styles={customSelectStyles}
                            options={activeEmployeeList}
                            placeholder="Select reporting manager"
                            className="input-box"
                          />
                        )}
                      />
                      {errors.reporting_manager_id && (
                        <span className="text-xs font-medium text-red-500">
                          {errors.reporting_manager_id?.message}
                        </span>
                      )}
                    </div>
                    <div className="group flex flex-col gap-1.5 px-3 py-2">
                      <label className="label-text">Hr Manager</label>
                      <Controller
                        name="hiring_manager_id"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            isSearchable={true}
                            styles={customSelectStyles}
                            options={activeEmployeeList}
                            placeholder="Select hiring manager"
                            className="input-box"
                          />
                        )}
                      />
                      {errors.hiring_manager_id && (
                        <span className="text-xs font-medium text-red-500">
                          {errors.hiring_manager_id?.message}
                        </span>
                      )}
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="flex flex-col rounded-md border border-gray-soft bg-white px-5 py-4">
                <h1 className="#2C2C2C px-3 text-lg font-bold">EEO Details</h1>
                <div className="mt-4 grid w-full grid-cols-2 gap-x-2">
                  <div className="group flex flex-col gap-1.5 px-3 py-2">
                    <label className="label-text">Age</label>
                    <input
                      autoComplete="off"
                      type="number"
                      placeholder="Enter Probation Period"
                      {...register("age", { required: true })}
                      onKeyPress={(event) => {
                        if (
                          !/^[0-9]$/.test(event.key) ||
                          event.target.value.length >= 3
                        ) {
                          event.preventDefault();
                        }
                      }}
                      className="input-box placeholder:text-[0.8rem]"
                    />
                    {errors.age && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.age?.message}
                      </span>
                    )}
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
                          options={eeoJobCategoryList}
                          placeholder="Select EEO Job Category"
                          className="input-box"
                        />
                      )}
                    />
                    {errors.eeo_job_category_id && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.eeo_job_category_id?.message}
                      </span>
                    )}
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
                          options={ethinicityList}
                          placeholder="Select ethinicity"
                          className="input-box"
                        />
                      )}
                    />
                    {errors.ethinicity_id && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.ethinicity_id?.message}
                      </span>
                    )}
                  </div>
                  <div className="group flex flex-col gap-1.5 px-3 py-2">
                    <label className="label-text">Religious belief</label>
                    <input
                      autoComplete="off"
                      type="text"
                      placeholder="Enter Details"
                      {...register("religious", { required: true })}
                      className="input-box placeholder:text-[0.8rem]"
                    />
                    {errors.religious && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.religious?.message}
                      </span>
                    )}
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
                          options={genders}
                          placeholder="Select a gender"
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
                    <label className="label-text">Sexual orientation</label>
                    <input
                      autoComplete="off"
                      type="text"
                      {...register("sexualorientation", { required: true })}
                      className="input-box placeholder:text-[0.8rem]"
                    />
                    {errors.sexualorientation && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.sexualorientation?.message}
                      </span>
                    )}
                  </div>
                  <div className="group flex flex-col gap-1.5 px-3 py-2">
                    <label className="label-text">Marital status</label>
                    <Controller
                      name="maritalstatus"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          isSearchable={true}
                          styles={customSelectStyles}
                          options={maritalStatuses}
                          placeholder="Select a status"
                          className="input-box"
                        />
                      )}
                    />
                    {errors.maritalstatus && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.maritalstatus?.message}
                      </span>
                    )}
                  </div>
                  <div className="group flex flex-col gap-1.5 px-3 py-2">
                    <label className="label-text">Pregnancy & maternity</label>
                    <input
                      autoComplete="off"
                      type="text"
                      {...register("pregnancy", { required: true })}
                      className="input-box placeholder:text-[0.8rem]"
                    />
                    {errors.pregnancy && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.pregnancy?.message}
                      </span>
                    )}
                  </div>
                  <div className="group flex flex-col gap-1.5 px-3 py-2">
                    <label className="label-text">
                      Physical / Mental disability{" "}
                    </label>
                    <Controller
                      name="physical"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          isSearchable={true}
                          styles={customSelectStyles}
                          options={successStatus}
                          placeholder="Yes/ No"
                          className="input-box"
                        />
                      )}
                    />
                    {errors.physical && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.physical?.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

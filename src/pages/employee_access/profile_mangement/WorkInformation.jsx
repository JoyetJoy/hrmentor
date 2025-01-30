import React, { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { customSelectStyles } from "@/utils/customStyles";
import { yupResolver } from "@hookform/resolvers/yup";
import useEmployeeMaster from "@/hooks/useEmployeeMasters";
import {
  disabilityStatus,
  genders,
  maritalStatuses,
  successStatus,
} from "@/constants/data";
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
  EMPLOYEE_RELIGIOUS_AND_SEXUAL,
} from "@/api/master";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import MenuHeaderEmployeeAccess from "@/components/employee_access/MenuHeader";
import ProfileSidebar from "@/components/sidebars/employee_access/profile_management/ProfileSideBar";
import { useUserStore } from "@/lib/slices/auth.slice";
import { WorkInfoEmployeeSchema } from "@/schema/dashboard/employee/form/workinfo.schema";

export default function WorkInformation({ formtype }) {
  const [reportNotRequired, setReportNotRequired] = useState(false);
  const [loader, setLoader] = useState(false);
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

  const queryClient = useQueryClient();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const uid = searchParams.get("uid");
  const [localState, setLocalState] = useState(null);

  const { setUser, user } = useUserStore((state) => ({
    setUser: state.setUser,
    user: state.user,
  }));
  const u_id = user?.user?.id;
  const {
    data: empWorkInfoDetail,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["empWorkInfoDetail", u_id, formtype],
    queryFn: () =>
      newRequest.get(`${EMPLOYEE_WORK_INFO}/${u_id}`).then((res) => {
        return res.data;
      }),

    enabled: !!u_id,
  });
 console.log(empWorkInfoDetail,"empWorkInfoDetail")
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
        setLocalState(response?.data);
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

  const onSubmit = (data) => {
    setLoader(true);
    handleSave(data);
  };

  const handleSave = async (data) => {
    const formData = new FormData();
    formData.append("user_id", u_id);
    formData.append("ethinicity_id", data.ethinicity_id?.id);
    formData.append("eeo_job_category_id", data.eeo_job_category_id?.id);
    formData.append("relegion_belief_id", data.relegion_belief_id?.id);
    formData.append("sexual_orientation_id", data.sexual_orientation_id?.id);
    formData.append(
      "pregnancy_and_maternity",
      data.pregnancy_and_maternity?.id,
    );
    formData.append("gender", data.gender?.id);
    formData.append("marital_status", data.marital_status?.value);
    formData.append("disability", data.disability?.id);
    formData.append("age", data.age);
    formData.append("dosent_reporting", reportNotRequired ? 1 : 0);

    if (reportNotRequired == 0) {
      formData.append("hiring_manager_id", data.hiring_manager_id?.id);
      formData.append("reporting_manager_id", data.reporting_manager_id?.id);
      if (!data.hiring_manager_id?.id) {
        return toast.error("select hiring manager");
      }
      if (!data.reporting_manager_id?.id) {
        return toast.error("select Reporting manager");
      }
    }

    try {
      const res = await newFormRequest.post(
        `employee-work-informations`,
        formData,
      );
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

  // Religious and sexual orientation list
  const { data: religiousSexualList } = useEmployeeMaster(
    EMPLOYEE_RELIGIOUS_AND_SEXUAL,
    "religiousSexualList",
  );
  console.log(errors, "error");
  return (
    <div className="flex flex-col">
      <MenuHeaderEmployeeAccess
        pathlink={""}
        currentpage={"Work Information"}
        subMenu={"ProfileManagement"}
        icon={<ChevronRight className="size-3" />}
      />
      <div className="flex gap-x-3">
        <ProfileSidebar />
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
                            // options={activeEmployeeList}
                            placeholder="Select"
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
                            // options={activeEmployeeList}
                            placeholder="Select"
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
                      name="age"
                      placeholder="Enter"
                      // {...register("age", { required: true })}
                      // onKeyPress={(event) => {
                      //   if (
                      //     !/^[0-9]$/.test(event.key) ||
                      //     event.target.value.length >= 2
                      //   ) {
                      //     event.preventDefault();
                      //   }
                      // }}
                      // onChange={(event) => {
                      //   const value = event.target.value;
                      //   if (value && !isNaN(value)) {
                      //     setValue("age", value);
                      //   }
                      // }}
                      className="input-box placeholder:text-[0.8rem]"
                      value={watch("age")}
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
                          // options={eeoJobCategoryList}
                          placeholder="Select"
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
                          // options={ethinicityList}
                          placeholder="Select"
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
                    {errors.relegion_belief_id && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.relegion_belief_id?.message}
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
                          // options={genders}
                          placeholder="Select"
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
                    <Controller
                      name="sexual_orientation_id"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          isSearchable={true}
                          styles={customSelectStyles}
                          // options={religiousSexualList?.sexualOrientations}
                          placeholder="Select"
                          className="input-box"
                        />
                      )}
                    />
                    {errors.sexual_orientation_id && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.sexual_orientation_id?.message}
                      </span>
                    )}
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
                          // options={maritalStatuses}
                          placeholder="Select"
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
                          // options={disabilityStatus}
                          // value={successStatus.find(
                          //   (item) => item.id === field.id,
                          // )}
                          // onChange={(selectedOption) => {
                          //   field.onChange(selectedOption?.id); // Use id from selected option
                          // }}
                          placeholder="Select"
                          className="input-box"
                        />
                      )}
                    />
                    {errors.pregnancy_and_maternity && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.pregnancy_and_maternity?.message}
                      </span>
                    )}
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
                          // options={disabilityStatus}
                          placeholder="Select"
                          className="input-box"
                        />
                      )}
                    />
                    {errors.physical && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.disability?.message}
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
}

import { newRequest, WORK_LOCATIONS } from "@/api";
import NewsEventHeader from "@/components/common/NewsEventHeader";
import { useUserStore } from "@/lib/slices/auth.slice";
import Select from "react-select";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@tanstack/react-query";
import { ArrowUpFromLine } from "lucide-react";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import { Link } from "react-router-dom";
import { eventsSchema } from "@/schema/dashboard/employee/masters/news.schema";

export default function CreateEvent() {
  const [loading, setLoding] = useState();
  const { user } = useUserStore((state) => ({ user: state.user }));
  const [loader, setLoader] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(eventsSchema),
  });

  console.log(errors, "errorserrorserrors");

  const { data: locationList, error } = useQuery({
    queryKey: ["locationList", user?.id],
    queryFn: () =>
      newRequest
        .get(WORK_LOCATIONS, {
          params: { user_id: user?.id },
        })
        .then((res) => res.data),
    enabled: !!user?.id, // Only run if user.id is defined
  });

  const onSubmit = async (data) => {
    setLoader(true);
    try {
      console.log(data, "datadata");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.error);
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="h-full">
      <NewsEventHeader page={2} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3 mt-2 flex items-center justify-between">
          <h1 className="text-base font-semibold">Event</h1>
          <div className="flex items-center gap-2">
            <Link
              to={""}
              className="btn flex h-10 min-h-10 items-center bg-gray-platinum px-6 text-xs font-semibold text-black hover:bg-gray-platinum"
            >
              Save as draft
            </Link>
            <button
              type="submit"
              to={""}
              className="btn flex h-10 min-h-10 items-center bg-hrmprimaryorange px-6 text-xs font-semibold text-white hover:bg-hrmblue"
            >
              Publish
            </button>
          </div>
        </div>
        {loading ? (
          <div className="flex min-h-96 w-full items-center justify-center bg-white">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-hrmprimaryorange"></div>
          </div>
        ) : (
          <div className="h-screen w-full rounded-md bg-white p-7">
            <h1 className="mb-7 text-base font-bold">Create Event</h1>
            <div className="flex flex-col">
              <div className="group flex w-1/2 flex-col gap-1.5 px-3 py-2">
                <label className="label-text">Event Title</label>
                <input
                  autoComplete="off"
                  type="text"
                  placeholder="news title"
                  {...register("title", { required: true })}
                  className="input-box placeholder:text-[0.8rem]"
                />
                {errors.subject && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.subject?.message}
                  </span>
                )}
              </div>
              <div className="group flex w-1/2 flex-col gap-1.5 px-3 py-2">
                <label className="label-text">Short Summary</label>
                <input
                  autoComplete="off"
                  type="text"
                  placeholder="short summary"
                  {...register("summary_data", { required: true })}
                  className="input-box placeholder:text-[0.8rem]"
                />
                {errors.recipient && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.recipient?.message}
                  </span>
                )}
              </div>
              <div className="group flex w-1/2 gap-1.5 px-3 py-2">
                <div className="group flex w-1/2 flex-col gap-1.5 py-2">
                  <label className="label-text">Start Date</label>
                  <input
                    autoComplete="off"
                    type="time"
                    {...register("summary", { required: true })}
                    className="input-box pr-2 placeholder:text-[0.8rem]"
                  />
                  {errors.recipient && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.recipient?.message}
                    </span>
                  )}
                </div>
                <div className="group flex w-1/2 flex-col gap-1.5 py-2">
                  <label className="label-text">End Date</label>
                  <input
                    autoComplete="off"
                    type="time"
                    {...register("summary", { required: true })}
                    className="input-box pr-2 placeholder:text-[0.8rem]"
                  />
                  {errors.recipient && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.recipient?.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="group flex w-1/2 gap-1.5 px-3 py-2">
                <div className="group flex w-1/2 flex-col gap-1.5 py-2">
                  <label className="label-text">Start Time</label>
                  <input
                    autoComplete="off"
                    type="time"
                    {...register("summary", { required: true })}
                    className="input-box pr-2 placeholder:text-[0.8rem]"
                  />
                  {errors.recipient && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.recipient?.message}
                    </span>
                  )}
                </div>
                <div className="group flex w-1/2 flex-col gap-1.5 py-2">
                  <label className="label-text">End Time</label>
                  <input
                    autoComplete="off"
                    type="time"
                    {...register("summary", { required: true })}
                    className="input-box pr-2 placeholder:text-[0.8rem]"
                  />
                  {errors.recipient && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.recipient?.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex w-full gap-3 py-2">
                {/* Location Component */}
                <div className="group flex w-1/4 flex-col gap-1.5">
                  <label className="label-text">Location</label>
                  <div className="flex items-center gap-2">
                    <Controller
                      name="accural_monthly"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={locationList}
                          isSearchable
                          placeholder="Select a Location"
                          className="input-box w-full"
                        />
                      )}
                    />
                    <div className="rounded-full bg-hrmprimaryorange">
                      {/* <Plus className="size-6 text-white" /> */}
                    </div>
                  </div>
                </div>

                {/* Featured Image Component */}
                <div className="group flex w-1/4 flex-col gap-1.5">
                  <label className="label-text">Featured Image</label>
                  <label
                    htmlFor="employee-profile-pic"
                    className="input-box flex h-10 cursor-pointer items-center justify-start rounded-md border border-dashed bg-gray-darklight px-2"
                  >
                    <div className="flex items-center">
                      <ArrowUpFromLine strokeWidth={2} className="size-4" />
                      <span className="text-xs font-semibold text-textcolor-darkCharcoal">
                        Upload File
                      </span>
                    </div>
                    <input
                      id="employee-profile-pic"
                      type="file"
                      className="hidden"
                    />
                  </label>
                  {errors.message && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.message?.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="group flex w-1/2 flex-col gap-1.5 px-3 py-2">
                <label className="label-text">Content</label>
                <ReactQuill
                  theme="snow"
                  placeholder={"Write something awesome..."}
                  className="h-36 w-full rounded-md border border-gray-light"
                />
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

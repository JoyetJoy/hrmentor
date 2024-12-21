import { EVENT_LIST, newFormRequest, newRequest, WORK_LOCATIONS } from "@/api";
import NewsEventHeader from "@/components/common/NewsEventHeader";
import { useUserStore } from "@/lib/slices/auth.slice";
import Select from "react-select";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowUpFromLine, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import { Link, useSearchParams } from "react-router-dom";
import { eventsSchema } from "@/schema/dashboard/employee/masters/news.schema";
import useImageUpload from "@/hooks/useImageUpload";
import toast from "react-hot-toast";

export default function CreateEvent() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const popup = searchParams.get("popup");

  const [loading, setLoding] = useState();
  const { user } = useUserStore((state) => ({ user: state.user }));
  const [loader, setLoader] = useState(false);
  const [content, setContent] = useState("");
  const [locationId, setLocationId] = useState("");
  const [locationName, setLocationName] = useState("");
  const { image, imageFile, handleImageChange, clearImage, setImage } =
    useImageUpload();
  const queryClient = useQueryClient();

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

  const { data: eventDetails, isLoading } = useQuery({
    queryKey: ["eventDetails", id],
    queryFn: () =>
      newRequest.get(`${"events"}/${id}`).then((res) => res?.data?.original),
    enabled: !!id != 0,
  });

  useEffect(() => {
    if (eventDetails) {
      setValue("event_title", eventDetails.event_title);
      setValue("short_summary", eventDetails.short_summary);
      setValue("featured_image", eventDetails.featured_image);
      setValue("start_date", eventDetails.start_date);
      setValue("end_date", eventDetails.end_date);
      setValue("start_time", eventDetails.start_time);
      setValue("end_time", eventDetails.end_time);
      setContent(eventDetails.content);
      setLocationName(eventDetails.location_id);
      setImage(eventDetails?.featured_image);
    }
  }, [eventDetails]);

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

  const handleContentChange = (value) => {
    setContent(value);
  };

  const onSubmit = async (data) => {
    setLoader(true);
    try {
      const formData = new FormData();
      formData.append("event_title", data?.event_title);
      formData.append("short_summary", data?.short_summary);
      formData.append("start_date", data.start_date);
      formData.append("end_date", data?.end_date);
      formData.append("start_time", data?.start_time);
      formData.append("end_time", data.end_time);
      imageFile && formData.append("featured_image", imageFile);
      formData.append("content", content);
      formData.append("location_id", locationId);
      let res;

      if (
        !data?.event_title ||
        !data?.short_summary ||
        !data?.start_date ||
        !data?.end_date ||
        !data?.start_time ||
        !data?.end_time ||
        !image || 
        !content ||
        !locationId
      ) {
        return toast.error("mandatory field missing error");
      }

      if (id) {
        res = await newFormRequest.post(`${"events"}/${id}`, formData);
      } else {
        res = await newFormRequest.post(EVENT_LIST, formData);
      }

      if (res.data?.status === 201) {
        toast.success(res?.data?.message);
        queryClient.invalidateQueries(["events"]);
        close();
      }
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
          <h1 className="text-base font-semibold">Events</h1>
          <div className="flex items-center gap-2">
            {popup !== "view" && (
              <>
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
              </>
            )}
          </div>
        </div>
        {loading ? (
          <div className="flex min-h-96 w-full items-center justify-center bg-white">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-hrmprimaryorange"></div>
          </div>
        ) : (
          <div className="h-screen w-full rounded-md bg-white p-7">
            <h1 className="mb-7 text-base font-bold">
              {" "}
              {popup !== "view" ? "Create Events" : "View Events"}
            </h1>
            <div className="flex flex-col">
              <div className="group flex w-1/2 flex-col gap-1.5 px-3 py-2">
                <label className="label-text">Event Title</label>
                <input
                  autoComplete="off"
                  type="text"
                  placeholder="event title"
                  {...register("event_title", { required: true })}
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
                  {...register("short_summary", { required: true })}
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
                    type="date"
                    {...register("start_date", { required: true })}
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
                    type="date"
                    {...register("end_date", { required: true })}
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
                    {...register("start_time", { required: true })}
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
                    min={"start_time"}
                    type="time"
                    {...register("end_time", { required: true })}
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
                          onChange={(e) => {
                            setLocationId(e?.id);
                            setLocationName(e?.label);
                          }}
                          value={
                            locationList?.find(
                              (option) => option.label === locationName,
                            ) || null
                          }
                        />
                      )}
                    />
                    <div className="rounded-full bg-hrmprimaryorange">
                      {/* <Plus className="size-6 text-white" /> */}
                    </div>
                  </div>
                </div>

                {/* Featured Image Component */}
                <div className="group flex w-1/4 flex-col gap-1.5 px-3 py-2">
                  <label className="label-text">Featured Image</label>
                  <div className="group flex flex-col gap-1.5">
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
                        htmlFor="featured_image"
                        className="input-box items-centre flex h-10 cursor-pointer justify-start rounded-md border border-dashed pl-2"
                      >
                        <div className="flex items-center">
                          <ArrowUpFromLine strokeWidth={2} className="size-4" />
                          <span className="text-sm font-semibold text-[#2C2C2C]">
                            Upload File
                          </span>
                        </div>
                        <input
                          id="featured_image"
                          onChange={handleImageChange}
                          type="file"
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                  {errors.featured_image && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.featured_image?.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="group flex w-1/2 flex-col gap-1.5 px-3 py-2">
                <label className="label-text">Content</label>
                <ReactQuill
                  value={content}
                  onChange={handleContentChange}
                  modules={{
                    toolbar: [
                      ["bold", "italic", "underline", "strike"],
                      [{ header: [1, 2, false] }],
                      [{ list: "ordered" }, { list: "bullet" }],
                      [{ align: [] }],
                      [{ color: [] }, { background: [] }],
                      ["link", "image"],
                      ["clean"],
                    ],
                  }}
                  placeholder="Type your content here..."
                />
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

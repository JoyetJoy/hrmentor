import { EVENT_LIST, newFormRequest, newRequest, WORK_LOCATIONS } from "@/api";
import NewsEventHeader from "@/components/common/NewsEventHeader";
import { useUserStore } from "@/lib/slices/auth.slice";
import Select from "react-select";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowUpFromLine, X } from "lucide-react";
import React, { useEffect, useState ,useCallback} from "react";
import { Controller, useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { eventsSchema } from "@/schema/dashboard/employee/masters/news.schema";
import useImageUpload from "@/hooks/useImageUpload";
import toast from "react-hot-toast";
import Cropper from "react-easy-crop";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

export default function CreateEvent() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const popup = searchParams.get("popup");
  const navigate = useNavigate();
  const [loading, setLoding] = useState();
  const { user } = useUserStore((state) => ({ user: state.user }));
  const [loader, setLoader] = useState(false);
  const [content, setContent] = useState("");
  const [locationId, setLocationId] = useState("");
  const [locationName, setLocationName] = useState("");
  const [status, setStatus] = useState("");
   const [image, setImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [croppedImage, setCroppedImage] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [isOpen, setIsOpen] = useState(false);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  // const { image, imageFile, handleImageChange, clearImage, setImage } =
  //   useImageUpload();
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
      formData.append("active_status", status);

      let res;

      if (
        !data?.event_title ||
        !data?.short_summary ||
        !data?.start_date ||
        !data?.end_date ||
        !data?.start_time ||
        !data?.end_time ||
        !status ||
        !image ||
        !content
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
        navigate("/admin/news-event/event");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.error);
    } finally {
      setLoader(false);
    }
  };

   const handleImageChange = async (event) => {
      const file = event.target.files[0];
      if (!file) return;
  
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      setIsOpen(true);
    };
  
    const onCropComplete = useCallback((_, croppedAreaPixels) => {
      setCroppedAreaPixels(croppedAreaPixels);
    }, []);
  
    const showCroppedImage = useCallback(async () => {
      try {
        const croppedBlob = await getCroppedImg(image, croppedAreaPixels);
        const croppedFile = new File([croppedBlob], "cropped-image.jpg", {
          type: "image/jpeg",
        });
  
        setImageFile(croppedFile);
        setCroppedImage(URL.createObjectURL(croppedFile));
        setIsOpen(false);
      } catch (error) {
        console.error("Error cropping image:", error);
      }
    }, [image, croppedAreaPixels]);
  
    const getCroppedImg = async (imageSrc, croppedAreaPixels, outputWidth = 400, outputHeight = 200) => {
      const createImage = (url) =>
        new Promise((resolve, reject) => {
          const image = new Image();
          image.crossOrigin = "anonymous"; // Prevent CORS issues if needed
          image.addEventListener("load", () => resolve(image));
          image.addEventListener("error", (err) => reject(err));
          image.src = url;
        });
    
      const image = await createImage(imageSrc);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
    
      // Set canvas to desired output size
      canvas.width = outputWidth;
      canvas.height = outputHeight;
    
      // Draw cropped image into the new canvas with scaling
      ctx.drawImage(
        image,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        outputWidth, // Scale width
        outputHeight // Scale height
      );
    
      return new Promise((resolve, reject) => {
        canvas.toBlob((blob) => {
          if (!blob) {
            console.error("Canvas is empty");
            reject(new Error("Canvas is empty"));
            return;
          }
          resolve(blob);
        }, "image/jpeg");
      });
    };
    
  
    const clearImage = () => {
      setCroppedImage(null);
      setImage(null);
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
                <button
                  type="submit"
                  to={""}
                  onClick={() => setStatus("save_as_draft")}
                  className="btn flex h-10 min-h-10 items-center bg-gray-platinum px-6 text-xs font-semibold text-black hover:bg-gray-platinum"
                >
                  Save as draft
                </button>
                <button
                  type="submit"
                  to={""}
                  onClick={() => setStatus("published")}
                  className="btn flex h-10 min-h-10 items-center bg-hrmprimaryorange px-6 text-xs font-semibold text-white hover:bg-hrmblue"
                >
                   {loader ? (
                    <>
                      <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
                      Publishing
                    </>
                  ) : (
                    "Publish"
                  )}
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
          <div className="h-full w-full rounded-md bg-white p-7">
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
                  {croppedImage ? (
                    <div className="relative">
                      <img
                        src={croppedImage}
                        alt="Cropped"
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
                      className="input-box flex h-10 cursor-pointer items-center justify-start rounded-md border border-dashed pl-2"
                    >
                      <div className="flex items-center">
                        <span className="text-sm font-semibold text-[#2C2C2C]">
                          Upload File
                        </span>
                      </div>
                      <input
                        id="featured_image"
                        onChange={handleImageChange}
                        type="file"
                        accept="image/*"
                        className="hidden"
                      />
                    </label>
                  )}
                </div>

                <Transition appear show={isOpen} as={Fragment}>
                  <Dialog
                    as="div"
                    className="relative z-50"
                    onClose={() => setIsOpen(false)}
                  >
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="fixed inset-0 bg-black bg-opacity-50" />
                    </Transition.Child>

                    <div className="fixed inset-0 flex items-center justify-center">
                      <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                      >
                        <Dialog.Panel className="relative w-full max-w-md rounded-lg bg-gray-100 px-8 pt-10 pb-8 shadow-xl">
                          {/* Close Button */}
                          <button
                            onClick={() => setIsOpen(false)}
                            className="absolute right-2 top-2  z-10 text-black"
                          >
                            <X className="h-6 w-6" />
                          </button>

                          {/* Cropping Area */}
                          <div className="relative h-60 w-full">
                            <Cropper
                              image={image}
                              crop={crop}
                              zoom={zoom}
                              aspect={2} // 300x150 aspect ratio
                              onCropChange={setCrop}
                              onZoomChange={setZoom}
                              onCropComplete={onCropComplete}
                            />
                          </div>

                          {/* Crop Button */}
                          <div className="mt-4 flex justify-center">
                            <button
                              type="button"
                              onClick={showCroppedImage}
                              className="rounded-md bg-hrmdarkblue px-4 py-2 text-white"
                            >
                              Crop Image
                            </button>
                          </div>
                        </Dialog.Panel>
                      </Transition.Child>
                    </div>
                  </Dialog>
                </Transition>
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

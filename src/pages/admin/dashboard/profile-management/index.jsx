import { newRequest, PROFILE_MANAGEMENT } from "@/api";
import MenuHeader from "@/components/common/MenuHeader";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import useImageUpload from "@/hooks/useImageUpload";
import { UploadCloud } from "lucide-react";
import { ProfileManagementSchema } from "@/schema/dashboard/masters/shift.schema";
import { useUserStore } from "@/lib/slices/auth.slice";

export default function ProfileManagement() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const uid = searchParams.get("uid");
  const [loader, setLoader] = useState(false);
  const { image, imageFile, handleImageChange, clearImage, setImage } =
    useImageUpload();
    const { user } = useUserStore((state) => ({
      user: state.user,
    }));
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(ProfileManagementSchema),
  });
  const queryClient = useQueryClient();

  //   PROFILE MANAGEMENT;
  const { data: profileManagement, isLoading } = useQuery({
    queryKey: ["profileManagement", uid],
    queryFn: () =>
      newRequest.get(`${PROFILE_MANAGEMENT}`).then((res) => {
        return res.data;
      }),
  });

  useEffect(() => {
    if (profileManagement) {
      reset({
        first_name: profileManagement.first_name,
        middle_name: profileManagement.middle_name,
        email: profileManagement.email,
        sur_name: profileManagement.sur_name,
        profile_image: profileManagement.profile_image,
        formatted_dob: profileManagement.formatted_dob,
        name: profileManagement.name,
      });
    }
  }, [profileManagement, reset]);
  

  const onSubmit = async (data) => {
    setLoader(true);
    try {
      const formData = {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone: data.phone,
        location: data.location,
        message: data.message,
        note: data.note,
        status: data.status,
      };

      const res = await newRequest.patch(
        `${PROFILE_MANAGEMENT}/${id}`, // URL with dynamic ID
        formData,
        {
          user_id: user?.id,
        }, // formData should be the second argument, which is the request body
      );

      if (res?.data?.success === true) {
        toast.success(res?.data?.message);
        queryClient.invalidateQueries(["profileManagement"]);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.error);
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      <MenuHeader
        menu={"Menu"}
        currentpath={"Profile Management"}
        // icon={<ChevronRight className="size-3" />}
        activeMenu={"Profile Management"}
      />
      {/* {isLoading ? (
        <div className="flex min-h-96 w-full items-center justify-center bg-white">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-hrmprimaryorange"></div>
        </div>
      ) : 
      ( */}
      <>
        <div className="flex items-center justify-between gap-7">
          <h5 className="text-lg font-bold">Profile Management</h5>
        </div>
        <div className="mt-2 flex min-h-[520px] w-full flex-col items-start bg-white px-10 py-5">
          <div className="flex w-full items-center justify-between">
            <div className="mx-auto h-full w-[98%] rounded-md bg-white px-3 py-4">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid w-full max-w-5xl grid-cols-12 gap-6 p-3"
              >
                <div className="items-left col-span-4 flex flex-col space-y-3">
                  <div className="h-32 w-32 overflow-hidden rounded-full border-2 border-hrmprimaryorange">
                    <img
                      className="h-full w-full object-cover"
                      src={profileManagement?.profile_image}
                      alt={profileManagement?.first_name}
                    />
                  </div>
                </div>
                <div className="col-span-9 grid w-full grid-cols-2 gap-4">
                  <div className="group flex w-full flex-col space-y-1">
                    <label className="text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                      Name
                    </label>
                    <input
                      {...register("name")}
                      type="text"
                      placeholder="Name"
                      className="input-box h-10 w-full rounded border border-black/10 px-2 text-sm"
                      readOnly
                    />
                  </div>
                  <div className="group flex w-full flex-col space-y-1">
                    <label className="text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                      Email
                    </label>
                    <input
                      {...register("email")}
                      type="text"
                      placeholder="Email"
                      className="input-box h-10 w-full rounded border border-black/10 px-2 text-sm"
                      readOnly
                    />
                  </div>
                  <div className="group col-span-2 flex w-full flex-col space-y-1">
                    <label className="text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                      Current Password
                    </label>
                    <input
                      {...register("current_password")}
                      type="password"
                      placeholder="Current Password"
                      className="input-box h-10 w-full rounded border border-black/10 px-2 text-sm"
                    />
                  </div>
                  <div className="group flex w-full flex-col space-y-1">
                    <label className="text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                      New Password
                    </label>
                    <input
                      {...register("new_password")}
                      type="password"
                      placeholder="New Password"
                      className="input-box h-10 w-full rounded border border-black/10 px-2 text-sm"
                    />
                  </div>
                  <div className="group flex w-full flex-col space-y-1">
                    <label className="text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                      Confirm Password
                    </label>
                    <input
                      {...register("confirm_password")}
                      type="password"
                      placeholder="Confirm Password"
                      className="input-box h-10 w-full rounded border border-black/10 px-2 text-sm"
                    />
                  </div>
                  <div className="group flex w-full flex-col space-y-1">
                    <label className="text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                      Change Profile Image (size)
                    </label>
                    <label
                      htmlFor="employee-profile-pic"
                      className="input-box flex h-10 cursor-pointer items-center justify-center rounded-md border border-dashed"
                    >
                      <div className="flex items-center gap-2">
                        <UploadCloud />
                        <span className="font-semibold text-textcolor-darkCharcoal">
                          Upload Image
                        </span>
                      </div>
                      <input
                        id="employee-profile-pic"
                        onChange={handleImageChange}
                        type="file"
                        className="hidden"
                      />
                    </label>
                  </div>
                  <div className="col-span-2 flex justify-start space-x-3 pt-5">
                    <button
                      type="submit"
                      className="h-10 w-32 rounded-md bg-[#FF5722] text-sm font-medium text-white"
                    >
                      Save changes
                    </button>
                    <button
                      type="button"
                      className="h-10 w-32 rounded-md border border-gray-300 text-sm font-medium text-gray-700"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
      {/* )} */}
    </>
  );
}

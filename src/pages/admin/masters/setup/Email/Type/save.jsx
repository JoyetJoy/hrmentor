import { useQuery } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUserStore } from "@/lib/slices/auth.slice";
import * as Yup from "yup";
import toast from "react-hot-toast";
import SetUpHeader from "@/components/common/SetupMenuHeader";
import Select from "react-select";
import "react-quill/dist/quill.snow.css";
import { customSelectStyles } from "@/utils/customStyles";
import { ALL_TOKEN_LIST, EMAIL_TOKENS, UPDATE_EMAIL_TYPE } from "@/api/setup";
import { newRequest } from "@/api";

const EmailSchema = Yup.object({
  template_name: Yup.string(),
  subject: Yup.string(),
});

export default function EmailTypeSave() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const label = searchParams.get("label");
  const navigate = useNavigate();

  const { user } = useUserStore((state) => ({ user: state.user }));
  const [loader, setLoader] = useState(false);
  const [tokens, setTokens] = useState([]);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(EmailSchema),
  });

  const { data: tokenList } = useQuery({
    queryKey: ["tokenList", user?.id],
    queryFn: () =>
      newRequest
        .get(ALL_TOKEN_LIST, { params: { user_id: user?.id } })
        .then((res) => res.data),
    enabled: !!user?.id,
  });

  useEffect(() => {
    if (id) {
      newRequest
        .get(`/${EMAIL_TOKENS}/${id}`, {
          params: { user_id: user?.id },
        })
        .then((res) => {
          const formattedTokens = res.data.map((token) => ({
            id: token.id,
            label: token.token,
          }));

          setTokens(formattedTokens);
        })
        .catch((error) => {
          console.error("Error fetching tokens:", error);
        });
    }
  }, [id, user?.id]);

  const onSubmit = async () => {
    setLoader(true);
    try {
      const ids = tokens.map((item) => item.id); // Extract only token IDs

      const formData = { tokens: ids };

      const res = await newRequest.post(
        `${UPDATE_EMAIL_TYPE}/${id}`,
        formData,
        { params: { user_id: user?.id } },
      );

      if (res) {
        toast.success(res?.data?.message);
        navigate(
          `/admin/setup/type?id=${id}&label=${encodeURIComponent(label)}`,
        );
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
      <SetUpHeader menu="Menu" currentpath="Folder" page={2} />
      <div className="mx-auto mb-3 flex w-[98%] items-center justify-between">
        <label>
          <b>New Email</b>
        </label>
        <button
          onClick={handleSubmit(onSubmit)}
          className="flex w-fit items-center justify-center gap-2 rounded-md bg-hrmprimaryorange px-5 py-2.5 text-sm font-medium text-white hover:bg-hrmdarkblue/70 focus:outline-none"
        >
          Save
        </button>
      </div>

      <div className="mx-auto h-screen w-[98%] rounded-md bg-white px-3 py-4">
        <form className="grid w-full max-w-5xl grid-cols-12 gap-16 p-3">
          <div className="col-span-8 grid w-full grid-cols-1 gap-3">
            <h6 className="text-lg font-semibold">Edit Email Type</h6>

            {/* Template Name Input */}
            <div
              className="group flex w-full flex-col space-y-1"
              style={{ width: "300px" }}
            >
              <label className="required text-[0.8rem] font-medium text-[#3A3A3A]">
                Name
              </label>
              <input
                name="name"
                value={label}
                type="text"
                placeholder="Template Name"
                className="input-box h-10 w-full rounded border border-black/10 px-2 text-sm"
              />
            </div>

            <div className="group flex flex-col" style={{ width: "600px" }}>
              <label className="required text-[0.8rem] font-medium text-[#3A3A3A]">
                Subject
              </label>
              <Controller
                name="emailTemplateId"
                control={control}
                rules={{ required: "Email Folder is required" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={tokenList}
                    styles={customSelectStyles}
                    isMulti
                    placeholder="Select Email Folder"
                    className="h-auto w-full rounded-md border border-[#A7A7A7] border-opacity-60 text-sm text-zinc-500 placeholder:text-sm placeholder:text-[#7F7F7F]"
                    value={tokens}
                    onChange={(selectedOption) => {
                      setTokens(
                        selectedOption.map((item) => ({
                          id: item.id,
                          label: item.label,
                        })),
                      );
                    }}
                  />
                )}
              />
              {errors.emailTemplateId && (
                <span className="text-xs font-medium text-red-500">
                  {errors.emailTemplateId.message}
                </span>
              )}
            </div>
            <div style={{ height: "150px", color: "white" }}>
              <p></p>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

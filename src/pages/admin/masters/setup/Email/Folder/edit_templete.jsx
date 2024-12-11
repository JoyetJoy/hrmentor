import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUserStore } from "@/lib/slices/auth.slice";
import toast from "react-hot-toast";
import SetUpHeader from "@/components/common/SetupMenuHeader";
import Select from "react-select"; // Import React Select instead of MUI's Select
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { customSelectStyles } from "@/utils/customStyles";
import { EMAIL_TEMPLATE, EMAIL_TYPE, UPDATE_EMAIL_TEMPLATE } from "@/api/setup";
import { newRequest } from "@/api";
import * as yup from "yup";

const schema = yup.object().shape({
  templeteName: yup.string(),
  // Add other validations here
});

export default function EmailTempleteEdit() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const { user } = useUserStore((state) => ({ user: state.user }));
  const [isDefault, setIsDefault] = useState(0);
  const [emailTypeId, setEmailTypeId] = useState("");
  const [content, setContent] = useState("");
  const [templeteName, setTempleteName] = useState(false);
  const [subject, setSubject] = useState(false);
  const [loader, setLoader] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const { data: emailTemplate } = useQuery({
    queryKey: ["emailTemplate", user?.id, id],
    queryFn: () =>
      newRequest
        .get(`${EMAIL_TEMPLATE}/${id}/edit`, {
          params: { user_id: user?.id },
        })
        .then((res) => res.data),
    enabled: !!user?.id && !!id,
  });

  const { data: emailTypeList } = useQuery({
    queryKey: ["emailTypeList", user?.id],
    queryFn: () =>
      newRequest
        .get(EMAIL_TYPE, { params: { user_id: user?.id } })
        .then((res) => res.data),
    enabled: !!user?.id,
  });

  useEffect(() => {
    if (emailTemplate) {
      setTempleteName(emailTemplate.templete_name);
      setSubject(emailTemplate.subject);
      setIsDefault(emailTemplate.is_default);
      setContent(emailTemplate.content);
      setEmailTypeId(emailTemplate?.email_type_id?.id);
    }
  }, [emailTemplate]);

  const handleContentChange = (value) => {
    setContent(value);
  };

  const onSubmit = async () => {
    setLoader(true);
    try {
      const formData = {
        subject: subject,
        templete_name: templeteName,
        is_default: isDefault,
        email_type_id: emailTypeId,
        content: content,
      };
      const res = await newRequest.post(
        `${UPDATE_EMAIL_TEMPLATE}/${id}`, // URL with dynamic ID
        formData, // formData should be the second argument, which is the request body
        {
          params: {
            user_id: user?.id,
          },
        },
      );
      if (res) {
        toast.success(res?.data?.message);
        window.location.reload();
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
      <SetUpHeader menu="Menu" currentpath="Folder" page={1} />
      <div className="mx-auto mb-3 flex h-full w-[98%] items-center justify-between">
        <label>
          <b>Edit Email Template</b>
        </label>
        <button
          onClick={handleSubmit(onSubmit)}
          className="flex w-fit items-center justify-center gap-2 rounded-md bg-hrmprimaryorange px-5 py-2.5 text-sm font-medium text-white hover:bg-hrmdarkblue/70 focus:outline-none"
        >
          Save
        </button>
      </div>
      {emailTemplate ? (
        <>
          <div className="mx-auto h-full w-[98%] rounded-md bg-white px-3 py-4">
            <form className="grid w-full max-w-5xl grid-cols-12 gap-16 p-3">
              <div className="col-span-8 grid w-full grid-cols-1 gap-3">
                {/* Template Name Input */}
                <div
                  className="group flex w-full flex-col space-y-1"
                  style={{ width: "300px" }}
                >
                  <label className="required text-[0.8rem] font-medium text-[#3A3A3A]">
                    Template Name
                  </label>
                  <input
                    value={templeteName}
                    onChange={(e) => setTempleteName(e.target.value)}
                    name="templete_name"
                    type="text"
                    placeholder="Template Name"
                    className="input-box h-10 w-full rounded border border-black/10 px-2 text-sm"
                  />
                </div>

                {/* Subject Input */}
                <div className="group flex w-full flex-col space-y-1">
                  <label className="required text-[0.8rem] font-medium text-[#3A3A3A]">
                    Subject
                  </label>
                  <input
                    name="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    type="text"
                    placeholder="Subject"
                    className="input-box h-10 w-full rounded border border-black/10 px-2 text-sm"
                  />
                </div>

                <div className="group flex w-full flex-col space-y-1">
                  <label className="required text-[0.8rem] font-medium text-[#3A3A3A]">
                    Email Type
                  </label>
                  <Controller
                    name="emailTypeId"
                    control={control}
                    rules={{ required: "Email Type is required" }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={emailTypeList}
                        styles={customSelectStyles}
                        placeholder="Select Email Type"
                        className="input-box"
                        value={
                          emailTypeList?.find(
                            (option) => option.id === emailTypeId,
                          ) || null
                        }
                        onChange={(selectedOption) => {
                          field.onChange(selectedOption.id);
                          setEmailTypeId(selectedOption.id);
                        }}
                      />
                    )}
                  />
                </div>

                {/* Toggle Switch for Default Option */}
                <div className="flex items-center space-x-2">
                  <h1 className="text-sm">Is Default</h1>
                  <div
                    onClick={() => setIsDefault(isDefault === 1 ? 0 : 1)}
                    className={`h-5 w-10 rounded-full p-[1px] ${
                      isDefault === 1
                        ? "bg-[#8be691]"
                        : "border border-[#888888] bg-white"
                    }`}
                  >
                    <div
                      className={`h-4 w-4 transform rounded-full transition-transform ${
                        isDefault === 1
                          ? "translate-x-5 bg-[#00b448]"
                          : "translate-x-0 bg-black"
                      }`}
                    ></div>
                  </div>
                </div>

                {/* Content Note (ReactQuill Editor) */}
                <div
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    maxWidth: "700px",
                  }}
                >
                  <label className="required text-[0.8rem] font-medium text-[#3A3A3A]">
                    Content Note
                  </label>
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
            </form>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

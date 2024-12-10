import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUserStore } from "@/lib/slices/auth.slice";
import * as Yup from "yup";
import toast from "react-hot-toast";
import SetUpHeader from "@/components/common/SetupMenuHeader";
import Select from "react-select"; // Import React Select instead of MUI's Select
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { customSelectStyles } from "@/utils/customStyles";
import { EMAIL_FOLDER, EMAIL_TOKENS, EMAIL_TYPE } from "@/api/setup";
import { newRequest } from "@/api";

const EmailSchema = Yup.object({
  template_name: Yup.string(),
  subject: Yup.string(),
});

export default function EmailSetupSave() {
  const { id } = useParams();
  const { user } = useUserStore((state) => ({ user: state.user }));
  const [loader, setLoader] = useState(false);
  const [isDefault, setIsDefault] = useState(false);
  const [emailTemplateId, setEmailTemplateId] = useState("");
  const [emailTypeId, setEmailTypeId] = useState("");
  const [tokenId, setTokenId] = useState("");
  const [tokens, setTokens] = useState([]);
  const [content, setContent] = useState(`
    Dear [Candidate First and Last Name],<br><br>
    Congratulations on your offer from [Company Name]! We are delighted to offer you the position of [Job Title] with an anticipated start date of [start date]. As discussed [over the phone, during your interview, etc.], please find attached your detailed offer letter.
  `);

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

  const queryClient = useQueryClient();

  const [saveEmail, SetSaveEmail] = useState({
    template_name: "",
    subject: "",
  });

  const HandleSaveEmail = (e) => {
    SetSaveEmail({
      ...saveEmail,
      [e.target.name]: e.target.value,
    });
  };
  const handleContentChange = (value) => {
    setContent(value);
  };

  const { data: emailTypeList = [] } = useQuery({
    queryKey: ["emailTypeList", user?.id],
    queryFn: () =>
      newRequest
        .get(EMAIL_TYPE, { params: { user_id: user?.id } })
        .then((res) => res.data),
    enabled: !!user?.id,
  });

  const { data: emailFolderList = [] } = useQuery({
    queryKey: ["emailFolderList", user?.id],
    queryFn: () =>
      newRequest
        .get(EMAIL_FOLDER, { params: { user_id: user?.id } })
        .then((res) => res.data),
    enabled: !!user?.id,
  });

  useEffect(() => {
    if (emailTypeId) {
      newRequest
        .get(`/${EMAIL_TOKENS}/${emailTypeId}`, {
          params: { user_id: user?.id },
        })
        .then((res) => {
          const formattedTokens = res.data.map((token) => ({
            value: token.id,
            label: token.token,
          }));
          setTokens(formattedTokens);
        });
    }
  }, [emailTypeId, user?.id]);

  const onSubmit = async () => {
    setLoader(true);
    try {
      const formData = {
        subject: saveEmail.subject,
        template_name: saveEmail.template_name,
        is_default: isDefault,
        folder_id: emailTemplateId,
        type_id: emailTypeId,
        content_note: content,
        token_id: tokenId,
      };

      console.log(formData, "formDataformData");

      // const res = await newRequest.post(
      //   `${COMPANY_CALENDER}`, // URL with dynamic ID
      //   formData, // formData should be the second argument, which is the request body
      //   {
      //     params: {
      //       user_id: user?.id,
      //     },
      //   },
      // );
      // if (res) {
      //   toast.success(res?.data?.message);
      //   close();
      // }
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
          <b>Email Template</b>
        </label>
        <button
          onClick={handleSubmit(onSubmit)}
          className="flex w-fit items-center justify-center gap-2 rounded-md bg-hrmprimaryorange px-5 py-2.5 text-sm font-medium text-white hover:bg-hrmdarkblue/70 focus:outline-none"
        >
          Save
        </button>
      </div>

      <div className="mx-auto h-full w-[98%] rounded-md bg-white px-3 py-4">
        <form className="grid w-full max-w-5xl grid-cols-12 gap-16 p-3">
          <div className="col-span-8 grid w-full grid-cols-1 gap-3">
            <h6 className="text-lg font-semibold">Create Email Template</h6>

            {/* Template Name Input */}
            <div
              className="group flex w-full flex-col space-y-1"
              style={{ width: "300px" }}
            >
              <label className="required text-[0.8rem] font-medium text-[#3A3A3A]">
                Template Name
              </label>
              <input
                name="template_name"
                value={saveEmail.template_name}
                onChange={HandleSaveEmail}
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
                value={saveEmail.subject}
                onChange={HandleSaveEmail}
                type="text"
                placeholder="Subject"
                className="input-box h-10 w-full rounded border border-black/10 px-2 text-sm"
              />
              {errors.subject && (
                <span className="text-xs font-medium text-red-500">
                  {errors.subject.message}
                </span>
              )}
            </div>
            <div className="grid grid-cols-2">
              {/* Email Folder Selector */}
              <div className="group flex flex-col" style={{ width: "300px" }}>
                <label className="required text-[0.8rem] font-medium text-[#3A3A3A]">
                  Folder
                </label>
                <Controller
                  name="emailTemplateId"
                  control={control}
                  rules={{ required: "Email Folder is required" }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={emailFolderList}
                      styles={customSelectStyles}
                      placeholder="Select Email Folder"
                      className="input-box"
                      value={
                        emailFolderList.find(
                          (option) => option.id === emailTemplateId,
                        ) || null
                      }
                      onChange={(selectedOption) => {
                        field.onChange(selectedOption.id);
                        setEmailTemplateId(selectedOption.id);
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

              {/* Email Type Selector */}
              <div className="group flex flex-col">
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
                        emailTypeList.find(
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
                {errors.emailTypeId && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.emailTypeId.message}
                  </span>
                )}
              </div>
            </div>
            {/* Toggle Switch for Default Option */}
            <div className="flex items-center space-x-2">
              <h1 className="text-sm">Is Default</h1>
              <div
                onClick={() => setIsDefault(!isDefault)}
                className={`h-5 w-10 rounded-full p-[1px] ${
                  isDefault
                    ? "bg-[#8be691]"
                    : "border border-[#888888] bg-white"
                }`}
              >
                <div
                  className={`h-4 w-4 transform rounded-full transition-transform ${
                    isDefault
                      ? "translate-x-5 bg-[#00b448]"
                      : "translate-x-0 bg-black"
                  }`}
                ></div>
              </div>
            </div>

            {/* Content Note (ReactQuill Editor) */}
            <div
              style={{ fontFamily: "Poppins, sans-serif", maxWidth: "700px" }}
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

            {/* Day Selector */}
            {emailTypeId && (
              <div className="group flex w-full flex-col space-y-1">
                <label className="label-text flex flex-row items-center gap-1">
                  <span className="required">Customize Token</span>
                </label>
                <Controller
                  name="tokenId"
                  control={control}
                  rules={{ required: "Email Folder is required" }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={tokens}
                      styles={customSelectStyles}
                      placeholder="Select Token"
                      className="input-box"
                      value={
                        tokens.find((option) => option.value === tokenId) ||
                        null
                      }
                      onChange={(selectedOption) => {
                        field.onChange(selectedOption.value);
                        setTokenId(selectedOption.value);
                      }}
                    />
                  )}
                />
              </div>
            )}
          </div>
        </form>
      </div>
    </>
  );
}

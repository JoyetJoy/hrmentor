import {
  DEFAULT_UN_DOCUMENT_TEMPLATE,
  DEFAULT_UN_DOCUMENT_TEMPLATE_DESCRIPTION,
  DEFAULT_UN_EMAIL_TEMPLATE,
  DEFAULT_UN_EMAIL_TEMPLATE_DESCRIPTION,
  HIRING_OFFER_LETTER_TAGS,
  HIRING_UNCONDITIONAL_OFFER_LETTER_EMAIL_TEMPLATE,
  HIRING_UNCONDITIONAL_OFFER_LETTER_TEMPLATE,
} from "@/api/hiring";
import useEmployeeMaster from "@/hooks/useEmployeeMasters";
import { customSelectStyles } from "@/utils/customStyles";
import Select from "react-select";
import { yupResolver } from "@hookform/resolvers/yup";
import { NotebookPen, User } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import * as Yup from "yup";
import { useQuery } from "@tanstack/react-query";
import { newFormRequest, newRequest } from "@/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { SALARY_DEFAULT_MASTERS } from "@/api/master";

export const schema = Yup.object({
  doc_template_heading: Yup.object({
    id: Yup.string(),
    value: Yup.string(),
    label: Yup.string(),
  }).test("both-required", "Document template is required", function (value) {
    return value?.value && value?.label;
  }),
  email_template_heading: Yup.object({
    id: Yup.string(),
    value: Yup.string(),
    label: Yup.string(),
  }).test("both-required", "Email template is required", function (value) {
    return value?.value && value?.label;
  }),
  joining_date: Yup.string(),
  pay_type: Yup.object({
    id: Yup.string(),
    value: Yup.string(),
    label: Yup.string(),
  }).test("both-required", "Pay type is required", function (value) {
    return value?.value && value?.label;
  }),
  salary: Yup.string(),
});

export const UnConditionalOfferLetter = ({ candidate }) => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [description, setDescription] = useState("");
  const [emailDescription, setEmailDescription] = useState("");
  console.log(candidate);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const { data: recruiterMasters } = useEmployeeMaster(
    SALARY_DEFAULT_MASTERS,
    "recruiterMasters",
  );

  const { doc_template_heading, email_template_heading } = watch();

  // default templates
  const { data: olDefaultTemplate } = useEmployeeMaster(
    DEFAULT_UN_DOCUMENT_TEMPLATE,
    "olDefaultTemplate",
  );

  // default email template
  const { data: olEmailDefaultTemplate } = useEmployeeMaster(
    DEFAULT_UN_EMAIL_TEMPLATE,
    "olEmailDefaultTemplate",
  );

  // SET DEFAULT VALUES
  useEffect(() => {
    if (olDefaultTemplate) {
      setValue("doc_template_heading", olDefaultTemplate);
    }
  }, [olDefaultTemplate, setValue]);

  useEffect(() => {
    if (olEmailDefaultTemplate) {
      setValue("email_template_heading", olEmailDefaultTemplate);
    }
  }, [olEmailDefaultTemplate, setValue]);

  // GET DETAILS
  const { data: defaultDesc, isLoading } = useQuery({
    queryKey: ["defaultDesc", doc_template_heading],
    queryFn: () =>
      newRequest
        .get(
          `${DEFAULT_UN_DOCUMENT_TEMPLATE_DESCRIPTION}/${doc_template_heading?.id}`,
        )
        .then((res) => {
          return res.data;
        }),
    enabled: !!doc_template_heading,
  });

  const { data: defaultEmailDesc } = useQuery({
    queryKey: ["defaultEmailDesc", email_template_heading],
    queryFn: () =>
      newRequest
        .get(
          `${DEFAULT_UN_EMAIL_TEMPLATE_DESCRIPTION}/${email_template_heading?.id}`,
        )
        .then((res) => {
          return res.data;
        }),
    enabled: !!email_template_heading,
  });

  useEffect(() => {
    if (defaultDesc) {
      setDescription(defaultDesc);
    }
  }, [defaultDesc, setDescription]);

  useEffect(() => {
    if (defaultEmailDesc) {
      setEmailDescription(defaultEmailDesc?.content);
    }
  }, [defaultEmailDesc, setEmailDescription]);

  // document templates
  const { data: olTemplate } = useEmployeeMaster(
    HIRING_UNCONDITIONAL_OFFER_LETTER_TEMPLATE,
    "olTemplate",
  );

  // email templates
  const { data: olEmailTemplate } = useEmployeeMaster(
    HIRING_UNCONDITIONAL_OFFER_LETTER_EMAIL_TEMPLATE,
    "olEmailTemplate",
  );

  // Tags
  const { data: olTags } = useEmployeeMaster(
    HIRING_OFFER_LETTER_TAGS,
    "olTags",
  );

  const onSubmit = (data) => {
    setLoader(true);
    handleSave(data);
  };

  const handleSave = async (data) => {
    const formData = new FormData();
    formData.append("email_template_heading", data.email_template_heading);
    formData.append("document_template_description", description);
    formData.append("email_template_description", emailDescription);
    formData.append("joining_date", data.joining_date);
    formData.append("pay_type", data.pay_type?.id);
    formData.append("salary", data.salary);
    try {
      const res = await newFormRequest.post(
        `send-unconditional-offer-letter/${candidate?.id}`,
        formData,
      );
      if (res.status === 200) {
        toast.success(res?.data?.message);
        reset();
        setLoader(false);
        navigate("/admin/hiring");
      } else {
        toast.error("Failed to save send.");
        setLoader(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to send.");
      setLoader(false);
    }
  };
  console.log(candidate);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex w-full items-center justify-between text-sm font-semibold">
        {candidate && (
          <div className="flex items-center gap-2">
            <div className="flex size-7 items-center justify-center rounded-full border">
              <User className="size-4 fill-black" />
            </div>
            <div className="flex flex-col">
              <div className="text-sm font-semibold">
                {candidate?.first_name} {candidate?.sur_name}
              </div>
              <div className="text-xs text-gray-dark">
                {candidate?.education?.value}
              </div>
            </div>
          </div>
        )}
        <div className="flex w-fit gap-3 text-[0.8rem] font-semibold">
          <button
            type="button"
            className="flex h-10 w-full cursor-pointer items-center justify-center rounded-md bg-white px-4 text-black focus:outline-none"
          >
            <NotebookPen className="h-4" /> <span>Draft</span>
          </button>
          <button
            type="submit"
            className="flex h-10 w-full min-w-28 cursor-pointer items-center justify-center gap-2 rounded-md bg-hrmblack px-4 font-medium text-white focus:outline-none"
          >
            {loader ? (
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>{" "}
                Sending
              </div>
            ) : (
              <>Send Offer</>
            )}
          </button>
        </div>
      </div>
      <div className="mt-2 flex h-fit w-full flex-col gap-3 rounded bg-white p-4">
        <div className="flex items-center gap-2">
          <img
            className="h-7 w-7"
            src="/assets/images/hiring/offer/1.png"
            alt=""
          />
          <p className="text-[0.9rem] font-medium">Full Time</p>
        </div>
        <div className="flex items-center gap-2">
          <img
            className="h-7 w-7"
            src="/assets/images/hiring/offer/2.png"
            alt=""
          />
          <p className="text-[0.9rem] font-medium">{candidate?.date_applied}</p>
        </div>
        <div className="flex items-center gap-2">
          <img
            className="h-7 w-7"
            src="/assets/images/hiring/offer/3.png"
            alt=""
          />
          <p className="text-[0.9rem] font-medium">{candidate?.city.label}</p>
        </div>
        {/* <div className="flex items-center gap-2">
          <img
            className="h-7 w-7"
            src="/assets/images/hiring/offer/4.png"
            alt=""
          />
          <p className="text-[0.9rem] font-medium">Sales & Marketing</p>
        </div>
        <div className="flex items-center gap-2">
          <img
            className="h-7 w-7"
            src="/assets/images/hiring/offer/5.png"
            alt=""
          />
          <p className="text-[0.9rem] font-medium">Sales & Marketing</p>
        </div> */}
      </div>
      <div className="grid grid-cols-4 gap-x-3 rounded border-t bg-white p-4">
        <div className="group flex flex-col space-y-1 py-2">
          <label className="required label-text">Joining Date</label>
          <input
            {...register("joining_date")}
            autoComplete="off"
            type="date"
            className="input-box pr-2"
          />
          {errors.joining_date && (
            <span className="text-xs font-medium text-red-500">
              {errors.joining_date?.message}
            </span>
          )}
        </div>
        <div className="group flex flex-col space-y-1 py-2">
          <label className="required label-text">Pay Type</label>
          <Controller
            name="pay_type"
            className=""
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                {...field}
                isSearchable={true}
                styles={customSelectStyles}
                options={recruiterMasters?.payTypes}
                placeholder="Select type"
                className="input-box"
              />
            )}
          />
          {errors.pay_type && (
            <span className="text-xs font-medium text-red-500">
              {errors.pay_type?.message}
            </span>
          )}
        </div>
        <div className="group flex flex-col space-y-1 py-2">
          <label className="required label-text">Salary</label>
          <input
            {...register("salary")}
            autoComplete="off"
            type="text"
            className="input-box"
          />
          {errors.salary && (
            <span className="text-xs font-medium text-red-500">
              {errors.salary?.message}
            </span>
          )}
        </div>
      </div>
      <div className="mt-7 flex flex-col gap-3">
        <div className="flex gap-3">
          <div className="flex w-full flex-col gap-5 rounded-md bg-white p-6">
            <div className="text-sm font-semibold">Offer Letter Template</div>
            <div className="grid w-full grid-cols-2 gap-x-3">
              <div className="group flex w-full flex-col space-y-1 py-2">
                <label className="required label-text">
                  Change Offer Letter Template
                </label>
                <Controller
                  name="doc_template_heading"
                  className=""
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      isSearchable={true}
                      styles={customSelectStyles}
                      options={olTemplate}
                      placeholder="Select template"
                      className="input-box"
                    />
                  )}
                />
                {errors.doc_template_heading && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.doc_template_heading.message}
                  </span>
                )}
              </div>
              <div className="group flex w-full flex-col space-y-1 py-2">
                <label className="required label-text">Tags</label>
                <Controller
                  name="doc_tags"
                  className=""
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      isSearchable={true}
                      styles={customSelectStyles}
                      options={olTags}
                      placeholder="Select tags"
                      onChange={(selected) => {
                        field.onChange(selected); // Update the form state
                        if (selected?.value) {
                          setDescription((prev) => `${prev} ${selected.value}`);
                        }
                      }}
                      className="input-box"
                    />
                  )}
                />
                {errors?.doc_tags && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.doc_tags.message}
                  </span>
                )}
              </div>
              <div className="group flex w-full flex-col space-y-1">
                <label className="required label-text">Letterhead</label>
                <Controller
                  name="letterhead"
                  className=""
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      isSearchable={true}
                      styles={customSelectStyles}
                      options={olTags}
                      placeholder="Select tags"
                      className="input-box"
                    />
                  )}
                />
                {errors?.letterhead && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.letterhead.message}
                  </span>
                )}
              </div>
            </div>
            <h5 className="label-text -mb-3">
              Offer letter will be converted to pdf format automatically
            </h5>
            <ReactQuill
              theme="snow"
              value={description}
              onChange={setDescription}
              placeholder={"Type here.."}
              className="min-h-72 w-full flex-grow rounded-md border placeholder:text-gray-mediumDark"
            />
          </div>

          <div className="flex w-full flex-col gap-5 rounded-md bg-white p-6">
            <div className="text-sm font-semibold">Email Template</div>
            <div className="grid w-full grid-cols-2 gap-x-3">
              <div className="group flex w-full flex-col space-y-1 py-2">
                <label className="required label-text">
                  Change Offer Letter Template
                </label>
                <Controller
                  name="email_template_heading"
                  className=""
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      isSearchable={true}
                      styles={customSelectStyles}
                      options={olEmailTemplate}
                      placeholder="Select template"
                      className="input-box"
                    />
                  )}
                />
                {errors.email_template_heading && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.email_template_heading.message}
                  </span>
                )}
              </div>
              <div className="group flex w-full flex-col space-y-1 py-2">
                <label className="required label-text">Tags</label>
                <Controller
                  name="email_tags"
                  className=""
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      isSearchable={true}
                      styles={customSelectStyles}
                      options={olTags}
                      onChange={(selected) => {
                        field.onChange(selected);
                        if (selected?.value) {
                          setEmailDescription(
                            (prev) => `${prev} ${selected.value}`,
                          );
                        }
                      }}
                      placeholder="Select tags"
                      className="input-box"
                    />
                  )}
                />
                {errors?.email_tags && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.email_tags.message}
                  </span>
                )}
              </div>
            </div>
            <ReactQuill
              theme="snow"
              value={emailDescription}
              onChange={setEmailDescription}
              placeholder={"Type here.."}
              className="w-full flex-grow rounded-md border placeholder:text-gray-mediumDark"
            />
          </div>
        </div>
      </div>
    </form>
  );
};

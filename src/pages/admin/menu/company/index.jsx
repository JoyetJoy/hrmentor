import CompanyMenuHeader from "@/components/company/MenuHeader";
import { yupResolver } from "@hookform/resolvers/yup";
import { ArrowLeft, ChevronRight, Upload, UploadCloud, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { customSelectStyles } from "@/utils/customStyles";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import CompanyCreateSideBar from "@/components/sidebars/company/CompanyCreateSideBar";
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "@/lib/slices/auth.slice";
import { BUSINESS_TYPE, COMPANY_PROFILE_BASIC, newRequest } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { COUNTRY, COUNTRY_CITY, STATE_COUNTRY } from "@/api/master";
import * as Yup from "yup";
import toast from "react-hot-toast";
import useImageUpload from "@/hooks/useImageUpload";
const CompanyStatus = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];
import { companySettingSideList } from "@/constants/dummyData";
const CompanyBasicSchema = Yup.object({
  company_name: Yup.string(),
  first_name: Yup.string(),
  last_name: Yup.string(),
  email: Yup.string(),
  phone_no: Yup.string(),
  created_date: Yup.string(),
  status: Yup.string(),
  username: Yup.string(),
  upload_company_logo: Yup.string(),
  upload_letter_head: Yup.string(),
  address_one: Yup.string(),
  address_two: Yup.string(),
  postal_code: Yup.string(),
});

export default function CompanyGeneral() {
  const [activeItem, setActiveItem] = useState("Company profile");
  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
  };
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const { user } = useUserStore((state) => ({
    user: state.user,
  }));
  const [business_Type, setBusiness_Type] = useState();
  const [status, setStatus] = useState("");
  const [countryId, setCountryId] = useState("");
  const [stateId, setStateId] = useState("");
  const [cityId, setCityId] = useState("");
  const [search, setSearch] = useState("");
  const [selectedLogo, setSelectedLogo] = useState(null);
  const [selectedLogoBlob, setSelectedLogoBlob] = useState(null); // Store binary data
  const [letterHead, setLetterHead] = useState(null);
  const [businessTypes, setBusinessTypes] = useState([]);
  const [companyBasic, SetCompanyBasic] = useState({
    id: "",
    company_name: "",
    first_name: "",
    last_name: "",
    email: "",
    phone_no: "",
    created_date: "",
    status: "",
    username: "",
    upload_company_logo: "",
    upload_letter_head: "",
    address_one: "",
    address_two: "",
    postal_code: "",
  });
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(CompanyBasicSchema),
  });


  function close() {
    SetCompanyBasic({
      id: "",
      company_name: "",
      first_name: "",
      last_name: "",
      email: "",
      phone_no: "",
      created_date: "",
      status: "",
      username: "",
      upload_company_logo: "",
      upload_letter_head: "",
      address_one: "",
      address_two: "",
      postal_code: "",
    });
    setBusiness_Type("");
    setStatus("");
    setStateId("");
    setCountryId("");
    setCityId("");
  }
  // Fetch List
  const { data: companyProfileBasic } = useQuery({
    queryKey: ["companyProfileBasic", user?.id],
    queryFn: () =>
      newRequest
        .get(COMPANY_PROFILE_BASIC, {
          params: {
            user_id: user?.id,
          },
        })

        .then((res) => res.data.original.data[0]),
    enabled: !!user?.id, // Ensure the query only runs if `user.id` is available
  });

  const { data: businessType } = useQuery({
    queryKey: ["businessType", user?.id],
    queryFn: () =>
      newRequest
        .get(BUSINESS_TYPE, {
          params: {
            user_id: user?.id,
          },
        })

        .then((res) => res.data),
    enabled: !!user?.id, // Ensure the query only runs if `user.id` is available
  });

  useEffect(() => {
    if (businessType) {
      // Transform `businessType` data into an array of { value, label } objects
      const formattedBusinessTypes = businessType.map((type) => ({
        value: type.id,
        label: type.bussiness_type_name,
      }));
      setBusinessTypes(formattedBusinessTypes);
    }
  }, [businessType]);

  const { data: countryList } = useQuery({
    queryKey: ["countryList", user?.id],
    queryFn: () =>
      newRequest
        .get(COUNTRY, {
          params: {
            user_id: user?.id,
          },
        })

        .then((res) => res.data),
    enabled: !!user?.id, // Ensure the query only runs if `user.id` is available
  });

  const { data: stateList } = useQuery({
    queryKey: ["stateList", user?.id],
    queryFn: () =>
      newRequest
        .get(STATE_COUNTRY, {
          params: {
            user_id: user?.id,
            country_id: countryId,
          },
        })
        .then((res) => res.data),
    enabled: !!user?.id && !!countryId, // Ensure the query only runs if both `user.id` and `country_id` are available
  });

  const { data: cityList } = useQuery({
    queryKey: ["cityList", user?.id],
    queryFn: () =>
      newRequest
        .get(COUNTRY_CITY, {
          params: {
            user_id: user?.id,
            state_id: stateId,
            search: search,
          },
        })
        .then((res) => res.data),
    enabled: !!user?.id && !!stateId && !!search, // Ensure the query only runs if both `user.id` and `country_id` are available
  });

  useEffect(() => {
    if (companyProfileBasic) {
      SetCompanyBasic({
        company_name: companyProfileBasic?.company_name,
        first_name: companyProfileBasic?.first_name,
        last_name: companyProfileBasic?.last_name,
        email: companyProfileBasic?.email,
        phone_no: companyProfileBasic?.phone_no,
        created_date: companyProfileBasic?.created_date,
        username: companyProfileBasic?.username,
        upload_company_logo: companyProfileBasic?.upload_company_logo,
        upload_letter_head: companyProfileBasic?.upload_letter_head,
        address_one: companyProfileBasic?.address_one,
        address_two: companyProfileBasic?.address_two,
        postal_code: companyProfileBasic.postal_code,
        id: companyProfileBasic?.id,
      });

      setBusiness_Type(companyProfileBasic.business_type.id);
      setStatus(companyProfileBasic?.status);
      setStateId(companyProfileBasic?.state?.id);
      setCountryId(companyProfileBasic?.country?.id);
      setCityId(companyProfileBasic?.city?.id);
    }
  }, [companyProfileBasic]);

  const HandleCompanyBasic = (e) => {
    if (e.target.name == "upload_letter_head") {
      setLetterHead(e.target.files[0]);
    }
    if (e.target.name == "upload_company_logo") {
      return SetCompanyBasic({
        ...companyBasic,
        [e.target.name]: e.target.files[0],
      });
    }
    SetCompanyBasic({
      ...companyBasic,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogoSelect = async (logoSrc) => {
    setSelectedLogo(logoSrc);

    // Fetch the image and convert it to Blob
    try {
      const response = await fetch(logoSrc);
      const blob = await response.blob();
      setSelectedLogoBlob(blob);
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  const handleSubmitLogo = async (e) => {
    e.preventDefault();
    if (!selectedLogoBlob) return;
    setPopupOpen(false);
    setLoader(true);
  };

  const onSubmit = async () => {
    setLoader(true);
    try {
      const formData = new FormData();
      formData.append("company_name", companyBasic.company_name);
      formData.append("first_name", companyBasic.first_name);
      formData.append("last_name", companyBasic.last_name);
      formData.append("email", companyBasic.email);
      formData.append("phone_no", companyBasic.phone_no);
      formData.append("created_date", companyBasic.created_date);
      formData.append("bussines_type", business_Type);
      formData.append("status", status);
      formData.append("username", companyBasic.username);
      if (selectedLogoBlob) {
        formData.append(
          "upload_company_logo",
          selectedLogoBlob, // Blob or File object
          selectedLogo, // Filename
        );
      }
      if (letterHead) {
        formData.append("upload_letter_head", letterHead);
      }
      formData.append("address_one", companyBasic.address_one);
      formData.append("address_two", companyBasic.address_two);
      formData.append("country", countryId);
      formData.append("state", stateId);
      formData.append("city", cityId);
      formData.append("postal_code", companyBasic.postal_code);

      const res = await newRequest.post(
        `${COMPANY_PROFILE_BASIC}`, // URL with dynamic ID
        formData, // formData should be the second argument, which is the request body
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          params: {
            user_id: user?.id,
          },
        },
      );
      if (res) {
        toast.success(res?.data?.message);
        close();
        return navigate(`/admin/company/bank_details/${res.data.data.id}`);
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
      {!companyBasic ? (
        <>
          <CompanyMenuHeader />
          <div className="flex flex-row items-start justify-between gap-3">
            <form className="w-full">
              <div className="mb-3 mt-1 flex items-center justify-between">
                <div className="flex flex-row items-center justify-center gap-2 text-base font-bold text-black">
                  <ArrowLeft
                    onClick={() => history.back()}
                    className="size-4 cursor-pointer"
                  />
                  Company Profile{" "}
                </div>
                <div
                  onClick={handleSubmit(onSubmit)}
                  className="btn flex h-10 min-h-10 min-w-24 items-center rounded bg-hrmprimaryorange text-sm font-medium text-white transition-all duration-500 hover:bg-hrmblue/70"
                >
                  Next
                </div>
              </div>
              <div className="w-full rounded-md bg-white px-5 py-7">
                <Disclosure as="div" className="py-1" defaultOpen={true}>
                  <DisclosureButton className="group flex w-full items-center gap-x-2">
                    <div className="flex size-5 min-w-5 items-center justify-center rounded-full bg-gray-darklight">
                      <ChevronRight className="size-4 group-data-[open]:rotate-90" />
                    </div>
                    <p className="flex flex-row whitespace-nowrap text-sm font-semibold">
                      General details{" "}
                    </p>
                    <div className="h-px w-full bg-gray-light"></div>
                  </DisclosureButton>
                  <DisclosurePanel className="my-4 text-sm/5 text-black/50">
                    <div className="grid w-1/2 grid-cols-2 items-baseline justify-center gap-y-2 rounded-md px-5 py-4">
                      <div className="group col-span-2 flex flex-col space-y-1 px-3 py-1">
                        <label className="label-text">Client ID</label>
                        <input
                          autoComplete="off"
                          name="company_name"
                          type="text"
                          placeholder="Enter Name"
                          className="input-box"
                          value={companyBasic.company_name}
                          onChange={HandleCompanyBasic}
                        />
                        {errors.company_name && (
                          <span className="text-xs font-medium text-red-500">
                            {errors.company_name?.message}
                          </span>
                        )}
                      </div>
                      <div className="group flex flex-col space-y-1 px-3 py-1">
                        <label className="label-text">
                          Account owner first name
                        </label>
                        <input
                          autoComplete="off"
                          type="text"
                          name="first_name"
                          className="input-box"
                          value={companyBasic.first_name}
                          onChange={HandleCompanyBasic}
                        />
                        {errors.ac_owner_firstname && (
                          <span className="text-xs font-medium text-red-500">
                            {errors.ac_owner_firstname?.message}
                          </span>
                        )}
                      </div>
                      <div className="group flex flex-col space-y-1 px-3 py-1">
                        <label className="label-text">
                          Account owner last name
                        </label>
                        <input
                          autoComplete="off"
                          type="text"
                          name="last_name"
                          className="input-box"
                          value={companyBasic.last_name}
                          onChange={HandleCompanyBasic}
                        />
                        {errors.ac_owner_lastname && (
                          <span className="text-xs font-medium text-red-500">
                            {errors.ac_owner_lastname?.message}
                          </span>
                        )}
                      </div>
                      <div className="group flex flex-col space-y-1 px-3 py-1">
                        <label className="label-text">Email address</label>
                        <input
                          autoComplete="off"
                          placeholder="Enter email"
                          type="email"
                          name="email"
                          className="input-box"
                          value={companyBasic.email}
                          onChange={HandleCompanyBasic}
                        />
                        {errors.email_adds && (
                          <span className="text-xs font-medium text-red-500">
                            {errors.email_adds?.message}
                          </span>
                        )}
                      </div>
                      <div className="group flex flex-col space-y-1 px-3 py-1">
                        <label className="label-text">Phone number</label>
                        <input
                          autoComplete="off"
                          type="text"
                          placeholder="Enter number"
                          name="phone_no"
                          className="input-box"
                          value={companyBasic.phone_no}
                          onChange={HandleCompanyBasic}
                        />
                        {errors.ph_nu && (
                          <span className="text-xs font-medium text-red-500">
                            {errors.ph_nu?.message}
                          </span>
                        )}
                      </div>
                      <div className="group flex flex-col space-y-1 px-3 py-1">
                        <label className="label-text">Business type</label>
                        <Controller
                          name="bussines_type"
                          control={control}
                          rules={{ required: true }}
                          render={({ field }) => (
                            <Select
                              {...field}
                              isSearchable={false}
                              styles={customSelectStyles}
                              placeholder="Select"
                              className="input-box"
                              options={businessTypes}
                              value={businessTypes.find(
                                (option) => option.value === business_Type,
                              )}
                              onChange={(selectedOption) => {
                                field.onChange(selectedOption);
                                setBusiness_Type(selectedOption.value);
                              }}
                            />
                          )}
                        />
                      </div>
                      <div className="group flex flex-col space-y-1 px-3 py-1">
                        <label className="label-text">
                          Account created date
                        </label>
                        <input
                          autoComplete="off"
                          type="date"
                          placeholder="Select date"
                          className="input-box"
                          name="created_date pr-2"
                          value={companyBasic.created_date}
                          onChange={HandleCompanyBasic}
                        />
                        {errors.ac_date && (
                          <span className="text-xs font-medium text-red-500">
                            {errors.ac_date?.message}
                          </span>
                        )}
                      </div>
                      <div className="group flex flex-col space-y-1 px-3 py-1">
                        <label className="label-text">Account status</label>
                        <Controller
                          name="status"
                          control={control}
                          rules={{ required: true }}
                          render={({ field }) => (
                            <Select
                              {...field}
                              isSearchable={false}
                              styles={customSelectStyles}
                              placeholder="Select status"
                              className="input-box"
                              options={CompanyStatus}
                              value={CompanyStatus.find(
                                (option) => option.value === status,
                              )}
                              onChange={(selectedOption) => {
                                field.onChange(selectedOption.value);
                                setStatus(selectedOption.value);
                              }}
                            />
                          )}
                        />
                        {errors.status && (
                          <span className="text-xs font-medium text-red-500">
                            {errors.status?.message}
                          </span>
                        )}
                      </div>
                      <div className="group col-span-2 flex flex-col space-y-1 px-3 py-1">
                        <label className="label-text">User Name</label>
                        <input
                          autoComplete="off"
                          type="text"
                          placeholder="Enter Name"
                          className="input-box"
                          value={companyBasic.username}
                          name="username"
                          onChange={HandleCompanyBasic}
                        />
                        {errors.user_name && (
                          <span className="text-xs font-medium text-red-500">
                            {errors.user_name?.message}
                          </span>
                        )}
                      </div>
                      <div className="group flex flex-col space-y-1 px-3 py-1">
                        <label className="label-text">
                          Company Logo (Size)
                        </label>
                        <label
                          htmlFor=""
                          onClick={() => setPopupOpen(true)}
                          className="input-box flex h-10 cursor-pointer items-center justify-center rounded-md border border-dashed bg-gray-darklight"
                        >
                          <div className="flex items-center gap-2">
                            <Upload className="size-5 text-black" />
                            <span className="font-semibold text-black">
                              Upload Logo
                            </span>
                          </div>
                          <input type="file" className="hidden" />
                        </label>
                        {errors.upload_logo && (
                          <span className="text-xs font-medium text-red-500">
                            {errors.upload_logo?.message}
                          </span>
                        )}
                      </div>

                      <div className="group flex flex-col space-y-1 px-3 py-1">
                        <label className="label-text">Letter header</label>
                        <label
                          htmlFor="upload_letter_head"
                          className="input-box flex h-10 cursor-pointer items-center justify-center rounded-md border border-dashed"
                        >
                          <div className="flex items-center gap-2">
                            <UploadCloud />
                            <span className="font-semibold text-textcolor-darkCharcoal">
                              Upload Image
                            </span>
                          </div>
                          <input
                            id="upload_letter_head"
                            onChange={HandleCompanyBasic}
                            type="file"
                            className="hidden"
                            name="upload_letter_head"
                          />
                        </label>
                        {errors.upload_letter_head && (
                          <span className="text-xs font-medium text-red-500">
                            {errors.upload_letter_head?.message}
                          </span>
                        )}
                      </div>
                      <img
                        alt="Authorised Person Signature"
                        className="h-28 rounded-md"
                        src={companyBasic.upload_company_logo}
                      />
                      <img
                        alt="Authorised Person Signature"
                        className="h-28 rounded-md"
                        src={companyBasic.upload_letter_head}
                      />
                    </div>
                  </DisclosurePanel>
                </Disclosure>
                <div className="flex flex-col gap-2.5 pb-7">
                  <Disclosure as="div" className="py-1" defaultOpen={false}>
                    <DisclosureButton className="group flex w-full items-center gap-x-2">
                      <div className="flex size-5 min-w-5 items-center justify-center rounded-full bg-gray-darklight">
                        <ChevronRight className="size-4 group-data-[open]:rotate-90" />
                      </div>
                      <p className="flex flex-row whitespace-nowrap text-sm font-semibold">
                        Address details{" "}
                      </p>
                      <div className="h-px w-full bg-gray-light"></div>
                    </DisclosureButton>
                    <DisclosurePanel className="my-4 text-sm/5 text-black/50">
                      <div className="grid w-1/2 grid-cols-2 items-baseline justify-center gap-y-2 rounded-md px-5 py-4">
                        <div className="group flex flex-col space-y-1 px-3 py-1">
                          <label className="label-text">
                            {" "}
                            Address line 1 details
                          </label>
                          <input
                            autoComplete="off"
                            type="text"
                            placeholder="Enter address"
                            className="input-box"
                            onChange={HandleCompanyBasic}
                            name="address_one"
                            value={companyBasic.address_one}
                          />
                          {errors.address_one && (
                            <span className="text-xs font-medium text-red-500">
                              {errors.address_one?.message}
                            </span>
                          )}
                        </div>
                        <div className="group flex flex-col space-y-1 px-3 py-1">
                          <label className="label-text">
                            {" "}
                            Address line 2 details
                          </label>
                          <input
                            autoComplete="off"
                            type="text"
                            placeholder="Enter address"
                            className="input-box"
                            onChange={HandleCompanyBasic}
                            name="address_two"
                            value={companyBasic.address_two}
                          />
                          {errors.address_two && (
                            <span className="text-xs font-medium text-red-500">
                              {errors.address_two?.message}
                            </span>
                          )}
                        </div>
                        <div className="group flex flex-col space-y-1 px-3 py-1">
                          <label className="label-text"> Country</label>
                          <Controller
                            name="country"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                              <Select
                                {...field}
                                isSearchable={false}
                                styles={customSelectStyles}
                                placeholder="Select"
                                className="input-box"
                                options={countryList}
                                value={countryList.find(
                                  (option) => option.id == countryId,
                                )}
                                onChange={(selectedOption) => {
                                  field.onChange(selectedOption); // Update form state
                                  setCountryId(selectedOption.id); // Trigger any custom logic
                                }}
                              />
                            )}
                          />
                          {errors.contry && (
                            <span className="text-xs font-medium text-red-500">
                              {errors.contry?.message}
                            </span>
                          )}
                        </div>
                        <div className="group flex flex-col space-y-1 px-3 py-1">
                          <label className="label-text">County</label>
                          <Controller
                            name="state"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                              <Select
                                {...field}
                                isSearchable={false}
                                styles={customSelectStyles}
                                placeholder="Select"
                                className="input-box"
                                options={stateList}
                                value={stateList.find(
                                  (option) => option.id == stateId,
                                )}
                                onChange={(selectedOption) => {
                                  field.onChange(selectedOption); // Update form state
                                  setStateId(selectedOption.id); // Trigger any custom logic
                                }}
                              />
                            )}
                          />
                          {errors.state && (
                            <span className="text-xs font-medium text-red-500">
                              {errors.state?.message}
                            </span>
                          )}
                        </div>
                        <div className="group flex flex-col space-y-1 px-3 py-1">
                          <label className="label-text"> City</label>
                          <Controller
                            name="city"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                              <Select
                                {...field}
                                isSearchable={true} // Enable search
                                styles={customSelectStyles}
                                placeholder="Select"
                                className="input-box"
                                options={cityList}
                                value={
                                  cityList?.find(
                                    (option) => option.id === cityId,
                                  ) || null
                                }
                                onChange={(selectedOption) => {
                                  field.onChange(selectedOption); // Update form state
                                  setCityId(selectedOption.id); // Trigger any custom logic
                                }}
                                onInputChange={(inputValue) => {
                                  setSearch(inputValue); // Update the search variable
                                }}
                              />
                            )}
                          />

                          {errors.city && (
                            <span className="text-xs font-medium text-red-500">
                              {errors.city?.message}
                            </span>
                          )}
                        </div>
                        <div className="group flex flex-col space-y-1 px-3 py-1">
                          <label className="label-text"> Postal Code </label>
                          <input
                            autoComplete="off"
                            type="text"
                            placeholder="Enter"
                            className="input-box"
                            onChange={HandleCompanyBasic}
                            name="postal_code"
                            value={companyBasic.postal_code}
                          />
                          {errors.postal_code && (
                            <span className="text-xs font-medium text-red-500">
                              {errors.postal_code?.message}
                            </span>
                          )}
                        </div>
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                </div>
              </div>
            </form>
            <CompanyCreateSideBar stepCounter={1} />
          </div>

          <Dialog
            open={popupOpen}
            as="div"
            className="relative z-10 focus:outline-none"
            onClose={close}
          >
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/20">
              <div className="flex min-h-full items-center justify-center p-4">
                <DialogPanel
                  transition
                  className="data-[closed]:transform-[scale(95%)] w-full max-w-md rounded bg-white/90 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:opacity-0"
                >
                  <div className="mb-7 flex items-center justify-between">
                    <h1 className="text-[0.94rem] font-bold leading-7 text-neutral-700">
                      Choose Logo
                    </h1>
                    <button
                      onClick={close}
                      className="text-lg font-extrabold text-[#00000080]"
                    >
                      <X />
                    </button>
                  </div>
                  {loader ? (
                    <div className="flex min-h-72 w-full items-center justify-center">
                      <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-hrmprimaryorange"></div>
                    </div>
                  ) : (
                    <form
                      onSubmit={handleSubmitLogo}
                      className="grid grid-cols-2 gap-3"
                    >
                      {/* First Logo */}
                      <div className="flex flex-col items-center gap-2">
                        <img
                          src="/assets/images/company/companylogo1.png"
                          alt="logo"
                          className="w-full object-contain"
                        />
                        <input
                          type="radio"
                          name="logo"
                          value="/assets/images/company/companylogo1.png"
                          checked={
                            selectedLogo ===
                            "/assets/images/company/companylogo1.png"
                          }
                          onChange={() =>
                            handleLogoSelect(
                              "/assets/images/company/companylogo1.png",
                            )
                          }
                          className="size-4"
                        />
                      </div>
                      {/* Second Logo */}
                      <div className="flex flex-col items-center gap-6">
                        <img
                          src="/assets/images/company/companylogo2.png"
                          alt="logo"
                          className="w-full object-contain"
                        />
                        <input
                          type="radio"
                          name="logo"
                          value="/assets/images/company/companylogo2.png"
                          checked={
                            selectedLogo ===
                            "/assets/images/company/companylogo2.png"
                          }
                          onChange={() =>
                            handleLogoSelect(
                              "/assets/images/company/companylogo2.png",
                            )
                          }
                          className="size-4"
                        />
                      </div>

                      {/* Action Buttons */}
                      <div className="col-span-2 mt-2 flex w-full flex-row items-center justify-center gap-3">
                        <button
                          type="button"
                          onClick={close}
                          className="flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-black text-sm font-semibold text-black focus:outline-none"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-hrmblack text-sm font-normal text-white focus:outline-none"
                          disabled={loader || !selectedLogo}
                        >
                          {loader ? (
                            <div className="flex items-center gap-3">
                              <div className="h-5 w-full animate-spin rounded-full border-b-2 border-white"></div>
                              Choose Logo
                            </div>
                          ) : (
                            <span>Choose Logo</span>
                          )}
                        </button>
                      </div>
                    </form>
                  )}
                </DialogPanel>
              </div>
            </div>
          </Dialog>
        </>
      ) : (
        <>
          {" "}
          <CompanyMenuHeader />
          <div className="mb-3 mt-1 flex items-center justify-between">
            <div className="flex flex-row items-center justify-center gap-2 text-base font-bold text-black">
              <ArrowLeft
                onClick={() => history.back()}
                className="size-4 cursor-pointer"
              />
              Company Profile{" "}
            </div>
            <div
              onClick={handleSubmit(onSubmit)}
              className="btn flex h-10 min-h-10 min-w-24 items-center rounded bg-hrmprimaryorange text-sm font-medium text-white transition-all duration-500 hover:bg-hrmblue/70"
            >
              Edit
            </div>
          </div>
          <div className="flex flex-row items-start justify-between gap-3">
            <div className="h-screen min-w-64 rounded-md bg-white px-5 py-6">
              <ul className="flex flex-col justify-center gap-5 text-sm text-gray-dark">
                {companySettingSideList?.map((item) => (
                  <li
                    key={item.id}
                    className={`flex items-center gap-x-3 whitespace-nowrap text-sm ${
                      activeItem === item.name
                        ? "font-bold text-hrmprimaryorange"
                        : "font-medium text-gray-dark"
                    }`}
                  >
                    {item.name == "Company profile" ? (
                      <Link
                        to={`${item.link}`} // Properly interpolates the path
                        onClick={() => handleItemClick(item.name)} // Passes the item name to the click handler
                        className="whitespace-nowrap" // Class name applied directly
                      >
                        {item.name}
                      </Link>
                    ) : (
                      <Link
                        to={`${item.link}/${companyBasic.id}`} // Properly interpolates the path
                        onClick={() => handleItemClick(item.name)} // Passes the item name to the click handler
                        className="whitespace-nowrap" // Class name applied directly
                      >
                        {item.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <form className="w-full">
              <div className="w-full rounded-md bg-white px-5 py-7">
                <Disclosure as="div" className="py-1" defaultOpen={true}>
                  <DisclosureButton className="group flex w-full items-center gap-x-2">
                    <div className="flex size-5 min-w-5 items-center justify-center rounded-full bg-gray-darklight">
                      <ChevronRight className="size-4 group-data-[open]:rotate-90" />
                    </div>
                    <p className="flex flex-row whitespace-nowrap text-sm font-semibold">
                      General details{" "}
                    </p>
                    <div className="h-px w-full bg-gray-light"></div>
                  </DisclosureButton>
                  <DisclosurePanel className="my-4 text-sm/5 text-black/50">
                    <div className="grid w-1/2 grid-cols-2 items-baseline justify-center gap-y-2 rounded-md px-5 py-4">
                      <div className="group col-span-2 flex flex-col space-y-1 px-3 py-1">
                        <label className="label-text">Client ID</label>
                        <input
                          autoComplete="off"
                          name="company_name"
                          type="text"
                          placeholder="Enter Name"
                          className="input-box"
                          value={companyBasic.company_name}
                          onChange={HandleCompanyBasic}
                        />
                        {errors.company_name && (
                          <span className="text-xs font-medium text-red-500">
                            {errors.company_name?.message}
                          </span>
                        )}
                      </div>
                      <div className="group flex flex-col space-y-1 px-3 py-1">
                        <label className="label-text">
                          Account owner first name
                        </label>
                        <input
                          autoComplete="off"
                          type="text"
                          name="first_name"
                          className="input-box"
                          value={companyBasic.first_name}
                          onChange={HandleCompanyBasic}
                        />
                        {errors.ac_owner_firstname && (
                          <span className="text-xs font-medium text-red-500">
                            {errors.ac_owner_firstname?.message}
                          </span>
                        )}
                      </div>
                      <div className="group flex flex-col space-y-1 px-3 py-1">
                        <label className="label-text">
                          Account owner last name
                        </label>
                        <input
                          autoComplete="off"
                          type="text"
                          name="last_name"
                          className="input-box"
                          value={companyBasic.last_name}
                          onChange={HandleCompanyBasic}
                        />
                        {errors.ac_owner_lastname && (
                          <span className="text-xs font-medium text-red-500">
                            {errors.ac_owner_lastname?.message}
                          </span>
                        )}
                      </div>
                      <div className="group flex flex-col space-y-1 px-3 py-1">
                        <label className="label-text">Email address</label>
                        <input
                          autoComplete="off"
                          placeholder="Enter email"
                          type="email"
                          name="email"
                          className="input-box"
                          value={companyBasic.email}
                          onChange={HandleCompanyBasic}
                        />
                        {errors.email_adds && (
                          <span className="text-xs font-medium text-red-500">
                            {errors.email_adds?.message}
                          </span>
                        )}
                      </div>
                      <div className="group flex flex-col space-y-1 px-3 py-1">
                        <label className="label-text">Phone number</label>
                        <input
                          autoComplete="off"
                          type="text"
                          placeholder="Enter number"
                          name="phone_no"
                          className="input-box"
                          value={companyBasic.phone_no}
                          onChange={HandleCompanyBasic}
                        />
                        {errors.ph_nu && (
                          <span className="text-xs font-medium text-red-500">
                            {errors.ph_nu?.message}
                          </span>
                        )}
                      </div>
                      <div className="group flex flex-col space-y-1 px-3 py-1">
                        <label className="label-text">Business type</label>
                        <Controller
                          name="bussines_type"
                          control={control}
                          rules={{ required: true }}
                          render={({ field }) => (
                            <Select
                              {...field}
                              isSearchable={false}
                              styles={customSelectStyles}
                              placeholder="Select"
                              className="input-box"
                              options={businessTypes}
                              value={businessTypes.find(
                                (option) => option.value === business_Type,
                              )}
                              onChange={(selectedOption) => {
                                field.onChange(selectedOption);
                                setBusiness_Type(selectedOption.value);
                              }}
                            />
                          )}
                        />
                      </div>
                      <div className="group flex flex-col space-y-1 px-3 py-1">
                        <label className="label-text">
                          Account created date
                        </label>
                        <input
                          autoComplete="off"
                          type="date"
                          placeholder="Select date"
                          className="input-box pr-2"
                          name="created_date"
                          value={companyBasic.created_date}
                          onChange={HandleCompanyBasic}
                        />
                        {errors.ac_date && (
                          <span className="text-xs font-medium text-red-500">
                            {errors.ac_date?.message}
                          </span>
                        )}
                      </div>
                      <div className="group flex flex-col space-y-1 px-3 py-1">
                        <label className="label-text">Account status</label>
                        <Controller
                          name="status"
                          control={control}
                          rules={{ required: true }}
                          render={({ field }) => (
                            <Select
                              {...field}
                              isSearchable={false}
                              styles={customSelectStyles}
                              placeholder="Select status"
                              className="input-box"
                              options={CompanyStatus}
                              value={CompanyStatus.find(
                                (option) => option.value === status,
                              )}
                              onChange={(selectedOption) => {
                                field.onChange(selectedOption.value);
                                setStatus(selectedOption.value);
                              }}
                            />
                          )}
                        />
                        {errors.status && (
                          <span className="text-xs font-medium text-red-500">
                            {errors.status?.message}
                          </span>
                        )}
                      </div>
                      <div className="group col-span-2 flex flex-col space-y-1 px-3 py-1">
                        <label className="label-text">User Name</label>
                        <input
                          autoComplete="off"
                          type="text"
                          placeholder="Enter Name"
                          className="input-box"
                          value={companyBasic.username}
                          name="username"
                          onChange={HandleCompanyBasic}
                        />
                        {errors.user_name && (
                          <span className="text-xs font-medium text-red-500">
                            {errors.user_name?.message}
                          </span>
                        )}
                      </div>
                      <div className="group flex flex-col space-y-1 px-3 py-1">
                        <label className="label-text">
                          Company Logo (Size)
                        </label>
                        <label
                          htmlFor=""
                          onClick={() => setPopupOpen(true)}
                          className="input-box flex h-10 cursor-pointer items-center justify-center rounded-md border border-dashed bg-gray-darklight"
                        >
                          <div className="flex items-center gap-2">
                            <Upload className="size-5 text-black" />
                            <span className="font-semibold text-black">
                              Upload Logo
                            </span>
                          </div>
                          <input type="file" className="hidden" />
                        </label>
                        {errors.upload_logo && (
                          <span className="text-xs font-medium text-red-500">
                            {errors.upload_logo?.message}
                          </span>
                        )}
                      </div>

                      <div className="group flex flex-col space-y-1 px-3 py-1">
                        <label className="label-text">Letter header</label>
                        <label
                          htmlFor="upload_letter_head"
                          className="input-box flex h-10 cursor-pointer items-center justify-center rounded-md border border-dashed"
                        >
                          <div className="flex items-center gap-2">
                            <UploadCloud />
                            <span className="font-semibold text-textcolor-darkCharcoal">
                              Upload Image
                            </span>
                          </div>
                          <input
                            id="upload_letter_head"
                            onChange={HandleCompanyBasic}
                            type="file"
                            className="hidden"
                            name="upload_letter_head"
                          />
                        </label>
                        {errors.upload_letter_head && (
                          <span className="text-xs font-medium text-red-500">
                            {errors.upload_letter_head?.message}
                          </span>
                        )}
                      </div>
                      <img
                        alt="Authorised Person Signature"
                        className="h-28 rounded-md"
                        src={companyBasic.upload_company_logo}
                      />
                      <img
                        alt="Authorised Person Signature"
                        className="h-28 rounded-md"
                        src={companyBasic.upload_letter_head}
                      />
                    </div>
                  </DisclosurePanel>
                </Disclosure>
                <div className="flex flex-col gap-2.5 pb-7">
                  <Disclosure as="div" className="py-1" defaultOpen={false}>
                    <DisclosureButton className="group flex w-full items-center gap-x-2">
                      <div className="flex size-5 min-w-5 items-center justify-center rounded-full bg-gray-darklight">
                        <ChevronRight className="size-4 group-data-[open]:rotate-90" />
                      </div>
                      <p className="flex flex-row whitespace-nowrap text-sm font-semibold">
                        Address details{" "}
                      </p>
                      <div className="h-px w-full bg-gray-light"></div>
                    </DisclosureButton>
                    <DisclosurePanel className="my-4 text-sm/5 text-black/50">
                      <div className="grid w-1/2 grid-cols-2 items-baseline justify-center gap-y-2 rounded-md px-5 py-4">
                        <div className="group flex flex-col space-y-1 px-3 py-1">
                          <label className="label-text">
                            {" "}
                            Address line 1 details
                          </label>
                          <input
                            autoComplete="off"
                            type="text"
                            placeholder="Enter address"
                            className="input-box"
                            onChange={HandleCompanyBasic}
                            name="address_one"
                            value={companyBasic.address_one}
                          />
                          {errors.address_one && (
                            <span className="text-xs font-medium text-red-500">
                              {errors.address_one?.message}
                            </span>
                          )}
                        </div>
                        <div className="group flex flex-col space-y-1 px-3 py-1">
                          <label className="label-text">
                            {" "}
                            Address line 2 details
                          </label>
                          <input
                            autoComplete="off"
                            type="text"
                            placeholder="Enter address"
                            className="input-box"
                            onChange={HandleCompanyBasic}
                            name="address_two"
                            value={companyBasic.address_two}
                          />
                          {errors.address_two && (
                            <span className="text-xs font-medium text-red-500">
                              {errors.address_two?.message}
                            </span>
                          )}
                        </div>
                        <div className="group flex flex-col space-y-1 px-3 py-1">
                          <label className="label-text"> Country</label>
                          <Controller
                            name="country"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                              <Select
                                {...field}
                                isSearchable={false}
                                styles={customSelectStyles}
                                placeholder="Select"
                                className="input-box"
                                options={countryList}
                                value={countryList.find(
                                  (option) => option.id == countryId,
                                )}
                                onChange={(selectedOption) => {
                                  field.onChange(selectedOption); // Update form state
                                  setCountryId(selectedOption.id); // Trigger any custom logic
                                }}
                              />
                            )}
                          />
                          {errors.contry && (
                            <span className="text-xs font-medium text-red-500">
                              {errors.contry?.message}
                            </span>
                          )}
                        </div>
                        <div className="group flex flex-col space-y-1 px-3 py-1">
                          <label className="label-text">County</label>
                          <Controller
                            name="state"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                              <Select
                                {...field}
                                isSearchable={false}
                                styles={customSelectStyles}
                                placeholder="Select"
                                className="input-box"
                                options={stateList}
                                value={stateList.find(
                                  (option) => option.id == stateId,
                                )}
                                onChange={(selectedOption) => {
                                  field.onChange(selectedOption); // Update form state
                                  setStateId(selectedOption.id); // Trigger any custom logic
                                }}
                              />
                            )}
                          />
                          {errors.state && (
                            <span className="text-xs font-medium text-red-500">
                              {errors.state?.message}
                            </span>
                          )}
                        </div>
                        <div className="group flex flex-col space-y-1 px-3 py-1">
                          <label className="label-text"> City</label>
                          <Controller
                            name="city"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                              <Select
                                {...field}
                                isSearchable={true} // Enable search
                                styles={customSelectStyles}
                                placeholder="Select"
                                className="input-box"
                                options={cityList}
                                value={
                                  cityList?.find(
                                    (option) => option.id === cityId,
                                  ) || null
                                }
                                onChange={(selectedOption) => {
                                  field.onChange(selectedOption); // Update form state
                                  setCityId(selectedOption.id); // Trigger any custom logic
                                }}
                                onInputChange={(inputValue) => {
                                  setSearch(inputValue); // Update the search variable
                                }}
                              />
                            )}
                          />

                          {errors.city && (
                            <span className="text-xs font-medium text-red-500">
                              {errors.city?.message}
                            </span>
                          )}
                        </div>
                        <div className="group flex flex-col space-y-1 px-3 py-1">
                          <label className="label-text"> Postal Code </label>
                          <input
                            autoComplete="off"
                            type="text"
                            placeholder="Enter"
                            className="input-box"
                            onChange={HandleCompanyBasic}
                            name="postal_code"
                            value={companyBasic.postal_code}
                          />
                          {errors.postal_code && (
                            <span className="text-xs font-medium text-red-500">
                              {errors.postal_code?.message}
                            </span>
                          )}
                        </div>
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                </div>
              </div>
            </form>
          </div>
          <Dialog
            open={popupOpen}
            as="div"
            className="relative z-10 focus:outline-none"
            onClose={close}
          >
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/20">
              <div className="flex min-h-full items-center justify-center p-4">
                <DialogPanel
                  transition
                  className="data-[closed]:transform-[scale(95%)] w-full max-w-md rounded bg-white/90 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:opacity-0"
                >
                  <div className="mb-7 flex items-center justify-between">
                    <h1 className="text-[0.94rem] font-bold leading-7 text-neutral-700">
                      Choose Logo
                    </h1>
                    <button
                      onClick={close}
                      className="text-lg font-extrabold text-[#00000080]"
                    >
                      <X />
                    </button>
                  </div>
                  {loader ? (
                    <div className="flex min-h-72 w-full items-center justify-center">
                      <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-hrmprimaryorange"></div>
                    </div>
                  ) : (
                    <form
                      onSubmit={handleSubmitLogo}
                      className="grid grid-cols-2 gap-3"
                    >
                      {/* First Logo */}
                      <div className="flex flex-col items-center gap-2">
                        <img
                          src="/assets/images/company/companylogo1.png"
                          alt="logo"
                          className="w-full object-contain"
                        />
                        <input
                          type="radio"
                          name="logo"
                          value="/assets/images/company/companylogo1.png"
                          checked={
                            selectedLogo ===
                            "/assets/images/company/companylogo1.png"
                          }
                          onChange={() =>
                            handleLogoSelect(
                              "/assets/images/company/companylogo1.png",
                            )
                          }
                          className="size-4"
                        />
                      </div>
                      {/* Second Logo */}
                      <div className="flex flex-col items-center gap-6">
                        <img
                          src="/assets/images/company/companylogo2.png"
                          alt="logo"
                          className="w-full object-contain"
                        />
                        <input
                          type="radio"
                          name="logo"
                          value="/assets/images/company/companylogo2.png"
                          checked={
                            selectedLogo ===
                            "/assets/images/company/companylogo2.png"
                          }
                          onChange={() =>
                            handleLogoSelect(
                              "/assets/images/company/companylogo2.png",
                            )
                          }
                          className="size-4"
                        />
                      </div>

                      {/* Action Buttons */}
                      <div className="col-span-2 mt-2 flex w-full flex-row items-center justify-center gap-3">
                        <button
                          type="button"
                          onClick={close}
                          className="flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-black text-sm font-semibold text-black focus:outline-none"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-hrmblack text-sm font-normal text-white focus:outline-none"
                          disabled={loader || !selectedLogo}
                        >
                          {loader ? (
                            <div className="flex items-center gap-3">
                              <div className="h-5 w-full animate-spin rounded-full border-b-2 border-white"></div>
                              Choose Logo
                            </div>
                          ) : (
                            <span>Choose Logo</span>
                          )}
                        </button>
                      </div>
                    </form>
                  )}
                </DialogPanel>
              </div>
            </div>
          </Dialog>
        </>
      )}
    </>
  );
}

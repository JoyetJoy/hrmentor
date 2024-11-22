import CompanyMenuHeader from "@/components/company/MenuHeader";
import { yupResolver } from "@hookform/resolvers/yup";
import { ArrowLeft, ChevronRight, Upload } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { customSelectStyles } from "@/utils/customStyles";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import CompanyCreateSideBar from "@/components/sidebars/company/CompanyCreateSideBar";
import AddLogo from "@/components/popups/company/AddLogo";
import { Link } from "react-router-dom";
import { useUserStore } from "@/lib/slices/auth.slice";
import { BUSINESS_TYPE, COMPANY_PROFILE_BASIC, newRequest } from "@/api";
import { useQuery } from "@tanstack/react-query";

export default function CompanyGeneral() {
  const [loader, setLoader] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const { user } = useUserStore((state) => ({
    user: state.user,
  }));
  const [business_Type, setBusiness_Type] = useState("");
  const [businessTypes, setBusinessTypes] = useState([]);
  const [companyBasic, SetCompanyBasic] = useState({
    company_name: "",
    first_name: "",
    last_name: "",
    email: "",
    phone_no: "",
    bussines_type: "",
    created_date: "",
    status: "",
    username: "",
    upload_company_logo: "",
    upload_letter_head: "",
    address_one: "",
    address_two: "",
    country: "",
    state: "",
    city: "",
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
    resolver: yupResolver(),
  });

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

  useEffect(() => {
    if (companyProfileBasic) {
      SetCompanyBasic({
        company_name: companyProfileBasic?.company_name,
        first_name: companyProfileBasic?.first_name,
        last_name: companyProfileBasic?.last_name,
        email: companyProfileBasic?.email,
        phone_no: companyProfileBasic?.phone_no,
        created_date: companyProfileBasic?.created_date,
        status: companyProfileBasic?.status,
        username: companyProfileBasic?.username,
        upload_company_logo: companyProfileBasic?.upload_company_logo,
        upload_letter_head: companyProfileBasic?.upload_letter_head,
        address_one: companyProfileBasic?.address_one,
        address_two: companyProfileBasic?.address_two,
        country: companyProfileBasic?.country?.id,
        state: companyProfileBasic?.state?.id,
        city: companyProfileBasic?.city?.id,
        postal_code: companyProfileBasic.postal_code,
      });
      setBusiness_Type(companyProfileBasic?.bussines_type?.id);
    }
  }, [companyProfileBasic]);

  const HandleCompanyBasic = (e) => {
    console.log(e);

    // if (e.target.name === "image") {
    //   return setEditIntroBanner({
    //     ...editIntroBanner,
    //     [e.target.name]: e.target.files[0],
    //   });
    // }
    SetCompanyBasic({
      ...companyBasic,
      [e.target.name]: e.target.value,
    });
  };


  return (
    <>
      <AddLogo popupOpen={popupOpen} setPopupOpen={setPopupOpen} />
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
            <Link
              to="/admin/company/bank_details"
              className="btn flex h-10 min-h-10 min-w-24 items-center rounded bg-hrmprimaryorange text-sm font-medium text-white transition-all duration-500 hover:bg-hrmblue/70"
            >
              Next
            </Link>
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
                    <label className="label-text">Company Name</label>
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
                            (option) => option.value == business_Type,
                          )}
                          onChange={(selectedOption) => {
                            field.onChange(selectedOption); // Update form state
                            setBusiness_Type(selectedOption.value); // Trigger any custom logic
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="group flex flex-col space-y-1 px-3 py-1">
                    <label className="label-text">Account created date</label>
                    <input
                      autoComplete="off"
                      type="date"
                      placeholder="Select date"
                      className="input-box"
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
                      name="ac_status"
                      control={control}
                      rules={{ required: true }}
                      onChange={HandleCompanyBasic}
                      render={({ field }) => (
                        <Select
                          {...field}
                          isSearchable={false}
                          styles={customSelectStyles}
                          placeholder="Select status"
                          className="input-box"
                        />
                      )}
                    />
                    {errors.ac_status && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.ac_status?.message}
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
                    <label className="label-text">Company Logo(Size)</label>
                    <label
                      htmlFor=""
                      onClick={() => {
                        setPopupOpen(true);
                      }}
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
                      htmlFor=""
                      className="input-box flex h-10 cursor-pointer items-center justify-center rounded-md border border-dashed bg-gray-darklight"
                    >
                      <div className="flex items-center gap-2">
                        <Upload className="size-5 text-black" />
                        <span className="font-semibold text-black">
                          Upload Letter header
                        </span>
                      </div>
                      <input type="file" className="hidden" />
                    </label>
                    {errors.upload_letter_header && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.upload_letter_header?.message}
                      </span>
                    )}
                  </div>
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
                        name="contry"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            isSearchable={false}
                            styles={customSelectStyles}
                            placeholder="Select status"
                            className="input-box"
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
                            placeholder="Select status"
                            className="input-box"
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
                      <input
                        autoComplete="off"
                        type="text"
                        placeholder="Enter"
                        className="input-box"
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
    </>
  );
}

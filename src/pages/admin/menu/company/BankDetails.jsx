import CompanyMenuHeader from "@/components/company/MenuHeader";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { ArrowLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { Controller, useForm } from "react-hook-form";
import { customSelectStyles } from "@/utils/customStyles";
import CompanyCreateSideBar from "@/components/sidebars/company/CompanyCreateSideBar";
import { useNavigate, useParams } from "react-router-dom";
import { useUserStore } from "@/lib/slices/auth.slice";
import { COMPANY_BANK_DETAILS, newRequest } from "@/api";
import { useQuery } from "@tanstack/react-query";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { companySettingSideList } from "@/constants/dummyData";
import { Link } from "react-router-dom";

const PaymentStatus = [
  { value: "some", label: "Some" },
  { value: "new", label: "New" },
];

const CompanyBankSchema = Yup.object({
  bank_name: Yup.string(),
  branch: Yup.string(),
  ifsc_code: Yup.string(),
  account_no: Yup.string(),
  pan_numner: Yup.string(),
  tan_number: Yup.string(),
  tds_code: Yup.string(),
  deductor_father_name: Yup.string(),
  account_holder_name: Yup.string(),
  sort_code: Yup.string(),
  swift_code: Yup.string(),
  iban_no: Yup.string(),
  company_profile_id: Yup.string(),
});

export default function CompanyBankDetails() {
  const [activeItem, setActiveItem] = useState(
    "Organisation bank and tax details",
  );
  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
  };
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const { user } = useUserStore((state) => ({
    user: state.user,
  }));
  const { id } = useParams();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(CompanyBankSchema),
  });
  const [edit, setEdit] = useState("");
  const [taxPayment, setTaxPayment] = useState("");
  const [diductorName, setDiductorname] = useState("");
  const [bankDetails, SetBankDetails] = useState({
    bank_name: "",
    branch: "",
    ifsc_code: "",
    account_no: "",
    pan_numner: "",
    tan_number: "",
    tds_code: "",
    deductor_father_name: "",
    account_holder_name: "",
    sort_code: "",
    swift_code: "",
    iban_no: "",
    company_profile_id: "",
  });

  function close() {
    SetBankDetails({
      bank_name: "",
      branch: "",
      ifsc_code: "",
      account_no: "",
      pan_numner: "",
      tan_number: "",
      tds_code: "",
      deductor_father_name: "",
      account_holder_name: "",
      sort_code: "",
      swift_code: "",
      iban_no: "",
      company_profile_id: "",
    });
    setTaxPayment("");
    setDiductorname("");
    setEdit("");
  }

  const { data: companyBankDetails } = useQuery({
    queryKey: ["companyBankDetails", user?.id],
    queryFn: () =>
      newRequest
        .get(COMPANY_BANK_DETAILS, {
          params: {
            user_id: user?.id,
          },
        })

        .then((res) => res.data.original.data[0]),
    enabled: !!user?.id, // Ensure the query only runs if `user.id` is available
  });

  useEffect(() => {
    if (companyBankDetails) {
      SetBankDetails({
        bank_name: companyBankDetails.bank_name,
        branch: companyBankDetails.branch,
        ifsc_code: companyBankDetails.ifsc_code,
        account_no: companyBankDetails.account_no,
        pan_numner: companyBankDetails.pan_numner,
        tan_number: companyBankDetails.tan_number,
        tds_code: companyBankDetails.tds_code,
        deductor_father_name: companyBankDetails.deductor_father_name,
        account_holder_name: companyBankDetails.account_holder_name,
        sort_code: companyBankDetails.sort_code,
        swift_code: companyBankDetails.swift_code,
        iban_no: companyBankDetails.iban_no,
        company_profile_id: companyBankDetails.company_profile_id,
      });
      setTaxPayment(companyBankDetails.tax_payment);
      setDiductorname(companyBankDetails.deductor_name);
    }
  }, [companyBankDetails]);

  const HandleCompanyBasic = (e) => {
    SetBankDetails({
      ...bankDetails,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async () => {
    setLoader(true);
    try {
      const formData = {
        bank_name: bankDetails.bank_name,
        branch: bankDetails.branch,
        ifsc_code: bankDetails.ifsc_code,
        account_no: bankDetails.account_no,
        pan_numner: bankDetails.pan_numner,
        tan_number: bankDetails.tan_number,
        tds_code: bankDetails.tds_code,
        deductor_father_name: bankDetails.deductor_father_name,
        account_holder_name: bankDetails.account_holder_name,
        sort_code: bankDetails.sort_code,
        swift_code: bankDetails.swift_code,
        iban_no: bankDetails.iban_no,
        company_profile_id: id,
        tax_payment: taxPayment,
        deductor_name: diductorName,
      };

      const res = await newRequest.post(
        `${COMPANY_BANK_DETAILS}`, // URL with dynamic ID
        formData, // formData should be the second argument, which is the request body
        {
          params: {
            user_id: user?.id,
          },
        },
      );
      console.log(res);

      if (res) {
        toast.success(res?.data?.message);
        close();
        return navigate(`/admin/company/signatory/${id}`);
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
      {!bankDetails ? (
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
              <div className="h-screen w-full rounded-md bg-white px-5 py-7">
                <Disclosure as="div" className="py-1" defaultOpen={true}>
                  <DisclosureButton className="group flex w-full items-center gap-x-2">
                    <div className="flex size-5 min-w-5 items-center justify-center rounded-full bg-gray-darklight">
                      <ChevronRight className="size-4 group-data-[open]:rotate-90" />
                    </div>
                    <p className="flex flex-row whitespace-nowrap text-sm font-semibold">
                      Bank account details
                    </p>
                    <div className="h-px w-full bg-gray-light"></div>
                  </DisclosureButton>
                  <DisclosurePanel>
                    <div className="grid w-1/2 grid-cols-2 items-baseline justify-center gap-y-2 rounded-md px-5 py-4">
                      <div className="group flex flex-col space-y-1 px-3 py-1">
                        <label className="label-text">Bank Name</label>
                        <input
                          autoComplete="off"
                          type="text"
                          className="input-box"
                          name="bank_name"
                          value={bankDetails.bank_name}
                          onChange={HandleCompanyBasic}
                        />
                        {errors.bank_name && (
                          <span className="text-xs font-medium text-red-500">
                            {errors.bank_name?.message}
                          </span>
                        )}
                      </div>
                      <div className="group flex flex-col space-y-1 px-3 py-1">
                        <label className="label-text">Branch</label>
                        <input
                          autoComplete="off"
                          type="text"
                          name="branch"
                          value={bankDetails.branch}
                          onChange={HandleCompanyBasic}
                          className="input-box"
                        />
                        {errors.branch && (
                          <span className="text-xs font-medium text-red-500">
                            {errors.branch?.message}
                          </span>
                        )}
                      </div>
                      <div className="group flex flex-col space-y-1 px-3 py-1">
                        <label className="required label-text">
                          Account Number
                        </label>
                        <input
                          autoComplete="off"
                          type="text"
                          name="account_no"
                          value={bankDetails.account_no}
                          onChange={HandleCompanyBasic}
                          className="input-box"
                        />
                        {errors.account_no && (
                          <span className="text-xs font-medium text-red-500">
                            {errors.account_no?.message}
                          </span>
                        )}
                      </div>
                      <div className="group flex flex-col space-y-1 px-3 py-1">
                        <label className="required label-text">
                          Acc Holder Name
                        </label>
                        <input
                          autoComplete="off"
                          type="text"
                          name="account_holder_name"
                          value={bankDetails.account_holder_name}
                          onChange={HandleCompanyBasic}
                          className="input-box"
                        />
                        {errors.account_holder_name && (
                          <span className="text-xs font-medium text-red-500">
                            {errors.account_holder_name?.message}
                          </span>
                        )}
                      </div>
                      <div className="group flex flex-col space-y-1 px-3 py-1">
                        <label className="required label-text">Sort Code</label>
                        <input
                          autoComplete="off"
                          type="text"
                          name="sort_code"
                          value={bankDetails.sort_code}
                          onChange={HandleCompanyBasic}
                          className="input-box"
                        />
                        {errors.sort_code && (
                          <span className="text-xs font-medium text-red-500">
                            {errors.sort_code?.message}
                          </span>
                        )}
                      </div>

                      <div className="group flex flex-col space-y-1 px-3 py-1">
                        <label className="label-text">Swift Code</label>
                        <input
                          autoComplete="off"
                          type="text"
                          name="swift_code"
                          value={bankDetails.swift_code}
                          onChange={HandleCompanyBasic}
                          className="input-box"
                        />
                        {errors.swift_code && (
                          <span className="text-xs font-medium text-red-500">
                            {errors.swift_code?.message}
                          </span>
                        )}
                      </div>
                      <div className="group col-span-2 flex flex-col space-y-1 px-3 py-1">
                        <label className="label-text">IBAN Number</label>
                        <input
                          autoComplete="off"
                          type="text"
                          name="iban_no"
                          value={bankDetails.iban_no}
                          onChange={HandleCompanyBasic}
                          className="input-box"
                        />
                        {errors.iban_num && (
                          <span className="text-xs font-medium text-red-500">
                            {errors.iban_num?.message}
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
                        Tax Details{" "}
                      </p>
                      <div className="h-px w-full bg-gray-light"></div>
                    </DisclosureButton>
                    <DisclosurePanel className="my-4 text-sm/5 text-black/50">
                      <div className="grid w-1/2 grid-cols-2 items-baseline justify-center gap-y-2 rounded-md px-5 py-4">
                        <div className="group flex flex-col space-y-1 px-3 py-1">
                          <label className="label-text"> PAN</label>
                          <input
                            autoComplete="off"
                            type="text"
                            name="pan_numner"
                            value={bankDetails.pan_numner}
                            onChange={HandleCompanyBasic}
                            className="input-box"
                          />
                          {errors.pan_number && (
                            <span className="text-xs font-medium text-red-500">
                              {errors.pan_number?.message}
                            </span>
                          )}
                        </div>
                        <div className="group flex flex-col space-y-1 px-3 py-1">
                          <label className="label-text">TAN </label>
                          <input
                            autoComplete="off"
                            type="text"
                            name="tan_number"
                            value={bankDetails.tan_number}
                            onChange={HandleCompanyBasic}
                            className="input-box"
                          />
                          {errors.tan_num && (
                            <span className="text-xs font-medium text-red-500">
                              {errors.tan_num?.message}
                            </span>
                          )}
                        </div>
                        <div className="group flex flex-col space-y-1 px-3 py-1">
                          <label className="label-text"> TDS Circle/AO </label>
                          <input
                            autoComplete="off"
                            type="text"
                            name="tds_code"
                            value={bankDetails.tds_code}
                            onChange={HandleCompanyBasic}
                            className="input-box"
                          />
                          {errors.tds_code && (
                            <span className="text-xs font-medium text-red-500">
                              {errors.tds_code?.message}
                            </span>
                          )}
                        </div>
                        <div className="group flex flex-col space-y-1 px-3 py-1">
                          <label className="label-text">
                            TAX Payment frequency
                          </label>
                          <Controller
                            name="tax_payment"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                              <Select
                                {...field}
                                isSearchable={false}
                                styles={customSelectStyles}
                                options={PaymentStatus}
                                placeholder="Select "
                                className="input-box"
                                value={PaymentStatus.find(
                                  (option) => option.value === taxPayment,
                                )}
                                onChange={(selectedOption) => {
                                  field.onChange(selectedOption);
                                  setTaxPayment(selectedOption.value);
                                }}
                              />
                            )}
                          />
                        </div>
                        <div className="group flex flex-col space-y-1 px-3 py-1">
                          <label className="label-text"> Deductor name</label>
                          <Controller
                            name="deductor_name"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                              <Select
                                {...field}
                                isSearchable={false}
                                styles={customSelectStyles}
                                options={PaymentStatus}
                                placeholder="Select "
                                className="input-box"
                                value={PaymentStatus.find(
                                  (option) => option.value === diductorName,
                                )}
                                onChange={(selectedOption) => {
                                  field.onChange(selectedOption);
                                  setDiductorname(selectedOption.value);
                                }}
                              />
                            )}
                          />
                          {errors.deductor_name && (
                            <span className="text-xs font-medium text-red-500">
                              {errors.deductor_name?.message}
                            </span>
                          )}
                        </div>
                        <div className="group flex flex-col space-y-1 px-3 py-1">
                          <label className="label-text">
                            Deductor father name
                          </label>
                          <input
                            autoComplete="off"
                            type="text"
                            placeholder="Enter"
                            name="deductor_father_name"
                            value={bankDetails.deductor_father_name}
                            onChange={HandleCompanyBasic}
                            className="input-box"
                          />
                          {errors.deductor_father_name && (
                            <span className="text-xs font-medium text-red-500">
                              {errors.deductor_father_name?.message}
                            </span>
                          )}
                        </div>
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                </div>
              </div>
            </form>
            <CompanyCreateSideBar stepCounter={2} />
          </div>
        </>
      ) : (
        <>
          <CompanyMenuHeader />
          <div className="mb-3 mt-1 flex items-center justify-between">
            <div className="flex flex-row items-center justify-center gap-2 text-base font-bold text-black">
              <ArrowLeft
                onClick={() => history.back()}
                className="size-4 cursor-pointer"
              />
              Company Profile{" "}
            </div>
            <div className="flex">
              <button
                onClick={() => setEdit(edit == "edit" ? "" : "edit")}
                className="btn flex h-10 min-h-10 min-w-24 items-center rounded bg-hrmprimaryorange text-sm font-medium text-white transition-all duration-500 hover:bg-hrmblue/70"
              >
                Edit
              </button>
              <button
                onClick={handleSubmit(onSubmit)}
                className="btn flex h-10 min-h-10 min-w-24 items-center rounded bg-hrmprimaryorange text-sm font-medium text-white transition-all duration-500 hover:bg-hrmblue/70"
              >
                Next
              </button>
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
                        to={`${item.link}/${id}`} // Properly interpolates the path
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
              <div className="h-screen w-full rounded-md bg-white px-5 py-7">
                <Disclosure as="div" className="py-1" defaultOpen={true}>
                  <DisclosureButton className="group flex w-full items-center gap-x-2">
                    <div className="flex size-5 min-w-5 items-center justify-center rounded-full bg-gray-darklight">
                      <ChevronRight className="size-4 group-data-[open]:rotate-90" />
                    </div>
                    <p className="flex flex-row whitespace-nowrap text-sm font-semibold">
                      Bank account details
                    </p>
                    <div className="h-px w-full bg-gray-light"></div>
                  </DisclosureButton>
                  <DisclosurePanel>
                    <div className="grid w-1/2 grid-cols-2 items-baseline justify-center gap-y-2 rounded-md px-5 py-4">
                      <div className="group flex flex-col space-y-1 px-3 py-1">
                        <label className="label-text">Bank Name</label>
                        <input
                          autoComplete="off"
                          type="text"
                          className="input-box"
                          name="bank_name"
                          value={bankDetails.bank_name}
                          onChange={HandleCompanyBasic}
                          disabled={edit !== "edit"} // Disable input if edit is not "edit"
                        />
                        {errors.bank_name && (
                          <span className="text-xs font-medium text-red-500">
                            {errors.bank_name?.message}
                          </span>
                        )}
                      </div>
                      <div className="group flex flex-col space-y-1 px-3 py-1">
                        <label className="label-text">Branch</label>
                        <input
                          autoComplete="off"
                          type="text"
                          name="branch"
                          value={bankDetails.branch}
                          onChange={HandleCompanyBasic}
                          className="input-box"
                          disabled={edit !== "edit"} // Disable input if edit is not "edit"
                        />
                        {errors.branch && (
                          <span className="text-xs font-medium text-red-500">
                            {errors.branch?.message}
                          </span>
                        )}
                      </div>
                      <div className="group flex flex-col space-y-1 px-3 py-1">
                        <label className="required label-text">
                          Account Number
                        </label>
                        <input
                          autoComplete="off"
                          type="text"
                          name="account_no"
                          value={bankDetails.account_no}
                          onChange={HandleCompanyBasic}
                          className="input-box"
                          disabled={edit !== "edit"} // Disable input if edit is not "edit"
                        />
                        {errors.account_no && (
                          <span className="text-xs font-medium text-red-500">
                            {errors.account_no?.message}
                          </span>
                        )}
                      </div>
                      <div className="group flex flex-col space-y-1 px-3 py-1">
                        <label className="required label-text">
                          Acc Holder Name
                        </label>
                        <input
                          autoComplete="off"
                          type="text"
                          name="account_holder_name"
                          value={bankDetails.account_holder_name}
                          onChange={HandleCompanyBasic}
                          className="input-box"
                          disabled={edit !== "edit"} // Disable input if edit is not "edit"
                        />
                        {errors.account_holder_name && (
                          <span className="text-xs font-medium text-red-500">
                            {errors.account_holder_name?.message}
                          </span>
                        )}
                      </div>
                      <div className="group flex flex-col space-y-1 px-3 py-1">
                        <label className="required label-text">Sort Code</label>
                        <input
                          autoComplete="off"
                          type="text"
                          name="sort_code"
                          value={bankDetails.sort_code}
                          onChange={HandleCompanyBasic}
                          className="input-box"
                          disabled={edit !== "edit"} // Disable input if edit is not "edit"
                        />
                        {errors.sort_code && (
                          <span className="text-xs font-medium text-red-500">
                            {errors.sort_code?.message}
                          </span>
                        )}
                      </div>

                      <div className="group flex flex-col space-y-1 px-3 py-1">
                        <label className="label-text">Swift Code</label>
                        <input
                          autoComplete="off"
                          type="text"
                          name="swift_code"
                          value={bankDetails.swift_code}
                          onChange={HandleCompanyBasic}
                          className="input-box"
                          disabled={edit !== "edit"} // Disable input if edit is not "edit"
                        />
                        {errors.swift_code && (
                          <span className="text-xs font-medium text-red-500">
                            {errors.swift_code?.message}
                          </span>
                        )}
                      </div>
                      <div className="group col-span-2 flex flex-col space-y-1 px-3 py-1">
                        <label className="label-text">IBAN Number</label>
                        <input
                          autoComplete="off"
                          type="text"
                          name="iban_no"
                          value={bankDetails.iban_no}
                          onChange={HandleCompanyBasic}
                          className="input-box"
                          disabled={edit !== "edit"} // Disable input if edit is not "edit"
                        />
                        {errors.iban_num && (
                          <span className="text-xs font-medium text-red-500">
                            {errors.iban_num?.message}
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
                        Tax Details{" "}
                      </p>
                      <div className="h-px w-full bg-gray-light"></div>
                    </DisclosureButton>
                    <DisclosurePanel className="my-4 text-sm/5 text-black/50">
                      <div className="grid w-1/2 grid-cols-2 items-baseline justify-center gap-y-2 rounded-md px-5 py-4">
                        <div className="group flex flex-col space-y-1 px-3 py-1">
                          <label className="label-text"> PAN</label>
                          <input
                            autoComplete="off"
                            type="text"
                            name="pan_numner"
                            value={bankDetails.pan_numner}
                            onChange={HandleCompanyBasic}
                            className="input-box"
                            disabled={edit !== "edit"} // Disable input if edit is not "edit"
                          />
                          {errors.pan_number && (
                            <span className="text-xs font-medium text-red-500">
                              {errors.pan_number?.message}
                            </span>
                          )}
                        </div>
                        <div className="group flex flex-col space-y-1 px-3 py-1">
                          <label className="label-text">TAN </label>
                          <input
                            autoComplete="off"
                            type="text"
                            name="tan_number"
                            value={bankDetails.tan_number}
                            onChange={HandleCompanyBasic}
                            className="input-box"
                            disabled={edit !== "edit"} // Disable input if edit is not "edit"
                          />
                          {errors.tan_num && (
                            <span className="text-xs font-medium text-red-500">
                              {errors.tan_num?.message}
                            </span>
                          )}
                        </div>
                        <div className="group flex flex-col space-y-1 px-3 py-1">
                          <label className="label-text"> TDS Circle/AO </label>
                          <input
                            autoComplete="off"
                            type="text"
                            name="tds_code"
                            value={bankDetails.tds_code}
                            onChange={HandleCompanyBasic}
                            className="input-box"
                            disabled={edit !== "edit"} // Disable input if edit is not "edit"
                          />
                          {errors.tds_code && (
                            <span className="text-xs font-medium text-red-500">
                              {errors.tds_code?.message}
                            </span>
                          )}
                        </div>
                        <div className="group flex flex-col space-y-1 px-3 py-1">
                          <label className="label-text">
                            TAX Payment frequency
                          </label>
                          <Controller
                            name="tax_payment"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                              <Select
                                {...field}
                                isSearchable={false}
                                styles={customSelectStyles}
                                options={PaymentStatus}
                                placeholder="Select "
                                className="input-box"
                                value={PaymentStatus.find(
                                  (option) => option.value === taxPayment,
                                )}
                                onChange={(selectedOption) => {
                                  field.onChange(selectedOption);
                                  setTaxPayment(selectedOption.value);
                                }}
                                isDisabled={edit !== "edit"} // Disable input if edit is not "edit"
                              />
                            )}
                          />
                        </div>
                        <div className="group flex flex-col space-y-1 px-3 py-1">
                          <label className="label-text"> Deductor name</label>
                          <Controller
                            name="deductor_name"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                              <Select
                                {...field}
                                isSearchable={false}
                                styles={customSelectStyles}
                                options={PaymentStatus}
                                placeholder="Select "
                                className="input-box"
                                value={PaymentStatus.find(
                                  (option) => option.value === diductorName,
                                )}
                                onChange={(selectedOption) => {
                                  field.onChange(selectedOption);
                                  setDiductorname(selectedOption.value);
                                }}
                                isDisabled={edit !== "edit"} // Disable input if edit is not "edit"
                              />
                            )}
                          />
                          {errors.deductor_name && (
                            <span className="text-xs font-medium text-red-500">
                              {errors.deductor_name?.message}
                            </span>
                          )}
                        </div>
                        <div className="group flex flex-col space-y-1 px-3 py-1">
                          <label className="label-text">
                            Deductor father name
                          </label>
                          <input
                            autoComplete="off"
                            type="text"
                            placeholder="Enter"
                            name="deductor_father_name"
                            value={bankDetails.deductor_father_name}
                            onChange={HandleCompanyBasic}
                            className="input-box"
                            disabled={edit !== "edit"} // Disable input if edit is not "edit"
                          />
                          {errors.deductor_father_name && (
                            <span className="text-xs font-medium text-red-500">
                              {errors.deductor_father_name?.message}
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
        </>
      )}
    </>
  );
}

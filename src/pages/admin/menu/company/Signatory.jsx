import { COMPANY_SIGNATURE, newRequest } from "@/api";
import CompanyMenuHeader from "@/components/company/MenuHeader";
import CompanyCreateSideBar from "@/components/sidebars/company/CompanyCreateSideBar";
import { useUserStore } from "@/lib/slices/auth.slice";
import { yupResolver } from "@hookform/resolvers/yup";
import { ArrowLeft, ChevronRight, Upload } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

const CompanySignatorySchema = Yup.object({
  authorised_name: Yup.string(),
});

export default function CompanySignatory() {
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const { user } = useUserStore((state) => ({
    user: state.user,
  }));
  const { id } = useParams();
  const [companySignature, SetCompanySignature] = useState({
    authorised_name: "",
    authorised_signature: "",
  });
  const [selectedLogo, setSelectedLogo] = useState(null);
  function close() {
    SetCompanySignature({
      authorised_name: "",
      authorised_signature: "",
    });
  }

  const {
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(CompanySignatorySchema),
  });

  const { data: companySignatoryDetails } = useQuery({
    queryKey: ["companySignatoryDetails", user?.id],
    queryFn: () =>
      newRequest
        .get(COMPANY_SIGNATURE, {
          params: {
            user_id: user?.id,
          },
        })

        .then((res) => res.data.original.data[0]),
    enabled: !!user?.id, // Ensure the query only runs if `user.id` is available
  });

  useEffect(() => {
    if (companySignatoryDetails) {
      SetCompanySignature({
        authorised_name: companySignatoryDetails.authorised_name,
      });
      setSelectedLogo(companySignatoryDetails.authorised_signature);
    }
  }, [companySignatoryDetails]);

  const HandleCompanySignature = (e) => {
    SetCompanySignature({
      ...companySignature,
      [e.target.name]: e.target.value,
    });
  };
  const handleLogoSelect = async (event) => {
    setSelectedLogo(event.target.files[0]);
  };

  const onSubmit = async () => {
    setLoader(true);
    try {
      const formData = new FormData();
      formData.append("authorised_name", companySignature.authorised_name);
      formData.append("authorised_signature", selectedLogo);
      formData.append("company_profile_id", id);

      const res = await newRequest.post(
        `${COMPANY_SIGNATURE}`, // URL with dynamic ID
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
        return navigate(`/admin/company/calender/${id}`);
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
            <div className="group flex w-full items-center gap-x-2">
              <div className="flex size-5 min-w-5 items-center justify-center rounded-full bg-gray-darklight">
                <ChevronRight className="size-4 group-data-[open]:rotate-90" />
              </div>
              <p className="flex flex-row whitespace-nowrap text-sm font-semibold">
                Company Signatory
              </p>
              <div className="h-px w-full bg-gray-light"></div>
            </div>
            <div className="grid grid-cols-1 items-baseline justify-center gap-y-2 rounded-md px-5 py-4">
              <div className="group flex w-1/3 flex-col space-y-1 px-3 py-1">
                <label className="label-text">Authorised Person Name</label>
                <input
                  autoComplete="off"
                  type="text"
                  className="input-box"
                  name="authorised_name"
                  value={companySignature.authorised_name}
                  onChange={HandleCompanySignature}
                />
                {errors.authorised_name && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.authorised_name?.message}
                  </span>
                )}
              </div>
              <div className="group flex w-1/3 flex-col space-y-1 px-3 py-1">
                <label className="label-text">
                  Authorised Person Signature(90px*150px)
                </label>
                <label
                  htmlFor="authorised_signature"
                  className="input-box flex h-10 cursor-pointer items-center justify-center rounded-md border border-dashed bg-gray-darklight"
                >
                  <div className="flex items-center gap-2">
                    <Upload className="size-5 text-black" />
                    <span className="font-semibold text-black">
                      Upload Signature
                    </span>
                  </div>
                  <input
                    id="authorised_signature"
                    onChange={handleLogoSelect}
                    type="file"
                    className="hidden"
                    name="authorised_signature"
                  />
                </label>
              </div>
              <div className="group flex w-1/3 flex-col space-y-1 px-3 py-1">
                <label className="label-text">
                  Authorised Person Signature
                </label>

                <img
                  alt="Authorised Person Signature"
                  className="h-28 rounded-md"
                  src={selectedLogo}
                />
              </div>
            </div>
          </div>
        </form>
        <CompanyCreateSideBar stepCounter={3} />
      </div>
    </>
  );
}

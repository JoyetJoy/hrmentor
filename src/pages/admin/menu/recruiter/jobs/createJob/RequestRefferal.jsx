import MenuHeader from "@/components/common/MenuHeader";
import CreateJobSideBar from "@/components/sidebars/recruiter/CreateJobSideBar";
import QueryTable from "@/components/table/QueryTable";
import { ArrowLeft, Facebook, Link2, Linkedin, Twitter } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import ReactQuill from "react-quill";
import { useLocation, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { customSelectStyles } from "@/utils/customStyles";
import { recJobReferSchema } from "@/schema/dashboard/recruiter/job/applicationQuestion.schema";
import { ACTIVE_EMPLOYEE, newRequest } from "@/api";
import toast from "react-hot-toast";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useEmployeeMaster from "@/hooks/useEmployeeMasters";
import { JOB_REFER } from "@/api/recruiter";
import Loader from "@/components/ui/Loader";

export const RecRequestRefferal = () => {
  const queryClient = useQueryClient();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const jid = searchParams.get("jid");
  const [keyword, setKeyword] = useState("");
  const [totalPages, setTotalPages] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const pageLimit = 10;

  // Fetch List
  const { data: recJobRefferals, isLoading } = useQuery({
    queryKey: ["recJobRefferals", currentPage, jid, keyword],
    queryFn: () =>
      newRequest
        .get(`${JOB_REFER}/${jid}`, {
          params: {
            search: keyword,
            page: currentPage,
            per_limit: pageLimit,
          },
        })
        .then((res) => {
          return res.data;
        }),
  });
  console.log(recJobRefferals);

  useEffect(() => {
    if (recJobRefferals) {
      setTotalPages(recJobRefferals?.last_page);
    }
  }, [recJobRefferals]);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    mode: "on",
    reValidateMode: "onChange",
    resolver: yupResolver(recJobReferSchema),
  });

  const { data: recipientList } = useEmployeeMaster(
    ACTIVE_EMPLOYEE,
    "recipientList",
  );
  const [description, setDescription] = useState("");

  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  // const location = useLocation();
  const columns = React.useMemo(
    () => [
      {
        header: "Job Title",
        accessorKey: "job_title",
        cell: ({ row }) => <div>{row?.original?.job_name?.job_title}</div>,
      },

      {
        header: "Receipts",
        accessorKey: "work_email",
        cell: ({ row }) => (
          <div>{row?.original?.employee_name?.work_email}</div>
        ),
      },
      {
        header: "Subject ",
        accessorKey: "subject",
      },
    ],
    [],
  );

  const onSubmit = (data) => {
    setLoader(true);
    handleEmployee(data);
  };

  const handleEmployee = async (data) => {
    const formData = {
      job_id: jid,
      subject: data?.Subject,
      recipients: data?.Recipient?.map((i) => {
        return { user_id: i?.id };
      }),
      description: description,
    };
    try {
      const res = await newRequest.post(JOB_REFER, formData);
      if (res.data?.status === 201) {
        toast.success(res?.data?.message);
        queryClient.invalidateQueries(["recJobRefferals"]);
        reset();
        setLoader(false);
      } else {
        toast.error("Failed to save refferal.");
        setLoader(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to save refferal.");
      setLoader(false);
    }
  };

  return (
    <div>
      <MenuHeader
        backlink={""}
        menu={"Menu"}
        subMenu={""}
        currentpath={"Recruiter"}
        activeMenu={"Jobs"}
      />
      <div className="flex flex-row items-start justify-between gap-3">
        <div className="w-full">
          <div className="mb-3 mt-1 flex items-center justify-between">
            <h1 className="flex flex-row items-center justify-center gap-2 text-base font-bold text-black">
              <ArrowLeft
                onClick={() => {
                  history.back();
                }}
                className="size-4 cursor-pointer"
              />
              Create New Job <div className="h-4 w-[.07rem] bg-[#B0B0B0]"></div>
              <span className="text-sm font-medium text-[#2C2C2C]">Refer</span>
            </h1>
            <button
              type="button"
              onClick={() => {
                navigate(`/admin/recruiter/jobs/promote-job?jid=${jid}`);
              }}
              className="btn flex h-10 min-h-10 min-w-24 items-center rounded bg-hrmprimaryorange text-sm font-medium text-white transition-all duration-500 hover:bg-[#030E5C]/70"
            >
              Next
            </button>
          </div>

          <div className="h-full w-full rounded-md bg-white px-7 py-4">
            <div className="mb-7 flex flex-col gap-1">
              <p className="text-base font-medium text-black/90">
                Invite your college for refer candidates for the job.
              </p>
              <p className="text-medium text-sm text-[#7F7F7F]">
                Edit the email text to include the specific details of your
                referral program or highlight your incentive
              </p>
            </div>
            <p className="text-[0.94rem] font-semibold text-black/90">
              Request Refferals
            </p>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="my-4 grid grid-cols-2 gap-4"
            >
              <div className="group flex flex-col gap-1.5">
                <label className="required label-text">Recipient</label>
                <Controller
                  name="Recipient"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      isSearchable={true}
                      styles={customSelectStyles}
                      isMulti
                      options={recipientList}
                      placeholder="Select recipient"
                      className="input-box"
                    />
                  )}
                />
                {errors.Recipient && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.Recipient.message}
                  </span>
                )}
              </div>
              <div className="group flex flex-col gap-1.5">
                <label className="required label-text">Subject</label>
                <input
                  type="text"
                  {...register("Subject")}
                  className="input-box"
                />
                {errors.Subject && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.Subject.message}
                  </span>
                )}
              </div>
              <div className="text-editor col-span-2 my-4 w-full rounded-md">
                <ReactQuill
                  theme="snow"
                  value={description}
                  onChange={(value) => setDescription(value)}
                  placeholder={"Write something awesome..."}
                  className="h-36 w-full rounded-md border border-[#ECE9F1]"
                />
              </div>
              <button
                type="submit"
                className="flex h-11 w-fit min-w-52 cursor-pointer items-center justify-center gap-2 rounded-md bg-hrmblack text-sm font-normal text-white focus:outline-none"
                disabled={loader}
              >
                {loader ? (
                  <div className="flex items-center gap-3">
                    <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
                    Saving
                  </div>
                ) : (
                  "Save"
                )}
              </button>
            </form>
            {isLoading ? (
              <Loader />
            ) : (
              <QueryTable
                columns={columns}
                list={recJobRefferals?.listing ?? []}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
              />
            )}

            <div className="my-10 flex flex-col gap-1">
              <h3 className="text-base font-semibold">Share via</h3>
              <p className="text-sm text-[#7F7F7F]">
                Share this job with your Facebook, LinkedIn, and Twitter
                connections to spread the word that you're hiring.
              </p>
              <div className="mt-2 flex items-center gap-2">
                <div className="flex size-10 items-center justify-center rounded-full border border-[#ECE9F1]">
                  <Linkedin
                    strokeWidth={0.5}
                    className="size-5 fill-[#0071BC] text-[#0071BC]"
                  />
                </div>
                <div className="flex size-10 items-center justify-center rounded-full border border-[#ECE9F1]">
                  <Facebook
                    strokeWidth={0.5}
                    className="size-5 fill-[#0071BC] text-[#0071BC]"
                  />
                </div>
                <div className="flex size-10 items-center justify-center rounded-full border border-[#ECE9F1]">
                  <Twitter
                    strokeWidth={0.5}
                    className="size-5 fill-[#1DA1F2] text-[#1DA1F2]"
                  />
                </div>
                <div className="flex size-10 items-center justify-center rounded-full border border-[#ECE9F1]">
                  <Link2 className="size-5 -rotate-45" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <CreateJobSideBar stepCounter={5} />
      </div>
    </div>
  );
};

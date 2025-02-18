import {  newRequest, NEWS_LISt } from "@/api";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { ArrowLeft } from "lucide-react";
import React from "react";
import { useParams } from "react-router-dom";

export default function NewsAndEventDetails() {

  const { id } = useParams();
  console.log("id", id); 
  console.log("Is id truthy?", !!id);
  console.log(`${NEWS_LISt}/${id}`);
  const { data: newsDetail, isLoading, error } = useQuery({
    queryKey: ["newsDetail", id],
    queryFn: async () => {
      const response = await newRequest.get(`${NEWS_LISt}/${id}`);
      return response.data;
    },
    enabled: !!id,
  });

  console.log(newsDetail,"newsDetail newsDetail")
  return (
    <div className="h-full">
      <h1 className="my-4 flex items-center text-sm font-bold text-black">
        <ArrowLeft
          onClick={() => {
            history.back();
          }}
          className="mr-2 size-4 cursor-pointer"
        />
        Back
      </h1>
      <div className="w-full bg-gray-100">
        <div className="flex gap-3">
          <div className="flex flex-col bg-white p-6">
            <div className="space-y-6">
                <div  className="flex flex-col items-start gap-2">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-semibold">{newsDetail?.news_title}</h3>
                    <p className="text-sm italic text-gray-500">
                      {newsDetail?.short_summary}
                    </p>
                    <div className="mt-3 flex items-center gap-2 font-medium text-black">
                      <div className="">
                        <img
                          src="/assets/images/employee_access/pro.png"
                          alt=""
                          className=""
                        />
                      </div>
                      <p className="text-xs">Jerome Bell</p>
                      <div className="h-4 w-[1.2] border border-l border-gray-dark"></div>
                      <p className="text-xs">{dayjs(newsDetail?.created_at).format("DD MMM YYYY")}</p>
                    </div>
                  </div>
                  <div className="h-50 w-full overflow-hidden">
                    <img
                      src={newsDetail?.featured_image}
                      alt={newsDetail?.news_title}
                      className="object-containe h-full w-full object-cover"
                    />
                  </div>
                  <p className="text-xs italic leading-relaxed tracking-wide text-black">
                    Our company is proud to announce the launch of an innovative
                    HRMS platform that promises to revolutionize the way
                    organizations manage their human resources. This new
                    platform is engineered to streamline HR processes, from
                    recruitment and onboarding to performance management and
                    payroll processing.
                  </p>
                  <h6 className="text-xs italic text-black">Key Point</h6>
                  <div className="flex flex-col gap-4">
                    <p className="text-xs italic leading-relaxed tracking-wide text-black">
                      Our company is proud to announce the launch of an
                      innovative HRMS platform that promises to revolutionize
                      the way organizations manage their human resources. This
                      new platform is engineered to streamline HR processes,
                      from recruitment and onboarding to performance management
                      and payroll processing.
                    </p>
                    <p className="text-xs italic leading-relaxed tracking-wide text-black">
                      Our company is proud to announce the launch of an
                      innovative HRMS platform that promises to revolutionize
                      the way organizations manage their human resources. This
                      new platform is engineered to streamline HR processes,
                      from recruitment and onboarding to performance management
                      and payroll processing.
                    </p>
                    <p className="text-xs italic leading-relaxed tracking-wide text-black">
                      Our company is proud to announce the launch of an
                      innovative HRMS platform that promises to revolutionize
                      the way organizations manage their human resources. This
                      new platform is engineered to streamline HR processes,
                      from recruitment and onboarding to performance management
                      and payroll processing.
                    </p>
                  </div>
                </div>
             
            </div>
          </div>
          <div className="w-1/2 bg-white p-6">
            <h2 className="mb-4 text-sm font-semibold">Related News</h2>
            <div className="space-y-6">
              {/* {events?.map((event, index) => (
                <div key={index} className="items-star flex flex-col gap-3">
                  <div>
                    <img
                      src="/assets/images/employee_access/event.png"
                      alt={event.title}
                      className="w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-sm font-semibold">{event.title}</h3>
                    <p className="text-xs italic text-gray-500">
                      We are excited to introduce our next-generation HRMS
                      solution, set to transform workforce management and drive
                      digital innovation in the HR space.
                    </p>
                    <div className="flex items-center gap-2 font-medium text-black">
                      <div className="">
                        <img
                          src="/assets/images/employee_access/pro.png"
                          alt=""
                          className=""
                        />
                      </div>
                      <p className="text-xs">Jerome Bell</p>
                      <div className="h-4 w-[1.2] border border-l border-gray-dark"></div>
                      <p className="text-xs">12/12/25</p>
                    </div>
                  </div>
                </div>
              ))} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

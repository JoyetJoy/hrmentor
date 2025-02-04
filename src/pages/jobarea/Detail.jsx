import { newRequest } from "@/api";
import { CAREERS_LISITNG } from "@/api/recruiter";
import ShareJob from "@/components/jobarea/Share";
import Loader from "@/components/ui/Loader";
import { useQuery } from "@tanstack/react-query";
import { Dot, MapPin, MoveLeft, Share2 } from "lucide-react";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function CareerDetail() {
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState("");
  const { id } = useParams();
  // Fetch details
  const { data: careerDetails, isLoading } = useQuery({
    queryKey: ["careerDetails", id],
    queryFn: () =>
      newRequest.get(`${CAREERS_LISITNG}/${id}`).then((res) => {
        return res.data;
      }),
  });
 
  console.log(careerDetails);

  // const handleShare = () => {
  //   setPopupOpen(true); // ✅ Open popup before sharing

  //   setTimeout(() => {
  //     const currentUrl = window.location.href; 

  //     if (navigator.share) {
  //       navigator
  //         .share({
  //           title: "Check this out!",
  //           text: "Here's a job you might be interested in.",
  //           url: currentUrl,
  //         })
  //         .then(() => setPopupOpen(true)) // ✅ Close popup after sharing
  //         .catch((error) => console.log("Sharing failed", error));
  //     } else {
  //       navigator.clipboard.writeText(currentUrl);
  //       alert("Link copied to clipboard!");
  //     }
  //   }, 500); // ✅ Small delay for popup to open first
  // };

  return (
    <>
      <ShareJob
        popupOpen={popupOpen}
        setPopupOpen={setPopupOpen}
        text={careerDetails}
      />
      {isLoading ? (
        <Loader />
      ) : (
        <div className="h-full min-h-screen w-full rounded-md bg-black/5 p-4">
          <div className="bg-white">
            <div
              style={{ backgroundImage: 'url("/assets/icons/career-bg.svg")' }}
              className="h-72 rounded-md bg-cover"
            >
              <div className="flex flex-col gap-3 px-10 py-8">
                <h1 className="mb-6 flex flex-row items-center gap-1 text-sm text-white">
                  <MoveLeft
                    onClick={() => history.back()}
                    className="size-4 cursor-pointer"
                    strokeWidth={2}
                  />
                  Job Details
                </h1>
                <h1 className="flex flex-row items-end gap-1 text-xl font-semibold capitalize text-white">
                  {careerDetails?.job_title}
                  <span className="flex flex-row items-center text-xs font-normal">
                    <Dot className="size-5 text-[#6DE742]" strokeWidth={5} />
                    3days ago
                  </span>
                </h1>
                <div className="flex flex-row items-center justify-between">
                  <div className="my-4 flex flex-row items-center gap-2">
                    <button className="btn h-8 min-h-8 rounded border border-[#CFD2E3] bg-transparent text-xs text-white">
                      {careerDetails?.min_exp_id?.value}
                    </button>
                    {careerDetails?.minimum_range ? (
                      <button className="btn h-8 min-h-8 rounded border border-[#CFD2E3] bg-transparent text-xs text-white">
                        £ {careerDetails?.minimum_range} -{" "}
                        {careerDetails?.maximum_range}
                      </button>
                    ) : null}
                    <button className="btn h-8 min-h-8 rounded border border-[#CFD2E3] bg-transparent text-xs text-white">
                      {careerDetails?.employment_type?.value}
                    </button>
                  </div>
                  <div className="flex flex-row items-center gap-2">
                    <Link
                      to={`/career/apply/${id}`}
                      className="btn h-10 min-h-10 w-36 rounded-md border border-[#CFD2E3] bg-white text-sm font-semibold text-hrmprimaryorange"
                    >
                      Apply Now
                    </Link>
                    <button
                      onClick={() => {
                        setPopupOpen(true);
                        setSelectedJob(careerDetails);
                        // handleShare();
                      }}
                      className="btn flex h-10 min-h-10 w-36 flex-row items-center rounded-md border border-[#2F324D] bg-black/80 text-sm text-white"
                    >
                      <Share2 strokeWidth={1} className="size-4" />
                      Share
                    </button>
                  </div>
                </div>
                <h1 className="mb-4 flex flex-row items-center gap-1 text-sm font-normal text-white">
                  <MapPin className="size-4" />
                  {careerDetails?.country_id?.label},
                  {careerDetails?.state_id?.label},
                  {careerDetails?.city_id?.label}
                </h1>
              </div>
            </div>
            <div
              className="mt-4 p-5 text-[0.9rem]"
              dangerouslySetInnerHTML={{
                __html: careerDetails?.job_description,
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}

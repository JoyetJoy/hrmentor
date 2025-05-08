import { newRequest } from "@/api";
import { CAREERS_LISITNG } from "@/api/recruiter";
import JobFilter from "@/components/jobarea/Filter";
import ShareJob from "@/components/jobarea/Share";
import Pagination from "@/components/table/Pagination";
import Loader from "@/components/ui/Loader";
import { useQuery } from "@tanstack/react-query";
import { Filter, MapPin, Search, Share2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function JobAreaListing() {
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [keyword, setKeyword] = useState("");
  const [selectedEmpType, setSelectedEmpType] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState([]);
  const [selectedExp, setSelectedExp] = useState([]);
  const pageLimit = 10;

  // Fetch List
  const { data: careersListing, isLoading } = useQuery({
    queryKey: [
      "careersListing",
      currentPage,
      selectedEmpType,
      selectedDepartment,
      selectedExp,
      keyword,
    ],
    queryFn: () =>
      newRequest
        .get(CAREERS_LISITNG, {
          params: {
            search: keyword,
            page: currentPage,
            per_limit: pageLimit,
            employementType: JSON.stringify(selectedEmpType),
            department: JSON.stringify(selectedDepartment),
            experience: JSON.stringify(selectedExp),
          },
        })
        .then((res) => {
          return res.data;
        }),
  });

  useEffect(() => {
    if (careersListing) {
      setTotalPages(careersListing?.last_page);
    }
  }, [careersListing]);
  
  return (
    <>
      <ShareJob
        popupOpen={popupOpen}
        setPopupOpen={setPopupOpen}
        text={selectedJob}
      />
      <div className="grid min-h-screen grid-cols-11 bg-black/5 p-5">
        <div className="col-span-2">
          <JobFilter
            setSelectedEmpType={setSelectedEmpType}
            selectedEmpType={selectedEmpType}
            setSelectedDepartment={setSelectedDepartment}
            selectedDepartment={selectedDepartment}
            setSelectedExp={setSelectedExp}
            selectedExp={selectedExp}
          />
        </div>
        <div className="col-span-9 flex flex-col p-5">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-bold text-black/80">
              Current Openings
            </h1>
            <div className="flex items-center gap-2">
              <label className="input flex h-10 min-h-10 min-w-80 flex-row items-center gap-2 rounded-md border border-[#E6E7EF] outline-none hover:border-[#E6E7EF]">
                <Search
                  className="size-4 object-contain text-gray-200"
                  strokeWidth={2}
                />
                <input
                  type="text"
                  onChange={(e) => {
                    setKeyword(e.target.value);
                  }}
                  value={keyword}
                  className="grow text-sm text-black placeholder:text-sm placeholder:font-medium placeholder:text-black/50 focus:outline-none"
                  placeholder="Search"
                />
              </label>
              <div className="h-10 min-h-10 rounded-md border border-gray-400 bg-white p-3">
                <Filter
                  className="stroke size-4 font-medium text-black"
                  strokeWidth={2}
                />
              </div>
            </div>
          </div>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <div className="mt-5 grid grid-cols-1 gap-3">
                {careersListing?.listing?.map((career) => (
                  <div
                    key={career.id}
                    className="cursor-pointer rounded-lg bg-white p-5 px-7 transition-all duration-500 hover:scale-[1.01]"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-5">
                        <h1 className="text-sm font-medium capitalize text-black">
                          {career?.job_title}
                        </h1>
                        <div className="flex items-center gap-1">
                          <div className="size-2 rounded-full bg-green-500" />
                          <p className="text-xs font-medium text-black/50">
                            {career?.days_since_creation} days ago
                          </p>
                        </div>
                      </div>
                      <p className="flex items-center gap-1 text-xs font-semibold text-black/70">
                        <MapPin />
                        {career?.country?.country_name},
                        {career?.state?.state_name},{career?.city?.city_name}
                      </p>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        type="button"
                        className="btn flex h-9 min-h-9 items-center rounded border border-black/20 bg-white px-5 text-xs font-semibold text-black/70 hover:scale-[1.01]"
                      >
                        {
                          career?.minimum_experience
                            ?.minimum_experience_type_name
                        }
                      </button>
                      {career?.minimum_range && (
                        <button
                          type="button"
                          className="btn flex h-9 min-h-9 items-center rounded border border-black/20 bg-white px-5 text-xs font-semibold text-black/70 hover:scale-[1.01]"
                        >
                          £ {career?.minimum_range} - {career?.maximum_range}
                        </button>
                      )}
                      <button
                        type="button"
                        className="btn flex h-9 min-h-9 items-center rounded border border-black/20 bg-white px-5 text-xs font-semibold text-black/70 hover:scale-[1.01]"
                      >
                        {career?.employment_type?.employment_type_name}
                      </button>
                    </div>
                    <div
                      className="mt-4 text-sm"
                      dangerouslySetInnerHTML={{
                        __html: career?.job_description,
                      }}
                    />
                    <div className="mt-5 flex items-center gap-2">
                      <Link
                        to={`/career/${career?.id}`}
                        className="btn flex h-10 min-h-10 items-center rounded-md bg-black/80 px-8 text-xs font-semibold text-white hover:bg-black"
                      >
                        View Job
                      </Link>
                      <button
                        onClick={() => {
                          setSelectedJob(career);
                          setPopupOpen(true);
                        }}
                        className="btn flex h-10 min-h-10 items-center rounded-md bg-black/15 px-8 text-xs font-semibold text-black/80 hover:bg-hrmprimaryorange hover:text-white"
                      >
                        <Share2 className="size-4" /> Share
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              {totalPages && (
                <Pagination
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  totalPages={totalPages}
                />
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

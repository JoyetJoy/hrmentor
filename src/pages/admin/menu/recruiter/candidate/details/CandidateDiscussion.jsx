import { newRequest } from "@/api";
import { CANDIDATE_DISCUSSTIONS } from "@/api/recruiter";
import MenuHeader from "@/components/common/MenuHeader";
import MenuHeaderCandidate from "@/components/recruiter/candidate/MenuHeader";
import { useUserStore } from "@/lib/slices/auth.slice";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { User } from "lucide-react";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";

function CandidateDiscussion() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const cid = searchParams.get("cid");
  const { user } = useUserStore((state) => ({
    user: state.user,
  }));
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [keyword, setKeyword] = useState("");
  const pageLimit = 10;

  const fetchItems = async ({ pageParam = 1 }) => {
    const response = await newRequest.get(`${CANDIDATE_DISCUSSTIONS}/${cid}`, {
      params: {
        search: keyword,
        page: pageParam,
        per_limit: pageLimit,
      },
    });
    return {
      data: response?.data?.page[0].data,
      nextPage: pageParam < response.data.last_page ? pageParam + 1 : null,
    };
  };

  const {
    data: candidateDiscussions,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["candidateDiscussions"],
    queryFn: fetchItems,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    keepPreviousData: true,
    staleTime: 0,
    cacheTime: 0,
  });

  console.log(user);
  console.log(candidateDiscussions);
  return (
    <div>
      <MenuHeader
        backlink={""}
        menu={"Menu"}
        subMenu={""}
        currentpath={"Recruiter"}
        activeSubMenu={"Candidates"}
        activeMenu={"Candidates"}
      />
      <MenuHeaderCandidate page={4} />
      <div className="bg-white p-4">
        <h1 className="px-24 py-2 pt-3 text-base font-bold">Interviews</h1>

        <div className="flex-col border-gray-200 bg-white px-24 py-6">
          <div className="rounded-lg border-2 border-[#ECE9F1] p-4">
            <div className="mb-4 flex justify-start">
              <div className="flex w-3/4 flex-col gap-1 rounded-lg bg-[#F0F8FF] px-4 py-4 pr-12">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-white p-2">
                    <User className="size-4" />
                  </div>
                  <div className="text-sm font-semibold">Vaisakh N S</div>
                </div>
                <div className="flex flex-col gap-4 pl-12">
                  <div className="text-sm">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book👋
                  </div>
                  <div className="flex items-center gap-3">
                    <label className="input flex h-9 min-h-9 w-full items-center gap-2 rounded-md border border-[#EBEBF0] pr-28 outline-none">
                      <input
                        type="text"
                        className="grow text-sm placeholder:text-sm placeholder:font-normal placeholder:text-gray-200 focus:outline-none"
                        placeholder="Type here"
                      />
                    </label>
                    <button className="btn btn-neutral btn-sm p-2">
                      <img
                        src="/assets/images/candidate/mailsendwhite.png"
                        className="h-4 object-contain"
                        alt=""
                      />
                    </button>
                    <div className="flex items-center gap-2 text-sm text-[#7F7F7F]">
                      <p>Today</p>
                      <p className="h-5 border border-[#7F7F7F]"></p>
                      <p>03:22</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-4 flex justify-end">
              <div className="flex w-3/5 flex-col gap-1 rounded-lg bg-[#F7F7F7] px-4 py-4">
                <div className="flex flex-col gap-4">
                  <div className="text-sm">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book👋
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <button className="btn btn-neutral btn-sm rounded-md border-white bg-white p-2 text-black hover:border-white hover:bg-white">
                      <img
                        src="/assets/images/candidate/share.png"
                        className="h-4 object-contain"
                        alt=""
                      />
                      <p className="text-xs">Replay</p>
                    </button>
                    <div className="flex items-center gap-2 text-sm text-[#7F7F7F]">
                      <p>Today</p>
                      <p className="h-5 border border-[#7F7F7F]"></p>
                      <p>03:22</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <label className="input flex h-9 min-h-9 w-full items-center gap-2 rounded-md border border-[#EBEBF0] pr-28 outline-none">
              <input
                type="text"
                className="grow bg-[#F7F7F7] text-sm placeholder:text-sm placeholder:font-normal placeholder:text-gray-200 focus:outline-none"
                placeholder="Leave a comment, Use @ to mention a team member"
              />
            </label>
            <button className="btn btn-neutral btn-sm h-9 p-2 px-7">
              <img
                src="/assets/images/candidate/mailsendwhite.png"
                className="h-4 object-contain"
                alt=""
              />
              <p>Send</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CandidateDiscussion;

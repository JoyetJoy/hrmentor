import { newRequest } from "@/api";
import {
  CANDIDATE_DISCUSSTIONS,
  CANDIDATE_DISCUSSTIONS_REPLY,
  JOB_DETAIL_BY_CANDIDATE,
} from "@/api/recruiter";
import MenuHeader from "@/components/common/MenuHeader";
import MenuHeaderCandidate from "@/components/recruiter/candidate/MenuHeader";
import { useUserStore } from "@/lib/slices/auth.slice";
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { User } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";

function CandidateDiscussion() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const cid = searchParams.get("cid");
  // Get selected data
  const { data: jobDetailsByCandidate } = useQuery({
    queryKey: ["jobDetailsByCandidate", cid],
    queryFn: () =>
      newRequest
        .get(`${JOB_DETAIL_BY_CANDIDATE}/${cid}`)
        .then((res) => res.data),
    enabled: !!cid,
  });

  const [message, setMessage] = useState("");
  const queryClient = useQueryClient();

  const { user } = useUserStore((state) => ({
    user: state.user,
  }));
  const pageLimit = 10;

  const fetchItems = async ({ pageParam = 1 }) => {
    const response = await newRequest.get(`${CANDIDATE_DISCUSSTIONS}/${cid}`, {
      params: {
        page: pageParam,
        per_limit: pageLimit,
      },
    });
    return {
      data: response?.data?.page[0].data,
      nextPage: pageParam < response.data.last_page ? pageParam + 1 : null,
    };
  };

  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["candidateDiscussions"],
    queryFn: fetchItems,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  // To handle message input
  const [replies, setReplies] = useState({});

  const handleReplyChange = (e, messageId) => {
    setReplies((prevReplies) => ({
      ...prevReplies,
      [messageId]: e.target.value,
    }));
  };

  const handleSendReply = async ({ messageId }) => {
    try {
      const formData = new FormData();
      formData.append("reply_message", replies[messageId] || ""); // Get the specific reply message
      formData.append("discussion_message_id", messageId);
      formData.append("user_id", user?.id);

      const res = await newRequest.post(
        `${CANDIDATE_DISCUSSTIONS_REPLY}/${cid}`,
        formData,
      );
      if (res?.data?.status === 201) {
        toast.success(res?.data?.message);
        setReplies((prevReplies) => ({
          ...prevReplies,
          [messageId]: "", // Reset the reply field after successful reply
        }));
        queryClient.invalidateQueries(["candidateDiscussions"]);
      }
    } catch (error) {
      toast.error(error?.response?.data?.error);
    }
  };

  const handleSendMessage = async () => {
    try {
      const formData = new FormData();
      formData.append("message", message);
      formData.append("job_list_id", jobDetailsByCandidate?.job_id);
      formData.append("user_id", user?.id);
      const res = await newRequest.post(
        `${CANDIDATE_DISCUSSTIONS}/${cid}`,
        formData,
      );
      console.log(res);
      if (res?.data?.status === 201) {
        toast.success(res?.data?.message);
        setMessage("");
        queryClient.invalidateQueries(["candidateDiscussions"]);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.error);
    }
  };

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
        <h1 className="mx-auto max-w-6xl px-7 pt-2 text-lg font-bold">
          Discussions
        </h1>
        <div className="mx-auto max-w-6xl flex-col border-gray-200 bg-white p-7">
          <div className="overflow-y-min max-h-[520px] overflow-y-auto rounded-lg border-2 border-[#ECE9F1] p-4">
            <div className="flex flex-col gap-6 px-3">
              {data?.pages?.map((page) =>
                page?.data?.data?.map((message, index) => (
                  <div
                    key={index}
                    className={`mb-4 flex ${
                      message?.user_id === user?.id
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`flex w-1/2 flex-col gap-1 rounded-lg ${
                        message?.user_id === user?.id
                          ? "bg-[#D1E7DD] text-right"
                          : "bg-[#F0F8FF]"
                      } px-4 py-4 pr-12`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="rounded-full bg-white p-2">
                          <User className="size-4" />
                        </div>
                        <div className="text-sm font-bold">
                          {message?.user_name?.first_name}{" "}
                          {message?.user_name?.sur_name}
                        </div>
                      </div>
                      <div className="flex flex-col items-start gap-4 pl-12">
                        <div className="text-sm">{message?.message}</div>
                        <div className="flex items-center gap-3 rounded bg-hrmprimaryorange/10 p-1 px-2 text-xs font-semibold text-black/70">
                          {new Date(message?.created_at).toLocaleTimeString()}
                        </div>
                      </div>
                      {/* Reply section */}
                      {message?.user_id != user?.id && (
                        <div className="relative flex flex-col">
                          <div className="mt-4 flex items-center gap-3">
                            <input
                              type="text"
                              value={replies?.[message?.id] || ""}
                              onChange={(e) =>
                                handleReplyChange(e, message?.id)
                              }
                              placeholder="Type your reply..."
                              className="grow rounded-md border border-gray-300 p-2 text-sm"
                            />
                            <button
                              className="btn btn-neutral btn-sm p-2"
                              onClick={() =>
                                handleSendReply({ messageId: message?.id })
                              }
                            >
                              <img
                                src="/assets/images/candidate/mailsendwhite.png"
                                className="h-4 object-contain"
                                alt="send"
                              />
                            </button>
                          </div>
                          <div className="mt-2 flex flex-col">
                            {message?.disscussion_reply_message?.map((i) => (
                              <div
                                key={i.id}
                                className="mt-2 flex w-full items-center rounded bg-[#D1E7DD] px-5 py-2 text-sm font-medium text-black/70"
                              >
                                {i?.reply_message}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )),
              )}
            </div>
            <div className="flex justify-center py-12">
              <button
                className={`btn rounded-full border-transparent bg-black/70 px-8 text-white transition-all duration-500 hover:scale-[1.03] ${
                  !hasNextPage ? "hidden" : ""
                }`}
                onClick={() => fetchNextPage()}
                disabled={!hasNextPage || isLoading}
              >
                Show More
              </button>
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <label className="input-box flex h-10 min-h-10 w-full items-center gap-2 rounded-md border border-black/20 outline-none">
              <input
                type="text"
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
                value={message}
                className="grow text-sm placeholder:text-black/40"
                placeholder="Leave a comment"
              />
            </label>
            <button
              onClick={handleSendMessage}
              className="btn btn-neutral btn-sm h-10 p-2 px-7"
            >
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

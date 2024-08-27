import MenuHeader from "@/components/common/MenuHeader";
import { User } from "lucide-react";
import React from "react";

function Discussions() {
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
      <div className="bg-white p-4">
        <h1 className="font-bold text-base pt-3 px-24 py-2">Interviews</h1>

        <div className="bg-white   px-24 border-gray-200 py-6 flex-col">
          <div className="border-2 p-4 rounded-lg border-[#ECE9F1]">
            <div className="flex justify-start mb-4 ">
              <div className="bg-[#F0F8FF] w-3/4 pr-12 flex flex-col gap-1 px-4 py-4 rounded-lg">
                <div className="flex gap-3 items-center">
                  <div className="bg-white p-2 rounded-full">
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
                  <div className="flex gap-3 items-center">
                    <label className="input w-full outline-none border rounded-md border-[#EBEBF0] pr-28 flex items-center gap-2 min-h-9 h-9">
                      <input
                        type="text"
                        className="grow placeholder:text-sm focus:outline-none text-sm placeholder:text-gray-200 placeholder:font-normal"
                        placeholder="Type here"
                      />
                    </label>
                    <button className="btn btn-neutral btn-sm p-2">
                      <img
                        src="/assets/images/candidate/mailsendwhite.png"
                        className="object-contain h-4"
                        alt=""
                      />
                    </button>
                    <div className="flex text-[#7F7F7F] text-sm gap-2 items-center">
                      <p>Today</p>
                      <p className="border border-[#7F7F7F] h-5"></p>
                      <p>03:22</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end mb-4">
              <div className="bg-[#F7F7F7] w-3/5 flex flex-col gap-1 px-4 py-4 rounded-lg">
                <div className="flex flex-col gap-4 ">
                  <div className="text-sm">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book👋
                  </div>
                  <div className="flex gap-3 items-center justify-between">
                    <button className="btn btn-neutral bg-white border-white rounded-md hover:bg-white hover:border-white text-black btn-sm p-2">
                      <img
                        src="/assets/images/candidate/share.png"
                        className="object-contain h-4"
                        alt=""
                      />
                      <p className="text-xs">Replay</p>
                    </button>
                    <div className="flex text-[#7F7F7F] text-sm gap-2 items-center">
                      <p>Today</p>
                      <p className="border border-[#7F7F7F] h-5"></p>
                      <p>03:22</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <label className="input w-full outline-none border rounded-md border-[#EBEBF0] pr-28 flex items-center gap-2 min-h-9 h-9">
              <input
                type="text"
                className="grow placeholder:text-sm focus:outline-none text-sm bg-[#F7F7F7] placeholder:text-gray-200 placeholder:font-normal"
                placeholder="Leave a comment, Use @ to mention a team member"
              />
            </label>
            <button className="btn btn-neutral btn-sm h-9 p-2 px-7">
              <img
                src="/assets/images/candidate/mailsendwhite.png"
                className="object-contain h-4"
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

export default Discussions;

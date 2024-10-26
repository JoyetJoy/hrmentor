import { FilterModalHiring } from "@/components/popups/hiring/FilterModal";
import { Search } from "lucide-react";
import React, { useState } from "react";

export const OverviewTopBar = ({
  title,
  showSearch = true,
  overviewButton = false,
  sendButton = false,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <div className="flex w-full items-center justify-between text-sm font-semibold">
        {title}
        <div className="flex gap-3">
          {showSearch && (
            <>
              <label className="input flex h-10 min-h-10 min-w-80 flex-row items-center gap-2 rounded-md border border-[#E6E7EF] outline-none hover:border-[#E6E7EF]">
                <Search
                  className="size-4 object-contain text-gray-200"
                  strokeWidth={2}
                />
                <input
                  type="text"
                  className="grow text-sm text-black placeholder:text-sm placeholder:font-medium placeholder:text-black/50 focus:outline-none"
                  placeholder="Search"
                />
              </label>
              <button onClick={toggleModal}>
                <div className="h-10 min-h-10 rounded-md border border-gray-400 bg-white p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-filter size-4"
                  >
                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                  </svg>
                </div>
              </button>
            </>
          )}
          {overviewButton && (
            <button
              type="submit"
              className="flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-hrmblack px-8 text-sm font-normal text-white focus:outline-none"
            >
              <span>Generate</span>
            </button>
          )}
          {sendButton && (
            <button
              type="submit"
              className="flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-hrmblack px-8 text-sm font-normal text-white focus:outline-none"
            >
              <span>Send</span>
            </button>
          )}
        </div>
      </div>
      <FilterModalHiring isOpen={isModalOpen} onClose={toggleModal} />
    </>
  );
};

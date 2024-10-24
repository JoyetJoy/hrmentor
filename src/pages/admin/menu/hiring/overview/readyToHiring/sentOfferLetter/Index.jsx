import MenuHeader from "@/components/common/MenuHeader";
import { OverviewTopBar } from "@/components/hiring/overviewTopBar/OverviewTopBar";
import Loader from "@/components/ui/Loader";
import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";

export const Index = () => {
  const [loader, setLoader] = useState(false);
  const [description, setDescription] = useState("");

  const jobDescription = "Sample description";
  useEffect(() => {
    setLoader(true);
    if (jobDescription) {
      setDescription(jobDescription);
      setLoader(false);
    }
  }, [jobDescription, setDescription]);

  function close() {
    setPopupOpen(false);
  }

  return (
    <>
      <MenuHeader
        backlink={""}
        menu={"Menu"}
        subMenu={""}
        currentpath={"Hiring"}
        activeMenu={"Dashboard"}
      />

      <div className="flex flex-col gap-3">
        <OverviewTopBar
          title="Ready to Hiring"
          showSearch={false}
          overviewButton={true}
        />
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex max-w-2xl gap-3">
          <div className="w-full">
            <div className="group flex flex-col gap-1.5 py-2">
              <label className="required label-text">Joining Date</label>
              <input
                autoComplete="off"
                type="date"
                placeholder="DD-MM-YYYY"
                className="input-box"
              />
            </div>
          </div>
          <div className="w-full">
            <div className="group flex flex-col gap-1.5 py-2">
              <label className="required label-text">Salary</label>
              <input
                autoComplete="off"
                type="text"
                placeholder="2000"
                className="input-box"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <div className="flex w-full flex-col gap-5 rounded-md bg-white p-6">
            <div className="text-sm font-semibold">Offer Letter Template</div>
            <div className="flex w-1/2 max-w-2xl flex-col space-y-1 py-2">
              <label className="required label-text font-semibold">
                Change Offer Letter Template
              </label>
              <div className="h-fit rounded-md border shadow-sm">
                <div className="relative">
                  <select className="block w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                    <option value="" disabled selected>
                      Select
                    </option>
                    <option value="One">One</option>
                    <option value="Two">Two</option>{" "}
                    {/* Corrected empty value */}
                  </select>
                </div>
                <input name="" type="hidden" value="" />
              </div>
            </div>
            <div className="flex h-80 flex-col justify-between gap-3">
              {loader ? (
                <Loader />
              ) : (
                <ReactQuill
                  theme="snow"
                  value={description}
                  onChange={setDescription}
                  placeholder={"Type here.."}
                  className="max-h-72 w-full flex-grow rounded-md bg-[#F5F5F5] placeholder:text-[#8b8b8b]"
                />
              )}
            </div>
          </div>

           <div className="flex w-full flex-col gap-5 rounded-md bg-white p-6">
            <div className="text-sm font-semibold">Offer Letter Template</div>
            <div className="flex w-1/2 max-w-2xl flex-col space-y-1 py-2">
              <label className="required label-text font-semibold">
                Change Offer Letter Template
              </label>
              <div className="h-fit rounded-md border shadow-sm">
                <div className="relative">
                  <select className="block w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                    <option value="" disabled selected>
                      Select
                    </option>
                    <option value="One">One</option>
                    <option value="Two">Two</option>{" "}
                    {/* Corrected empty value */}
                  </select>
                </div>
                <input name="" type="hidden" value="" />
              </div>
            </div>
            <div className="flex h-80 flex-col justify-between gap-3">
              {loader ? (
                <Loader />
              ) : (
                <ReactQuill
                  theme="snow"
                  value={description}
                  onChange={setDescription}
                  placeholder={"Type here.."}
                  className="max-h-72 w-full flex-grow rounded-md bg-[#F5F5F5] placeholder:text-[#8b8b8b]"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

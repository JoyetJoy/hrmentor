import MenuHeader from "@/components/common/MenuHeader";
import QueryTable from "@/components/table/QueryTable";
import { TableData } from "@/constants/tableDummy";
import { MoveDiagonal } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import loader from "/assets/icons/recruter/fi_loader.svg";
import user from "/assets/icons/recruter/fi_user.svg";
import openjobs from "/assets/icons/recruter/fi_briefcase.svg";
import message from "/assets/icons/recruter/fi_message-square.svg";
import award from "/assets/icons/recruter/fi_award.svg";
import like from "/assets/icons/recruter/interface-favorite-like-1--reward-social-up-rating-media-like-thumb-hand.svg";

// const recruterData = [
//   {
//     imgSrc: openjobs,
//     h2Text: 'Open Jobs',
//     h2Color: '#AE3C60',
//     h1Data: 22,
//     bgColor: '#AE3C601A',
//   },
//   {
//     imgSrc: user,
//     h2Text: 'New candidates',
//     h2Color: '#EEB81E',
//     h1Data: 10,
//     bgColor: ' #EEB81E1A',
//   },
//   {
//     imgSrc: loader,
//     h2Text: 'Consider candidates',
//     h2Color: ' #8C5ED0',
//     h1Data: 5,
//     bgColor: ' #B380FE1A',
//   },
//   {
//     imgSrc: 'openjobs4.png',
//     h2Text: 'Active Jobs',
//     h2Color: '#6091AE',
//     h1Data: 15,
//     bgColor: '#6091AE1A',
//   },
//   {
//     imgSrc: 'openjobs5.png',
//     h2Text: 'Draft Jobs',
//     h2Color: '#60AE91',
//     h1Data: 7,
//     bgColor: '#60AE911A',
//   },
//   {
//     imgSrc: 'openjobs6.png',
//     h2Text: 'Inactive Jobs',
//     h2Color: '#AE9160',
//     h1Data: 3,
//     bgColor: '#AE91601A',
//   },
// ];

export default function RecruiterDashbaord() {
  const list = React.useMemo(() => TableData, [TableData]);
  const columns = React.useMemo(
    () => [
      {
        header: "Name",
        accessorKey: "name",
      },
      { header: "Date Created", accessorKey: "dateCreate" },

      {
        header: "Action",
        accessorKey: "action",
        cell: ({ row }) => (
          <div className="relative flex gap-1 text-xs">
            <Link
              to={`/sales/invoices/detail-view/${row?.original?.id}`}
              className="flex cursor-pointer items-center rounded-full bg-[#EBEBF0] p-2"
            >
              <MoveDiagonal className="size-3" />
            </Link>
          </div>
        ),
      },
    ],

    [],
  );
  // const [popupOpen, setPopupOpen] = useState(true);
  return (
    <>
      {/* <AddEducation popupOpen={popupOpen} setPopupOpen={setPopupOpen} /> */}
      <MenuHeader
        backlink={""}
        menu={"Menu"}
        subMenu={""}
        currentpath={"Recruiter"}
        activeMenu={"Dashboard"}
      />
      <div className="grid grid-cols-6 gap-5">
        {/* Item 1 */}
        <div className="flex items-center gap-2 rounded-md bg-white p-4 ">
          <div
            className="size-12 rounded-full p-3"
            style={{ backgroundColor: "#AE3C601A" }}
          >
            <img
              src={openjobs}
              alt="Open Jobs icon"
              className="w-full object-contain"
            />
          </div>
          <div>
            <h2
              className="whitespace-nowrap text-sm font-medium"
              style={{ color: "#AE3C60" }}
            >
              Open Jobs
            </h2>
            <h1 className="text-xl font-bold text-[#2C2C2C]">22</h1>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-md bg-white p-4">
          <div
            className="size-12 rounded-full p-3"
            style={{ backgroundColor: "#EEB81E1A" }}
          >
            <img
              src={user}
              alt="New Candidates icon"
              className="w-full object-contain"
            />
          </div>
          <div>
            <h2
              className="whitespace-nowrap text-sm font-medium"
              style={{ color: "#EEB81E" }}
            >
              New candidates
            </h2>
            <h1 className="text-xl font-bold text-[#2C2C2C]">15</h1>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-md bg-white p-4">
          <div
            className="size-12 rounded-full p-3"
            style={{ backgroundColor: " #B380FE1A" }}
          >
            <img
              src={loader}
              alt="New Candidates icon"
              className="w-full object-contain"
            />
          </div>
          <div>
            <h2
              className="whitespace-nowrap text-sm font-medium"
              style={{ color: " #8C5ED0" }}
            >
              Consider candidates
            </h2>
            <h1 className="text-xl font-bold text-[#2C2C2C]">15</h1>
          </div>
        </div>

        {/* Item 5 */}
        <div className="flex items-center gap-2 rounded-md bg-white p-4">
          <div
            className="size-12 rounded-full p-3"
            style={{ backgroundColor: "#35AEBE1A" }}
          >
            <img
              src={message}
              alt="Draft Jobs icon"
              className="w-full object-contain"
            />
          </div>
          <div>
            <h2
              className="whitespace-nowrap text-sm font-medium"
              style={{ color: "#35AEBE" }}
            >
              Interviews{" "}
            </h2>
            <h1 className="text-xl font-bold text-[#2C2C2C]">7</h1>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-md bg-white p-4">
          <div
            className="size-12 rounded-full p-3"
            style={{ backgroundColor: "#2FBC451A" }}
          >
            <img
              src={award}
              alt="Draft Jobs icon"
              className="w-full object-contain"
            />
          </div>
          <div>
            <h2
              className="whitespace-nowrap text-sm font-medium"
              style={{ color: " #2FBC45" }}
            >
              Offer sent
            </h2>
            <h1 className="text-xl font-bold text-[#2C2C2C]">7</h1>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-md bg-white p-4">
          <div
            className="size-12 rounded-full p-3"
            style={{ backgroundColor: " #7626781A" }}
          >
            <img
              src={like}
              alt="Inactive Jobs icon"
              className="w-full object-contain"
            />
          </div>
          <div>
            <h2
              className="whitespace-nowrap text-sm font-medium"
              style={{ color: " #762678" }}
            >
              Jobs drafted
            </h2>
            <h1 className="text-xl font-bold text-[#2C2C2C]">3</h1>
          </div>
        </div>
      </div>

      <div className="my-3 grid grid-cols-3 gap-3">
        <div className="h-screen overflow-hidden">
          <h1 className="mb-4 text-sm font-bold text-[#2C2C2C]">Open Jobs</h1>
          <QueryTable className="" columns={columns} list={list} />
        </div>
        <div>
          <h1 className="mb-4 text-sm font-bold text-[#2C2C2C]">Interview</h1>
          <div className="rounded-md h-screen bg-white">
            <h1 className="p-5">November 2023</h1>
            <hr className="border-[#ECE9F1]" />
            <div className="p-5">
              <img src={"/assets/icons/admin/calender (2).png"} alt="" />
            </div>
            <div className="flex w-full items-center gap-3 px-5">
              <div className="items-center gap-1 text-[#7F7F7F] text-sm">11:30pm </div>
              <div className="w-full border-b border-[#ECE9F1]"></div>
            </div>
            <div className="flex flex-col gap-3 p-5">
              <div className="flex h-20 w-full items-center justify-between rounded-md bg-[#F5F5F7] px-5 py-2">
                <div className="flex items-center gap-x-2">
                  <p className="text-sm font-medium text-[ #2C2C2C]">
                    UI/UX Design Intern
                  </p>

                  <div className="avatar-group -space-x-6 rtl:space-x-reverse">
                    <div className="avatar">
                      <div className="w-8">
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                      </div>
                    </div>
                    <div className="avatar">
                      <div className="w-8">
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                      </div>
                    </div>
                    <div className="avatar">
                      <div className="w-8">
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                      </div>
                    </div>
                  </div>
                  <h1 className="text-sm text-[ #2C2C2C]">Sara +2 more</h1>
                </div>
                <Link
                  to={""}
                  className="flex cursor-pointer items-center rounded-full bg-[#EBEBF0] p-2"
                >
                  <MoveDiagonal className="size-3" strokeWidth={1} />
                </Link>
              </div>
              <div className="flex h-20 w-full items-center justify-between rounded-md bg-[#F5F5F7] px-5 py-2">
                <div className="flex items-center gap-x-2">
                  <p className="text-sm font-medium text-[ #2C2C2C]">
                    UI/UX Design Intern
                  </p>

                  <div className="avatar-group -space-x-6 rtl:space-x-reverse">
                    <div className="avatar">
                      <div className="w-8">
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                      </div>
                    </div>
                    <div className="avatar">
                      <div className="w-8">
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                      </div>
                    </div>
                    <div className="avatar">
                      <div className="w-8">
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                      </div>
                    </div>
                  </div>
                  <h1 className="text-sm text-[ #2C2C2C]">Sara +2 more</h1>
                </div>
                <Link
                  to={""}
                  className="flex cursor-pointer items-center rounded-full bg-[#EBEBF0] p-2"
                >
                  <MoveDiagonal className="size-3" strokeWidth={1} />
                </Link>
              </div>
            </div>
            <div className="flex w-full items-center gap-3 px-5">
              <div className="items-center gap-1 text-[#7F7F7F] text-sm">9:30pm </div>
              <div className="w-full border-b border-[#ECE9F1]"></div>
            </div>
            <div className="flex flex-col gap-3 p-5">
              <div className="flex h-20 w-full items-center justify-between rounded-md bg-[#F5F5F7] px-5 py-2">
                <div className="flex items-center gap-x-2">
                  <p className="text-sm font-medium text-[ #2C2C2C]">
                    UI/UX Design Intern
                  </p>

                  <div className="avatar-group -space-x-6 rtl:space-x-reverse">
                    <div className="avatar">
                      <div className="w-8">
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                      </div>
                    </div>
                    <div className="avatar">
                      <div className="w-8">
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                      </div>
                    </div>
                    <div className="avatar">
                      <div className="w-8">
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                      </div>
                    </div>
                  </div>
                  <h1 className="text-sm text-[ #2C2C2C]">Sara +2 more</h1>
                </div>
                <Link
                  to={""}
                  className="flex cursor-pointer items-center rounded-full bg-[#EBEBF0] p-2"
                >
                  <MoveDiagonal className="size-3" strokeWidth={1} />
                </Link>
              </div>
             
            </div>
          </div>
        </div>
        <div>
          <h1 className="text-[ #2C2C2C] mb-4 text-sm font-bold">Candidate</h1>
          <div className="flex h-screen  flex-col gap-y-3 rounded-md bg-white p-5">
            <div className="flex h-20 w-full items-center justify-between rounded-md bg-[#F5F5F7] py-2 pl-5 pr-9">
              <div className="flex items-center gap-x-2">
                <div className="avatar">
                  <div className="w-10 rounded-full">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                  </div>
                </div>
                <div>
                  <h3 className="text-base font-semibold">Harshal H</h3>
                  <p className="text-xs font-medium text-[#2C2C2C66]">
                    UI/UX Design Intern
                  </p>
                </div>
              </div>
              <Link
                to={""}
                className="flex cursor-pointer items-center rounded-full bg-[#EBEBF0] p-2"
              >
                <MoveDiagonal className="size-3" />
              </Link>
            </div>
            <div className="flex h-20 w-full items-center justify-between rounded-md bg-[#F5F5F7] py-2 pl-5 pr-9">
              <div className="flex items-center gap-x-2">
                <div className="avatar">
                  <div className="w-10 rounded-full">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                  </div>
                </div>
                <div>
                  <h3 className="text-base font-semibold">Harshal H</h3>
                  <p className="text-xs font-medium text-[#2C2C2C66]">
                    UI/UX Design Intern
                  </p>
                </div>
              </div>
              <Link
                to={""}
                className="flex cursor-pointer items-center rounded-full bg-[#EBEBF0] p-2"
              >
                <MoveDiagonal className="size-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

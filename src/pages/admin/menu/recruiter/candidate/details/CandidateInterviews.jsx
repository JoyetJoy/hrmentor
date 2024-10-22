import React, { useState } from "react";
import MenuHeader from "@/components/common/MenuHeader";
import { Select } from "@headlessui/react";
import QueryTable from "@/components/table/QueryTable";
import ConsiderCandidate from "@/components/popups/recruiter/candiadate/ConsiderCandidate";
import AddInterview from "@/components/popups/recruiter/candiadate/AddInterview";
import MoveCandidate from "@/components/popups/recruiter/candiadate/MoveCandidate";
import MenuHeaderCandidate from "@/components/recruiter/candidate/MenuHeader";

const buttonSequence = ["addInterviewer", "considerCandidate", "move"];

function CandidateInterviews() {
  const [AddInterviewerPopup, setAddInterviewerPopup] = useState(false);
  const [ConsiderCandidatePopup, setConsiderCandidatePopup] = useState(false);
  const [MovePopup, setMovePopup] = useState(false);

  const [activeButton, setActiveButton] = useState("addInterviewer");
  const [clickedButtons, setClickedButtons] = useState(["addInterviewer"]);

  const handleButtonClick = (buttonName) => {
    const currentIndex = buttonSequence.indexOf(activeButton);
    const newIndex = buttonSequence.indexOf(buttonName);

    if (
      newIndex === currentIndex + 1 ||
      newIndex === currentIndex - 1 ||
      buttonName === activeButton
    ) {
      setActiveButton(buttonName);
      if (!clickedButtons.includes(buttonName)) {
        setClickedButtons([...clickedButtons, buttonName]);
      }

      // Show or hide popups based on button clicked
      if (buttonName === "addInterviewer") {
        setAddInterviewerPopup(true);
        setConsiderCandidatePopup(false);
        setMovePopup(false);
      } else if (buttonName === "considerCandidate") {
        setAddInterviewerPopup(false);
        setConsiderCandidatePopup(true);
        setMovePopup(false);
      } else if (buttonName === "move") {
        setAddInterviewerPopup(false);
        setConsiderCandidatePopup(false);
        setMovePopup(true);
      }
    }
  };

  const getButtonClass = (buttonName) =>
    clickedButtons.includes(buttonName)
      ? "bg-hrmprimaryorange text-sm text-white h-10 px-5 rounded"
      : "bg-[#ECE9F1] text-black/40 text-sm h-10 px-5 rounded";

  const tableData = [
    {
      id: 1,
      interviewType: "Face to face",
      interviewer: "Shajin",
      scheduleddate: "10/10/2023",
      scheduledtime: "10 AM",
      screeningstatus: "Completed",
      status: "Failed",
    },
    {
      id: 2,
      interviewType: "Face to face",
      interviewer: "Shajin",
      scheduleddate: "10/10/2023",
      scheduledtime: "10 AM",
      screeningstatus: "Completed",
      status: "Passed",
    },
  ];

  const columns = [
    {
      accessorKey: "id",
      header: "Sl. no",
    },
    {
      accessorKey: "interviewType",
      header: "Interview Type",
    },
    {
      accessorKey: "interviewer",
      header: "Interviewer",
    },
    {
      accessorKey: "scheduleddate",
      header: "Scheduled date",
    },
    {
      accessorKey: "scheduledtime",
      header: "Scheduled time",
    },
    {
      accessorKey: "screeningstatus",
      header: "Screening status",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;
        let statusClass = "";
        if (status === "Failed")
          statusClass =
            "p-1 bg-[#FFF2F2] px-8 rounded-sm border border-[#E39E9E]";
        else if (status === "Passed")
          statusClass =
            "p-1 bg-[#F0FFF1] px-7 rounded-sm border border-[#8BE691]";
        else if (status === "Hired")
          statusClass =
            "p-1 bg-[#FFEE52]/10 px-9 rounded-sm border border-[#FFEE52]";
        return <span className={statusClass}>{status}</span>;
      },
    },
  ];

  const totalPages = 1;
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <>
      <MenuHeader
        backlink={""}
        menu={"Menu"}
        subMenu={""}
        currentpath={"Recruiter"}
        activeSubMenu={"Candidates"}
        activeMenu={"Candidates"}
      />
      <MenuHeaderCandidate page={3} />
      <div className="flex h-screen flex-col justify-between bg-white px-6 py-6">
        <div className="flex items-center gap-4">
          {buttonSequence.map((buttonName) => (
            <button
              key={buttonName}
              onClick={() => handleButtonClick(buttonName)}
              className={getButtonClass(buttonName)}
            >
              {buttonName === "addInterviewer" && "Add Interviewer"}
              {buttonName === "considerCandidate" && "Consider the Candidate"}
              {buttonName === "move" && "Move"}
            </button>
          ))}
        </div>

        {AddInterviewerPopup && (
          <AddInterview
            AddInterviewerPopup={AddInterviewerPopup}
            setAddInterviewerPopup={setAddInterviewerPopup}
          />
        )}

        {ConsiderCandidatePopup && (
          <ConsiderCandidate
            ConsiderCandidatePopup={ConsiderCandidatePopup}
            setConsiderCandidatePopup={setConsiderCandidatePopup}
          />
        )}

        {MovePopup && (
          <MoveCandidate MovePopup={MovePopup} setMovePopup={setMovePopup} />
        )}

        <div className="flex items-center justify-between py-6">
          <h1 className="text-base font-bold">Interviews</h1>
          <div className="flex items-center justify-center gap-3">
            <label className="input flex h-9 min-h-9 items-center gap-2 border border-[#EBEBF0] pr-28 outline-none">
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
                className="lucide lucide-search size-4 object-contain text-gray-200"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </svg>
              <input
                type="text"
                className="grow text-sm placeholder:text-sm placeholder:font-normal placeholder:text-gray-200 focus:outline-none"
                placeholder="Search"
              />
            </label>
          </div>
        </div>

        <div className="mt-4 flex-grow">
          {activeButton === "addInterviewer" && (
            <QueryTable
              list={tableData}
              columns={columns}
              totalPages={totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
          {activeButton === "considerCandidate" && (
            <QueryTable
              list={tableData}
              columns={columns}
              totalPages={totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
          {activeButton === "move" && (
            <QueryTable
              list={tableData}
              columns={columns}
              totalPages={totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default CandidateInterviews;

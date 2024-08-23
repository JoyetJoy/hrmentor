import React, { useState } from "react";
import MenuHeader from "@/components/common/MenuHeader";

// Update button names here
const buttonSequence = ["addInterviewer", "considerCandidate", "move"];

function Interviews() {
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
    }
  };

  const getButtonClass = (buttonName) =>
    clickedButtons.includes(buttonName)
      ? "bg-[#030E5C] text-white py-1.5 px-5 rounded"
      : "bg-[#ECE9F1] text-white py-1.5 px-5 rounded";

  return (
    <>
      <MenuHeader
        backlink=""
        menu="Menu"
        subMenu=""
        currentpath="Recruiter"
        firstLink="Dashboard"
        secondLink="Jobs"
        thirdLink="Candidate"
        fourthLink="Interview"
        fifthLink="Report"
        six="Settings"
      />
      <div className="bg-white flex flex-col justify-between px-6 h-screen py-6">
        <div className="flex gap-4 items-center">
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
        <div className="flex-grow mt-4">
          {activeButton === "addInterviewer" && <p>This is the content for Add Interviewer. It shows by default.</p>}
          {activeButton === "considerCandidate" && <p>This is the content for Consider the Candidate.</p>}
          {activeButton === "move" && <p>This is the content for Move.</p>}
        </div>
      </div>
    </>
  );
}

export default Interviews;

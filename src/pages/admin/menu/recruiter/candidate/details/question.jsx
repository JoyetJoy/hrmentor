import MenuHeader from "@/components/common/MenuHeader";
import React from "react";

function Question() {
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

      <div className="bg-white flex flex-col gap-4 px-24 h-screen py-20">
        <h1 className="font-bold text-base pt-3">Questions & Answers</h1>
        <div className="collapse collapse-arrow rounded-sm  bg-[#F0F8FF]">
          <input type="radio" name="my-accordion-2" defaultChecked />
          <h1 className="collapse-title  font-bold text-base after:bg-white">
            How do you handle constructive criticism?
          </h1>
          <div className="collapse-content">
            <p className="">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
          </div>
        </div>
        <div className="collapse collapse-arrow rounded-sm  bg-[#F0F8FF]">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title font-bold text-base">
            Click to open this one and close others
          </div>
          <div className="collapse-content">
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
          </div>
        </div>
        <div className="collapse collapse-arrow rounded-sm  bg-[#F0F8FF]">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title font-bold text-base">
            Click to open this one and close others
          </div>
          <div className="collapse-content">
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Question;

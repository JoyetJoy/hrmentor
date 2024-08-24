import { recruiterMenu } from "@/constants/menus/recruiter";
import { ArrowLeft, ChevronRight, User } from "lucide-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";

function MenuHeader(props) {
  const location = useLocation();
  const isActive = (paths) => paths.includes(location.pathname);

  const {
    menu,
    subMenu,
    currentpath,
    activeMenu,
    activeSubMenu = "none",
    icon,
    centertextmain,
    centertext,
    // cnadidate Links
    ProfileLink = "/admin/recruiter/profile",
    QuestionAnswersPath = "/admin/recruiter/question-answers",
    InterviewsLink = "/admin/recruiter/interviews",
    DiscussionsLink = "/admin/recruiter/discussions",
    EmailsLink = "/admin/recruiter/emails",
    DocumentsLink = "/admin/recruiter/documents",
    CandidateHistoryLink = "/admin/recruiter/candidate-history",
  } = props;

  const candidatePaths = [
    ProfileLink,
    QuestionAnswersPath,
    InterviewsLink,
    DiscussionsLink,
    EmailsLink,
    DocumentsLink,
    CandidateHistoryLink,
  ];
  console.log(activeSubMenu)
  const menuItem = recruiterMenu.find((item) => item.name === activeSubMenu);
  return (
    <div className="flex flex-col">
      <div className="bg-white py-2 px-6 flex flex-row items-center justify-between rounded-md my-2">
        <div className="text-sm font-semibold text-black flex items-center justify-between ">
          <ArrowLeft className="size-4 mr-2" />
          {menu}
          <ChevronRight className="size-3" />
          {subMenu}
          {icon}
          <span className="text-textcolor-lightred text-sm">
            {" "}
            {currentpath}
          </span>
        </div>
        <h1 className="text-[0.8rem] font-medium text-black flex items-center justify-between gap-1">
          {centertextmain}
          <span className="text-textcolor-lightred font-bold underline underline-offset-4">
            {centertext}
          </span>
        </h1>
        <div className="text-sm flex items-center gap-7 font-semibold">
          {recruiterMenu?.map((item) => (
            <React.Fragment key={item?.id}>
              <Link
                to={item?.link}
                className={`text-sm  ${
                  activeMenu === item?.name
                    ? "font-extrabold text-[#181C3A] before:bg-[#181C3A]  py-1 px-2 active-menu"
                    : "font-bold text-[#808080]"
                }`}
              >
                {item?.name}
              </Link>
              {/* <div className="py-2 flex flex-row items-center justify-between rounded-md">
                <div className="flex justify-center items-center gap-2">
                  <div className="rounded-full border">
                    <User />
                  </div>
                  <div className="flex flex-col">
                    <div className="text-sm font-semibold">Sandeep Biju</div>
                    <div className="text-xs text-[#7F7F7F]">
                      Clinical Quality Analyst
                    </div>
                  </div>
                </div>
                <div className="text-sm flex items-center gap-10 font-semibold">
                  <Link
                    to={ProfileLink}
                    className={`text-sm ${
                      isActive(["/admin/recruiter/profile"])
                        ? "font-extrabold text-bgColor-100"
                        : "font-normal text-[#808080]"
                    }`}
                  >
                    Profile
                  </Link>
                  <Link
                    to={QuestionAnswersPath}
                    className={`text-sm ${
                      isActive(["/admin/recruiter/question-answers"])
                        ? "font-extrabold text-bgColor-100"
                        : "font-normal text-[#808080]"
                    }`}
                  >
                    Question & Answers
                  </Link>
                  <Link
                    to={InterviewsLink}
                    className={`text-sm ${
                      isActive([InterviewsLink])
                        ? "font-extrabold text-bgColor-100"
                        : "font-normal text-[#808080]"
                    }`}
                  >
                    Interviews
                  </Link>
                  <Link
                    to={DiscussionsLink}
                    className={`text-sm ${
                      isActive([DiscussionsLink])
                        ? "font-extrabold text-bgColor-100"
                        : "font-normal text-[#808080]"
                    }`}
                  >
                    Discussions
                  </Link>
                  <Link
                    to={EmailsLink}
                    className={`text-sm ${
                      isActive([EmailsLink])
                        ? "font-extrabold text-bgColor-100"
                        : "font-normal text-[#808080]"
                    }`}
                  >
                    Emails
                  </Link>
                  <Link
                    to={DocumentsLink}
                    className={`text-sm ${
                      isActive([DocumentsLink])
                        ? "font-extrabold text-bgColor-100"
                        : "font-normal text-[#808080]"
                    }`}
                  >
                    Documents
                  </Link>
                  <Link
                    to={CandidateHistoryLink}
                    className={`text-sm ${
                      isActive([CandidateHistoryLink])
                        ? "font-extrabold text-bgColor-100"
                        : "font-normal text-[#808080]"
                    }`}
                  >
                    Candidate History
                  </Link>
                </div>
              </div> */}
            </React.Fragment>
          ))}
        </div>
      </div>
      {console.log(menuItem)}
      {menuItem?.subMenu && menuItem.subMenu.list && (
        <div className="flex mb-3 flex-row items-center justify-between rounded-md">
          <div className="flex justify-center items-center gap-2">
            <div className="rounded-full border size-7 flex justify-center items-center">
              <User className="fill-black size-4" />
            </div>
            <div className="flex flex-col">
              <div className="text-sm font-semibold">Sandeep Biju</div>
              <div className="text-xs text-[#7F7F7F]">
                Clinical Quality Analyst
              </div>
            </div>
          </div>
          <div className="text-sm flex items-center gap-10 font-semibold">
            {menuItem.subMenu.list?.map((item) => (
              <Link
                to={item?.link}
                className={`text-sm px-2 py-1 ${
                  isActive([item?.link])
                    ? "font-extrabold active-menu before:bg-[#181C3A]  text-bgColor-100"
                    : "font-normal text-[#808080]"
                }`}
              >
                {item?.name}
              </Link>
            ))}
          </div>
        </div>
      )}
      {/* {candidatePaths.includes("location.pathname") && (
        <div className="py-2 flex flex-row items-center justify-between rounded-md">
          <div className="flex justify-center items-center gap-2">
            <div className="rounded-full border">
              <User />
            </div>
            <div className="flex flex-col">
              <div className="text-sm font-semibold">Sandeep Biju</div>
              <div className="text-xs text-[#7F7F7F]">
                Clinical Quality Analyst
              </div>
            </div>
          </div>
          <div className="text-sm flex items-center gap-10 font-semibold">
            <Link
              to={ProfileLink}
              className={`text-sm ${
                isActive(["/admin/recruiter/profile"])
                  ? "font-extrabold text-bgColor-100"
                  : "font-normal text-[#808080]"
              }`}
            >
              Profile
            </Link>
            <Link
              to={QuestionAnswersPath}
              className={`text-sm ${
                isActive(["/admin/recruiter/question-answers"])
                  ? "font-extrabold text-bgColor-100"
                  : "font-normal text-[#808080]"
              }`}
            >
              Question & Answers
            </Link>
            <Link
              to={InterviewsLink}
              className={`text-sm ${
                isActive([InterviewsLink])
                  ? "font-extrabold text-bgColor-100"
                  : "font-normal text-[#808080]"
              }`}
            >
              Interviews
            </Link>
            <Link
              to={DiscussionsLink}
              className={`text-sm ${
                isActive([DiscussionsLink])
                  ? "font-extrabold text-bgColor-100"
                  : "font-normal text-[#808080]"
              }`}
            >
              Discussions
            </Link>
            <Link
              to={EmailsLink}
              className={`text-sm ${
                isActive([EmailsLink])
                  ? "font-extrabold text-bgColor-100"
                  : "font-normal text-[#808080]"
              }`}
            >
              Emails
            </Link>
            <Link
              to={DocumentsLink}
              className={`text-sm ${
                isActive([DocumentsLink])
                  ? "font-extrabold text-bgColor-100"
                  : "font-normal text-[#808080]"
              }`}
            >
              Documents
            </Link>
            <Link
              to={CandidateHistoryLink}
              className={`text-sm ${
                isActive([CandidateHistoryLink])
                  ? "font-extrabold text-bgColor-100"
                  : "font-normal text-[#808080]"
              }`}
            >
              Candidate History
            </Link>
          </div>
        </div>
      )} */}
    </div>
  );
}

export default MenuHeader;

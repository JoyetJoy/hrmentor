import MenuHeader from "@/components/common/MenuHeader";

function RecruiterReports() {
  // Highlight Report
  return (
    <div className="">
      <MenuHeader
        backlink={""}
        menu={"Menu"}
        subMenu={""}
        currentpath={"Recruiter"}
        activeMenu={"Reports"}
      />
      <div className="flex min-h-[520px] flex-col gap-7 rounded-md bg-white px-10 py-6">
        <h1 className="text-base font-bold leading-7 text-neutral-700">
          Highlight Report
        </h1>
        <div className="mt-4 grid max-w-5xl grid-cols-4 gap-3">
          <div className="flex h-24 cursor-pointer flex-col items-center justify-center gap-2 rounded bg-[#AE3C60]/5 p-3 text-sm font-medium">
            <img
              className="h-8 object-contain"
              src="/assets/icons/recruter/report/0.svg"
              alt=""
            />
            <p>Job Reports</p>
          </div>
          <div className="flex h-24 cursor-pointer flex-col items-center justify-center gap-2 rounded bg-[#EEB81E]/5 p-3 text-sm font-medium">
            <img
              className="h-8 object-contain"
              src="/assets/icons/recruter/report/1.svg"
              alt=""
            />
            <p>Interview by jobs</p>
          </div>
          <div className="flex h-24 cursor-pointer flex-col items-center justify-center gap-2 rounded bg-[#255E79]/5 p-3 text-sm font-medium">
            <img
              className="h-8 object-contain"
              src="/assets/icons/recruter/report/2.svg"
              alt=""
            />
            <p>Time to hire by jobs</p>
          </div>
          <div className="flex h-24 cursor-pointer flex-col items-center justify-center gap-2 rounded bg-[#255E79]/5 p-3 text-sm font-medium">
            <img
              className="h-8 object-contain"
              src="/assets/icons/recruter/report/3.svg"
              alt=""
            />
            <p>Saved reports</p>
          </div>
        </div>
        <p className="max-w-5xl text-sm font-medium text-black/50">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>
      </div>
    </div>
  );
}

export default RecruiterReports;

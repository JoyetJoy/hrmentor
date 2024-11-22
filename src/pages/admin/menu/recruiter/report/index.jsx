import MenuHeader from "@/components/common/MenuHeader";
import CustomBarChart from "@/components/recruiter/report/Bargraph";
import SingleLineChart from "@/components/recruiter/report/Linegraph";

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
        <div className="mt-4 grid  grid-cols-4 gap-5">
          <div className="flex h-32 cursor-pointer flex-col items-center justify-center gap-2 rounded bg-pinkishred/5 p-3 text-sm font-medium">
            <img
              className="h-8 object-contain"
              src="/assets/icons/recruter/report/0.svg"
              alt=""
            />
            <p>Job Reports</p>
          </div>
          <div className="flex h-32 cursor-pointer flex-col items-center justify-center gap-2 rounded bg-goldenyellow/5 p-3 text-sm font-medium">
            <img
              className="h-8 object-contain"
              src="/assets/icons/recruter/report/1.svg"
              alt=""
            />
            <p>Interview by jobs</p>
          </div>
          <div className="flex h-32 cursor-pointer flex-col items-center justify-center gap-2 rounded bg-coolblack/5 p-3 text-sm font-medium">
            <img
              className="h-8 object-contain"
              src="/assets/icons/recruter/report/2.svg"
              alt=""
            />
            <p>Time to hire by jobs</p>
          </div>
          <div className="flex h-32 cursor-pointer flex-col items-center justify-center gap-2 rounded bg-coolblack/5 p-3 text-sm font-medium">
            <img
              className="h-8 object-contain"
              src="/assets/icons/recruter/report/3.svg"
              alt=""
            />
            <p>Saved reports</p>
          </div>
        </div>
        <p className="text-[0.9rem] font-medium text-black/50">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>
        <div className="w-full h-full mt-16 flex flex-col lg:flex-row">
          <div className="w-full lg:w-7/12">
            <CustomBarChart/>

          </div>
          <div className="w-full lg:w-6/12">
            <SingleLineChart/>
          </div>
        </div>

      </div>
    </div>
  );
}

export default RecruiterReports;

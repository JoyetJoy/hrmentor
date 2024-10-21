import {
  CAREER_FILTER_LIST,
  EMPLOYEE_DEPARTMENT_LIST,
  EMPLOYEE_TYPE_LIST,
  MINIMUM_EXPERIENCE_LIST,
} from "@/api/master";
import useEmployeeMaster from "@/hooks/useEmployeeMasters";

export default function JobFilter({
  setSelectedEmpType,
  selectedEmpType,
  setSelectedDepartment,
  selectedDepartment,
  setSelectedExp,
  selectedExp,
}) {
  // Careers filters LIST
  const { data: careersFiltersList } = useEmployeeMaster(
    CAREER_FILTER_LIST,
    "careersFiltersList",
  );

  const handleEmploymentTypeClick = (id) => {
    setSelectedEmpType((prev) =>
      prev?.includes(id)
        ? prev?.filter((catId) => catId !== id)
        : [...prev, id],
    );
  };

  const handleDepartmentClick = (id) => {
    setSelectedDepartment((prev) =>
      prev?.includes(id)
        ? prev?.filter((catId) => catId !== id)
        : [...prev, id],
    );
  };
  const handleExperienceClick = (id) => {
    setSelectedExp((prev) =>
      prev?.includes(id)
        ? prev?.filter((catId) => catId !== id)
        : [...prev, id],
    );
  };

  const handleClear = () => {
    setSelectedEmpType([]);
    setSelectedDepartment([]);
    setSelectedExp([]);
  };

  return (
    <>
      <div className="h-fit w-full flex-col rounded bg-white pb-7 lg:relative lg:z-auto lg:flex">
        <div className="flex items-center justify-between gap-2 px-5 py-3.5 font-bold">
          <div className="flex w-full items-center justify-between gap-2">
            <p className="text-lg text-black/80">Filters</p>
            <span
              onClick={handleClear}
              className="cursor-pointer text-sm text-red-500"
            >
              Clear All
            </span>
          </div>
        </div>
        {/* Employment Type Filter */}
        <div className="flex flex-col gap-3 pt-7 text-[.85rem] font-semibold text-black/70">
          <h3 className="px-5 font-bold text-black">Employment Type</h3>
          <div className="overflow-y-custom flex max-h-32 flex-col gap-2.5 overflow-auto pl-5 capitalize">
            {careersFiltersList?.employeementTypes?.map((i) => (
              <div key={i?.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedEmpType?.includes(i?.id)}
                  onChange={() => handleEmploymentTypeClick(i?.id)}
                  className="size-4"
                />
                <p
                  className={`cursor-pointer ${
                    selectedEmpType?.includes(i?.id) ? "text-blue" : ""
                  }`}
                >
                  {i?.employment_type_name}
                </p>
              </div>
            ))}
          </div>
        </div>
        {/* Department Filter */}
        <div className="flex flex-col gap-3 pt-7 text-[.85rem] font-semibold text-black/70">
          <h3 className="px-5 font-bold text-black">Department</h3>
          <div className="overflow-y-custom flex max-h-72 flex-col gap-2.5 overflow-auto pl-5 capitalize">
            {careersFiltersList?.departments?.map((i) => (
              <div key={i?.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedDepartment?.includes(i?.id)}
                  onChange={() => handleDepartmentClick(i?.id)}
                  className="size-4"
                />
                <p
                  className={`cursor-pointer ${
                    selectedDepartment?.includes(i?.id) ? "text-blue" : ""
                  }`}
                >
                  {i?.department_name}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3 pt-7 text-[.85rem] font-semibold text-black/70">
          <h3 className="px-5 font-bold text-black">Minimum Experience</h3>
          <div className="overflow-y-custom flex max-h-72 flex-col gap-2.5 overflow-auto pl-5 capitalize">
            {careersFiltersList?.minimumExperiences?.map((i) => (
              <div key={i?.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedExp?.includes(i?.id)}
                  onChange={() => handleExperienceClick(i?.id)}
                  className="size-4"
                />
                <p
                  className={`cursor-pointer ${
                    selectedExp?.includes(i?.id) ? "text-blue" : ""
                  }`}
                >
                  {i?.minimum_experience_type_name}
                </p>
              </div>
            ))}
          </div>
        </div>{" "}
        {/* Apply Filter Button */}
        <button className="bg-blue mx-auto mt-10 flex h-11 w-[90%] items-center justify-center rounded-full text-[0.9rem] font-medium text-white">
          Apply Filter
        </button>
      </div>
    </>
  );
}

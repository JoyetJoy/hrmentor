
import { TrendingDown, TrendingUp, Eye } from "lucide-react";
import { Link } from "react-router-dom";

 
export default function StatsCard({data}) {
  
  const employeeDetails = [
    {
      title: "Total Employees",
      value: `${data?.total_employees_count||'0'}`,
      path: "/admin/employee",
      percentage: `${data?.total_employees_percentage}`,
      trend: "plus",
      description: "Employees",
    },
    {
      title: "Job Open",
      value: `${data?.openJobs||'0'}`,
      path: "/admin/recruiter/jobs",
      percentage: `${data?.openJobs_percentage}`,
      trend: "plus",
      description: "Jobs",
    },
    {
      title: "Job Applied",
      value: `${data?.total_job_applications||'0'}`,
      percentage: `${data?.total_job_applications_percentage}`,
      trend: "minus",
      description: "Applicants",
    },
    {
      title: "Employees on Holiday",
      value: `${data?.total_leaves_today||'0'}`,
      percentage: `${data?.openJobs_percentage}`,
      trend: "plus",
      description: "Employees",
    },
  ];
  

  return (
    <div className="grid w-full grid-cols-4 gap-3">
      {employeeDetails.map((stat, index) => (
        <div
          key={index}
          className="flex w-full flex-col items-start rounded-md border border-black/10 bg-white px-5 py-4"
        >
          <div className="mb-4 flex items-center gap-2">
            <h2 className="flex text-sm font-semibold text-black flex-wrap">
              {stat.title}
            </h2>
            {/* <span
              className={`flex h-7 items-center justify-center gap-1 rounded-full bg-darkgreen px-2 text-[0.78rem] font-semibold text-textcolor-green ${
                stat.trend === "minus" ? "bg-textcolor-red/10 text-textcolor-red" : ""
              }`}
            >
              {stat.trend === "minus" ? (
                <TrendingDown className="h-4 text-red-500" />
              ) : (
                <TrendingUp className="h-4" />
              )}
              {stat.percentage}
            </span> */}
          </div>
          <div className="flex justify-between w-full items-center">
            <div>
            <h1 className="flex items-end gap-3 text-2xl font-bold text-black">
            {stat.value}
          </h1>
          <p className="mt-1 text-xs text-gray-cool">{stat.description}</p>
            </div>
            <Link 
            to={stat.path}
            className="h-5 w-5 flex cursor-pointer items-center justify-center rounded-full bg-gray-soft">
              <Eye className="size-3" />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

import CompanyMenuHeader from "@/components/company/MenuHeader";
import { yupResolver } from "@hookform/resolvers/yup";
import { ArrowLeft, ChevronRight, Plus, Trash2, Upload } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import CompanyCreateSideBar from "@/components/sidebars/company/CompanyCreateSideBar";
import { COMPANY_CALENDER, newRequest, WORK_LOCATIONS } from "@/api";
import { useUserStore } from "@/lib/slices/auth.slice";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { companySettingSideList } from "@/constants/dummyData";
import { Link } from "react-router-dom";
import QueryTable from "@/components/table/QueryTable";

const CompanyCalenderSchema = Yup.object({
  max_work_hr: Yup.string(),
  shift_start_time: Yup.string(),
  shift_end_time: Yup.string(),
  shift_duration: Yup.string(),
  full_day: Yup.string(),
  full_tolarance: Yup.string(),
  half_day: Yup.string(),
  half_day_tolarance: Yup.string(),
});

const monthOptions = [
  { value: "jan", label: "January" },
  { value: "feb", label: "February" },
  { value: "mar", label: "March" },
  { value: "apr", label: "April" },
  { value: "may", label: "May" },
  { value: "jun", label: "June" },
  { value: "jul", label: "July" },
  { value: "aug", label: "August" },
  { value: "sep", label: "September" },
  { value: "oct", label: "October" },
  { value: "nov", label: "November" },
  { value: "dec", label: "December" },
];

const weekOptions = [
  { value: "mon", label: "Monday" },
  { value: "tue", label: "Tuesday" },
  { value: "wed", label: "Wednesday" },
  { value: "thu", label: "Thursday" },
  { value: "fri", label: "Friday" },
  { value: "sat", label: "Saturday" },
  { value: "sun", label: "Sunday" },
];

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const headers = ["All", "1st", "2nd", "3rd", "4th", "5th", "Alternate weekend"];

export default function CompanyCalender() {
  const [activeItem, setActiveItem] = useState("Calender settings");
  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
  };
  const [loader, setLoader] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [pageLimit, setPageLimit] = useState(10);
  const navigate = useNavigate();
  const [deletePopup, setDeletePopup] = useState(false);
  const { user } = useUserStore((state) => ({
    user: state.user,
  }));
  const { id } = useParams();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(CompanyCalenderSchema),
  });

  function close() {
    SetCompanyCalender({
      max_work_hr: "",
      shift_start_time: "",
      shift_end_time: "",
      shift_duration: "",
      full_day: "",
      full_tolarance: "",
      half_day: "",
      half_day_tolarance: "",
    });
  }

  const [location, setLocation] = useState([]);
  const [fiscalCalendar, setFiscalCalendar] = useState(false);
  const [leaveYear, setLeaveYear] = useState(false);
  const [calenderFrom, setCalenderFrom] = useState("");
  const [calenderTo, setCalenderTo] = useState("");
  const [yearFrom, setYearFrom] = useState("");
  const [yearTo, setYearTo] = useState("");
  const [weekStart, setWeekStart] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [selectedField, setSelectedField] = useState(null);

  const [companyCalender, SetCompanyCalender] = useState({
    max_work_hr: "",
    shift_start_time: "",
    shift_end_time: "",
    shift_duration: "",
    full_day: "",
    full_tolarance: "",
    half_day: "",
    half_day_tolarance: "",
  });

  const HandleCompanyCalender = (e) => {
    SetCompanyCalender({
      ...companyCalender,
      [e.target.name]: e.target.value,
    });
  };

  const [weekendDefinition, setWeekendDefinition] = useState(
    days.reduce((acc, day) => {
      acc[day.toLowerCase()] = Array(headers.length).fill(false);
      return acc;
    }, {}),
  );

  // Handle checkbox change
  const handleCheckboxChange = (day, index) => {
    setWeekendDefinition((prev) => ({
      ...prev,
      [day]: prev[day]?.map((selected, i) =>
        i === index ? !selected : selected,
      ),
    }));
  };

  const { data: companyCalenderDetails } = useQuery({
    queryKey: ["companyCalenderDetails", user?.id],
    queryFn: () =>
      newRequest
        .get(COMPANY_CALENDER, {
          params: {
            user_id: user?.id,
          },
        })

        .then((res) => res.data.original.data),
    enabled: !!user?.id, // Ensure the query only runs if `user.id` is available
  });

  const { data: localtionDetails } = useQuery({
    queryKey: ["localtionDetails", user?.id],
    queryFn: () =>
      newRequest
        .get(WORK_LOCATIONS, {
          params: {
            user_id: user?.id,
          },
        })

        .then((res) => res.data),
    enabled: !!user?.id, // Ensure the query only runs if `user.id` is available
  });

  const onSubmit = async () => {
    setLoader(true);
    try {
      const location_id = location?.map((item) => item.id);
      const formData = {
        location: location_id,
        fiscal_calendar: fiscalCalendar,
        fiscal_year_calender_from: calenderFrom,
        fiscal_year_calender_to: calenderTo,
        leave_year: leaveYear,
        leave_year_from: yearFrom,
        leave_year_to: yearTo,
        max_work_hr_per_day: companyCalender.max_work_hr,
        week_start: weekStart,
        shift_start_time: companyCalender.shift_start_time,
        shift_end_time: companyCalender.shift_end_time,
        shift_duration: companyCalender.shift_duration,
        minimum_hours_required_for_full_day: companyCalender.full_day,
        full_tolarance: companyCalender.full_tolarance,
        half_day: companyCalender.half_day,
        half_day_tolarance: companyCalender.half_day_tolarance,
        weekend_definition: weekendDefinition,
      };
      const res = await newRequest.post(
        `${COMPANY_CALENDER}`, // URL with dynamic ID
        formData, // formData should be the second argument, which is the request body
        {
          params: {
            user_id: user?.id,
          },
        },
      );
      if (res) {
        toast.success(res?.data?.message);
        close();
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.error);
    } finally {
      setLoader(false);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await newRequest.delete(`${COMPANY_CALENDER}/${selectedId}`);

      if (res) {
        queryClient.invalidateQueries([qrkey]);
        setLoader(false);
        toast.success(res?.message);
        setDeletePopup(false);
        window.location.reload();
      }
    } catch (error) {
      setLoader(false);
      setDeletePopup(false);
      toast.error(error?.response?.data?.message);
      console.error(error);
    }
  };

  const columns = React.useMemo(
    () => [
      {
        header: "Sl No",
        accessorKey: "sno",
        cell: ({ row }) => {
          return (
            <div className="flex px-2">
              {row.index + 1 + (currentPage - 1) * pageLimit}
            </div>
          );
        },
      },
      {
        header: "Location",
        cell: ({ row }) => (
          <p className="">{row.original?.location?.work_location_name}</p>
        ),
      },
      {
        header: "Fiscal Year",
        accessorKey: "date",
        cell: ({ row }) => {
          const fromMonth = monthOptions.find(
            (month) => month.value === row.original?.fiscal_year_calender_from,
          )?.label;

          const toMonth = monthOptions.find(
            (month) => month.value === row.original?.fiscal_year_calender_to,
          )?.label;

          return (
            <p className="">
              {fromMonth} - {toMonth}
            </p>
          );
        },
      },
      {
        header: "Leave Year",
        accessorKey: "description",
        cell: ({ row }) => {
          const fromMonth = monthOptions.find(
            (month) => month.value === row.original?.leave_year_from,
          )?.label;

          const toMonth = monthOptions.find(
            (month) => month.value === row.original?.leave_year_to,
          )?.label;

          return (
            <p className="">
              {fromMonth} - {toMonth}
            </p>
          );
        },
      },
      {
        header: "Action",
        accessorKey: "location",
        cell: ({ row }) => (
          <>
            <div className="flex items-center gap-2 text-xs">
              <button
                type="button"
                onClick={() =>
                  navigate(
                    `/admin/company/add_calender/${id}?popupOpens=true&selectIds=${row?.original?.id}`,
                  )
                }
                className="flex size-7 cursor-pointer items-center rounded-full bg-[#EBEBF0] p-2"
              >
                <img
                  src="/assets/icons/admin/marker.svg"
                  className="w-full object-contain"
                />
              </button>
              <button
                type="button"
                onClick={() => {
                  setDeletePopup(true);
                  setSelectedId(row?.original?.id);
                }}
                className="flex cursor-pointer items-center justify-center rounded-full bg-[#EBEBF0] p-2 text-[#2C2C2C]"
              >
                <Trash2 className="size-3" />
              </button>
            </div>
          </>
        ),
      },
    ],
    [companyCalenderDetails],
  );
  return (
    <>
      {!companyCalender ? (
        <>
          <CompanyMenuHeader />
          <div className="flex flex-row items-start justify-between gap-3">
            <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3 mt-1 flex items-center justify-between">
                <div className="flex flex-row items-center justify-center gap-2 text-base font-bold text-black">
                  <ArrowLeft
                    onClick={() => history.back()}
                    className="size-4 cursor-pointer"
                  />
                  Company Profiless{" "}
                </div>
                <button
                  type="submit"
                  className="btn flex h-10 min-h-10 min-w-24 items-center rounded bg-hrmprimaryorange text-sm font-medium text-white transition-all duration-500 hover:bg-hrmblue/70"
                >
                  {loader ? (
                    <div className="flex items-center gap-3">
                      <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
                      Saving
                    </div>
                  ) : (
                    "Save"
                  )}
                </button>
              </div>
              <div className="w-full rounded-md bg-white px-5 py-7">
                <div className="group flex w-full items-center gap-x-2">
                  <div className="flex size-5 min-w-5 items-center justify-center rounded-full bg-gray-darklight">
                    <ChevronRight className="size-4 group-data-[open]:rotate-90" />
                  </div>
                  <p className="flex flex-row whitespace-nowrap text-sm font-semibold">
                    Calender Settings
                  </p>
                  <div className="h-px w-full bg-gray-light"></div>
                </div>
                <div className="grid w-1/2 grid-cols-1 items-baseline justify-center gap-y-2 rounded-md px-5 py-4">
                  <div className="group col-span-2 flex flex-col space-y-1 px-3 py-1">
                    <label className="label-text">Location</label>
                    <div className="flex items-center gap-2">
                      <Controller
                        name="accural_monthly"
                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                            options={localtionDetails}
                            isMulti
                            isSearchable
                            placeholder="Select a Location"
                            onChange={(selectedOption) => {
                              field.onChange(selectedOption); // Update the form value
                              setLocation(selectedOption);
                            }}
                            className="input-box w-full"
                          />
                        )}
                      />
                      <div className="rounded-full bg-hrmprimaryorange">
                        {/* <Plus className="size-6 text-white" /> */}
                      </div>
                    </div>
                  </div>
                  <div className="group col-span-2 flex items-center gap-4 space-y-1 px-3 py-1">
                    <h1 className="text-sm">Fiscal calender</h1>
                    <div
                      onClick={() => {
                        if (fiscalCalendar) {
                          setFiscalCalendar(false);
                        } else {
                          setFiscalCalendar(true);
                        }
                      }}
                      className={`h-5 w-10 rounded-full p-[1px] ${fiscalCalendar ? "bg-[#8be691] pt-[2.1px]" : "border border-[#888888] bg-white pt-[1.5px]"}`}
                    >
                      <div
                        className={`h-4 w-4 ${fiscalCalendar ? "bg-[#00b448]" : "bg-black"} transform rounded-full transition-transform ${
                          fiscalCalendar ? "translate-x-5" : "translate-x-0"
                        }`}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-dark">
                      Same as the calendar year
                    </p>
                  </div>
                  {fiscalCalendar && (
                    <div className="grid grid-cols-2">
                      <div className="group flex flex-col space-y-1 px-3 py-1">
                        <label className="label-text">From</label>
                        <Controller
                          name="accural_monthly"
                          control={control}
                          render={({ field }) => (
                            <Select
                              {...field}
                              value={monthOptions.find(
                                (option) => option.value === calenderFrom,
                              )}
                              options={monthOptions}
                              isSearchable
                              placeholder="Select a month"
                              onChange={(selectedOption) => {
                                field.onChange(selectedOption.value); // Update the form value
                                setCalenderFrom(selectedOption.value); // Update local state with selected month
                              }}
                              className="input-box w-full"
                            />
                          )}
                        />
                      </div>
                      <div className="group flex flex-col space-y-1 px-3 py-1">
                        <label className="label-text">To</label>
                        <Controller
                          name="accural_monthly"
                          control={control}
                          render={({ field }) => (
                            <Select
                              {...field}
                              value={monthOptions.find(
                                (option) => option.value === calenderTo,
                              )}
                              options={monthOptions}
                              isSearchable
                              placeholder="Select a month"
                              onChange={(selectedOption) => {
                                field.onChange(selectedOption.value); // Update the form value
                                setCalenderTo(selectedOption.value); // Update local state with selected month
                              }}
                              className="input-box w-full"
                            />
                          )}
                        />
                      </div>
                    </div>
                  )}
                  <p className="col-span-2 mt-3 border-l-4 border-orange bg-coolorange py-3 pl-3 text-xs font-normal text-gray-darkpale">
                    The financial-based calculation will consider the selected
                    period as one year
                  </p>
                  <div className="group col-span-2 flex items-center gap-4 space-y-1 px-3 py-1">
                    <h1 className="text-sm">Leave year</h1>
                    <div
                      onClick={() => {
                        if (leaveYear) {
                          setLeaveYear(false);
                        } else {
                          setLeaveYear(true);
                        }
                      }}
                      className={`h-5 w-10 rounded-full p-[1px] ${leaveYear ? "bg-[#8be691] pt-[2.1px]" : "border border-[#888888] bg-white pt-[1.5px]"}`}
                    >
                      <div
                        className={`h-4 w-4 ${leaveYear ? "bg-[#00b448]" : "bg-black"} transform rounded-full transition-transform ${
                          leaveYear ? "translate-x-5" : "translate-x-0"
                        }`}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-dark">
                      Same as the calendar year
                    </p>
                  </div>
                  {leaveYear && (
                    <div className="grid grid-cols-2">
                      <div className="group flex flex-col space-y-1 px-3 py-1">
                        <label className="label-text">From</label>
                        <Controller
                          name="accural_monthly"
                          control={control}
                          render={({ field }) => (
                            <Select
                              {...field}
                              value={monthOptions.find(
                                (option) => option.value === yearFrom,
                              )}
                              options={monthOptions}
                              isSearchable
                              placeholder="Select a month"
                              onChange={(selectedOption) => {
                                field.onChange(selectedOption.value); // Update the form value
                                setYearFrom(selectedOption.value); // Update local state with selected month
                              }}
                              className="input-box w-full"
                            />
                          )}
                        />
                      </div>
                      <div className="group flex flex-col space-y-1 px-3 py-1">
                        <label className="label-text">To</label>
                        <Controller
                          name="accural_monthly"
                          control={control}
                          render={({ field }) => (
                            <Select
                              {...field}
                              value={monthOptions.find(
                                (option) => option.value === yearTo,
                              )}
                              options={monthOptions}
                              isSearchable
                              placeholder="Select a month"
                              onChange={(selectedOption) => {
                                field.onChange(selectedOption.value); // Update the form value
                                setYearTo(selectedOption.value); // Update local state with selected month
                              }}
                              className="input-box w-full"
                            />
                          )}
                        />
                      </div>
                    </div>
                  )}
                  <p className="col-span-2 mt-3 border-l-4 border-orange bg-coolorange py-3 pl-3 text-xs font-normal text-gray-darkpale">
                    The leave based calculation will consider the selected
                    period as one year
                  </p>
                  <div className="grid grid-cols-2">
                    <div className="group flex flex-col space-y-1 px-3 py-1">
                      <label className="label-text">
                        Maximun working hours per day
                      </label>
                      <input
                        autoComplete="off"
                        type="text"
                        className="input-box"
                        name="max_work_hr"
                        value={companyCalender.max_work_hr}
                        onChange={HandleCompanyCalender}
                      />
                      {errors.max_work_hr && (
                        <span className="text-xs font-medium text-red-500">
                          {errors.max_work_hr?.message}
                        </span>
                      )}
                    </div>
                    <div className="group flex flex-col space-y-1 px-3 py-1">
                      <label className="label-text">Week start on</label>
                      <Controller
                        name="accural_monthly"
                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                            value={weekOptions.find(
                              (option) => option.value === field.value,
                            )}
                            options={weekOptions}
                            isSearchable
                            placeholder="Select a Day"
                            onChange={(selectedOption) => {
                              field.onChange(selectedOption.value); // Update the form value
                              setWeekStart(selectedOption.value); // Update local state with selected month
                            }}
                            className="input-box w-full"
                          />
                        )}
                      />
                    </div>
                    <div className="group flex flex-col space-y-1 px-3 py-1">
                      <label className="label-text">Shift Start time</label>
                      <input
                        autoComplete="off"
                        type="time"
                        placeholder="HH:MM"
                        className="input-box"
                        name="shift_start_time"
                        value={companyCalender.shift_start_time}
                        onChange={HandleCompanyCalender}
                      />
                      {errors.shift_start_time && (
                        <span className="text-xs font-medium text-red-500">
                          {errors.shift_start_time?.message}
                        </span>
                      )}
                    </div>
                    <div className="group flex flex-col space-y-1 px-3 py-1">
                      <label className="label-text">Shift end time</label>
                      <input
                        autoComplete="off"
                        type="time"
                        placeholder="HH:MM"
                        className="input-box"
                        name="shift_end_time"
                        value={companyCalender.shift_end_time}
                        onChange={HandleCompanyCalender}
                      />
                      {errors.shift_end_time && (
                        <span className="text-xs font-medium text-red-500">
                          {errors.shift_end_time?.message}
                        </span>
                      )}
                    </div>
                    <div className="group flex flex-col space-y-1 px-3 py-1">
                      <label className="label-text">Shift duration</label>
                      <input
                        autoComplete="off"
                        type="time"
                        className="input-box"
                        placeholder="HH:MM"
                        name="shift_duration"
                        value={companyCalender.shift_duration}
                        onChange={HandleCompanyCalender}
                      />
                      {errors.shift_duration && (
                        <span className="text-xs font-medium text-red-500">
                          {errors.shift_duration?.message}
                        </span>
                      )}
                    </div>
                  </div>
                  <h1 className="col-span-2 my-3 text-base font-semibold text-black">
                    Minimum hours required for
                  </h1>
                  <div className="grid grid-cols-2">
                    <div className="group flex flex-col space-y-1 px-3 py-1">
                      <label className="label-text">Full day</label>
                      <input
                        autoComplete="off"
                        type="time"
                        placeholder="HH:MM"
                        name="full_day"
                        value={companyCalender.full_day}
                        onChange={HandleCompanyCalender}
                        className="input-box"
                      />

                      {errors.full_day && (
                        <span className="text-xs font-medium text-red-500">
                          {errors.full_day?.message}
                        </span>
                      )}
                    </div>
                    <div className="group flex flex-col space-y-1 px-3 py-1">
                      <label className="label-text">Full day tolarance</label>
                      <input
                        autoComplete="off"
                        placeholder="HH:MM"
                        type="time"
                        name="full_tolarance"
                        value={companyCalender.full_tolarance}
                        onChange={HandleCompanyCalender}
                        className="input-box"
                      />
                      {errors.full_tolarance && (
                        <span className="text-xs font-medium text-red-500">
                          {errors.full_tolarance?.message}
                        </span>
                      )}
                    </div>
                    <div className="group flex flex-col space-y-1 px-3 py-1">
                      <label className="label-text">Half day </label>
                      <input
                        autoComplete="off"
                        type="time"
                        placeholder="HH:MM"
                        name="half_day"
                        value={companyCalender.half_day}
                        onChange={HandleCompanyCalender}
                        className="input-box"
                      />
                      {errors.half_day && (
                        <span className="text-xs font-medium text-red-500">
                          {errors.half_day?.message}
                        </span>
                      )}
                    </div>
                    <div className="group flex flex-col space-y-1 px-3 py-1">
                      <label className="label-text">Half day tolarance</label>
                      <input
                        autoComplete="off"
                        type="time"
                        placeholder="HH:MM"
                        name="half_day_tolarance"
                        value={companyCalender.half_day_tolarance}
                        onChange={HandleCompanyCalender}
                        className="input-box"
                      />
                      {errors.half_day_tolarance && (
                        <span className="text-xs font-medium text-red-500">
                          {errors.half_day_tolarance?.message}
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="col-span-2 mt-3 border-l-4 border-orange bg-coolorange py-3 pl-3 text-xs font-normal text-gray-darkpale">
                    Employee must reach the minimum hours required to qualify
                    themselves as full day or half day present
                  </p>
                  <div>
                    <h1 className="col-span-2 my-6 text-base font-semibold text-black">
                      Weekend definition
                    </h1>
                    <p className="col-span-2 mb-7 mt-3 border-l-4 border-orange bg-coolorange py-3 pl-3 text-xs font-normal text-gray-darkpale">
                      The selected day(s) will be considered as weekend
                    </p>

                    <div className="grid grid-cols-8 gap-28 text-center font-semibold">
                      <div></div>
                      {headers?.map((header, index) => (
                        <div
                          key={index}
                          className="whitespace-nowrap text-sm font-normal"
                        >
                          {header}
                        </div>
                      ))}
                    </div>

                    {days?.map((day, dayIndex) => (
                      <div
                        key={dayIndex}
                        className="my-7 grid grid-cols-8 items-center gap-28 text-center"
                      >
                        <div className="text-left">{day}</div>
                        {headers?.map((_, colIndex) => (
                          <input
                            key={colIndex}
                            type="checkbox"
                            className="h-5 w-5 rounded border-gray-400 focus:ring-hrmprimaryorange focus:ring-offset-0"
                            checked={
                              weekendDefinition[day.toLowerCase()][colIndex]
                            }
                            onChange={() =>
                              handleCheckboxChange(day.toLowerCase(), colIndex)
                            }
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </form>
            <CompanyCreateSideBar stepCounter={4} />
          </div>
        </>
      ) : (
        <>
          {deletePopup && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-lg">
                <h2 className="text-lg font-extrabold text-black/70">
                  Confirm Delete
                </h2>
                <p className="mt-2 text-sm text-gray-medium">
                  Are you sure you want to delete this item? This action cannot
                  be undone.
                </p>
                <div className="mt-6 flex justify-end gap-4">
                  <button
                    onClick={() => {
                      onCancel(false);
                    }}
                    className="rounded-lg border border-gray-light px-4 py-2 text-sm font-semibold text-gray-medium hover:bg-gray-smoke"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
                  >
                    {loader ? (
                      <div className="flex items-center gap-3">
                        <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
                        Deleting
                      </div>
                    ) : (
                      "Delete"
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
          <CompanyMenuHeader />
          <div className="mb-3 mt-1 flex items-center justify-between">
            <div className="flex flex-row items-center justify-center gap-2 text-base font-bold text-black">
              <ArrowLeft
                onClick={() => history.back()}
                className="size-4 cursor-pointer"
              />
              Company Profile{" "}
            </div>
            {/* <button
              type="submit"
              className="btn flex h-10 min-h-10 min-w-24 items-center rounded bg-hrmprimaryorange text-sm font-medium text-white transition-all duration-500 hover:bg-hrmblue/70"
            >
              {loader ? (
                <div className="flex items-center gap-3">
                  <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
                  Saving
                </div>
              ) : (
                "Save"
              )}
            </button> */}
          </div>
          <div className="flex flex-row items-start justify-between gap-3">
            <div className="h-screen min-w-64 rounded-md bg-white px-5 py-6">
              <ul className="flex flex-col justify-center gap-5 text-sm text-gray-dark">
                {companySettingSideList?.map((item) => (
                  <li
                    key={item.id}
                    className={`flex items-center gap-x-3 whitespace-nowrap text-sm ${
                      activeItem === item.name
                        ? "font-bold text-hrmprimaryorange"
                        : "font-medium text-gray-dark"
                    }`}
                  >
                    {item.name == "Company profile" ? (
                      <Link
                        to={`${item.link}`} // Properly interpolates the path
                        onClick={() => handleItemClick(item.name)} // Passes the item name to the click handler
                        className="whitespace-nowrap" // Class name applied directly
                      >
                        {item.name}
                      </Link>
                    ) : (
                      <Link
                        to={`${item.link}/${id}`} // Properly interpolates the path
                        onClick={() => handleItemClick(item.name)} // Passes the item name to the click handler
                        className="whitespace-nowrap" // Class name applied directly
                      >
                        {item.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div className="h-screen w-full flex-col">
              <div className="flex min-h-[570px] w-full flex-col gap-4 rounded-md bg-white px-5 py-4">
                <button
                  type="button" // Use "button" for general-purpose buttons to avoid accidental form submission
                  className="btn flex h-10 min-h-10 min-w-24 items-center self-end rounded bg-hrmprimaryorange text-sm font-medium text-white transition-all duration-500 hover:bg-hrmblue/70"
                  onClick={() => navigate(`/admin/company/add_calender/${id}`)} // Corrected onClick
                >
                  <Plus />
                  Add Calendar Setting
                </button>

                <QueryTable
                  columns={columns}
                  list={companyCalenderDetails} // Corrected here
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  totalPages={totalPages}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

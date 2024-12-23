import { newRequest, ROSTER_CLAIM } from "@/api";
import MonthlyCalendarPicker from "@/components/common/MonthPicker";
import NewJoiners from "@/components/hiring/dashboard/NewJoiner";
import MenuHeaderHiring from "@/components/hiring/MenuHeader";
import { OverviewCards } from "@/components/hiring/overview/OverviewCard";
import NewComers from "@/components/popups/hiring/dashboard/NewComers";
import Loader from "@/components/ui/Loader";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import RosterHeader from "@/components/common/RosterHeader";
import Rosteroveview from "@/components/roster/Rosteroveview";
import CalanderShift from "@/components/roster/CalendarShift";
import CalendarEmployees from "@/components/roster/CalendarEmployees";
import CalendarShiftHistory from "@/components/roster/CalendarShiftHistory";
import { useLocation } from "react-router-dom";
import { ADD_EMPLOYEE_ROSTER, DELETE_EMPLOYEE_ROSTER, ROSTER_EMPLIST, SWAP_EMPLOYEE_ROSTER } from "@/api/setup";
import toast from "react-hot-toast";

export const RosterCalendarView = ({ api, selectedId, selecteDate }) => {
  // hiring-dashboard
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [currentPage, setCurrentPage] = useState(1);
  const [popupOpen, setPopupOpen] = useState(false);
  const [totalPages, setTotalPages] = useState();
  const [keyword, setKeyword] = useState("");
  const [type, setType] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [swapEmployee, setSwapEmployee] = useState('');
  const [deletePopup, setDeletePopup] = useState(false);
  const pageLimit = 10;
  const id = queryParams.get("id");
  const date = queryParams.get("date");

  const { data: rosterCalim, isLoading ,refetch} = useQuery({
    queryKey: ["rosterCalim", currentPage, keyword, id, date],
    queryFn: () =>
      newRequest
        .get(`${ROSTER_CLAIM}/${id}/${date}`, {
          params: {
            search: keyword,
            page: currentPage,
            per_limit: pageLimit,
          },
        })
        .then((res) => {
          return res.data;
        }),
        enabled : !!id && !!date
  });
console.log(rosterCalim);

  const { data: rosterEmpList } = useQuery({
    queryKey: ["rosterEmpList", id],
    queryFn: () => {
      console.log(`Fetching employee list for shift ID: ${id}`);
      return newRequest
        .get(`${ROSTER_EMPLIST}/${id}`)
        .then((res) => {
          return res.data;
        });
    },
    enabled: !!id,
  });
  
  const handleSubmit = async (data) => {
    if (selectedEmployee) {
      try {
        const response = await newRequest.post(ADD_EMPLOYEE_ROSTER, {
          employee_id: selectedEmployee,
          shift_id: rosterCalim?.roster_details?.shift_details?.shift_id,
          roster_id: rosterCalim?.roster_details?.roster_id,
          shift_date: date,
        });
  
        if (response.status === 200) {
          toast.success(response.data?.message || "Candidate saved successfully!");
          refetch();
        } else {
          toast.error(response.data?.message || "Failed to save candidate.");
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("An error occurred while saving the candidate.");
      }
    } else {
      toast.error("Please select an employee before submitting.");
    }
  };  

  const handleReassign = async (data) => {
    if (selectedEmployee) {
      try {
        const response = await newRequest.post(SWAP_EMPLOYEE_ROSTER, {
          swaping_from_employee_id: swapEmployee,
          swaping_to_employee_id:selectedEmployee,
          shift_id:  rosterCalim?.roster_details?.shift_details?.shift_id,
          roster_id: rosterCalim?.roster_details?.roster_id,
          swaping_date: date,
        });
  
        if (response.status === 200) {
          toast.success(response.data?.message || "Shift swapped successfully!");
          refetch();
          setPopupOpen(false);
        } else {
          toast.error(response.data?.message || "Failed to swap shift.");
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("An error occurred while swaping ahift.");
      }
    } else {
      toast.error("Please select an employee before submitting.");
    }
  }; 
  
  const handleDelete = async (data) => {
      try {
        const response = await newRequest.post(DELETE_EMPLOYEE_ROSTER, {
          removed_employee_id: data?.id,
          removed_from_user_id:data?.user_id,
          shift_id:  rosterCalim?.roster_details?.shift_details?.shift_id,
          roster_id: rosterCalim?.roster_details?.roster_id,
          removed_date: date,
        });
  
        if (response.status === 200) {
          toast.success(response.data?.message || "Employee deleted successfully!");
          setDeletePopup(false);
          refetch();
        } else {
          toast.error(response.data?.message || "Failed to delete employee.");
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("An error occurred while deleting employee.");
      }
    
  }; 


  useEffect(() => {
    if (rosterCalim) {
      setTotalPages(rosterCalim?.last_page);
    }
  }, [rosterCalim]);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  return (
    <>
      <RosterHeader page={1} />
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex min-h-[32rem] flex-col gap-2 pt-2">
          <Rosteroveview rosterCalim={rosterCalim} />
          <div className="grid h-full grid-cols-3 gap-2">
            <div className="flex h-fit flex-col gap-y-3 rounded-md">
              <CalanderShift
                rosterCalim={rosterCalim}
                isLoading={isLoading}
              />
            </div>
            <div className="min-h-[29rem] rounded-md bg-white pb-7">
              <CalendarEmployees
                rosterCalim={rosterCalim}
                isLoading={isLoading}
                rosterEmpList={rosterEmpList}
                setSelectedEmployee={setSelectedEmployee}
                handleSubmit={handleSubmit}
                handleReassign={handleReassign}
                setSwapEmployee={setSwapEmployee}
                setPopupOpen={setPopupOpen}
                popupOpen={popupOpen}
                handleDelete={handleDelete}
                deletePopup={deletePopup}
                setDeletePopup={setDeletePopup}
              />
            </div>
            <div className="min-h-[29rem] flex-col gap-y-3 rounded-md bg-white">
              <CalendarShiftHistory
                rosterCalim={rosterCalim}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

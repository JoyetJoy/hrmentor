import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Search, MoveDiagonal, Trash2 } from "lucide-react";
import QueryTable from "@/components/table/QueryTable";
import Reassign from "../popups/master/roster/Calendar/Reassign";
import { newRequest } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { customSelectStyles } from "@/utils/customStyles";
import DeleteConfirmation from "../common/DeleteConfirmation";

function CalendarEmployees({ rosterCalim ,rosterEmpList,handleSubmit, setSelectedEmployee,handleReassign, setSwapEmployee, setPopupOpen, popupOpen, handleDelete,deletePopup, setDeletePopup }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [selectedId, setSelectedId] = useState({
    id:"",
    user_id:""
  });
  const [keyword, setKeyword] = useState("");
  const [type, setType] = useState("");
  const pageLimit = 10;
  const { control } = useForm();

  useEffect(() => {
    if (rosterCalim) {
      setTotalPages(rosterCalim?.last_page);
    }
  }, [rosterCalim]);
  const columns = React.useMemo(
    () => [
      {
        header: "Emp.ID",
        accessorKey: "unique_id",
        cell: ({ row }) => <span>#EMP{row.original?.unique_id ?? "NA"}</span>,
      },
      {
        header: "Name",
        accessorKey: "first_name",
        cell: ({ row }) => {
          let name = "";
      
          // Check if swaped_employees exist
          if (rosterCalim?.roster_details?.swaped_employees?.length > 0) {
            const finded = rosterCalim.roster_details.swaped_employees.find(
              (employee) => employee?.swaping_from_employee_id === row.original?.id
            );
            console.log(finded);
            if (finded) {
              name = finded.employee_to?.first_name;
            }
          }
      
          console.log(name); // Log the computed name for debugging
      
          return (
            <p className={`whitespace-nowrap flex items-center`}>
              {name && 
              <>
              <p className={`${name ? "line-through text-red-500 pr-1" : ""}`}>{name}
              </p>
              <p className="text-[1.2rem] pb-1">→</p>
              </>
              }  
              <p className="pl-1">{row.original?.first_name}</p>
            </p>
          );
        },
      },      
      {
        header: "Action",
        accessorKey: "action",
        cell: ({ row }) => (
          <div className="flex items-center gap-2 text-xs">
            <button
              type="button"
              onClick={() => {
                setPopupOpen(true);
                setSwapEmployee(row.original?.id)
              }}
              className="flex cursor-pointer items-center justify-center rounded-lg bg-black px-4 py-[6px] text-white"
            >
              Re-Assign
              {/* <Files className="size-3" /> */}
            </button>
            <button
              type="button"
              onClick={() => {
                setDeletePopup(true);
                setSelectedId({id:row.original?.id, user_id: row.original?.user_id});
              }}
              className="flex cursor-pointer items-center justify-center rounded-full bg-[#EBEBF0] p-2 text-[#2C2C2C]"
            >
              <Trash2 className="size-3" />
            </button>
          </div>
        ),
      },
    ],
    [],
  );
  return (
    <div className="overflow-y-min flex h-full flex-col overflow-y-auto overflow-x-hidden p-2">
      <DeleteConfirmation
        open={deletePopup}
        onCancel={setDeletePopup}
        confirmDelete={handleDelete}
        selectedId={selectedId}
        // qrkey={qrkey}
        // api={api}
        type={'rosterdelete'}
      />
      <Reassign
        popupOpen={popupOpen}
        setPopupOpen={setPopupOpen}
        type={"reassign"}
        rosterEmpList={rosterEmpList}
        setSelectedEmployee={setSelectedEmployee}
        handleReassign={handleReassign}
      />
      <div className="flex items-center justify-between gap-2 text-white">
        <p className="text-[1rem] font-semibold text-black">Employees</p>
        <div className="flex gap-2">
        <div
            className={`group flex flex-col gap-1.5 h-10 min-h-10 min-w-52`}
          >

            <Controller
              name="employees"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  isSearchable={true}
                  styles={customSelectStyles}
                  placeholder="Select Employee"
                  className="input-box w-full"
                  options={rosterEmpList?.employees?.map((item) => ({
                    label: item.first_name,
                    value: item?.id,
                  }))}
                  onChange={(selectedOption) => {
                    field.onChange(selectedOption);
                    setSelectedEmployee(selectedOption.value);
                  }}
                />
              )}
            />
          </div>
          <div
          onClick={()=>{
            handleSubmit();
          }}
            // to="/admin/recruiter/jobs/post"
            className="flex h-10 min-h-10 w-10 min-w-10 items-center justify-center rounded bg-hrmprimaryorange text-xs font-semibold text-white hover:bg-hrmblue"
          >
            <Plus className="size-4" strokeWidth={1.5} />
          </div>
        </div>
      </div>
      <div className="mt-2">
        <QueryTable
          columns={columns}
          list={rosterCalim?.roster_details?.employees ?? []}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
}

export default CalendarEmployees;

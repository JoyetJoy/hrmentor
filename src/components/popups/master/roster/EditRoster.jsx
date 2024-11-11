// import QueryTable from '@/components/table/QueryTable';
// import { Dialog, DialogPanel } from '@headlessui/react';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { Plus, X } from 'lucide-react';
// import React, { useState } from 'react'
// import { Controller, useForm } from 'react-hook-form';
// import Select from 'react-select'

// export default function EditRoster({popupEditOpen,setPopupEditOpen}) {
//     const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(10);
//   const [keyword, setKeyword] = useState("");
//     function close() {
//         setPopupEditOpen(false);
//         reset();
//       }
//       const {
//         register,
//         handleSubmit,
//         control,
//         reset,
//         formState: { errors },
//       } = useForm({
//         mode: "onSubmit",
//         resolver: yupResolver(),
//       });
//       const columns = React.useMemo(
//         () => [
//           {
//             header: "Emp:ID",
//             accessorKey: "unique_id",
//             cell: ({ row }) => row?.original?.unique_id || "NA",
//           },
//           {
//             header: "Emp:Name",
//             accessorKey: "first_name",
//             cell: ({ row }) => row?.original?.first_name || "NA",
//           },
    
//           {
//             header: "Action",
//             accessorKey: "action",
//             cell: ({ row }) => (
//               <div className="flex items-center gap-2 text-xs">
//                 <button
//                   type="button"
//                   className="flex cursor-pointer items-center justify-center rounded-full bg-[#EBEBF0] p-2 text-[#2C2C2C]"
//                 >
//                   <Trash2 className="size-3" />
//                 </button>
//               </div>
//             ),
//           },
//         ],
//         [],
//       );
//       const data = [
//         { sno: 1, details: "vmffghgfhfghj" },
//         { sno: 2, details: "fdgdfghfh" },
//       ];
    
//   return (
//     <Dialog open={popupEditOpen} as="div" className="relative z-10" onClose={close}>
//     <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/20">
//       <div className="flex min-h-full items-center justify-center p-4">
//         <DialogPanel className="w-full max-w-4xl rounded bg-white p-6">
//           <div className="mb-5 flex justify-between">
//             <h1 className="text-md font-bold">Edit Roster</h1>
//             <button onClick={close}>
//               <X />
//             </button>
//           </div>
//           <div className="grid grid-cols-2 gap-6">
//             <div>
//               <div className="flex flex-col gap-4">
//               <div>
//                   <label className="text-sm font-medium">Shift Name </label>
//                   <input
//                     type="text"
//                     {...register("startDate", { required: true })}
//                     className="input-box w-full"
//                   />
//                   {errors.startDate && (
//                     <span className="text-xs text-red-500">
//                       {errors.startDate?.message}
//                     </span>
//                   )}
//                 </div>
//                 <div>
//                   <label className="text-sm font-medium">Start Date</label>
//                   <input
//                     type="date"
//                     {...register("startDate", { required: true })}
//                     className="input-box w-full"
//                   />
//                   {errors.startDate && (
//                     <span className="text-xs text-red-500">
//                       {errors.startDate?.message}
//                     </span>
//                   )}
//                 </div>
//                 <div>
//                   <label className="text-sm font-medium">End Date</label>
//                   <input
//                     type="date"
//                     {...register("endDate", { required: true })}
//                     className="input-box w-full"
//                   />
//                   {errors.endDate && (
//                     <span className="text-xs text-red-500">
//                       {errors.endDate?.message}
//                     </span>
//                   )}
//                 </div>
                
//                 <div className="mt-4 flex gap-3">
//                   <button
//                     type="submit"
//                     className="w-full rounded bg-hrmprimaryorange px-7 py-3 text-white"
//                   >
//                     Save
//                   </button>
//                   <button
//                     type="button"
//                     onClick={close}
//                     className="w-full rounded border border-black px-4 py-3"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </div>
//             </div>
//             <div className="mt-1 flex h-full flex-col gap-4">
//               <div className="flex flex-col">
//                 <label className="text-sm font-medium">Add Employee</label>
//                 <div className="flex gap-2">
//                   <Controller
//                     name="employees"
//                     control={control}
//                     rules={{ required: true }}
//                     render={({ field }) => (
//                       <Select
//                         {...field}
//                         isSearchable={true}
//                         styles={customSelectStyles}
//                         placeholder="Select Employee"
//                         className="input-box w-full"
//                         options={rosterEmpList?.employees?.map((item) => ({
//                           label: item.first_name,
//                           value: item.unique_id,
//                         }))}
//                         onChange={(selectedOption) => {
//                           field.onChange(selectedOption);
//                           setSelectedEmployee(selectedOption); 
//                         }}
//                       />
//                     )}
//                   />
//                   {errors.endDate && (
//                     <span className="text-xs text-red-500">
//                       {errors.endDate?.message}
//                     </span>
//                   )}
//                   <button
//                     type="submit"
//                     className="flex items-center whitespace-nowrap rounded bg-black px-3 py-2 text-sm text-white"
//                     // onClick={handleAddEmployee}
//                   >
//                     <Plus className="size-4" /> Add
//                   </button>
//                 </div>
//               </div>
//               <QueryTable
//                 columns={columns}
//                 list={selectedEmployees}
//                 currentPage={currentPage}
//                 setCurrentPage={setCurrentPage}
//                 totalPages={totalPages}
//               />
//             </div>
//           </div>
//         </DialogPanel>
//       </div>
//     </div>
//   </Dialog>
//   )
// }

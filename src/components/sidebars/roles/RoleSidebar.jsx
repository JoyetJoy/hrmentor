import React, { useEffect, useState } from "react";
import { Search, Trash2 } from "lucide-react";
import edit from "/public/assets/icons/admin/marker.svg";
import Pagination from "@/components/table/Pagination";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { newRequest, PAGINATED_ROLES, ROLES } from "@/api";
import { toast } from "sonner";

export const RoleSidebar = ({ selectedRole, setSelectedRole }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [keyword, setKeyword] = useState("");
  const queryClient = useQueryClient();

  // Fetch roles List
  const { data: rolesList, isLoading } = useQuery({
    queryKey: ["rolesList", keyword],
    queryFn: () =>
      newRequest
        .get(PAGINATED_ROLES, {
          params: {
            search: keyword,
            page: currentPage,
            per_limit: 10,
          },
        })
        .then((res) => {
          return res.data;
        }),
  });

  useEffect(() => {
    if (rolesList) {
      setTotalPages(rolesList.last_page);
    }
  }, [rolesList]);

  const handleDelete = async (id) => {
    try {
      const res = await newRequest.delete(`${ROLES}/${id}`);
      if (res.status === 200) {
        toast.success("Role deleted successfully");
        queryClient.invalidateQueries(["rolesList"]);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.error(error);
    }
  };

  return (
    <div className="col-span-3 flex w-full flex-col">
      <h1 className="text-bold mb-2 text-start text-lg font-semibold">Role</h1>
      <div className="input mb-3 flex min-h-11 items-center gap-2 rounded-md border border-[#EBEBF0] !outline-none">
        <Search className="size-4 w-fit object-contain text-gray-200" />
        <input
          type="text"
          onChange={(e) => setKeyword(e.target.value)}
          className="w-full grow outline-none placeholder:text-sm placeholder:text-gray-200 focus:outline-none"
          placeholder="Search"
        />
      </div>
      <div className="rounded-md border border-[#EBEBF0]">
        <h1 className="flex items-center justify-between rounded-t-md border border-gray-300 bg-gray-500 px-6 py-4 text-base font-semibold text-black">
          Role Name
          <span>Action</span>
        </h1>
        <div className="rounded-b-md bg-white">
          <ul>
            {rolesList?.roles?.map((role, index) => (
              <li
                key={index}
                className={`flex cursor-pointer items-center justify-between border-t border-gray-500 px-6 py-3 text-sm ${selectedRole === role.id ? "font-bold text-textcolor-darkblue" : ""} ${role.id === 1 ? "font-medium text-gray-200" : ""}`}
              >
                <span>
                  {role.name}[{role.permissions_count}]
                </span>
                <div className="flex gap-3">
                  <div
                    onClick={() => setSelectedRole(role.id)}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-500 p-2"
                  >
                    <img src={edit} alt="editIcon" className="object-contain" />
                  </div>
                  {role.id === 1 ? null : (
                    <div
                      onClick={() => handleDelete(role.id)}
                      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-gray-500 p-2"
                    >
                      <Trash2 className="text-[#AB2727]" strokeWidth={1.5} />
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {totalPages && (
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      )}
    </div>
  );
};

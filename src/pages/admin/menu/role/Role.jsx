import React, { useState } from "react";
import { RoleSidebar } from "../../../../components/sidebars/roles/RoleSidebar";
import { Minus, Plus, ChevronRight } from "lucide-react";
import MenuHeader from "@/components/common/MenuHeader";
import { GET_PERMISSIONS, GET_ROLES, newRequest } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";

// Validation schema using yup
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
});
// Dividing array into small arrays
const chunkArray = (arr, size) => {
  const chunkedArray = [];
  for (let i = 0; i < arr.length; i += size) {
    chunkedArray.push(arr.slice(i, i + size));
  }
  return chunkedArray;
};

// Function to check if all items within a category are checked
const areAllItemsChecked = (category, formData) => {
  return category?.items?.every((item) =>
    formData.permissions.some((permission) => permission.id === item?.id),
  );
};

export const MenuRoles = () => {
  const [collapseState, setCollapseState] = useState({});

  // Function to toggle collapse state
  const toggleCollapse = (category) => {
    setCollapseState((prevCollapseState) => ({
      ...prevCollapseState,
      [category]: !prevCollapseState[category],
    }));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Fetch permissions data
  const { data, isLoading } = useQuery({
    queryKey: ["permissionList"],
    queryFn: () =>
      newRequest.get(GET_PERMISSIONS).then((res) => {
        return res.data;
      }),
  });

  console.log("data", data?.data);
  // Process the permissions data
  const permissionList =
    data?.data &&
    Object.entries(data?.data).flatMap(([parentCategory, subcategories]) =>
      Object.entries(subcategories).map(([subcategory, items]) => ({
        parentCategory,
        subcategory,
        items,
      })),
    );

  console.log(permissionList);

  // Divide the permissionList into four parts
  const dividedPermissionList =
    permissionList &&
    chunkArray(permissionList, Math.ceil(permissionList.length / 4));

  // Local state to manage form data
  const [formData, setFormData] = useState({
    permissions: [],
  });

  console.log(formData);

  // Handle checkbox change for permissions
  const handleCheckboxChange = (id) => {
    setFormData((prevData) => {
      const updatedPermissions = [...prevData.permissions];
      const permissionIndex = updatedPermissions.findIndex((p) => p.id === id);

      if (permissionIndex === -1) {
        updatedPermissions.push({
          id,
        });
      } else {
        updatedPermissions.splice(permissionIndex, 1);
      }
      return {
        ...prevData,
        permissions: updatedPermissions,
      };
    });
  };

  // Handle form submission
  // const onSubmit = async (data) => {
  //   setLoader(true);
  //   let rolesData = {
  //     permission: formData.permissions,
  //     name: data.name,
  //   };

  //   if (formData?.permissions.length === 0) {
  //     toast.error("Select at least one permission");
  //     return;
  //   }
  //   // form submission
  //   try {
  //     const res = await newRequest.post(GET_ROLES, rolesData);
  //     if (res.status === 200) {
  //       setLoader(false);
  //       toast.success("Role added successfully");
  //       queryClient.invalidateQueries(["allRoles"]);
  //       navigate("/settings/roles-permissions");
  //     }
  //   } catch (error) {
  //     setLoader(false);
  //     console.error(error);
  //   }
  // };

  return (
    <div className="flex flex-col">
      <MenuHeader
        backlink={""}
        menu={"Menu"}
        subMenu={"Account Management"}
        currentpath={"Role"}
        activeMenu={"Role"}
        icon={<ChevronRight className="size-3" />}
      />
      <div className="mt-1 grid grid-cols-11 gap-4">
        <RoleSidebar />
        <div className="col-span-8 w-full rounded-md bg-white px-10 py-7">
          <h1 className="text-xl font-bold text-black">Add New Role</h1>
          <div className="mt-1 flex flex-row items-center gap-2 border-y border-y-black/10 py-3">
            <div className="flex items-center gap-0.5">
              <h1 className="required flex flex-row whitespace-nowrap text-sm">
                Role Name
              </h1>
              <span>:</span>
            </div>
            <input
              type="text"
              placeholder="Enter role name"
              className="input h-11 min-h-11 w-full max-w-xs border border-black placeholder:text-sm placeholder:text-[#2C2C2C] focus:border-black focus:outline-none"
            />
            <button className="btn h-11 min-h-11 bg-textcolor-blue px-20 text-white hover:bg-textcolor-blue">
              Create
            </button>
          </div>

          <div className="mt-5 flex flex-col gap-3">
            <div className="flex">
              <label className="text-sm font-medium">
                Parent category here{" "}
              </label>
            </div>
            {/* Mapping over categories and items */}
            {dividedPermissionList?.map((items) => (
              <div className="mt-5 grid grid-cols-4 gap-3">
                <div className="flex flex-col gap-3">
                  {items?.map((category) => (
                    <div
                      key={category.category}
                      className={`collapse w-full rounded-md border bg-white ${
                        areAllItemsChecked(category, formData)
                          ? "border-[#009320] text-[#009320]"
                          : "border-[#EAEAEA] text-[#3A3A3A]"
                      }`}
                    >
                      <input
                        onClick={() => toggleCollapse(category.category)}
                        type="checkbox"
                        className="peer"
                      />
                      <div className="collapse-title flex w-full items-center justify-between text-[0.78rem]">
                        <div className="font-medium">{category.category}</div>
                        {collapseState[category.category] ? (
                          <Minus className="-mr-9 w-4" />
                        ) : (
                          <Plus className="-mr-9 w-4" />
                        )}
                      </div>
                      <div className="collapse-content flex flex-col gap-1 border-t border-t-[#EAEAEA] text-[0.78rem] !text-[#3A3A3A]">
                        {/* Mapping over items within a category */}
                        {category?.items?.map((item) => (
                          <div
                            key={item?.id}
                            className="mt-3 flex items-center justify-between gap-3 pr-1 font-medium"
                          >
                            <p>{item?.name}</p>
                            <input
                              type="checkbox"
                              onChange={() => handleCheckboxChange(item?.id)}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

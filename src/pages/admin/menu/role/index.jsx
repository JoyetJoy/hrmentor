import React, { useEffect, useState } from "react";
import { RoleSidebar } from "../../../../components/sidebars/roles/RoleSidebar";
import { Minus, Plus, ChevronRight, ArrowDown, ArrowUp } from "lucide-react";
import MenuHeader from "@/components/common/MenuHeader";
import { GET_PERMISSIONS, newRequest, ROLES } from "@/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "sonner";

// Validation schema
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
});

const areAllItemsChecked = (subcategory, formData) => {
  return subcategory?.every((item) =>
    formData.permissions.some((permission) => permission.id === item?.id),
  );
};

export const MenuRoles = () => {
  const [loader, setLoader] = useState(false);
  const [collapseState, setCollapseState] = useState({});
  const [selectedRole, setSelectedRole] = useState(0);
  const queryClient = useQueryClient();

  // Function to toggle collapse state
  const toggleCollapse = (categoryOrSubcategoryKey) => {
    setCollapseState((prevCollapseState) => ({
      ...prevCollapseState,
      [categoryOrSubcategoryKey]: !prevCollapseState[categoryOrSubcategoryKey],
    }));
  };

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Fetch permissions data
  const { data, isLoading } = useQuery({
    queryKey: ["permissionList"],
    queryFn: () => newRequest.get(GET_PERMISSIONS).then((res) => res.data),
  });

  // Get selected role data
  const { data: roleDetail, isLoading: roleLoading } = useQuery({
    queryKey: ["permissionList", selectedRole],
    queryFn: () =>
      newRequest.get(`${ROLES}/${selectedRole}/edit`).then((res) => res.data),
    enabled: !!selectedRole != 0,
  });

  // Process the permissions data
  const permissionList =
    data?.data &&
    Object.entries(data?.data).map(([parentCategory, subcategories]) => ({
      parentCategory,
      subcategories: Object.entries(subcategories).map(
        ([subcategory, items]) => ({
          subcategory,
          items,
        }),
      ),
    }));

  // Local state to manage form data
  const [formData, setFormData] = useState({
    permissions: [],
  });

  // Handle checkbox change for permissions
  const handleCheckboxChange = (id) => {
    setFormData((prevData) => {
      const updatedPermissions = [...prevData.permissions];
      const permissionIndex = updatedPermissions.findIndex((p) => p.id === id);
      if (permissionIndex === -1) {
        updatedPermissions.push({ id });
      } else {
        updatedPermissions.splice(permissionIndex, 1);
      }
      return { ...prevData, permissions: updatedPermissions };
    });
  };

  const onSubmit = async (data) => {
    setLoader(true);
    let formattedPermissions = formData.permissions?.map((i) => i.id);
    if (formData?.permissions.length === 0) {
      toast.error("Select at least one permission");
      setLoader(false);
      return;
    }
    let rolesData = {
      permissions: formattedPermissions,
      name: data.name,
    };
    try {
      let res;
      if (selectedRole !== 0) {
        res = await newRequest.patch(`${ROLES}/${selectedRole}`, rolesData);
      } else {
        res = await newRequest.post(ROLES, rolesData);
      }
      if (res?.data?.success === true) {
        setLoader(false);
        reset();
        setFormData({ permissions: [] });
        toast.success(res?.data?.message);
        queryClient.invalidateQueries(["rolesList"]);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      setLoader(false);
    }
  };

  useEffect(() => {
    if (roleDetail) {
      setValue("name", roleDetail?.role?.name);
      setValue("permissions", roleDetail?.permissions);
      setFormData({ permissions: roleDetail?.permissions });
    }
  }, [roleDetail, setValue]);

  // Function to handle select/deselect all permissions in a subcategory
  const handleSelectAll = (subcategoryItems, isSelected) => {
    setFormData((prevData) => {
      let updatedPermissions = [...prevData.permissions];

      subcategoryItems.forEach((item) => {
        const permissionExists = updatedPermissions.some(
          (p) => p.id === item.id,
        );
        if (isSelected && !permissionExists) {
          updatedPermissions.push({ id: item.id });
        } else if (!isSelected && permissionExists) {
          updatedPermissions = updatedPermissions.filter(
            (p) => p.id !== item.id,
          );
        }
      });

      return { ...prevData, permissions: updatedPermissions };
    });
  };

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
        <RoleSidebar
          selectedRole={selectedRole}
          setSelectedRole={setSelectedRole}
        />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="col-span-8 w-full rounded-md bg-white px-10 py-7"
        >
          <h1 className="text-xl font-bold text-black">
            {selectedRole ? "Update/View" : "Add New"} Role
          </h1>
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
              {...register("name")}
            />
            <button className="flex h-11 w-fit items-center justify-center rounded bg-textcolor-blue px-7 text-[0.8rem] font-medium tracking-[0.1px] text-white">
              {loader ? (
                <div className="flex items-center gap-3">
                  <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
                  {selectedRole ? "Updating role" : "Creating"}
                </div>
              ) : (
                <span>{selectedRole ? "Update" : "Create"}</span>
              )}
            </button>
          </div>
          <div className="mt-5 flex flex-col gap-3">
            {permissionList?.map((parentCategory) => (
              <div key={parentCategory.parentCategory} className="mt-3">
                <div
                  className={`collapse w-full rounded-md border-y bg-white ${
                    areAllItemsChecked(parentCategory.subcategories, formData)
                      ? "border-[#009320] text-[#009320]"
                      : "border-[#EAEAEA] text-[#3A3A3A]"
                  }`}
                >
                  <div
                    className="collapse-title flex w-full cursor-pointer items-center justify-between px-0 text-[0.94rem] font-semibold"
                    onClick={() =>
                      toggleCollapse(parentCategory.parentCategory)
                    }
                  >
                    {parentCategory.parentCategory}
                    {collapseState[parentCategory.parentCategory] ? (
                      <ArrowUp className="w-4" />
                    ) : (
                      <ArrowDown className="w-4" />
                    )}
                  </div>
                  {collapseState[parentCategory.parentCategory] && (
                    <div className="grid grid-cols-3 gap-4">
                      {parentCategory.subcategories?.map((subcategory) => (
                        <div
                          className="rounded-md border border-black/10"
                          key={subcategory.subcategory}
                        >
                          <div
                            className="collapse-title flex w-full cursor-pointer items-center justify-between !p-0 !px-4 text-sm font-semibold"
                            onClick={() =>
                              toggleCollapse(subcategory.subcategory)
                            }
                          >
                            {subcategory.subcategory}
                            {collapseState[subcategory.subcategory] ? (
                              <Minus className="w-4" />
                            ) : (
                              <Plus className="w-4" />
                            )}
                          </div>

                          {collapseState[subcategory.subcategory] && (
                            <div className="mt-2 flex flex-col gap-0.5 px-4 pb-3">
                              <div className="flex items-center gap-2 pb-3 text-sm font-semibold">
                                <input
                                  className="h-4 w-4"
                                  type="checkbox"
                                  checked={subcategory.items.every((item) =>
                                    formData.permissions.some(
                                      (permission) => permission.id === item.id,
                                    ),
                                  )}
                                  onChange={(e) =>
                                    handleSelectAll(
                                      subcategory.items,
                                      e.target.checked,
                                    )
                                  }
                                />
                                <span>Select All</span>
                              </div>
                              {subcategory.items?.map((item) => (
                                <div
                                  key={item.id}
                                  className="mt-2 flex items-center justify-between text-sm font-semibold capitalize text-black/70"
                                >
                                  <p>{item.name}</p>
                                  <input
                                    type="checkbox"
                                    className="h-4 w-4"
                                    checked={formData.permissions.some(
                                      (permission) => permission.id === item.id,
                                    )}
                                    onChange={() =>
                                      handleCheckboxChange(item.id)
                                    }
                                  />
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </form>
      </div>
    </div>
  );
};

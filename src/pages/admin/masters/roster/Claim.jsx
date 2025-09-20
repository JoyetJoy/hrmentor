import MenuHeader from "@/components/common/MenuHeader";
import QueryTable from "@/components/table/QueryTable";
import { calimList, shiftHistoryData } from "@/constants/dummyData";
import dayjs from "dayjs";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronRight, Plus, Search, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { newRequest, ROSTER_CLAIM } from "@/api";

export default function Claim() {
  const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState();
    const [keyword, setKeyword] = useState("");
    const pageLimit = 10;

  const { data: rosterdetails, isLoading } = useQuery({
    queryKey: ["rosterdetails", currentPage, rid,date, keyword],
    queryFn: () =>
      newRequest
        .get(ROSTER_CLAIM, {
          params: {
            search: keyword,
            page: currentPage,
            per_limit: pageLimit,
          },
        })
        .then((res) => {
          return res.data;
        }),
  });

  useEffect(() => {
    if (rosterdetails) {
      setTotalPages(rosterdetails?.last_page);
    }
  }, [rosterdetails]);
 console.log(errors,"rosterdetailsrosterdetails")
  const columns = React.useMemo(
    () => [
      {
        header: "Sl No",
        accessorKey: "sno",
        cell: ({ row }) => row.index + 1,
      },
      {
        header: "Shift Name",
        accessorKey: "shift-name",
        cell: ({ row }) => row.original.details || "N/A",
      },

      {
        header: "Action",
        accessorKey: "action",
        cell: ({ row }) => (
          <div className="flex items-center gap-2 text-xs">
            <button className="rounded-md bg-black px-4 py-2 text-white">
              Re Assign
            </button>
            <button
              type="button"
              className="flex size-7 cursor-pointer items-center rounded-full bg-gray-soft p-2"
            >
              <img
                src="/assets/icons/admin/marker.svg"
                className="w-full object-contain"
                alt="Edit"
              />
            </button>
            <button
              type="button"
              className="flex cursor-pointer items-center justify-center rounded-full bg-gray-soft p-2 text-textcolor-darkCharcoal"
            >
              <Trash2 className="size-3" />
            </button>
          </div>
        ),
      },
    ],
    [],
  );
  // const {
  //   register,
  //   handleSubmit,
  //   control,
  //   setValue,
  //   watch,
  //   formState: { errors },
  // } = useForm({
  //   mode: "onChange",
  //   resolver: yupResolver(ShiftSchema),
  // });
  
  const data = [
    { sno: 1, details: "vmffghgfhfghj" },
    { sno: 2, details: "fdgdfghfh" },
  ];
  return (
    <>
      <MenuHeader menu="Menu" currentpath="Roster" />
      <div className="flex w-full gap-4">
        <div className="w-full">
          <div className="my-4 flex w-full items-center justify-between gap-2">
            {/* <h1 className="text-lg font-bold">Morning Shift</h1> */}
            <div className="flex items-center gap-2">
              <p className="mr-3 whitespace-nowrap text-sm font-bold">
                Shift claim{" "}
              </p>
              <label className="text-sm">Close</label>
              <input
                type="checkbox"
                className="toggle border-white bg-white [--tglbg:#00B448]"
                defaultChecked={true}
              />
              <label className="text-sm">Open</label>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {calimList?.map((item, index) => (
              <div key={index} className="rounded-md bg-white px-4 py-2">
                <h1 className="font-semibold text-black">{item.title}</h1>
                <h2 className="text-md font-extrabold">{rosterdetails?.roster_details?.leave_requests_of_roster_employees_count}</h2>
                <p className="text-sm">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2.5 pb-7">
            <Disclosure as="div" className="px-5 py-2" defaultOpen={false}>
              <DisclosureButton className="group flex w-full items-center gap-x-2">
                <div className="flex size-5 items-center justify-center rounded-full bg-gray-dark">
                  <ChevronRight className="size-4 group-data-[open]:rotate-90" />
                </div>
                <p className="text-md flex flex-row whitespace-nowrap font-bold">
                  Leave Requests
                </p>
                <div className="h-px w-full bg-gray-light"></div>
              </DisclosureButton>
              <DisclosurePanel className="my-4 text-sm/5 text-black/50">
                <div className="mt-4 grid w-8/12 grid-cols-2 items-center justify-center gap-y-2">
                  <div className="group flex flex-col space-y-1 px-3 py-2">
                    <label className="label-text">Job code</label>
                  </div>
                </div>
              </DisclosurePanel>
            </Disclosure>
            <Disclosure as="div" className="px-5 py-2" defaultOpen={false}>
              <DisclosureButton className="group flex w-full items-center gap-x-2">
                <div className="flex size-5 items-center justify-center rounded-full bg-gray-dark">
                  <ChevronRight className="size-4 group-data-[open]:rotate-90" />
                </div>
                <p className="text-md flex flex-row whitespace-nowrap font-bold">
                  Clamed Request
                </p>
                <div className="h-px w-full bg-gray-light"></div>
              </DisclosureButton>
              <DisclosurePanel className="my-4 text-sm/5 text-black/50">
                <div className="mt-4 grid w-8/12 grid-cols-2 items-center justify-center gap-y-2">
                  <div className="group flex flex-col space-y-1 px-3 py-2">
                    <label className="label-text">Job code</label>
                  </div>
                </div>
              </DisclosurePanel>
            </Disclosure>
          </div>
        </div>
        <div className="mt-14 flex w-full flex-col gap-3 rounded-md bg-white px-5 py-4">
          <div className="flex items-center justify-between">
            <h1 className="font-lg font-bold">Employee</h1>
            <div className="flex items-center gap-2">
              <label className="input flex h-10 min-h-10 items-center gap-2 rounded-md border border-gray-soft outline-none">
                <Search className="size-4 object-contain text-gray-dark" />
                <input
                  type="text"
                  onChange={(e) => {
                    setKeyword(e.target.value);
                  }}
                  className="grow placeholder:text-sm placeholder:text-gray-dark focus:outline-none"
                  placeholder="Search"
                />
              </label>
              <Link
                to={""}
                className="btn flex h-10 min-h-10 items-center bg-hrmprimaryorange px-3 text-xs font-semibold text-white hover:bg-hrmblue"
              >
                <Plus className="size-4" />
              </Link>
            </div>
          </div>
          <QueryTable
            columns={columns}
            list={data}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        </div>
        <div className="w-full">
          <div className="my-4 flex justify-between">
            <h3 className="text-md font-semibold">
              Shift Date - <span className="font-medium">25/06/2024</span>
            </h3>
            <p className="text-md font-semibold">
              Shift Time -{" "}
              <span className="font-medium">09:00 am - 06:00 pm</span>{" "}
            </p>
          </div>
          <div className="h-screen rounded-md bg-white p-5 shadow-md">
            <h4 className="mb-3 font-semibold">Shift History</h4>
            <ul className="space-y-4">
              {shiftHistoryData?.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-gray-dark"
                >
                  <div className="flex-shrink-0">
                    <p>{dayjs(item.date).format("DD/MM/YYYY hh:mm A")}</p>
                  </div>
                  <div className="pl-4">
                    <p className="font-medium">{item.user}</p>
                    <p className="text-sm">{item.action}</p>
                    {item.additional && (
                      <p className="text-sm text-gray-500">{item.additional}</p>
                    )}
                  </div>
                  {item.role && (
                    <div className="ml-auto text-sm text-gray-dark">
                      {item.role}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

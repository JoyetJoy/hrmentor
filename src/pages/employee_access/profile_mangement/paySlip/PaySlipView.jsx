import MenuHeaderEmployeeAccess from "@/components/employee_access/MenuHeader";
import ProfileSidebar from "@/components/sidebars/employee_access/profile_management/ProfileSideBar";
import { ChevronRight } from "lucide-react";
import React from "react";

export default function PaySlipView() {
  return (
    <div className="flex flex-col">
      <MenuHeaderEmployeeAccess
        pathlink=""
        currentpage="Payslip"
        subMenu="ProfileManagement"
        icon={<ChevronRight className="size-3" />}
        page={2}
      />
      <div className="flex gap-x-3">
        <ProfileSidebar />
        <div className="mt-2 w-full">
          <>
            <div className="flex items-center justify-between">
              <h5 className="gap-0.1 flex items-center text-sm font-bold">
                PaySlip
              </h5>
            </div>
            <div className="mt-5 w-full gap-9 rounded-md bg-white py-7">
              <div className="px-28">
                <h1 className="mb-7 text-sm font-medium text-gray-700">
                  Monday, 11 Nov 2024 to Saturday, 16 Nov 2024
                </h1>
                <div className="border">
                  <table className="w-full text-sm text-gray-700">
                    <thead className="bg-gray-soft">
                      <tr className="border-b">
                        <th className="px-4 py-2 text-left">Employee Id</th>
                        <th className="px-4 py-2 text-left">Employee Name</th>
                        <th className="px-4 py-2 text-left">Proceed date</th>
                        <th className="px-4 py-2 text-left">
                          National insurance number
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-4 py-3 text-left">HRM1123</td>
                        <td className="px-4 py-3 text-left">Marvin McKinney</td>
                        <td className="px-4 py-3 text-left">12/05/2024</td>
                        <td className="px-4 py-3 text-left">123123213423</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="flex">
                    <table className="w-full text-sm text-gray-700">
                      <thead className="bg-gray-soft">
                        <tr>
                          <th className="px-4 py-2 text-left">Payments</th>
                          <th className="px-4 py-2 text-left">Unit</th>
                          <th className="px-4 py-2 text-left">Rate</th>
                          <th className="px-4 py-2 text-left">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="px-4 py-2 text-left">Salary</td>
                          <td className="px-4 py-2 text-left">3000</td>
                          <td className="px-4 py-2 text-left">32,78.89</td>
                          <td className="px-4 py-2 text-left">32,78.89</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 text-left">Bonus</td>
                          <td className="px-4 py-2 text-left">100</td>
                          <td className="px-4 py-2 text-left">200</td>
                          <td className="px-4 py-2 text-left">200</td>
                        </tr>
                      </tbody>
                    </table>
                    <table className="w-1/2 border-l text-sm text-gray-700">
                      <thead className="bg-gray-soft">
                        <tr>
                          <th colSpan="1" className="px-4 py-2 text-left">
                            Deductions
                          </th>
                          <th colSpan="1" className="px-4 py-2 text-left">
                            Amount
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-xs text-black font-semibold">
                        <tr>
                          <td className="whitespace-nowrap px-4 py-2 text-left">
                            PAY
                          </td>
                          <td className="px-4 py-2 text-end">32,78.89</td>
                        </tr>
                        <tr>
                          <td className="whitespace-nowrap px-4 py-2 text-left">
                            PAYE Tax
                          </td>
                          <td className="px-4 py-2 text-end">32,78.89</td>
                        </tr>
                        <tr>
                          <td className="whitespace-nowrap px-4 py-2 text-left">
                            Nat Insurances
                          </td>
                          <td className="px-4 py-2 text-end">54654</td>
                        </tr>
                        <tr>
                          <td className="whitespace-nowrap px-4 py-2 text-left">
                            Pension ER
                          </td>
                          <td className="px-4 py-2 text-end">200</td>
                        </tr>
                        <tr>
                          <td className="whitespace-nowrap px-4 py-2 text-left">
                            Pension EE
                          </td>
                          <td className="px-4 py-2 text-end">200</td>
                        </tr>
                        <tr className=" border-dashed border-t ">
                          <td className="whitespace-nowrap px-4 py-3 text-left">
                          Employers IN
                          </td>
                          <td className="px-4 py-3 text-end">32</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="grid grid-cols-1 gap-4 border-y">
                    <div className="flex w-full">
                      <p className="mt-7 w-1/2 pl-4 text-xs font-semibold text-black">
                        12 Helen St,
                        <br /> Newstead <br /> EC50 9DN
                      </p>
                      <table className="w-1/4 border-x text-sm text-gray-700">
                        <thead className="bg-gray-soft">
                          <tr>
                            <th colSpan="2" className="px-4 py-2 text-center">
                              This Period
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="px-4 py-2 text-center">PAY</td>
                            <td className="px-4 py-2 text-center">32,78.89</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2 text-center">PAYE Tax</td>
                            <td className="px-4 py-2 text-center">32,78.89</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2 text-center">
                              Nat Insurances
                            </td>
                            <td className="px-4 py-2 text-center">54654</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2 text-center">
                              Pension ER
                            </td>
                            <td className="px-4 py-2 text-center">200</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2 text-center">
                              Pension EE
                            </td>
                            <td className="px-4 py-2 text-center">200</td>
                          </tr>
                        </tbody>
                      </table>
                      <table className="w-1/4 border-r text-sm text-gray-700">
                        <thead className="bg-gray-soft">
                          <tr>
                            <th colSpan="2" className="px-4 py-2 text-center">
                              Year to Date
                            </th>
                          </tr>
                          {/*  */}
                        </thead>
                        <tbody>
                          <tr>
                            <td className="px-4 py-2 text-center">PAY</td>
                            <td className="px-4 py-2 text-center">32,78.89</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2 text-center">PAYE Tax</td>
                            <td className="px-4 py-2 text-center">32,78.89</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2 text-center">
                              Nat Insurances
                            </td>
                            <td className="px-4 py-2 text-center">54654</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2 text-center">
                              Pension ER
                            </td>
                            <td className="px-4 py-2 text-center">200</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2 text-center">
                              Pension EE
                            </td>
                            <td className="px-4 py-2 text-center">200</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <p className="mb-2 py-2 pl-4 text-sm text-gray-700">
                      167 Ford Lane, Rainham, England, RM13 7BA <br />
                      <span className="mb-2 text-sm text-gray-700">
                        Pay method - Bank TAX code - 1250L Pay Period - Month
                        P-12
                      </span>
                    </p>
                    <div className="flex w-[25.1%] items-center justify-between border-l bg-[#F6BDAE] px-5 text-sm text-black">
                      <p className="font-semibold">Net Pay</p>
                      <p className="font-bold">3278.89</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        </div>
      </div>
    </div>
  );
}

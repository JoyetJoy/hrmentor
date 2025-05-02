import React, { useState } from "react";
import PurchasePlan from "../popups/subscription/PurchasePlan";
import tickgreen from "/assets/icons/admin/tick-green.svg";

const plans = [
  {
    id: 4,
    package_name: "Launch ",
    package_status: 1,
    subpackage_name: "(1-10 Users)",
    price_per_month_per_user: 25.99,
    daily_price_per_user: 3.23,
    yearly_price_per_user: 1199.88,
    created_at: "2024-12-11T19:46:50.000000Z",
    updated_at: "2025-04-01T12:35:44.000000Z",
    deleted_at: null,
    package_modules: [
      {
        id: 160,
        package_id: 4,
        module_id: 1,
        created_at: "2025-04-01T12:36:06.000000Z",
        updated_at: "2025-04-01T12:36:06.000000Z",
        deleted_at: null,
        module_name: {
          id: 1,
          module_name: "Employee self-service",
          module_status: 1,
          created_at: null,
          updated_at: null,
        },
        module_feature: [],
      },
      {
        id: 161,
        package_id: 4,
        module_id: 2,
        created_at: "2025-04-01T12:36:06.000000Z",
        updated_at: "2025-04-01T12:36:06.000000Z",
        deleted_at: null,
        module_name: {
          id: 2,
          module_name: "Time & attendance",
          module_status: 1,
          created_at: null,
          updated_at: null,
        },
        module_feature: [
          {
            id: 7,
            package_id: 1,
            series_no: 1,
            is_featured: 1,
            feature_name: "Section",
            created_at: "2024-11-12T06:59:16.000000Z",
            updated_at: "2024-11-12T06:59:16.000000Z",
            module_id: 2,
            deleted_at: null,
          },
          {
            id: 8,
            package_id: 1,
            series_no: 2,
            is_featured: 1,
            feature_name: "Scheduling",
            created_at: "2024-11-12T06:59:16.000000Z",
            updated_at: "2024-11-12T06:59:16.000000Z",
            module_id: 2,
            deleted_at: null,
          },
        ],
      },
      {
        id: 162,
        package_id: 4,
        module_id: 3,
        created_at: "2025-04-01T12:36:06.000000Z",
        updated_at: "2025-04-01T12:36:06.000000Z",
        deleted_at: null,
        module_name: {
          id: 3,
          module_name: "Roster management",
          module_status: 1,
          created_at: null,
          updated_at: null,
        },
        module_feature: [],
      },
      {
        id: 163,
        package_id: 4,
        module_id: 4,
        created_at: "2025-04-01T12:36:06.000000Z",
        updated_at: "2025-04-01T12:36:06.000000Z",
        deleted_at: null,
        module_name: {
          id: 4,
          module_name: "Leave management",
          module_status: 1,
          created_at: null,
          updated_at: null,
        },
        module_feature: [],
      },
      {
        id: 164,
        package_id: 4,
        module_id: 4,
        created_at: "2025-04-01T12:36:06.000000Z",
        updated_at: "2025-04-01T12:36:06.000000Z",
        deleted_at: null,
        module_name: {
          id: 4,
          module_name: "Document storage",
          module_status: 1,
          created_at: null,
          updated_at: null,
        },
        module_feature: [],
      },
    ],
  },
  {
    id: 5,
    package_name: "Premium",
    package_status: 1,
    subpackage_name: "(11-25 Users)",
    price_per_month_per_user: 49.99,
    daily_price_per_user: 1.61,
    yearly_price_per_user: 599.88,
    created_at: "2024-12-20T11:20:31.000000Z",
    updated_at: "2025-04-01T12:35:36.000000Z",
    deleted_at: null,
    package_modules: [
      {
        id: 168,
        package_id: 5,
        module_id: 3,
        created_at: "2025-04-02T04:18:12.000000Z",
        updated_at: "2025-04-02T04:18:12.000000Z",
        deleted_at: null,
        module_name: {
          id: 3,
          module_name: "Employee self-service",
          module_status: 1,
          created_at: null,
          updated_at: null,
        },
        module_feature: [],
      },
      {
        id: 169,
        package_id: 5,
        module_id: 4,
        created_at: "2025-04-02T04:18:12.000000Z",
        updated_at: "2025-04-02T04:18:12.000000Z",
        deleted_at: null,
        module_name: {
          id: 4,
          module_name: "Time & attendance",
          module_status: 1,
          created_at: null,
          updated_at: null,
        },
        module_feature: [],
      },
      {
        id: 170,
        package_id: 5,
        module_id: 4,
        created_at: "2025-04-02T04:18:12.000000Z",
        updated_at: "2025-04-02T04:18:12.000000Z",
        deleted_at: null,
        module_name: {
          id: 4,
          module_name: "Roster management",
          module_status: 1,
          created_at: null,
          updated_at: null,
        },
        module_feature: [],
      },
      {
        id: 171,
        package_id: 5,
        module_id: 4,
        created_at: "2025-04-02T04:18:12.000000Z",
        updated_at: "2025-04-02T04:18:12.000000Z",
        deleted_at: null,
        module_name: {
          id: 4,
          module_name: "Leave management",
          module_status: 1,
          created_at: null,
          updated_at: null,
        },
        module_feature: [],
      },
      {
        id: 172,
        package_id: 5,
        module_id: 4,
        created_at: "2025-04-02T04:18:12.000000Z",
        updated_at: "2025-04-02T04:18:12.000000Z",
        deleted_at: null,
        module_name: {
          id: 4,
          module_name: "Document storage",
          module_status: 1,
          created_at: null,
          updated_at: null,
        },
        module_feature: [],
      },
      {
        id: 173,
        package_id: 5,
        module_id: 4,
        created_at: "2025-04-02T04:18:12.000000Z",
        updated_at: "2025-04-02T04:18:12.000000Z",
        deleted_at: null,
        module_name: {
          id: 4,
          module_name: "E-signature",
          module_status: 1,
          created_at: null,
          updated_at: null,
        },
        module_feature: [],
      },
    ],
  },
  {
    id: 6,
    package_name: "Enterprise",
    package_status: 1,
    subpackage_name: "(26-55 Users)",
    price_per_month_per_user: 99.99,
    daily_price_per_user: 0.84,
    yearly_price_per_user: 311.88,
    created_at: "2025-01-02T05:22:18.000000Z",
    updated_at: "2025-04-01T12:21:12.000000Z",
    deleted_at: null,
    package_modules: [
      {
        id: 164,
        package_id: 6,
        module_id: 3,
        created_at: "2025-04-02T04:17:57.000000Z",
        updated_at: "2025-04-02T04:17:57.000000Z",
        deleted_at: null,
        module_name: {
          id: 3,
          module_name: "Employee self-service",
          module_status: 1,
          created_at: null,
          updated_at: null,
        },
        module_feature: [],
      },
      {
        id: 165,
        package_id: 6,
        module_id: 4,
        created_at: "2025-04-02T04:17:57.000000Z",
        updated_at: "2025-04-02T04:17:57.000000Z",
        deleted_at: null,
        module_name: {
          id: 4,
          module_name: "Time & attendance",
          module_status: 1,
          created_at: null,
          updated_at: null,
        },
        module_feature: [],
      },
      {
        id: 166,
        package_id: 5,
        module_id: 4,
        created_at: "2025-04-02T04:18:12.000000Z",
        updated_at: "2025-04-02T04:18:12.000000Z",
        deleted_at: null,
        module_name: {
          id: 4,
          module_name: "Roster management",
          module_status: 1,
          created_at: null,
          updated_at: null,
        },
        module_feature: [],
      },
      {
        id: 167,
        package_id: 5,
        module_id: 4,
        created_at: "2025-04-02T04:18:12.000000Z",
        updated_at: "2025-04-02T04:18:12.000000Z",
        deleted_at: null,
        module_name: {
          id: 4,
          module_name: "Leave management",
          module_status: 1,
          created_at: null,
          updated_at: null,
        },
        module_feature: [],
      },
      {
        id: 168,
        package_id: 5,
        module_id: 4,
        created_at: "2025-04-02T04:18:12.000000Z",
        updated_at: "2025-04-02T04:18:12.000000Z",
        deleted_at: null,
        module_name: {
          id: 4,
          module_name: "Document storage",
          module_status: 1,
          created_at: null,
          updated_at: null,
        },
        module_feature: [],
      },
      {
        id: 169,
        package_id: 5,
        module_id: 4,
        created_at: "2025-04-02T04:18:12.000000Z",
        updated_at: "2025-04-02T04:18:12.000000Z",
        deleted_at: null,
        module_name: {
          id: 4,
          module_name: "E-signature",
          module_status: 1,
          created_at: null,
          updated_at: null,
        },
        module_feature: [],
      },
      {
        id: 170,
        package_id: 5,
        module_id: 4,
        created_at: "2025-04-02T04:18:12.000000Z",
        updated_at: "2025-04-02T04:18:12.000000Z",
        deleted_at: null,
        module_name: {
          id: 4,
          module_name: "Mobile app",
          module_status: 1,
          created_at: null,
          updated_at: null,
        },
        module_feature: [],
      },
      {
        id: 169,
        package_id: 5,
        module_id: 4,
        created_at: "2025-04-02T04:18:12.000000Z",
        updated_at: "2025-04-02T04:18:12.000000Z",
        deleted_at: null,
        module_name: {
          id: 4,
          module_name: "Time & attendance",
          module_status: 1,
          created_at: null,
          updated_at: null,
        },
        module_feature: [],
      },
    ],
  },
  {
    id: 7,
    package_name: "Bespoke",
    package_status: 1,
    subpackage_name: "(56+ Users)",
    price_per_month_per_user: 99.99,
    daily_price_per_user: 0.84,
    yearly_price_per_user: 311.88,
    created_at: "2025-01-02T05:22:18.000000Z",
    updated_at: "2025-04-01T12:21:12.000000Z",
    deleted_at: null,
    package_modules: [
      {
        id: 163,
        package_id: 6,
        module_id: 3,
        created_at: "2025-04-02T04:17:57.000000Z",
        updated_at: "2025-04-02T04:17:57.000000Z",
        deleted_at: null,
        module_name: {
          id: 3,
          module_name: "Recruitment & hiring",
          module_status: 1,
          created_at: null,
          updated_at: null,
        },
        module_feature: [],
      },
      {
        id: 164,
        package_id: 6,
        module_id: 3,
        created_at: "2025-04-02T04:17:57.000000Z",
        updated_at: "2025-04-02T04:17:57.000000Z",
        deleted_at: null,
        module_name: {
          id: 3,
          module_name: "Employee self-service",
          module_status: 1,
          created_at: null,
          updated_at: null,
        },
        module_feature: [],
      },
      {
        id: 165,
        package_id: 6,
        module_id: 4,
        created_at: "2025-04-02T04:17:57.000000Z",
        updated_at: "2025-04-02T04:17:57.000000Z",
        deleted_at: null,
        module_name: {
          id: 4,
          module_name: "Time & attendance",
          module_status: 1,
          created_at: null,
          updated_at: null,
        },
        module_feature: [],
      },
      {
        id: 166,
        package_id: 5,
        module_id: 4,
        created_at: "2025-04-02T04:18:12.000000Z",
        updated_at: "2025-04-02T04:18:12.000000Z",
        deleted_at: null,
        module_name: {
          id: 4,
          module_name: "Roster management",
          module_status: 1,
          created_at: null,
          updated_at: null,
        },
        module_feature: [],
      },
      {
        id: 167,
        package_id: 5,
        module_id: 4,
        created_at: "2025-04-02T04:18:12.000000Z",
        updated_at: "2025-04-02T04:18:12.000000Z",
        deleted_at: null,
        module_name: {
          id: 4,
          module_name: "Leave management",
          module_status: 1,
          created_at: null,
          updated_at: null,
        },
        module_feature: [],
      },
      {
        id: 168,
        package_id: 5,
        module_id: 4,
        created_at: "2025-04-02T04:18:12.000000Z",
        updated_at: "2025-04-02T04:18:12.000000Z",
        deleted_at: null,
        module_name: {
          id: 4,
          module_name: "Document storage",
          module_status: 1,
          created_at: null,
          updated_at: null,
        },
        module_feature: [],
      },
      {
        id: 169,
        package_id: 5,
        module_id: 4,
        created_at: "2025-04-02T04:18:12.000000Z",
        updated_at: "2025-04-02T04:18:12.000000Z",
        deleted_at: null,
        module_name: {
          id: 4,
          module_name: "E-signature",
          module_status: 1,
          created_at: null,
          updated_at: null,
        },
        module_feature: [],
      },
      {
        id: 170,
        package_id: 5,
        module_id: 4,
        created_at: "2025-04-02T04:18:12.000000Z",
        updated_at: "2025-04-02T04:18:12.000000Z",
        deleted_at: null,
        module_name: {
          id: 4,
          module_name: "Mobile app",
          module_status: 1,
          created_at: null,
          updated_at: null,
        },
        module_feature: [],
      },
      {
        id: 170,
        package_id: 5,
        module_id: 4,
        created_at: "2025-04-02T04:18:12.000000Z",
        updated_at: "2025-04-02T04:18:12.000000Z",
        deleted_at: null,
        module_name: {
          id: 4,
          module_name: "AI automation",
          module_status: 1,
          created_at: null,
          updated_at: null,
        },
        module_feature: [],
      },
      {
        id: 169,
        package_id: 5,
        module_id: 4,
        created_at: "2025-04-02T04:18:12.000000Z",
        updated_at: "2025-04-02T04:18:12.000000Z",
        deleted_at: null,
        module_name: {
          id: 4,
          module_name: "Time & attendance",
          module_status: 1,
          created_at: null,
          updated_at: null,
        },
        module_feature: [],
      },
    ],
  },
];

export default function AvailablePlans() {
  // const { package_name, price_per_month_per_user, package_modules } = data;
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleSelect = () => {
    window.location.href = 'https://www.hrmentor.co.uk/pricing';
  };
  
  return (
    <>
      <PurchasePlan isOpen={isOpen} closeModal={closeModal} />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-5 lg:px-10 2xl:gap-8">
            {plans?.map((plan, index) => (
              <div
                key={plan?.id}
                className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg"
              >
                <div className="flex h-full flex-col justify-between gap-3 px-7 py-4 lg:gap-5">
                  <div className="flex-grow">
                    <div className="flex flex-col gap-2 pb-5 pt-8 text-center">
                      {plan?.package_name !== "Bespoke" && (
                        <h1 className="w-full text-center text-4xl font-bold text-black">
                          £{plan?.price_per_month_per_user}
                          <span className="text-lg">/Month</span>
                        </h1>
                      )}
                      <p className="font-semibold">{plan?.subpackage_name}</p>
                      {/* <p className="font-semibold text-[#101828]/45">
                        Billed Annually
                      </p> */}
                      <p className="text-lg font-bold text-[#2B3990]">
                        {plan?.package_name} Plan
                      </p>
                    </div>
                    <p className="mt-2 text-lg font-semibold text-black">
                      Features
                    </p>
                    <div className="flex flex-col lg:gap-3">
                      {/* Features */}
                      <ul className="mt-4 flex flex-col gap-3">
                        {plan?.package_modules?.map((item) => (
                          <li className="flex items-center">
                            <img
                              src={tickgreen}
                              alt="Employee Management"
                            />
                            <span className="ml-2 text-gray-600">
                              {item?.module_name?.module_name}
                            </span>
                          </li>
                        ))}
                      </ul>
                      {/* <hr className="my-2" />
                      <div className="flex flex-col items-center justify-center gap-2 text-center">
                        <p className="text-black">Choose number of licenses</p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleDecrement(plan.id)}
                            className="rounded-md bg-gray-100 px-3 active:bg-gray-200"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            min="1"
                            className="w-10 text-center text-black"
                            value={counts[plan.id]}
                            onChange={(e) =>
                              setCounts({
                                ...counts,
                                [plan.id]: Math.max(1, Number(e.target.value)),
                              })
                            }
                          />
                          <button
                            onClick={() => handleIncrement(plan.id)}
                            className="rounded-md bg-gray-100 px-3 active:bg-gray-200"
                          >
                            +
                          </button>
                        </div>
                      </div> */}
                    </div>
                  </div>
                  <button
                    onClick={() => handleSelect(plan, index)}
                    className={`btn-price`}
                  >
                    Purchase
                  </button>
                </div>
              </div>
            ))}
          </div>
    </>
  );
}

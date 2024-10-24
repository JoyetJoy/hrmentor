import React from "react";

export const FilterModalHiring = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-end">
          {/* Backdrop */}
          <div
            className={`fixed inset-0 bg-black/50 transition-opacity duration-300 ${
              isOpen ? "opacity-100" : "opacity-0"
            }`}
            onClick={onClose}
          ></div>

          <div
            className={`fixed right-0 top-0 h-full w-96 transform bg-white p-5 shadow-lg transition-transform duration-300 ease-in-out ${
              isOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Filter Job</h2>
              <button
                className="text-xl font-bold text-gray-600"
                onClick={onClose}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.6665 12.8635L21.262 5.29369C21.5793 4.97337 21.5793 4.45446 21.262 4.13415C20.9503 3.80811 20.4355 3.79832 20.1118 4.11227L12.5163 11.6821L5.01839 4.11227C4.86467 3.94835 4.65078 3.85547 4.42702 3.85547C4.20327 3.85547 3.98938 3.94835 3.83566 4.11227C3.5543 4.42174 3.5543 4.8967 3.83566 5.20618L11.3335 12.7651L3.738 20.324C3.42067 20.6443 3.42067 21.1632 3.738 21.4835C3.88907 21.6395 4.09685 21.7264 4.31309 21.7242C4.53351 21.7422 4.75202 21.6714 4.92074 21.5273L12.5163 13.9574L20.1118 21.6148C20.2629 21.7708 20.4707 21.8577 20.6869 21.8554C20.9029 21.8565 21.1102 21.7697 21.262 21.6148C21.5793 21.2945 21.5793 20.7755 21.262 20.4552L13.6665 12.8635Z"
                    fill="black"
                  />
                </svg>
              </button>
            </div>

            <div className="flex flex-col gap-0 pt-5">
              <div class="flex flex-col space-y-1 py-2">
                <label class="label-text font-semibold">Type</label>
                <div class="h-fit rounded-md border shadow-sm">
                  <div class="relative">
                    <select class="block w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                      <option value="" disabled selected>
                        Select 
                      </option>
                      <option value="One">One</option>
                      <option value="">Two</option>
                    </select>
                  </div>
                  <input name="language_spoken" type="hidden" value="" />
                </div>
              </div>
              <div class="flex flex-col space-y-1 py-2">
                <label class="label-text font-semibold">Location</label>
                <div class="h-fit rounded-md border shadow-sm">
                  <div class="relative">
                    <select class="block w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                      <option value="" disabled selected>
                        Select 
                      </option>
                      <option value="One">One</option>
                      <option value="">Two</option>
                    </select>
                  </div>
                  <input name="language_spoken" type="hidden" value="" />
                </div>
              </div>
              <div class="flex flex-col space-y-1 py-2">
                <label class="label-text font-semibold">Department</label>
                <div class="h-fit rounded-md border shadow-sm">
                  <div class="relative">
                    <select class="block w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                      <option value="" disabled selected>
                        Select 
                      </option>
                      <option value="One">One</option>
                      <option value="">Two</option>
                    </select>
                  </div>
                  <input name="language_spoken" type="hidden" value="" />
                </div>
              </div>
            </div>
            <div className="mt-5">{children}</div>
          </div>
        </div>
      )}
    </>
  );
};

import { rosterItems } from "@/constants/dummyData";
import { useState } from "react";

const RosterItemList = () => {
  const [activeItem, setActiveItem] = useState(null);


  const optionsMap = {
    Department: ["Emergency Department", "Cardiology", "Radiology", "Pediatrics", "Oncology"],
    Location: ["London", "Manchester", "Glasgow"],
    WorkArea: ["Lobby", "Reception", "ICU", "Cardiac"],
  };

  const handleItemClick = (itemName) => {
    setActiveItem(activeItem === itemName ? null : itemName);
  };

  return (
    <div className="min-h-full min-w-64 rounded-md bg-white px-5 py-6">
      <ul className="flex flex-col justify-center gap-5 text-sm text-gray-dark">
        {rosterItems.map((item) => (
          <li key={item?.id} className="flex flex-col">
            <div
              onClick={() => handleItemClick(item?.name)}
              className={`flex items-center gap-x-3 whitespace-nowrap text-sm cursor-pointer ${
                activeItem === item?.name ? "font-bold text-hrmprimaryorange" : "font-medium text-gray-dark"
              }`}
            >
              {item?.name}
            </div>

            {activeItem === item?.name && (
              <ul className="mt-2 ml-4 text-sm text-gray-dark">
                {(optionsMap[item?.name] || []).map((option, index) => (
                  <li key={index} className="py-1">
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RosterItemList;

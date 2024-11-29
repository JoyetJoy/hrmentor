import { setupItems } from "@/constants/dummyData";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function Setup() {
  const [activeItem, setActiveItem] = useState("Email");
  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
  };

  return (
    <div className="min-h-full min-w-64 rounded-md bg-white px-5 py-6">
      <div className="flex flex-col justify-center gap-5 text-sm text-gray-dark">
        {setupItems?.map((item) => (
          <Link
            key={item.id}
            to={item.path}
            onClick={() => handleItemClick(item.name)}
            className={`flex items-center gap-x-3 whitespace-nowrap text-sm ${
              activeItem === item.name
                ? "font-bold text-hrmprimaryorange"
                : "font-medium text-gray-dark"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Setup;

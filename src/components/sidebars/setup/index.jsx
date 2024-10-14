import { setupItems } from "@/constants/dummyData"; 
import React, { useState } from "react";
import { Link } from "react-router-dom";

function Setup() {
  const [activeItem, setActiveItem] = useState('Shift'); 
  const handleItemClick = (itemName) => {
    setActiveItem(itemName); 
  };

  return (
    <div className="min-h-full min-w-64 rounded-md bg-white px-5 py-6">
    <ul className="flex flex-col justify-center gap-5 text-sm text-[#7F7F7F]">
      {setupItems?.map((item) => (
        <li
          key={item.id} 
          className={`flex items-center gap-x-3 whitespace-nowrap text-sm`}
        >
         <Link 
              to={item.path} // Navigate to the item's path
              onClick={() => handleItemClick(item.name)} // Update active state
              className={`whitespace-nowrap ${
                activeItem === item.name ? "font-bold text-[#E95D39]" : "font-medium text-[#7F7F7F]"
              }`}
            >
              {item.name}
            </Link>
        </li>
      ))}
    </ul>
  </div>
  );
}

export default Setup;

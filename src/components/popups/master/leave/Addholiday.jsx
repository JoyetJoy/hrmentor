import React, { useState } from 'react';
import BasicSettings from './BasicSettings';
import AvailabilitySettings from './AvailabilitySettings';

function Addholiday() {
    const [active,setActive] = useState('Basic settings')
      
  return (
    <div>
        <div className="flex flex-col gap-x-3">
            <div className="items-centerm flex justify-between pb-3 pt-2">
            <div className="flex items-center gap-4">
                <h5 className="text-lg font-bold">Add Holiday</h5>
            </div>
           </div>
           <div className="flex gap-x-3">
           <div className="min-h-full min-w-64 rounded-md bg-white px-5 py-6">
      <ul className="flex flex-col justify-center gap-5 text-sm text-gray-dark">
        
          <li
            onClick={()=>setActive('Basic settings')}
            className={`flex items-center gap-x-3 whitespace-nowrap text-sm ${active === 'Basic settings' ? "font-bold text-hrmprimaryorange" : "font-medium text-gray-dark cursor-pointer"}`}
          >Basic settings
          </li>
          <li
            onClick={()=>setActive('Availability settings')}
            className={`flex items-center gap-x-3 whitespace-nowrap text-sm ${active === 'Availability settings' ? "font-bold text-hrmprimaryorange" : "font-medium text-gray-dark cursor-pointer"}`}
          >Availability settings
          </li>
          <li
            onClick={()=>setActive('Advanced settings')}
            className={`flex items-center gap-x-3 whitespace-nowrap text-sm ${active === 'Advanced settings' ? "font-bold text-hrmprimaryorange" : "font-medium text-gray-dark cursor-pointer"}`}
          >Advanced settings
          </li>
    
      </ul>
    </div>
          <div className="min-h-[570px] w-full rounded-md bg-white px-5 py-4">
            <div>
                {active === 'Basic settings' && <BasicSettings />}
                {active === 'Availability settings' && <AvailabilitySettings />}
              
            </div>
          </div>
          </div>
        </div>
      
    </div>
  )
}

export default Addholiday

import React from 'react'
import userPluse from "../../../../public/assets/images/hriring/1.png"
import offerHand from "../../../../public/assets/images/hriring/2.png"
import user from "../../../../public/assets/images/hriring/3.png"
import noDeal from "../../../../public/assets/images/hriring/4.png"
import { Link } from 'react-router-dom'

export const OverViewCards = () => {
  return (
   <>
   <div className="grid grid-cols-4 gap-3">
   <Link to={"overview/ready-to-hiring"} > <div className="flex p-5 justify-between items-center bg-[#FEF8E9] rounded-sm text-md font-semibold">
        <div className="flex flex-col gap-3">
            <div className="">Ready to Hiring </div>
            <div className="text-3xl font-semibold">5</div>
        </div>
        <img src={userPluse} className='object-contain h-12' alt="" />
    </div>
    </Link>
   <Link to={"overview/offer-to-be-finalized"}> <div className="flex p-5 justify-between items-center bg-[#F8F3FF] rounded-sm text-md font-semibold">
        <div className="flex flex-col gap-3">
            <div className="">Offer to be finalized </div>
            <div className="text-3xl font-semibold">1322</div>
        </div>
        <img src={offerHand} className='object-contain h-12' alt="" />
    </div></Link>
    <div className="flex p-5 justify-between items-center bg-[#EBF9ED] rounded-sm text-md font-semibold">
        <div className="flex flex-col gap-3">
            <div className="">Upcoming </div>
            <div className="text-3xl font-semibold">99</div>
        </div>
        <img src={user} className='object-contain h-12' alt="" />
    </div>
    <div className="flex p-5 justify-between items-center bg-[#F2EAF2] rounded-sm text-md font-semibold">
        <div className="flex flex-col gap-3">
            <div className="">Offer declined </div>
            <div className="text-3xl font-semibold">3</div>
        </div>
        <img src={noDeal} className='object-contain h-12' alt="" />
    </div>
   </div>
   </>
  )
}

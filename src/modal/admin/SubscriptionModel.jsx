
// import tickgreen from '/public/assets/icons/admin-icons/tick-green.svg';
// import tickgray from '/public/assets/icons/admin-icons/tick-gray.svg';
// import React, { useState } from 'react';
// import { FaPlus, FaMinus } from 'react-icons/fa';
// import { iconIcon } from '../../../../utils';






// function SubscriptionModel() {
//     const [count, setCount] = useState(0);
// const increment = () => {
//     setCount(count + 1);
// };
// const decrement = () => {
//     setCount(count - 1);
// };
//   return (
    
//         <dialog id="my_modal_3" className="modal font-monorope">
//                                     <div className="modal-box w-4/5 max-w-4xl p-20 rounded-none ">
//                                         <form method="dialog">
//                                             <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
//                                         </form>
//                                         <div className='flex flex-col items-start '>
//                                             <p className='text-red-600 text-sm font-bold font-monorope'>Pricing</p>
//                                             <h1 className='text-2xl font-extrabold text-black my-3'>Bussiness</h1>
//                                             <h2 className='text-4xl font-extrabold text-black m'>$20/Month</h2>
//                                             <p className='text-justify my-4 text-sm'>Morem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. </p>
//                                             <div className='flex justify-between w-full '>
//                                                 <div className='flex flex-col gap-1 items-baseline my-1 '>
//                                                     <h1 className='font-extrabold text-base'>Featuers</h1>
//                                                     <div className='flex flex-col gap-1'>
//                                                         <h1 className='text-sm font-semibold my-1 text-justify'>Recruiter</h1>

//                                                         <p className='flex gap-2 items-center text-sm text-[#667085] py-1'>
//                                                             <div className='rounded-full p-1 flex items-center bg-[#D1FADF]  size-5 justify-center'>
//                                                                 <img src={tickgreen} alt="tick" className=' w-full object-contain' />
//                                                             </div>
//                                                             Audit log and data history
//                                                         </p>

//                                                         <p className='flex gap-2 items-center text-sm text-[#667085] py-1'>
//                                                             <div className='rounded-full p-1 flex items-center bg-[#D1FADF]  size-5 justify-center'>
//                                                                 <img src={tickgreen} alt="tick" className=' w-full object-contain' />
//                                                             </div>
//                                                             Unlimited individual users                                                        </p>

//                                                         <p className='flex gap-2 items-center text-sm text-[#667085] py-1'>
//                                                             <div className='rounded-full p-1 flex items-center bg-[#D1FADF]  size-5 justify-center'>
//                                                                 <img src={tickgreen} alt="tick" className=' w-full object-contain' />
//                                                             </div>
//                                                             Unlimited individual users                                                        </p>
//                                                     </div>
//                                                     <div>
//                                                         <h1 className='text-sm font-semibold my-1 text-justify '>Hiring</h1>

//                                                         <p className='flex gap-2 items-center text-sm text-[#667085] py-1'>
//                                                         <div className='rounded-full p-1 flex items-center bg-[#D1FADF]  size-5 justify-center'>
//                                                                 <img src={tickgreen} alt="tick" className=' w-full object-contain' />
//                                                             </div>
//                                                             Audit log and data history
//                                                         </p>
//                                                         <p className='flex gap-2 items-center text-sm text-[#667085] py-1'>
//                                                         <div className='rounded-full p-1 flex items-center bg-[#D1FADF]  size-5 justify-center'>
//                                                                 <img src={tickgreen} alt="tick" className=' w-full object-contain' />
//                                                             </div>
//                                                             Unlimited individual users                                                        </p>
//                                                         <p className='flex gap-2 items-center text-sm text-[#667085] py-1'>
//                                                         <div className='rounded-full p-1 flex items-center bg-[#D1FADF]  size-5 justify-center'>
//                                                                 <img src={tickgreen} alt="tick" className=' w-full object-contain' />
//                                                             </div>
//                                                             Unlimited individual users                                                        </p>
//                                                     </div>
//                                                 </div>
//                                                 <div className='border border-gray-300'></div>
//                                                 <div className=' flex flex-col items-baseline'>
//                                                     <h1  className='font-extrabold text-base'>Payment</h1>
//                                                     <p className='my-3 text-sm text-gray-600 font-semibold'>Annual Pan , Paid Monthly $20/mo Per License</p>
//                                                     <div className='flex flex-col gap-12   '>
//                                                         <div className=' my-3 flex flex-col'>
//                                                             <h1 className='text-sm font-semibold text-justify text-[#181C3A] '>Choose number of license</h1>

//                                                             <div className="flex space-x-5  mt-3">
//                                                                 <button
//                                                                     className="bg-gray-300 px-2 rounded-md"
//                                                                     onClick={increment}
//                                                                 >
//                                                                     <FaPlus className="size-2" />
//                                                                 </button>
//                                                                 <div className="text-sm">{count}</div>
//                                                                 <button
//                                                                     className="p-2 border border-gray-300 rounded-md"
//                                                                     onClick={decrement}
//                                                                 >
//                                                                     <FaMinus className="size-2" />
//                                                                 </button>
//                                                             </div>
//                                                         </div>
//                                                         <div>
//                                                         <p className='text-xs text-[#808080] mb-4 flex items-center gap-1'> <div><img src={iconIcon} alt="" /></div>Fee applies if you can cancel after 10 days </p>
//                                                         <button className='btn  bg-[#181C3A] hover:bg-[#181C3A] text-xs font-normal max-h-1 h-1 text-white px-24 mt-'>Purchase</button>
//                                                         </div>
                                                        
//                                                      </div>
//                                                 </div>
//                                             </div>
                                           
//                                         </div>

//                                     </div>
//                                 </dialog>

//   )
// }

// export default SubscriptionModel

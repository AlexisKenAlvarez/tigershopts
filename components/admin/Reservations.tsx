import Link from 'next/link';
import { useRef, useState } from 'react'
import { FaCheck } from 'react-icons/fa'
import { MdClose } from 'react-icons/md'

const Reservations = () => {
    const [selected, setSelect] = useState("pending")
    return (
        <div className="text-2xl w-full h-full">
            <div className='flex w-fit text-md'>
                <p className='bg-zinc-200 w-full p-3 px-8 cursor-pointer' style={selected === 'pending' ? { opacity: "100%" } : { opacity: "50%" }}>Pending</p>
                <p className='bg-zinc-200 w-full p-3 px-8 cursor-pointer' style={selected === 'completed' ? { opacity: "100%" } : { opacity: "50%" }}>Completed</p>
            </div>

            <div className='w-full h-[90%] bg-zinc-200 p-10 overflow-y-scroll flex flex-col gap-y-10 pb-20'>
                <div className=' bg-slate-300 flex flex-col sm:flex-row sm:justify-between'>
                    <div className='flex flex-col gap-y-3 p-4 text-[15px]'>
                        <p className='font-semibold'>Email: <span className='font-normal break-words'>alexisken.alvarez@cvsu.edu.ph</span></p>
                        <p className='font-semibold'>Fullname: <span className='font-normal'>Alexis Ken Alvarez</span></p>
                        <p className='font-semibold'>Product: <span className='font-normal'>Tote Bag</span></p>
                        <p className='font-semibold'>Amount: <span className='font-normal'>1000</span>
                            <span className='font-semibold'>
                                &nbsp; | &nbsp;Quantity: &nbsp;
                            </span>
                            <span className='font-normal'>
                                2
                            </span></p>

                        <a target="_blank" href="https://www.facebook.com/" className='font-semibold break-words'>
                            Facebook:&nbsp;
                            <span className='font-normal'>
                                https://www.facebook.com/
                            </span>
                        </a>


                    </div>
                    <div className=' flex mt-5 sm:flex-col sm:h-full sm:mt-0 sm:items-center sm:justify-center'>
                        <div className='w-full cursor-pointer hover:bg-slate-700  flex items-center justify-center py-4 sm:h-full sm:w-[4rem]'>
                            <MdClose className=' text-red-600 text-2xl' />
                        </div>
                        <div className="w-full cursor-pointer hover:bg-slate-700 flex items-center justify-center sm:h-full sm:w-[4rem]">
                            <FaCheck className='text-green-600 text-xl' />
                        </div>

                    </div>
                </div>


            </div>
        </div>
    );
}

export default Reservations;
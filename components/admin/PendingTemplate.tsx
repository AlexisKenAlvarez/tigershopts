import { FunctionComponent, useState } from "react";
import { FaCheck } from 'react-icons/fa'
import { MdClose } from 'react-icons/md'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface pending {
    amount: number
    contact: string
    facebook: string
    fullname: string
    productName: string
    quantity: number
    email: string
    _id: string
    refresh: () => void
}

const PendingTemplate: FunctionComponent<pending> = (props) => {
    const { amount, facebook, fullname, productName, quantity, email, _id, contact, refresh } = props
    const [debounce, setDebounce] = useState(false)
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 })

    const handleApprove = (e: string) => {
        if (!debounce) {
            setDebounce(true)
            fetch("/api/admin/approve", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: e,
                    type: "approve"
                })
            }).then((response) => {
                return response.json()
            }).then((response) => {

                setDebounce(false)
                refresh()
            })
        }
    }

    const handleRemove = (e: string) => {
        if (!debounce) {
            setDebounce(true)
            fetch("/api/admin/approve", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: e,
                    type: "remove"
                })
            }).then((response) => {
                return response.json()
            }).then((response) => {
                setDebounce(false)
                refresh()
            })
        }
    }

    return (
        <motion.div initial={{ opacity: 0, scale: 0 }} animate={ inView ? { scale: 1, opacity: 100 } : {}} transition={{ duration: 0.3, delay: 0.1}} className=' bg-slate-300 flex flex-col sm:flex-row sm:justify-between' ref={ref}>
            <div className='flex flex-col gap-y-1 p-4 text-[15px]'>
                <p className='font-semibold'>Email: <span className='font-normal break-words'>{email}</span></p>
                <p className='font-semibold'>Fullname: <span className='font-normal'>{fullname}</span></p>
                <p className='font-semibold'>Product: <span className='font-normal'>{productName}</span></p>
                <p className='font-semibold'>Contact: <span className='font-normal'>{contact}</span></p>

                <p className='font-semibold'>Amount: <span className='font-normal'>{amount}</span>
                    <span className='font-semibold'>
                        &nbsp; | &nbsp;Quantity: &nbsp;
                    </span>
                    <span className='font-normal'>
                        {quantity}
                    </span></p>

                <a target="_blank" href={facebook} rel="noreferrer" className='font-semibold break-words'>
                    Facebook:&nbsp;
                    <span className='font-normal'>
                        {facebook}
                    </span>
                </a>

            </div>
            <div className=' flex mt-5 sm:flex-col sm:h-full sm:mt-0 sm:center sm:justify-center'>
                <div className='w-full cursor-pointer hover:bg-slate-700  flex center justify-center py-4 sm:h-full sm:w-[4rem] items-center' onClick={() => { handleRemove(_id) }}>
                    {debounce ? <motion.div animate={{ rotate: 1440 }} transition={{ duration: 8, repeat: Infinity }} className="">
                        <AiOutlineLoading3Quarters className='text-red-600 text-xl' />
                    </motion.div> : <MdClose className=' text-red-600 text-2xl' />}


                </div>
                <div className="w-full cursor-pointer hover:bg-slate-700 flex center justify-center sm:h-full sm:w-[4rem] items-center" onClick={() => { handleApprove(_id) }}>
                    {debounce ? <motion.div animate={{ rotate: 1440 }} transition={{ duration: 8, repeat: Infinity }} className="">
                        <AiOutlineLoading3Quarters className='text-green-600 text-xl' />
                    </motion.div> : <FaCheck className='text-green-600 text-xl' />}

                </div>

            </div>
        </motion.div>
    );
}

export default PendingTemplate;
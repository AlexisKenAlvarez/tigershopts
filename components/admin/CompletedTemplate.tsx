import { FunctionComponent } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface pending {
    amount: number
    contact: string
    facebook: string
    fullName: string
    productName: string
    quantity: number
    email: string
    _id: string
}

const CompletedTemplate: FunctionComponent<pending> = (props) => {
    const { amount, facebook, fullName, productName, quantity, email, contact } = props
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 })


    return (
        <motion.div  initial={{ opacity: 0, scale: 0 }} animate={ inView ? { scale: 1, opacity: 100 } : {}} transition={{ duration: 0.3, delay: 0.1}}  className=' bg-emerald-50 flex flex-col sm:flex-row sm:justify-between' ref={ref}>
            <div className='flex flex-col gap-y-1 p-4 text-[15px]'>
                <p className='font-semibold'>Email: <span className='font-normal break-words'>{email}</span></p>
                <p className='font-semibold'>Fullname: <span className='font-normal'>{fullName}</span></p>
                <p className='font-semibold'>Product: <span className='font-normal'>{productName}</span></p>
                <p className='font-semibold'>Contact: <span className='font-normal'>{contact}</span></p>

                <p className='font-semibold'>Amount: <span className='font-normal'>{amount}</span>
                    <span className='font-semibold'>
                        &nbsp; | &nbsp;Quantity: &nbsp;
                    </span>
                    <span className='font-normal'>
                        {quantity}
                    </span></p>

                <a target="_blank" href={facebook} className='font-semibold break-words'>
                    Facebook:&nbsp;
                    <span className='font-normal'>
                        {facebook}
                    </span>
                </a>

            </div>
        </motion.div>
    );
}

export default CompletedTemplate;
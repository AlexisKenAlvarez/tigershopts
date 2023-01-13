import React from 'react'
import FormInputSmall from '../FormInputSmall'
import FormInputShort from '../FormInputShort'
import { motion } from 'framer-motion'

const Page3 = (props) => {
    const { onBlur, onFocus, inputsHalf, inputsFull, value, onChange, error } = props
    return (
        <>
            <div className='flex gap-x-6'>
                {inputsHalf.map((val, i) => {
                    return (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 100 }} transition={{ duration: 0.5, delay: i * 0.1 }} key={val.id}>
                            <FormInputShort {...val} value={value[val.name]} onChange={onChange} error={error} />
                        </motion.div>
                    )
                })}
            </div>

            {inputsFull.map((val, i) => {
                return (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 100 }} transition={{ duration: 0.5, delay: (i + 2) * 0.1 }} key={val.id}>
                        <FormInputSmall key={val.id} {...val} value={value[val.name]} onChange={onChange} error={error} onBlur={onBlur} onFocus={onFocus} />
                    </motion.div>
                )
            })}


        </>
    )
}

export default Page3
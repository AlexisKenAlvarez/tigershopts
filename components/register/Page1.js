import FormInput from '../FormInput'
import { motion } from 'framer-motion'


const Page1 = (props) => {
    const { inputs, value, onChange, error } = props
    return (
        <>
            {inputs.map((val, i) => {
                return (
                    <motion.div initial={{opacity: 0 }} animate={{opacity: 100 }} transition={{ duration: 0.5, delay: i * 0.1 }} key={val.id}>
                        <FormInput {...val} value={value[val.name]} onChange={onChange} error={error} />

                    </motion.div>
                )
            })}
        </>
    )
}

export default Page1

import { motion } from "framer-motion";
import { useEffect, useState } from 'react'
import Image from 'next/image';
import { MdOpacity } from "react-icons/md";

const Loader = () => {
    const [active, setActive] = useState(false)

    const myvariant = {
        initial: {
            x: 0,
            y: 0,
            opacity: 0
        },

        animate: {
            opacity: 100,
            x: [50, -50, 50],
            y: [60, -60, 60],
            transition: {
                x: {
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                },
                y: {
                    duration: 1,
                    repeat: Infinity,
                    repeatType: "reverse",
                },



            }
        },

        animate2: {
            opacity: 100,
            x: [50, -50, 50],
            y: [60, -60, 60],
            transition: {
                x: {
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                },
                y: {
                    duration: 1,
                    repeat: Infinity,
                    repeatType: "reverse",
                },
                delay: 0.05


            }
        },

        animate3: {
            opacity: 100,
            x: [50, -50, 50],
            y: [60, -60, 60],
            transition: {
                x: {
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                },
                y: {
                    duration: 1,
                    repeat: Infinity,
                    repeatType: "reverse",
                },
                delay: 0.1


            }
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setActive(true)
        }, 500);
    }, [])


    const items = (

        <motion.div initial={{opacity: 100}} animate={{ opacity: 100 }} exit={{ opacity: 0 }} transition={{duration: 0.5}} className="z-[60] w-full h-full absolute bg-greenSteps flex justify-center items-center overflow-hidden">
            <div className="h-[22rem] w-[11rem] relative flex items-end justify-center mt-[-10rem]">

               

                <motion.div variants={myvariant} initial="initial" animate="animate3" className="absolute w-[2rem] h-[2rem] bg-[#935F01] m-auto top-0 bottom-0 right-0 left-0  rounded-full drop-shadow-xl"></motion.div>
                <motion.div variants={myvariant} initial="initial" animate="animate2" className="absolute w-[3.5rem] h-[3.5rem] bg-[#CB8503] m-auto top-0 bottom-0 right-0 left-0  rounded-full drop-shadow-xl"></motion.div>
                <motion.div variants={myvariant} initial="initial" animate="animate" className="absolute w-[4rem] h-[4rem] bg-heroOrange m-auto top-0 bottom-0 right-0 left-0  rounded-full drop-shadow-xl flex items-center justify-center">
                    <Image src="/logo.webp" alt="Logo" width='200' height='20' className="w-10 mx-auto" unoptimized={true}></Image>
                </motion.div>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 100 }} transition={{ duration: 0.7 }} className="w-[15rem] h-[3px] bg-white absolute self-center bottom-10 left-[-2.3rem]"></motion.div>
                <motion.div animate={{ width: "15rem" }} transition={{ duration: 2.5 }} className="w-[0rem] h-[3px] bg-heroOrange absolute self-center bottom-10 left-[-2.3rem]"></motion.div>

                <motion.h1 initial={{ opacity: 0, scale: 5 }} animate={{ opacity: 100, scale: 1 }} transition={{ duration: 0.7 }} className="font-extrabold text-heroOrange tracking-widest text-3xl">TIGERSHOP</motion.h1>
            </div>
        </motion.div>

    )

    return (
        <>
            {active ? items : null}

        </>

    );
}

export default Loader;
import Image from 'next/image';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
import { motion, AnimatePresence } from "framer-motion";
import Loader from './Loader';
import Link from 'next/link';
import ImageChanger from './ImageChanger';
import { useState, useEffect } from 'react'


const Hero = () => {
    const [image, setImage] = useState('/cvsugate.webp')
    const [num, setNum] = useState(0)
    const [toggle, setToggle] = useState(false)
    const valid = ['/cvsugate.webp', '/cvsu1.gif', '/cvsu2.gif', '/cvsu3.gif']
    const styles = {
        heroButton: 'md:flex md:ml-2 mt-8 rounded-lg hidden items-center justify-center p-[1px] w-40 mx-auto'
    }

    useEffect(() => {
        setToggle(current => !current)
    }, [num])

    setTimeout(() => {
        if (num === 4) {
            setImage('/cvsugate.webp')
        } else {
            setImage(valid[num])

        }
    }, 800);

    setTimeout(() => {

        if (num === 4) {

            setNum(1)
        } else {
            setNum(num + 1)
        }
    }, 5000);

    return (
        <section className="w-full h-auto flex justify-center z-10 bg-cover bg-greenBg md:bg-white">
            <div className="w-full max-w-[1700px] xl:mx-0 md:mx-[4rem] mx-[2rem] h-[100vh] flex flex-col md: md:flex-row">
                <div className="flex items-center h-full w-full justify-center z-10">

                    <motion.div initial={{ x: -300, opacity: 0 }} animate={{ x: 0, opacity: 100 }} transition={{ duration: 1 }} className="mt-8 md:mt-0" >
                        <div className='hidden flex-row gap-x-2 mb-10 md:flex'>
                            <motion.div
                                animate={{ x: [0, 32, 0] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className='h-6 w-6 bg-heroOrange rounded-full z-20'>
                            </motion.div>

                            <motion.div
                                animate={{ x: [0, -32, 0] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className='h-6 w-6 bg-greenButton rounded-full z-20'>
                            </motion.div>
                        </div>

                        <motion.h1 initial={{ x: -300, opacity: 0 }} animate={{ x: 0, opacity: 100 }} transition={{ duration: 1 }} className="text-white md:text-[#464646] w-full xl:text-6xl font-[800] uppercase font-raleway md:text-5xl md:w-[20rem] text-center md:text-left 2xl:text-8xl leading-20 mt-28 md:mt-0 text-5xl">Welcome<span className="text-heroOrange font-raleway"> Tigers</span></motion.h1>
                        <motion.p initial={{ x: -300, opacity: 0 }} animate={{ x: 0, opacity: 100 }} transition={{ duration: 1, delay: 0.1 }} className="max-w-[23rem] font-poppins text-white md:text-[#464646] mt-7 md:ml-2 text-sm lg:text-md md:text-left text-center 2xl:text-lg 2xl:max-w-[28rem] mx-auto" >An Organized and Systemic Platform for Merchandise of Students Organizations under College of Engineering and Information Technology in Cavite State University.</motion.p>

                        <Link href="#products" scroll={false}>
                            <motion.div initial={{ x: -300, opacity: 0 }} animate={{ x: 0, opacity: 100 }} transition={{ duration: 1, delay: 0.2 }} className={styles.heroButton}>
                                <div className="font-inter bg-[#D19713] text-white p-3 rounded-lg text-sm font-medium text-center hover:bg-heroOrange cursor-pointer select-none w-full">
                                    <p className="tracking-wider">
                                        View products
                                    </p>
                                </div>
                            </motion.div >
                        </Link>

                    </motion.div>
                </div>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 100 }} transition={{ duration: 1 }} >
                    <Image src="/cvsugate.webp" alt="Phone" className="z-0 opacity-60 w-full h-auto object-cover md:hidden" fill />
                </motion.div>


                <motion.div initial={{ x: 300, opacity: 0 }} animate={{ x: 0, opacity: 100 }} transition={{ duration: 1 }} className="md:items-center justify-center w-full md:h-full flex z-0 md:self-center self-start h-full mt-7 md:mt-0">
                    <div className="2xl:w-[45vw] xl:w-[40vw] lg:w-[32rem] md:w-[23.5rem] w-[13rem] md:mt-0 h-full md:absolute overflow-hidden right-0 bg ">
                        <AnimatePresence mode='wait'>
                            {toggle ? <ImageChanger key="CHANGER" image={image} /> : <ImageChanger key="CHANGER2" image={image} />}
                        </AnimatePresence>

                        <Link href="#products" scroll={false}>
                            <div className="items-center mt-8 justify-center flex md:hidden flex-col md:text-[#464646] text-white absolute bottom-10 mx-auto left-0 right-0">
                                <p className="text-center font-bold">View products</p>
                                <MdOutlineKeyboardArrowDown className="ml-2 text-2xl" />
                            </div>
                        </Link>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}

export default Hero;
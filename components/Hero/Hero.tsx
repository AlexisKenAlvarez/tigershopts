import Image from 'next/image';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
import { motion, AnimatePresence } from "framer-motion";

const Hero = () => {
    const styles = {
        welcome: "text-greenSteps w-full xl:text-6xl font-[800] uppercase font-raleway md:text-5xl md:w-[20rem] text-center md:text-left text-4xl mt-10 md:mt-0 2xl:text-8xl",
        subheader: "max-w-[23rem] font-poppins text-greenBg mt-7 md:ml-2 ml-0 text-sm lg:text-md md:text-left text-center 2xl:text-lg 2xl:max-w-[28rem]",
        heroButton: 'md:flex md:ml-2 mt-8 rounded-lg hidden items-center justify-center p-[1px] bg-greenButton hover:bg-white w-40 mx-auto'
    }

    return (
        <section className="w-full h-auto flex justify-center">
            <div className="w-full max-w-[1700px] md:mx-[8rem] mx-[2rem] h-[85vh] flex flex-col md: md:flex-row">
                <div className="flex items-center h-full w-full justify-center">
                    <div className="">

                        <motion.h1 initial={{ x: -300, opacity: 0 }} animate={{ x: 0, opacity: 100 }} exit={{x: -300, opacity: 0}} transition={{ duration: 0.7 }} className={styles.welcome}>Welcome<span className="text-heroOrange font-raleway"> Tigers</span></motion.h1>
                        <motion.p initial={{ x: -300, opacity: 0 }} animate={{ x: 0, opacity: 100 }} exit={{x: -300, opacity: 0}} transition={{ duration: 0.7, delay: 0.1 }} className={styles.subheader} >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</motion.p>

                        <motion.div initial={{ x: -300, opacity: 0 }} animate={{ x: 0, opacity: 100 }} exit={{x: -300, opacity: 0}} transition={{ duration: 0.7, delay: 0.2 }} className={styles.heroButton}>
                            <div className="font-inter bg-greenButton text-white p-3 rounded-lg text-sm font-medium text-center hover:bg-greenHover cursor-pointer select-none w-full">
                                <p className="tracking-wider">
                                    View products
                                </p>
                            </div>
                        </motion.div >

                    </div>
                </div>

                <motion.div initial={{ x: 300, opacity: 0 }} animate={{ x: 0, opacity: 100 }} exit={{x: 300, opacity: 0}} transition={{ duration: 0.7 }} className="md:items-center justify-center w-full h-full flex">
                    <div className="xl:w-[33rem] lg:w-[27rem]  md:w-[20rem] w-[15rem] mt-3 md:mt-0 2xl:w-[40rem]">
                        <Image src="/hero/phonetiger.webp" alt="Phone" height="400" width="400" className="w-full h-auto" />

                        <div className="items-center mt-8 justify-center flex md:hidden">
                            <p className="text-center text-greenSteps font-bold">View products</p>
                            <MdOutlineKeyboardArrowDown className="ml-2 text-2xl" />
                        </div>

                    </div>
                </motion.div>
            </div>
        </section>
    );
}

export default Hero;
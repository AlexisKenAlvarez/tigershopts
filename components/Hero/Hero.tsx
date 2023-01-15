import Image from 'next/image';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
import { motion, AnimatePresence } from "framer-motion";
import Loader from './Loader';
import Link from 'next/link';

const Hero = () => {
    const styles = {
        welcome: "text-[#464646] w-full xl:text-6xl font-[800] uppercase font-raleway md:text-5xl md:w-[20rem] text-center md:text-left text-4xl mt-10 md:mt-0 2xl:text-8xl leading-10 mt-20 md:mt-0",
        subheader: "max-w-[23rem] font-poppins text-[#464646] mt-7 md:ml-2 ml-0 text-sm lg:text-md md:text-left text-center 2xl:text-lg 2xl:max-w-[28rem]",
        heroButton: 'md:flex md:ml-2 mt-8 rounded-lg hidden items-center justify-center p-[1px] w-40 mx-auto'
    }

    return (
        <section className="w-full h-auto flex justify-center z-10 bg-cover bg-white">
            <div className="w-full max-w-[1700px] md:mx-[8rem] mx-[2rem] h-[100vh] flex flex-col md: md:flex-row">
                <div className="flex items-center h-full w-full justify-center">
                    <div className="mt-8 md:mt-0" >

                        <motion.h1 initial={{ x: -300, opacity: 0 }} animate={{ x: 0, opacity: 100 }} transition={{ duration: 0.7 }} className={styles.welcome}>Welcome<span className="text-heroOrange font-raleway"> Tigers</span></motion.h1>
                        <motion.p initial={{ x: -300, opacity: 0 }} animate={{ x: 0, opacity: 100 }} transition={{ duration: 0.7, delay: 0.1 }} className={styles.subheader} >An Organized and Systemic Platform for Merchandise of Students Organizations under College of Engineering and Information Technology in Cavite State University.</motion.p>

                        <Link href="#products" scroll={false}>
                            <motion.div initial={{ x: -300, opacity: 0 }} animate={{ x: 0, opacity: 100 }} transition={{ duration: 0.7, delay: 0.2 }} className={styles.heroButton}>
                                <div className="font-inter bg-[#D19713] text-white p-3 rounded-lg text-sm font-medium text-center hover:bg-heroOrange cursor-pointer select-none w-full">
                                    <p className="tracking-wider">
                                        View products
                                    </p>
                                </div>
                            </motion.div >
                        </Link>

                    </div>
                </div>


                <motion.div initial={{ x: 300, opacity: 0 }} animate={{ x: 0, opacity: 100 }} transition={{ duration: 0.7 }} className="md:items-center justify-center w-full md:h-full flex z-0 md:self-center self-start h-full mt-7 md:mt-0">
                    <div className="2xl:w-[50vw] xl:w-[45rem] lg:w-[38rem] md:w-[30rem] w-[13rem] md:mt-0 h-full md:absolute relative overflow-hidden right-0">
                        <Image src="/hero/HeroTransparent.webp" alt="Phone" height="400" width="400" className="w-full h-auto md:absolute z-10 md:top-[4rem] md:right-[-7rem] md:bottom-0 md:my-auto" />

                        <Link href="#products" scroll={false}>
                            <div className="items-center mt-8 justify-center flex md:hidden text-[#464646]">
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
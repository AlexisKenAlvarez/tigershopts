import Image from 'next/image';
import { GiHamburgerMenu } from 'react-icons/gi'
import NavItems from './NavItems';
import { FunctionComponent, useState, useEffect } from 'react';
import MobileNavItems from './MobileNavItems';
import { AnimatePresence, motion } from 'framer-motion';

interface myProp {
    status: boolean
}

const Nav: FunctionComponent<myProp> = (props) => {
    const { status } = props
    const [nav, setNav] = useState(false)

    const toggleNav = () => {
        console.log("hi");
        setNav((current) => !current)
    }

    const [scrollPosition, setScrollPosition] = useState(0);
    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <motion.nav initial={{ opacity: 0, y: -50 }} animate={{ opacity: 100, y: 0 }} transition={{ duration: 0.7 }} className=" z-[100] relative bg-black">

            <div className="w-full h-[5rem] flex items-center fixed">

                <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 100, y: 0 }} transition={{ duration: 0.7 }} className=" w-full max-w-[1600px] mx-auto flex justify-between items-center">
                    <div className="flex items-center cursor-pointer md:ml-14 lg:ml-36 ml-8">
                        <Image src="/logo.webp" alt="Logo" width='200' height='20' className="w-10 mx-auto" unoptimized={true}></Image>
                        <h1 className="ml-2 text-white uppercase font-bold font-poppins text-lg">Tigershop</h1>
                    </div>

                    <div className="md:block hidden md:mr-14 lg:mr-36">
                        <NavItems status={status} />
                    </div>

                    <GiHamburgerMenu className="text-4xl text-white md:hidden block mr-8" onClick={toggleNav} />

                </motion.div>
                <div className='w-full h-full bg-black absolute z-[-1] drop-shadow-xl transition-all ease-in-out duration-300' style={ scrollPosition >= 100 ? {opacity: "70%"} : {opacity: "0"}}></div>
                <AnimatePresence>
                    {nav ? <MobileNavItems status={status} toggleNav={toggleNav} /> : null}
                </AnimatePresence>
            </div>


        </motion.nav>
    );
}

export default Nav;
import Image from 'next/image';
import { GiHamburgerMenu } from 'react-icons/gi'
import NavItems from './NavItems';
import { FunctionComponent, useState, useEffect } from 'react';
import MobileNavItems from './MobileNavItems';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface myProp {
    status: boolean
}

const Nav: FunctionComponent<myProp> = (props) => {
    const { status } = props
    const [nav, setNav] = useState(false)
    const { asPath } = useRouter()
    const validPath = ['/', '/#products', '/order', '/about']

    const toggleNav = () => {
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

            <div className="w-full h-[5rem] flex items-center fixed ">

                <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 100, y: 0 }} transition={{ duration: 0.7 }} className=" w-full mx-auto flex justify-between items-center">
                    <Link href="/">
                        <div className="flex items-center cursor-pointer md:ml-14 lg:ml-10 ml-8">
                            <Image src="/logo.webp" alt="Logo" width='200' height='20' className="w-10 mx-auto" unoptimized={true}></Image>
                            <h1 className="ml-2 text-white md:text-[#464646] uppercase font-bold font-poppins text-lg"  style={validPath.includes(asPath) ? scrollPosition >= 100 ? { color: "white" } : {} : {color: "white"}}>Tigershop</h1>
                        </div>
                    </Link>

                    <div className="md:block hidden md:mr-12 lg:mr-28">
                        <NavItems status={status} scrollPosition={scrollPosition}/>
                    </div>

                    <GiHamburgerMenu className="text-4xl text-[#464646] md:hidden block mr-8" onClick={toggleNav} style={validPath.includes(asPath) ? {color: "white"} : scrollPosition >= 100 ? { color: "white" } : {}}/>

                </motion.div>
                <div className='w-full h-full bg-[#0e4722] absolute z-[-1] drop-shadow-xl transition-all ease-in-out duration-300' style={asPath.includes("/order") ? { opacity: "70%" } : scrollPosition >= 100 ? { opacity: "90%" } : { opacity: "0" }}></div>
                <AnimatePresence>
                    {nav ? <MobileNavItems status={status} toggleNav={toggleNav} /> : null}
                </AnimatePresence>
            </div>


        </motion.nav>
    );
}

export default Nav;
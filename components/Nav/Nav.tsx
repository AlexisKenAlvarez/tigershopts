import Image from 'next/image';
import { GiHamburgerMenu } from 'react-icons/gi'
import NavItems from './NavItems';
import { FunctionComponent, useState } from 'react';
import MobileNavItems from './MobileNavItems';
import { AnimatePresence, motion } from 'framer-motion';

interface myProp {
    status: boolean
}

const Nav:FunctionComponent<myProp> = (props) => {
    const { status } = props
    const [nav, setNav] = useState(false)

    const toggleNav = () => {
        setNav((current) => !current)
    }

    return (
        <motion.nav initial={{ opacity: 0, y: -50 }} animate={{opacity: 100, y: 0}} transition={{duration: 0.7}} className=" z-50">
            <div className="w-full h-[6rem] flex items-center absolute bg-transparent">
                <div className=" w-full max-w-[1600px] mx-auto flex justify-between items-center">
                    <div className="flex items-center cursor-pointer md:ml-14 lg:ml-36 ml-8">
                        <Image src="/logo.webp" alt="Logo" width='200' height='20' className="w-10 mx-auto" unoptimized={true}></Image>
                        <h1 className="ml-2 text-white uppercase font-bold font-poppins text-lg">Tigershop</h1>
                    </div>

                    <div className="md:block hidden md:mr-14 lg:mr-36">
                        <NavItems status={status}/>
                    </div>

                    <GiHamburgerMenu className="text-4xl text-white md:hidden block mr-8" onClick={toggleNav} />

                </div>
            </div>
            <AnimatePresence>
                {nav ? <MobileNavItems status={status} toggleNav={toggleNav}/> : null}
            </AnimatePresence>

        </motion.nav>
    );
}

export default Nav;
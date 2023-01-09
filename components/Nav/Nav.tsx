import Image from 'next/image';
import { GiHamburgerMenu } from 'react-icons/gi'
import NavItems from './NavItems';
import { useState } from 'react';
import MobileNavItems from './MobileNavItems';
import { AnimatePresence } from 'framer-motion';

const Nav = () => {
    const [nav, setNav] = useState(false)
    

    const toggleNav = () => {
        setNav((current) => !current)
    }

    return (
        <nav>
            <div className="w-full h-[6rem] border-b-[1px] shadow-md flex items-center relative z-40 bg-white">
                <div className=" w-full max-w-[1600px] mx-auto flex justify-between items-center">
                    <div className="flex items-center cursor-pointer md:ml-14 ml-8">
                        <Image src="/logo.webp" alt="Logo" width='200' height='20' className="w-12 mx-auto" unoptimized={true}></Image>
                        <h1 className="ml-2 text-greenSteps uppercase font-bold font-poppins text-lg">Tigershop</h1>

                    </div>
                    <div className="md:block hidden mr-14">
                        <NavItems />
                    </div>

                    <GiHamburgerMenu className="text-4xl text-greenSteps md:hidden block mr-8" onClick={toggleNav} />
                </div>
            </div>
            <AnimatePresence>
                {nav ? <MobileNavItems /> : null}
            </AnimatePresence>

        </nav>
    );
}

export default Nav;
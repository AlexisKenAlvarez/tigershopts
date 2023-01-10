import { motion } from "framer-motion";
import { useRouter } from 'next/router';
import { FunctionComponent } from "react";
import { navList } from "../../utils/List";
import Link from 'next/link';
import { VscTriangleUp } from 'react-icons/vsc'

interface myProp {
    status: boolean
    toggleNav: () => void
}

const MobileNavItems: FunctionComponent<myProp> = (props) => {
    const { status, toggleNav } = props
    const router = useRouter()

    const handleLogout = async () => {
        fetch("/api/logout", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({})
        }).then((response) => {
            router.push("/login")
        })
    }

    const logout = (
        <motion.li initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 100 }} transition={{ duration: 0.7, delay: 0.08, type: "spring", stiffness: 100 }} className="group cursor-pointer select-none relative" onClick={handleLogout}>Logout
            <div className="transition-all ease-in-out w-0 group-hover:w-5 h-[4px] bg-greenHover absolute mx-auto left-0 right-0 rounded-full bottom-[-6px]"></div>
        </motion.li>
    )

    const login = (
        <Link href="/login">
            <motion.li initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 100 }} transition={{ duration: 0.7, delay: 0.08, type: "spring", stiffness: 100 }} className="group cursor-pointer select-none relative">Login
                <div className="transition-all ease-in-out w-0 group-hover:w-5 h-[4px] bg-greenHover absolute mx-auto left-0 right-0 rounded-full bottom-[-6px]"></div>
            </motion.li>
        </Link>
    )

    return (
        <motion.div initial={{ y: "-100%" }} animate={{ y: "0%" }} exit={{ y: "-100%" }} className="w-full h-20 border-b-2 md:hidden flex justify-center overflow-hidden z-20 absolute bg-greenButton">


            <ul className="flex text-white items-center h-full gap-x-8 font-poppins font-medium select-none text-sm">
                {navList.map((items, i) => {
                    return (

                        <motion.li initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 100 }} transition={{ duration: 0.7, delay: i * 0.04, type: "spring", stiffness: 100 }} className="group cursor-pointer select-none relative" key={i}>{items}
                            <div className="transition-all ease-in-out w-0 group-hover:w-5 h-[4px] bg-greenHover absolute mx-auto left-0 right-0 rounded-full bottom-[-6px]"></div>
                        </motion.li>

                    )
                })}
                {status ? logout : login}
                <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 100 }} transition={{ duration: 0.7, delay: 0.012, type: "spring", stiffness: 100 }}>
                    <VscTriangleUp className="text-white cursor-pointer ml-10" onClick={toggleNav} />
                </motion.div>

            </ul>
        </motion.div>
    );
}

export default MobileNavItems;
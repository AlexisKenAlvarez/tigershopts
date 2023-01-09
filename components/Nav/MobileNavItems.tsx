import { motion } from "framer-motion";
import { useRouter } from 'next/router';
import { navList } from "../../utils/List";

const MobileNavItems = () => {

    
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

    return (
        <motion.div initial={{ y: "-100%" }} animate={{ y: "0%" }} exit={{ y: "-100%" }} className="w-full h-14 border-b-2 md:hidden flex justify-center overflow-hidden z-20 relative">
            <ul className="flex text-greenSteps items-center h-full gap-x-14 font-poppins font-medium select-none">
                {navList.map((items, i) => {
                    return (

                        <motion.li initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 100 }} transition={{ duration: 0.7, delay: i * 0.04, type: "spring", stiffness: 100 }} className="group cursor-pointer select-none relative" key={i}>{items}
                            <div className="transition-all ease-in-out w-0 group-hover:w-5 h-[4px] bg-greenHover absolute mx-auto left-0 right-0 rounded-full bottom-[-6px]"></div>
                        </motion.li>

                    )
                })}
                <motion.li initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 100 }} transition={{ duration: 0.7, delay: 0.16, type: "spring", stiffness: 100 }} className="group cursor-pointer select-none relative" onClick={handleLogout}>Logout
                    <div className="transition-all ease-in-out w-0 group-hover:w-5 h-[4px] bg-greenHover absolute mx-auto left-0 right-0 rounded-full bottom-[-6px]"></div>
                </motion.li>
            </ul>
        </motion.div>
    );
}

export default MobileNavItems;
import { useRouter } from 'next/router';
import { FunctionComponent, useEffect } from 'react';
import { navList } from '../../utils/List';
import { motion } from 'framer-motion'
import Link from 'next/link';

interface myProp {
    status: boolean,
    scrollPosition: number
}

const NavItems: FunctionComponent<myProp> = (props) => {
    const { status, scrollPosition } = props
    const router = useRouter()
    const { asPath } = useRouter()
    const validPath = ['/', '/#products', '/order']

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
        <li className="group cursor-pointer select-none relative" onClick={handleLogout}>Logout
            <div className="transition-all ease-in-out w-0 group-hover:w-5 h-[4px] bg-white absolute mx-auto left-0 right-0 rounded-full bottom-[-6px]"></div>
        </li>
    )

    const login = (
        <Link href="/login">
            <li className="group cursor-pointer select-none relative">Login
                <div className="transition-all ease-in-out w-0 group-hover:w-5 h-[4px] bg-white absolute mx-auto left-0 right-0 rounded-full bottom-[-6px]"></div>
            </li>
        </Link>

    )

    return (
        <motion.ul initial={{ opacity: 0, y: -50 }} animate={{ opacity: 100, y: 0 }} transition={{ duration: 0.7 }} className="flex text-white items-center h-full gap-x-14 font-poppins font-medium select-none z-50 relative">
            {navList.map((items, i) => {
                return (
                    <Link href={items.link} key={i} scroll={false}>
                        <li className="group cursor-pointer select-none relative z-50">{items.label}
                            <div className="transition-all ease-in-out w-0 group-hover:w-5 h-[4px] bg-white absolute mx-auto left-0 right-0 rounded-full bottom-[-6px]"></div>
                        </li>
                    </Link>

                )
            })}

            {status ? logout : login}

        </motion.ul>
    );
}

export default NavItems;
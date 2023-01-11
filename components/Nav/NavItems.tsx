import { useRouter } from 'next/router';
import { FunctionComponent } from 'react';
import { navList } from '../../utils/List';
import Link from 'next/link';

interface myProp {
    status: boolean
}

const NavItems: FunctionComponent<myProp> = (props) => {
    const { status } = props
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
        <ul className="flex text-white items-center h-full gap-x-14 font-poppins font-medium select-none z-50 relative">
            {navList.map((items, i) => {
                return (

                    <li className="group cursor-pointer select-none relative z-50" key={i}>{items}
                        <div className="transition-all ease-in-out w-0 group-hover:w-5 h-[4px] bg-white absolute mx-auto left-0 right-0 rounded-full bottom-[-6px]"></div>
                    </li>
                )
            })}

            {status ? logout : login}

        </ul>
    );
}

export default NavItems;
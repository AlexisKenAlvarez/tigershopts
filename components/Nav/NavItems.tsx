import { useRouter } from 'next/router';
import { navList } from '../../utils/List';

const NavItems = () => {
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
        <ul className="flex text-greenSteps items-center h-full gap-x-14 font-poppins font-medium select-none">
            {navList.map((items, i) => {
                return (

                    <li className="group cursor-pointer select-none relative" key={i}>{items}
                        <div className="transition-all ease-in-out w-0 group-hover:w-5 h-[4px] bg-greenHover absolute mx-auto left-0 right-0 rounded-full bottom-[-6px]"></div>
                    </li>
                )
            })}
            <li className="group cursor-pointer select-none relative" onClick={handleLogout}>Logout
                <div className="transition-all ease-in-out w-0 group-hover:w-5 h-[4px] bg-greenHover absolute mx-auto left-0 right-0 rounded-full bottom-[-6px]"></div>
            </li>
        </ul>
    );
}

export default NavItems;
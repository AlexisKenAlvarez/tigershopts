import Image from "next/image"
import Link from 'next/link';

const AuthNavMobile = (props) => {
    const { onClick, ...inputProps } = props
    return (
        <div className="overflow-hidden lg:hidden">
            <div className="flex justify-between w-[90%] mx-auto mt-6 items-center h-fit">
                <div className="border-[0.5px] border-greenBg h-fit px-7 py-3 mt-[-1rem] ml-2 rounded-lg font-medium text-sm text-greenBg uppercase"
                    onClick={onClick}>
                    {props.text}
                </div>
                <Link href="/">
                    <Image src="/logo.webp" alt="Logo" width='200' height='20' className="w-20" />
                </Link>

            </div>
        </div>
    )
}

export default AuthNavMobile

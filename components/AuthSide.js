import Image from "next/image"
import Link from 'next/link';
import {useRouter} from 'next/router';

const AuthSide = (props) => {
    const router = useRouter()
    const { closed, head1, head2, buttonText, onClick } = props
    const handleHome = () => {

        router.push("/")
    }
    return (
        <div className="bg-greenBg h-full w-[65%] hidden lg:block rounded-3xl relative z-1">

            <Image src="/bgtiger.png" fill alt="BackgroundImage " sizes="(min-width: 20em) 33vw,(min-width: 44em) 100vw" priority={true} className="pointer-events-none" />


                <div className="w-fit h-fit mt-16 mx-auto cursor-pointer" onClick={handleHome}>
                    {closed ? <Image src="/closed.webp" alt="Logo" width='200' height='20' className="w-24 mx-auto" unoptimized={true} /> : <Image src="/logo.webp" alt="Logo" width='200' height='20' className="w-24 mx-auto" unoptimized={true} />}
                </div>

            <h1 className="text-center text-orangeText font-bold text-2xl mt-8 text-shadow-xl">TIGER&apos;S SHOP</h1>
            <h2 className="text-center w-[70%] mx-auto text-xs mt-1 text-white font-bold tracking-wider">
                COLLEGE OF ENGINEERING AND INFORMATION TECHNOLOGY
            </h2>

            <div className="text-white mt-12 text-center">
                <p className="w-[18rem] mx-auto text-lg font-normal tracking-wider">
                    {head1}
                </p>

                <p className="text-sm mt-6 font-thin">
                    {head2}
                </p>

                <div className="rounded-lg cursor-pointer uppercase flex justify-center items-center border-[0.5px] border-white w-fit h-fit mx-auto mt-12 p-3 tracking-wider px-10 select-none font-light hover:bg-white hover:text-greenBg hover:font-bold transition-all ease-in-out duration-200" onClick={onClick}>
                    {buttonText}
                </div>
            </div>



        </div>
    )
}

export default AuthSide

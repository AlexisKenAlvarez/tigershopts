import Image from "next/image"

const AuthSide = (props) => {

    const { head1, head2, buttonText, onClick } = props
    return (
        <div className="bg-greenBg h-full w-[65%] hidden lg:block rounded-3xl relative">
            <Image src="/bgtiger.png" fill alt="BackgroundImage " sizes="(min-width: 20em) 33vw,(min-width: 44em) 100vw" priority={true} className="pointer-events-none" />
            <Image src="/logo.png" alt="Logo" width='200' height='20' className="w-28 mx-auto mt-16" />

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

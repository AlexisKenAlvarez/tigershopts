import { NextPage } from "next"
import Image from "next/image"
import Link from "next/link";
import LongButton from "../components/LongButton";


const Custom404: NextPage = () => {
    return (
        <>
            <div className="w-full flex justify-center items-center font-inter">
                <div className="h-auto w-fit flex flex-col justify-center items-center px-7 mt-28">
                    <Image src="/404.webp" alt="Logo" width='260' height='50' className="w-[15rem] ml-11 mx-auto mt-16" unoptimized={true} />

                    <div className="flex mx-auto">
                        <p className="mt-10 text-greenButton text-7xl font-black text-center font-poppins tracking-verytight" style={{ WebkitTextStroke: "2px white" }}>4</p>
                        <p className="mt-10 text-greenButton text-7xl font-black text-center font-poppins tracking-verytight" style={{ WebkitTextStroke: "2px white" }}>0</p>
                        <p className="mt-10 text-greenButton text-7xl font-black text-center font-poppins tracking-verytight" style={{ WebkitTextStroke: "2px white" }}>4</p>
                    </div>


                    <p className="text-center text-sm mt-2 max-w-[400px]">The page that you’re looking for does not exist.</p>
                    <div className="w-64">
                        <Link href="/login">
                            <LongButton name="Go back" />
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )

}

export default Custom404;
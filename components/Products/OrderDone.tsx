import { FunctionComponent, useEffect, useState } from "react";
import Image from 'next/image';
import Link from 'next/link';

interface myProp {
    username: string,
    product: string
}

const OrderDone: FunctionComponent<myProp> = (props) => {
    const { username, product } = props
    let date = new Date()
    const [currentDate, setDate] = useState('')

    useEffect(() => {
        var dobArr = date.toDateString().split(' ');
        var dobFormat = dobArr[1] + ' ' + dobArr[2] + ', ' + dobArr[3];
        setDate(dobFormat)
    }, [])

    return (
        <div className="w-full h-screen bg-greenBg flex items-center justify-center">
            <div className="w-[90%] max-w-[450px] h-[65%] mx-auto bg-white relative px-3">
                <Image src="/logo.webp" alt="Logo" width='200' height='20' className="w-24 mx-auto mt-[-3rem] left-0 right-0 absolute" unoptimized={true} />
                <h1 className="text-center mt-20 font-raleway font-bold text-xl text-greenButton w-full max-w-[24rem] mx-auto">Order has been placed.</h1>
                <p className="text-center mt-2"><span className="font-semibold">To:</span> {username}</p>
                <div className="bg-[#fbd580] w-[90%] h-[5rem] mx-auto rounded-lg mt-4 shadow-md p-3 text-center flex items-center justify-center max-w-[17rem]">
                    <p className="break-words max-w-[15rem] font-bold text-green-800">{product}</p>
                </div>
                <p className="font-poppins text-center font-semibold text-sm opacity-80 mt-3">{currentDate}</p>
                <p className="opacity-80 text-sm mt-2 max-w-[16rem] mx-auto text-center"> The organization will contact you for further information.</p>

                <Link href="/">
                    <div className='flex rounded-lg items-center justify-center p-[1px] w-32 mx-auto mt-7'>
                        <div className="font-inter bg-[#D19713] text-white p-3 rounded-lg text-sm font-medium text-center hover:bg-heroOrange cursor-pointer select-none w-full">
                            <p className="tracking-wider">
                                Return
                            </p>
                        </div>
                    </div>
                </Link>

            </div>
        </div>
    );
}

export default OrderDone;
import Image from 'next/image';
import React, { useState } from 'react';
import LongButton from '../components/LongButton';
import Link from 'next/link';

const Forgotpassword = () => {
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')

    const input = [
        {
            id: '1',
            name: "email",
            type: "text",
        }
    ]


    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    function validateEmail(email: string) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(email)) {
            //Email valid. Procees to test if it's from the right domain (Second argument is to check that the string ENDS with this domain, and that it doesn't just contain it)
            if (email.indexOf("@cvsu.edu.ph", email.length - "@cvsu.edu.ph".length) !== -1) {
                return true
            } else {
                return false
            }
        } else {
            return false
        }
    }

    const handleSubmit = () => {
        if (validateEmail(email)) {

        } else {
            setError("Invalid Email")
        }
    }

    return (
        <>
            <div className="main-bg font-inter h-screen flex justify-center items-center">
                <div className="bg-orangeBg h-screen w-full fixed top-0 z-[-2]">
                    <Image src="/cvsu.png" alt="CvSU" fill></Image>
                </div>

                <div className="bg-white h-screen w-full fixed top-0 z-[-1] lg:hidden"></div>

                <div className="bg-white h-screen w-full p-0 mt-0 lg:h-[60%] lg:min-h-[450px] lg:max-h-[450px] lg:w-[37%] lg:max-w-[800px] mx-auto lg:rounded-3xl relative shadow-customBorder z-2">
                    <Image src="/logo.webp" alt="Logo" width='200' height='20' className="w-24 mx-auto mt-10 lg:mt-[-2.5rem]" unoptimized={true} />
                    <p className='text-greenSteps text-center max-w-[17rem] mx-auto mt-6 font-medium text-sm'>Enter the information needed below to reset your password.</p>

                    <div className='max-w-[350px] w-[75%] mx-auto'>
                        <h1 className='text-center text-greenSteps font-medium text-xl mt-10 mb-6'>Enter your CvSU email:</h1>
                        {input.map(val => {
                            return (
                                <div key={val.id}>
                                    <p className='text-xs text-center'>Invalid CvSU Email</p>
                                    <input {...val} className="bg-inputBg w-full h-12 mx-auto block mt-2 outline-0 p-2 px-4 text-sm text-slate-700 rounded-md" autoComplete="off" onChange={onChange} value={email}></input>
                                </div>

                            )
                        })}

                        <LongButton name="Send link" onClick={handleSubmit}/>

                        <div className='w-fit mx-auto'>
                            <Link href="/login" className='w-fit'>
                                <p className='mt-5 font-bold text-greenButton text-center'>Back to Login</p>
                            </Link>
                        </div>

                    </div>

                </div>
            </div>
        </>
    );
}

export default Forgotpassword;
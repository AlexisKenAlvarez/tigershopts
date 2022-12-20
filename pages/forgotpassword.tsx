import Image from 'next/image';
import React, { useState, useEffect } from 'react';
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

    const [debounce, setDebounce] = useState(false)
    const [sent, setSent] = useState(false)
    const handleSubmit = () => {
        if (!debounce) {
            setDebounce(true)
            if (validateEmail(email)) {
                setError('')
                fetch("/api/sendreset", {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email: email })
                }).then((response) => {
                    return response.json()
                }).then((response) => {
                    if (response.success) {
                        setDebounce(true)
                        setSent(true)
                        sessionStorage.setItem("password", email)
                    } else {
                        setDebounce(false)

                    }
                })
            } else {
                setError("Invalid Email")
                setDebounce(false)
            }
        }
    }

    useEffect(() => {
        let data = sessionStorage.getItem("password");
        
        if (data) {
            console.log("There is data");
            setSent(true)
        }
    }, [])
    

    const backButton = (
        <div className='w-fit mx-auto'>
            <Link href="/login" className='w-fit'>
                <p className='mt-5 font-bold text-greenButton text-center text-[15px] hover:text-[16px] transition-all ease-in-out'>Back to Login</p>
            </Link>
        </div>
    )

    const notSent = (
        <>
            <p className='text-greenSteps text-center max-w-[17rem] mx-auto mt-6 font-medium text-sm'>Enter the information needed below to reset your password.</p>

            <div className='max-w-[350px] w-[75%] mx-auto'>
                {input.map(val => {
                    return (
                        <div key={val.id}>
                            <h1 className='text-center text-greenSteps font-medium text-xl mt-10 mb-6'>Enter your CvSU email:</h1>

                            {error === '' ? null : <p className='text-xs text-center text-redError'>Invalid CvSU Email</p>}

                            <input {...val} className="bg-inputBg w-full h-12 mx-auto block mt-2 outline-0 p-2 px-4 text-sm text-slate-700 rounded-md" autoComplete="off" onChange={onChange} value={email} style={error === '' ? {} : { backgroundColor: '#FCE3E4' }}></input>
                        </div>

                    )
                })}

                <LongButton name={debounce ? "Processing..." : "Confirm"} onClick={handleSubmit} />

                {backButton}

            </div>
        </>
    )

    return (
        <>
            <div className="main-bg font-inter h-screen flex justify-center items-center">
                <div className="bg-orangeBg h-screen w-full fixed top-0 z-[-2]">
                    <Image src="/cvsu.png" alt="CvSU" fill></Image>
                </div>

                <div className="bg-white h-screen w-full fixed top-0 z-[-1] lg:hidden"></div>

                <div className="bg-white h-screen w-full p-0 mt-0 lg:h-[60%] lg:min-h-[450px] lg:max-h-[470px] lg:w-[37%] lg:max-w-[800px] mx-auto lg:rounded-3xl relative shadow-customBorder z-2">
                    <Image src="/logo.webp" alt="Logo" width='200' height='20' className="w-24 mx-auto mt-10 lg:mt-[-2.5rem]" unoptimized={true} />

                    {sent ? <>
                        <h1 className='text-xl text-center font-bold mt-14 text-greenButton'>An email has been sent.</h1>
                        <p className='text-greenSteps text-center max-w-[17rem] mx-auto mt-6 font-medium text-sm'>Please check your mailbox for the password reset link.</p>
                        {backButton}

                    </> : notSent}

                </div>
            </div>
        </>
    );
}

export default Forgotpassword;
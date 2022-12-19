import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import LongButton from "../LongButton"
import { useEffect, useState } from 'react'

const LoginRetry = ({ email }) => {

    const secondary = {
        start: {
            opacity: 1,
            transition: {
                delay: 0.6,
                ease: "linear",
                duration: 0.5
            },
        },
        exit: {
            opacity: 0,
            pointerEvents: "none",
            transition: {
                delay: 0.6,
                ease: "linear",
                duration: 0.5
            },
        },


    }

    const primary = {
        start: {
            opacity: 1,
            width: "100%",
            pointerEvents: "auto",
            transition: {
                ease: "linear",
                duration: 0.5
            },
        },
        exit: {
            opacity: 0,
            pointerEvents: "none",
            width: "0%",
            transition: {
                ease: "linear",
            },
        },
    }
    useEffect(() => {
        const email = sessionStorage.getItem('sent');

        if (email) {
            setDebounce(true)
            setMessage('Email already sent')
        }
    }, [])


    const [message, setMessage] = useState('Send new link')
    const [debounce, setDebounce] = useState(false)
    const handleNewToken = () => {
        if (!debounce) {
            setDebounce(true)
            fetch("/api/newEmail", {
                method: 'post',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                })
            }).then((response) => {
                return response.json()
            }).then((response) => {
                if (response.success) {
                    setMessage('Email sent')
                    sessionStorage.setItem('sent', 'email')
                } else {
                    setMessage('Failed to send')
                    setDebounce(false)
                }
            })
        }

    }


    return (
        <>
            <motion.div variants={secondary} initial="exit" animate="start" exit="exit" className="bg-[#1B783A] rounded-3xl w-full h-full z-3 absolute right-[-0.5rem] bottom-[-0.5rem] transition-all ease-in-out delay-[0.6s] duration-[0.2s] pointer-events-none hidden lg:block"></motion.div>

            <motion.div variants={primary} initial="exit" animate="start" exit="exit" className="bg-white rounded-3xl w-0 h-full z-3 absolute top-0 right-0 transition-all ease-in-out duration-[0.5s] px-7 pointer-events-none">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 1, duration: 0.5 } }} className="flex flex-col justify-center items-center h-[85%]">
                    <Image src="/tiger.webp" width="200" height="20" alt="Tiger" />
                    <h1 className="text-center font-extrabold mt-10 text-xl text-greenBg">Check your inbox</h1>
                    <p className="max-w-[400px] text-center mx-auto mt-2 text-sm">We've already sent you an email verification link. Please click the link to verify your account.</p>

                    <div className="w-64">

                        <LongButton name={message} onClick={handleNewToken} />
                        <p onClick={() => {window.location.reload(false);}} className="text-center mt-4 font-bold cursor-pointer">Back to Login</p>
                    </div>
                </motion.div>

            </motion.div>
        </>
    )
}

export default LoginRetry
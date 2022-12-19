import Image from "next/image"
import FormInput from "../components/FormInput"
import React, { useState, useEffect } from "react"
import LongButton from "../components/LongButton"
import { useRouter } from "next/router"
import AuthNavMobile from "../components/AuthNavMobile"
import AuthSide from "../components/AuthSide"
import FormInputLogin from "../components/FormInputLogin"
import { verify } from "jsonwebtoken"
import { GetServerSideProps, NextPage } from "next"
import { Inputs, InputVal, LoginValues } from "../types"
import { AnimatePresence } from "framer-motion"
import LoginRetry from '../components/register/LoginRetry'
import Link from "next/link"

export const getServerSideProps: GetServerSideProps = async (context) => {

    const secret = process.env.NEXT_PUBLIC_SECRET || ''
    const jwt = context.req.cookies['authToken'] || ''

    const url = context.req.url || ''

    const inputs = [
        {
            id: 1,
            name: "email",
            label: "email",
            type: "text",
        },
        {
            id: 2,
            name: "password",
            label: "password",
            type: "password"
        }
    ]

    if (url.includes('/login')) {

        try {
            verify(jwt, secret);
            return {
                redirect: {
                    destination: '/',
                    permanent: false
                }
            }

        } catch (error) {
            console.log(error)
            return {
                props: {
                    inputs,
                }
            }
        }
    } else {
        return {
            props: {
                inputs,
            }
        }
    }

}

export const Login: NextPage<Inputs> = (props) => {
    const [values, setValues] = useState<LoginValues>({
        email: '',
        password: ''
    })

    const [valuesError, setError] = useState({
        email: '',
        password: ''
    })

    const router = useRouter()

    const navigateSignup = () => {
        router.push("/signup")
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues(current => ({ ...current, [e.target.name]: e.target.value }))
    }

    const [debounce, setDebounce] = useState(false)
    const [awaiting, setAwaiting] = useState(false)

    const handleLogin = async () => {
        if (!debounce) {
            setDebounce(true)
            fetch("/api/login", {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email: values.email,
                    password: values.password
                })

            }).then((response) => {
                return response.json()
            }).then((response) => {
                if (response.awaiting) {
                    setAwaiting(true)

                }
                if (!response.loggedIn) {
                    if (response.name === 'email') {
                        setError(current => ({ ...current, [response.name]: response.status }))
                        setDebounce(false)

                    } else if (response.name === 'password') {
                        setError(current => ({ ...current, email: '' }))
                        setError(current => ({ ...current, [response.name]: response.status }))
                        setDebounce(false)
                    }
                    console.log(response);
                    setDebounce(false)
                    console.log("Not loggedin");
                } else {
                    setError(current => ({ ...current, password: '' }))
                    router.push("/")
                    console.log("logged in")
                    setDebounce(false)
                }
            })
        }

    }

    const [closed, setClosed] = useState(false)

    const handleFocus = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === 'password') {
            setClosed(true)
        }
    }

    const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === 'password') {
            setClosed(false)
        }
    }

    return (
        <>
            <div className="main-bg font-inter h-screen flex justify-center items-center">
                <div className="bg-orangeBg h-screen w-full fixed top-0 z-[-2]">
                    <Image src="/cvsu.png" alt="CvSU" fill></Image>
                </div>

                <div className="bg-white h-screen w-full fixed top-0 z-[-1] lg:hidden"></div>

                <div className="bg-white h-screen w-full p-0 mt-0 lg:h-[90%] lg:min-h-[550px] lg:max-h-[650px] lg:w-[90%] lg:max-w-[1000px] lg:flex mx-auto lg:rounded-3xl relative">
                    <AuthNavMobile text="signup" onClick={navigateSignup} />

                    <AuthSide head1="Log in your account to start shopping with us!" head2={<>No account yet? Click <b>sign up</b> below.</>} buttonText="sign up" onClick={navigateSignup} closed={closed}/>

                    <AnimatePresence>
                        {awaiting ? <LoginRetry email={values.email} /> : null}
                    </AnimatePresence>

                    <div className="w-full">


                        <div className="w-[80%] mx-auto max-w-[350px] font-inter mt-6">
                            <h1 className="uppercase text-2xl font-bold italic w-52 text-center mx-auto mt-16 text-greenBg text-shadow-md mb-10 lg:text-left lg:mx-0 ">Welcome back, Tigers!</h1>
                            {props.inputs.map((value: InputVal) => {
                                return (
                                    <FormInputLogin key={value.id} {...value} value={values[value.name as keyof LoginValues]} onChange={onChange} error={valuesError} onFocus={handleFocus} onBlur={handleBlur}/>
                                )
                            })}

                            <Link href="/forgotpassword">
                                <p className="mt-4 ml-1 cursor-pointer mb-10">Forgot your password?</p>
                            </Link>

                            <LongButton name={debounce ? "Processing..." : "Login"} onClick={handleLogin} />

                        </div>
                    </div>


                </div>
            </div>
        </>
    )
}

export default Login
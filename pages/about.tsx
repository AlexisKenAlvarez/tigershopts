import { motion } from "framer-motion";
import Image from "next/image";
import Nav from "../components/Nav/Nav";
import { verify } from "jsonwebtoken";
import { GetServerSideProps, NextPage } from "next";
import jwt_decode from "jwt-decode";
import Head from 'next/head';
import clientPromise from "../lib/mongodb";
import { FaLongArrowAltDown } from 'react-icons/fa'

interface decode {
    exp: number,
    username: string,
    iat: number,
    email: string
}

interface myProp {
    status: boolean
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const secret = process.env.NEXT_PUBLIC_SECRET || ''
    const jwt = context.req.cookies['authToken'] || ''

    const url = context.req.url || ''
    const admins = ["csso", "ceit", "elits", "pasoa", "psabe", "uapsa", "coess", "etso", "iecep", "iiee", "pice", "piie", "sites", "jpcs", "class"]

    const client = await clientPromise;
    const db = client.db("?retryWrites=true&w=majority");

    if (url.includes('/')) {
        try {
            verify(jwt, secret);

            let token = jwt;
            let decoded: decode = jwt_decode(token);
            const username = decoded.username
            const email = decoded.email

            const user = await db.collection("Users").findOne({ email: email })

            if (admins.includes(username)) {

                return {
                    redirect: {
                        destination: '/admin',
                        permanent: false
                    }
                }

            } else {

                return {
                    props: {
                        status: true,
                    }
                }
            }

        } catch (error) {
            console.log("Invalid JWT");
            return {
                props: {
                    status: false,
                }
            }
        }
    } else {
        return {
            props: {
                status: false
            }
        }
    }
}

const About: NextPage<myProp> = (props) => {
    const { status } = props

    return (
        <section className="w-full h-auto z-10 bg-cover bg-white">
            <Nav status={status} />
            <div className="absolute w-full h-[36rem] clip-path-about bg-green-600 md:hidden">

            </div>
            <div className="absolute w-full h-[34rem] clip-path-about bg-black md:hidden">
                <Image src="/about/ceit.webp" alt="CSSO" width="1000" height="1000" className="w-full h-full object-cover absolute top-[-21rem] brightness-50"></Image>
            </div>

            <div className="w-full max-w-[1700px] xl:mx-0 md:mx-[0rem] h-[100vh] flex md:flex-row border-2 flex-col">

                <div className="h-full w-full z-10 px-10 relative">
                    <div className="w-fit h-fit mx-auto relative">
                        <h1 className="mt-[10rem] text-center text-[#023815] text-4xl font-black font-raleway md:mt-[8rem] lg:text-5xl xl:text-7xl">About us</h1>
                        <Image alt="underline" src="/about/underline.svg" width="200" height="200" className="w-[9rem] mx-auto lg:w-[10rem] xl:w-[15rem]"></Image>
                    </div>
                    <div className="max-w-[28rem] mx-auto text-center text-[#272727] text-sm md:text-md lg:text-lg lg:max-w-[33rem] xl:max-w-[36rem] xl:text-xl">
                        <p className="mt-7 lg:mt-12"><span className="text-[#F6AB00] font-semibold">Tiger's Shop</span> aims to act as a connector between student organizations and those looking to buy their goods. </p>
                        <p className="mt-10 lg:mt-14"><span className="text-[#F6AB00] font-semibold">Tiger's Shop’s</span> objective is to create an online selling platform for student organizations affiliated with the College of Engineering and Information Technology (CEIT). </p>
                        <p className="mt-10 lg:mt-14">All currently available merchandise will be compiled per organization, along with their descriptions.</p>
                    </div>

                    <motion.div initial={{y: 0}} animate={{y: [5, -5, 5]}} transition={{repeat: Infinity, duration: 1.5}} className="w-fit mx-auto flex items-center justify-center absolute left-0 right-0 bottom-12">
                        <p className="font-bold text-[#023815] lg:text-2xl">Know more about our team</p>
                        <FaLongArrowAltDown className="text-[#F6AB00] text-2xl"/>
                    </motion.div>
                </div>

                <motion.div initial={{ x: 300, opacity: 0 }} animate={{ x: 0, opacity: 100 }} transition={{ duration: 1 }} className="md:items-center justify-center w-full z-0 md:self-center h-full md:mt-0 md:flex hidden">
                    <div className="2xl:w-[45vw] xl:w-[40vw] lg:w-[32rem] md:w-[23.5rem] w-[13rem] md:mt-0 h-full absolute overflow-hidden right-0 bg ">
                        <div className="w-full h-full hidden md:block">
                            <Image src="/about/csso.webp" alt="CSSO" width="1300" height="1300" className="z-[-1] w-full h-full object-cover brightness-75"></Image>
                        </div>


                    </div>
                </motion.div>

            </div>
            <div className="w-full h-screen bg-black">

            </div>
        </section>
    );
}

export default About;
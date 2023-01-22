import { motion } from "framer-motion";
import Image from "next/image";
import Nav from "../components/Nav/Nav";
import { verify } from "jsonwebtoken";
import { GetServerSideProps, NextPage } from "next";
import jwt_decode from "jwt-decode";
import Head from 'next/head';
import clientPromise from "../lib/mongodb";
import { FaLongArrowAltDown } from 'react-icons/fa'
import Footer from "../components/Footer/Footer";
import { useInView } from 'react-intersection-observer';
import { members } from "../utils/List";
import ProfileTemplate from "../components/About/ProfileTemplate";
import { use } from "react";


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
    const [prodRef1, prodView1] = useInView({ triggerOnce: true, threshold: 0.5 })


    const variants = {
        initial1: {
            translateX: "-40%"
        },

        initial2: {
            translateX: "40%"
        },

        animate1: {
            translateX: "0%",
            transition: {
                duration: 0.6,
                delay: 0.3
            }
        },

        animate2: {
            translateX: "0%",
            transition: {
                duration: 0.6,
                delay: 0.3
            }
        },

    }

    return (
        <section className="w-full h-auto z-10 bg-cover bg-white">
            <Nav status={status} />
            <div className="absolute w-full h-[36rem] clip-path-about bg-green-600 md:hidden">

            </div>
            <div className="absolute w-full h-[34rem] clip-path-about bg-black md:hidden">
                <Image src="/about/ceit.webp" alt="CSSO" width="1000" height="1000" className="w-full h-full object-cover absolute top-[-21rem] brightness-50"></Image>
            </div>

            <div className="w-full max-w-[1700px] xl:mx-0 md:mx-[0rem] h-[100vh] flex md:flex-row flex-col">

                <div className="h-full w-full z-10 px-10 relative">
                    <motion.div initial={{x: -100, opacity: 0}} animate={{x: 0, opacity: 100}} transition={{duration: 0.7}} className="w-fit h-fit mx-auto relative">
                        <h1 className="mt-[10rem] text-center text-[#023815] text-4xl font-black font-raleway md:mt-[8rem] lg:text-5xl xl:text-7xl">About us</h1>
                        <Image alt="underline" src="/about/underline.svg" width="200" height="200" className="w-[9rem] mx-auto lg:w-[10rem] xl:w-[15rem]"></Image>
                    </motion.div>
                    <div className="max-w-[28rem] mx-auto text-center text-[#272727] text-sm md:text-md lg:text-lg lg:max-w-[33rem] xl:max-w-[36rem] xl:text-xl">
                        <motion.p initial={{x: -100, opacity: 0}} animate={{x: 0, opacity: 100}} transition={{duration: 0.7, delay: 0.1}} className="mt-7 lg:mt-12"><span className="text-[#F6AB00] font-semibold">Tiger&apos;s Shop</span> aims to act as a connector between student organizations and those looking to buy their goods. </motion.p>
                        <motion.p initial={{x: -100, opacity: 0}} animate={{x: 0, opacity: 100}} transition={{duration: 0.7, delay: 0.2}} className="mt-10 lg:mt-14"><span className="text-[#F6AB00] font-semibold">Tiger&apos;s Shop&apos;s</span> objective is to create an online selling platform for student organizations affiliated with the College of Engineering and Information Technology (CEIT). </motion.p>
                        <motion.p initial={{x: -100, opacity: 0}} animate={{x: 0, opacity: 100}} transition={{duration: 0.7, delay: 0.3}} className="mt-10 lg:mt-14">All currently available merchandise will be compiled per organization, along with their descriptions.</motion.p>
                    </div>

                    <motion.div initial={{ y: 0 }} animate={{ y: [5, -5, 5] }} transition={{ repeat: Infinity, duration: 1.5 }} className="w-fit mx-auto flex items-center justify-center absolute left-0 right-0 bottom-12">
                        <p className="font-bold text-[#023815] lg:text-2xl">Know more about our team</p>
                        <FaLongArrowAltDown className="text-[#F6AB00] text-2xl" />
                    </motion.div>
                </div>

                <div className="md:items-center justify-center w-full z-0 h-full md:mt-0 md:flex hidden">
                    <div className="2xl:w-[45vw] xl:w-[40vw] lg:w-[32rem] md:w-[23.5rem] w-[13rem] md:mt-0 h-full absolute overflow-hidden right-0 bg ">
                        <motion.div initial={{ x: 100, opacity: 0 }} animate={{ x:0, opacity: 100 }} transition={{ duration: 1 }}  className="w-full h-full hidden md:block">
                            <Image src="/about/csso.webp" alt="CSSO" width="1300" height="1300" className="z-[-1] w-full h-full object-cover brightness-75"></Image>
                        </motion.div>


                    </div>
                </div>

            </div>
            <div className="w-full h-fit bg-[#117031] border-b-8 border-b-[#0f7a33] pb-20">
                <div className='w-full h-[20rem] lg:h-[23rem] bg-[#117031] flex items-center justify-center relative border-t-8 border-t-[#0f7a33] overflow-hidden'>
                    <motion.h2 variants={variants} initial="initial1" animate={prodView1 ? "animate1" : ""} className='absolute left-[-8.5rem] top-4 text-6xl font-raleway font-black text-white opacity-20 md:text-8xl 2xl:text-[120px]'>MEMBERS</motion.h2>
                    <motion.h2 variants={variants} initial="initial2" animate={prodView1 ? "animate2" : ""} className='absolute right-[-8.5rem] bottom-4 text-6xl font-raleway font-black text-white opacity-20 md:text-8xl  2xl:text-[120px]'>MEMBERS</motion.h2>
                    <div className='w-fit h-fit text-center font-raleway relative'>
                        <div className='w-fit relative hover:scale-150 hover:-rotate-12 transition-all ease-in-out duration-300 peer cursor-pointer select-none group'>
                            <h1 className="text-white text-5xl font-extrabold lg:text-7xl 2xl:text-[100px] " ref={prodRef1}>TIGERSHOP?</h1>
                        </div>

                        <h3 className='text-[#F6AB00] font-bold lg:text-2xl peer-hover:scale-0 absolute mx-auto left-0 right-0 top-[-1.7rem] md:top-[-2rem] transition-all ease-in-out duration-300'>Who&apos;s behind</h3>
                    </div>
                </div>

                <div className="flex w-fit mx-auto flex-col md:flex-row gap-y-10 mt-6 md:gap-x-4 lg:gap-x-10 xl:mt-10 2xl:gap-x-20">
                    {members.map((user, i) => {
                        return (
                            <ProfileTemplate image={user.image} name={user.name} pos={user.pos} facebook={user.facebook} github={user.github} instagram={user.instagram} key={i} />
                        )
                    })}
                </div>
            </div>
            <Footer />
        </section>
    );
}

export default About;
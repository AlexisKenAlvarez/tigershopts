import Link from "next/link";
import { verify } from "jsonwebtoken";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { Status } from "../types";
import jwt_decode from "jwt-decode";
import { PrismaClient } from '@prisma/client'
import Nav from "../components/Nav/Nav";
import Head from 'next/head';
import ShortButton from "../components/ShortButton";
import Image from 'next/image';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
import { motion } from "framer-motion";
import { useEffect } from "react";

interface decode {
	exp: number,
	username: string,
	iat: number
}

const prisma = new PrismaClient()

export const getServerSideProps: GetServerSideProps = async (context) => {
	const secret = process.env.NEXT_PUBLIC_SECRET || ''
	const jwt = context.req.cookies['authToken'] || ''

	const url = context.req.url || ''
	const admins = ['csso']

	if (url.includes('/')) {
		try {
			verify(jwt, secret);

			var token = jwt;
			var decoded: decode = jwt_decode(token);
			var username = decoded.username

			if (admins.includes(username)) {
				const products = await prisma.products.findMany({
					where: {
						org: username
					}
				})

				return {
					redirect: {
						destination: '/admin',
						permanent: false
					}
				}

			} else {

				return {
					props: {
						status: true
					}
				}
			}

		} catch (error) {
			console.log(error)
			return {
				props: {
					status: false
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

export const Home: NextPage<Status> = (props) => {
	const { status } = props
	const router = useRouter()

	useEffect(() => {
		console.log(status);
	}, [])
	

	return (
		<>
			<Head>
				<title>Tigershop</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" key="hero" />
			</Head>
			<Nav status={status}/>
			<section className="w-full h-auto flex justify-center">
				<div className="w-full max-w-[1400px] md:mx-[8rem] mx-[2rem] h-[85vh] flex flex-col md: md:flex-row">
					<div className="flex items-center h-full w-full justify-center">
						<div className="">

							<motion.h1 initial={{x: -300, opacity: 0}} animate={{x: 0, opacity: 100}} transition={{duration: 0.7}} className="text-greenSteps w-full xl:text-6xl font-[800] uppercase font-raleway md:text-5xl md:w-[20rem] text-center md:text-left text-4xl mt-10 md:mt-0">Welcome<span className="text-heroOrange font-raleway"> Tigers</span></motion.h1>
							<motion.p  initial={{x: -300, opacity: 0}} animate={{x: 0, opacity: 100}} transition={{duration: 0.7, delay: 0.1}} className="max-w-[23rem] font-poppins text-greenBg mt-8 md:ml-2 ml-0 text-sm lg:text-md md:text-left text-center">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</motion.p>

							<motion.div initial={{x: -300, opacity: 0}} animate={{x: 0, opacity: 100}} transition={{duration: 0.7, delay: 0.2}}  className={`md:flex md:ml-2 mt-8 rounded-lg hidden items-center justify-center p-[1px] bg-greenButton hover:bg-white w-40 mx-auto`}>
								<div className="font-inter bg-greenButton text-white p-3 rounded-lg text-sm font-medium text-center hover:bg-greenHover cursor-pointer select-none w-full">
									<p className="tracking-wider">
										View products
									</p>
								</div>
							</motion.div >

						</div>
					</div>

					<motion.div initial={{x: 300, opacity: 0}} animate={{x: 0, opacity: 100}} transition={{duration: 0.7}} className="md:items-center justify-center w-full h-full flex">
						<div className="xl:w-[33rem] lg:w-[27rem]  md:w-[20rem] w-[15rem] mt-3 md:mt-0">
							<Image src="/hero/phonetiger.webp" alt="Phone" height="400" width="400" className="w-full h-auto" />

							<div className="items-center mt-8 justify-center flex md:hidden">
								<p className="text-center text-greenSteps font-bold">View products</p>
								<MdOutlineKeyboardArrowDown className="ml-2 text-2xl"/>
							</div>

						</div>
					</motion.div>
				</div>
			</section>
		</>

	)
}

export default Home

import { verify } from "jsonwebtoken";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { Status } from "../types";
import jwt_decode from "jwt-decode";
import { PrismaClient } from '@prisma/client'
import Nav from "../components/Nav/Nav";
import Head from 'next/head';
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Hero from "../components/Hero/Hero";
import Coming from "../components/Coming/Coming";
import { IoMdArrowDropup } from 'react-icons/io'


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
	const [showHero, setHero] = useState(false)

	useEffect(() => {
		console.log(status);
	}, [])


	return (
		<>
			<Head>
				<title>Tigershop</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" key="hero" />
			</Head>

			<AnimatePresence>
				<Nav status={status} key="NAV" />
				<Hero key="HERO" />
				<Coming key="COMING" />
			</AnimatePresence>

			<section className="h-fit pb-40 w-full bg-[#1D5B33] relative bg-blend-overlay" >
				<div className="h-fit w-[85%] max-w-[1600px] mx-auto relative">
					<div className="absolute md:mt-[-2.5rem] mt-[-4.5rem] md:text-7xl text-4xl mx-auto left-0 right-0 w-fit md:mx-0">
						<h1 className="font-raleway font-[900] tracking-wide uppercase text-[#40C96D] z-10 absolute md:bottom-[-5px] mmd:left-[-5px] bottom-[-3px] left-[-3px]">Products</h1>

						<h1 className="font-raleway font-[900] tracking-wide uppercase text-white relative z-10">Products</h1>
					</div>

					<div className="absolute right-0 top-0 cursor-pointer">
						<div className="md:w-[12rem] w-[9rem] h-[3.5rem] bg-[#003C14] border-b-4 border-b-[#40C96D] flex justify-around items-center text-white">
							<p className="font-bold">CSSO</p>
							<IoMdArrowDropup className="text-3xl rotate-180" />
						</div>
					</div>

					<div className="w-full h-fit overflow-hidden">
						<div className="md:ml-40 mt-40">
							<div className="w-[20rem] h-[15rem] relative overflow-hidden border-b-4 border-b-lightg">
								<img src="https://res.cloudinary.com/dnfsr6bms/image/upload/v1673364245/csso/bspyknsrxlezbr4ay9bh.webp" alt="Products" className="object-cover w-full h-full absolute bottom-0 z-0"></img>
								<div className="shadow-customInset z-10 absolute w-full h-full"></div>
								<div className="absolute flex justify-between w-[90%] items-center mx-auto left-0 right-0 bottom-3 z-10">
									<h1 className="text-white font-bold font-poppins text-xl">ORG SHIRT</h1>
									<h3 className="text-[#BDBDBD] font-bold font-poppins text-sm" >Stocks: Many</h3>
								</div>
							</div>


						</div>
					</div>

				</div>


			</section>

		</>
	)
}

export default Home


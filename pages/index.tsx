
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
import Image from 'next/image';
import overlay from '../public/overlay.jpg'

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
		setTimeout(() => {
			setHero(true)
		}, 700);
	}, [])


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
				{showHero ?
					<>
						<Nav status={status} key="NAV"/>
					</> : null}
			</AnimatePresence>

			<AnimatePresence>
				{showHero ?
					<>
						<Hero key="HERO" />
					</> : null}
			</AnimatePresence>
			<section className="h-[80vh] w-full bg-greenSteps relative bg-blend-overlay overflow-hidden" style={{backgroundImage: `url(${overlay.src})`}}>
				<div className="h-fit w-[85%] max-w-[1600px] mx-auto">
					<div className="relative font-poppins mx-auto w-fit text-center mt-20 h-fit">
						<p className="text-orangeBg font-medium">Be ready</p>
						<h1 className="text-white text-4xl font-bold mt-2 z-10 relative">Coming this week</h1>
						<Image src="/triangle.svg" alt="triangle" height="100" width="100" className="absolute bottom-[-2rem] left-[-2rem]"></Image>
					</div>

					<div className=" w-[80%] h-[10rem]">
						<div className="bg-white w-full h-full rounded-xl"></div>
					</div>
				</div>
			</section>

		</>
	)
}

export default Home


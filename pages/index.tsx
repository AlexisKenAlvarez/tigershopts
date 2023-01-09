import Link from "next/link";
import { verify } from "jsonwebtoken";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { Status } from "../types";

import jwt_decode from "jwt-decode";
import { PrismaClient } from '@prisma/client'
import Nav from "../components/Nav/Nav";

import Head from 'next/head';



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
	const router = useRouter()

	return (
		<>
			<Head>
				<title>Tigershop</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" key="hero" />
			</Head>
			<Nav />
			<section className="w-full h-auto flex justify-center">
				<div className="w-full max-w-[1600px] mx-[5rem] border-2 ">
					<div className="font-raleway">
						<h1 className="text-greenSteps w-[18rem] border-2 text-6xl font-[900]">Welcome<span className="text-heroOrange font-raleway"> Tigers</span></h1>
					</div>
					<div className="">

					</div>
				</div>
			</section>
		</>

	)
}

export default Home
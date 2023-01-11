
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
import Products from "../components/Products/Products";
import clientPromise from "../lib/mongodb";

interface decode {
	exp: number,
	username: string,
	iat: number,
}

const prisma = new PrismaClient()

export const getServerSideProps: GetServerSideProps = async (context) => {
	const secret = process.env.NEXT_PUBLIC_SECRET || ''
	const jwt = context.req.cookies['authToken'] || ''

	const url = context.req.url || ''
	const admins = ['csso']

	const client = await clientPromise;
	const db = client.db("?retryWrites=true&w=majority");

	const products = await db.collection("Products").find({}).toArray()

	const data = products

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
						status: true,
						data: JSON.parse(JSON.stringify(data))
					}
				}
			}

		} catch (error) {
			console.log(error)
			return {
				props: {
					status: false,
					data: JSON.parse(JSON.stringify(data))
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
	const { status, data } = props
	const router = useRouter()
	const [showHero, setHero] = useState(false)

	// useEffect(() => {
	// 	console.log(data.find(o => o.org === "csso"));
	// }, [])

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
				<Products key="PRODUCTS" data={data}/>
			</AnimatePresence>



		</>
	)
}

export default Home


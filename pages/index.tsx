
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
import Footer from "../components/Footer/Footer";

interface decode {
	exp: number,
	username: string,
	iat: number,
	email: string
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
						user: JSON.parse(JSON.stringify(user)),
						email: email
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

export const Home: NextPage<Status> = (props) => {
	const { status, email, user } = props

	return (
		<>
			<Head>
				<title>Tigershop</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" key="hero" />
			</Head>

			<AnimatePresence>
				<Nav status={status} key="NAV" />
				<Hero key="HERO" />
				<Products email={email} key="PRODUCTS" />
				<Footer />
			</AnimatePresence>

		</>
	)
}

export default Home

{/* <Coming key="COMING" /> */ }

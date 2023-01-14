import { GetServerSideProps, NextPage } from "next";
import Image from 'next/image';
import { useRouter } from 'next/router';
import NewProduct from "../../components/admin/NewProduct";
import { GiHamburgerMenu } from 'react-icons/gi'
import { TiArrowBack } from 'react-icons/ti'
import { useState, useEffect } from "react";
import { verify } from "jsonwebtoken";
import jwt_decode from "jwt-decode";
import Products from "../../components/admin/Products";
import { PrismaClient } from '@prisma/client'
import Reservations from "../../components/admin/Reservations";
import Head from 'next/head';
const prisma = new PrismaClient()
import clientPromise from "../../lib/mongodb";

interface prod {
    name: string,
    image: string,
    stock: string,
    desc: string,
    id: string,
    price: string,
}

interface myProp {
    url: string
    status: boolean
    username: string
    products: prod[]
}

interface decode {
    exp: number,
    username: string,
    iat: number
}

export const getServerSideProps: GetServerSideProps = async (context) => {

    const secret = process.env.NEXT_PUBLIC_SECRET || ''
    const jwt = context.req.cookies['authToken'] || ''
    const url = context.req.url || ''

    const admins = ["csso", "ceit", "elits", "pasoa", "psabe", "uapsa", "coess", "etso", "iecep", "iiee", "pice", "piie", "sites", "jpcs", "class"]
    const client = await clientPromise;
    const db = client.db("?retryWrites=true&w=majority");




    if (url.includes('/admin')) {

        try {
            verify(jwt, secret);

            var token = jwt;
            var decoded: decode = jwt_decode(token);
            var username = decoded.username

            console.log(admins.includes(username))
            const orders = await db.collection("Orders").findOne({ org: username })


            if (admins.includes(username)) {
                const products = await prisma.products.findMany({
                    where: {
                        org: username
                    }
                })

                return {
                    props: {
                        status: true,
                        url,
                        username,
                        products: products.length > 0 ? products[0].products : []
                    }
                }
            } else {
                return {
                    redirect: {
                        destination: '/login',
                        permanent: false
                    }
                }
            }
        } catch (error) {
            console.log(error)
            return {
                redirect: {
                    destination: '/login',
                    permanent: false
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
    // Remaining code
}

const Admin: NextPage<myProp> = (props) => {
    const { url, username, products } = props
    const router = useRouter()
    const [navActive, setActive] = useState(false)

    const { asPath } = useRouter()

    const list = [
        {
            link: ["/admin/products", "/admin/products/new"],
            label: "products"
        },
        {
            link: ["/admin/orders"],
            label: "orders"
        },
        {
            link: ["/api/logout"],
            label: "logout"
        }
    ]



    const handleNav = (link: string) => {
        if (link === "/api/logout") {
            fetch("/api/logout", {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({})
            }).then((response) => {
                router.push("/login")
            })
        } else {
            router.push(`${link}`, undefined, { shallow: false })
        }
    }

    const sideNav = (
        <div className="sidenav bg-greenSteps lg:w-[20rem] h-full lg:block translate-x-[-100%] absolute lg:relative lg:translate-x-[0%] w-full transition-all ease-in-out duration-[0.3s] z-30" style={navActive ? { transform: "translateX(0%)" } : {}}>
            <Image src="/logo.webp" alt="Logo" width='200' height='20' className="w-24 mx-auto mt-16" unoptimized={true} />
            <TiArrowBack className="absolute top-5 left-5 text-4xl text-orangeText lg:hidden" onClick={() => { setActive(false) }} />

            <ul className="uppercase font-raleway text-white text-center mt-20 text-md font-regular tracking-wider">
                {list.map((items, i) => {
                    return (
                        <a className="cursor-pointer" onClick={() => { handleNav(items.link[0]) }} key={i}>
                            <li className="mb-8" style={items.link.includes(asPath) ? { color: "#FBBA24", fontWeight: "900", fontSize: "20px" } : {}}>{items.label}</li>

                        </a>

                    )
                })}
            </ul>
        </div>
    )

    return (
        <>
            <Head>
                <title>Admin</title>
                <meta property="og:title" content="Admin" key="Admin" />
            </Head>
            <div className="w-full h-screen flex overflow-hidden bg-white">
                {sideNav}
                <div className="w-full h-full flex flex-col">
                    <div className="h-28 w-full border-b-2 border-orangeBg flex items-center justify-between min-h-28 py-8">
                        <GiHamburgerMenu className="text-3xl ml-10 lg:hidden" onClick={() => { setActive(curr => !curr) }} />
                        <h1 className="text-orangeText font-semibold lg:text-2xl lg:ml-auto mr-10 text-md"><span className="uppercase">{username}</span> - Admin</h1>
                    </div>
                    <div className="w-full h-full lg:p-10 p-3 px-5">
                        {asPath === '/admin/products/new' ? <NewProduct username={username} /> : asPath === '/admin/orders' ? <Reservations /> : asPath === '/admin/products' ? <Products username={username} products={products} /> : null}

                    </div>
                </div>
            </div>
        </>
    )
}

export default Admin;
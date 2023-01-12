import { NextPage } from "next";
import clientPromise from "../../lib/mongodb";
import { GetServerSideProps } from 'next';
import jwt_decode from "jwt-decode";
import { verify } from "jsonwebtoken";
import { Orders, productProp } from "../../types";
import React, { useEffect, useState } from "react";
import Image from 'next/image';
import { BsPlus } from 'react-icons/bs'
import { HiMinusSm } from 'react-icons/Hi'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { TbBrandMessenger } from 'react-icons/tb'
import { isTemplateSpan } from "typescript";

interface paramType {
    params: string[]
}


export const getServerSideProps: GetServerSideProps = async (context) => {
    const secret = process.env.NEXT_PUBLIC_SECRET || ''
    const jwt = context.req.cookies['authToken'] || ''

    const client = await clientPromise;
    const db = client.db("?retryWrites=true&w=majority");
    const { params = [] } = context.query

    try {
        verify(jwt, secret);
        const user = await db.collection("Users").findOne({ email: params[0] })
        const product = await db.collection("Products").findOne({ "org": params[1] })
        const public_id = `${params[1]}/${params[2]}`
        const result = product!.products.find((o: { id: string; }) => o.id === public_id)

        if (result) {
            return {
                props: {
                    user: JSON.parse(JSON.stringify(user)),
                    result: JSON.parse(JSON.stringify(result)),
                    id: public_id
                }
            }
        } else {
            return {
                redirect: {
                    destination: '/',
                    permanent: false
                }
            }
        }


    } catch (error) {
        console.log(error)
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

}

const Order: NextPage<Orders> = (props) => {
    const { user, result, id } = props
    const [products, setProducts] = useState()
    const [quantity, setQuantity] = useState(1)
    const [facebook, setFacebook] = useState('')
    const [valid, setValid] = useState(false)

    const handleQuantity = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const id = e.currentTarget.id

        if (id === 'add') {
            setQuantity((current) => current + 1)
        } else if (id === 'minus' && quantity > 1) {
            setQuantity((current) => current - 1)
        }
    }

    const handleFb = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFacebook(e.target.value)
    }

    useEffect(() => {
        if(checkFacebook(facebook)) {
            setValid(true)
        } else {
            setValid(false)
        }
    }, [facebook])
    
    function checkFacebook(str: string) {
        return /(?:(?:http|https):\/\/)?(?:www.)?facebook.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[?\w\-]*\/)?(?:profile.php\?id=(?=\d.*))?([\w\-]*)?/.test(str)
    }

    return (
        <div className="w-full h-auto min-h-[100vh] bg-white flex">
            <div className="w-[90%] max-w-[700px] min-h-[100%] border-2 h-fit mx-auto flex flex-col items-center overflow-y-scroll no-scrollbar self-end">
                <h1 className="mt-7 font-bold font-raleway text-xl text-center break-words inline-block max-w-[19rem] text-greenBg">Place order: <span className=" font-medium">{result.name}</span></h1>
                <div className='h-[12rem] rounded-2xl w-[13rem]'>
                    <Image src={result.image} alt={`${result.name}`} width="200" height="200" className='w-full h-full rounded-t-2xl object-contain select-none border-10'></Image>
                </div>

                <p className="font-bold font-raleway text-greenSteps">Quantity</p>
                <div className="border-[1px] w-[10rem] h-10 flex border-heroOrange mt-2 just">
                    <div className="w-[4.5rem] border-r-[1px] border-heroOrange flex justify-center items-center font-black text-lg cursor-pointer select-none" id="minus" onClick={handleQuantity}>
                        <HiMinusSm className="text-lg" />
                    </div>
                    <div className="w-full flex items-center justify-center">
                        <p className="">{quantity}</p>
                    </div>
                    <div className="w-[4.5rem] border-l-[1px] border-heroOrange flex justify-center items-center font-black cursor-pointer select-none" id="add" onClick={handleQuantity}>
                        <BsPlus className="text-2xl" />
                    </div>
                </div>

                <div className="mt-8 flex items-center gap-x-3 text-greenSteps">
                    <AiOutlineShoppingCart className="text-2xl mt-[-5px]" />
                    <p className="font-bold font-raleway text-left">Order Information</p>
                </div>
                <div className="text-greenBg mt-5 flex flex-col gap-y-2">
                    <p className="font-semibold">Email: <span className="font-normal text-greenSteps">{user.email}</span></p>
                    <p className="font-semibold">Name: <span className="font-normal text-greenSteps">{user.fullname}</span></p>
                    <p className="font-semibold">Student No: <span className="font-normal text-greenSteps">{user.studentno}</span></p>
                    <p className="font-semibold">Contact: <span className="font-normal text-greenSteps">{user.phone}</span></p>
                </div>

                <div className="mt-8 flex items-center gap-x-3 text-greenSteps flex-col w-[20rem]">
                    <div className="flex items-center gap-x-2">
                        <TbBrandMessenger className="text-2xl mt-[-5px]" />
                        <p className="font-semibold font-raleway ">Facebook Link &#40;Required&#41;</p>
                    </div>

                    <input type="text" className="bg-inputBg w-full h-12 mx-auto block mt-2 outline-0 p-2 px-4 text-sm text-slate-700 rounded-md" autoComplete="off" value={facebook} onChange={handleFb}></input>
                </div>

                <div className="h-[5rem] w-full border-greenBg border-b-0 border-[1px] mt-10 flex justify-center items-center">
                    <div className="w-[90%] mx-auto flex justify-between items-center">
                        <p className="font-poppins font-bold">Total: <span className="font-medium">₱{+result.price * quantity}</span></p>

                        <div className='flex rounded-lg items-center justify-center p-[1px] w-32' style={valid ? {pointerEvents: "auto", opacity: "100%"} : {pointerEvents: "none", opacity: "50%"}}>
                            <div className="font-inter bg-[#D19713] text-white p-3 rounded-lg text-sm font-medium text-center hover:bg-heroOrange cursor-pointer select-none w-full">
                                <p className="tracking-wider">
                                    Confirm
                                </p>
                            </div>
                        </div>
                    </div>

                </div>


            </div>
        </div>
    );
}

export default Order;
import { FunctionComponent } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { BsStar, BsStarFill } from 'react-icons/bs'
import { Users } from "../../types";
import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router';

interface productProp {
    id: string,
    image: string,
    name: string,
    desc: string,
    stock: string,
    price: string,
    likes: string[],
    handleOrder: (e: string) => void,
    email: string,
    org: string
}

const ProductTemplate: FunctionComponent<productProp> = (props) => {
    const { id, image, price, name, stock, desc, handleOrder, likes, email, org } = props
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 })
    const [doesLike, setLike] = useState<boolean>()
    const router = useRouter()

    useEffect(() => {
        setLike(likes.includes(email))
        console.log(email);
    }, [likes])


    const variants = {
        initial: {
            y: "-100%"
        },

        animate: {
            y: ["-101%", "0%", "101%"],
            transition: {
                duration: 1.2,
                delay: 0.3
            }
        },
    }

    const handleLike = () => {
        if (email === undefined) {
            router.push("/login", undefined, { scroll: false})
        } else {
            setLike(current => !current)

        fetch("/api/like", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                id,
                org
            })

        },
        )
        }
        
    }

    return (
        <div className="w-[20rem] h-[15rem] relative overflow-hidden cursor-pointer box-border" ref={ref}>

            <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 100 } : {}} transition={{ delay: 0.9 }} className="relative w-full h-full">
                <img src={image} alt="Products" className="object-cover w-full h-full absolute bottom-0 z-0 hover:brightness-50 transition-all ease-in-out duration-300 peer" onClick={() => { handleOrder(id) }}></img>
                <div className="shadow-customInset z-10 absolute w-full h-full pointer-events-none border-b-4 border-b-lightg"></div>
                <h2 className="text-white font-bold font-poppins text-xl uppercase max-w-[12rem] pointer-events-none absolute top-4 z-10 right-4">₱ {price}</h2>
                <h2 className="text-white font-bold font-poppins text-xl uppercase max-w-[12rem] pointer-events-none absolute top-4 z-10 left-4 translate-x-[-120%] peer-hover:translate-x-[0] transition-all ease-in-out duration-300">Click to order</h2>
                <div className="p-4 absolute peer-hover:opacity-0 z-30 transition-all ease-in-out duration-300" onClick={handleLike}>
                    {doesLike ? <BsStarFill className="text-2xl absolute top-0 left-0 text-white m-3" /> : <BsStar className="text-2xl absolute top-0 left-0 text-white m-3" />}

                </div>


                <div className="absolute flex justify-between w-[90%] items-center mx-auto left-0 right-0 bottom-3 z-10 pointer-events-none peer-hover:translate-y-[-5rem] transition-all ease-in-out duration-300">
                    <h1 className="text-white font-bold font-poppins text-xl uppercase max-w-[12rem] overflow-hidden">{name}</h1>
                    <h3 className="text-[#BDBDBD] font-bold font-poppins text-xs self-end" >Stocks: {stock}</h3>
                    <div className='absolute line-clamp-3 text-white z-10 bottom-[-4.8rem] h-[4.3rem]'>
                        <p>
                            {desc}
                        </p>
                    </div>
                </div>

            </motion.div>

            <motion.div variants={variants} initial="initial" animate={inView ? "animate" : ""} className='absolute w-full h-full bg-heroOrange top-0 z-20'></motion.div>


        </div>
    );
}

export default ProductTemplate;
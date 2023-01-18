import { IoMdArrowDropup } from 'react-icons/io'
import { Prod, productProp } from '../../types';
import { FunctionComponent, useState, useEffect } from 'react'
import { orderType } from '../../types';
import { useRouter } from 'next/router';
import Aerial from '../../public/cvsuaerial.webp'
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import ProductTemplate from './ProductTemplate';
import Image from 'next/image';
import { MdOutlineDoubleArrow } from 'react-icons/md'


const Products: FunctionComponent<Prod> = (props) => {
    const { email } = props

    const router = useRouter()
    const [selected, setSelect] = useState("csso")
    const [products, setProducts] = useState<productProp[]>()

    const [prodRef1, prodView1] = useInView({ triggerOnce: true, threshold: 0.5 })
    const [prodRef2, prodView2] = useInView({ triggerOnce: true, threshold: 0.5 })

    const [drop, setDrop] = useState(false)
    // ["csso", "ceit", "elits", "pasoa", "psabe", "uapsa", "coess", "etso", "iecep", "iiee", "pice", "piie", "sites", "jpcs", "class"]
    const orgList = ["csso", "ceit", "piie"]

    const [order, setOrder] = useState<orderType>({
        email: email,
        org: selected,
    })

    const handleOrder = (inp: string) => {
        console.log(("I AM CLICKED HANDLE ORDER"));
        router.push({ pathname: `order/${order.email}/${inp}` }, undefined, { scroll: false })
    }

    const handleSelected = (e: string) => {
        setSelect(e)
    }

    useEffect(() => {
        fetch("/api/admin/getProducts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                org: selected
            })
        }).then((response) => {
            return response.json()
        }).then((response) => {
            setProducts(response.data.products)
        })
    }, [selected])

    useEffect(() => {
        console.log(prodView1)
    }, [prodView1])


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
        <section className="min-h-[70vh] pb-40 w-full relative bg-blend-overlay117031 bg-no-repeat bg-cover border-t-8 border-t-[#0f7a33]" style={{ backgroundImage: `url(${Aerial.src})` }}>
            <div className='w-full h-[20rem] lg:h-[23rem] bg-[#117031] flex items-center justify-center relative border-b-8 border-b-[#0f7a33]'>
                <motion.h2 variants={variants} initial="initial1" animate={prodView1 ? "animate1" : ""} className='absolute left-[-8.5rem] top-4 text-6xl font-raleway font-black text-white opacity-20 md:text-8xl 2xl:text-[120px]'>PRODUCTS</motion.h2>
                <motion.h2 variants={variants} initial="initial2" animate={prodView1 ? "animate2" : ""} className='absolute right-[-8.5rem] bottom-4 text-6xl font-raleway font-black text-white opacity-20 md:text-8xl  2xl:text-[120px]'>PRODUCTS</motion.h2>
                <div className='w-fit h-fit text-center font-raleway relative'>
                    <div className='w-fit relative hover:scale-150 hover:-rotate-12 transition-all ease-in-out duration-300 peer cursor-pointer select-none group'>
                        <h1 className="text-white text-5xl font-extrabold lg:text-7xl 2xl:text-[100px] " ref={prodRef1}>MERCH</h1>
                        <MdOutlineDoubleArrow className=' absolute my-auto top-0 bottom-0 left-[-1.7rem] md:left-[-3.5rem] md:text-5xl text-white text-2xl group-hover:scale-100 scale-0 transition-all ease-in-out duration-300' />
                        <MdOutlineDoubleArrow className=' absolute my-auto top-0 bottom-0 right-[-1.7rem] md:right-[-3.5rem] md:text-5xl text-white rotate-180 text-2xl group-hover:scale-100 scale-0 transition-all ease-in-out duration-300' />
                    </div>

                    <h3 className='text-[#F6AB00] font-bold lg:text-2xl peer-hover:scale-0 absolute mx-auto left-0 right-0 top-[-2rem] transition-all ease-in-out duration-300'>OUR</h3>
                    <Image src="/underline.svg" alt="underline" width="200" height="200" className='w-[10rem] mx-auto lg:w-[14rem] 2xl:w-[15rem] peer-hover:scale-0 transition-all ease-in-out duration-300'></Image>

                </div>
            </div>
            <div className="min-h-[70vh] w-[85%] max-w-[1600px] mx-auto relative">

                <div className="absolute right-0 top-0 cursor-pointer">


                    <div className="md:w-[12rem] w-[9rem] h-[3.5rem] bg-[#003C14] border-b-4 border-b-[#40C96D] flex justify-around items-center text-white select-none" onClick={() => { setDrop(current => !current) }}>
                        <p className="font-bold uppercase">{selected}</p>
                        <IoMdArrowDropup className="text-3xl rotate-180" />
                    </div>

                    <div className='w-full absolute h-[15rem] z-20 overflow-hidden' style={drop ? { pointerEvents: "auto" } : { pointerEvents: "none" }}>
                        <div className="w-full h-full bg-[#056124] overflow-y-scroll translate-y-[-100%] transition-all ease-in-out duration-200" style={drop ? { transform: "translateY(0%)" } : {}}>
                            <ul className='text-center uppercase font-regular text-white'>
                                {orgList.map((items) => {
                                    return (
                                        <li key={items} className="py-3 hover:bg-orangeBg hover:text-black transition-all ease-in-out duration-200" onClick={() => { handleSelected(items) }}>{items}</li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="w-full h-fit overflow-hidden" id="products">
                    <div className="mt-[12rem] lg:w-fit mx-auto md:w-fit  gap-y-10 grid lg:grid-cols-2 justify-center items-center gap-x-10 2xl:grid-cols-3">
                        {products?.map((items, i) => {
                            return (
                                <ProductTemplate id={items.id} image={items.image} price={items.price} name={items.name} stock={items.stock} desc={items.desc} handleOrder={handleOrder} likes={items.likes} key={i} email={email} org={selected} />
                            )
                        })}
                    </div>
                </div>

            </div>


        </section>
    );
}

export default Products;
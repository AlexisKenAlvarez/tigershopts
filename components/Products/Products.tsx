import { IoMdArrowDropup } from 'react-icons/io'
import { Prod, productProp } from '../../types';
import { FunctionComponent, useState, useEffect } from 'react'
import { orderType } from '../../types';
import { useRouter } from 'next/router';
import Aerial from '../../public/cvsuaerial.webp'
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import ProductTemplate from './ProductTemplate';


const Products: FunctionComponent<Prod> = (props) => {
    const { email } = props

    const router = useRouter()
    const [selected, setSelect] = useState("csso")
    const [products, setProducts] = useState<productProp[]>()
    const [prodRef, prodView] = useInView({ triggerOnce: true, threshold: 0.5 })
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

    const variants = {
        initial: {
            x: "-100%"
        },

        animate: {
            x: ["-101%", "0%", "101%"],
            transition: {
                duration: 1.2,
                delay: 0.3
            }
        },

    }

    return (
        <section className="min-h-[70vh] pb-40 w-full relative bg-blend-overlay" style={{ backgroundImage: `url(${Aerial.src})` }}>
            <div className="min-h-[70vh] w-[85%] max-w-[1600px] mx-auto relative">
                <div className="absolute md:mt-[-2.5rem] mt-[-4.5rem] md:text-7xl text-4xl mx-auto left-0 right-0 w-fit md:mx-0">
                    <motion.h1 initial={{ x: 0, y: 0 }} animate={prodView ? { left: "-5px", bottom: "-5px" } : {}} transition={{ duration: 0.6 }} ref={prodRef} className="font-raleway font-[900] tracking-wide uppercase text-[#40C96D] z-10 absolute md:block hidden">Products</motion.h1>
                    <h1 className="font-raleway font-[900] tracking-wide uppercase text-white relative z-10">Products</h1>
                </div>

                <div className="absolute right-0 top-0 cursor-pointer">
                    <div className="md:w-[12rem] w-[9rem] h-[3.5rem] bg-[#003C14] border-b-4 border-b-[#40C96D] flex justify-around items-center text-white select-none" onClick={() => {setDrop(current => !current)}}>
                        <p className="font-bold uppercase">{selected}</p>
                        <IoMdArrowDropup className="text-3xl rotate-180" />
                    </div>

                    <div className='w-full absolute h-[15rem] z-20 overflow-hidden' style={ drop ? {pointerEvents: "auto"} : {pointerEvents: "none"}}>
                        <div className="w-full h-full bg-[#056124] overflow-y-scroll translate-y-[-100%] transition-all ease-in-out duration-200" style={ drop ? {transform: "translateY(0%)"} : {}}>
                            <ul className='text-center uppercase font-regular text-white'>
                                {orgList.map((items) => {
                                    return (
                                        <li key={items} className="py-3 hover:bg-orangeBg hover:text-black transition-all ease-in-out duration-200" onClick={() => {handleSelected(items)}}>{items}</li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="w-full h-fit overflow-hidden" id="products">
                    <div className="mt-40 lg:w-fit mx-auto w-fit gap-y-10 grid lg:grid-cols-2 justify-center items-center gap-x-10 2xl:grid-cols-3">
                        {products?.map((items, i) => {
                            return (
                                <ProductTemplate id={items.id} image={items.image} price={items.price} name={items.name} stock={items.stock} desc={items.desc} handleOrder={handleOrder} likes={items.likes} key={i} email={email} org={selected}/>
                            )
                        })}
                    </div>
                </div>

            </div>


        </section>
    );
}

export default Products;
import { IoMdArrowDropup } from 'react-icons/io'
import { Prod, productProp } from '../../types';
import { FunctionComponent, useState, useEffect } from 'react'
import { orderType } from '../../types';
import { useRouter } from 'next/router';


const Products: FunctionComponent<Prod> = (props) => {
    const { data, email } = props

    const router = useRouter()
    const [selected, setSelect] = useState("csso")
    const [products, setProducts] = useState<productProp[]>()

    const [order, setOrder] = useState<orderType>({
        email: email,
        org: selected,
    })

    const handleOrder = (inp: string) => {
        router.push({pathname: `order/${order.email}/${inp}`}, undefined, {scroll: false})
    }

    useEffect(() => {
        const result = data.find(o => o.org === "csso")
        setProducts(result!.products);
        console.log(email)

    }, [selected])

    return (
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
                    <div className="mt-40 lg:w-fit mx-auto w-fit gap-y-10 grid lg:grid-cols-2 justify-center items-center gap-x-10 2xl:grid-cols-3">
                        {products?.map((items, i) => {
                            return (
                                <div className="w-[20rem] h-[15rem] relative overflow-hidden border-b-4 border-b-lightg cursor-pointer" key={i} onClick={() => {handleOrder(items.id)}}>

                                    <img src={items.image} alt="Products" className="object-cover w-full h-full absolute bottom-0 z-0 hover:brightness-50 transition-all ease-in-out duration-300 peer"></img>

                                    <div className="shadow-customInset z-10 absolute w-full h-full pointer-events-none"></div>
                                    <h2 className="text-white font-bold font-poppins text-xl uppercase max-w-[12rem] pointer-events-none absolute top-4 z-10 right-4">₱ {items.price}</h2>
                                    <h2 className="text-white font-bold font-poppins text-xl uppercase max-w-[12rem] pointer-events-none absolute top-4 z-10 left-4 translate-x-[-120%] peer-hover:translate-x-[0] transition-all ease-in-out duration-300">Click to order</h2>
                                    <div className="absolute flex justify-between w-[90%] items-center mx-auto left-0 right-0 bottom-3 z-10 pointer-events-none peer-hover:translate-y-[-5rem] transition-all ease-in-out duration-300">
                                        <h1 className="text-white font-bold font-poppins text-xl uppercase max-w-[12rem] overflow-hidden">{items.name}</h1>
                                        <h3 className="text-[#BDBDBD] font-bold font-poppins text-xs self-end" >Stocks: {items.stock}</h3>
                                        <div className='absolute line-clamp-3 text-white z-10 bottom-[-4.8rem] h-[4.3rem]'>
                                            <p>
                                                {items.desc}
                                            </p>
                                        </div>
                                    </div>

                                </div>
                            )
                        })}
                    </div>
                </div>

            </div>


        </section>
    );
}

export default Products;
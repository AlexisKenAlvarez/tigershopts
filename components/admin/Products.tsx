import { Prisma } from '@prisma/client';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { IoMdAddCircle } from 'react-icons/io'
import { FaTrashAlt } from 'react-icons/fa'
import { MdEdit } from 'react-icons/md'
import { RiArrowDownSFill } from 'react-icons/ri'

interface prod {

    name: string,
    image: string,
    stock: string,
    desc: string,

}

const Products = ({ username, products }: { username: String, products: prod[] }) => {
    const router = useRouter()
    return (

        <>
            <a onClick={() => { router.push('/admin/products/new') }} className="flex items-center gap-x-2 cursor-pointer">
                <IoMdAddCircle className='text-greenSteps text-2xl mt-1' />
                <h2 className="text-2xl font-bold text-greenSteps">Add product</h2>
            </a>

            <div className="w-full sm:w-fit h-[70vh] mt-10 overflow-y-scroll grid sm:grid-cols-2 gap-y-6 sm:gap-y-10 sm:gap-x-10 pb-2 md:grid-cols-3 no-scrollbar xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6">
                {products.map((items) => {
                    return (
                        <>
                            <div className='flex flex-col border-[1.5px] h-[19rem] w-[13rem] border-black rounded-2xl pb-3'>
                                <div className='h-[12rem] flex justify-center items-center'>
                                    <Image src={`/uploads/${items.image}`} alt={`${items.name}`} width="100" height="100" className='w-full h-full rounded-t-2xl'></Image>
                                </div>

                                <div className='flex flex-col h-[20rem] text-clip'>
                                    <div className='w-full h-[3.4rem] flex items-center border-t-[1.5px] border-t-black justify-between'>
                                        <p className='ml-3 text-greenBg font-semibold font-'>0 Favorites</p>
                                        <div className='flex items-center gap-x-2 mr-3'>
                                            <FaTrashAlt className='cursor-pointer'/>
                                            <MdEdit className='cursor-pointer'/>
                                        </div>
                                    </div>
                                    <div className='w-[90%] mx-auto h-[2px] bg-black opacity-20'></div>
                                    <div className='w-full h-full break-words px-3 pr-6 relative'>
                                        <RiArrowDownSFill className='absolute top-2 right-3 cursor-pointer'/>

                                        <p className=' leading-4 line-clamp-3 text-xs mt-2'>
                                            <span className='text-greenBg font-black text-sm font-raleway'>{items.name}: </span>
                                            {
                                                items.desc
                                            }
                                        </p>

                                    </div>
                                </div>
                            </div>
                        </>
                    )
                })}
            </div>
        </>

    );
}

export default Products;
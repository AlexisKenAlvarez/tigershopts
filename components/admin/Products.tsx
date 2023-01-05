import { Prisma } from '@prisma/client';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { IoMdAddCircle } from 'react-icons/io'

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
                <IoMdAddCircle className='text-greenSteps text-2xl mt-1'/>
                <h2 className="text-2xl font-bold text-greenSteps">Add product</h2>
            </a>

            <div className="w-full h-[90%] border-2 mt-10">
                {products.map((items) => {
                    return (
                        <>
                            <Image src={`/uploads/${items.image}`} alt={`${items.name}`} width="100" height="100"></Image>
                        </>
                    )
                })}
            </div>
        </>

    );
}

export default Products;
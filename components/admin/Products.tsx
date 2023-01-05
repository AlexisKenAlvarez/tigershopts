import { Prisma } from '@prisma/client';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { IoMdAddCircle } from 'react-icons/io'
import { FaTrashAlt } from 'react-icons/fa'
import { MdEdit } from 'react-icons/md'
import { RiArrowDownSFill } from 'react-icons/ri'
import DeleteComponent from '../../components/admin/DeleteComponent'

interface prod {

    name: string,
    image: string,
    stock: string,
    desc: string,

}

const Products = ({ username, products }: { username: String, products: prod[] }) => {
    const router = useRouter()
    const [span, setSpan] = useState<String>('')
    const [toDeleteName, setDelete] = useState<String>('')
    const [toDeleteImage, setDeleteImage] = useState<String>('')


    const handleExpand = (name: String) => {
        if (name === span) {
            setSpan('')
        } else{
            setSpan(name)
        }
    }

    const handleToDelete = (name: String, imageName: String) => {
        setDelete(name)
        setDeleteImage(imageName)
    }

    const closeDelete = () => {
        setDelete('')
        setDeleteImage('')
    }

    const refreshData = () => {
        router.replace(router.asPath)
    }

    return (

        <>
            {
                toDeleteName === '' ? null : <DeleteComponent name={toDeleteName} close={closeDelete} image={toDeleteImage} refresh={refreshData}/>
            }

            <a onClick={() => { router.push('/admin/products/new') }} className="flex items-center gap-x-2 cursor-pointer">
                <IoMdAddCircle className='text-greenSteps text-2xl mt-1' />
                <h2 className="text-2xl font-bold text-greenSteps">Add product</h2>
            </a>


            <div className="w-full sm:w-fit h-[70vh] mt-10 overflow-y-scroll grid sm:grid-cols-2 gap-y-6 sm:gap-y-8 sm:gap-x-10 pb-2 md:grid-cols-3 no-scrollbar xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 transition-all ease-in-out select-none" style={{gridAutoRows: "minmax(20rem, 20rem)"}}>
                {products.map((items) => {
                    return (
                        <>
                            <div className='flex flex-col border-[1.5px] h-full w-[13rem] border-black rounded-2xl pb-3' style={span === items.name ? {gridRowStart: "span 2"} : {}}>
                                <div className='h-[12rem] border-2 rounded-2xl'>
                                    <Image src={items.image} alt={`${items.name}`} width="100" height="100" className='w-full h-full rounded-t-2xl object-contain select-none'></Image>
                                </div>

                                <div className=' h-[7rem] text-clip'>
                                    <div className='w-full h-[2.5rem] flex items-center border-t-[1.5px] border-t-black justify-between'>
                                        <p className='ml-3 text-greenBg font-semibold font-'>0 Favorites</p>
                                        <div className='flex items-center gap-x-2 mr-3'>
                                            <FaTrashAlt className='cursor-pointer hover:text-greenBg transition-all ease-in-out duration-[0.2s]' onClick={() => {handleToDelete(items.name, items.image)}}/>
                                            <MdEdit className='cursor-pointer hover:text-greenBg transition-all ease-in-out duration-[0.2s]'/>
                                        </div>
                                    </div>

                                    <div className='w-[90%] mx-auto h-[2px] bg-black opacity-20'></div>
                                    <div className='w-full h-full break-words px-3 pr-8 relative'>
                                        <RiArrowDownSFill className='absolute top-2 right-3 cursor-pointer z-[5]' onClick={() => {handleExpand(items.name)}}/>

                                        <p className={`text-xs mt-2 ${span === items.name ? 'line-clamp-none' : 'line-clamp-3'} select-none`}>
                                            <span className='text-greenBg font-black text-sm font-raleway capitalize'>{items.name}: </span>
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
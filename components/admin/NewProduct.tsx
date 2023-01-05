import React from "react";
import { TiArrowBack } from 'react-icons/ti'
import { BsFillCloudUploadFill } from 'react-icons/bs'
import TextareaAutosize from 'react-textarea-autosize';
import { stockRadio } from '../../utils/List'
import { TiDelete } from 'react-icons/ti'
import Link from 'next/link';
import { useState, useEffect } from "react";
import LongButton from "../LongButton";


const NewProduct = ({ username }: { username: string }) => {

    const [image, setImage] = useState()
    const [stock, setStock] = useState('')
    const [imageInput, setImgInput] = useState<File>()
    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')

    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {

        const file = e.target.files || []

        if (file.length > 0) {
            setImgInput(file[0])

            const fileReader = new FileReader()
            fileReader.onload = function (e: any) {
                const result = e.target.result || ''
                setImage(result)
            }
            fileReader.readAsDataURL(file[0])
        }
    }

    const handleStock = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStock(e.target.value)
    }
    const handleDesc = (e: any) => {
        setDesc(e.target.value);
    }

    const handleClose = () => {
        setImage(undefined)
        setImgInput(undefined)
    }

    const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const sendData = () => {
        const form = new FormData()

        form.append('name', name)
        form.append('desc', desc)
        form.append('stock', stock)
        form.append('org', username)
        form.append('image', imageInput || '')

        fetch("/api/create/upload", {
            method: 'POST',
            body: form

        }).then((response) => {
            return response.json();
        }).then((response) => {
            console.log(response)
        })
    }

    return (
        <div className="w-full h-[95%] bg-[#F6F6F6] font-raleway overflow-y-scroll pb-24">
            <div className="flex items-center p-4">
                <Link href="/admin/products" className="flex items-center gap-x-2">
                    <TiArrowBack className="text-3xl" />

                    <p>Back</p>
                </Link>
            </div>

            <div className="w-fit mx-auto flex flex-col items-center md:w-[23rem] xl:flex-row xl:w-[800px] lg:gap-x-16 lg:items-start">
                <h1 className="font-medium text-[20px] text-center xl:hidden">Add new product</h1>

                <div className="w-full lg:mt-[6.5rem] relative">
                    <div className="w-[16rem] h-[8rem] border-2 border-dashed border-black mx-auto mt-6 relative flex justify-center items-center flex-col md:w-full lg:mt-0">
                        <input type="file" onChange={handleImage} className="w-full h-full cursor-pointer opacity-0 top-0 absolute" style={image === undefined ? { pointerEvents: "auto" } : { pointerEvents: "none" }} />
                        <BsFillCloudUploadFill className="text-4xl" />
                        <p className="mt-2 max-w-[10rem] truncate">{imageInput === undefined ? "Upload image" : imageInput?.name}</p>
                        <TiDelete className="absolute top-2 right-2 text-2xl cursor-pointer" onClick={handleClose} />
                    </div>


                    <div className="w-[13rem] h-[10rem] mt-10 mx-auto border-2">
                        {image === undefined ? null :
                            <img src={image} alt="User upload" className="object-cover h-full w-full"></img>
                        }
                    </div>
                </div>

                <div className="relative w-full">
                    <h1 className="font-medium text-[20px] text-left hidden xl:block">Add new product</h1>

                    <div className="flex flex-col w-full mt-10">
                        <label>Product Name</label>
                        <input type="text" className="w-full mt-2 outline-none p-2" onChange={handleName}></input>
                    </div>

                    <div className="flex flex-col w-full mt-10">
                        <label>Product Description</label>
                        <TextareaAutosize className="w-full mt-2 resize-none outline-none p-2" maxRows={7} minRows={5} onChange={handleDesc} />
                    </div>

                    <div className="w-full mt-10">
                        <h2>Stocks count</h2>
                        <div className="flex w-full justify-between mt-6">
                            {stockRadio.map((val, i) => {
                                return (
                                    <div key={i} className="flex items-center gap-x-1">
                                        <input type="radio" name="stocks" value={val.value} className="focus:ring-orangeText w-4 h-4 cursor-pointer" onChange={handleStock}></input>
                                        <label>{val.value}</label>
                                    </div>

                                )
                            })}
                        </div>

                        <LongButton name="Add product" onClick={sendData} />
                    </div>
                </div>

            </div>
        </div>
    );
}

export default NewProduct;
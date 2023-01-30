import { FunctionComponent, useState, useEffect } from "react"
import { AiFillFileImage } from 'react-icons/ai'
import TextareaAutosize from 'react-textarea-autosize';
import { stockRadio } from "../../utils/List";
import { TfiSave } from 'react-icons/tfi'

interface myProp {
    image: string,
    name: string,
    desc: string,
    stock: string,
    public_id: string,
    price: string,
}

interface myObj {
    edit: myProp
    close: () => void
    org: string,
    refresh: () => void
}

const EditMode: FunctionComponent<myObj> = (props) => {
    const { org, refresh, edit, close } = props

    const [image, setImage] = useState<string>(edit.image)
    const [imageInput, setImgInput] = useState<File>()

    const [product, setProduct] = useState({
        name: edit.name,
        desc: edit.desc,
        stock: edit.stock,
        public_id: edit.public_id,
        price: edit.price
    })


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
    
    useEffect(() => {
      console.log("Price:" + product.price);

    }, [])
    

    const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProduct(current => ({ ...current, "name": e.target.value }))
    }

    const handleDesc = (e: any) => {
        setProduct(current => ({ ...current, "desc": e.target.value }))
    }

    const handleStock = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProduct(current => ({ ...current, "stock": e.target.value }))
    }

    const handlePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProduct(current => ({ ...current, "price": e.target.value }))
    }

    const [debounce, setDebounce] = useState(false)
    const sendData = async () => {
        console.log(product.price)
        if (!debounce) {
            setDebounce(true)

            const formImage = new FormData()
            formImage.append('file', imageInput || '')
            formImage.append('org', org)
            formImage.append('upload_preset', 'my-uploads')

            if (imageInput === undefined) {
                fetch("/api/admin/update", {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        name: product.name,
                        desc: product.desc,
                        stock: product.stock,
                        oldId: product.public_id,
                        price: product.price,
                        org,
                        imageChanged: false
                    })

                }).then((response) => {
                    return response.json();
                }).then((response) => {
                    console.log(response)
                    refresh()
                    close()
                    setDebounce(false)
                })
            } else {
                const data = await fetch("/api/admin/uploadImage", {
                    method: 'POST',
                    body: formImage
                }).then((response) => {
                    return response.json()
                }).then((r) => {

                    fetch("/api/admin/update", {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify({
                            name: product.name,
                            desc: product.desc,
                            stock: product.stock,
                            newId: r.public_id,
                            oldId: product.public_id,
                            newImage: r.secure_url,
                            price: product.price,
                            org,
                            imageChanged: true
                        })

                    }).then((response) => {
                        return response.json();
                    }).then((response) => {
                        console.log(response)
                        refresh()
                        close()
                        setDebounce(false)
                    })
                })
            }


        }
    }



    return (
        <div className='w-[100%] lg:w-[85%] h-screen fixed top-0 right-0 z-10 flex justify-center items-center select-none'>
            <div className="w-[85vw] h-[85vh] max-w-[450px] max-h-[750px] bg-white z-10 font-poppins overflow-hidden pb-6 rounded-xl">
                <div className="overflow-y-scroll h-[90%] w-full relative mt-5">
                    <p className="text-center font-bold mt-6" onClick={() => { console.log(product) }}>Edit Product</p>

                    <div className="w-[13rem] h-[12rem] mx-auto border-2 mt-6 rounded-xl">
                        {image === undefined ? null :
                            <img src={image} alt="User upload" className="object-cover h-full w-full rounded-xl"></img>
                        }
                    </div>
                    <div className="w-[12rem] h-[3rem] bg-slate-200 mx-auto mt-3 flex justify-center items-center rounded-xl text-sm cursor-pointer text-greenBg relative">
                        <p>Change Image</p>
                        <AiFillFileImage className="ml-2" />
                        <input type="file" onChange={handleImage} className="w-full h-full cursor-pointer opacity-0 top-0 absolute" />
                    </div>

                    <div className="w-[80%] mx-auto mt-0">
                        <div className="flex flex-col w-full mt-6 text-sm">
                            <label>Product Name</label>
                            <input type="text" value={product.name} className="w-full mt-2 outline-none p-2 bg-slate-200" onChange={handleName}></input>
                        </div>

                        <div className="flex flex-col w-full mt-5 text-sm">
                            <label>Product Description</label>
                            <TextareaAutosize className="w-full mt-2 resize-none outline-none p-2 bg-slate-200" maxRows={7} minRows={5} onChange={handleDesc} value={product.desc} />
                        </div>

                        <div className="flex flex-col w-full mt-5 text-sm relative">
                            <label>Price</label>
                            <p className="absolute bottom-2 left-3 font-bold font-poppins">₱</p>
                            <input type="number" value={product.price} className="w-full mt-2 outline-none p-2 bg-slate-200 pl-7" onChange={handlePrice}></input>
                        </div>

                        <div className="w-full mt-5 text-sm">
                            <h2>Stocks count</h2>
                            <div className="flex flex-col md:flex-row w-full justify-between mt-4">
                                {stockRadio.map((val, i) => {
                                    return (
                                        <div key={i} className="flex items-center gap-x-1 mt-3 md:mt-0">
                                            <input type="radio" name="stocks" value={val.value} className="focus:ring-orangeText w-4 h-4 cursor-pointer" onChange={handleStock} defaultChecked={edit.stock === val.value ? true : false}></input>
                                            <label className="ml-1 md:ml-0">{val.value}</label>
                                        </div>

                                    )
                                })}
                            </div>
                        </div>

                        <div className='text-sm flex w-fit mx-auto mt-10 gap-x-7'>
                            <div className='w-[8rem] h-fit py-[0.50rem] rounded-3xl bg-cancel text-white flex justify-center items-center cursor-pointer hover:opacity-70' onClick={close}>Cancel</div>
                            <div className='w-[8rem] h-fit py-[0.50rem] rounded-3xl bg-greenButton text-white flex justify-center items-center cursor-pointer gap-x-2 hover:bg-greenHover transition-all ease-in-out duration-[0.2s]' onClick={sendData}>
                                {debounce ? "Saving..." :
                                    <>
                                        <p>Save</p>
                                        <TfiSave />
                                    </>}

                            </div>

                        </div>
                    </div>


                </div>


            </div>


            <div className="closer w-full h-full bg-[#D9D9D9] opacity-70 cursor-pointer absolute top-0" onClick={close}></div>
        </div>
    );
}

export default EditMode;
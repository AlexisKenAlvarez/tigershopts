import { FunctionComponent, useState, useEffect } from "react"
import { AiFillFileImage } from 'react-icons/ai'

interface myProp {
    image: string,
    name: string,
    desc: string,
    stock: string,
    public_id: string
}

interface myObj {
    edit: myProp
    close: () => void
    org: string
}

const EditMode: FunctionComponent<myObj> = (props) => {
    const { org, edit, close } = props

    const [image, setImage] = useState<string>()
    const [imageInput, setImgInput] = useState<File>()

    useEffect(() => {
        setImage(edit.image)
    }, [])

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


    return (
        <div className='w-[100%] lg:w-[85%] h-screen fixed top-0 right-0 z-10 flex justify-center items-center select-none'>
            <div className="w-[85vw] h-[85vh] max-w-[450px] max-h-[650px] bg-white z-10 font-poppins">
                <p className="text-center font-bold mt-6">Edit Product</p>

                <div className="w-[13rem] h-[12rem] mx-auto border-2 mt-6 rounded-xl">
                    {image === undefined ? null :
                        <img src={image} alt="User upload" className="object-cover h-full w-full rounded-xl"></img>
                    }
                </div>
                <div className="w-[12rem] h-[3rem] bg-slate-200 mx-auto mt-3 flex justify-center items-center rounded-xl text-sm cursor-pointer text-greenBg relative">
                    <p>Change Image</p>
                    <AiFillFileImage className="ml-2"/>
                    <input type="file" onChange={handleImage} className="w-full h-full cursor-pointer opacity-0 top-0 absolute" />
                </div>
            </div>


            <div className="closer w-full h-full bg-[#D9D9D9] opacity-70 cursor-pointer absolute top-0" onClick={close}></div>
        </div>
    );
}

export default EditMode;
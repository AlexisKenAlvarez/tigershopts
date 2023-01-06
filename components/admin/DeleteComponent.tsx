import { FaTrashAlt } from 'react-icons/fa'
import { IoWarning } from 'react-icons/io5'
import { useState, FunctionComponent } from 'react'

interface myProp {
    name: String,
    image: String
    close: () => void
    refresh: () => void
    id: String
}

const Delete: FunctionComponent<myProp> = (props) => {

    const { name, image, close, refresh, id } = props

    const [debounce, setDebounce] = useState(false)

    const handleDelete = () => {
        if (!debounce) {
            setDebounce(true)
            fetch("/api/admin/delete", {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    image: image,
                    public_id: id
                })

            }).then((response) => {
                return response.json()
            }).then((response) => {
                console.log(response)
                close()
                refresh()
                setDebounce(false)

            })
        }

    }

    return (
        <div className='w-[100%] lg:w-[85%] h-screen fixed top-0 right-0 z-10 flex justify-center items-center select-none'>
            <div className="w-[21rem] md:w-[23rem] md:px-2 h-fit bg-white z-20 shadow-xl rounded-xl font-poppins pb-8">
                <p className="text-center font-bold mt-6">Delete Product</p>
                <p className="text-center mt-1">Are you sure you want to delete <span className='font-semibold'>
                    “{name}”?
                </span>
                </p>

                <div className='w-[85%] h-[4.5rem] mx-auto bg-redLight text-sm p-2 flex pt-3 mt-6 rounded border-l-[2px] border-maroonText'>
                    <div className='mt-[0.20rem] justify-center items-center w-[1.6rem] ml-2'>
                        <IoWarning className='text-maroonText' />
                    </div>
                    <div className='w-fit'>
                        <h2 className='text-maroonText font-bold'>Warning</h2>
                        <p className='mt-1 text-maroonText font-light'>This action cannot be undone.</p>
                    </div>
                </div>

                <div className='text-sm flex w-fit mx-auto mt-6 gap-x-4'>
                    <div className='w-[8rem] h-fit py-[0.50rem] rounded-3xl bg-cancel text-white flex justify-center items-center cursor-pointer hover:opacity-70' onClick={close}>Cancel</div>
                    <div className='w-[8rem] h-fit py-[0.50rem] rounded-3xl bg-maroonText text-white flex justify-center items-center cursor-pointer gap-x-2 hover:bg-redNew transition-all ease-in-out duration-[0.2s]' onClick={handleDelete}>
                        <p>{debounce ? '...' : "Delete"}</p>
                        <FaTrashAlt />
                    </div>

                </div>

            </div>

            <div className="closer w-full h-full bg-[#D9D9D9] opacity-70 cursor-pointer absolute top-0" onClick={close}></div>

        </div>
    );
}

export default Delete;
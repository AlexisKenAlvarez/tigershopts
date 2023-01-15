import Link from 'next/link';
import { useRef, useState, useEffect } from 'react'
import Pending from './Pending';
import { FunctionComponent } from 'react'
import Completed from './Completed';

interface myprop {
    username: string
}

const Reservations: FunctionComponent<myprop> = (props) => {
    const { username } = props
    const [selected, setSelect] = useState("pending")
    
    const handleSelect = (text: string) => {
        setSelect(text)
    }
    return (
        <div className="text-2xl w-full h-full">
            <div className='flex w-fit text-md'>
                <p className='bg-zinc-200 w-full p-3 px-8 cursor-pointer' style={selected === 'pending' ? { opacity: "100%" } : { opacity: "50%" }}onClick={() => {handleSelect("pending")}}>Pending</p>
                <p className='bg-zinc-200 w-full p-3 px-8 cursor-pointer' style={selected === 'completed' ? { opacity: "100%" } : { opacity: "50%" }} onClick={() => {handleSelect("completed")}}>Completed</p>
            </div>
            {selected === 'pending' ? <Pending org={username}/> : <Completed org={username}/>}

        </div>
    );
}

export default Reservations;
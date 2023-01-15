import { FunctionComponent, useEffect, useState } from 'react';
import PendingTemplate from './PendingTemplate';

interface myprop {
    org: string
}

interface pending {
    amount: number
    contact: string
    createdAt: string
    facebook: string
    fullname: string
    org: string
    productName: string
    quantity: number
    studentno: string
    email: string
    _id: string
}



const Pending: FunctionComponent<myprop> = (props) => {
    const { org } = props
    const [data, setData] = useState<pending[]>([])
    const [refresh, setRefresh] = useState(false)
    const [done, setDone] = useState(false)


    useEffect(() => {
        fetch("/api/admin/getPending", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                org
            })
        }).then((response) => {
            return response.json()
        }).then((response) => {
            setData(response.data)
            setDone(true)
        })
    }, [refresh])

    const refreshFunc = () => {
        setRefresh(current => !current)
    }    

    return (
        <div className='w-full h-[90%] bg-zinc-200 p-10 overflow-y-scroll flex flex-col gap-y-10 pb-28'>
            
            {done ? data.length <= 0 ? <p className='text-center mt-28 opacity-50'>No pending orders yet</p> : null : null} 
            {data && data.map((items) => {
                return (
                    <PendingTemplate amount={items.amount} facebook={items.facebook} fullname={items.fullname} productName={items.productName} quantity={items.quantity} email={items.email} _id={items._id} contact={items.contact} refresh={refreshFunc} key={items._id}/>
                )
            })}

        </div>
    );
}

export default Pending;
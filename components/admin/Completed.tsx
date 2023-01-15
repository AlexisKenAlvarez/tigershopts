import { FunctionComponent, useEffect, useState } from 'react';
import CompletedTemplate from './CompletedTemplate';

interface myprop {
    org: string
}

interface pending {
    amount: number
    contact: string
    completedAt: string
    facebook: string
    fullName: string
    org: string
    productName: string
    quantity: number
    studentno: string
    email: string
    _id: string
}



const Completed: FunctionComponent<myprop> = (props) => {
    const { org } = props
    const [data, setData] = useState<pending[]>([])
    const [done, setDone] = useState(false)
    useEffect(() => {
        fetch("/api/admin/getCompleted", {
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
    }, [])

    return (
        <div className='w-full h-[90%] bg-zinc-200 p-10 overflow-y-scroll flex flex-col gap-y-10 pb-28'>
            {done ? data.length <= 0 ? <p className='text-center mt-28 opacity-50'>No completed orders yet</p> : null : null} 

            {data && data.map((items) => {
                return (
                    <CompletedTemplate amount={items.amount} facebook={items.facebook} fullName={items.fullName} productName={items.productName} quantity={items.quantity} email={items.email} _id={items._id} contact={items.contact} key={items._id}/>
                )
            })}

        </div>
    );
}

export default Completed;
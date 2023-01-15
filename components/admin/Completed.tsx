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
    fullname: string
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
        })
    }, [])

    return (
        <div className='w-full h-[90%] bg-zinc-200 p-10 overflow-y-scroll flex flex-col gap-y-10 pb-20'>
            {data && data.map((items) => {
                return (
                    <CompletedTemplate amount={items.amount} facebook={items.facebook} fullname={items.fullname} productName={items.productName} quantity={items.quantity} email={items.email} _id={items._id} contact={items.contact}/>
                )
            })}

        </div>
    );
}

export default Completed;
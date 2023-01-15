import { FunctionComponent } from "react";

interface pending {
    amount: number
    contact: string
    facebook: string
    fullname: string
    productName: string
    quantity: number
    email: string
    _id: string
}

const CompletedTemplate: FunctionComponent<pending> = (props) => {
    const { amount, facebook, fullname, productName, quantity, email, _id, contact } = props

    return (
        <div className=' bg-slate-300 flex flex-col sm:flex-row sm:justify-between' key={_id}>
            <div className='flex flex-col gap-y-1 p-4 text-[15px]'>
                <p className='font-semibold'>Email: <span className='font-normal break-words'>{email}</span></p>
                <p className='font-semibold'>Fullname: <span className='font-normal'>{fullname}</span></p>
                <p className='font-semibold'>Product: <span className='font-normal'>{productName}</span></p>
                <p className='font-semibold'>Contact: <span className='font-normal'>{contact}</span></p>

                <p className='font-semibold'>Amount: <span className='font-normal'>{amount}</span>
                    <span className='font-semibold'>
                        &nbsp; | &nbsp;Quantity: &nbsp;
                    </span>
                    <span className='font-normal'>
                        {quantity}
                    </span></p>

                <a target="_blank" href={facebook} className='font-semibold break-words'>
                    Facebook:&nbsp;
                    <span className='font-normal'>
                        {facebook}
                    </span>
                </a>

            </div>
        </div>
    );
}

export default CompletedTemplate;
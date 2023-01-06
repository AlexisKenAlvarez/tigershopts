import { FunctionComponent } from 'react'

interface myProp {
    name: String,
    onClick?: () => void,
    className?: String
}

const LongButton: FunctionComponent<myProp> = (props) => {
    const { name, onClick, className } = props

    const test = () => {
        console.log("text")
    }
    return (
        <div className={`w-full mt-6 rounded-lg flex items-center justify-center p-[1px] bg-greenButton hover:bg-white transition-all ease-in-out duration-300 ${className}`} onClick={onClick}>
            <div className="font-inter bg-greenButton text-white p-4 rounded-lg text-sm font-bold text-center hover:bg-greenHover cursor-pointer select-none w-full">
                <p className="tracking-wider lg:text-lg">
                    {name}
                </p>
            </div>
        </div >
    )
}

export default LongButton
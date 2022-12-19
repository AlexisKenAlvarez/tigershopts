
const ShortButton = (props) => {
    const { name, className, onClick } = props
    return (
        <div className={`mt-6 rounded-lg flex items-center justify-center p-[1px] bg-greenButton hover:bg-white transition-all ease-in-out duration-300 w-28 ${className}`} onClick={onClick}>
            <div className="font-inter bg-greenButton text-white p-3 rounded-lg text-sm font-bold text-center hover:bg-greenHover cursor-pointer select-none w-full">
                <p className="tracking-wider lg:text-md">
                    {name}
                </p>
            </div>
        </div >
    )
}

export default ShortButton
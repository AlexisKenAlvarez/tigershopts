
const BackButton = (props) => {
    const { name, className, onClick } = props
    return (
        <div className={`mt-6 rounded-lg flex items-center justify-center p-[1px] border-[1px] bg-white border-greenButton hover:bg-greenButton transition-all ease-in-out duration-300 w-28 ${className}`} onClick={onClick}>
            <div className="font-inter text-greenButton hover:text-white p-3 rounded-lg text-sm font-bold text-center cursor-pointer select-none w-full">
                <p className="tracking-wider lg:text-md">
                    {name}
                </p>
            </div>
        </div >
    )
}

export default BackButton
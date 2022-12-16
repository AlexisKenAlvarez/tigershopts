export default function FormInputLogin(props) {
    const { onChange, ...inputProps } = props
    return (
        <>
            <div className="mt-5">
                <label htmlFor={props.name} className="p-0 m-0 text-greenBg font-medium ml-1 capitalize">{props.label}: </label>

                <input {...inputProps} className="bg-inputBg w-full h-12 mx-auto block mt-2 outline-0 p-2 px-4 text-sm text-slate-700 rounded-md" autoComplete="off" onChange={onChange}></input>
            </div>

        </>


    )
}
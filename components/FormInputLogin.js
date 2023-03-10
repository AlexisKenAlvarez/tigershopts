export default function FormInputLogin(props) {
    const { error, onChange, ...inputProps } = props
    return (
        <>
            <div className="mt-5">
                <div className="flex justify-between">
                    <label htmlFor={props.name} className="p-0 m-0 text-greenBg font-medium ml-1 capitalize">{props.label}: </label>
                    {error[props.name] === '' || error[props.name === 0]? null :
                        <p className="text-xs mt-1 mr-1 text-redError">
                            {error[props.name]}
                        </p>
                    }

                </div>

                <input {...inputProps} className="bg-inputBg w-full h-12 mx-auto block mt-2 outline-0 p-2 px-4 text-sm text-slate-700 rounded-md" autoComplete="off" style={error[props.name] === '' ? {backgroundColor: '#e2f3e7'} : {backgroundColor: '#FCE3E4'}} onChange={onChange}></input>
            </div>

        </>


    )
}
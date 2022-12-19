import React from 'react'

const FormInputForgot = (props) => {
    const { error, onChange, text, ...val } = props
    return (
        <>
            <div className='flex justify-between'>
                <h1 className='mx-auto text-center text-greenSteps font-medium text-md mt-8 mb-3' style={error[props.name] === '' ? {} : {marginInline: "0"}}>{props.label}</h1>
                {error[props.name] === '' ? null : <p className='mt-9 text-xs text-redError'>{error[props.name]}</p>}
            </div>

            <input {...val} className="bg-inputBg w-full h-12 mx-auto block mt-0 outline-0 p-2 px-4 text-sm text-slate-700 rounded-md" autoComplete="off" onChange={onChange} style={error[props.name] === '' ? {} : { backgroundColor: '#FCE3E4' }}></input>
        </>

    )
}

export default FormInputForgot
import FormInput from '../FormInput'


const Page1 = (props) => {
    const { inputs, value, onChange, error } = props
    return (
        <>
            {inputs.map((val) => {
                return (
                    <FormInput key={val.id} {...val} value={value[val.name]} onChange={onChange} error={error}/>
                )
            })}
        </>
    )
}

export default Page1

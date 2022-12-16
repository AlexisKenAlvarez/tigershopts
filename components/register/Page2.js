import FormInput from "../FormInput"

const Page2 = (props) => {
    const { inputs, onChange, value, error } = props
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

export default Page2
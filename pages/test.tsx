import { useEffect } from "react"
import { Inputs } from "../types"


export const getServerSideProps = async () => {
    const inputData = [
        {
            id: 1,
            name: "email",
            label: "email",
            type: "text",
        },
        {
            id: 2,
            name: "password",
            label: "password",
            type: "password"
        }
    ]

    return {
        props: {
            inputData
        }
    }
}

export default function Test({inputData}: {inputData: Inputs}) {
    useEffect(() => {
        console.log(inputData)
    }, [])
    return (
        <>
            <h1>TEST</h1>
        </>
    )
}
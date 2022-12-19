import { GetServerSideProps, NextPage } from "next"

export const getServerSideProps: GetServerSideProps = async () => {
    return {
        redirect: {
            destination: '/404',
            permanent: false
        }
    }
}

const ResetIndex: NextPage = () => {
    return (
        <>

        </>
    )
}

export default ResetIndex
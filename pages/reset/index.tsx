import { GetServerSideProps, NextPage } from "next"

export const getServerSideProps: GetServerSideProps = async () => {
    return {
        redirect: {
            destination: '/404',
            permanent: false
        }
    }
}

const VerifiedIndex: NextPage = () => {
    return (
        <>

        </>
    )
}

export default VerifiedIndex
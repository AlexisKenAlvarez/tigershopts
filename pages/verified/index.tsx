import { GetServerSideProps, NextPage } from "next"
import Head from 'next/head';
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
            <Head>
                <title>Tigershop | Verified</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
        </>
    )
}

export default VerifiedIndex
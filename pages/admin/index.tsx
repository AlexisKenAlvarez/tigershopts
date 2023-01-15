import { NextPage } from "next";
import Head from 'next/head';
import { GetServerSideProps } from 'next';


export const getServerSideProps: GetServerSideProps = async (ctx) => {

    return {
        redirect: {
            destination: '/admin/products',
            permanent: false
        }
    }
}

const Index: NextPage = () => {
    return (
        <>
            <Head>
                <title>Tigershop | Admin</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
        </>
    );
}

export default Index;
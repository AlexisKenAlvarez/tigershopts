import { NextPage } from "next";

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
        </>
    );
}
    
export default Index;
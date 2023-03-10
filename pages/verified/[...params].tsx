import { GetServerSideProps, NextPage } from "next"
import { VerifyQuery } from "../../types"
import { PrismaClient } from '@prisma/client'
import Image from "next/image"
import Link from "next/link";
import LongButton from "../../components/LongButton";
import { useEffect } from 'react'
import Head from 'next/head';

export const getServerSideProps: GetServerSideProps = async (context) => {

  const prisma = new PrismaClient()

  const { params = [] } = context.query
  const email = params[0]
  const token = params[1]

  const isValid = await prisma.tokens.findMany({
    where: {
      email: email,
      token: token
    }
  })

  if (isValid.length > 0) {
    console.log("token does exist");

    const update = await prisma.users.updateMany({
      where: {
        email: email,
      },
      data: {
        verified: true
      }
    })

    const deleteUser = await prisma.tokens.deleteMany({
      where: {
        email: email,
      },
    })

    return {
      props: {
        verified: true
      }
    }


  } else {
    console.log("token does not exist");
    return {
      redirect: {
        destination: '/404',
        permanent: false
      }
    }
  }
}


const Verified: NextPage<VerifyQuery> = (props) => {

  useEffect(() => {
    const email = sessionStorage.getItem('sent');

    if (email) {
      sessionStorage.removeItem("sent");
    }


  }, [])

  return (
    <>
      <Head>
        <title>Tigershop | Verified</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="w-full flex justify-center items-center font-inter h-screen bg-white">
        <div className="h-auto w-fit flex flex-col justify-center items-center px-7">
          <Image src="/logo.webp" alt="Logo" width='200' height='20' className="w-24 mx-auto mt-16" unoptimized={true} />

          <h1 className="mt-10 text-greenButton text-2xl font-extrabold text-center">Your email has been verified</h1>
          <p className="text-center text-sm mt-2 max-w-[400px]">Congratulations! Your account email address has been successfully confirmed.</p>
          <div className="w-64">
            <Link href="/login">
              <LongButton name="Redirect to login" />
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Verified

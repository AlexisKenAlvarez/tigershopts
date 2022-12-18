import { GetServerSideProps, NextPage } from "next"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { VerifyQuery } from "../../types"
import { PrismaClient } from '@prisma/client'

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
      props: {
        verified: false
      }
    }
  }
}


const Verified: NextPage<VerifyQuery> = (props) => {

  return (
    <>
      {props.verified ? <h1>Your account has been verified</h1> : <h1>404: Not found</h1>}
    </>
  )
}

export default Verified

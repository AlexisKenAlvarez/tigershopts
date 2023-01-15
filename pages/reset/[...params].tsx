import { GetServerSideProps, NextPage } from "next"
import { PrismaClient } from '@prisma/client'
import Image from "next/image"
import Link from "next/link";
import LongButton from "../../components/LongButton";
import FormInputForgot from '../../components/FormInputForgot'
import { useState, useEffect } from 'react'
import Router from 'next/router';
import Head from 'next/head';


export const getServerSideProps: GetServerSideProps = async (context) => {

  const prisma = new PrismaClient()

  const { params = [] } = context.query
  const email = params[0]
  const token = params[1]

  const isValid = await prisma.pass.findMany({
    where: {
      email: email,
      token: token
    }
  })

  if (isValid.length > 0) {
    console.log("token does exist");

    return {
      props: {
        valid: true,
        email
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

interface myProp {
  valid: boolean,
  email: string
}

interface ValuesInterface {
  password: string,
  confirmpassword: string
}

const Reset: NextPage<myProp> = ({ valid, email }) => {

  const [values, setValues] = useState({
    password: '',
    confirmpassword: ''
  })

  const [error, setError] = useState({
    password: '',
    confirmpassword: ''
  })

  const inputs = [
    {
      id: '1',
      name: 'password',
      label: 'Enter your new password',
      type: 'password'
    },
    {
      id: '2',
      name: 'confirmpassword',
      label: 'Confirm password',
      type: 'password'
    },

  ]

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues(current => ({ ...current, [e.target.name]: e.target.value }))
  }

  const [check1, setCheck1] = useState(false)
  const [check2, setCheck2] = useState(false)
  const [toggle, setToggle] = useState(false)

  const handleSubmit = () => {
    if (values.password === '') {
      setError(current => ({ ...current, password: 'Cannot be empty' }))
      setCheck1(false)
    } else if (values.password.length <= 3) {
      setError(current => ({ ...current, password: 'Too weak' }))
      setCheck1(false)

    } else if (values.password.length > 15) {
      setError(current => ({ ...current, password: 'Too long' }))
      setCheck1(false)

    } else {
      setError(current => ({ ...current, password: '' }))
      setCheck1(true)

    }

    if (values.confirmpassword === '') {
      setError(current => ({ ...current, confirmpassword: 'Cannot be empty' }))
      setCheck2(false)
    }
    else if (values.confirmpassword.localeCompare(values.password) !== 0) {
      setError(current => ({ ...current, confirmpassword: 'Does not match' }))
      setCheck2(false)
    } else {
      setError(current => ({ ...current, confirmpassword: '' }))
      setCheck2(true)
    }

    setToggle(current => !current)
  }

  const [debounce, setDebounce] = useState(false)

  useEffect(() => {


    if (check1 && check2) {
      if (!debounce) {
        setDebounce(true)
        fetch("/api/resetpassword", {
          method: "post",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email: email, password: values.password })
        }).then((response) => {
          return response.json()
        }).then((response) => {
          if (response.success) {
            setDebounce(false)
            Router.push("/login")
            sessionStorage.removeItem("password");
          } else {
            setDebounce(true)
            console.log("There was an error");

          }
        })
      }
    }
  }, [toggle])



  return (
    <>
      <Head>
        <title>Tigershop | Reset</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="main-bg font-inter h-screen flex justify-center items-center">
        <div className="bg-orangeBg h-screen w-full fixed top-0 z-[-2]">
          <Image src="/cvsu.png" alt="CvSU" fill></Image>
        </div>

        <div className="bg-white h-screen w-full fixed top-0 z-[-1] lg:hidden"></div>

        <div className="bg-white h-screen w-full p-0 mt-0 lg:h-[60%] lg:min-h-[450px] lg:max-h-[470px] lg:w-[37%] lg:max-w-[800px] mx-auto lg:rounded-3xl relative shadow-customBorder z-2">
          <Image src="/logo.webp" alt="Logo" width='200' height='20' className="w-24 mx-auto mt-10 lg:mt-[-2.5rem]" unoptimized={true} />


          <div className='max-w-[350px] w-[75%] mx-auto'>

            {inputs.map(val => {
              return (
                <FormInputForgot key={val.id} {...val} value={values[val.name as keyof ValuesInterface]} onChange={onChange} error={error} />
              )
            })}

            <LongButton name={debounce ? 'Processing...' : 'Confirm'} onClick={handleSubmit} />


            <div className='w-fit mx-auto'>
              <Link href="/login" className='w-fit'>
                <p className='mt-5 font-bold text-greenButton text-center text-[15px] hover:text-[16px] transition-all ease-in-out'>Back to Login</p>
              </Link>
            </div>

          </div>

        </div>
      </div>
    </>
  )
}

export default Reset

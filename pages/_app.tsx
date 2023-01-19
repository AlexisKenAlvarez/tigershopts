import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AnimatePresence, motion } from 'framer-motion'
import Router, { useRouter } from 'next/router';
import Loader from '../components/Hero/Loader';
import { useState, useEffect } from 'react'
import Head from 'next/head';
import NProgress from "nprogress"

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const [active, setActive] = useState(true)
  const [scroll, setScroll] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setActive(false)
    }, 3000);
  }, [])

  useEffect(() => {
    activeScroll()
  }, [scroll])

  const activeScroll = () => {
    setTimeout(() => {
      setScroll(true)
    }, 3000);
  }

  NProgress.configure({ showSpinner: false });

  Router.events.on("routeChangeStart", (url) => {
    NProgress.start()
  })

  Router.events.on("routeChangeComplete", (url) => {
    NProgress.done()

  })

  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css" integrity="sha512-42kB9yDlYiCEfx2xVwq0q7hT4uf26FUgSIZBK8uiaEnTdShXjwr8Ip1V4xGJMg3mHkUt9nNuTDxunHF0/EgxLQ==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      </Head>
      <div className={`${scroll ? 'overflow-auto  w-full h-auto bg-greenBg' : 'overflow-hidden h-screen bg-greenBg'}`} >

        <AnimatePresence mode="wait">

          <motion.div className="overflow-x-hidden w-full h-auto bg-topog dark:bg-black min-h-[100vh]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} key={router.route}>

            {/* {active ? <Loader key="LOADER" /> : <Component {...pageProps} key="component" />} */}

            <Component {...pageProps} key="component" />
          </motion.div>
        </AnimatePresence>
      </div>

    </>
  )
}
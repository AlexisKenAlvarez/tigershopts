import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/router';
import Loader from '../components/Hero/Loader';
import { useState, useEffect } from 'react'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const [active, setActive] = useState(true)
  const [scroll, setScroll] = useState(false)

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

  return (
    <>
      <div className={`${scroll ? 'overflow-auto w-full h-auto bg-greenBg' : 'overflow-hidden h-screen bg-greenBg'}`}>

        <AnimatePresence mode="wait">

          <motion.div className="overflow-x-hidden w-full h-auto bg-topog dark:bg-black min-h-[100vh]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} key={router.route}>

            {active ? <Loader key="LOADER" /> : <Component {...pageProps} key="component" />}


          </motion.div>
        </AnimatePresence>
      </div>

    </>
  )
}
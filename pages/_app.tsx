import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/router';
import Loader from '../components/Hero/Loader';
import { useState, useEffect } from 'react'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const [active, setActive] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setActive(false)
    }, 3000);
  }, [])

  return (
    <>
      <div className='w-full h-auto bg-greenBg'>

        <AnimatePresence mode="wait" >

          <motion.div className="overflow-x-hidden w-full h-auto bg-topog dark:bg-black min-h-[100vh]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} key={router.route}>
            <AnimatePresence>
              {active ? <Loader key="LOADER" /> : null}
            </AnimatePresence>
            <div>
              <Component {...pageProps} />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

    </>
  )
}

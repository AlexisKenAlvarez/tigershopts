import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AnimatePresence, motion } from 'framer-motion'
import {useRouter} from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  return (
    <>
      <AnimatePresence mode="wait" >
        <motion.div className="overflow-x-hidden w-full h-auto bg-topog dark:bg-black min-h-[100vh]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} key={router.route}>
          <div>
            <Component {...pageProps}/>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  )
}

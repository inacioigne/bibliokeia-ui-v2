import "../styles/globals.css";
import "nprogress/nprogress.css";
import NProgress from 'nprogress'
import { useRouter } from 'next/router'
import { AuthProvider } from "src/auth/authContext";
import { useEffect } from 'react'


function MyApp({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    const handleStart = (url) => {
      console.log(`Loading: ${url}`)
      NProgress.start()
    }
    const handleStop = () => {
      NProgress.done()
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleStop)
    router.events.on('routeChangeError', handleStop)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleStop)
      router.events.off('routeChangeError', handleStop)
    }
  }, [router])

  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(

      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
  );
}

export default MyApp;

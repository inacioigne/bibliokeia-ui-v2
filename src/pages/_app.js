import '../styles/globals.css'
import Layout from "src/admin/layout"
import {AuthProvider } from "src/auth/authContext"





function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)

  return getLayout(
    <AuthProvider>
      <Component {...pageProps} />

    </AuthProvider>

  )
  
}

export default MyApp

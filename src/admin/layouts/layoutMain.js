import { AuthProvider } from "src/auth/authContext"



export default function Layout({ children }) {
    return (
       <AuthProvider>
           <main>{children}</main>

       </AuthProvider> 
    )
}
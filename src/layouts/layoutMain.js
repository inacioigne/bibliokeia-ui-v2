import { AuthProvider } from "src/admin/auth/authContext"



export default function Layout({ children }) {
    return (
       <AuthProvider>
           <main>{children}</main>

       </AuthProvider> 
    )
}
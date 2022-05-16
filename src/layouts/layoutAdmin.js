import Navbar from "src/admin/components/navbar"

export default function Layout({ children }) {
    return (
        <>
        <Navbar />
        <main>{children}</main>

        </>
    )
}
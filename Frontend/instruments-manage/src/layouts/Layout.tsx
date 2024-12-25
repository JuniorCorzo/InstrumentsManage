import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"
import { ReactNode } from "react"

interface LayoutProps {
    children: ReactNode
}

const Layout = ({children}: LayoutProps) =>{
  return (
    <>
        <Navbar/>
        <main className="grid grid-flow-col grid-cols-[14rem,1fr]">
            <Sidebar/>
            {children}
        </main>
    </>
  )
}

export default Layout
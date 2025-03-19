import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Navbar />
      <main className="w-screen grid grid-flow-col grid-cols-[minmax(14rem,auto)_1fr]">
        <Sidebar />
        {children}
      </main>
    </>
  );
};

export default Layout;

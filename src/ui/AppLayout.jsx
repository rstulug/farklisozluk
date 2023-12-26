import { Outlet, useOutlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Dashboard from "../features/dashboard/Dashboard";
import Footer from "./Footer";

function AppLayout() {
  const outlet = useOutlet();

  return (
    <div className=" relative m-0 min-h-screen bg-[#b1c9cabe] font-[Consolas] dark:bg-[#2b2b31c7] dark:text-slate-300">
      <div className=" mx-auto flex  w-full flex-col md:max-w-7xl">
        <div className=" left-0 top-0  mb-0 h-auto  w-full border-b-2  border-b-gray-500 pb-2 ">
          <Header />
        </div>
        <div className="flex">
          <div className="hidden w-2/12 overflow-auto sm:block">
            <Sidebar />
          </div>
          <div className="mb-16 w-full md:w-7/12">
            {outlet ? <Outlet /> : <Dashboard />}
          </div>
          <div className="mx-auto hidden justify-center sm:flex">
            Reklamlar burada yer alacak
          </div>
        </div>
        <div className="fixed bottom-0 left-0 flex h-10 w-full items-center justify-center border-t-2 border-gray-500 bg-stone-200">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default AppLayout;

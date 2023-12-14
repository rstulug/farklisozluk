import { Outlet, useOutlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Dashboard from "../features/dashboard/Dashboard";
import Footer from "./Footer";

function AppLayout() {
  const outlet = useOutlet();

  return (
    <div className=" relative m-0 min-h-screen bg-stone-200">
      <div className=" mx-auto flex  w-full flex-col md:max-w-7xl">
        <div className="left-0 top-0 mb-2 h-14 w-full  border-b-2 border-b-gray-500  pb-20 ">
          <Header />
        </div>
        <div className="flex">
          <div className="hidden w-1/6 overflow-auto border-r-2 sm:block">
            <Sidebar />
          </div>
          <div className="mb-16 w-5/6">
            {outlet ? <Outlet /> : <Dashboard />}
          </div>
        </div>
        <div className="sticky bottom-0 left-0 flex h-10 w-full items-center justify-center border-t-2 border-gray-500 bg-stone-200">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default AppLayout;

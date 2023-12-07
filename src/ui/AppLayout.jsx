import { Outlet, useOutlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Dashboard from "../features/dashboard/Dashboard";
import Footer from "./Footer";

function AppLayout() {
  const outlet = useOutlet();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto w-full md:max-w-7xl">
        <div className="mb-2 mt-2 h-12 w-full border-b-2 pb-16">
          <Header />
        </div>
        <div className="relative flex">
          <div className="hidden w-1/6 border-r-2 sm:block">
            <Sidebar />
          </div>
          <div className="w-5/6">{outlet ? <Outlet /> : <Dashboard />}</div>
        </div>
        <div className=" absolute bottom-0  left-0 flex h-20 w-full items-center justify-center bg-gray-200">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default AppLayout;

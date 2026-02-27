import { Outlet } from "react-router";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Main = () => {
  return (
    <div className="flex-1 pl-[250px] 2xl:pl-[280px] max-w-[1920px] mx-auto">
      <Sidebar />
      <div>
        <Header className="sticky top-0 z-10 p-4 bg-white" />
        <div className="p-4 pt-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Main;

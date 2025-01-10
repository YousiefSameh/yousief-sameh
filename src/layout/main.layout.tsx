import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const MainLayout = () => {
  return (
    <main className="bg-background-color h-screen text-white">
      <div className="container mx-auto flex flex-col sm:items-start items-center sm:flex-row justify-between py-[50px]">
        <Header />
        <div className="wrapper w-[70%]">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default MainLayout;
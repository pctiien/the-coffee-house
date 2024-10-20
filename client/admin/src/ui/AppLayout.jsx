import Header from "./Header";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
    return (
        <div className=" flex h-screen ">
            <NavBar />
            <div className="flex-1 flex flex-col ">
                <Header />
                <div className=" bg-slate-100 overflow-auto h-full">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AppLayout;

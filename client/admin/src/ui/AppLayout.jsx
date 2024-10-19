import Header from "./Header";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
    return (
        <div className=" flex h-screen  overflow-auto">
            <NavBar />
            <div className="flex-1 flex flex-col ">
                <Header />
                <div className=" bg-slate-100 overflow-auto">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AppLayout;

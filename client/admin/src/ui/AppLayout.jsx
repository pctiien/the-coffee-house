import Header from "./Header";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
    return (
        <div className="layout flex h-screen">
            <NavBar />
            <div className="flex-1 flex flex-col">
                <Header />
                <div className="flex-1 overflow-auto bg-slate-100">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AppLayout;

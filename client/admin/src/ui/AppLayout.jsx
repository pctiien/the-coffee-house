import Header from "./Header"
import NavBar from "./NavBar"
import {Outlet} from "react-router-dom"
const AppLayout = ()=>{
    return (
        <>
        <Header/>
        <Outlet/>
        <NavBar/>
        </>
    )
}
export default AppLayout 
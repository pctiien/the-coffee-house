import React from 'react'
import Login from '../pages/Auth/Login'
import {useAuth} from '../utils/hooks/useAuth'
const Header = () => {

    const Auth = useAuth()

    const [openLogin,setOpenLogin] = React.useState(false)
    const handleCloseDialog = ()=>{
        setOpenLogin(false)
    }
    const handleOpenDialog = ()=>{
        setOpenLogin(true)
    }
    const [openDropDown,setOpenDropDown] = React.useState(false)
    const handleOpenDropDown = (e)=>{
        e.preventDefault()
        e.stopPropagation()
        setOpenDropDown(!openDropDown)
    }
    const handleLogout = ()=>{
        Auth.userLogout()
        setOpenLogin(false)
    }

    return (
        <div className="w-full px-8">
            <div className="p-3 w-full flex justify-between gap-5 items-center">
                <div className='flex border p-3 rounded-xl justify-between flex-1'>
                    <input type="text" placeholder="Search here" />
                    <img className='w-6 h-6' src='/search.png' alt="" />
                </div>
                <div className='w-10 h-10 flex rounded-full bg-gray-200 justify-center items-center'>
                    <img className='w-6 h-6' src="/dark-mode.png" alt="" />
                </div>
                <div className='w-10 h-10 flex rounded-full bg-gray-200 justify-center items-center'>
                    <img className='w-6 h-6' src="/notification.png" alt="" />
                </div>
                <div 
                onClick ={handleOpenDropDown}
                className='flex items-center justify-center relative'>
                    <div className='cursor-pointer w-10 h-10 flex rounded-full bg-gray-200 justify-center items-center'>
                        <img className='w-full p-1 ' src="/avatar.png" alt="" />
                    </div>
                    <div className='p-2'>
                        <h1>{Auth.getUser()?.name}</h1>
                        <p>{Auth.getUser()?.phone}</p>
                    </div>
                    <div 
                    className ={`w-max bg-white flex flex-col gap-3  text-gray-500  rounded-lg shadow-lg p-3 absolute top-full ${openDropDown ?'visible' : 'hidden'}`}>
                        
                        <div 
                        onClick = {handleOpenDialog}
                        className={` cursor-pointer flex px-5 gap-2 ${Auth.getUser() ?'hidden' : 'visible'}  `}>
                            
                            <img 
                            className='w-6 rotate-180 '
                            src="./login.png" alt="" />
                            <h1>Login</h1>
                        </div>
                        <div 
                        onClick={handleLogout}
                        className={`cursor-pointer flex px-5 gap-2 ${Auth.getUser() ?'visible' : 'hidden'}  `}>
                            
                            <img 
                            className='w-6  '
                            src="./login.png" alt="" />
                            <h1>Logout</h1>
                        </div>
                    </div>
                </div>
            </div>
            <Login isOpen={openLogin} onClose = {handleCloseDialog}/>
        </div>
    );
};

export default Header;

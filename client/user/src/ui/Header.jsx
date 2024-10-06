import React from 'react';
import { Link } from 'react-router-dom';
import VoucherList from '../pages/voucher/VoucherList';
import {useSelector} from 'react-redux'
import Login from '../pages/auth/Login'
import {useAuth} from '../utils/hooks/useAuth'
const Header = ()=>{

    const Auth = useAuth()
    
    const cartSize = useSelector((state)=>state.cart.items.reduce((acc,item)=>acc+=item.quantity,0))
    const [openDropDown,setOpenDropDown] = React.useState(false)
    const handleOpenDropDown = (e)=>{
        e.preventDefault()
        e.stopPropagation()
        setOpenDropDown(!openDropDown)
    }
    const [activeItem, setActiveItem] = React.useState('')

    const [openDialog,setOpenDialog] = React.useState(false)

    const [openLoginDialog,setOpenLoginDialog] = React.useState(false)
    const handleClick = (item)=>{
        setActiveItem(item)
    }
    const handleCloseDialog = ()=>{
        setOpenDialog(false)
    }
    const handleCloseLoginDialog = ()=>{
        setOpenLoginDialog(false)
    }
    const handleShowLoginDialog = ()=>{
        setOpenLoginDialog(true)

    }
    
    const handleLogout = ()=>{
        Auth.userLogout()
        console.log(Auth.getUser())
        setOpenLoginDialog(false)
    }



    return (
        <>
            <div className="flex bg-orange-400 h-20 justify-between py-5 px-32 items-center fixed top-0 left-0 w-full z-10">
                <div className ="text-white text-sm font-semibold flex items-center  ">
                    <Link 
                    to="/" >
                        <img 
                        className = "h-4 w-auto"
                        src="./logo.png" alt="" />
                    </Link>
                </div>
                <div className = "flex gap-6 flex-1 justify-center ">

                    <div onClick={()=>handleClick("coffee")} className ={`text-white text-sm font-semibold py-1 border-b-2 border-transparent hover:border-white transition duration-500 ${activeItem === 'coffee' ? 'border-white border-b-2': ''} `}>
                        <Link to="/coffee">Coffee</Link>
                    </div>

                    <div onClick={()=>handleClick("news")} className ={`text-white text-sm font-semibold py-1 border-b-2 border-transparent hover:border-white transition duration-500 ${activeItem === 'news' ? 'border-white border-b-2': ''} `}>
                        <Link to="/news">News</Link>
                    </div>

                    <div onClick={()=>handleClick("store")} className ={`text-white text-sm font-semibold py-1 border-b-2 border-transparent hover:border-white transition duration-500 ${activeItem === 'store' ? 'border-white border-b-2': ''} `}>
                        <Link to="/stores">Store</Link>
                    </div>

                    <div onClick={setOpenDialog} className ={`text-white text-sm font-semibold py-1 border-b-2 border-transparent hover:border-white transition duration-500 ${activeItem === 'voucher' ? 'border-white border-b-2': ''} `}>
                        <h1 className=' cursor-pointer'>Voucher</h1>    
                    
                    </div>

                    <div onClick={()=>handleClick("recruit")} className ={`text-white text-sm font-semibold py-1 border-b-2 border-transparent hover:border-white transition duration-500 ${activeItem === 'recruit' ? 'border-white border-b-2': ''} `}>
                        <Link to="/recruit">Recruit</Link>
                    </div>
                    
                </div>

                <div className = "flex gap-4 ">

                    <div 
                    onClick = {handleOpenDropDown}
                    className ="cursor-pointer text-white text-sm font-semibold relative">
                        <img 
                            className = "w-10 h-10"
                            src="./user.png" alt="" />
                        <div className ={`w-max bg-white flex flex-col gap-3  text-gray-500  rounded-lg shadow-lg p-3 absolute ${openDropDown ?'visible' : 'hidden'}`}>
                            <div>
                                <h1>{Auth.getUser()?.name}</h1>
                                <h1>{Auth.getUser()?.phone}</h1>

                            </div>
                            <div 
                            onClick = {handleShowLoginDialog}
                            className={`flex px-5 gap-2 ${Auth.getUser() ?'hidden' : 'visible'}  `}>
                            
                                <img 
                                className='w-4 rotate-180 '
                                src="./login.png" alt="" />
                                <h1>Login</h1>
                            </div>
                            <div 
                            onClick={handleLogout}
                            className={` flex px-5 gap-2 ${Auth.getUser() ?'visible' : 'hidden'}  `}>
                            
                                <img 
                                className='w-4  '
                                src="./login.png" alt="" />
                                <h1>Logout</h1>
                            </div>
                        </div>
                    </div>

                    <div className ="relative text-white text-sm font-semibold bg-white rounded-full">
                        <Link 
                            to="/checkout" >
                            <img 
                            className = "w-10 h-10 p-2"
                            src="./cart.png" alt="" />
                            <div className='w-4 h-4 text-xs absolute top-0 right-0 bg-red-500 rounded-full text-center'>{cartSize}</div>
                        </Link>
                    </div>
                </div>
            
            </div>
        <VoucherList isOpen ={openDialog} onClose ={handleCloseDialog}/>
        <Login isOpen ={openLoginDialog} onClose ={handleCloseLoginDialog}/>

        </>
    )
}
export default Header 
import React from 'react';
import { Link } from 'react-router-dom';

const Header = ()=>{
    const [activeItem, setActiveItem] = React.useState('')

    const handleClick = (item)=>{
        setActiveItem(item)
    }
    return (
        <>
            <div className = "flex bg-orange-400 justify-between py-5 px-32  items-center">
                <div onClick className ="text-white text-sm font-semibold flex items-center  ">
                    <a 
                    href="/" >
                        <img 
                        className = "h-4 w-auto"
                        src="./logo.png" alt="" />
                    </a>
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

                    <div onClick={()=>handleClick("voucher")} className ={`text-white text-sm font-semibold py-1 border-b-2 border-transparent hover:border-white transition duration-500 ${activeItem === 'voucher' ? 'border-white border-b-2': ''} `}>
                        <Link to="/">Voucher</Link>
                    </div>

                    <div onClick={()=>handleClick("recruit")} className ={`text-white text-sm font-semibold py-1 border-b-2 border-transparent hover:border-white transition duration-500 ${activeItem === 'recruit' ? 'border-white border-b-2': ''} `}>
                        <Link to="/recruit">Recruit</Link>
                    </div>
                    
                </div>

                <div className = "flex gap-4 ">

                    <div className ="text-white text-sm font-semibold">
                        <a 
                        href="/" >
                            <img 
                            className = "w-10 h-10"
                            src="./user.png" alt="" />
                        </a>
                    </div>

                    <div className ="text-white text-sm font-semibold bg-white rounded-full">
                        <a 
                        href="/" >
                            <img 
                            className = "w-10 h-10 p-2"
                            src="./cart.png" alt="" />
                        </a>
                    </div>
                </div>
            
            </div>
        </>
    )
}
export default Header 
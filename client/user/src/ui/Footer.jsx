import React from 'react'
const Footer = ()=>{

    const [isOpen,setIsOpen] = React.useState(
        {
            'home':false,
            'terms-of-use':false,
            'hotline':false,
            'contact':false
        }
    )
    const handleClick = (item)=>{
        setIsOpen((prev)=>({
            ...prev,[item]:!prev[item]
        }))
    }

    return (
        <>
        <div 
        style={{backgroundSize:'cover',backgroundPosition: 'center', backgroundImage: "url('https://grannyshaffers.com//wp-content/uploads/2019/09/expresso-roasted-beans.jpg')"}}
        className="mt-20">
            <div         
            className="flex text-white text-sm justify-between gap-5 p-16 px-36">

                <div className=" w-1/5">
                <img 
                    className="w-32 opacity-70"
                    src="https://brasol.vn/wp-content/uploads/2022/09/logo-the-coffee-house.png" alt="" />
                </div>

                <div className=" w-1/5 h-max border-b border-gray-400 pb-4">
                    <span 
                    onClick={()=>handleClick('home')}
                    className=" cursor-pointer font-medium flex gap-2 pb-1"><p>{isOpen.home? '-':'+'}</p><p>Home</p></span>
                    <ul
                    className={` list-disc px-6 transition-all duration-500 ease-in-out ${isOpen.home ? 'max-h-96 opacity-100 transform translate-y-0' : 'max-h-0 opacity-0 transform -translate-y-4 overflow-hidden'}`}>
                        <li>Home</li>
                        <li>Order</li>
                        <li>News</li>
                        <li>Recruitment</li>
                        <li>Promotion</li>
                    </ul>
                </div>

                <div className=" w-1/5 h-max border-b border-gray-400 pb-4">
                    <span 
                    onClick={()=>handleClick('terms-of-use')}
                    className="cursor-pointer font-medium flex gap-2 pb-1"><p>{isOpen['terms-of-use']? '-':'+'}</p><p>Terms of Use</p></span>
                    <ul 
                        className={`list-disc px-6 transition-all duration-500 ease-in-out ${isOpen['terms-of-use'] ? 'max-h-96 opacity-100 transform translate-y-0' : 'max-h-0 opacity-0 transform -translate-y-4 overflow-hidden'}`}>
                        <li>Website rules</li>
                        <li>Information Security</li>
                        <li>Instructions for issuing VAT invoices</li>
                    </ul>
                </div>

                <div className="w-1/5 h-max border-b border-gray-400 pb-4">
                    <span
                        onClick={() => handleClick('hotline')}
                        className="font-medium flex gap-2 pb-1 cursor-pointer">
                        <p>{isOpen.hotline ? '-' : '+'}</p>
                        <p>Hotline</p>
                    </span>
                    <ul 
                        className={`list-disc px-6 transition-all duration-500 ease-in-out ${isOpen.hotline ? 'max-h-96 opacity-100 transform translate-y-0' : 'max-h-0 opacity-0 transform -translate-y-4 overflow-hidden'}`}>
                       <li>Support 028.71.087.088 (07:00-21:00)</li>
                       <li>Order 1800 6936 (07:00-20:30)</li>

                    </ul>
                </div>

                <div className=" w-1/5 h-max border-b border-gray-400 pb-4">
                    <span 
                    onClick={()=>handleClick('contact')}
                    className="cursor-pointer font-medium flex gap-2 pb-1"><p>{isOpen.contact? '-':'+'}</p><p>Contact</p></span>
                    <ul 
                    className={` list-disc px-6 transition-all duration-500 ease-in-out ${isOpen.contact ? 'max-h-96 opacity-100 transform translate-y-0' : 'max-h-0 opacity-0 transform -translate-y-4 overflow-hidden'}`}>
                        <li>Head Office 1: 86 - 88 Cao Thang, Ward 4, District 3, Ho Chi Minh, Vietnam. Head Office 2: Floor 3 & 4 The Hub Building - 195/10E Dien Bien Phu, Ward 15, Binh Thanh District, Ho Chi Minh, Vietnam. +842871 078 079 hi@thecoffeehouse.vn</li>
                        <li>+842871 078 079</li>
                        <li>hi@thecoffeehouse.vn</li>
                    </ul>
                </div>

            </div>
        </div>
        </>
    )
}
export default Footer
import React from 'react'
import {Link} from 'react-router-dom'
import { useNavBarItemContext } from '../../context/NavBarItemContext' 

const NavBarItem = ({isOpen,title,imgSrc,subItems})=>{

    const { selectedItem, setSelectedItem } = useNavBarItemContext(); 

    const handleClick = (e,index)=>{
        e.stopPropagation()
        setSelectedItem(index)
    }

    return (
        <>
            <div className='' >
                <div className={`cursor-pointer flex gap-2 px-2 rounded-xl  py-3 items-center group ${isOpen ? 'bg-blue-100 text-blue-600' :''}`}>
                    <img className="w-6 h-6 group-hover:text-blue-600" src={imgSrc} alt="" />
                    <h1 className=" group-hover:text-blue-600 text-sm overflow-x-hidden  max-sm:hidden  ">{title}</h1>
                </div>
                <div className = {` ${ isOpen ? 'opacity-100 visible' : 'hidden'} max-sm:hidden `}>
                <ul className='list-disc list-inside p-2 '>
                    {
                        subItems?.map((item, index) => {
                            return (
                                <li 
                                    onClick={(e) => handleClick(e, index)}
                                    key={index}
                                    className={`p-1 text-xs md:text-sm cursor-pointer hover:text-blue-400 ${selectedItem === index ? 'text-blue-400' : 'text-gray-500'}`}>
                                    <Link to={item.ref}>
                                        {item.title}
                                    </Link>
                                </li>
                            );
                        })
                    }
                </ul>

                </div>
            </div>
        </>
    )
}
export default NavBarItem
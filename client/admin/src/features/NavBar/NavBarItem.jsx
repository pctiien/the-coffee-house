import React from 'react'

const NavBarItem = ({isOpen,title,imgSrc,subItems})=>{

    const [selectedItem,setSelectedItem] = React.useState(null)
    
    const handleClick = (e,index)=>{
        e.stopPropagation()
        setSelectedItem(index)
    }

    return (
        <>
            <div>
                <div className=" cursor-pointer flex gap-2 items-center group ">
                    <img className="w-6 h-6 group-hover:text-blue-600" src={imgSrc} alt="" />
                    <h1 className="group-hover:text-blue-600 text-base">{title}</h1>
                </div>
                <div className = {` ${ isOpen ? 'opacity-100 visible' : 'hidden'}`}>
                    <ul className = 'list-disc list-inside p-2'>
                        {
                            subItems?.map((item,index)=>{
                                return (
                                    <li 
                                    onClick={(e) => handleClick(e,index)}
                                    key={index} className={`p-1 cursor-pointer hover:text-blue-400 text-base ${selectedItem === index ? 'text-blue-400': ''}`}>{item.title}</li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </>
    )
}
export default NavBarItem
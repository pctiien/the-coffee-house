const NavBarItem = ({title,imgSrc,subItem})=>{
    return (
        <>
            <div className=" cursor-pointer flex gap-2 items-center group ">
                <img className="w-6 h-6 group-hover:text-blue-600" src={imgSrc} alt="" />
                <h1 className="group-hover:text-blue-600">{title}</h1>
            </div>
        </>
    )
}
export default NavBarItem
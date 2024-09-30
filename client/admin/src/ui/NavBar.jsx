import NavBarItem from '../features/NavBar/NavBarItem'

const NavBar = () => {
    return (
        <div className="p-10 shadow-2xl w-1/6 h-screen ">
            <div className="flex flex-col gap-5 text-sm font-semibold justify-center">
                <h1 className='uppercase text-gray-400 font-semibold text-sm'>All pages</h1>
                <NavBarItem title ='Product' imgSrc = './cart.png' subItem= {[]}/>
                <NavBarItem title ='Category' imgSrc = './category.png' subItem= {[]}/>
                <NavBarItem title ='Order' imgSrc = './order.png' subItem= {[]}/>
                <NavBarItem title ='User' imgSrc = './user.png' subItem= {[]}/>

            </div>
        </div>
    );
};

export default NavBar;

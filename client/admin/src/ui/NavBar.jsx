import NavBarItem from '../features/NavBar/NavBarItem'
import React from 'react'
const NavBar = () => {

    const [navState, setNavState] = React.useState([
        {
            title: 'Product',
            icon: './cart.png',
            subItems: [
                {
                    id: 1,
                    title: 'Add Product',
                    ref: '/add-product'
                },
                {
                    id: 2,
                    title: 'Product List',
                    ref: '/list-products'   
                },
            ]
        },
        {
            title: 'Category',
            icon: './category.png',
            subItems: [
                {
                    id: 1,
                    title: 'Category List',
                    ref: '#'
                },
                {
                    id: 2,
                    title: 'New Category',
                    ref: '#'
                },
            ]
        },
        {
            title: 'Order',
            icon: './order.png',
            subItems: [
                {
                    id: 1,
                    title: 'Order List',
                    ref: '#'
                },
                {
                    id: 2,
                    title: 'Order Detail',
                    ref: '#'
                },
            ]
        },
        {
            title: 'User',
            icon: './user.png',
            subItems: [
                {
                    id: 1,
                    title: 'All User',
                    ref: '#'
                }
            ]
        }
    ]);
    
    const [selectedItem,setSelectedItem] = React.useState(null)

    const handleClick = (index) => {
        if(selectedItem === index) return setSelectedItem(null) 
        setSelectedItem(index)
    };
    
    return (
        <div className="p-5  shadow-xl w-1/6 h-screen ">
            <div className="flex flex-col text-sm font-semibold justify-center">
                <h1 className='uppercase text-gray-400 font-semibold text-sm mb-2'>All pages</h1>
                {
                    navState?.map((item,index)=>{
                        return (
                            <div key={index}
                            onClick={()=>handleClick(index)}>
                                <NavBarItem 
                                isOpen={selectedItem === index}
                                title ={navState[index].title} imgSrc = {navState[index].icon}  subItems= {navState[index].subItems}/>  
                            </div>
                        )
                    })
                }
                

            </div>
        </div>  
    );
};

export default NavBar;

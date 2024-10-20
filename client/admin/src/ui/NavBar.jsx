import NavBarItem from '../features/NavBar/NavBarItem'
import React from 'react'
const NavBar = () => {

    const [navState, setNavState] = React.useState([
        {
            title: 'Product',
            icon: '/cart.png',
            subItems: [
                {
                    id: 1,
                    title: 'Add Product',
                    ref: '/products/add'
                },
                {
                    id: 2,
                    title: 'Product List',
                    ref: '/products'   
                },
            ]
        },
        {
            title: 'Category',
            icon: '/category.png',
            subItems: [
                {
                    id: 1,
                    title: 'New Category',
                    ref: '/categories/add'
                },
                {
                    id: 2,
                    title: 'Category List',
                    ref: '/categories'
                },
            ]
        },
        {
            title: 'Topping',
            icon: '/topping.png',
            subItems: [
                {
                    id: 1,
                    title: 'Topping List',
                    ref: '/toppings'
                },
                {
                    id: 2,
                    title: 'New Topping',
                    ref: '/toppings/add'
                },
            ]
        },
        {
            title: 'Order',
            icon: '/order.png',
            subItems: [
                {
                    id: 1,
                    title: 'Order List',
                    ref: '/orders'
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
            icon: '/user.png',
            subItems: [
                {
                    id: 1,
                    title: 'All User',
                    ref: '#'
                }
            ]
        },
        {
            title: 'Voucher',
            icon: '/voucher.png',
            subItems: [
                {
                    id: 1,
                    title: 'Voucher List',
                    ref: '/vouchers'
                },
                {
                    id: 2,
                    title: 'Add Voucher',
                    ref: '/vouchers/add'
                },
            ]
        }
    ]);
    
    const [selectedItem,setSelectedItem] = React.useState(null)

    const handleClick = (index) => {
        if(selectedItem === index) return setSelectedItem(null) 
        setSelectedItem(index)
    };
    
    return (
        <div className="p-4  shadow-xl w-1/6 min-w-20  h-screen max-h-screen ">
            <div className="flex flex-col text-sm font-semibold justify-center">
                <h1 className='uppercase text-gray-400 font-semibold text-lg  mb-2 text-left'>All pages</h1>
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

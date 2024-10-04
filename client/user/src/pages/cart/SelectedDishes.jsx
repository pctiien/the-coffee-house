import { removeFromCart,removeAllFromCart } from "../../features/Redux/Slice/CartSlice"
import { useDispatch } from "react-redux"
import {Link,useLocation } from 'react-router-dom'
import React from 'react'
const SelectedDishes = ({cart})=>{

    const location = useLocation();

    const dispatch  = useDispatch()

    const handleRemoveFromCart = (item)=>{
        dispatch(removeFromCart({ _id: item.product._id }));
    }

    const handleRemoveAllFromCart = ()=>{
        dispatch(removeAllFromCart())
    }

    const handleScrollToProductList = () => {
        setTimeout(() => {
          const productListSection = document.getElementById('product-list');
          if (productListSection) {
            productListSection.scrollIntoView({ behavior: 'smooth' });
          }
        }, 0); 
      };

    return (
        <>
        <div className='flex-1 '>
            <div 
             style={{
                boxShadow: '0 0 15px 0 rgba(0, 0, 0, 0.1)'
              }}
            className='w-2/3 rounded-lg border   '>
               <div className = 'p-5'>
                <div className = 'flex  justify-between  '>
                        <div className ='flex-1'>
                            <h1 className = 'text-lg font-semibold'>Selected dishes</h1>
                        </div>
                        <div
                        >
                            <Link  
                            onClick={handleScrollToProductList}
                            className = 'rounded-full border border-black p-3 text-xs'
                            to='/'  >Add dish</Link>
                            
                        </div>
                    </div>
                    <div className ='h-0.5 w-1/4  bg-orange-500 my-3'></div>

                    <div className = ' cursor-pointer flex flex-col gap-4'>
                        {
                            cart?.items?.map((item,index)=>{
                                return (
                                    <div key={index}>
                                        <div className = 'flex justify-between items-center'>
                                            <div className= 'flex items-center gap-4'>
                                                <img 
                                                className = 'w-4 h-4'
                                                src="./edit.png" alt="" />
                                                <div>
                                                    <h1 className = 'text-sm font-medium'>{item.quantity} x {item.product.name}</h1>
                                                    <h1 className = 'text-sm '>Fit</h1>
                                                    <button 
                                                    onClick={()=>handleRemoveFromCart(item)}
                                                    className = 'text-md'>Erase</button>
                                                </div>
                                            </div>
                                            <h1>
                                                {item.total} VND
                                            </h1>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        
                    </div>
                    
                    <div className = 'flex  justify-between mt-8 '>
                        <div className ='flex-1'>
                            <h1 className = 'text-lg font-semibold'>Total</h1>
                        </div>
                    </div>
                    <div className ='h-0.5 w-1/4  bg-orange-500 my-3'></div>

                    <div className =''>
                        <div className = 'flex justify-between border-b py-4 items-center '>
                            <h1 className ='text-sm'>Total amount</h1>
                            <h1>{cart?.total} VND</h1>
                        </div>

                        <div className = 'border-b py-4'>
                            <div className = 'flex justify-between items-center'>
                                <h1 className ='text-sm'>Shipping fee</h1>
                                <h1>18000 VND</h1>
                            </div>
                            <div className = 'flex justify-between mt-2 items-center'>
                                <h1 className = 'text-sm'>You have Freeship code in Offers section</h1>
                                <h1>0d</h1>
                            </div>
                        </div>
                        <div className ='py-4 cursor-pointer'>
                            <h1 className ='text-orange-400 text-sm'>
                                Promotion
                            </h1>
                            <div className= 'flex justify-between py-2 items-center'>
                                <h1 className='text-sm'>20K off for orders of 50K</h1>
                                <h1 className = ''>-20000 VND</h1>

                            </div>
                        </div>
                    </div>
               </div>
                <div className = 'flex justify-between items-center text-sm text-white bg-orange-500 p-5 rounded-b-lg'>
                    <div>
                        <h1>
                            Total amount
                        </h1>
                        <h1 className ='font-medium '>
                            {cart.total}
                        </h1>
                    </div>
                    <button className = 'text-orange-500 rounded-full bg-white px-8 p-3 hover:text-gray-600'>Order</button>
                </div>
            
            </div>
              <div 
              onClick={handleRemoveAllFromCart}
              className ={`${cart.items.length <=0 ?'cursor-not-allowed' :'cursor-pointer'} flex justify-center w-2/3 p-8 gap-2 items-center`}>
                <img 
                className = 'w-5 h-5'
                src="./trash-bin.png" alt="" />
                <h1 className = 'text-orange-400'>Delete order</h1>
              </div>
        </div>
        </>
    )
}
export default SelectedDishes
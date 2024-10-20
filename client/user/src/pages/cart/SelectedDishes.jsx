import { removeFromCart,removeAllFromCart } from "../../features/Redux/Slice/CartSlice"
import { useDispatch } from "react-redux"
import {Link } from 'react-router-dom'
import {useOrder} from '../../utils/hooks/useOrder'
import orderService from '../../services/orderService'


import React from 'react'

const SelectedDishes = ({cart,size})=>{

    // Value after applying voucher
    let afterDiscount = cart?.total

    // Handle confirm order
    const {order,setOrder} = useOrder()

    const handleConfirmOrder = async()=>{
        const orderItemIds = cart.items.map(item=>{
            return {
                productId: item.product._id,
                quantity: item.quantity,
                sizeId: item.size._id,
                total: item.total,
                toppings: item.toppings.map(topping=>{
                    return {
                        toppingId: topping._id,
                        quantity: topping.quantity}
                    })
            }
        })
        setOrder({...order,orderItemIds})
    
        if(!validateOrder()) return 
        const response = await orderService.createOrder(order)

        if(response.err)
        {
            
            alert('Order failed')
            console.error(response.err)

        }else{

            alert('Order successfully')
            setOrder({
                ...order,orderItemIds: [],
            })
            handleRemoveAllFromCart()
        }
        
    }

    // Handle error Order

    const validateOrder = ()=>{
        console.log(order)

        if(order.orderItemIds.length <=0)
        {
            alert('At least one order item')
            return false
        }
        if(order.address.trim().length <=0)
        {
            alert('Address is required')
            return false
        }
        if(order.paymentMethod.trim().length <=0)
        {
           alert('Payment method is required ')
           return false
        }
        if(!order.deliveryTime.date || !order.deliveryTime.time){
            alert('Delivered time is required')
            return false
        }
        if (!order.user || Object.keys(order.user).length === 0) {
            alert('User information is required')
            return false
        }
        return true
    }


    // Dispatch action to cart slice
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
                            className = 'rounded-full border  text-gray-600 hover:text-white hover:bg-orange-400 p-3 px-5 text-xs'
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
                                                    <h1 className = 'text-sm '>{item.size.name}</h1>
                                                    {
                                                        item.toppings?.map((topping,index)=>{
                                                            return (
                                                                <h1 key={index} className = 'text-sm '>{topping.name}</h1>
 
                                                            )
                                                        })
                                                    }
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

                        
                        <div className ='py-4 cursor-pointer'>
                            <h1 className ='text-orange-400 text-sm'>
                                Voucher used
                            </h1>
                            <div className='flex justify-between border-b py-4 items-center'>
                                <h1 className='text-sm'>{order?.voucherUsed?.description || 'No voucher applied'}</h1>
                                {(() => {
                                    const voucherUsed = order?.voucherUsed
                                    
                                    afterDiscount = cart?.total
                                    switch(voucherUsed?.discountType)
                                    {
                                        case 'PERCENTAGE': {
                                            afterDiscount = Math.ceil(afterDiscount*((1-voucherUsed.discountValue)))
                                            break
                                        }
                                        case 'FIXED_AMOUNT':{
                                            afterDiscount = afterDiscount - voucherUsed.discountValue
                                            if(afterDiscount <0) afterDiscount = 0
                                            break
                                        }
                                        default: break
                                    }
                                    return (    
                                        <>
                                        <span><span className="line-through">{cart?.total}</span> {afterDiscount} VND</span>
                                        </>
                                    )
                                })()}
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
                            {afterDiscount}
                        </h1>
                    </div>
                    <button 
                    onClick = {handleConfirmOrder}
                    className = 'text-orange-500 rounded-full bg-white px-8 p-3 hover:text-gray-600'>Order</button>
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
import React from 'react'
import {addToCart} from '../../features/Redux/Slice/CartSlice'
import { useDispatch,useSelector } from 'react-redux'

import toppingService from '../../services/toppingService'

const ProductDetails = ({isOpen,onClose,product})=>{
    
    // Handle cart redux
    const dispatch = useDispatch()
    const cart = useSelector(state=>state.cart)
    const handleAddToCart = ()=>{
        dispatch(addToCart(order))
        onClose()

    }


    // Handle order
    const [order,setOrder] = React.useState({
        'product':product,
        'quantity': 1,
        'size': 'small',
        'topping': [],
        'total':  product.price 
    })
    const [toppings,setToppings] = React.useState([])
    const handleSizeChange = (e)=>{
        setOrder((prev)=>({...prev,size : e.target.value}))
    }
    const updateQuantity = (newQuantity)=>{
        setOrder((prev)=>({...prev,quantity: newQuantity,total : product.price * newQuantity}))
    }



    const fetchToppings  = async()=>{

        const response = await toppingService.getToppingsByIds(product.toppingIds)

        if(response.err)
        {
            console.error(response.err)
        }else{
            setToppings(response.data.result.toppings)
        }
    }


    const dialog = React.useRef(null)


    React.useEffect(()=>{
        
        fetchToppings()
        const handleClickOutside = (e)=>{
            if(dialog.current && !dialog.current.contains(e.target)){
                onClose()
            }
        }

        window.addEventListener('mousedown',handleClickOutside)

        return ()=> window.removeEventListener('mousedown',handleClickOutside)

    },[onClose])

    if(!isOpen) return null

    return (
        <>
            <div className='fixed inset-0 bg-black opacity-20 z-40'></div>
            <div className='mt-4 fixed inset-0  flex flex-col items-center z-50 '>
                <div 
                className='border rounded-lg bg-white w-1/4 overflow-y-scroll'
                ref={dialog}>
                    <div className='flex justify-between border-b p-5'>
                        <img 
                        className='w-4 h-4'
                        src="./close-thin.png" alt="" />
                        <h1 className='flex-1 text-center text-sm font-medium'>Add new dish</h1>
                    </div>
                    <div className='p-5'>
                        <img 
                        className='rounded-lg w-full min-h-80 '
                        src={product.img} alt="" />
                        <h1 className='text-lg font-semibold py-2'>{product.name}</h1>
                        <p className='text-xs text-gray-400'>Suitable choice for those who like strong matcha but are afraid of bitterness. *Stir well to enjoy the full flavor.
                        </p>
                        <div className='flex justify-between items-center py-4'>
                            <h1>{product.price} VND</h1>
                            <div className='flex justify-center items-center '>
                                <button 
                                disabled ={order.quantity <=1 }
                                onClick={()=>updateQuantity(order.quantity-1)}
                                className={`w-8 h-8  rounded-full text-white text-xl flex items-center justify-center ${order.quantity > 1 ? 'bg-gray-500' : 'bg-gray-200 cursor-not-allowed '}`}>-</button>
                                <h1 className='px-5'>{order.quantity}</h1>
                                <button 
                                onClick={()=>updateQuantity(order.quantity+1)}
                                className='w-8 h-8 bg-orange-500 rounded-full text-white text-xl flex items-center justify-center '>+</button>
                            </div>
                        </div>
                        <div className='flex border rounded-md'>
                            <img 
                            className='bg-gray-100 p-3'
                            src="./note.svg" alt="" />
                            <input 
                            className='p-3 text-sm w-full focus:outline-none'
                            type="text" name="" id="" placeholder= 'Additional notes for this dish' />
                        </div>
                    </div>
                    <div className=''>
                        <h1 className='bg-gray-300 px-5 text-xs font-medium text-gray-600 py-3'>SELECT SIZE (REQUIRED)</h1>
                        <div className='grid-cols-2 grid p-5 '>
                            <div className='flex py-2 '>
                                <input 
                                onChange={handleSizeChange}
                                checked = {order.size ==='small'} 
                                className='w-6 h-6'
                                type="radio" value ='small' name="" id="" />
                                <div className='px-3'>
                                    <h1>Small</h1>
                                    <h1>+ 0d</h1>
                                </div>
                            </div>
                            
                            <div className='flex py-2 '>
                                <input 
                                onChange={handleSizeChange}
                                checked = {order.size ==='fit'} 
                                className='w-6 h-6'
                                type="radio" value ='fit' name="" id="" />
                                <div className='px-3'>
                                    <h1>Fit</h1>
                                    <h1>+ 6000 VND</h1>
                                </div>
                            </div> 

                            <div className='flex py-2 '>
                                <input
                                onChange={handleSizeChange}
                                checked = {order.size ==='big'} 
                                className='w-6 h-6'
                                type="radio" value ='big' name="" id="" />
                                <div className='px-3'>
                                    <h1>Big</h1>
                                    <h1>+ 10000 VND</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=''>
                        <h1 className='bg-gray-300 px-5 text-xs font-medium text-gray-600 py-3'>CHOOSE TOPPING (OPTIONAL)
                        </h1>
                        <div className=' p-5 '>
                            {
                                toppings?.map((topping,index)=>{
                                    return (
                                        <div key={index} className='flex items-center justify-between border-b py-2'>
                                            <div>
                                                <h1 className='text-sm'>{topping.name}</h1>
                                                <h1 className='font-semibold text-sm mt-1'>+ {topping.priceAddition}</h1>
                                            </div>
                                            <div className='flex'>
            
                                                <button className='w-6 h-6 border-gray-200 border-2 rounded-full text-gray-200 text-2xl flex items-center justify-center leading-none'>-</button>
                                                <h1 className='px-3'>0</h1>
                                                <button className='w-6 h-6 border-gray-200 border-2 rounded-full text-gray-200 text-2xl flex items-center justify-center leading-none'>+</button>
            
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            
                        </div>
                    </div>
                    <div className='flex justify-center p-3'>
                        <button 
                        onClick={handleAddToCart}
                        className='p-3 w-full bg-orange-500 text-white text-sm rounded-full text-center'>{order.total} VND - Add to cart </button>
                    </div>
                </div>
            </div>
        </>
    )
}

 export default ProductDetails 
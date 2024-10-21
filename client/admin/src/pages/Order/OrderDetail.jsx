import React from 'react'
import orderService from '../../services/orderService'
import orderItemService from '../../services/orderItemService'

import { useParams } from 'react-router-dom';

const OrderDetail = ()=>{

    const { id } = useParams();
    
    const [order,setOrder] = React.useState(null)
    const [orderItems,setOrderItems] = React.useState([])
    const getOrder = async()=>{
        const data = await orderService.getOrderById(id)

        if(data.err)
        {
            console.error(data.err)
        }else{
            setOrder(data.data.result.order)
        }
    }
    const getOrderItems = async()=>{
        const data = await orderItemService.getOrderItemsByOrder(id)
        if(data.err)
        {
            console.error(data.err)
        }else{
            setOrderItems(data.data.result.orderItems)
        }
        console.log(orderItems)
    }
    React.useEffect(()=>{
        getOrder()
        getOrderItems()
    },[])
    const formatDate = (dateString )=>{
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    }
    return (
        <>
         <style>
                {`
                    input[type="number"]::-webkit-outer-spin-button,
                    input[type="number"]::-webkit-inner-spin-button {
                        -webkit-appearance: none;
                        margin: 0;
                    }
                    input[type="number"] {
                        -moz-appearance: textfield;
                    }
                `}
        </style>
            <div className='px-10'>
                <div className="text-2xl font-bold py-8">
                    <h1>Order Detail</h1>
                </div>
                <div className="flex justify-between gap-5 pb-5">
                    <div className='flex flex-col w-2/3 '>
                        <div className='p-5 bg-white rounded-xl shadow-xl '>
                            <h1 className='bg-gray-50 p-3 rounded-2xl text-black font-semibold mb-5'>
                                All item
                            </h1>
                            <div className='flex flex-col gap-3'>
                                {
                                    orderItems?.length>0 && orderItems?.map((item,index)=>{
                                        return (
                                            <>
                                            <div key={index} className='flex justify-between items-top p-3 bg-gray-50 rounded-2xl text-xs px-8 '>
                                                <div className='w-10  flex items-center'>
                                                    <img src={`${item.productId.imageUrl}`} alt="" />
                                                </div>
                                                <div className='flex flex-col w-1/5 gap-2'>
                                                    <p>Product name</p>
                                                    <p className='font-semibold text-sm'>{item.productId.name}</p>
                                                </div>
                                                <div className='flex flex-col gap-2'>
                                                    <p>Quantity</p>
                                                    <p className='font-semibold text-sm'>{item.quantity}</p>
                                                </div>
                                                <div className='flex flex-col gap-2'>
                                                    <p>Size</p>
                                                    <p className='font-semibold text-sm'>{item.sizeId.name}</p>
                                                </div>
                                                <div className='flex flex-col gap-2'>
                                                    <p>Topping/Quantity</p>
                                                    {
                                                        item.toppings?.length >0 && item.toppings?.map((topping,index)=>{
                                                            return (
                                                                <>
                                                                    <div key={index} className='flex items-center gap-1'>
                                                                        <p className='font-semibold text-xs'>{topping.toppingId.name}</p>
                                                                        <p>/</p>
                                                                        <p className='font-semibold text-xs'>{topping.quantity}</p>

                                                                    </div>

                                                                </>
                                                            )
                                                        })
                                                    }
                                                </div>
                                                <div className='flex flex-col'>
                                                    <p>Price</p>
                                                    <p className='font-semibold text-sm'>{Math.ceil(item.total/1000)}K</p>
                                                </div>
                                            </div>
                                            </>
                                        )
                                    })
                                }
                                
                                
                            </div>
                        </div>
                        <div className='mt-4 p-5 bg-white rounded-xl shadow-xl '>
                            
                            <table className='text-sm text-black '>
                            <thead className=''>
                                <tr>
                                    <th>Cart Totals</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody className=''>
                                <tr>
                                    <td>Total after discount:
                                    </td>
                                    <td className='font-semibold'>{Math.ceil(order?.afterDiscount/1000)}K</td>
                                </tr>
                                <tr>
                                    <td>Shipping:

                                    </td>
                                    <td className='font-semibold'>{Math.ceil(order?.shipping/1000)||0}K</td>
                                </tr>
                                <tr>
                                    <td>Tax (GST):
                                    </td>
                                    <td className='font-semibold'>{Math.ceil(order?.tax/1000)||0}K</td>
                                </tr>
                               
                            </tbody>
                        </table>
                        </div>
                    </div>
                    <div className='flex flex-col gap-5 w-1/3 text-sm'>
                        <div className='p-5 bg-white rounded-xl shadow-xl'>
                            <h1 className=' rounded-2xl text-black font-semibold mb-5'>
                                Summary
                            </h1>
                            <div className='w-full'>
                                <div className='flex justify-between text-left'>
                                    <h1 className='text-gray-500 '>Order ID</h1>
                                    <h1 className='font-semibold'>#{order?._id}
                                    </h1>
                                </div>
                                <div className='flex justify-between text-left'>
                                    <h1 className='text-gray-500 '>Order date</h1>
                                    <h1 className='font-semibold'>{formatDate(order?.createdAt)}
                                    </h1>
                                </div>
                                <div className='flex justify-between'>
                                    <h1 className='text-gray-500 t'>Original total</h1>
                                    <h1 className='font-semibold text-orange-500'>
                                    {Math.ceil(order?.originalTotal/1000)}K</h1>
                                </div>
                                <div className='flex justify-between'>
                                    <h1 className='text-gray-500 t'>After discount</h1>
                                    <h1 className='font-semibold text-orange-500'>
                                    {Math.ceil(order?.afterDiscount/1000)}K</h1>
                                </div>
                            </div>
                        </div>
                        <div className='p-5 bg-white rounded-xl shadow-xl'>
                            <h1 className=' rounded-2xl text-black font-semibold mb-5'>
                            Shipping Address

                            </h1>
                            <p className='text-gray-500'>{order?.address}
                            </p>
                        </div>
                        <div className='p-5 bg-white rounded-xl shadow-xl'>
                            <h1 className=' rounded-2xl text-black font-semibold mb-5'>
                            Payment Method

                            </h1>
                            <p className='text-gray-500'>{order?.paymentMethod}

                            </p>
                        </div>
                        <div className='p-5 bg-white rounded-xl shadow-xl'>
                            <h1 className=' rounded-2xl text-black font-semibold mb-5'>
                            Expected Date Of Delivery

                            </h1>
                            <p className='text-green-500 font-bold text-base'>{formatDate(order?.deliveryTime)}


                            </p>
                        </div>
                    </div>
                    
                </div>
            </div>
        </>
    )
}
export default OrderDetail  
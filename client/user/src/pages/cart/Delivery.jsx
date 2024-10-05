import {useOrder}  from '../../utils/hooks/useOrder'
import React from 'react'
import AddressDialog from './AddressDialog'
import DeliveryTimeDialog from './DeliveryTimeDialog'
const Delivery = ()=>{

    const {order,setOrder} = useOrder()

    // Handle recipient info - user info 

    const onChangeUserInfo = (e)=>{
        const {name,value} = e.target
        setOrder({...order,user:{...order.user,[name]:value}})
    }


    // Handle delivery dialog
    const [openDeliveryDialog,setOpenDeliveryDialog] = React.useState(false)
    const onCloseDeliveryDialog = ()=>{
        setOpenDeliveryDialog(false)
    }

    // Handle address dialog
    const [isOpenDialog,setIsOpenDialog] = React.useState(false)

    const onCloseDialog = ()=>{

        setIsOpenDialog(false)

    }
    return (
        <>
        <div className = 'w-2/3 '>
            <div className = 'flex  justify-between py-2'>
                <div className ='flex-1'>
                    <h1 className = 'text-lg font-semibold'>Delivery</h1>
                    <div className ='h-0.5 w-1/4  bg-orange-500 mt-2'></div>
                </div>
                <div>
                    <button 
                    onClick={()=>setIsOpenDialog(true)}
                    className = 'hover:bg-orange-400 hover:text-white rounded-full border text-gray-600 p-3 text-xs'>Change address</button>
                </div>
            </div>
            <div className = 'flex gap-5 text-sm mt-4 py-2 '>
                <img 
                className = 'w-10 h-10 '
                src="./delivery.png" alt="" />
                <div className = 'w-full flex flex-col '>
                    <div 
                    onClick ={()=>setIsOpenDialog(true)}
                    className = 'flex items-center justify-between w-full cursor-pointer  ' >
                        <div>
                            <h1 className = 'font-medium'>Address</h1>
                            <p className = 'mt-1'>{order.address}</p>
                        </div>
                        <img
                        className = 'w-5 h-5' 
                        src="./next.png" alt="" />
                    </div>

                    <div 
                    className = 'h-0.5 w-full bg-gray-100 my-3'></div>

                    <div 
                    onClick={()=>setOpenDeliveryDialog(true)}
                    className = 'flex items-center justify-between w-full pt-2 cursor-pointer '>
                        <div>
                            <h1 className = 'font-medium'>Delivery time</h1>
                            <p className = 'mt-1'>When : {order.deliveryTime.time} {order.deliveryTime.date}</p>
                        </div>
                        <img
                        className = 'w-5 h-5' 
                        src="./next.png" alt="" />
                    </div>
                </div>
            </div>
            <div className = 'flex flex-col text-sm gap-5 mt-2'>
                <input
                onChange={onChangeUserInfo}
                name = 'name'
                value = {order.user.name} 
                className = 'border p-3 px-5 font-light focus:outline-none'
                type="text" placeholder = 'Recipient name' />
                <input 
                    onChange={onChangeUserInfo}
                    value = {order.user.phone} 
                    name='phone'
                    className='border p-3 px-5 font-light focus:outline-none'
                    type="number" 
                    placeholder='Phone number'
                    onKeyDown={(e) => {
                        if (e.key === '-' || e.key === '.' || e.key === 'e') {
                            e.preventDefault();
                        }
                    }}
                    min="0"
                    step="1" 
                />
                <input 
                value = {order.user.instructions} 
                onChange={onChangeUserInfo}
                name ='instructions'
                className = 'border p-3 px-5 font-light focus:outline-none'
                type="text" placeholder = 'Add delivery instructions' />
            </div>
        </div>
        <AddressDialog isOpen = {isOpenDialog} onClose ={onCloseDialog}/>
        <DeliveryTimeDialog isOpen={openDeliveryDialog} onClose ={onCloseDeliveryDialog} />
        </>
    )
}
export default Delivery
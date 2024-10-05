import React from 'react'
import {useOrder} from '../../utils/hooks/useOrder'

const Payment = ()=>{

    const {order,setOrder} = useOrder()

    const [activePayment,setActivePayment] = React.useState(order.paymentMethod || 'cash')

    const handlePaymentChange = (e)=>{
        setOrder({...order,paymentMethod: e.target.value})
        setActivePayment(e.target.value)
    }

    return (
        <>
        <div className =' w-2/3 mt-4'>
            <div className ='flex-1'>
                <h1 className = 'text-lg font-semibold'>Payment method</h1>
                <div className ='h-0.5 w-1/4  bg-orange-500 mt-2'></div>
            </div>
            <div>
                <div className = 'flex items-center gap-2 m-5 py-2 border-b'>
                    <input
                    onChange = {handlePaymentChange} 
                    checked = {activePayment ==='Cash'}
                    value = 'Cash'
                    className="  w-6 h-6  " type = 'radio'></input>
                    <img 
                    className = 'w-6 h-6 ml-5'
                    src="./cash.jpg" alt="" />
                    <h1 className = 'text-sm'>
                        Cash
                    </h1>
                </div>
                <div className = 'flex items-center gap-2 m-5 py-2 border-b'>
                    <input 
                    checked = {activePayment === 'Momo'}
                    onChange = {handlePaymentChange}
                    value = 'Momo'
                    className="  w-6 h-6 " type = 'radio'></input>
                    <img 
                    className = 'w-6 h-6 ml-5'
                    src="./momo.png" alt="" />
                    <h1 className = 'text-sm'>
                        MoMo
                    </h1>
                </div>
                <div className = 'flex items-center gap-2 m-5 py-2 border-b'>
                    <input
                    onChange = {handlePaymentChange}
                    checked = {activePayment === 'ZaloPay'} 
                    value = 'ZaloPay'
                    className="  w-6 h-6  " type = 'radio'></input>
                    <img 
                    className = 'w-6 h-6 ml-5'
                    src="https://minio.thecoffeehouse.com/image/tchmobileapp/388_ic_zalo@3x.png" alt="" />
                    <h1 className = 'text-sm'>
                        ZaloPay
                    </h1>
                </div>
                <div className = 'flex items-center gap-2 m-5 py-2 border-b'>
                    <input
                    onChange = {handlePaymentChange}
                    checked = {activePayment === 'ShopeePay'} 
                    value = 'ShopeePay'
                    className="  w-6 h-6 " type = 'radio'></input>
                    <img 
                    className = 'w-6 h-6 ml-5'
                    src="https://minio.thecoffeehouse.com/image/tchmobileapp/1120_1119_ShopeePay-Horizontal2_O.png" alt="" />
                    <h1 className = 'text-sm'>
                        ShopeePay
                    </h1>
                </div>
                
            </div>
                
        </div>
        </>
    )
}
export default Payment 
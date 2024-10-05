import React from 'react'
import {useOrder} from '../../utils/hooks/useOrder'
const DeliveryTimeDialog = ({isOpen,onClose})=>{

    const {order,setOrder} = useOrder()


    // Handle change delivery time
    const getISODateFromToday = (day=0) => {
        const date = new Date();
        date.setDate(date.getDate() + day); 
        return date.toISOString().split('T')[0]; 
    };
    const [deliveryTime,setDeliveryTime] = React.useState({
        date: getISODateFromToday(0),
        time: '8:00'
    })
    const handleChangeTime = (e)=>{
        setDeliveryTime({...deliveryTime, time: e.target.value})
    }
    const handleChangeDate = (e)=>{
        setDeliveryTime({...deliveryTime, date: e.target.value})
    }
    const handleConfirm = ()=>{
        setOrder({...order,deliveryTime})
        onClose()
    }
    const generateTimeOptions = () => {
        const options = [];
        const startHour = 8; 
        const endHour = 20; 
    
        for (let hour = startHour; hour <= endHour; hour++) {
            for (let minute of [0, 30]) { 
                const time = `${hour}:${minute === 0 ? '00' : minute}`;
                options.push(
                    <option key={`${hour}-${minute}`} value={time}>
                        {time}
                    </option>
                );
            }
        }
        return options;
    };
    
    // Handle dialog close when the user clicks outside 
    const dialogRef = React.useRef(null)
    React.useEffect(()=>{

        const handleClickOutside = (e)=>{

            if(dialogRef.current && !dialogRef.current.contains(e.target))
            {
                onClose()
            }
        }
        window.addEventListener('mousedown',handleClickOutside)

        return ()=> window.removeEventListener('mousedown',handleClickOutside)

    },[onClose])

    if(!isOpen) return null
    return (
        <>
        <div className="fixed z-50 inset-0 bg-black opacity-45"></div>
        <div className='pt-24 fixed inset-0  flex flex-col justify-start items-center z-50 '>
            <div 
            ref={dialogRef}
            className="w-1/4 bg-white rounded-lg flex flex-col items-center  ">
                    
                <div className='p-5 border-b flex items-center  w-full text-center text-sm font-semibold text-gray-700'>
                    <img 
                    onClick={onClose}
                    className ='w-3 h-3 cursor-pointer '
                    src="./close.png" alt="" />
                    <h1 className='flex-1'>Delivery Time</h1>
                </div>
               <div className='w-full p-3'>
                <select 
                    onChange={handleChangeDate}
                    defaultValue={getISODateFromToday()}
                    className='w-full focus:outline-none rounded-md p-3 text-sm text-gray-600 border'
                    name="" id="">
                        <option value={getISODateFromToday()}>Today</option>
                        <option value={getISODateFromToday(1)}>Tomorrow</option>
                </select>
                <select
                    defaultValue={'8:00'}
                    onChange={handleChangeTime} 
                    className='w-full mt-5 focus:outline-none rounded-md p-3 text-sm text-gray-600 border'
                    name="" id="">
                        {generateTimeOptions()}
                </select>
                <button 
                onClick={handleConfirm}
                className='bg-orange-500 rounded-full w-full mt-5 py-4 text-sm text-white font-semibold'>
                    Confirm
                </button>
               </div>
            </div>

        </div>
        </>
    )
}
export default DeliveryTimeDialog
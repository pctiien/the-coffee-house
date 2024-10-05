import React from 'react'
import {useOrder} from '../../utils/hooks/useOrder'
const AddressDialog = ({isOpen,onClose})=>{


    
    const {order,setOrder} = useOrder()

    const handleChangeAddress = (e)=>{
        setOrder({...order, address: e.target.value})
    }
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
            className="w-1/2 bg-white rounded-lg flex flex-col items-center pb-5 px-5 ">
                    
                <div className="h-20 bg-white flex flex-col justify-center items-center border-dashed border-orange-500 border -mt-10 rounded-full p-2 px-4">
                    <div className="shadow-lg flex bg-orange-500 justify-between w-max text-center gap-3 p-2  rounded-full  text-white  text-sm font-semibold  items-center">
                        <img 
                        className="w-10 h-10"
                        src="./delivery.png" alt="" />
                        <p>Delivery</p>
                    </div>
                </div>
                <input
                value={order.address}
                onChange={handleChangeAddress} 
                className="text-sm w-full  p-2 mt-6 focus:outline-none shadow-xl"
                type="text" placeholder="Please enter address" />

            </div>

        </div>
        </>
    )
}
export default AddressDialog
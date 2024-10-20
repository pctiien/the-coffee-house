import React from 'react';
import VoucherCard from './VoucherCard';
import voucherService from '../../services/voucherService'
const VoucherList = ({isOpen,onClose})=>{

    const [vouchers,setVouchers] = React.useState([])

    const [voucherCode,setVoucherCode] = React.useState('')

    const dialogRef = React.useRef(null);

    const handleVoucherInput = (e)=>{
        setVoucherCode(e.target.value)
    }

    React.useEffect(()=>{

        const fetchVouchers = async()=>{
            try{
                const response = await voucherService.getAllVouchers(100,1)
                setVouchers(response.data.result.vouchers)
            } catch(e)
            {
                console.error(e.message)
            }         
        }
        fetchVouchers()
        const handleClickOutside = (e) =>{
            if(dialogRef.current && !dialogRef.current.contains(e.target))
            {
                onClose()
            }
        }

        document.addEventListener('mousedown',handleClickOutside)
        return ()=>{
            document.removeEventListener('mousedown',handleClickOutside)
        }
    },[onClose])

    
    if (!isOpen) {
        document.body.style.overflow = 'auto'; 
        return null
    } 
    else{
        document.body.style.overflow = 'hidden';
    }
    return (
        <>
            <div className=" fixed inset-0 bg-black opacity-50 z-40 "></div>
            <div 
            className="pt-24 fixed inset-0 z-50 flex items-start justify-center overflow-y-scroll  ">
                <div 
                ref={dialogRef}
                className="bg-white rounded-lg pb-12 border ">
                    <div className='flex justify-between items-center p-4 border-b'>
                        <img
                            className='cursor-pointer w-2 h-2 inline-block'
                            src="./close.png"
                            alt=""
                            onClick={onClose} 
                        />
                        <h1 className='text-center text-sm font-medium flex-1'>Vouchers</h1>
                    </div>
                    <div className='p-4'>
                        <div className='flex justify-between items-center bg-gray-50 border-gray-200 border h-10'>
                            <div className='flex p-2'>
                                <img
                                    className='w-6 h-6'
                                    src="./scanner.png"
                                    alt=""
                                />
                                <input
                                    onChange={handleVoucherInput}
                                    value={voucherCode}
                                    className='text-sm text-start flex-1 px-5 bg-transparent focus:outline-none'
                                    type="text"
                                    placeholder="Enter voucher code "
                                />
                            </div>
                            <button className={`h-full text-white px-6 ${voucherCode.length > 0 ? 'bg-orange-500' : 'bg-gray-200 disabled'}`}>
                                Apply
                            </button>
                        </div>
                    </div>
                    <div className='bg-gray-200 font-semibold text-gray-700 p-3 text-xs'>
                        EXPIRING SOON
                    </div>
                    <div 
                    style={{ maxHeight: '100%' }}
                    className="flex flex-col items-center gap-3 p-3 ">
                        {
                            vouchers.length>0 && vouchers.map((voucher, index) => {
                                return (
                                    <div key={index}>
                                        <VoucherCard item={voucher} />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default VoucherList;

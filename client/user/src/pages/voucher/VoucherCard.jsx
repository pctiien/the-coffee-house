import {useOrder} from '../../utils/hooks/useOrder'

const VoucherCard = ({item})=>{
    const formatDate = (dateString )=>{
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    }
    const {order,setOrder} = useOrder()

    const handleUseVoucher = ()=>{
        if(item)
        {
            setOrder({...order,voucherUsed: item})
        }
        console.log(order.voucherUsed)
    }

    return (
        <>
        <div 
        style ={{boxShadow : '0px 4px 12px rgba(0, 0, 0, 0.1)'}}
        className={`${order.voucherUsed?._id === item?._id ? 'bg-orange-200 ' : ''} flex p-5 items-center rounded-lg shadow-xl  gap-12`}>
            <div>
                <img
                className="w-20" 
                src={item?.imageUrl} alt="" />
            </div>
            <div className="flex flex-col items-start justify-between w-44 text-sm text-gray-600">
                <h1>{item?.description}</h1>
                <h1 className= 'text-orange-600 mt-2'>{formatDate(item?.validTo)}</h1>
                <button 
                onClick={handleUseVoucher}
                className='text-md mt-5 text-orange-600'
                
                >Use now</button>
            </div>
        </div>
        </>
    )
}
export default VoucherCard
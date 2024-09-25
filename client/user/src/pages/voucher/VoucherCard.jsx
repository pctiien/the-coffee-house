const VoucherCard = ({item})=>{
    return (
        <>
        <div 
        style ={{boxShadow : '0px 4px 12px rgba(0, 0, 0, 0.1)'}}
        className="flex p-5 items-center rounded-lg shadow-xl  gap-12">
            <div>
                <img
                className="w-20" 
                src={item?.img} alt="" />
            </div>
            <div className="flex flex-col items-start justify-between w-44 text-sm text-gray-600">
                <h1>{item?.content}</h1>
                <h1 className= 'text-orange-600 mt-2'>{item?.expiredDay}</h1>
                <button className= 'text-orange-400 text-md mt-5 '>Use now</button>
            </div>
        </div>
        </>
    )
}
export default VoucherCard
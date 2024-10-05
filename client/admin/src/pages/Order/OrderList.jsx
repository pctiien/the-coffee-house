import Pagination from '../../features/Common/Pagination'
import React from 'react'
import orderService  from '../../services/orderService'

const OrderList = ()=>{

    const [orders,setOrders] = React.useState([])

    const [selectedPage,setSelectedPage] = React.useState(1)

    const [entry,setEntry] = React.useState(10)

    const [totalEntry,setTotalEntry] = React.useState(0)

    const onEntryChange = (e)=>{
        setEntry(Number(e.target.value)); 
        onPageChange(1)
    }
    const onPageChange = (page)=>{
        setSelectedPage(page)
    }
    const getColorStatus=  (status)=>{
        if(status.toLowerCase() === 'pending')
        {
            return 'text-yellow-500 border border-yellow-500'
        }
        if(status.toLowerCase() === 'completed')
        {
            return 'text-green-500 border border-green-500'
        }
        if(status.toLowerCase() === 'rejected')
        {
            return 'text-red-500 border border-red-500'
        }
        return 'text-blue-500 border border-blue-500'

    }
    const formatDate = (date) => {
        const hours = String(date.getUTCHours()).padStart(2, '0'); 
        const minutes = String(date.getUTCMinutes()).padStart(2, '0');
        const day = String(date.getUTCDate()).padStart(2, '0'); 
        const month = String(date.getUTCMonth() + 1).padStart(2, '0'); 
        const year = String(date.getUTCFullYear()).slice(-2); 
    
        return `${hours}:${minutes} ${day}/${month}/${year}`;
    };
    React.useEffect(()=>{
        
        const fetchOrders = async()=>{
            try{
                const response = await orderService.getAllOrders(entry,selectedPage)
                console.log(response)
                setOrders(response.data.result.orders)
                setTotalEntry(response.data.result.total)
            } catch(e)
            {
                console.log(e.message)
            }         
        }

        fetchOrders()

        
    },[selectedPage,entry])
    return (
        <>
        <div className="">
            <div className="m-3 mx-5 p-5 text-xs text-gray-600 bg-white rounded-lg">
                <div className="flex items-center justify-between">
                    <div className="w-3/5 flex items-center gap-3">
                        <p>Showing</p>
                        <select 
                        onChange ={onEntryChange}
                        className="p-2 px-4 border rounded-xl"
                        name="" id="">
                            <option 
                            value={10}>10</option>
                            <option 
                            value={20}>20</option>
                            <option 
                            value={30}>30</option>
                        </select>
                        <p>entries</p>
                        <div className="flex-1 ml-4 text-base border flex p-4 px-5 bg-white rounded-xl justify-between items-center">
                            <input 
                            className="bg-transparent focus:outline-none"
                            type="text" placeholder="Search here..."/>
                            <img 
                            className="w-4 h-4"
                            src="/search.png" alt="" />
                        </div>
                    </div>
                    <div className="w-1/5 border text-blue-500 text-sm font-semibold border-blue-500 rounded-xl p-4 px-8 text-center">
                        <button>+ Add new</button>

                    </div>
                </div>
                <div className=''>
                    <div className='border-b py-5 pb-12'>
                        <table className='text-sm table-auto text-black '>
                            <thead className=''>
                                <tr>
                                    <th>ID</th>
                                    <th className='w-1/5'>Address</th>
                                    <th>Delivery time</th>
                                    <th>Total</th>
                                    <th>Payment method</th>
                                    <th>Status</th>

                                </tr>
                            </thead>
                            <tbody className=''>
                                {
                                    orders?.map((order,index)=>{
                                        return (
                                            <tr key={index} className=''>
                                                <td className='' >{order._id}</td>
                                                <td className='font-semibold max-w-80 overflow-hidden'>{order.address}</td>
                                                <td className='font-semibold'>{formatDate(new Date(order.deliveryTime))}</td>
                                                <td className='font-semibold'>{order.total}</td>
                                                <td className='font-semibold'>{order.paymentMethod}</td>
                                                <td className={`font-semibold w-max text-center `}>

                                                    <p className={`${getColorStatus(order.status)}  rounded-lg border w-full h-full py-1`}>
                                                    {order.status}
                                                    </p>
                                                </td>

                                            </tr>
                                        )
                                    })
                                }
                               
                            </tbody>
                        </table>
                    </div>
                    <Pagination  onPageChange={onPageChange} entry={entry} currentPage={selectedPage} totalEntry={totalEntry}/>
                </div>
            </div>
        </div>
        </>
    )
}
export default OrderList 
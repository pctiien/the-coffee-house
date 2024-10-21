import Pagination from '../../features/Common/Pagination'
import React from 'react'
import orderService  from '../../services/orderService'
import Dialog from '../../features/Common/Dialog'
import {useNavigate} from 'react-router-dom'
const OrderList = ()=>{
    const navigate = useNavigate()
    const navigateToOrderDetail = (order)=>{
        navigate(`/orders/${order._id}`)
    }

    const [selectedOrder,setSelectedOrder] = React.useState(null)
    const handleOnChangeForm = (order,e)=>{
        const {name,value} = e.target
        setSelectedOrder({...order,[name]:value}) 
        onOpenStatusDialog()
    }
    let orderStatus = ['Pending','Delivering','Completed','Rejected']

    // Handle change status order dialog
    const [isOpenChangeStatusDialog,setIsOpenChangeStatusDialog] = React.useState(false)
    const onOpenStatusDialog = ()=>{
        setIsOpenChangeStatusDialog(true)
    }
    const onCloseChangeStatusDialog = ()=>{
        setIsOpenChangeStatusDialog(false)
    }
    const handleChangeStatusOrder = async()=>{
        console.log({status: selectedOrder.status})
        const response = await orderService.changeStatusOrder(selectedOrder._id,{status: selectedOrder.status})
        
        if(response.err)
        {
            console.error(response.err)
        }else{
            console.log(response)
        }
        fetchOrders()
    }
    const changeStatusDialogMsg = `Are you sure to change this status to ${selectedOrder?.status}`



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
            return 'text-yellow-500  bg-yellow-100'
        }
        if(status.toLowerCase() === 'completed')
        {
            return 'text-green-500  bg-green-100'
        }
        if(status.toLowerCase() === 'rejected')
        {
            return 'text-red-500  bg-red-100'
        }
        return 'text-blue-500  bg-blue-100'

    }
    const formatDate = (date) => {
        const hours = String(date.getUTCHours()).padStart(2, '0'); 
        const minutes = String(date.getUTCMinutes()).padStart(2, '0');
        const day = String(date.getUTCDate()).padStart(2, '0'); 
        const month = String(date.getUTCMonth() + 1).padStart(2, '0'); 
        const year = String(date.getUTCFullYear()).slice(-2); 
    
        return `${hours}:${minutes} ${day}/${month}/${year}`;
    };
    const fetchOrders = async()=>{
        try{
            const response = await orderService.getAllOrders(entry,selectedPage)
            setOrders(response.data.result.orders)
            setTotalEntry(response.data.result.total)
        } catch(e)
        {
            console.log(e.message)
        }         
    }
    React.useEffect(()=>{
        

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
                    
                </div>
                <div className=''>
                    <div className='border-b py-5 pb-12'>
                        <table className='text-sm table-auto text-black '>
                            <thead className=''>
                                <tr>
                                    <th className=''>Customer name</th>
                                    <th className='w-1/5'>Address</th>
                                    <th className=''>Phone</th>

                                    <th>Delivery time</th>
                                    <th>After discount</th>
                                    <th>Payment method</th>
                                    <th className=''>Status</th>
                                    <th>Order Detail</th>

                                </tr>
                            </thead>
                            <tbody className=''>
                                {
                                    orders?.map((order,index)=>{
                                        return (
                                            <tr key={index} className=''>
                                                <td className='' >{order.user.name}</td>
                                                <td className=' max-w-80 overflow-hidden'>{order.address}</td>
                                                <td className=' max-w-80'>{order.user.phone}</td>
                                                <td >{formatDate(new Date(order.deliveryTime))}</td>
                                                <td className=''>{order.afterDiscount} VND</td>
                                                <td className=''>{order.paymentMethod}</td>
                                                <td 
                                                
                                                className={`font-medium w-max  text-center `}>

                                                    <select 
                                                    className={`${getColorStatus(order.status)} rounded-lg cursor-pointer w-full h-full py-1`}
                                                    name="status" 
                                                    onChange={(e)=>handleOnChangeForm(order,e)}
                                                    value={order?.status}>
                                                    <option 
                                                    className={`${getColorStatus(order.status)}`}>
                                                    {order.status}
                                                    </option>
                                                        {
                                                            orderStatus.filter(status=>status!=order.status).map((status,index)=>{
                                                                return(
                                                                    <>
                                                                    <option value={status}  key={index} className={`${getColorStatus(status)}  `}>
                                                                    {status}
                                                                    </option>
                                                                    </>
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                </td>
                                                <td 
                                                onClick={()=>navigateToOrderDetail(order)}
                                                className='cursor-pointer'>
                                                    <div className='border p-1 text-center text-sm text-green-600 font-medium  border-green-600 rounded-lg '>See</div>
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
            <Dialog isOpen={isOpenChangeStatusDialog} onClose={onCloseChangeStatusDialog} message={changeStatusDialogMsg} onSave={handleChangeStatusOrder} />
        </div>
        </>
    )
}
export default OrderList 
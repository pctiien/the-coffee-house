import Pagination from '../../features/Common/Pagination'
import React from 'react'
import voucherService  from '../../services/voucherService'
import Dialog from '../../features/Common/Dialog'
import {  useNavigate } from 'react-router-dom';
import { useNavBarItemContext } from "../../context/NavBarItemContext"
const VoucherList = ()=>{

    // Handle delete delete dialog
    const [selectedVoucher,setSelectedVoucher] = React.useState(null)
    const [isOpenDeleteDialog,setIsOpenDeleteDialog] = React.useState(false)
    const onOpenDeleteDialog = (voucher)=>{
        setSelectedVoucher(voucher)
        setIsOpenDeleteDialog(true)
    }
    const onCloseDeleteDialog = ()=>{
        setIsOpenDeleteDialog(false)
    }
    const handleDeleteVoucher = async()=>{

        const response = await voucherService.deleteVoucher(selectedVoucher._id)
        
        if(response.err)
        {
            console.error(response.err)
        }
        fetchVouchers()
    }
    const deleteDialogMsg = "Are you sure to delete this product"




    const [vouchers,setVouchers] = React.useState([])

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
    const fetchVouchers = async()=>{
        try{
            const response = await voucherService.getAllVouchers(entry,selectedPage)
            setVouchers(response.data.result.vouchers)
            setTotalEntry(response.data.result.total)
        } catch(e)
        {
            console.error(e.message)
        }         
    }
    const navigate = useNavigate()
    const { setSelectedItem } = useNavBarItemContext(); 

    const handleNavigateAddNew = ()=>{
        setSelectedItem(0)
        navigate('/vouchers/add')
    }
    const formatDate = (dateString )=>{
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    }
    React.useEffect(()=>{
        
        fetchVouchers() 

    },[selectedPage,entry])
    return (
        <>
        <div className="">
            <div className="m-3 mx-5 p-5 text-xs text-gray-600 bg-white rounded-lg">
                <div className="flex items-center justify-between gap-8">
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
                    <div className=" min-w-40 border text-blue-500 text-sm font-semibold border-blue-500 rounded-xl flex justify-center items-center">
                            <button 
                            className="flex-1 p-3 text-center "  
                            onClick={handleNavigateAddNew}>
                                + Add new

                            </button>
                    </div>
                </div>
                <div className=''>
                    <div className='border-b py-5 pb-12'>
                        <table className='text-sm text-black '>
                            <thead className=''>
                                <tr>
                                    <th>Voucher code</th>
                                    <th>Voucher description</th>
                                    <th>Discount type</th>
                                    <th>Discount value</th>
                                    <th>Minimum order value</th>

                                    <th>Expired date</th>

                                    <th>Voucher image</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody className=''>
                                {
                                    vouchers?.map((voucher,index)=>{
                                        return (
                                            <tr key={index} className=''>
                                                <td >{voucher.code}</td>
                                                <td className=''>{voucher.description}</td>
                                                <td className=''>{voucher.discountType}</td>

                                                <td className=''>{voucher.discountValue < 1 ? `${voucher.discountValue * 100}%` : `${voucher.discountValue/1000}K`}</td>
                                                <td className=''>{voucher.minimumOrderValue/1000}K</td>

                                                <td className=''>{formatDate(voucher.validTo)}</td>

                                                <td>
                                                    <img    
                                                    className= 'w-10 h-10' 
                                                    src={voucher.imageUrl} alt="" />
                                                </td>
                                                <td className=" text-white">
                                                    <div className="flex">
                                                        <button
                                                        onClick={()=>onOpenDeleteDialog(voucher)} 
                                                        className="ml-2 bg-red-500 p-2 rounded-lg px-5">Delete</button>
                                                    </div>
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
            <Dialog isOpen={isOpenDeleteDialog} onClose={onCloseDeleteDialog} message={deleteDialogMsg} onSave={handleDeleteVoucher} />

        </div>
        </>
    )
}
export default VoucherList 
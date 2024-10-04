import React from 'react'
import ProductDetails from './ProductDetails'
const Product = ({item})=>{
    const [openDialog,setOpenDialog] = React.useState(false)

    const onCloseDialog = ()=>{
        setOpenDialog(false)
    }
    const handleOpenDialog = ()=>{
        setOpenDialog(true)
    }
    return (
        <>
            <div 
            onClick={handleOpenDialog}
            className='cursor-pointer flex flex-col p-3 rounded-lg shadow-xl '>
                <div>
                    <img
                    className='w-40 h-40 rounded-lg' 
                    src={item.img} alt="" />
                </div>
                <h1 className='w-40 h-16 mt-3 text-sm font-medium text-gray-900 overflow-hidden'>
                    {item.name} 
                </h1>
                <div className='flex justify-between text-sm items-center'>
                    <div>
                        <h1>{item.price} VND</h1>
                    </div>
                    <img
                    className='w-7' 
                    src='./plus.png' alt={item.name} />
                </div>
            </div>
            <ProductDetails product ={item} isOpen ={openDialog} onClose = {onCloseDialog} />
        </>
    )
}
export default Product
import React from 'react'

const Product = ({item})=>{

    
    return (
        <>
            <div className='flex flex-col p-3 rounded-lg shadow-xl '>
                <div>
                    <img
                    className='w-40 rounded-lg' 
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
                    src='./plus.png' alt="" />
                </div>
            </div>
        </>
    )
}
export default Product
const Delivery = ()=>{
    return (
        <>
        <div className = 'w-2/3 '>
            <div className = 'flex  justify-between py-2'>
                <div className ='flex-1'>
                    <h1 className = 'text-lg font-semibold'>Delivery</h1>
                    <div className ='h-0.5 w-1/4  bg-orange-500 mt-2'></div>
                </div>
                <div>
                    <button className = 'rounded-full border border-black p-3 text-xs'>Change address</button>
                </div>
            </div>
            <div className = 'flex gap-5 text-sm mt-4 py-2 '>
                <img 
                className = 'w-10 h-10 '
                src="./delivery.png" alt="" />
                <div className = 'w-full flex flex-col '>
                    <div className = 'flex items-center justify-between w-full cursor-pointer  ' >
                        <div>
                            <h1 className = 'font-medium'>District 1</h1>
                            <p className = 'mt-1'>District 1, Ho Chi Minh City, Vietnam</p>
                        </div>
                        <img
                        className = 'w-5 h-5' 
                        src="./next.png" alt="" />
                    </div>

                    <div 
                    className = 'h-0.5 w-full bg-gray-100 my-3'></div>

                    <div className = 'flex items-center justify-between w-full pt-2 cursor-pointer '>
                        <div>
                            <h1 className = 'font-medium'>Receive goods within 15-30 minutes</h1>
                            <p className = 'mt-1'>When: As soon as possible</p>
                        </div>
                        <img
                        className = 'w-5 h-5' 
                        src="./next.png" alt="" />
                    </div>
                </div>
            </div>
            <div className = 'flex flex-col text-sm gap-5 mt-2'>
                <input 
                className = 'border p-3 px-5 font-light focus:outline-none'
                type="text" placeholder = 'Recipient name' />
                <input 
                className = 'border p-3 px-5 font-light focus:outline-none'
                type="text" placeholder = 'Phone number' />
                <input 
                className = 'border p-3 px-5 font-light focus:outline-none'
                type="text" placeholder = 'Add delivery instructions' />
            </div>
        </div>
        </>
    )
}
export default Delivery
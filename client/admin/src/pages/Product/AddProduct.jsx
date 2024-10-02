const Product = ()=>{
    return (
        <>
         <style>
                {`
                    input[type="number"]::-webkit-outer-spin-button,
                    input[type="number"]::-webkit-inner-spin-button {
                        -webkit-appearance: none;
                        margin: 0;
                    }
                    input[type="number"] {
                        -moz-appearance: textfield;
                    }
                `}
        </style>
            <div className='px-10'>
                <div className="text-2xl font-bold py-8">
                    <h1>Add Product</h1>
                </div>
                <div className="flex justify-between gap-5 ">
                    <div className ='p-5 bg-white rounded-xl shadow-xl flex-1'>
                        <div className="flex flex-col gap-2">
                            <span className="flex gap-1 ">
                                <h1 className="font-bold text-sm">Product name</h1>
                                <h1 className="text-red-500">*</h1>
                            </span>                            
                            <input 
                            className="border focus:outline-none  rounded-xl p-3 px-5 w-full"
                            type="text" placeholder = 'Enter product name' />
                            <p className="text-xs text-gray-500">Do not exceed 20 characters when entering the product name.</p>
                        </div>

                        <div className="mt-5 flex flex-col gap-2">
                            <span className="flex gap-1 ">
                                <h1 className="font-bold text-sm">Category</h1>
                                <h1 className="text-red-500">*</h1>
                            </span>  
                            <div className="relative w-full">
                                <select 
                                    className="border border-gray-300 focus:outline-none rounded-xl p-3 px-5 w-full appearance-none bg-white"
                                    name="" id="">
                                    <option disabled selected value="">Choose category</option>
                                    <option value="shop">Shop</option>
                                    <option value="product">Product</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path  d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                           
                        <div className="mt-5 flex flex-col  gap-2">
                            <span className="flex gap-1 ">
                                <h1 className="font-bold text-sm">Topping</h1>
                                <h1 className="text-red-500">*</h1>
                            </span>  
                            <div className="relative w-full">
                                <select 
                                    className="border border-gray-300 focus:outline-none rounded-xl p-3 px-5 w-full appearance-none bg-white"
                                    name="" id="">
                                    <option disabled selected value="">Choose topping</option>
                                    <option value="shop">Shop</option>
                                    <option value="product">Product</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path  d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                       
                           
                        </div>
                        <div className="mt-5 flex flex-col gap-2">
                            <span className="flex gap-1 ">
                                <h1 className="font-bold text-sm">Description</h1>
                                <h1 className="text-red-500">*</h1>
                            </span>
                            <textarea className="border focus:outline-none  rounded-xl p-3 px-5 w-full" placeholder='Enter description' name="" id=""></textarea>
                            <p>Do not exceed 100 characters when entering the product description.</p>
                        </div>
                    </div>
                    <div className ='p-5 bg-white rounded-xl shadow-xl flex-1 h-max'>
                    

                        <div className=" flex flex-col gap-2">
                            <span className="flex gap-1 ">
                                <h1 className="font-bold text-sm">Price</h1>
                                <h1 className="text-red-500">*</h1>
                            </span>                            
                            <div className ='relative'>
                                <input 
                                    className="appearance-none border focus:outline-none  rounded-xl p-3 px-5 w-full"
                                    type="number" placeholder = 'Enter price' />
                                <p className=" absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
                                    VND
                                </p>
                            
                            </div>
                        </div>
                        <div className="mt-5 flex flex-col gap-2">
                            <span className="flex gap-1 ">
                                <h1 className="font-bold text-sm">Upload images</h1>
                                <h1 className="text-red-500">*</h1>

                            </span>                            
                            <div className="cursor-pointer border-dashed border rounded-xl flex flex-col justify-center items-center gap-2 p-5 py-10">
                                <img 
                                className="w-10 h-10"
                                src="/upload.png" alt="" />
                                <span className="text-sm text-gray-500"  >
                                    <p className=" inline-block">Drop your images here or select </p>
                                    <p className=" inline-block ml-1 text-blue-600">click to browse</p>
                                </span>
                            </div>
                            <p className="text-xs text-gray-500">You need to add at least 1 images. Pay attention to the quality of the pictures you add, comply with the background color standards. Pictures must be in certain dimensions. Notice that the product shows all the details</p>
                        </div>
                        <div className="mt-5  bg-blue-500 p-3 px-5 text-center rounded-xl text-white font-semibold">
                            <button >Add product</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Product
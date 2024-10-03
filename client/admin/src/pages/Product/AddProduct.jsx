import React from 'react'
import categoryService from '../../services/categoryService'
import toppingService from '../../services/toppingService'
import productService from '../../services/productService'

const Product = ()=>{

    const [toppings,setToppings] = React.useState([])

    const [categories,setCategories] = React.useState([])

    const [productFormData,setProductFormData] = React.useState({
        name: '',
        price : '',
        categoryId: '',
        toppingIds: [],
        description: ''
    })

    const [errorProductFormData,setErrorProductFormData] = React.useState({})

    const handleOnChangeForm = (e)=>{
        const {name,value,checked} = e.target
        if(name ==='toppingIds')
        {
            if(checked)
            {
                setProductFormData({...productFormData,toppingIds: [...productFormData.toppingIds,value]})
            }else{
                setProductFormData({
                    ...productFormData,toppingIds: productFormData.toppingIds.filter(toppingId => toppingId !== value)
                })
            }
        }else{
            const newVal = name === 'price' ? parseFloat(value||0) : value 
            setProductFormData({...productFormData,[name]:newVal}) 
        }
        
    }

    const validProductFormData = ()=>{
        
        const errors = {}

        if (productFormData.name.length <= 0) {
            errors.name = 'Product name must be at least one character';
        }

        const price = parseFloat(productFormData.price);
        if (isNaN(price) || price <= 1) {
            errors.price = 'Product price must be over 1';
        }
        
        if(!categories.some(category=> category._id === productFormData.categoryId) || productFormData.categoryId.trim() ==='')
        {
            errors.categoryId = 'Category is required';
        }
        setErrorProductFormData(errors);
        return Object.keys(errors).length === 0; 

    }



    const handleAddProduct = async ()=>{
        

        if(validProductFormData())
        {

            try{
                const response = await productService.addNewProduct(productFormData)
                setProductFormData({
                    name: '',
                    price : '',
                    categoryId: '',
                    toppingIds: [],
                    description: ''
                })
                console.log(response)
            }catch(e)
            {
                console.log(e.message)
            }
        }
        
    }
    React.useEffect(()=>{
        const fetchCategories = async()=>{
            
            try{

                const response = await categoryService.getAllCategories(100)
                setCategories(response.data.result.categories)

            }catch(e)
            {
                console.log(e.message)
            }
        }
        const fetchToppings = async()=>{
            try{
                const response = await toppingService.getAllToppings()
                setToppings(response.data.result.toppings)
            }catch(e)
            {
                console.log(e.message)
            }
        }
        fetchCategories()
        fetchToppings()
    },[])
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
                            name ="name"
                            value ={productFormData.name}
                            onChange={handleOnChangeForm}
                            className="border focus:outline-none  rounded-xl p-3 px-5 w-full"
                            type="text" placeholder = 'Enter product name' />
                            <p className="text-xs text-red-500">{errorProductFormData.name}</p>
                        </div>

                        <div className="mt-5 flex flex-col gap-2">
                            <span className="flex gap-1 ">
                                <h1 className="font-bold text-sm">Category</h1>
                            </span>  
                            <div className="relative w-full">
                                <select
                                    onChange={handleOnChangeForm}
                                    value={productFormData.categoryId}
                                    className="border border-gray-300 focus:outline-none rounded-xl p-3 px-5 w-full appearance-none bg-white"
                                    name="categoryId" id="">
                                    <option 
                                    value= ""
                                    disabled >{categories.length > 0 ? 'Choose category' : 'No category available'}</option>
                                    {
                                        categories?.map((category,index)=>{
                                            return (
                                                <option key={index} value={category._id}>{category.name}</option>
                                            )
                                        })
                                    }
                                </select>
                                <p className="text-xs mt-2 text-red-500">{errorProductFormData.categoryId}</p>
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
                            </span>  
                            <div className="relative w-full">
                            <div className='grid grid-cols-2 gap-1'>
                                {toppings && toppings.length === 0 ? (
                                    <p className="text-gray-500">No toppings available</p>
                                ) : (
                                    toppings.map((topping, index) => (
                                        <label key={index} className="flex items-center w-full ">
                                            <input
                                                type="checkbox"
                                                value={topping._id}
                                                checked={productFormData.toppingIds.includes(topping._id)} 
                                                onChange={handleOnChangeForm} 
                                                className="mr-2 w-5 h-5 border rounded-full checked:bg-blue-600 checked:border-transparent focus:outline-none min-w-[20px]"
                                                name="toppingIds"
                                            />
                                            {topping.name}
                                        </label>
                                    ))
                                )}
                            </div>

                            </div>
                       
                           
                        </div>
                        <div className="mt-5 flex flex-col gap-2">
                            <span className="flex gap-1 ">
                                <h1 className="font-bold text-sm">Description</h1>
                            </span>
                            <textarea
                            value={productFormData.description} 
                            onChange={handleOnChangeForm}
                            className="border focus:outline-none  rounded-xl p-3 px-5 w-full" placeholder='Enter description' 
                            name="description" id=""></textarea>
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
                                    onChange={handleOnChangeForm}
                                    name="price"
                                    value={productFormData.price}
                                    className="appearance-none border focus:outline-none  rounded-xl p-3 px-5 w-full"
                                    type="number" placeholder = 'Enter price' />
                                <p className=" absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
                                    VND
                                </p>
                            </div>
                            <p className="text-xs text-red-500">{errorProductFormData.price}</p>

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
                            <button
                            className='w-full'
                                onClick={handleAddProduct}
                            >Add product</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Product
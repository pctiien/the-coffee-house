import React from 'react'
import categoryService from '../../services/categoryService'

const AddCategory = ()=>{

    // Handle input files 
    const fileInputRef = React.useRef(null)  
    
    const openFileInput = ()=>{
        fileInputRef.current.click()
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setCategoryFormData({...categoryFormData, categoryImage: file})
        }
    }

    const [categoryFormData,setCategoryFormData] = React.useState({
        name: '',
        categoryImage: null,
    })



    const [errorCategoryFormData,setErrorCategoryFormData] = React.useState({})

    const handleOnChangeForm = (e)=>{
        const {name,value} = e.target
        setCategoryFormData({...categoryFormData,[name]:value}) 
    }

    const validCategoryFormData = ()=>{
        
        const errors = {}

        if (categoryFormData.name.length <= 0) {
            errors.name = 'Category name must be at least one character';
        }
        if (!categoryFormData.categoryImage) {
            errors.image = 'Category image is missing';
        }

        
        setErrorCategoryFormData(errors);
        return Object.keys(errors).length === 0; 

    }



    const handleAddCategory = async (e)=>{
        
        if(validCategoryFormData())
        {
            const formData = new FormData()
            formData.append('name', categoryFormData.name);
            formData.append('categoryImage', categoryFormData.categoryImage);

            e.target.disabled = true
            try{
                const response = await categoryService.addNewCategory(categoryFormData)
                if(response.err)
                    {
                        alert(response.err.response.data.message)
                    }else{
                        setCategoryFormData({
                            name: '',
                            categoryImage : null
                    })
                    }
            }catch(err)
            {
                console.err(err.message)
            }finally{
                e.target.disabled = false
            }

        }
        
    }

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
                    <h1>Add Category</h1>
                </div>
                <div className="flex justify-between gap-5 ">
                    <div className ='p-5 bg-white rounded-xl shadow-xl flex-1'>
                        <div className="flex flex-col gap-2">
                            <span className="flex gap-1 ">
                                <h1 className="font-bold text-sm">Category name</h1>
                                <h1 className="text-red-500">*</h1>
                            </span>                            
                            <input 
                            name ="name"
                            value ={categoryFormData.name}
                            onChange={handleOnChangeForm}
                            className="border focus:outline-none  rounded-xl p-3 px-5 w-full"
                            type="text" placeholder = 'Enter category name' />
                            <p className="text-xs text-red-500">{errorCategoryFormData.name}</p>
                        </div>
                        <div className="mt-5 flex flex-col gap-2">
                            <span className="flex gap-1 ">
                                <h1 className="font-bold text-sm">Upload images</h1>
                                <h1 className="text-red-500">*</h1>

                            </span>                            
                            <div 
                            onClick={openFileInput}
                            className="cursor-pointer border-dashed border rounded-xl flex flex-col justify-center items-center gap-2 p-5 py-10">
                                <img 
                                className={`${categoryFormData.categoryImage 
                                    ? 'w-1/2 h-1/2'
                                    : "w-10 h-10" }`}
                                src={`${categoryFormData.categoryImage 
                                    ? URL.createObjectURL(categoryFormData.categoryImage) 
                                    : "/upload.png" }`} alt="" />
                                <input
                                onChange={handleFileChange} 
                                ref={fileInputRef}
                                style={{ display: 'none' }} type="file"  id="fileInput" accept="image/*"  />
                                <span 
                                className="text-sm text-gray-500"  >
                                    <p className=" inline-block">Drop your images here or select </p>
                                    <p className=" inline-block ml-1 text-blue-600">click to browse</p>
                                </span>
                            </div>
                            <p className="text-xs text-red-500">{errorCategoryFormData.image}</p>
                            <p className="text-xs text-gray-500">You need to add at least 1 images. Pay attention to the quality of the pictures you add, comply with the background color standards. Pictures must be in certain dimensions. Notice that the category shows all the details</p>
                        </div>
                        
                        <div className="mt-5  text-center text-white font-semibold">
                            <button
                            className='w-full  bg-blue-500 p-3 px-5 rounded-xl disabled:bg-gray-300 disabled:cursor-not-allowed  '
                                onClick={handleAddCategory}
                            >Add category</button>
                        </div>
                       
                      
                    </div>
                    
                </div>
            </div>
        </>
    )
}
export default AddCategory
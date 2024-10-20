import React from 'react'
import voucherService from '../../services/voucherService'

const AddVoucher = ()=>{

    // Handle input files 
    const fileInputRef = React.useRef(null)  
    
    const openFileInput = ()=>{
        fileInputRef.current.click()
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setVoucherFormData({...voucherFormData, voucherImage: file})
        }
    }


    const [voucherFormData,setVoucherFormData] = React.useState({
        description: '',
        code : '',
        discountType: '',
        discountValue:'',
        minimumOrderValue: '',
        validTo: '',
        voucherImage: null
    })

    const [errorVoucherFormData,setErrorVoucherFormData] = React.useState({})

    const handleOnChangeForm = (e)=>{
        const {name,value} = e.target
        setVoucherFormData({...voucherFormData,[name]:value}) 

        
    }

    const validVoucherFormData = ()=>{
        
        const errors = {}
        if (voucherFormData.description.length <= 0) {
            errors.description = 'Voucher description must be at least one character';
        }
        if (!voucherFormData.voucherImage) {
            errors.voucherImage = 'Voucher image is missing';
        }
        const discountValue = parseFloat(voucherFormData.discountValue);
        if (isNaN(discountValue) || discountValue <= 0) {
            errors.discountValue = 'Voucher discount must be over 0';
        }
        const minimumOrderValue = parseFloat(voucherFormData.minimumOrderValue);
        if (isNaN(minimumOrderValue) || minimumOrderValue < 0) {
            errors.minimumOrderValue = 'Minimum order value must not be less than 0';
        }
        if (voucherFormData.discountType.trim().length <=0 || !['PERCENTAGE','FIXED_AMOUNT'].includes(voucherFormData.discountType.trim()) ) {
            errors.discountType = 'Discount type must be valid';
        }
        const validTo = voucherFormData.validTo 
        if(validTo <= Date.now())
        {
            errors.validTo = 'Expired day must be a future date'
        }
        if(!voucherFormData.description)
        {
            errors.description = 'Voucher description is missing';

        }
        if(voucherFormData.code.length<9 || voucherFormData.code.length>12)
        {
                errors.code = 'Voucher code must be between 9 and 12 characters long';
    
        }
        setErrorVoucherFormData(errors);
        return Object.keys(errors).length === 0; 

    }



    const handleAddVoucher = async (e)=>{
        
        if(validVoucherFormData())
        {
            const formData = new FormData()
            formData.append('description', voucherFormData.description);
            formData.append('code', voucherFormData.code);
            formData.append('discountType', voucherFormData.discountType);
            formData.append('discountValue', voucherFormData.discountValue);
            formData.append('minimumOrderValue', voucherFormData.minimumOrderValue);
            formData.append('voucherImage', voucherFormData.voucherImage);
            formData.append('validTo', voucherFormData.validTo);


            e.target.disabled = true
            try{
                const response = await voucherService.addNewVoucher(formData)
                if(response.err)
                    {
                        alert(response.err.response.data.message)
                    }else{
                        setVoucherFormData({
                            description: '',
                            code : '',
                            discountType: '',
                            discountValue:'',
                            minimumOrderValue: '',
                            validTo: '',
                            voucherImage: null
                    })
                    }
            }catch(err)
            {
                console.error(err.message)
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
                    <h1>Add Voucher</h1>
                </div>
                <div className="flex justify-between gap-5 ">
                    <div className ='p-5 bg-white rounded-xl shadow-xl flex-1'>
                        <div className="flex flex-col gap-2">
                            <span className="flex gap-1 ">
                                <h1 className="font-bold text-sm">Voucher description</h1>
                                <h1 className="text-red-500">*</h1>
                            </span>                            
                            <input 
                            name ="description"
                            value ={voucherFormData.description}
                            onChange={handleOnChangeForm}
                            className="border focus:outline-none  rounded-xl p-3 px-5 w-full"
                            type="text" placeholder = 'Enter voucher description' />
                            <p className="text-xs text-red-500">{errorVoucherFormData.description}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="flex gap-1 ">
                                <h1 className="font-bold text-sm">Voucher code</h1>
                                <h1 className="text-red-500">*</h1>
                            </span>                            
                            <input 
                            name ="code"
                            value ={voucherFormData.code}
                            onChange={handleOnChangeForm}
                            className="border focus:outline-none  rounded-xl p-3 px-5 w-full"
                            type="text" placeholder = 'Enter code' />
                            <p className="text-xs text-red-500">{errorVoucherFormData.code}</p>
                        </div>
                        <div className="mt-5 flex flex-col gap-2">
                            <span className="flex gap-1 ">
                                <h1 className="font-bold text-sm">Discount type</h1>
                                <h1 className="text-red-500">*</h1>
                            </span> 
                            <div className="relative w-full">
                                <select
                                    onChange={handleOnChangeForm}
                                    value={voucherFormData.discountType}
                                    className="border border-gray-300 focus:outline-none rounded-xl p-3 px-5 w-full appearance-none bg-white"
                                    name="discountType" id="">
                                    <option value= "PERCENTAGE"  >PERCENTAGE</option>
                                    <option value= "FIXED_AMOUNT"  >FIXED_AMOUNT</option>

                                   
                                </select>
                                <p className="text-xs mt-2 text-red-500">{errorVoucherFormData.discountType}</p>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path  d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="flex gap-1 ">
                                <h1 className="font-bold text-sm">Minimum order value</h1>
                                <h1 className="text-red-500">*</h1>
                            </span>                            
                            <input 
                            name ="minimumOrderValue"
                            value ={voucherFormData.minimumOrderValue}
                            onChange={handleOnChangeForm}
                            className="border focus:outline-none  rounded-xl p-3 px-5 w-full"
                            type="text" placeholder = 'Enter minimum order value' />
                            <p className="text-xs text-red-500">{errorVoucherFormData.minimumOrderValue}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="flex gap-1 ">
                                <h1 className="font-bold text-sm">Expired day</h1>
                                <h1 className="text-red-500">*</h1>
                            </span>                            
                            <input 
                            name ="validTo"
                            value ={voucherFormData.validTo}
                            onChange={handleOnChangeForm}
                            className="border focus:outline-none  rounded-xl p-3 px-5 w-full"
                            type="date" placeholder = 'Enter expired day' />
                            <p className="text-xs text-red-500">{errorVoucherFormData.expiredDay}</p>
                        </div>
                        
                        
                       
                    </div>
                    <div className ='p-5 bg-white rounded-xl shadow-xl flex-1 h-max'>
                    

                        <div className=" flex flex-col gap-2">
                            <span className="flex gap-1 ">
                                <h1 className="font-bold text-sm">Discount value</h1>
                                <h1 className="text-red-500">*</h1>
                            </span>                            
                            <div className ='relative'>
                                <input
                                    onChange={handleOnChangeForm}
                                    name="discountValue"
                                    value={voucherFormData.discountValue}
                                    className="appearance-none border focus:outline-none  rounded-xl p-3 px-5 w-full"
                                    type="number" placeholder = 'Enter discount value' />
                            
                            </div>
                            <p className="text-xs text-red-500">{errorVoucherFormData.discountValue}</p>

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
                                className={`${voucherFormData.voucherImage 
                                    ? 'w-1/2 h-1/2'
                                    : "w-10 h-10" }`}
                                src={`${voucherFormData.voucherImage 
                                    ? URL.createObjectURL(voucherFormData.voucherImage) 
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
                            <p className="text-xs text-red-500">{errorVoucherFormData.voucherImage}</p>
                            <p className="text-xs text-gray-500">You need to add at least 1 images. Pay attention to the quality of the pictures you add, comply with the background color standards. Pictures must be in certain dimensions. Notice that the product shows all the details</p>
                        </div>
                        <div className="mt-5  text-center text-white font-semibold">
                            <button
                            className='w-full  bg-blue-500 p-3 px-5 rounded-xl disabled:bg-gray-300 disabled:cursor-not-allowed  '
                                onClick={handleAddVoucher}
                            >Add voucher</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default AddVoucher
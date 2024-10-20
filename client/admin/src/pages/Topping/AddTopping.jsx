import React from 'react'
import toppingService from '../../services/toppingService'

const AddTopping= ()=>{


    const [toppingFormData,setToppingFormData] = React.useState({
        name: '',
        priceAddition: '',
    })



    const [errorToppingFormData,setErrorToppingFormData] = React.useState({})

    const handleOnChangeForm = (e)=>{
        const {name,value} = e.target
        setToppingFormData({...toppingFormData,[name]:value}) 
    }

    const validToppingFormData = ()=>{
        
        const errors = {}

        if (toppingFormData.name.length <= 0) {
            errors.name = 'Topping name must be at least one character';
        }
        const price = parseFloat(toppingFormData.priceAddition);
        if (isNaN(price) || price <= 1) {
            errors.price = 'Topping additional price must be over 1';
        }
        
        setErrorToppingFormData(errors);
        return Object.keys(errors).length === 0; 

    }



    const handleAddTopping = async (e)=>{
        
        if(validToppingFormData())
        {
            e.target.disabled = true
            try{
                console.log(toppingFormData)
                const response = await toppingService.addNewTopping(toppingFormData)
                if(response.err)
                    {
                        alert(response.err.response.data.message)
                    }else{
                        setToppingFormData({
                            name: '',
                            priceAddition : ''
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
                    <h1>Add Topping</h1>
                </div>
                <div className="flex justify-between gap-5 ">
                    <div className ='p-5 bg-white rounded-xl shadow-xl flex-1'>
                        <div className="flex flex-col gap-2">
                            <span className="flex gap-1 ">
                                <h1 className="font-bold text-sm">Topping name</h1>
                                <h1 className="text-red-500">*</h1>
                            </span>                            
                            <input 
                            name ="name"
                            value ={toppingFormData.name}
                            onChange={handleOnChangeForm}
                            className="border focus:outline-none  rounded-xl p-3 px-5 w-full"
                            type="text" placeholder = 'Enter topping name' />
                            <p className="text-xs text-red-500">{errorToppingFormData.name}</p>
                        </div>
                        <div className=" flex flex-col gap-2">
                            <span className="flex gap-1 ">
                                <h1 className="font-bold text-sm">Price Addition</h1>
                                <h1 className="text-red-500">*</h1>
                            </span>                            
                            <div className ='relative'>
                                <input
                                    onChange={handleOnChangeForm}
                                    name="priceAddition"
                                    value={toppingFormData.priceAddition}
                                    className="appearance-none border focus:outline-none  rounded-xl p-3 px-5 w-full"
                                    type="number" placeholder = 'Enter additional price' />
                                <p className=" absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
                                    VND
                                </p>
                            </div>
                            <p className="text-xs text-red-500">{errorToppingFormData.price}</p>

                        </div>
                        <div className="mt-5  text-center text-white font-semibold">
                            <button
                            className='w-full  bg-blue-500 p-3 px-5 rounded-xl disabled:bg-gray-300 disabled:cursor-not-allowed  '
                                onClick={handleAddTopping}
                            >Add topping</button>
                        </div>
                       
                      
                    </div>
                    
                </div>
            </div>
        </>
    )
}
export default AddTopping
import React from 'react';
import ProductList from './ProductList';

const Category = ({categories})=>{

    const [activeItem,setActiveItem] = React.useState( categories ? categories[0] : '' )

    const handleClick = (item)=>{
        setActiveItem(item)
    }




    return (
        <>
            <div 
            id='product-list'
            className='px-36'>
                <div className='flex flex-col items-center mt-12'>
                    <h1 className=' font-semibold text-3xl'>Products from House</h1>
                    <div className=' py-10 flex flex-wrap w-full justify-center gap-20'>
                    {
                        categories?.map((cate,index)=>{
                            return (
                                <div 
                                onClick={()=>handleClick(cate)}
                                key={index} className='cursor-pointer flex flex-col items-center text-center w-20 '>
                                    <img 
                                    style={{borderWidth:'16px'}}
                                    className={`w-20 h-20 rounded-full border-orange-100 ${activeItem === cate ? 'border-orange-200' :''}`}
                                    src={cate.img} alt="" />
                                    <h1 className='w-full text-gray-400 text-xs font-medium '>{cate.name}</h1>
                            </div>
                            )
                        })
                    }
                        
                    </div>
                </div>
                <ProductList category={activeItem}></ProductList>
            </div>
        </>
    )
}
export default Category 
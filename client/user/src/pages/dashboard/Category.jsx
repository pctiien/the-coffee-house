import React from 'react';
import Categories from '../../sample/Categories'
import ProductList from '../../features/Product/ProductList';
const Category = ()=>{

    const [activeItem,setActiveItem] = React.useState(Categories[0])
    const handleClick = (item)=>{
        setActiveItem(item)
    }
    return (
        <>
            <div className=''>
                <div className='flex flex-col items-center p-10 px-36'>
                    <h1 className=' font-semibold text-3xl'>Products from House</h1>
                    <div className='py-16 flex flex-wrap justify-center  gap-12'>
                    {
                        Categories.map((cate,index)=>{
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
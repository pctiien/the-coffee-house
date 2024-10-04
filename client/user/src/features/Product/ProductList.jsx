import Products from '../../sample/Products'
import Product from './Product'
import productService from '../../services/productService'
import React from 'react'
const ProductList = ({category})=>{

    const [productList,setProductList] = React.useState([])

    const fetchProducts = async()=>{
        if(category?._id)
        {
            const response = await productService.getProductsByCategoryId(category._id)
            if(response.err)
            {
                console.err(response.err)
            }else{
                setProductList(response.data.result.products)
            }
        }
        
    }

    React.useEffect(()=>{

        fetchProducts()
        
    },[category])

    return (
        <>
            <div 
            className='grid grid-cols-6 gap-8'>
            {
                productList?.map((product,index)=>{
                    return (
                        <Product key={index} item={product} ></Product>
                    )
                })
            }
            </div>
        </>
    )
}
export default ProductList
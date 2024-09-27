import Products from '../../sample/Products'
import Product from './Product'

const ProductList = ({category})=>{
    return (
        <>
            <div 
            className='grid grid-cols-6 gap-8'>
            {
                Products.filter(product=>product.category === category.id).map((product,index)=>{
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
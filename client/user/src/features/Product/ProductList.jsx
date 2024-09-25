import Products from '../../sample/Products'
import Product from './Product'

const ProductList = ({category})=>{
    return (
        <>
            <div className='flex gap-8 px-20 justify-center flex-wrap'>
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
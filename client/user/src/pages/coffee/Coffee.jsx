import Banner from '../../features/Common/Banner'
import {CoffeeSlides} from '../../sample/Banner'
import Category from '../../features/Product/Category'
import { CoffeeCategories } from '../../sample/Categories'
const Coffee = ()=>{
    return (
        <>
        <Banner  slides = {CoffeeSlides} />
        <Category categories={CoffeeCategories} />
        </>
    )
}
export default Coffee
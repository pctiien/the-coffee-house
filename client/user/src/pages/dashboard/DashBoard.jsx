import Banner from '../../features/Common/Banner.jsx';
import Category from '../../features/Product/Category.jsx'
import NewsList from '../../features/News/NewsList.jsx';
import {DashboardSlides} from '../../sample/Banner'
import {Categories} from '../../sample/Categories'
const DashBoard = ()=>{
    return (
        <>
            <Banner slides ={DashboardSlides}/>
            <Category categories = {Categories}/>
            <div>
                <h1 className='text-center text-3xl font-semibold mt-20'>News</h1>
            </div>
            <NewsList/>
        </>
    )
}

export default DashBoard
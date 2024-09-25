import Banner from '../../features/Common/Banner.jsx';
import Category from './Category'
import NewsList from '../../features/News/NewsList.jsx';
import Footer from '../../ui/Footer.jsx';
const DashBoard = ()=>{
    return (
        <>
            <Banner/>
            <Category/>
            <NewsList/>
        </>
    )
}

export default DashBoard
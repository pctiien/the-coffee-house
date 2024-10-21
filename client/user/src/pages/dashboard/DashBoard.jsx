import React from 'react'

import Banner from '../../features/Common/Banner.jsx';
import Category from '../../features/Product/Category.jsx'
import NewsList from '../../features/News/NewsList.jsx';

import {DashboardSlides} from '../../sample/Banner'

import categoryService from '../../services/categoryService';
const DashBoard = ()=>{

    // Handle get categories
    const [categories,setCategories] = React.useState([])
    const fetchCategories = async()=>{

        const response = await categoryService.getAllCategories()
        if(response.err)
        {
            console.error(response.err)   
        }else{
            setCategories(response.data.result.categories)
        }
    }

    React.useEffect(()=>{
        fetchCategories()
    },[])


    return (
        <>
            <Banner slides ={DashboardSlides}/>
            <Category categories = {categories}/>
            <div>
                <h1 className='text-center text-3xl font-semibold mt-20'>News</h1>
            </div>
            <NewsList/>
        </>
    )
}

export default DashBoard
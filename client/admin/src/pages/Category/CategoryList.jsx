import './CategoryList.css'
import Pagination from '../../features/Common/Pagination'
import React from 'react'
import categoryService  from '../../services/categoryService'

const CategoryList = ()=>{

    const [categories,setCategories] = React.useState([])

    const [selectedPage,setSelectedPage] = React.useState(1)

    const [entry,setEntry] = React.useState(10)

    const [totalEntry,setTotalEntry] = React.useState(0)

    const onEntryChange = (e)=>{
        setEntry(Number(e.target.value)); 
        onPageChange(1)
    }
    const onPageChange = (page)=>{
        setSelectedPage(page)
    }
    React.useEffect(()=>{
        
        const fetchCategories = async()=>{
            try{
                const response = await categoryService.getAllCategories(entry,selectedPage)
                setCategories(response.data.result.categories)
                setTotalEntry(response.data.result.total)
            } catch(e)
            {
                console.log(e.message)
            }         
        }

        fetchCategories()

        
    },[selectedPage,entry])
    return (
        <>
        <div className="">
            <div className="m-3 mx-5 p-5 text-xs text-gray-600 bg-white rounded-lg">
                <div className="flex items-center justify-between">
                    <div className="w-3/5 flex items-center gap-3">
                        <p>Showing</p>
                        <select 
                        onChange ={onEntryChange}
                        className="p-2 px-4 border rounded-xl"
                        name="" id="">
                            <option 
                            value={10}>10</option>
                            <option 
                            value={20}>20</option>
                            <option 
                            value={30}>30</option>
                        </select>
                        <p>entries</p>
                        <div className="flex-1 ml-4 text-base border flex p-4 px-5 bg-white rounded-xl justify-between items-center">
                            <input 
                            className="bg-transparent focus:outline-none"
                            type="text" placeholder="Search here..."/>
                            <img 
                            className="w-4 h-4"
                            src="/search.png" alt="" />
                        </div>
                    </div>
                    <div className="w-1/5 border text-blue-500 text-sm font-semibold border-blue-500 rounded-xl p-4 px-8 text-center">
                        <button>+ Add new</button>

                    </div>
                </div>
                <div className=''>
                    <div className='border-b py-5 pb-12'>
                        <table className='text-sm text-black '>
                            <thead className=''>
                                <tr>
                                    <th>ID</th>
                                    <th>Category name</th>
                                    <th>Category image</th>
                                </tr>
                            </thead>
                            <tbody className=''>
                                {
                                    categories?.map((category,index)=>{
                                        return (
                                            <tr key={index} className=''>
                                                <td >{category._id}</td>
                                                <td className='font-semibold'>{category.name}</td>
                                                <td>
                                                    <img
                                                    className= 'w-10 h-10' 
                                                    src={category.img} alt="" />
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                               
                            </tbody>
                        </table>
                    </div>
                    <Pagination  onPageChange={onPageChange} entry={entry} currentPage={selectedPage} totalEntry={totalEntry}/>
                </div>
            </div>
        </div>
        </>
    )
}
export default CategoryList 
import Pagination from "../../features/Common/Pagination"
import productService from '../../services/productService'
import EditProductDialog from "./EditProductDialog"
import Dialog from '../../features/Common/Dialog'

import React from 'react'
import {  useNavigate } from 'react-router-dom';
import { useNavBarItemContext } from "../../context/NavBarItemContext"
const ProductList = ()=>{


    // Handle delete product dialog
    const [isOpenDeleteDialog,setIsOpenDeleteDialog] = React.useState(false)
    const onOpenDeleteDialog = (product)=>{
        setSelectedProduct(product)
        setIsOpenDeleteDialog(true)
    }
    const onCloseDeleteDialog = ()=>{
        setIsOpenDeleteDialog(false)
    }
    const handleDeleteProduct = async()=>{

        const response = await productService.deleteProduct(selectedProduct._id)
        
        if(response.err)
        {
            console.error(response.err)
        }else{
            console.log(response)
        }
        fetchProducts()
    }
    const deleteDialogMsg = "Are you sure to delete this product"



    // Handle edit product dialog
    const [isOpenDialog,setIsOpenDialog] = React.useState(false)
    const [selectedProduct,setSelectedProduct] = React.useState(null)
    const onCloseDialog = ()=>{
        setIsOpenDialog(false)
    }
    const onOpenDialog = (item)=>{
        setSelectedProduct(item)
        setIsOpenDialog(true)
    }



    // Handle navbar items checked
    const navigate = useNavigate();
    const { setSelectedItem } = useNavBarItemContext(); 
    const handleNavigateAddNew = ()=>{

        setSelectedItem(0)
        navigate('/products/add')

    }


    // Handle fetch products
    const [products,setProducts] = React.useState([])
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


    const formattedDate = (isoDate)=>{
        const date = new Date(isoDate)
        return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`
    } 

    const fetchProducts = async()=>{
        try{
            const response = await productService.getAllProducts(entry,selectedPage)
            setProducts(response.data.result.products)
            setTotalEntry(response.data.result.total)
        } catch(e)
        {
            console.log(e.message)
        }         
    }

    
    React.useEffect(()=>{
        

        fetchProducts()

        
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
                    <div className="w-1/5 border text-blue-500 text-sm font-semibold border-blue-500 rounded-xl text-center flex justify-center items-center">
                            <button 
                            className="flex-1 p-3 px-8 "  
                            onClick={handleNavigateAddNew}>
                                + Add new

                            </button>
                    </div>

                </div>
                <div className=''>
                    <div className='border-b py-5 pb-12'>
                        <table className='text-sm text-black '>
                            <thead className=''>
                                <tr>
                                    <th>ID</th>
                                    <th>Product name</th>
                                    <th>Product image</th>
                                    <th>Price</th>
                                    <th>Publish date</th>
                                    <th>Actions</th>

                                </tr>
                            </thead>
                            <tbody className=''>
                                {
                                    products?.map((product,index)=>{
                                        return (
                                            <tr key={index} className=''>
                                                <td >{product._id}</td>
                                                <td className='font-semibold'>{product.name}</td>
                                                <td>
                                                    <img
                                                    className= 'w-10 h-10' 
                                                    src={product.imageUrl} alt="Product's image" />
                                                </td>
                                                <td>
                                                    {product.price}
                                                </td><td>
                                                    {formattedDate(product.createdAt)}
                                                </td>
                                                <td className=" text-white">
                                                    <button 
                                                    onClick={()=>onOpenDialog(product)}
                                                    className="bg-blue-500 p-2 rounded-lg px-5">Edit</button>
                                                    <button 
                                                    onClick={()=>onOpenDeleteDialog(product)}
                                                    className="ml-2 bg-red-500 p-2 rounded-lg px-5">Delete</button>
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
            <EditProductDialog isOpen={isOpenDialog} onClose={onCloseDialog} product ={selectedProduct} afterUpdate = {fetchProducts}/>
            <Dialog isOpen={isOpenDeleteDialog} onClose={onCloseDeleteDialog} message={deleteDialogMsg} onSave={handleDeleteProduct} />
        </div>
        </>
    )
}
export default ProductList
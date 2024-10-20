import axiosClient from './axios'

const getAllCategories = async(limit=10,page=1)=>{

    return await axiosClient.get(`/categories?limit=${limit}&page=${page}`)
                            .then(response=>{
                                return {
                                    data: response.data,
                                    
                                }
                            })
                            .catch(err=> {
                                return {
                                    data: null,
                                    message : err.message
                                }
                            })
    
}
const addNewCategory = async(categoryData)=>{
    return await axiosClient.post('/categories',categoryData,{
            headers:{ 'content-type': 'multipart/form-data' }
            }).then(response=>{
                return {
                    data: response.data
                }
            })
            .catch(err=>{
                return {
                    data: null,
                    err
                }
            })
}
const deleteCategory = async(categoryId)=>{
    return await axiosClient.delete(`/categories/${categoryId}`)
            .then(response=>{
                return {
                    data: response.data
                }
            })
            .catch(err=>{
                return {
                    data:null,
                    err
                }
            })
}
export default {getAllCategories,addNewCategory,deleteCategory}
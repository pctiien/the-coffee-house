import axiosClient from './axios'

const getAllProducts = async(limit=10,page=1)=>{
    return await axiosClient.get(`/products?limit=${limit}&page=${page}`)
            .then(response=>{
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

const addNewProduct = async(productData)=>{
    return await axiosClient.post('/products',productData,{
        headers:{ 'content-type': 'multipart/form-data' }
    })
            .then(response=>{
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

const updateProduct = async(productId,productData)=>{
    return await axiosClient.patch(`/products/${productId}`,productData,{
        headers:{ 'content-type': 'multipart/form-data' }
    })
            .then(response =>{
                return {
                    data: response.data,
                }
            }
            )
            .catch(err=>{
                return {
                    data: null,
                    err
                }
            })
            
}

const deleteProduct = async(productId)=>{
    return await axiosClient.delete(`/products/${productId}`)
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
export default {getAllProducts,addNewProduct,updateProduct,deleteProduct}
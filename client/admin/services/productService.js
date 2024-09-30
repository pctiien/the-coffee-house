import axiosClient from './axios'

const getAllProducts = async()=>{
    return await axiosClient.get('/products')
            .then(response=>{
                return {
                    data: response.data.data
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
    return await axiosClient.post('/products',productData)
            .then(response=>{
                return {
                    data: response.data.data
                }
            })
            .catch(err=>{
                return {
                    data: null,
                    err
                }
            })
}

const updateProduct = async(productData)=>{
    return await axiosClient.patch('products',productData)
            .then(response =>{
                return {
                    data: response.data.data,
                }
            .catch(err=>{
                return {
                    data: null,
                    err
                }
            })
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
export {getAllProducts,addNewProduct,updateProduct,deleteProduct}
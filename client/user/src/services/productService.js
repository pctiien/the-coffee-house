import axiosClient from "./axiosClient"

const getProductsByCategoryId = async(categoryId)=>{

    return await axiosClient.get(`/products?categoryId=${categoryId}`)
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

export default {getProductsByCategoryId}
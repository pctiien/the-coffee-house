import axiosClient from "./axiosClient"

const getAllCategories = async(limit=100)=>{
    return await axiosClient.get(`/categories?limit=${limit}`)
                    .then(res=>{
                        return {
                            data: res.data
                        }
                    })
                    .catch(err=>{
                        return {
                            data: null,
                            err
                        }
                    })
}
export default {getAllCategories}
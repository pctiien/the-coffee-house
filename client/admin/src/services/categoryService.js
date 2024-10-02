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

export default {getAllCategories}
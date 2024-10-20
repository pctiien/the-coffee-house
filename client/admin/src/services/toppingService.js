import axiosClient from './axios'

const getAllToppings = async(limit=10,page=1)=>{
    
    return await axiosClient.get(`/toppings?limit=${limit}&page=${page}`)
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
const addNewTopping = async(toppingData)=>{
    
    return await axiosClient.post('/toppings',toppingData)
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
const deleteTopping = async(toppingId)=>{
    return await axiosClient.delete(`/toppings/${toppingId}`)
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
export default {getAllToppings,addNewTopping,deleteTopping}
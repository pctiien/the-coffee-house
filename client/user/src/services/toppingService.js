import axiosClient from './axiosClient'

const getToppingsByIds = async(ids)=>{
    
    const idsStr = ids.join(',')
    return await axiosClient.get(`/toppings/filter?_id=${idsStr}`)
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

export default {getToppingsByIds}
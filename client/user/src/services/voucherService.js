import axiosClient from './axiosClient'

const getAllVouchers = async(limit=10,page=1)=>{

    return await axiosClient.get(`/vouchers?limit=${limit}&page=${page}`)
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
export default {getAllVouchers}
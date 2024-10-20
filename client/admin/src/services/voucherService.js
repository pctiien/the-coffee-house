import axiosClient from './axios'

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
const addNewVoucher = async(voucherData)=>{
    return await axiosClient.post('/vouchers',voucherData,{
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
const deleteVoucher = async(voucherId)=>{
    return await axiosClient.delete(`/vouchers/${voucherId}`)
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
export default {getAllVouchers,addNewVoucher,deleteVoucher}
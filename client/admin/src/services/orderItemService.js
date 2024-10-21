import axiosClient from './axios'

const getOrderItemsByOrder = async(orderId)=>{

    return await axiosClient.get(`/orderitems?orderId=${orderId}`)
                            .then(response=>{
                                return {
                                    data: response.data,
                                    
                                }
                            })
                            .catch(err=> {
                                return {
                                    data: null,
                                    err
                                }
                            })
    
}

export default {getOrderItemsByOrder}
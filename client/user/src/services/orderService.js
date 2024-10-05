import axiosClient from './axiosClient'

const createOrder = async(order)=>{
    return await axiosClient.post('/orders',order)
                .then(response=>{
                    return{
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

export default {createOrder}
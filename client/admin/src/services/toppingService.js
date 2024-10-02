import axiosClient from './axios'

const getAllToppings = async()=>{
    
    return await axiosClient.get('/toppings')
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

export default {getAllToppings}
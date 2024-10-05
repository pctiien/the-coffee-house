import axiosClient from './axiosClient'

const getAllSizes = async ()=>{
    return await axiosClient.get('/sizes')
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

export default {getAllSizes}
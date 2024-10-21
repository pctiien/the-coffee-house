import axiosClient from './axios'

const getAllUsers = async(limit,page)=>{
    return await axiosClient.get(`/users?limit=${limit}&page=${page}`)
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

export default {getAllUsers}
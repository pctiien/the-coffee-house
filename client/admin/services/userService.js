import axiosClient from './axios'

const getAllUsers = async()=>{
    return await axiosClient.get('/users')
        .then(response=>{
            return {
                data : response.data.data
            }
        })
        .catch(err=>{
            return {
                data:null,
                err
            }
        })
}

export {getAllUsers}
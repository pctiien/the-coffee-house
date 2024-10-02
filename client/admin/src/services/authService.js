import axiosClient from './axios'

const signUp = async (user)=>{
    return await axiosClient.post('/auth/signup',user)
            .then(response=>{
                return {
                    data: response.data,
                }
            })
            .catch(err=>{
                return {
                    data: null,
                    message: err.message
                }
            })
}

const login = async(user)=>{
    return await axiosClient.post('/auth/login',user)
        .then(
            response=>{
                return {
                    message : response.message
                }
        })
        .catch(
            err =>{
                return {
                    err
                }
            }
        )
}
export {signUp,login}
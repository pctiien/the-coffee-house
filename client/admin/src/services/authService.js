import axiosClient from './axios'
import {jwtDecode} from 'jwt-decode'
const logIn = async(data)=>{
    return await axiosClient.post('/auth/login',data)
                    .then(response=>{
                        const token = response.data.token
                        const user = jwtDecode(token)
                        return {
                            data: {
                                user,
                                token
                            }
                        }
                    })
                    .catch(err=>{
                        return {
                            data: null,
                            err
                        }
                    })
}
export default {logIn}
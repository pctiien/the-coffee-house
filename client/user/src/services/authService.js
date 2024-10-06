import axiosClient from "./axiosClient"
import {jwtDecode} from "jwt-decode";
const signUp = async(data)=>{
    return await axiosClient.post('/auth/signup',data)
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

export default {signUp,logIn}
import React from 'react';
import authService from '../../services/authService'
import {useAuth} from '../../utils/hooks/useAuth'
const Login = ({isOpen,onClose})=>{

    const Auth = useAuth()

    const dialogRef = React.useRef(null);
    const [formData,setFormData]= React.useState({
        email: '',
        password: '',
    })
    const onChangeForm = (e)=>{
        const {name,value} = e.target
        setFormData({...formData,[name]:value})
    }

    const submitLogin = async()=>{

        const response = await authService.logIn(formData)

        if(response.err){
            alert(response.err.response.data.message)
        }else{
            Auth.userLogin(response.data)
            onClose()
        }

    }
    React.useEffect(()=>{

        const handleClickOutside = (e) =>{
            if(dialogRef.current && !dialogRef.current.contains(e.target))
            {
                onClose()
            }
        }

        document.addEventListener('mousedown',handleClickOutside)

        return ()=>{
            document.removeEventListener('mousedown',handleClickOutside)
        }
    },[onClose])

    if(!isOpen) return null
    return (
        <>
        <div className="fixed z-50 inset-0 bg-black opacity-45"></div>
        <div className='pt-24 fixed inset-0  flex flex-col justify-start items-center z-50 '>
            <div 
            ref={dialogRef}
            className="w-1/4 bg-white rounded-lg flex flex-col items-center  ">
                    
                <img 
                className = 'rounded-t-lg'
                src="https://order.thecoffeehouse.com/_nuxt/img/thumbnail-login-pop-up.e10d0dd.png" alt="" />
                <div className='flex flex-col items-center w-full p-5 gap-4 '>
                    <p>Welcome to                    </p>
                    <img src="https://order.thecoffeehouse.com/_nuxt/img/logo-black.44900f6.svg" alt="" />
                    <div className='w-full flex flex-col gap-2 mt-3 '>
                        <input
                        onChange= {onChangeForm}
                        value = {formData.email}
                        name ="email" 
                        className = 'focus:outline-none rounded-md border p-2  w-full'
                        type="text" placeholder='Enter your email or phone number' />
                        <input 
                        value ={formData.password}
                        onChange={onChangeForm}
                        name = "password"
                        className = 'focus:outline-none rounded-md border p-2  w-full'
                        type="password" placeholder='Enter your password' />
                    </div>
                    <div className='w-full'>
                        <button 
                        onClick ={submitLogin}
                        className='w-full bg-orange-500 rounded-full p-3 text-white '>Log in</button>
                        <p></p>
                    </div>
                </div>

            </div>

        </div>
        </>
    )

};

export default Login;

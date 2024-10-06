import React from 'react';
import authService from '../../services/authService'
const Signup = ({isOpen,onClose})=>{

    const [formData,setFormData] = React.useState({
        email: '',
        phone: '',
        password: '',
        re_password: '',
        name: ''
    })
    const [errors,setErrors] = React.useState({})
    const onChangeForm = (e)=>{
        const {name,value} = e.target
        setFormData({...formData,[name]:value})
    }
    const validateForm = ()=>{
        setErrors({})
        let err = {}

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (formData.email.length <= 0) {
            err.email = 'Email is required';
        } else if (!emailRegex.test(formData.email)) {
            err.email = 'Email is not valid';
        }

        if(formData.phone.length <=0){
            err.phone = 'Phone is required'
        }
        if(formData.password.length <=6)
        {
            err.password = 'Password length must be over 6 characters'
        }
        if(formData.re_password !== formData.password)
        {
            err.re_password = 'Re-password must be same with password'
        }
        if(formData.name.length <=0)
        {
            err.name = 'Name is required'
        }
        setErrors(err)
        return Object.keys(err).length === 0
    }
    const submitForm = async()=>{

        if (!validateForm()) return

        const response = await authService.signUp({
            email: formData.email,
            phone: formData.phone,
            password: formData.password,
            name: formData.name
        })
        if(response.err)
        {
            alert(response.err.response.data.message)
        }else{
            console.log(response)
            setFormData({
                email: '',
                phone: '',
                password: '',
                re_password: '',
                name: ''
            })
            onClose()
        }

    }
    const dialogRef = React.useRef(null);

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
        <div className='mt-10 fixed inset-0  flex flex-col justify-start items-center z-50 '>
            <div 
            ref={dialogRef}
            className="w-1/4 bg-white rounded-lg flex flex-col items-center overflow-y-scroll ">
                    
                <img 
                className = 'rounded-t-lg'
                src="https://order.thecoffeehouse.com/_nuxt/img/thumbnail-login-pop-up.e10d0dd.png" alt="" />
                <div className='flex flex-col items-center w-full p-5 gap-4 '>
                    <p>Welcome to                    </p>
                    <img src="https://order.thecoffeehouse.com/_nuxt/img/logo-black.44900f6.svg" alt="" />
                    <div className='w-full flex flex-col gap-2 mt-3 '>
                        <input 
                        onChange={onChangeForm}
                        name = 'email'
                        value={formData.email}
                        className = 'focus:outline-none rounded-sm border p-2  w-full'
                        type="email" placeholder='Enter your email' />
                        <p className='text-red-500 text-xs'>{errors.email}</p>
                        <input 
                        onChange={onChangeForm}
                        name = 'phone'
                        value={formData.phone}
                        className = 'focus:outline-none rounded-sm border p-2  w-full'
                        type="number" placeholder='Enter your phone number' />
                        <p className='text-red-500 text-xs'>{errors.phone}</p>
                        <input 
                        onChange={onChangeForm}
                        name = 'password'
                        value= {formData.password}
                        className = 'focus:outline-none rounded-sm border p-2  w-full'
                        type="password" placeholder='Enter your password' />
                        <p className='text-red-500 text-xs'>{errors.password}</p>
                        <input 
                        onChange={onChangeForm}
                        name = 're_password'
                        value ={formData.re_password}
                        className = 'focus:outline-none rounded-sm border p-2  w-full'
                        type="password" placeholder='Re-enter your password' />
                        <p className='text-red-500 text-xs'>{errors.re_password}</p>

                        <input 
                        onChange={onChangeForm}
                        name = 'name'
                        value ={formData.name}
                        className = 'focus:outline-none rounded-sm border p-2  w-full'
                        type="text" placeholder='Full name' />
                        <p className='text-red-500 text-xs'>{errors.name}</p>
                    </div>
                    <div className='w-full'>
                        <button 
                        onClick = {submitForm}
                        className='w-full bg-orange-500 rounded-full p-3 text-white '>Sign up</button>
                        <p></p>
                    </div>
                </div>
              
            </div>

        </div>
        </>
    )

};

export default Signup;

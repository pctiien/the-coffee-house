import {configureStore} from '@reduxjs/toolkit'
import CartSlice from './Slice/CartSlice'

const Store = configureStore({
    reducer: {
        cart : CartSlice 
    }
})


export default Store
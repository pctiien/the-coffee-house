import Delivery from "./Delivery"
import Payment from "./Payment"
import SelectedDishes from "./SelectedDishes"
import {useSelector ,useDispatch} from 'react-redux'
import {removeFromCart} from '../../features/Redux/Slice/CartSlice'

const Cart = ()=>{

    const cart = useSelector((state)=>state.cart)

    return (
        <>
        <div className="mt-20">
            <h1 className= 'text-center text-3xl py-16  font-semibold'>Order Confirmation</h1>
            <div className= 'flex gap-14 '>
                <div className = 'flex-1 flex flex-col items-end '>
                    <Delivery/>
                    <Payment/>
                </div>
                <SelectedDishes cart = {cart} />
            </div>
        </div>
        </>
    )
}

export default Cart
import {Routes,Route,BrowserRouter} from 'react-router-dom'
import AppLayout from './ui/AppLayout'
import { NavBarItemProvider } from './context/NavBarItemContext'

import CategoryList from './pages/Category/CategoryList'
import OrderList from './pages/Order/OrderList'
import AddProduct from './pages/Product/AddProduct'
import ProductList from './pages/Product/ProductList'
import VoucherList from './pages/Voucher/VoucherList'
import AddVoucher from './pages/Voucher/AddVoucher'
import UserList from './pages/User/UserList'
import ToppingList from './pages/Topping/ToppingList'
import AddTopping from './pages/Topping/AddTopping'
import AddCategory from './pages/Category/AddCategory'
import OrderDetail from './pages/Order/OrderDetail'
const App = ()=>{
  return (
    <>
    <NavBarItemProvider>
      <BrowserRouter>
        <Routes>
          <Route path= '/' element = {<AppLayout/>}>
            <Route index element = {<AddProduct/>}/>
            <Route path= '/products/add' element = {<AddProduct/>}/>
            <Route path= '/products' element = {<ProductList/>}/>
            <Route path='/vouchers' element={<VoucherList/>} />
            <Route path='/vouchers/add' element={<AddVoucher/>} />
            <Route path='/toppings' element={<ToppingList/>} />
            <Route path='/toppings/add' element={<AddTopping/>} />
            <Route path= '/users' element = {<UserList/>}/>

            <Route path= '/categories' element = {<CategoryList/>}/>
            <Route path= '/categories/add' element = {<AddCategory/>}/>
            <Route path= '/orders' element = {<OrderList/>}/>
            <Route path= '/orders/:id' element = {<OrderDetail/>}/>

          </Route>
        </Routes>
      </BrowserRouter>
    </NavBarItemProvider>
    </>
  )
}

export default App
import {Routes,Route,BrowserRouter} from 'react-router-dom'
import AppLayout from './ui/AppLayout'
import { NavBarItemProvider } from './context/NavBarItemContext'

import CategoryList from './pages/Category/CategoryList'
import OrderList from './pages/Order/OrderList'
import AddProduct from './pages/Product/AddProduct'
import ProductList from './pages/Product/ProductList'
import VoucherList from './pages/Voucher/VoucherList'
import ToppingList from './pages/Topping/ToppingList'
import AddCategory from './pages/Category/AddCategory'
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
            <Route path='/toppings' element={<ToppingList/>} />
            <Route path= '/categories' element = {<CategoryList/>}/>
            <Route path= '/categories/add' element = {<AddCategory/>}/>
            <Route path= '/orders' element = {<OrderList/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </NavBarItemProvider>
    </>
  )
}

export default App
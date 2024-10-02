import {Routes,Route,BrowserRouter} from 'react-router-dom'
import AppLayout from './ui/AppLayout'

import CategoryList from './pages/Category/CategoryList'
import Order from './pages/Order/Order'
import AddProduct from './pages/Product/AddProduct'
import ProductList from './pages/Product/ProductList'
const App = ()=>{
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path= '/' element = {<AppLayout/>}>
            <Route index element = {<AddProduct/>}/>
            <Route path= '/products/add' element = {<AddProduct/>}/>
            <Route path= '/products' element = {<ProductList/>}/>

            <Route path= '/categories' element = {<CategoryList/>}/>
            <Route path= '/orders' element = {<Order/>}/>
          </Route>
          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
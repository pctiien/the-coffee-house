import {Routes,Route,BrowserRouter} from 'react-router-dom'
import AppLayout from './ui/AppLayout'

import Category from './pages/Category/Category'
import Order from './pages/Order/Order'
import AddProduct from './pages/Product/AddProduct'

const App = ()=>{
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path= '/' element = {<AppLayout/>}>
            <Route index element = {<AddProduct/>}/>
            <Route path= '/add-product' element = {<AddProduct/>}/>
            <Route path= '/categories' element = {<Category/>}/>
            <Route path= '/orders' element = {<Order/>}/>
          </Route>
          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
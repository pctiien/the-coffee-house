import {Routes,Route,BrowserRouter} from 'react-router-dom'
import AppLayout from './ui/AppLayout'

import Category from './pages/Category/Category'
import Order from './pages/Order/Order'
import Product from './pages/Product/Product'

const App = ()=>{
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path= '/' element = {<AppLayout/>}>
            <Route index element = {<Product/>}/>
            <Route path= '/products' element = {<Product/>}/>
            <Route path= '/categories' element = {<Category/>}/>
            <Route path= '/orders' element = {<Order/>}/>
          </Route>
          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
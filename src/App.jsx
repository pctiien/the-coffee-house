import {BrowserRouter, Routes, Route} from 'react-router-dom'
import DashBoard from './pages/dashboard/DashBoard'
import News from './pages/news/News'
import Coffee from './pages/coffee/Coffee'
import Store from './pages/store/Store'
import Recruit from './pages/recruit/Recruit'
import AppLayout from './ui/AppLayout'
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<AppLayout />}>
            <Route index element = {<DashBoard/>} />
            <Route path='/coffee' element = {<Coffee/>} />
            <Route path='/news' element = {<News/>} />
            <Route path='/stores' element = {<Store/>} />
            <Route path='/recruit' element = {<Recruit/>} />
          </Route>
          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Provider} from 'react-redux'
import Store from './features/Redux/Store'
import { OrderProvider } from './utils/hooks/useOrder'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <OrderProvider>
      <Provider store={Store}>
        <App />
      </Provider>
    </OrderProvider>
  </StrictMode>,
)

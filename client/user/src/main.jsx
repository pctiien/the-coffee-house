import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Provider} from 'react-redux'
import Store from './features/Redux/Store.jsx'
import { OrderProvider } from './utils/hooks/useOrder.jsx'
import {AuthProvider} from './utils/hooks/useAuth.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <OrderProvider>
        <Provider store={Store}>
          <App />
        </Provider>
      </OrderProvider>
    </AuthProvider>
  </StrictMode>,
)

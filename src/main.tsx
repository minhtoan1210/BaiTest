import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { AxiosInterceptor } from 'components/AxiosInterceptor'

import App from './App'
import './index.css'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AxiosInterceptor>
          <App />
        </AxiosInterceptor>
      </BrowserRouter>
    </QueryClientProvider>
    <ToastContainer />
  </React.StrictMode>
)

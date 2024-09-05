import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './scss/main.scss'
import { Toaster } from 'sonner'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <App />

  <React.StrictMode>
    <App />
    <Toaster richColors position="top-center" duration={1500} />
  </React.StrictMode>
)

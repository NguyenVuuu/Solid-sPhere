import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ToastProvider } from './components/Toast'
import './i18n/config' // Import i18n config

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastProvider>
      <App />
    </ToastProvider>
  </StrictMode>,
)

// Updated: 2025-10-12T16:06:36.901Z

// Updated: 2025-10-12T16:09:08.953Z

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './hooks/AuthContext.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode> 
    <BrowserRouter>
      <AuthProvider>
        <Routes>
            <Route path='/*' element={<App/>}/>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)

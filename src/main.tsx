import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './routes/Home.tsx'
import Login from './routes/Login.tsx'
import Signup from './routes/Signup.tsx'
import HomeLayout from './layouts/home/HomeLayout.tsx'
import AuthLayout from './layouts/auth/AuthLayout.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<HomeLayout/>}>
          <Route index element={<Home />} />
        </Route>
        <Route element={<AuthLayout/>}>
          <Route path='login' element={<Login/>} />
          <Route path='signup' element={<Signup/>} />
        </Route>
      </Routes>
    
    </BrowserRouter>
  </StrictMode>,
)

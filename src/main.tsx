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
import { AuthContextProvider } from './contexts/auth.context.tsx'
import { ApolloProvider } from "@apollo/client/react"
import { client } from './lib/apollo.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <AuthContextProvider>
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
      </AuthContextProvider>

    </ApolloProvider>
  </StrictMode>,
)

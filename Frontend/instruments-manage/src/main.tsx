import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './pages/home/home.page'
import Layout from './layouts/Layout'
import { BrowserRouter, Route, Routes } from 'react-router'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route 
          path='/' 
          element={
              <Home />
          }>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './pages/home/home.page'
import { BrowserRouter, Route, Routes } from 'react-router'
import { Provider } from 'react-redux'
import { store } from './redux/stores/general.store'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route 
          path='/' 
          element={
            <Provider store={store}>
              <Home />
            </Provider>
          }>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)

/* eslint-disable react-refresh/only-export-components */
import './scss/app.scss'
import { Header } from './components'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'
import { Route, Routes } from 'react-router-dom'
import { Cart } from './pages/Cart'
import React, { createContext } from 'react'

export const SearchContext = createContext()

function App() {
  // TODO: зачем нужен контекст, оборачивающий все приложение,  если есть redux?
  const [searchValue, setSearchValue] = React.useState('')

  return (
    <SearchContext.Provider value={{ searchValue, setSearchValue }}>
      <div className='wrapper'>
        <Header searchValue={searchValue} setSearchValue={setSearchValue} />
        <div className='content'>
          <div className='container'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </div>
    </SearchContext.Provider>
  )
}

export default App

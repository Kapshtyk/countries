import React, { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Countries from '@/pages/Countries'
import Diagrams from '@/pages/Diagrams'
import Favourites from '@/pages/Favourites'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'

import CountriesSingle from '@/components/CountriesSingle'
import Layout from '@/components/Layout'
import ProtectedRoute from '@/components/ProtectedRoute'

import { auth, getFavourites } from '@/app/services/auth/firebase'
import { useLazyGetCountriesQuery } from '@/app/services/countries/countries'

import { setFavourites } from '@/features/favourites/favouritesSlice'

import { useAppDispatch } from '@/hooks/redux'

import PageNotFound from './pages/PageNotFound'

function App() {
  const [user] = useAuthState(auth)
  const dispatch = useAppDispatch()
  const [trigger] = useLazyGetCountriesQuery()

  useEffect(() => {
    if (user) {
      trigger(null, true)
    }
  }, [user, trigger])

  useEffect(() => {
    if (user) {
      getFavourites(user).then((favourites) => {
        dispatch(setFavourites(favourites))
      })
    }
  }, [user, dispatch])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/favourites" element={<Favourites />} />
            <Route path="/countries" element={<Countries />} />
            <Route path="/countries/:single" element={<CountriesSingle />} />
            <Route path="/diagrams" element={<Diagrams />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

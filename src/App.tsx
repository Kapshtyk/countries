import React, { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Countries from '@/pages/Countries'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'

import Layout from '@/components/Layout'
import ProtectedRoute from '@/components/ProtectedRoute'

import { auth, getFavourites } from '@/app/services/auth/firebase'
import { useGetCountriesQuery } from '@/app/services/countries/countries'

import { setFavourites } from '@/features/favourites/favouritesSlice'

import { useAppDispatch } from '@/hooks/redux'

import Favourites from './pages/Favourites'
import Diagrams from './pages/Diagrams'
import CountriesSingle from './components/CountriesSingle'

function App() {
  const [user] = useAuthState(auth)
  const dispatch = useAppDispatch()
  const { refetch } = useGetCountriesQuery({ skip: !user })

  useEffect(() => {
    if (user) {
      refetch()
    }
  }, [user, refetch])

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
          <Route
            path="/diagrams"
            element={<Diagrams />}
          />
          <Route element={<ProtectedRoute />}>
            <Route path="/favourites" element={<Favourites />} />
            <Route path="/countries" element={<Countries />} />
            <Route
              path="/countries/:single"
              element={
                <>
                  {/* <CountriesSidebar /> */}
                  <CountriesSingle />
                </>
              }
            />
          </Route>
          {/*  </Route> */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

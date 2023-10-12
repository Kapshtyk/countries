import React, { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'

import Countries from '@/pages/Countries'
import Layout from '@/components/Layout'

import ProtectedRoute from '@/components/ProtectedRoute'
import { auth } from '@/app/services/auth/firebase'
import { useGetCountriesQuery } from '@/app/services/countries/countries'

import { useAppDispatch } from '@/hooks/redux'

function App() {
  const [user] = useAuthState(auth)
  const dispatch = useAppDispatch()
  const {
    data = [],
    isSuccess,
    refetch
  } = useGetCountriesQuery({ skip: !user })

  useEffect(() => {
    if (user) {
      refetch()
    }
  }, [user, refetch])

  useEffect(() => {
    if (isSuccess) {
      console.log(data)
    }
  }, [data])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route
          path="/scatter"
          element={
            <>
              <Scatter />
              <RadarComponent />
            </>
          }
        /> */}

          <Route element={<ProtectedRoute />}>
            {/*  <Route path="/favourites" element={<Favoutires />} /> */}
            <Route path="/countries" element={<Countries />} />
            {/*           <Route
            path="/countries/:single"
            element={
              <>
                <CountriesSidebar />
                <CountriesSingle />
              </>
            }
          /> */}{' '}
          </Route>
          {/*  </Route> */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

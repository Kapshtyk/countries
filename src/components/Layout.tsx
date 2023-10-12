import React from 'react'
import { Outlet } from 'react-router-dom'

import Header from '@/components/Header'

const Layout = () => {
  return (
    <>
      <Header />
      <div className="container min-h-screen flex flex-col items-center m-auto">
        <Outlet />
      </div>
    </>
  )
}

export default Layout

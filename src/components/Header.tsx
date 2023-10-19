import React, { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useSelector } from 'react-redux'

import AuthButtons from '@/components/AuthButtons'
import CustomNavLink from '@/components/CustomNavLink'

import { auth } from '@/app/services/auth/firebase'

import { getFavourites } from '@/features/favourites/favouritesSlice'

import { useClickOutside } from '@/hooks/useClickOutside'

import { Hamburger } from '@/ui'

const Header = () => {
  const [user, loading] = useAuthState(auth)
  const favourites = useSelector(getFavourites)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const ref = useClickOutside(() => {
    setIsMobileMenuOpen(false)
  }) as React.RefObject<HTMLDivElement>

  const favouritesString = favourites.length ? ` (${favourites.length})` : ''
  const menuItems = [
    {
      label: `Favourites ${favouritesString}`,
      path: '/favourites'
    },
    {
      label: 'Countries',
      path: '/countries'
    },
    {
      label: 'Diagrams',
      path: '/diagrams'
    }
  ]

  return (
    <header className="w-full text-[var(--text-main)] flex justify-between items-center h-20 z-50 px-3 sm:px-8 border-b border-[var(--additional-color-200)] shadow-sm">
      <nav className="hidden sm:flex container font-light items-center gap-6 justify-start h-full w-full">
        <CustomNavLink to="/" label="Home" />
        {!loading && user && (
          <>
            {menuItems.map((item) => {
              return (
                <CustomNavLink
                  key={item.path}
                  to={item.path}
                  label={item.label}
                  onClick={() => setIsMobileMenuOpen(false)}
                />
              )
            })}
          </>
        )}
      </nav>
      <section className="hidden sm:flex">
        <AuthButtons />
      </section>
      {/* Mobile menu */}
      <Hamburger onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
      <div
        ref={ref}
        className={`${
          isMobileMenuOpen ? 'flex' : 'hidden'
        } fixed bottom-0 left-0 bg-[var(--neutral-09)] z-40 flex flex-col items-center p-3 gap-3 justify-between h-3/6 w-full rounded-t-lg animate-mobMenu border-t `}
      >
        <CustomNavLink
          to="/"
          label="Home"
          onClick={() => setIsMobileMenuOpen(false)}
          mobile={true}
        />
        {!loading && user && (
          <>
            {menuItems.map((item) => (
              <CustomNavLink
                key={item.path}
                to={item.path}
                label={item.label}
                mobile={true}
                onClick={() => setIsMobileMenuOpen(false)}
              />
            ))}
          </>
        )}
        <AuthButtons onClick={() => setIsMobileMenuOpen(false)} />
      </div>
    </header>
  )
}

export default Header

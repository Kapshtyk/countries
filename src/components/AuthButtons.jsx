import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useLocation, useNavigate } from 'react-router-dom'

import { Button } from '@/ui/button'

import { logout } from '@/app/auth/firebase'
import { auth } from '@/app/auth/firebase'

const AuthButtons = () => {
  const [user, loading] = useAuthState(auth)
  const location = useLocation()
  const navigate = useNavigate()
  return (
    <>
      {!loading &&
        !user &&
        (location.pathname === '/login' ? (
          <Button
            type="button"
            variant="default"
            onClick={() => navigate('/register')}
          >
            Register
          </Button>
        ) : (
          <Button
            type="button"
            variant="default"
            onClick={() => navigate('/login')}
          >
            Login
          </Button>
        ))}
      {!loading && user && (
        <Button type="button" variant="outline" onClick={logout}>
          Logout
        </Button>
      )}
    </>
  )
}

export default AuthButtons

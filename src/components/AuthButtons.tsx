import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useLocation, useNavigate } from 'react-router-dom'

import { auth, logout } from '@/app/services/auth/firebase'

import { Button } from '@/ui'

interface IAuthButtons {
  onClick?: () => void
}

const AuthButtons = ({ onClick = () => {} }: IAuthButtons) => {
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
            data-test="register-button"
            aria-description="navigate to register page"
            onClick={() => {
              navigate('/register')
              onClick()
            }}
          >
            Register
          </Button>
        ) : (
          <Button
            type="button"
            variant="default"
            data-test="login-button"
            aria-description="navigate to login page"
            onClick={() => {
              navigate('/login')
              onClick()
            }}
          >
            Login
          </Button>
        ))}
      {!loading && user && (
        <Button
          data-test="logout-button"
          aria-description="logout from the app"
          type="button"
          variant="outline"
          onClick={logout}
        >
          Logout
        </Button>
      )}
    </>
  )
}

export default AuthButtons

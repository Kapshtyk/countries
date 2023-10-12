import { useAuthState } from 'react-firebase-hooks/auth'
import { Navigate, Outlet } from 'react-router-dom'

import { auth } from '@/app/services/auth/firebase'

const ProtectedRoute = () => {
  const [user, loading] = useAuthState(auth)

  if (loading) {
    return (
      <>
        <span className="sr-only">Content is Loading</span>
        <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
          Loading...
        </svg>
      </>
    )
  }

  if (!user) {
    return <Navigate to="/login" />
  }
  return <Outlet />
}

export default ProtectedRoute

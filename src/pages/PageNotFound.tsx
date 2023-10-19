import React from 'react'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <div>
      <h1>404</h1>
      <p className="">
        Page not found, but you can start from the{' '}
        <Link to="/countries">Countries page</Link>.
      </p>
    </div>
  )
}

export default PageNotFound

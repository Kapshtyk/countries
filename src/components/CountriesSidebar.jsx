import React, { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

import { useGetCountriesQuery } from '../app/services/countries'

const CountriesSidebar = () => {
  const location = useLocation()
  const { data: countriesList = [] } = useGetCountriesQuery()

  const currentCountryRef = useRef(null)
  useEffect(() => {
    if (currentCountryRef.current) {
      const currentCountry = currentCountryRef.current
      const containerElement = currentCountry.parentElement.parentElement
      const isElementAboveMiddle =
        currentCountry.offsetTop <= window.innerHeight / 2

      if (!isElementAboveMiddle) {
        containerElement.scrollTop =
          currentCountry.offsetTop - window.innerHeight / 2
      }
    }
  }, [location.pathname])

  if (countriesList.length === 0) {
    return null
  }

  return (
    <div className="fixed w-56 border overflow-x-auto max-h-screen-without-header left-0">
      <h1 className="font-light text-3xl m-2 text-center">Countries</h1>
      <ul>
        {countriesList.map((country) => {
          return (
            <li
              ref={
                country.name.common ===
                decodeURIComponent(location.pathname.split('/')[2])
                  ? currentCountryRef
                  : null
              }
              className={`${
                country.name.common ===
                decodeURIComponent(location.pathname.split('/')[2])
                  ? 'bg-gray-200'
                  : ''
              } p-2 border-b`}
              key={country.name.common}
            >
              {country.name.common}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default CountriesSidebar

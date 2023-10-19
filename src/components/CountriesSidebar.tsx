import React, { useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { useGetCountriesQuery } from '@/app/services/countries/countries'

const CountriesSidebar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { data: countriesList = [] } = useGetCountriesQuery(null)

  const currentCountryRef = useRef(null)
  useEffect(() => {
    if (currentCountryRef.current) {
      const currentCountry = currentCountryRef.current as HTMLLIElement
      const containerElement = currentCountry?.parentElement?.parentElement
      const isElementAboveMiddle =
        currentCountry.offsetTop <= window.innerHeight / 2

      if (!isElementAboveMiddle && containerElement) {
        containerElement.scrollTop =
          currentCountry.offsetTop - window.innerHeight / 2
      }
    }
  }, [location.pathname])

  if (countriesList.length === 0) {
    return null
  }

  return (
    <div className="hidden absolute md:block w-52 font-light text-sm bg-additional-100 border-r border-additional-200 overflow-y-auto shadow-sm max-h-screen left-0 top-[80px]">
      <div className="p-4 text-additional-400 font-extralight text-xs">
        Navigation with arrow keys
      </div>
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
                  ? `bg-main-300 transition-all duration-300 ease-in-out shadow-sm text-background`
                  : ''
              } p-2 m-2 rounded-md hover:cursor-pointer hover:bg-main-100`}
              key={country.name.common}
              onClick={() => navigate(`/countries/${country.name.common}`)}
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

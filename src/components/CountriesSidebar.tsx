import React, { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

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
    <div className="hidden md:block absolute w-52 font-light text-sm bg-slate-100 border-r border-slate-200 overflow-y-auto shadow-sm max-h-screen-without-header left-0">
      <div className="p-4 text-gray-400 font-extralight text-xs">
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
                  ? `bg-sky-300 text-white transition-all duration-300 ease-in-out shadow-sm`
                  : ''
              } p-2 m-2 rounded-md hover:cursor-pointer hover:bg-sky-100`}
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

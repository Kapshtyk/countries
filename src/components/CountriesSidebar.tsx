import React, { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

import { useGetCountriesQuery } from '@/app/services/countries/countries'

const CountriesSidebar = () => {
  const location = useLocation()
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
              className={`${country.name.common ===
                decodeURIComponent(location.pathname.split('/')[2])
                ? `bg-sky-300 rounded-md text-white transition-all duration-300 ease-in-out hover:cursor-pointer shadow-sm`
                : ''
                } p-2 m-2`}
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

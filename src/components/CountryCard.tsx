import {
  IdCardIcon,
  LetterCaseCapitalizeIcon,
  PersonIcon
} from '@radix-ui/react-icons'
import React from 'react'
import { Link } from 'react-router-dom'

import Favourite from '@/components/Favourite'

import { Country } from '@/lib/zod/countries'

interface ICountryCard {
  country: Country
}

const CountryCard = ({ country }: ICountryCard) => {
  return (
    <div
      data-test="country-card"
      className="container bg-background w-full relative rounded-md shadow-md border p-3 hover:shadow-lg border-additional-100 hover:border-additional-200 mt-3 max-w-md transition-shadow duration-300 ease-in-out"
    >
      <Link
        className={`text-decoration-none hover:text-text-main`}
        to={`/countries/${country.name.common}`}
        state={{ country: country }}
      >
        <h2 className="text-xl font-medium pr-12">{country.name.common}</h2>
        <p className="text-sm font-light">{country.name.official}</p>
        <div className="grid grid-cols-1 divide-y">
          <div className="py-2 pt-4 text-xs font-extralight flex items-center">
            <LetterCaseCapitalizeIcon
              aria-description="languages"
              className="inline-block mr-1"
            />
            {Object.values(country.languages ?? {}).join(', ')}
          </div>
          <div className="py-2 text-xs font-extralight">
            <IdCardIcon
              aria-description="currency"
              className="inline-block mr-1"
            />
            {Object.values(country.currencies ?? {})
              .map((currency) => currency.name)
              .join(', ')}
          </div>
          <div className="py-2 text-xs font-extralight flex items-center">
            <PersonIcon
              aria-description="population"
              className="inline-block mr-1"
            />
            {country?.population.toLocaleString()}
          </div>
        </div>
      </Link>
      <Favourite country={country} top={3} right={5} />
    </div>
  )
}

export default CountryCard

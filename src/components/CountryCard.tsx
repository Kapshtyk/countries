import {
  IdCardIcon,
  LetterCaseCapitalizeIcon,
  PersonIcon
} from '@radix-ui/react-icons'
import React from 'react'
import { Link } from 'react-router-dom'

import { Country } from '@/lib/zod/countries'

import Favourite from './Favourive'

interface ICountryCard {
  country: Country
}

const CountryCard = ({ country }: ICountryCard) => {
  return (
    <div className="container bg-[var(--neutral)] w-full relative rounded-md shadow-md border p-3 hover:shadow-lg border-[var(--additional-color-100)] hover:border-[var(--additional-color-200)] mt-3 max-w-md transition-all duration-300 ease-in-out">
      <Link
        className={`text-decoration-none hover:text-[var(--text-main)]`}
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

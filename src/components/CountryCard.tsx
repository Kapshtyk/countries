import { Button } from '@/ui'
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Link } from 'react-router-dom'

import { StarIcon, StarFilledIcon, LetterCaseCapitalizeIcon, PersonIcon, IdCardIcon } from '@radix-ui/react-icons'

import { auth, toggleFavourites } from '@/app/services/auth/firebase'

import {
  getFavourites,
  setFavourites
} from '@/features/favourites/favouritesSlice'

import { useAppDispatch, useAppSelector } from '@/hooks/redux'

import { Country } from '@/lib/zod/countries'

interface ICountryCard {
  country: Country
}

const CountryCard = ({ country }: ICountryCard) => {
  const [user] = useAuthState(auth)
  const dispatch = useAppDispatch()
  const favourites = useAppSelector<string[]>(getFavourites)
  const [isFavourite, setIsFavourite] = useState(false)

  useEffect(() => {
    if (favourites.length) {
      if (favourites.includes(country.name.common)) {
        setIsFavourite(true)
      }
    }
  }, [favourites, country])

  const handleClickFavourites = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation()
    if (user) {
      const favourites = await toggleFavourites(country.name.common, user)
      setIsFavourite(!isFavourite)
      dispatch(setFavourites(favourites))
    }
  }

  return (
    <div className="container bg-white w-full relative rounded-md shadow-md border p-3 hover:shadow-lg border-slate-100 hover:border-slate-200 mt-3 max-w-md transition-all duration-300 ease-in-out">
      <Link
        className={`text-decoration-none hover:text-black`}
        to={`/countries/${country.name.common}`}
        state={{ country: country }}
      >
        <h2 className="text-xl font-medium">{country.name.common}</h2>
        <p className="text-sm font-light">{country.name.official}</p>
        <div className="grid grid-cols-1 divide-y">
          <div className="py-2 pt-4 text-xs font-extralight flex items-center">
            <LetterCaseCapitalizeIcon aria-description='languages' className="inline-block mr-1" />
            {Object.values(country.languages ?? {}).join(', ')}
          </div>
          <div className="py-2 text-xs font-extralight">
            <IdCardIcon aria-description='currency' className="inline-block mr-1" />
            {Object.values(country.currencies ?? {})
              .map((currency) => currency.name)
              .join(', ')}
          </div>
          <div className="py-2 text-xs font-extralight flex items-center">
            <PersonIcon aria-description='population' className="inline-block mr-1" />
            {country?.population.toLocaleString()}
          </div>
        </div>
      </Link>
      <Button
        variant="blank"
        size="mini"
        className="absolute top-4 right-5 hover:text-sky-500 active:animate-pingOnce z-40 transition-all duration-300 ease-in-out"
        onClick={(e) => handleClickFavourites(e)}
      >
        {isFavourite ? <StarFilledIcon /> : <StarIcon />}
      </Button>
    </div>
  )
}

export default CountryCard

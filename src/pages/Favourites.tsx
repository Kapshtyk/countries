import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

import CountryCard from '@/components/CountryCard'

import {
  auth,
  clearFavorites as clearFavouritesAtDb
} from '@/app/services/auth/firebase'
import { useGetCountriesQuery } from '@/app/services/countries/countries'

import {
  clearFavourites,
  getFavourites
} from '@/features/favourites/favouritesSlice'

import { useAppDispatch, useAppSelector } from '@/hooks/redux'

import { Button } from '@/ui'

const Favourites = () => {
  const [user] = useAuthState(auth)

  const {
    data: countriesList = [],
    isLoading: countriesIsLoading,
    error: countriesFetchingError
  } = useGetCountriesQuery(null)
  const favourites = useAppSelector(getFavourites)
  const dispatch = useAppDispatch()

  const countiesToShow = countriesList.filter((country) =>
    favourites.includes(country.name.common)
  )

  const handleDelete = async () => {
    if (user) {
      await clearFavouritesAtDb(user)
      dispatch(clearFavourites())
    }
  }

  if (countriesIsLoading) {
    return <p className="text-center font-extralight text-sm">Loading...</p>
  }
  if (countriesFetchingError) {
    return (
      <p className="text-center font-extralight text-sm">
        Something went wrong
      </p>
    )
  }

  return (
    <>
      <h1>Favourites</h1>
      {!countiesToShow.length && (
        <p className="text-center font-extralight text-xl">
          You have no favourites
        </p>
      )}
      {countiesToShow.length > 0 && (
        <Button variant="default" onClick={handleDelete}>
          Clear favourites
        </Button>
      )}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {countiesToShow.length > 0 &&
          countiesToShow.map((country) => {
            return <CountryCard key={country.name.common} country={country} />
          })}
      </div>
    </>
  )
}

export default Favourites

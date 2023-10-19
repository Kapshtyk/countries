import { StarFilledIcon, StarIcon } from '@radix-ui/react-icons'
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

import { auth, toggleFavourites } from '@/app/services/auth/firebase'

import {
  getFavourites,
  setFavourites
} from '@/features/favourites/favouritesSlice'

import { useAppDispatch, useAppSelector } from '@/hooks/redux'

import { Country } from '@/lib/zod/countries'

import { Button } from '@/ui'

interface IFavourite {
  country: Country
  top: number
  right: number
}

const Favourite = ({ country, top, right }: IFavourite) => {
  const dispatch = useAppDispatch()
  const [user] = useAuthState(auth)
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
    <Button
      variant="blank"
      size="mini"
      className={`absolute top-${top} right-${right} hover:text-[var(--main-color-500)] active:animate-pingOnce z-40 transition-all duration-300 ease-in-out`}
      onClick={(e) => handleClickFavourites(e)}
    >
      {isFavourite ? <StarFilledIcon /> : <StarIcon />}
    </Button>
  )
}

export default Favourite

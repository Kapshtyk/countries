import { createSlice } from '@reduxjs/toolkit'

import { RootState } from '@/app/store'

type Favourites = {
  favourites: string[]
}

export const favouritesSlice = createSlice({
  name: 'favourites',
  initialState: {
    favourites: []
  } as Favourites,
  reducers: {
    setFavourites: (state, action) => {
      state.favourites = action.payload
    },
    clearFavourites: (state) => {
      state.favourites = []
    }
  }
})

export const getFavourites = (state: RootState) => state.favourites.favourites

export const { setFavourites, clearFavourites } = favouritesSlice.actions

export default favouritesSlice.reducer

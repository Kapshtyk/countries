import { configureStore } from '@reduxjs/toolkit'

import favouritesReducer from '../features/favourites/favouritesSlice'
import { countriesApi } from './services/countries'

export const store = configureStore({
  reducer: {
    [countriesApi.reducerPath]: countriesApi.reducer,
    favourites: favouritesReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(countriesApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

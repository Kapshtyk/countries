import { configureStore } from '@reduxjs/toolkit'

import favouritesReducer from '../features/favourites/favouritesSlice'
import { countriesApi } from './services/countries/countries'
import { weatherApi } from './services/weather/weather'

export const store = configureStore({
  reducer: {
    [countriesApi.reducerPath]: countriesApi.reducer,
    [weatherApi.reducerPath]: weatherApi.reducer,
    favourites: favouritesReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(countriesApi.middleware)
      .concat(weatherApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

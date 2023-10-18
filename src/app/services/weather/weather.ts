import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import validateAndCleanUpWeatherData, { Weather } from '@/lib/zod/weather'

interface WeatherQueryParams {
  lat: number
  lon: number
}

const apiKey =
  process.env.REACT_APP_ENV === 'test'
    ? ''
    : process.env.REACT_APP_OPENWEATHER_KEY

export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `https://api.openweathermap.org/data/2.5/`
  }),
  tagTypes: ['weather'],
  keepUnusedDataFor: 3600,
  endpoints: (builder) => ({
    getWeather: builder.query<Weather | null, WeatherQueryParams>({
      query: (coords) =>
        `weather?units=metric&appid=${apiKey}&lat=${coords.lat}&lon=${coords.lon}`,
      providesTags: ['weather'],
      transformResponse: (response: any): Weather | null =>
        validateAndCleanUpWeatherData(response)
    })
  })
})

export const { useGetWeatherQuery } = weatherApi

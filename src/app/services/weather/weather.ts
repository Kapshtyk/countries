import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import validateAndCleanUpWeatherData, { Weather } from '@/lib/zod/weather'

interface WeatherQueryParams {
  lat: number
  lon: number
}

export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`
  }),
  tagTypes: ['weather'],
  keepUnusedDataFor: 3600,
  endpoints: (builder) => ({
    getWeather: builder.query<Weather | null, WeatherQueryParams & any>({
      query: (coords) => `&lat=${coords.lat}&lon=${coords.lon}`,
      providesTags: ['weather'],
      transformResponse: (response: any): Weather | null =>
        validateAndCleanUpWeatherData(response)
    })
  })
})
export const { useGetWeatherQuery } = weatherApi

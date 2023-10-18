import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

import validateAndCleanUpCountryData, { Countries } from '@/lib/zod/countries'

export const countriesApi = createApi({
  reducerPath: 'countriesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://restcountries.com/v3.1/'
  }),
  endpoints: (builder) => ({
    getCountries: builder.query<Countries, void>({
      query: () => 'all',
      transformResponse: (response: any): Countries =>
        validateAndCleanUpCountryData(response)
    })
  })
})

export const { useLazyGetCountriesQuery, useGetCountriesQuery } = countriesApi

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

import validateAndCleanUpCountryData, { Countries } from '@/lib/zod/countries'

export const countriesApi = createApi({
  reducerPath: 'countriesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://restcountries.com/v3.1/'
  }),
  tagTypes: ['countries'],
  endpoints: (builder) => ({
    getCountries: builder.query<Countries, unknown>({
      query: () => 'all',
      providesTags: ['countries'],
      transformResponse: (response: any): Countries =>
        validateAndCleanUpCountryData(response)
    })
  })
})

export const { useGetCountriesQuery } = countriesApi

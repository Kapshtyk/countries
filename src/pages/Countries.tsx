import React, { useEffect, useMemo, useState } from 'react'

import CountryCard from '@/components/CountryCard'
import Filter from '@/components/Filter'

import { useGetCountriesQuery } from '@/app/services/countries'

const Countries = () => {
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<string[]>([])
  const { data: countriesList = [], isLoading: countriesIsLoading } =
    useGetCountriesQuery(null)
  const regions = useMemo(
    () => Array.from(new Set(countriesList.map((country) => country.region))),
    [countriesList]
  )

  if (countriesIsLoading) {
    return <div>Loading...</div>
  }

  const countiesToShow = countriesList.filter(
    (country) =>
      (selected.includes(country.region) || selected.length === 0) &&
      country.name.common.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <h1>Countries</h1>
      <Filter
        search={search}
        setSearch={setSearch}
        values={regions}
        selected={selected}
        setSelected={setSelected}
      />
      <div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {!countriesIsLoading &&
          countiesToShow.length > 0 &&
          countiesToShow.map((country) => {
            return <CountryCard key={country.name.common} country={country} />
          })}
      </div>
    </>
  )
}

export default Countries

import { Countries } from '@/lib/zod/countries'

export const getTotalValuesForRegion = (
  countries: Countries,
  region: string
) => {
  const countriesInRegion = countries.filter(
    (country) => country.region === region
  )
  const totalPopulation = countriesInRegion.reduce(
    (acc, country) => acc + country.population,
    0
  )
  const totalArea = countriesInRegion.reduce(
    (acc, country) => acc + country.area,
    0
  )
  return {
    totalPopulation,
    totalArea
  }
}

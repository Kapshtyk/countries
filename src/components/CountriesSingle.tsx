import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import BarChartView from '@/components/BarChartView'
import ErrorComponent from '@/components/ErrorComponent'
import MapComponent from '@/components/MapComponent'

import {
  useGetCountriesQuery,
  useLazyGetCountriesQuery
} from '@/app/services/countries/countries'
import { useLazyGetWeatherQuery } from '@/app/services/weather'

import { useKeyDown } from '@/hooks/useKeyDown'

import weatherService from '@/lib/helpers/weather'
import { Country } from '@/lib/zod/countries'

import Favourite from './Favourive'

const CountriesSingle = () => {
  const countryName = decodeURI(useLocation().pathname.split('/')[2])
  const location = useLocation()
  const navigate = useNavigate()

  const [country, setCountry] = useState<Country | undefined>()
  const [countryIndex, setCountryIndex] = useState<number | undefined>()
  const { data: countriesList = [] } = useGetCountriesQuery(null)
  const [trigger, result] = useLazyGetCountriesQuery({
    selectFromResult: ({ data, error, isSuccess, isError }) => ({
      country:
        data?.find(
          (country) =>
            country.name.common.toLowerCase() === countryName.toLowerCase()
        ) ?? (null as unknown as Country),
      error,
      isError,
      isSuccess
    })
  })
  const [weatherTrigger, weatherResult] = useLazyGetWeatherQuery()

  // fetch the country data from the API or cache if it is not in the React-router location state
  useEffect(() => {
    if (location.state) {
      setCountry(location.state.country)
    } else {
      trigger(null, true)
    }
  }, [location])

  // set the country data from the API or cache if it is not in the React-router location state
  useEffect(() => {
    if (result.isSuccess && result.country) {
      setCountry(result.country)
    }
  }, [result])

  // get the current country index in the countries list
  useEffect(() => {
    if (country && countriesList.length > 0) {
      console.log('set country index')
      setCountryIndex(
        countriesList.findIndex((c) => c.name.common === country.name.common)
      )
    }
  }, [country, countriesList])

  // fetch the weather data for the country
  useEffect(() => {
    if (country && country.capitalInfo.latlng?.length == 2) {
      weatherTrigger({
        lat: country.capitalInfo.latlng[0],
        lon: country.capitalInfo.latlng[1]
      })
    }
  }, [country])

  useEffect(() => {
    console.log(weatherResult.error)
  }, [weatherResult])

  //hooks for navigation with arrow keys
  useKeyDown(() => {
    handleNextAndPreviousClick(1)
  }, ['ArrowRight'])

  useKeyDown(() => {
    handleNextAndPreviousClick(-1)
  }, ['ArrowLeft'])

  // Display error message if country is not found in the API or cache
  if (result.isSuccess && !result.country && !country) {
    return (
      <ErrorComponent
        message={`We do not have any information about the country ${countryName} yet.`}
      />
    )
  }

  // Display error message if country data can not be fetched because of an error
  if (result.isError) {
    return (
      <ErrorComponent
        message={`Something is wrong with getting information about ${countryName}`}
      />
    )
  }

  if (!country) {
    return null
  }

  const handleNextAndPreviousClick = (value: number) => {
    if (typeof countryIndex !== 'undefined') {
      const country = countriesList[countryIndex + value]
      if (country) {
        navigate(`/countries/${country.name.common}`, { state: { country } })
      }
    }
  }

  return (
    <div className="w-full md:w-[calc(100vw-208px)] md:absolute md:right-0 flex flex-col items-center p-2">
      <section className="max-w-5xl">
        <article className="flex flex-wrap">
          <div className="full md:w-6/12">
            <header className="relative">
              <h1 className="text-start">{country.name.common}</h1>
              <Favourite country={country} top={2} right={5} />
            </header>
            <h2>Basic information about the country</h2>
            <section className="grid gap-2 grid-cols-3 auto-rows-max">
              <p className="w-[150px]">Region:</p>
              <span className="font-extralight col-span-2">
                {country.region}
              </span>
              <p>Population:</p>
              <span className="font-extralight col-span-2">
                {country.population.toLocaleString()}
              </span>
              <p>Area:</p>
              <span className="font-extralight col-span-2">
                {country.area.toLocaleString()} km<sup>2</sup>
              </span>
              {country.languages && (
                <>
                  <p>
                    Language
                    {Object.values(country.languages).length > 1 ? 's' : ''}:
                  </p>
                  <ul className="font-extralight col-span-2">
                    {Object.values(country.languages ?? {}).map((language) => {
                      return <li key={language}>{language}</li>
                    })}
                  </ul>
                </>
              )}
              {country.currencies && (
                <>
                  <p>
                    Currens
                    {Object.values(country.currencies).length > 1 ? 'ies' : 'y'}
                    :
                  </p>
                  <ul className="font-extralight col-span-2">
                    {Object.keys(country.currencies).map((key) => {
                      if (country.currencies) {
                        return <li key={key}>{country.currencies[key].name}</li>
                      }
                    })}
                  </ul>
                </>
              )}
              {country.borders && (
                <>
                  <p>{`Border${country.borders.length > 1 ? 's' : ''}:`}</p>
                  <ul className="font-extralight grid col-span-2 grid-cols-2 auto-rows-max">
                    {country.borders.map((border) => {
                      const country = countriesList.find(
                        (country) => country.cca3 === border
                      )
                      if (country) {
                        return (
                          <li
                            className="underline underline-offset-4 mb-2"
                            key={country.name.common}
                          >
                            <Link
                              to={`/countries/${country.name.common}`}
                              className="hover:underline"
                            >
                              {country.name.common}&nbsp;{country.flag}
                            </Link>
                          </li>
                        )
                      }
                    })}
                  </ul>
                </>
              )}
              {country.capital && (
                <>
                  <p>Capital:</p>
                  <span className="font-extralight col-span-2">
                    {country.capital}
                  </span>
                </>
              )}
              {weatherResult.isError && (
                <p className="col-span-3">
                  Something is wrong with getting the weather information for{' '}
                  {country.capital}
                </p>
              )}
              {weatherResult.data && (
                <>
                  <p>Weather in {country.capital}:</p>
                  <ul className="font-extralight col-span-2">
                    <li>{`Temperature: ${weatherResult.data.main.temp} Celsius`}</li>
                    <li>
                      {`Wind: ${
                        weatherResult.data.wind.speed
                      } mps, direction: ${weatherService.getWindDirection(
                        weatherResult.data.wind.deg
                      )}`}
                    </li>
                    <li>
                      Clouds:{' '}
                      {weatherResult.data.weather.map((weather) => (
                        <img
                          className="w-8 h-8 inline-block"
                          key={weather.id}
                          src={weatherService.getWeatherIconURL(weather.icon)}
                          alt={weather.description}
                        />
                      ))}
                    </li>
                  </ul>
                </>
              )}
            </section>
          </div>
          <div className="full md:w-6/12 h-[300px] md:h-[400px] items-center">
            <h2>Area and population comparison</h2>
            <div className="h-full">
              <BarChartView country={country} />
            </div>
          </div>
        </article>
        <div className="w-full relative py-2">
          <h2>{country.name.common} in pictures</h2>
          <div className="w-full rounded-md overflow-hidden">
            <img
              className="object-cover w-full"
              src={`https://source.unsplash.com/700x400/?${country.name.common}`}
              alt={`${country.name.common}`}
            />
          </div>
          <div className="lg:w-2/12 w-3/12 absolute top-20 right-5 rounded-md overflow-hidden">
            <img src={country.flags.png} alt={country.flags.alt} />
          </div>
        </div>
        <div className="w-full h-[450px] rounded-md overflow-hidden">
          <h2>{country.name.common} on the map</h2>
          <MapComponent country={country} />
        </div>
      </section>
      <button
        disabled={countryIndex === 0}
        onClick={() => handleNextAndPreviousClick(-1)}
        className="md:hidden fixed w-24 bottom-5 left-4 bg-[var(--main-color-300)]/80 active:bg-[var(--main-color-500)] text-[var(--neutral)] font-light py-2 px-4 rounded disabled:opacity-50"
      >
        Previous
      </button>
      <button
        disabled={countryIndex === countriesList.length - 1}
        onClick={() => handleNextAndPreviousClick(1)}
        className="md:hidden fixed w-24 bottom-5 right-4 bg-[var(--main-color-300)]/80 active:bg-[var(--main-color-500)] text-[var(--neutral)] font-light py-2 px-4 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  )
}

export default CountriesSingle

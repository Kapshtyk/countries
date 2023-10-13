import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { useGetCountriesQuery } from '@/app/services/countries/countries'
import { useKeyDown } from '@/hooks/useKeyDown'
import { useGetWeatherQuery } from '@/app/services/weather/weather'
/* import BarChartView from '@/components/BarChartView'
import MapComponent from '@/components/MapComponent' */
import { Country } from '@/lib/zod/countries'

const CountriesSingle = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const {
    data: countriesList = [],
    isLoading: countriesIsLoading,
    error: countriesFetchingError
  } = useGetCountriesQuery(null)
  const [country, setCountry] = useState<Country | null>(null)
  const [countryIndex, setCountryIndex] = useState<number | null>(null)
  const { data: weather, refetch, isLoading: isWeatherLoading } = useGetWeatherQuery({ lat: country?.capitalInfo?.latlng?.[0], lon: country?.capitalInfo?.latlng?.[1] }, { skip: !country })
  const [error, setError] = useState<string | null>(null)

  useKeyDown(() => {
    handleNextAndPreviousClick(1)
  }, ['ArrowRight'])

  useKeyDown(() => {
    handleNextAndPreviousClick(-1)
  }, ['ArrowLeft'])

  useEffect(() => {
    if (location.state) {
      setCountry(location.state.country)
    }
  }, [location])

  useEffect(() => {
    if (!country && countriesList.length > 0) {
      setCountry(
        countriesList.find((country) => {
          return (
            country.name.common ===
            decodeURIComponent(location.pathname.split('/')[2])
          )
        })
      )
    }
  }, [countriesList, country, location.pathname])

  useEffect(() => {
    if (country && country.capitalInfo.latlng) {
      refetch()
    }
  }, [country, refetch])

  useEffect(() => {
    if (country && countriesList.length > 0) {
      setCountryIndex(
        countriesList.findIndex((c) => c.name.common === country.name.common)
      )
    }
  }, [country, countriesList])

  useEffect(() => {
    if (country) {
      if (country.capitalInfo.latlng) {
        weatherService
          .getWeather(
            country.capitalInfo.latlng[0],
            country.capitalInfo.latlng[1]
          )
          .then((response) => {
            setWeather(response)
          })
          .catch((error) => {
            setError(error.message)
          })
      } else {
        setError(`Weather forecast not available for ${country.name.common}.`)
      }
    }
  }, [country])

  const handleNextAndPreviousClick = (value) => {
    const country = countriesList[countryIndex + value]
    if (country) {
      navigate(`/countries/${country.name.common}`, { state: { country } })
    }
  }

  if (!country) {
    return (
      <div className="">
        {/*    <Spinner
          animation="border"
          role="status"
          className="center"
          variant="danger"
        /> */}
        <p className="text-center">
          {countriesFetchingError ?? 'Error fetching data'}
        </p>
      </div>
    )
  }
  return (
    <>
      <div className="w-8/12 border border-gray-100 rounded-md shadow-md m-auto gap-2 p-3 mt-2 grid grid-cols-3 grid-rows-2">
        <div className="col-start-2 row-start-2 col-span-2 w-full h-full relative rounded-md overflow-hidden">
          {/* <MapComponent country={country} /> */}
        </div>
        <div className="col-span-1">
          <h1 className="font-normal text-4xl">{country.capital}</h1>
          <p className="font-light mt-2">
            {country.population &&
              `Population: ${country.population.toLocaleString()}`}
          </p>
          <p className="font-light mt-2">Region: {country.region}</p>
          <p className="font-light mt-2">
            Area: {country.area.toLocaleString()} km<sup>2</sup>
          </p>
          <p className="font-light mt-2">
            {country.languages &&
              `Language${Object.values(country.languages ?? {}).length > 1 ? 's' : ''
              }: ${Object.values(country.languages || {}).join(', ')}`}
          </p>
          {country.borders && (
            <p className="font-normal mt-2">
              {`Neighbor${country.borders.length > 1 ? 's' : ''}: `}
              {countriesList.length > 0 &&
                country.borders.map((border) => {
                  const neighbor = countriesList.find(
                    (country) => country.cca3 === border
                  )
                  return (
                    <span key={border}>
                      <Link
                        className="text-blue-500 hover:underline"
                        to={`/countries/${neighbor.name.common}`}
                        state={{ country: neighbor }}
                      >
                        {neighbor.name.common}
                      </Link>
                    </span>
                  )
                })}
            </p>
          )}
          {error && (
            <p>{error ?? 'Weather forecast not available at the moment.'}</p>
          )}
          {/*    {weather && (
            <div>
              <h2 className="font-normal mt-2">
                Weather in {country.capital}:
              </h2>
              <p className="font-light mt-2">
                <strong>Temperature:</strong> {weather.main.temp} Celsius
              </p>
              {weather.weather.map((weather) => (
                <img
                  key={weather.id}
                  src={weatherService.getWeatherIconURL(weather.icon)}
                  alt={weather.description}
                />
              ))}
              <p>
                <strong>Wind:</strong> {weather.wind.speed} mps, wind direction:{' '}
                {weatherService.getWindDirection(weather.wind.deg)}
              </p>
            </div>
          )} */}
        </div>
        <div className="col-span-2 col-start-2 relative">
          <div className="w-full rounded-md overflow-hidden">
            <img
              className="object-cover w-full"
              src={`https://source.unsplash.com/700x400/?${country.capital}`}
              alt={`Capital of ${country.name.common}`}
            />
          </div>
          <div className="lg:w-2/12 w-3/12 absolute top-5 right-5 rounded-md overflow-hidden">
            <img src={country.flags.png} alt={country.flags.alt} />
          </div>
        </div>
        <div className="row-start-2 col-start-1 w-full h-full">
          {/*     <BarChartView country={country} / */}>
        </div>
      </div>
      <button
        disabled={countryIndex === 0}
        onClick={() => handleNextAndPreviousClick(-1)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>
      <button
        disabled={countryIndex === countriesList.length - 1}
        onClick={() => handleNextAndPreviousClick(1)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </>
  )
}

export default CountriesSingle

import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { useLazyGetCountriesQuery } from '@/app/services/countries/countries'
import { useGetWeatherQuery } from '@/app/services/weather/weather'

import { useKeyDown } from '@/hooks/useKeyDown'

import weatherService from '@/lib/helpers/weather'

/* import BarChartView from '@/components/BarChartView'
import MapComponent from '@/components/MapComponent' */
import { Country } from '@/lib/zod/countries'

import Error from './Error'

const CountriesSingle = () => {
  const countryName = decodeURI(useLocation().pathname.split('/')[2])
  const location = useLocation()
  const navigate = useNavigate()
  const [country, setCountry] = useState<Country | undefined>()
  const [trigger, result] = useLazyGetCountriesQuery({
    selectFromResult: ({ data, error, isSuccess, isError }) => ({
      country:
        data?.find(
          (country) => country.name.common.toLowerCase() === countryName.toLowerCase()
        ) ?? (null as unknown as Country),
      error,
      isError,
      isSuccess
    })
  })

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

  if (result.isSuccess && !result.country) {
    return (
      <div>{`We do not have any information about the country ${countryName} yet.`}</div>
    )
  }


  if (result.isError) {
    return (
      <Error
        message={`Something is wrong with getting information about ${countryName}`}
      />
    )
  }

  /*   useKeyDown(() => {
      handleNextAndPreviousClick(1)
    }, ['ArrowRight'])
   */
  /* useKeyDown(() => {
    handleNextAndPreviousClick(-1)
  }, ['ArrowLeft'])
   
  useEffect(() => {
    if (location.state) {
      setCountry(location.state.country)
    }
  }, [location])
   
  useEffect(() => {
    if (!country && countriesList.length > 0) {
      const country = countriesList.find(
        (country) => country.name.common === location.pathname.split('/')[2]
      )
      if (country) {
        setCountry(country)
      }
      if (country?.capitalInfo.latlng) {
        setCoords({ lat: country.capitalInfo.latlng[0], lon: country.capitalInfo.latlng[1] })
      }
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
    if (weatherError) {
      setError(`Weather forecast not available for ${country?.name.common}.`)
    }
  }, [country])
   
  const handleNextAndPreviousClick = (value: number) => {
    if (countryIndex) {
      const country = countriesList[countryIndex + value]
      if (country) {
        navigate(`/countries/${country.name.common}`, { state: { country } })
      }
    }
  } */

  /*  if (!country) {
     return (
       <div className="">
         {/*    <Spinner
           animation="border"
           role="status"
           className="center"
           variant="danger"
         /> 
         <p className="text-center">
           {countriesFetchingError ? 'Error fetching data' : ''}
         </p>
       </div>
     )
   } */
  return (
    <div>HELLO</div>
    /*  <>
       <div className="w-8/12 border border-gray-100 rounded-md shadow-md m-auto gap-2 p-3 mt-2 grid grid-cols-3 grid-rows-2">
         <div className="col-start-2 row-start-2 col-span-2 w-full h-full relative rounded-md overflow-hidden">
           {/* <MapComponent country={country} /> 
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
                         to={`/countries/${neighbor?.name.common}`}
                         state={{ country: neighbor }}
                       >
                         {neighbor?.name.common}
                       </Link>
                     </span>
                   )
                 })}
             </p>
           )}
           {error && (
             <p>{error ?? 'Weather forecast not available at the moment.'}</p>
           )}
           {weather && (
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
           )}
         </div>
         <div className="col-span-2 col-start-2 relative">
           <div className="w-full rounded-md overflow-hidden">
             <img
               className="object-cover w-full"
               src={`https://source.unsplash.com/700x400/?${country.name.common}`}
               alt={`${country.name.common}`}
             />
           </div>
           <div className="lg:w-2/12 w-3/12 absolute top-5 right-5 rounded-md overflow-hidden">
             <img src={country.flags.png} alt={country.flags.alt} />
           </div>
         </div>
         <div className="row-start-2 col-start-1 w-full h-full">
            <BarChartView country={country} / >
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
     </> */
  )
}

export default CountriesSingle

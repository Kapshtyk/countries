import React, { useMemo } from 'react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'

import { useGetCountriesQuery } from '@/app/services/countries/countries'

interface IAreaComnonents {
  regions: string[]
}

const AreaComponent = ({ regions }: IAreaComnonents) => {
  const { data: countriesList = [] } = useGetCountriesQuery(null)

  const data = useMemo(() => {
    if (regions.length !== 0 && countriesList.length !== 0) {
      const regionsData = regions.map((region) => ({
        region,
        population: 0,
        area: 0
      }))

      countriesList.forEach((country) => {
        const regionData = regionsData.find(
          (data) => data.region === country.region
        )
        if (regionData) {
          regionData.population += country.population / 1000000
          regionData.area += country.area / 1000000
        }
      })

      return regionsData
    }
  }, [regions, countriesList])

  const formatArea = (value: number) =>
    `${Math.round(value).toLocaleString()} mln km²`

  const formatPopulation = (value: number) =>
    `${Math.round(value).toLocaleString()} mln`

  return (
    <>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          width={500}
          height={200}
          data={data}
          syncId="anyId"
          margin={{
            top: 20,
            right: 20,
            left: -20,
            bottom: 20
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="region" tick={{ fontSize: 12 }} />
          <YAxis
            type="number"
            width={100}
            domain={[0, 'maxValue']}
            tick={{ fontSize: 12 }}
            tickFormatter={formatPopulation}
            padding={{ top: 20, bottom: 20 }}
          />
          <Tooltip formatter={formatPopulation} />
          <Legend />
          <Area
            type="monotone"
            dataKey="population"
            stroke="#8884d8"
            fill="#8884d8"
          />
        </AreaChart>
      </ResponsiveContainer>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          width={500}
          height={200}
          data={data}
          syncId="anyId"
          margin={{
            top: 20,
            right: 20,
            left: -20,
            bottom: 20
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="region" tick={{ fontSize: 12 }} />
          <YAxis
            type="number"
            width={100}
            domain={[0, 'maxValue']}
            tick={{ fontSize: 12 }}
            tickFormatter={formatArea}
            padding={{ top: 20, bottom: 20 }}
          />
          <Tooltip formatter={formatArea} />
          <Legend />
          <Area
            type="monotone"
            dataKey="area"
            stroke="#82ca9d"
            fill="#82ca9d"
          />
        </AreaChart>
      </ResponsiveContainer>
    </>
  )
}

export default AreaComponent

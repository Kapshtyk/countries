import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis
} from 'recharts'

import { useGetCountriesQuery } from '@/app/services/countries/countries'

const getRegionColor = (region: string) => {
  switch (region) {
    case 'Oceania':
      return '#2978ff78'
    case 'Americas':
      return '#43a0489e'
    case 'Africa':
      return '#ef6c009c'
    case 'Europe':
      return '#ffb3009b'
    case 'Asia':
      return '#d81b609c'
    case 'Antarctic':
      return '#039ae5b4'
    default:
      return '#8d24aaaa'
  }
}

interface IScatterComnonents {
  regions: string[]
}

const ScatterComponent = ({ regions }: IScatterComnonents) => {
  const [isMobile, setIsMobile] = useState(false)
  const {
    data: countriesList = [],
  } = useGetCountriesQuery(null)

  const navigate = useNavigate()

  const formatPopulation = (value: number) =>
    `${Math.round(value).toLocaleString()} mln`

  const formatArea = (value: number) =>
    `${Math.round(value).toLocaleString()} thous km²`

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobile(true)
    }
  }, [])

  return (
    <div className="container">
      <ResponsiveContainer width="100%" height={300}>
        <ScatterChart
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: -20
          }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis
            type="number"
            dataKey="area"
            name="Area"
            domain={[0, 'maxValue']}
            tick={{ fontSize: 12 }}
            padding={{ left: 20, right: 20 }}
            tickFormatter={formatArea}
          />
          <YAxis
            type="number"
            dataKey="population"
            name="Population"
            domain={[0, 'maxValue']}
            tick={{ fontSize: 12 }}
            width={100}
            padding={{ top: 20, bottom: 20 }}
            tickFormatter={formatPopulation}
          />
          <ZAxis type="category" name="Country" dataKey="name" />
          <Tooltip
            cursor={{ strokeDasharray: '3 3' }}
            formatter={(value: number, name: string) => {
              if (name === 'Area') {
                return formatArea(value)
              } else if (name === 'Population') {
                return formatPopulation(value)
              } else if (name === 'Country') {
                return value
              } else {
                return null
              }
            }}
          />
          <Legend
            className="text-sm"
          />
          {regions.map((region) => (
            <Scatter
              key={region}
              name={region}
              style={{
                cursor: !isMobile ? 'pointer' : 'default'
              }}
              data={countriesList
                .filter((country) => country.region === region)
                .map((country) => ({
                  population: country.population / 1000000,
                  area: country.area / 1000,
                  name: country.name.common
                }))}
              fill={getRegionColor(region)}
              onClick={(e: any) => {
                !isMobile ? navigate(`/countries/${e.name}`) : null
              }}
            />
          ))}
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  )
}

export default ScatterComponent

import React from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'

import { useGetCountriesQuery } from '@/app/services/countries/countries'

import { getRegionColor } from '@/lib/helpers/regionColors'
import { getTotalValuesForRegion } from '@/lib/helpers/statistics'
import { Country } from '@/lib/zod/countries'

interface IBarChartView {
  country: Country
}

const BarChartView = ({ country }: IBarChartView) => {
  const { data: countriesList = [] } = useGetCountriesQuery(null)

  const { totalArea, totalPopulation } = getTotalValuesForRegion(
    countriesList,
    country?.region
  )

  const formatValue = (value: number) => `${value.toFixed(2).toLocaleString()}%`

  return (
    <ResponsiveContainer className="text-xs" width="100%" height="70%">
      <BarChart
        width={500}
        height={250}
        data={[
          {
            name: 'Area',
            [country.name.common]: (country.area / totalArea) * 100,
            [country.region]: 100 - (country.area / totalArea) * 100
          },
          {
            name: 'Population',
            [country.name.common]: (country.population / totalPopulation) * 100,
            [country.region]: 100 - (country.population / totalPopulation) * 100
          }
        ]}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis
          tickFormatter={(tick) => {
            return `${tick}%`
          }}
        />
        <Tooltip
          cursor={{ strokeDasharray: '3 3' }}
          formatter={(value) => {
            if (typeof value === 'number') {
              return formatValue(value)
            }
          }}
          itemStyle={{
            color: 'gray'
          }}
          labelStyle={{
            color: 'gray'
          }}
        />
        <Legend />
        <Bar dataKey={country.name.common} stackId="a" fill="#4C778899" />
        <Bar
          dataKey={country.region}
          stackId="a"
          fill={getRegionColor(country.region)}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default BarChartView

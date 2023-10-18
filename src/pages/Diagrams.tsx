import { Checkbox } from '@/ui'
import React, { useCallback, useEffect, useMemo, useState } from 'react'

import AreaComponent from '@/components/AreaComponent'
import ScatterComponent from '@/components/ScatterComponent'

import { useGetCountriesQuery } from '@/app/services/countries/countries'

const Diagrams = () => {
  const { data: countriesList = [] } = useGetCountriesQuery(null)
  const [selectedRegions, setSelectedRegions] = useState<string[]>([])

  const handleRegionChange = useCallback(
    (e: React.FormEvent<HTMLButtonElement>, region: string) => {
      if (selectedRegions.includes(e.currentTarget.value)) {
        setSelectedRegions(
          selectedRegions.filter((selectedRegion) => selectedRegion !== region)
        )
      } else {
        setSelectedRegions([...selectedRegions, region])
      }
    },
    [selectedRegions]
  )

  const regions = useMemo(
    () => Array.from(new Set(countriesList.map((country) => country.region))),
    [countriesList]
  )

  useEffect(() => {
    if (regions.length > 0) {
      setSelectedRegions(regions)
    }
  }, [regions])

  return (
    <>
      <div className="flex flex-wrap justify-center items-center">
        {regions.map((region) => (
          <div key={region} className="w-1/3">
            <div className="px-4 grid grid-cols-[20px_100px]" key={region}>
              <div className="flex w-6 justify-end items-center px-2">
                <Checkbox
                  className="flex justify-center items-center"
                  id={region}
                  checked={selectedRegions.includes(region)}
                  name={region}
                  value={region}
                  onClick={(e) => handleRegionChange(e, region)}
                ></Checkbox>
              </div>
              <label className="font-light text-sm" htmlFor={region}>
                {region}
              </label>
            </div>
          </div>
        ))}
      </div>
      <ScatterComponent regions={selectedRegions} />
      <AreaComponent regions={selectedRegions} />
    </>
  )
}

export default Diagrams

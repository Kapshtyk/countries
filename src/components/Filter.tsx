import React from 'react'

import Search from '@/components/Search'

import Select from '@/ui/Select'

interface IFilter {
  search: string
  setSearch: (search: string) => void
  values: string[]
  selected: string[]
  setSelected: (selected: string[]) => void
}

const Filter = ({
  search,
  setSearch,
  values,
  selected,
  setSelected
}: IFilter) => {
  return (
    <section className="w-full gap-2 flex flex-col sm:flex-row justify-between">
      <Search search={search} setSearch={setSearch} />
      <Select
        id="region-select"
        values={values}
        selected={selected}
        setSelected={setSelected}
        placeholder={'Select region'}
      />
    </section>
  )
}

export default Filter

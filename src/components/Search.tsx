import React, { useEffect, useState } from 'react'

import { useKeyDown } from '@/hooks/useKeyDown'

import { Input } from '@/ui'

interface ISearch {
  search: string
  setSearch: (search: string) => void
}

const Search = ({ search, setSearch }: ISearch) => {
  const [isMobile, setIsMobile] = useState(false)
  const [placeholder, setPlaceholder] = useState('')
  const input = document.getElementById('search-input') as HTMLInputElement

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobile(true)
    }
  }, [])

  useKeyDown(
    () => {
      input.focus()
    },
    ['k', 'K'],
    true
  )

  useKeyDown(() => {
    input.blur()
  }, ['Escape'])

  useEffect(() => {
    if (isMobile) {
      setPlaceholder('Search country by name')
    } else {
      setPlaceholder('Ctrl+K to search by name')
    }
  }, [isMobile])

  return (
    <div className="relative w-full max-w-md sm:max-w-[220px] self-center">
      <Input
        id="search-input"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={placeholder}
        renderCloseButton={true}
        renderIcon={true}
      />
    </div>
  )
}

export default Search

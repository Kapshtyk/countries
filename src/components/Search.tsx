import React, { useEffect, useState } from 'react'

import Input from '@/ui/Input'

import { useKeyDown } from '@/hooks/useKeyDown'

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
      setPlaceholder('Ctrl + k to search by name')
    }
  }, [isMobile])

  return (
    <div className="w-56">
      <Input
        id="search-input"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={placeholder}
        renderCloseButton={true}
      />
    </div>
  )
}

export default Search

'use client'

import {useEffect, useState} from 'react'

export default function useSearch() {
  const [prevSearch, setPrevSearch] = useState<string>('')
  const [search, setSearch] = useState<string>('')
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      if(prevSearch !== search) {
        setSearch(prevSearch)
      }
    }, 250)
    return () => {
      if(timeout)
        clearTimeout(timeout)
    }
  }, [prevSearch])
  
  return {
    prevSearch, setPrevSearch,
    search, setSearch,
  }
}
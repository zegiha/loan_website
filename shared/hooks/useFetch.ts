'use client'

import { useEffect, useState, useCallback } from "react";

export default function useFetch<T>(
  fetch_func: () => Promise<T>,
) {
  const [data, set_data] = useState<T | null>(null)
  const [is_loading, set_is_loading] = useState<boolean>(false)
  const [error, set_error] = useState<Error | null>(null)

  const fetch_data = useCallback(async () => {
    set_is_loading(true)
    set_error(null)
    try {
      const result = await fetch_func()
      set_data(result)
    } catch (e) {
      set_error(e as Error)
    } finally {
      set_is_loading(false)
    }
  }, [fetch_func])

  // 수동으로 리패치할 수 있는 함수 제공
  const refetch = () => {
    if(!is_loading) {
      fetch_data()
    }
  }

  useEffect(() => {
    fetch_data()
  }, [])

  return { data, is_loading, error, refetch }
}

import { useState, useEffect } from 'react'
import { FetchClient, type ApiResponse } from '@api/fetchClient'
import { API_BASE_URL, GET_POST_URL } from '@utils/constants'

export const useFetchData = <T,>(
  endpoint: string = GET_POST_URL,
  baseUrl: string = API_BASE_URL,
) => {
  const [result, setResult] = useState<ApiResponse<T>>({
    success: false,
    data: null,
    message: '',
    error: undefined,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const api = new FetchClient(baseUrl)
      const response = await api.get<T>(endpoint)
      setResult(response)
      setError(!response.success)
      setLoading(false)
    }

    fetchData()
  }, [baseUrl, endpoint])

  return { result, loading, error }
}

import { useEffect } from 'react'
import { FetchClient } from '@api/fetchClient'
import { API_BASE_URL, GET_POST_URL } from '@utils/constants'
import { usePostContext } from '@/context/PostContext'
import { type Post } from '@/context/types/post.types'

export const useLoadPost = () => {
  const { dispatch } = usePostContext()

  useEffect(() => {
    const loadPosts = async () => {
      dispatch({ type: 'SET_LOADING', payload: true })

      const api = new FetchClient(API_BASE_URL)
      const response = await api.get<Post[]>(GET_POST_URL)

      if (response.success && response.data) {
        dispatch({ type: 'SET_POSTS', payload: response.data })
      } else {
        dispatch({ type: 'SET_ERROR', payload: true })
      }

      dispatch({ type: 'SET_LOADING', payload: false })
    }

    loadPosts()
  }, [dispatch])
}

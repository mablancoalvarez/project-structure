import { useEffect, use } from 'react'
import { FetchClient } from '@api/fetchClient'
import { API_BASE_URL, GET_POST_URL } from '@utils/constants'
import { PostContext } from '@/context/PostContext'

interface Post {
  id: number
  title: string
  body: string
  userId: number
}

export const useLoadPost = () => {
  const { dispatch } = use(PostContext)!

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

import { createContext, use } from 'react'
import { type Post, type PostState } from './types/post.types'

type PostAction =
  | { type: 'SET_POSTS'; payload: Post[] }
  | { type: 'ADD_POST'; payload: Post }
  | { type: 'DELETE_POST'; payload: number }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: boolean }

interface PostContextType {
  state: PostState
  dispatch: (action: PostAction) => void
}

export const initialState: PostState = {
  posts: [],
  loading: false,
  error: false,
}

export const postReducer = (
  state: PostState,
  action: PostAction,
): PostState => {
  switch (action.type) {
    case 'SET_POSTS':
      return { ...state, posts: action.payload, loading: false }
    case 'ADD_POST':
      return { ...state, posts: [...state.posts, action.payload] }
    case 'DELETE_POST':
      return {
        ...state,
        posts: state.posts.filter((p) => p.id !== action.payload),
      }
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload }
    default:
      return state
  }
}

export const PostContext = createContext<PostContextType | undefined>(undefined)

export const usePostContext = () => {
  const context = use(PostContext)
  if (!context) {
    throw new Error('usePostContext debe usarse dentro de PostProvider')
  }
  return context
}

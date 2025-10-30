import { useMemo, useReducer, type ReactNode } from 'react'
import { initialState, PostContext, postReducer } from './PostContext'

interface PostProviderProps {
  children: ReactNode
}

export const PostContextProvider = ({ children }: PostProviderProps) => {
  const [state, dispatch] = useReducer(postReducer, initialState)
  const contextMemo = useMemo(() => ({ state, dispatch }), [state])
  return (
    <PostContext.Provider value={contextMemo}>{children}</PostContext.Provider>
  )
}

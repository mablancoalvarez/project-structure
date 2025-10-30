import { describe, it, vi, expect, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { useLoadPost } from '../useLoadPost'
import { PostContext } from '@/context/PostContext'
import { FetchClient } from '@api/fetchClient'

vi.mock('@api/fetchClient', () => {
  return {
    FetchClient: vi.fn().mockImplementation(() => ({
      get: vi.fn(),
    })),
  }
})

const mockPosts = [
  { id: 1, title: 'Post 1', body: 'Contenido', userId: 1 },
  { id: 2, title: 'Post 2', body: 'Contenido', userId: 2 },
]

describe('useLoadPost', () => {
  let dispatch: ReturnType<typeof vi.fn>
  let mockGet: ReturnType<typeof vi.fn>

  beforeEach(() => {
    dispatch = vi.fn()
    mockGet = vi.fn()
    const MockedFetchClient = FetchClient as unknown as ReturnType<typeof vi.fn>
    MockedFetchClient.mockImplementation(() => ({
      get: mockGet,
    }))
  })

  it('should dispatch SET_POSTS when response is success', async () => {
    mockGet.mockResolvedValue({
      success: true,
      data: mockPosts,
      message: 'OK',
    })
    const state = { posts: [], loading: false, error: false }

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <PostContext.Provider value={{ dispatch, state }}>
        {children}
      </PostContext.Provider>
    )

    renderHook(() => useLoadPost(), { wrapper })

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({
        type: 'SET_LOADING',
        payload: true,
      })
      expect(dispatch).toHaveBeenCalledWith({
        type: 'SET_POSTS',
        payload: mockPosts,
      })
      expect(dispatch).toHaveBeenCalledWith({
        type: 'SET_LOADING',
        payload: false,
      })
    })
  })

  it('should dispatch SET_ERROR with true value if response is not success', async () => {
    mockGet.mockResolvedValue({
      success: false,
      data: null,
      message: 'Error',
    })
    const state = { posts: [], loading: false, error: false }

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <PostContext.Provider value={{ dispatch, state }}>
        {children}
      </PostContext.Provider>
    )

    renderHook(() => useLoadPost(), { wrapper })

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({
        type: 'SET_LOADING',
        payload: true,
      })
      expect(dispatch).toHaveBeenCalledWith({
        type: 'SET_ERROR',
        payload: true,
      })
      expect(dispatch).toHaveBeenCalledWith({
        type: 'SET_LOADING',
        payload: false,
      })
    })
  })
})

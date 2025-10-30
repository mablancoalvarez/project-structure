import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@/test/test-utils'
import { PostList } from '../PostList'
import { PostContext } from '@/context/PostContext'
import type { Post } from '@/context/types/post.types'

const mockPosts: Post[] = [
  { id: 1, title: 'Post 1', body: 'Body 1', userId: 1 },
  { id: 2, title: 'Post 2', body: 'Body 2', userId: 1 },
  { id: 3, title: 'Post 3', body: 'Body 3', userId: 1 },
]

describe('PostList Component', () => {
  it('should render component', () => {
    render(<PostList />)
  })

  it('should show loading when load posts', () => {
    const mockContextValue = {
      state: { posts: [], loading: true, error: false },
      dispatch: vi.fn(),
    }

    render(
      <PostContext.Provider value={mockContextValue}>
        <PostList />
      </PostContext.Provider>,
    )

    expect(screen.getByText('Cargando posts...')).toBeInTheDocument()
  })

  it('should error message correctly', () => {
    const mockContextValue = {
      state: { posts: [], loading: false, error: true },
      dispatch: vi.fn(),
    }

    render(
      <PostContext.Provider value={mockContextValue}>
        <PostList />
      </PostContext.Provider>,
    )

    expect(screen.getByText('Error al cargar los posts')).toBeInTheDocument()
  })

  it('should render post list', () => {
    const mockContextValue = {
      state: { posts: mockPosts, loading: false, error: false },
      dispatch: vi.fn(),
    }

    render(
      <PostContext.Provider value={mockContextValue}>
        <PostList />
      </PostContext.Provider>,
    )

    expect(screen.getByText('Lista de Posts')).toBeInTheDocument()
    expect(screen.getByText('Post 1')).toBeInTheDocument()
    expect(screen.getByText('Post 2')).toBeInTheDocument()
    expect(screen.getByText('Post 3')).toBeInTheDocument()
  })
})

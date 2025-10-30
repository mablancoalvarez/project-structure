import { describe, it, expect } from 'vitest'
import { postReducer, initialState } from '../PostContext'
import type { Post, PostState } from '../types/post.types'

describe('postReducer', () => {
  it('should return initial state', () => {
    const state = postReducer(initialState, { type: 'SET_POSTS', payload: [] })
    expect(state).toBeDefined()
  })

  describe('SET_POSTS', () => {
    it('should return posts and set loading true', () => {
      const posts: Post[] = [
        {
          id: 1,
          title: 'Post 1',
          body: 'Body 1',
          userId: 1,
        },
        {
          id: 2,
          title: 'Post 2',
          body: 'Body 2',
          userId: 1,
        },
      ]

      const newState = postReducer(
        { ...initialState, loading: true },
        { type: 'SET_POSTS', payload: posts },
      )

      expect(newState.posts).toEqual(posts)
      expect(newState.loading).toBe(false)
      expect(newState.error).toBe(false)
    })
  })

  describe('ADD_POST', () => {
    it('should add new post', () => {
      const existingPost: Post = {
        id: 1,
        title: 'Post Existente',
        body: 'Body 1',
        userId: 1,
      }
      const newPost: Post = {
        id: 2,
        title: 'Nuevo Post',
        body: 'Body 2',
        userId: 1,
      }

      const currentState: PostState = {
        ...initialState,
        posts: [existingPost],
      }

      const newState = postReducer(currentState, {
        type: 'ADD_POST',
        payload: newPost,
      })

      expect(newState.posts).toHaveLength(2)
      expect(newState.posts).toContainEqual(newPost)
    })
  })

  describe('DELETE_POST', () => {
    it('should delete a correct post by id', () => {
      const posts: Post[] = [
        { id: 1, title: 'Post 1', body: 'Body 1', userId: 1 },
        { id: 2, title: 'Post 2', body: 'Body 2', userId: 1 },
        { id: 3, title: 'Post 3', body: 'Body 3', userId: 1 },
      ]

      const currentState: PostState = { ...initialState, posts }

      const newState = postReducer(currentState, {
        type: 'DELETE_POST',
        payload: 2,
      })

      expect(newState.posts).toHaveLength(2)
      expect(newState.posts).not.toContainEqual(
        expect.objectContaining({ id: 2 }),
      )
    })

    it('no debe cambiar el estado si el id no existe', () => {
      const posts: Post[] = [
        { id: 1, title: 'Post 1', body: 'Body 1', userId: 1 },
      ]

      const currentState: PostState = { ...initialState, posts }

      const newState = postReducer(currentState, {
        type: 'DELETE_POST',
        payload: 999,
      })

      expect(newState.posts).toHaveLength(1)
    })
  })

  describe('SET_LOADING', () => {
    it('debe cambiar el estado de loading a true', () => {
      const newState = postReducer(initialState, {
        type: 'SET_LOADING',
        payload: true,
      })

      expect(newState.loading).toBe(true)
    })

    it('debe cambiar el estado de loading a false', () => {
      const currentState = { ...initialState, loading: true }

      const newState = postReducer(currentState, {
        type: 'SET_LOADING',
        payload: false,
      })

      expect(newState.loading).toBe(false)
    })
  })

  describe('SET_ERROR', () => {
    it('debe cambiar el estado de error a true', () => {
      const newState = postReducer(initialState, {
        type: 'SET_ERROR',
        payload: true,
      })

      expect(newState.error).toBe(true)
    })

    it('debe cambiar el estado de error a false', () => {
      const currentState = { ...initialState, error: true }

      const newState = postReducer(currentState, {
        type: 'SET_ERROR',
        payload: false,
      })

      expect(newState.error).toBe(false)
    })
  })
})

export interface Post {
  id: number
  title: string
  body: string
  userId: number
}

export interface PostState {
  posts: Post[]
  loading: boolean
  error: boolean
}

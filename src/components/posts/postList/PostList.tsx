import { useState, use } from 'react'
import { useLoadPost } from '@/hooks'
import { PostContext } from '@/context/PostContext'

export const PostList: React.FC = () => {
  useLoadPost()

  const { state } = use(PostContext)!
  const [checkedPost, setCheckedPost] = useState<number[]>([])

  if (state.loading) return <div>Cargando posts...</div>
  if (state.error) return <div>Error al cargar los posts</div>
  if (!state.posts) return null

  const handleCheckedPost = (id: number) => {
    setCheckedPost((prevState) =>
      prevState.includes(id)
        ? prevState.filter((postId) => postId !== id)
        : [...prevState, id],
    )
  }

  return (
    <div>
      <h1>Lista de Posts</h1>
      <ol className='post-grid'>
        {state.posts.map((post) => {
          const hasChecked = checkedPost.includes(post.id)
          return (
            <li key={post.id} className='post-card'>
              <label>
                <input
                  type='checkbox'
                  onChange={() => handleCheckedPost(post.id)}
                />
                <span
                  style={{
                    textDecoration: hasChecked ? 'line-through' : 'none',
                  }}
                >
                  {post.title}
                </span>
              </label>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

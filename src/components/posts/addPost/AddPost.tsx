import { usePostContext } from '@/context/PostContext'
import { useState } from 'react'

interface Post {
  id: number
  title: string
  body: string
  userId: number
}
export const AddPost: React.FC = () => {
  const { dispatch } = usePostContext()
  const [formData, setFormData] = useState({ title: '', body: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }
  const handleAddPost = (e: React.FormEvent) => {
    e.preventDefault()
    const newPost: Post = {
      id: Date.now(),
      ...formData,
      userId: 1,
    }
    console.log('newPost', newPost)
    dispatch({
      type: 'ADD_POST',
      payload: newPost,
    })
    setFormData({ title: '', body: '' })
  }
  return (
    <form onSubmit={handleAddPost}>
      <label>
        {' '}
        title
        <input
          name='title'
          type='textarea'
          value={formData.title}
          onChange={(e) => handleChange(e)}
        />
      </label>
      <label>
        body
        <input
          name='body'
          type='textarea'
          value={formData.body}
          onChange={(e) => handleChange(e)}
        />
      </label>
      <button type='submit'> Enviar new post</button>
    </form>
  )
}

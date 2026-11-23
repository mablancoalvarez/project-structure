import { usePostContext } from '@/context/PostContext'
import { type Post } from '@/context/types/post.types'
import { useState } from 'react'

const emptyForm = { title: '', body: '' }

export const AddPost: React.FC = () => {
  const { dispatch } = usePostContext()
  const [formData, setFormData] = useState(emptyForm)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddPost = (event: React.FormEvent) => {
    event.preventDefault()
    const title = formData.title.trim()
    const body = formData.body.trim()
    if (!title || !body) return

    const newPost: Post = {
      id: Date.now(),
      title,
      body,
      userId: 1,
    }
    dispatch({ type: 'ADD_POST', payload: newPost })
    setFormData(emptyForm)
  }

  return (
    <form onSubmit={handleAddPost}>
      <label>
        title
        <input name='title' type='text' value={formData.title} onChange={handleChange} />
      </label>
      <label>
        body
        <textarea name='body' value={formData.body} onChange={handleChange} />
      </label>
      <button type='submit'>Enviar new post</button>
    </form>
  )
}

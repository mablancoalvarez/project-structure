import './App.css'
import { PostProvider } from '@context/PostContextProvider'
import { PostList } from '@/components/posts/postList/PostList'
import { AddPost } from '@/components/posts/addPost/AddPost'

function App() {
  return (
    <PostProvider>
      <div className='container'>
        <PostList />
        <AddPost />
      </div>
    </PostProvider>
  )
}

export default App

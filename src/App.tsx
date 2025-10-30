import './App.css'
import { PostContextProvider } from '@context/PostContextProvider'
import { PostList } from '@/components/posts/postList/PostList'
import { AddPost } from '@/components/posts/addPost/AddPost'

function App() {
  return (
    <PostContextProvider>
      <div className='container'>
        <PostList />
        <AddPost />
      </div>
    </PostContextProvider>
  )
}

export default App

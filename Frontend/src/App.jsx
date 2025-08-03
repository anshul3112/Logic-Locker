import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css'
import RegisterPage from './components/RegisterPage'
import LoginPage from './components/LoginPage'
import SnippetsPage from './components/SnippetsPage'
import ErrorPage from './components/ErrorPage'
import NewSnippetPage from './components/NewSnippetPage'
import ViewSnippetPage from './components/ViewSnippetPage'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RegisterPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/snippets" element={<SnippetsPage />} />
        <Route path="/snippets/new" element={<NewSnippetPage />} />
        <Route path="/snippets/:id" element={<ViewSnippetPage />} />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

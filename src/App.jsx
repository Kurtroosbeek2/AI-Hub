import { useEffect, useState } from 'react'
import Home from './pages/Home'
import Admin from './pages/Admin'

export default function App() {
  const [page, setPage] = useState('home')

  useEffect(() => {
    const path = window.location.pathname
    if (path === '/admin' || path.startsWith('/admin/')) {
      setPage('admin')
    }
  }, [])

  return page === 'admin' ? <Admin /> : <Home />
}

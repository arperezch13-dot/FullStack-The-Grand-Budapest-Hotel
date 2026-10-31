
import { Route, Routes } from 'react-router-dom'

import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Suites from './pages/Suites'
import Mendls from './pages/Mendls'
import Letter from './pages/Letter'
import CheckIn from './pages/CheckIn'
import BookNow from './pages/BookNow'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="suites" element={<Suites />} />
        <Route path="mendls" element={<Mendls />} />
        <Route path="letter" element={<Letter />} />
        <Route path="check-in" element={<CheckIn />} />
        <Route path="book-now" element={<BookNow />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  )
}

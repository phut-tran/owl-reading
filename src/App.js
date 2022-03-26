import './App.css'
import ResponsiveAppBar from './common/navbar'
import { Routes, Route } from 'react-router-dom'
import ReadingList from './routes/reading-list'
import Recall from './routes/recall'
import Reading from './routes/reading'
import { initDB } from './modals/db'
initDB()

function App() {
  return (
    <div className='App'>
      <ResponsiveAppBar />
      <Routes>
        <Route path='reading' element={<ReadingList />} />
        <Route path='reading/:docId' element={<Reading />} />
        <Route path='recall' element={<Recall />} />
        <Route
          path='*'
          element={
            <main style={{ padding: '1rem' }}>
              <p>404 not found</p>
            </main>
          }
        />
      </Routes>
    </div>
  )
}

export default App
